import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Website.css';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    title: 'Self-Hosted Portfolio on Raspberry Pi',
    desc:
      'Reverse-proxied React site with HTTPS (Let’s Encrypt), caching, gzip, and a Node API that safely runs Python code. Deployed on a Pi behind NAT with DNS & port-forwarding.',
    tech: ['Linux', 'Apache', 'Node/Express', 'React', 'SSL/DNS', 'UFW'],
    link: 'https://github.com/smvckerz/PersonalPortfolio'
  },
  {
    title: 'Mini Shell (sh) with pipes',
    desc:
      'Unix-style shell supporting job control, pipes, I/O redirection, environment vars, and builtin commands with robust parsing.',
    tech: ['C', 'POSIX', 'Signals', 'Parser/lexer'],
    link: 'https://github.com/smvckerz/Simple-Shell-with-Pipes'
  },
  {
    title: 'Custom File System (C)',
    desc:
      'A fully functional file system implemented from scratch in C. Includes a Volume Control Block (VCB), bitmap-based free-space management, directory operations with “.” and “..” entries, and versioned file allocation. Designed for Linux using low-level block I/O and pthread synchronization.',
    tech: ['C', 'POSIX', 'pthreads', 'Low-level I/O'],
    link: 'https://github.com/smvckerz/Custom-File-System'
  },
  {
    title: 'LiteLocal Chatbot (Python + Web)',
    desc:
      'A lightweight locally hosted AI assistant built with a FastAPI backend and web-based front-end. Handles contextual conversation, message logging, and persistent sessions without relying on cloud APIs — optimized for Raspberry Pi performance.',
    tech: ['Python', 'FastAPI', 'HTML/CSS/JS', 'Local AI Integration'],
    link: 'https://github.com/smvckerz/litelocal-chatbot'
  },
  {
  title: 'Terminal Portfolio (Interactive Project)',
  desc: 'A browser-based console with a faux filesystem and Python execution via a Pi-hosted API.',
  tech: ['React', 'Node/Express', 'Python', 'Raspberry Pi'],
  link: '/console'
  }
];

export default function Website() {
  const navigate = useNavigate();

  return (
    <div className="site">
      <header className="site-header">
        <a
          className="logo"
          href="/"
          onClick={(e) => { e.preventDefault(); navigate('/console'); }}
          aria-label="Back to Console"
        >
          ▌EM
        </a>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <a href="#tester"a>Tester</a>
         <Link to="/console" className="btn small" style={{ marginLeft: 12 }}>
            Open Console
         </Link>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <h1>IT, Software, and Cloud Engineer</h1>
            <p className="lead">
              I build and run reliable systems: Linux servers, small backend services,
              secure networking, and cloud-native deployments. I enjoy automating toil,
              tightening security, and turning ideas into maintainable services.
            </p>

            <div className="role-tags">
              <span className="tag">IT / SysAdmin</span>
              <span className="tag">Software Engineering</span>
              <span className="tag">Cloud / DevOps</span>
            </div>

            <div className="cta-row">
              <button className="btn primary" onClick={() => navigate('/console')}>
                Open Console
              </button>
              <a className="btn ghost" href="public\Eduardo_Munoz_Resume.pdf" target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
              <a className="btn ghost" href="mailto:example@domain.com">Email Me</a>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="section">
          <div className="container grid-2">
            <div>
              <h2>About</h2>
              <p>
                I’m hands-on with Linux, networking (DNS, SSL/TLS, routing), and building
                small services in Node/Python. I like infrastructure you can reason about:
                clear architecture, automated deployments, observability, and strong defaults.
              </p>
              <p>
                Recently I’ve been focusing on self-hosting, edge deployments (Raspberry Pi),
                HTTPS hardening, and turning home-lab lessons into production-style patterns
                (reverse proxies, caching, health checks, and least-privilege access).
              </p>
            </div>
            <div className="card note">
              <h3>What I bring</h3>
              <ul>
                <li>Solid Linux & networking fundamentals</li>
                <li>APIs & small services (Node/Express, Python)</li>
                <li>Cloud & automation (Docker, CI/CD, Terraform)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="section alt">
          <div className="container">
            <h2>Projects</h2>
            <p className="muted">Selected work that blends IT, software, and cloud.</p>
            <div className="cards">
              {PROJECTS.map((p) => (
                <article key={p.title} className="card project">
                  <header><h3>{p.title}</h3></header>
                  <p>{p.desc}</p>
                  <div className="tags">
                    {p.tech.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                  {p.link && (
                    <a className="btn small" href={p.link} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section">
          <div className="container">
            <h2>Skills</h2>
            <div className="grid-2">
              <div className="card">
                <h3>Cloud & Infra</h3>
                <ul className="skills">
                  <li>AWS/Azure basics (EC2/S3/CloudFront, Functions)</li>
                  <li>Linux, Apache/Nginx, SSL/TLS, DNS</li>
                  <li>Docker, GitHub Actions (CI/CD)</li>
                  <li>Terraform (IaC fundamentals)</li>
                </ul>
              </div>
              <div className="card">
                <h3>Software</h3>
                <ul className="skills">
                  <li>JavaScript/React, Node.js/Express</li>
                  <li>Python (scripts & services)</li>
                  <li>REST APIs, JSON, auth basics</li>
                  <li>Testing & troubleshooting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section alt">
          <div className="container grid-2">
            <div>
              <h2>Contact</h2>
              <p>
                Open to IT,Software Engineering, and Cloud/DevOps roles. If you’d like a deeper
                walkthrough (architecture diagrams or code), I’m happy to share.
              </p>
              <a className="btn primary" href="mailto:example@domain.com">Email Me</a>
            </div>
            <form
              className="card form"
              onSubmit={(e) => { e.preventDefault(); alert('Demo form. Wire to a backend if needed.'); }}
              aria-labelledby="contact-form"
            >
              <h3 id="contact-form">Quick Message (demo)</h3>
              <label> Name <input type="text" placeholder="Your name" required /> </label>
              <label> Email <input type="email" placeholder="you@example.com" required /> </label>
              <label> Message <textarea rows="4" placeholder="What’s up?" required /> </label>
              <button className="btn small" type="submit">Send</button>
            </form>
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
