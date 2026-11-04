import React from 'react';
import { Link } from 'react-router-dom';
import './Website.css';

const EMAIL = 'edmunoz1030@gmail.com';
const GITHUB = 'https://github.com/smvckerz';

const FEATURED = [
  {
    kicker: 'Validation · Simulation',
    title: 'AV Intersection Validation Suite',
    desc:
      'A Python framework that runs autonomous-vehicle intersection scenarios headlessly in SUMO and judges them on two layers: hard failures (collisions) and soft failures (minimum safe distance, even when nothing collides). A stress scenario that disables right-of-way proves the harness fails when it should. Every run is appended to a CSV for regression tracking.',
    tech: ['Python', 'SUMO', 'TraCI', 'CSV'],
    link: `${GITHUB}/av-intersection-validation-suite`,
  },
  {
    kicker: 'Observability · Systems',
    title: 'pi-agent',
    desc:
      'A lightweight observability agent in modern C++20 for Raspberry Pi and other constrained ARM Linux boxes. It reads /proc and /sys and serves CPU, memory, load and uptime as JSON over a minimal token-authenticated HTTP API, shipped as a multi-stage Docker image.',
    tech: ['C++20', 'CMake', 'Docker', 'Linux'],
    link: `${GITHUB}/Pi-Agent`,
  },
];

const MORE = [
  {
    title: 'Self-hosted Pi infrastructure',
    desc: 'Docker stack with automated Bash backups, HTTPS rotation, UFW and Fail2Ban. This site runs on it.',
    tech: 'Bash · Docker · Linux',
    link: `${GITHUB}/PersonalPortfolio`,
  },
  {
    title: 'Unix shell with pipes',
    desc: 'Bourne-style shell in C: quoting, fork/exec, n-stage pipelines and built-ins.',
    tech: 'C · POSIX',
    link: `${GITHUB}/Simple-Shell-with-Pipes`,
  },
  {
    title: 'Custom file system',
    desc: 'Disk layout, bitmap free-space management and POSIX-style directory operations.',
    tech: 'C · Operating systems',
    link: `${GITHUB}/Custom-File-System`,
  },
  {
    title: 'Multithreaded data processor',
    desc: 'File processor built on pthreads, mutexes and condition variables.',
    tech: 'C · pthreads',
    link: `${GITHUB}/Multithreaded-Data-Processor`,
  },
  {
    title: 'BankCore',
    desc: 'Terminal banking system in C++ on the MySQL C API with parameterized queries and CI.',
    tech: 'C++ · MySQL',
    link: `${GITHUB}/BankofMunoz`,
  },
];

const EXPERIENCE = [
  {
    company: 'NVIDIA',
    via: 'via Insight Global',
    role: 'AV Test Expert, Autonomous Vehicle Road Testing',
    place: 'California',
    dates: 'Jul 2026 – Present',
    points: [
      'Operate autonomous test vehicles on public roads while monitoring system performance, serving as both driver and test operator.',
      'Use Linux-based command-line tools daily to diagnose and troubleshoot issues on autonomous vehicle test systems.',
      'Monitor vehicle behavior during test drives and annotate incidents when the vehicle performs unexpected or out-of-spec actions.',
      'Review and execute structured test plans, and prepare and inspect test vehicles prior to deployment to ensure on-road readiness.',
      'Communicate findings to engineering teams with direct feedback on vehicle build performance and behavior observed during testing.',
    ],
  },
  {
    company: 'Tesla',
    role: 'AI Safety Operator, Full Self-Driving (FSD) Program',
    place: 'San Francisco, CA',
    dates: 'Oct 2025 – Jul 2026',
    points: [
      'Executed data-ingestion and validation routines for a distributed edge-compute platform, contributing to over 1,000 hours of safety-critical deployments and real-world edge-case capture.',
      'Analyzed telemetry, camera data, and low-level Linux logs to isolate software anomalies and hardware-to-software integration faults, documenting each in structured logs for developers and autonomous systems engineers.',
      'Performed system calibrations and ensured data integrity during high-volume post-route transfers.',
      'Selected to lead onboarding for 4 incoming team members on data collection, system monitoring, and operational safety criteria.',
    ],
  },
];

const SKILLS = [
  { title: 'Languages', items: ['C', 'C++', 'Python', 'Bash'] },
  { title: 'Systems', items: ['Linux', 'POSIX', 'pthreads', 'Kernel modules', 'Log diagnostics'] },
  { title: 'Validation & data', items: ['SUMO / TraCI', 'Telemetry', 'Test planning', 'MySQL / MariaDB'] },
  { title: 'Infrastructure', items: ['Docker', 'Git / GitHub', 'TCP/IP', 'UFW / Fail2Ban'] },
];

function ArrowLink({ href, children }) {
  return (
    <a className="arrow" href={href} target="_blank" rel="noopener noreferrer">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Website() {
  return (
    <div className="site">
      <a className="skip" href="#work">Skip to content</a>

      <header className="top">
        <div className="wrap top-in">
          <a className="brand" href="#top" aria-label="Eduardo Muñoz, top of page">
            <span className="brand-mark">EM</span>
          </a>
          <nav className="nav" aria-label="Primary">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            <Link to="/console" className="console-link" aria-label="Open the terminal console">
              <span aria-hidden="true">&gt;_</span>
              <span className="console-label">console</span>
            </Link>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="dot" aria-hidden="true" />
                AV Test Expert at NVIDIA
              </p>
              <h1>
                I test autonomous&nbsp;systems.
              </h1>
              <p className="lead">
                Eduardo Muñoz. Computer Science graduate (SFSU) with road-testing experience at NVIDIA
                and Tesla and a systems background in Linux, C and C++. I write simulation harnesses,
                observability agents and low-level code in the same space I work in every day.
              </p>
              <div className="cta">
                <a className="btn primary" href="/Eduardo_Munoz_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
                <a className="btn" href={`mailto:${EMAIL}`}>Email me</a>
                <a className="btn quiet" href="#work">See my work ↓</a>
              </div>
            </div>

            <figure className="term" aria-label="Sample output from the AV validation suite">
              <div className="term-bar" aria-hidden="true">
                <i /><i /><i />
                <span>av-intersection-validation-suite</span>
              </div>
              <pre className="term-body">
<span className="c-dim">$</span> python3 script.py{'\n'}
{'\n'}
<span className="c-dim">scenario                  verdict  min dist</span>{'\n'}
safe_timing               <span className="c-pass">PASS</span>     28.20 m{'\n'}
simultaneous_departure    <span className="c-fail">FAIL</span>      2.91 m{'\n'}
{'\n'}
<span className="c-dim">appended 2 rows to results.csv</span>
              </pre>
              <figcaption>
                A test that has never seen a FAIL can&rsquo;t be trusted to catch one.
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="work" className="block">
          <div className="wrap">
            <h2 className="h2"><span className="idx">01</span> Selected work</h2>

            <div className="featured">
              {FEATURED.map((p) => (
                <article key={p.title} className="feat">
                  <p className="kicker">{p.kicker}</p>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <ul className="chips" aria-label="Technologies">
                    {p.tech.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                  <ArrowLink href={p.link}>View on GitHub</ArrowLink>
                </article>
              ))}
            </div>

            <h3 className="sub">More systems work</h3>
            <ul className="more">
              {MORE.map((p) => (
                <li key={p.title}>
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                    <span className="more-title">{p.title} <span aria-hidden="true">↗</span></span>
                    <span className="more-desc">{p.desc}</span>
                    <span className="more-tech">{p.tech}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="experience" className="block alt">
          <div className="wrap">
            <h2 className="h2"><span className="idx">02</span> Experience</h2>
            <ol className="timeline">
              {EXPERIENCE.map((job) => (
                <li key={job.company} className="job">
                  <div className="job-side">
                    <p className="dates">{job.dates}</p>
                    <p className="place">{job.place}</p>
                  </div>
                  <div className="job-main">
                    <h3>
                      {job.company}
                      {job.via && <span className="via"> {job.via}</span>}
                    </h3>
                    <p className="role">{job.role}</p>
                    <ul>
                      {job.points.map((pt) => <li key={pt}>{pt}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>

            <div className="edu">
              <h3 className="sub">Education</h3>
              <p>
                <strong>San Francisco State University</strong>, B.S. Computer Science, Aug 2022 – June 2025.
                Senior Capstone Database Team Lead: led a cohort of 4 on relational schema design,
                query optimization, and Git workflows for a distributed web application.
              </p>
            </div>

            <h3 className="sub">Toolbox</h3>
            <div className="skills">
              {SKILLS.map((g) => (
                <div key={g.title}>
                  <h4>{g.title}</h4>
                  <ul className="chips">
                    {g.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="block contact">
          <div className="wrap">
            <h2 className="h2"><span className="idx">03</span> Contact</h2>
            <p className="contact-line">
              Want to talk validation, simulation or systems work? <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <div className="cta">
              <a className="btn primary" href={`mailto:${EMAIL}`}>Email me</a>
              <a className="btn" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a className="btn" href="/Eduardo_Munoz_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <span>© {new Date().getFullYear()} Eduardo Muñoz</span>
          <Link to="/console" className="foot-console">&gt;_ try the console</Link>
        </div>
      </footer>
    </div>
  );
}
