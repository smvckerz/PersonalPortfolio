import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Website.css';

const PROJECTS = [
  {
    title: 'Terminal Portfolio',
    desc: 'Interactive console in React with a fake FS and Python execution via API on a Raspberry Pi.',
    tech: ['React', 'Node.js', 'Express', 'Python', 'Raspberry Pi'],
    link: 'https://eduardoemunoz.com',
  },
  {
    title: 'E-commerce POC',
    desc: 'Mock storefront with product listing, cart, and checkout flow.',
    tech: ['React', 'Node', 'MongoDB'],
    link: '#',
  },
  {
    title: 'ML Classifier',
    desc: 'Simple classification pipeline and visualization.',
    tech: ['Python', 'scikit-learn', 'Pandas'],
    link: '#',
  },
];

export default function Website() {
  const navigate = useNavigate();

  return (
    <div className="site">
      <header className="site-header">
        <a
          className="logo"
          href="/"
          onClick={(e) => { e.preventDefault(); navigate('/'); }}
          aria-label="Back to Console"
        >
          ▌EM
        </a>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <h1>Hi, I’m Eduardo.</h1>
            <p className="lead">
              I build interactive UIs and backend services. This site is the
              no-terminal view of my portfolio. The console version lives on the
              home route.
            </p>
            <div className="cta-row">
              <button className="btn primary" onClick={() => navigate('/')}>
                Back to Console
              </button>
              <a className="btn ghost" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="section">
          <div className="container grid-2">
            <div>
              <h2>About</h2>
              <p>
                I’m a developer focused on thoughtful UX and pragmatic
                engineering. I enjoy building small systems end-to-end: React
                frontends, Node/Express APIs, and scripts/services on Linux (I
                host this site on a Raspberry Pi).
              </p>
              <p>
                Recently I’ve been playing with terminal-style UIs, code
                execution sandboxes, and lightweight deployments on constrained
                hardware.
              </p>
            </div>
            <div className="card note">
              <h3>Highlights</h3>
              <ul>
                <li>Terminal portfolio w/ in-browser “filesystem”</li>
                <li>Python execution via API on Raspberry Pi</li>
                <li>Fast static build (gzipped, cached)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="section alt">
          <div className="container">
            <h2>Projects</h2>
            <div className="cards">
              {PROJECTS.map((p) => (
                <article key={p.title} className="card project">
                  <header>
                    <h3>{p.title}</h3>
                  </header>
                  <p>{p.desc}</p>
                  <div className="tags">
                    {p.tech.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
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
            <ul className="skills">
              <li>JavaScript / React</li>
              <li>Node.js / Express</li>
              <li>Python</li>
              <li>Linux / Apache</li>
              <li>Networking / DNS / SSL</li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section alt">
          <div className="container grid-2">
            <div>
              <h2>Contact</h2>
              <p>
                The fastest way to reach me is by email. I’m open to chat about
                projects, collaboration, or interesting problems.
              </p>
              <a className="btn primary" href="mailto:example@domain.com">
                Email Me
              </a>
            </div>
            <form
              className="card form"
              onSubmit={(e) => { e.preventDefault(); alert('Demo form. Wire to a backend if needed.'); }}
              aria-labelledby="contact-form"
            >
              <h3 id="contact-form">Quick Message (demo)</h3>
              <label>
                Name
                <input type="text" placeholder="Your name" required />
              </label>
              <label>
                Email
                <input type="email" placeholder="you@example.com" required />
              </label>
              <label>
                Message
                <textarea rows="4" placeholder="What’s up?" required />
              </label>
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
