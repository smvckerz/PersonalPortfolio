const express = require("express");
const { spawn } = require("child_process");
const crypto = require("crypto");

const PORT = 4000;
const MAX_CODE_LENGTH = 10000;
const MAX_OUTPUT = 16 * 1024;     // bytes kept per stream
const TIMEOUT_MS = 5000;
const MAX_CONCURRENT = 2;
const RATE_LIMIT = 10;            // runs per IP per minute
const IMAGE = "python:3.11-alpine";

// This kernel has no memory cgroup, so Docker's --memory is ignored. The runner
// sets its own rlimits before executing the visitor's code (read from stdin).
const RUNNER = [
  "import resource, sys",
  "L = lambda r, v: resource.setrlimit(r, (v, v))",
  "L(resource.RLIMIT_AS, 128 << 20)",
  "L(resource.RLIMIT_NPROC, 32)",
  "L(resource.RLIMIT_FSIZE, 1 << 20)",
  "L(resource.RLIMIT_CPU, 5)",
  "src = sys.stdin.read()",
  "try:",
  "    exec(compile(src, '<stdin>', 'exec'), {'__name__': '__main__'})",
  "except Exception as e:",
  "    import traceback",
  "    traceback.print_exception(type(e), e, e.__traceback__.tb_next)",
  "    sys.exit(1)",
].join("\n");

const app = express();
app.set("trust proxy", "loopback"); // Apache proxies to us on 127.0.0.1
// Same-origin: Apache serves the site and proxies /api here, so no CORS is needed.
app.use(express.json({ limit: "20kb" }));

let running = 0;
const hits = new Map(); // ip -> [timestamps]

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, ts] of hits) if (!ts.some((t) => now - t < 60000)) hits.delete(ip);
}, 60000).unref();

// Run code in a throwaway container: no network, no capabilities, read-only
// filesystem, unprivileged user, and hard CPU/memory/process limits. The code is
// sent over stdin, so nothing user-controlled ends up on the command line.
function runSandboxed(code) {
  return new Promise((resolve) => {
    const name = `pyrun-${crypto.randomBytes(6).toString("hex")}`;
    const child = spawn("docker", [
      "run", "--rm", "-i", "--name", name,
      "--network", "none",
      "--memory", "64m", "--memory-swap", "64m",
      "--cpus", "0.5",
      "--pids-limit", "32",
      "--read-only", "--tmpfs", "/tmp:rw,noexec,nosuid,size=8m",
      "--cap-drop", "ALL",
      "--security-opt", "no-new-privileges",
      "--user", "65534:65534",
      IMAGE, "python", "-I", "-c", RUNNER,
    ]);

    let stdout = "";
    let stderr = "";
    let timedOut = false;
    const append = (cur, chunk) => (cur.length < MAX_OUTPUT ? cur + chunk : cur);
    child.stdout.on("data", (d) => { stdout = append(stdout, d.toString()); });
    child.stderr.on("data", (d) => { stderr = append(stderr, d.toString()); });

    const timer = setTimeout(() => {
      timedOut = true;
      spawn("docker", ["kill", name]).on("error", () => {});
    }, TIMEOUT_MS);

    child.on("error", (err) => {
      clearTimeout(timer);
      resolve({ output: "", error: `Could not start sandbox: ${err.message}` });
    });
    child.on("close", () => {
      clearTimeout(timer);
      // Docker warns on every run about the missing memory cgroup; hide its own notices.
      stderr = stderr.split("\n").filter((l) => !l.startsWith("WARNING:")).join("\n");
      const trim = (s) => (s.length >= MAX_OUTPUT ? s.slice(0, MAX_OUTPUT) + "\n[output truncated]" : s);
      if (timedOut) stderr += `\n[killed: exceeded ${TIMEOUT_MS / 1000}s time limit]`;
      resolve({ output: trim(stdout), error: trim(stderr) });
    });
    child.stdin.on("error", () => {});
    child.stdin.end(code);
  });
}

// TLS is terminated by Apache, which proxies /api to this server.
app.post("/execute", async (req, res) => {
  const code = typeof req.body.code === "string" ? req.body.code : "";

  if (code.length > MAX_CODE_LENGTH) {
    return res.status(400).json({ error: "Code exceeds maximum length" });
  }
  // Behind Cloudflare + Apache every request arrives from loopback; use the real client IP.
  const ip = req.headers["cf-connecting-ip"] || req.ip;
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Too many runs, try again in a minute" });
  }
  if (running >= MAX_CONCURRENT) {
    return res.status(503).json({ error: "Server is busy, try again in a moment" });
  }

  running++;
  try {
    res.json(await runSandboxed(code));
  } finally {
    running--;
  }
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Python execution server running on 127.0.0.1:${PORT}`);
});
