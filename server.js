const express = require("express");
const cors = require("cors");
const { execFile } = require("child_process");
const fs = require("fs");
const util = require("util");
const path = require("path");

const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);
const execFilePromise = util.promisify(execFile);

const PORT = 4000;
const MAX_CODE_LENGTH = 10000;
const tempDir = path.join(__dirname, "temp");

const app = express();
app.use(cors({
  origin: [
    "http://localhost:3000",       // React dev server
    "https://eduardoemunoz.com",   // Production domain
  ],
  optionsSuccessStatus: 200,
}));
app.use(express.json());

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// TLS is terminated by Apache, which proxies /api to this server.
app.post("/execute", async (req, res) => {
  const code = typeof req.body.code === "string" ? req.body.code : "";

  if (code.length > MAX_CODE_LENGTH) {
    return res.status(400).json({ error: "Code exceeds maximum length" });
  }

  const tempFile = path.join(tempDir, `temp_${Date.now()}_${process.pid}.py`);
  try {
    await writeFile(tempFile, code);
    const { stdout, stderr } = await execFilePromise("python3", [tempFile], { timeout: 5000 });
    res.json({ output: stdout, error: stderr });
  } catch (error) {
    res.json({ output: error.stdout || "", error: error.stderr || error.message });
  } finally {
    unlink(tempFile).catch(() => {});
  }
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Python execution server running on 127.0.0.1:${PORT}`);
});
