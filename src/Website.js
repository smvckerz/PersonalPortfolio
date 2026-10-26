import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Website.css';

const EMAIL = 'edmunoz1030@gmail.com';

const EXPERIENCE = [
  {
    company: 'NVIDIA (via Insight Global)',
    role: 'AV Test Expert – Autonomous Vehicle Road Testing',
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
    role: 'AI Safety Operator – Full Self-Driving (FSD) Program',
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

const PROJECTS = [
  {
    title: 'Raspberry Pi Automated Infrastructure',
    desc:
      'Self-hosted containerized stack with automated Bash backups, cron jobs, and HTTPS certificate rotation, hardened with UFW firewalls and Fail2Ban intrusion prevention. This site runs on it.',
    tech: ['Bash', 'Docker & Compose', 'Linux', 'Networking'],
    dates: 'Sep 2024 – Present',
    link: 'https://github.com/smvckerz/PersonalPortfolio',
  },
  {
    title: 'Unix Shell & OS Systems Projects',
    desc:
      'A Unix-style command-line shell built from scratch in C (process creation, pipelines, I/O redirection), a multithreaded file processor using pthreads and mutexes, and a custom Linux device driver that interfaces directly with kernel space.',
    tech: ['C', 'POSIX Threads', 'Linux Kernel Modules'],
    dates: 'Aug 2022 – May 2025',
  },
  {
    title: 'Terminal Portfolio',
    desc:
      'A browser-based console with a faux filesystem and Python execution through a Pi-hosted API. Try it out.',
    tech: ['React', 'Node/Express', 'Python', 'Raspberry Pi'],
    dates: '',
    link: '/console',
    internal: true,
  },
];

const SKILLS = [
  {
    title: 'Languages & Systems',
    items: ['C, C++, Python', 'Bash / Shell scripting', 'Linux (Debian/Ubuntu, Unix internals)', 'POSIX, pthreads'],
  },
  {
    title: 'Data & Distributed Systems',
    items: ['High-throughput telemetry capture', 'Multimodal data integrity', 'Schema design', 'MySQL / MariaDB'],
  },
  {
    title: 'Infrastructure & Networking',
    items: ['Docker, Nginx, Git/GitHub', 'TCP/IP', 'System hardening (UFW, Fail2Ban)', 'Log diagnostics (grep, tail, cat)'],
  },
];

export default function Website() {
  const navigate = useNavigate();

  return (
    <div className="site">
      <header className="site-header">
        <a
          className="logo"
          href="/console"
          onClick={(e) => { e.preventDefault(); navigate('/console'); }}
          aria-label="Open Console"
        >
          ▌EM
        </a>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <Link to="/console" className="btn small" style={{ marginLeft: 12 }}>
            Open Console
          </Link>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h1>Eduardo Muñoz</h1>
            <p className="lead">
              Computer Science graduate (B.S.) with hands-on autonomous vehicle road-testing
              experience at NVIDIA and Tesla, pairing a systems-level Linux/C background with
              telemetry and log diagnostics and clear, direct feedback to engineering teams.
            </p>

            <div className="role-tags">
              <span className="tag">AV Test Expert @ NVIDIA</span>
              <span className="tag">Linux &amp; Systems</span>
              <span className="tag">Telemetry &amp; Log Diagnostics</span>
            </div>

            <div className="cta-row">
              <a className="btn primary" href="/Eduardo_Munoz_Resume.pdf" target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
              <a className="btn ghost" href={`mailto:${EMAIL}`}>Email Me</a>
              <button className="btn ghost" onClick={() => navigate('/console')}>
                Open Console
              </button>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container grid-2">
            <div>
              <h2>About</h2>
              <p>
                I test autonomous vehicles on public roads, working as both driver and test operator
                while monitoring system behavior, annotating out-of-spec events, and reporting
                findings to the engineering teams building the software.
              </p>
              <p>
                Outside of work I run a self-hosted Raspberry Pi stack (Docker, cron backups,
                HTTPS rotation, UFW, Fail2Ban) and build low-level projects in C: a Unix shell,
                multithreaded programs, and a Linux device driver.
              </p>
            </div>
            <div className="card note">
              <h3>Education</h3>
              <p><strong>San Francisco State University</strong><br />
                B.S. Computer Science, Aug 2022 – June 2025</p>
              <ul>
                <li>Senior Capstone Database Team Lead: led a cohort of 4 on relational schema design, query optimization, and Git workflows for a distributed web application.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="experience" className="section alt">
          <div className="container">
            <h2>Experience</h2>
            {EXPERIENCE.map((job) => (
              <article key={job.company} className="card job">
                <header className="job-head">
                  <div>
                    <h3>{job.company}</h3>
                    <p className="muted">{job.role}</p>
                  </div>
                  <div className="job-meta muted">
                    <div>{job.dates}</div>
                    <div>{job.place}</div>
                  </div>
                </header>
                <ul>
                  {job.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <h2>Projects</h2>
            <div className="cards">
              {PROJECTS.map((p) => (
                <article key={p.title} className="card project">
                  <header>
                    <h3>{p.title}</h3>
                    {p.dates && <p className="muted">{p.dates}</p>}
                  </header>
                  <p>{p.desc}</p>
                  <div className="tags">
                    {p.tech.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                  {p.link && (p.internal
                    ? <Link className="btn small" to={p.link}>Open</Link>
                    : <a className="btn small" href={p.link} target="_blank" rel="noopener noreferrer">View</a>)}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section alt">
          <div className="container">
            <h2>Skills</h2>
            <div className="cards">
              {SKILLS.map((group) => (
                <div key={group.title} className="card">
                  <h3>{group.title}</h3>
                  <ul className="skill-list">
                    {group.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <h2>Contact</h2>
            <p>
              Interested in working together or want a deeper walkthrough of any project? Reach out.
            </p>
            <div className="cta-row">
              <a className="btn primary" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a className="btn ghost" href="https://github.com/smvckerz" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <span>© {new Date().getFullYear()} Eduardo Muñoz</span>
          <span className="spacer" />
          <a href="https://github.com/smvckerz" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
