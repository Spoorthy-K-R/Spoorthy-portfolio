import { memo } from 'react';
import data from '../data/portfolio.json';

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: (p) => p.github,
    icon: <GithubIcon />,
    color: '#f0f0f0',
  },
  {
    label: 'LinkedIn',
    href: (p) => p.linkedin,
    icon: <LinkedinIcon />,
    color: '#0a84ff',
  },
  {
    label: 'Email',
    href: (p) => `mailto:${p.email}`,
    icon: <EmailIcon />,
    color: 'var(--cyan)',
  },
];

export default memo(function Contact() {
  const { personal } = data;

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)' }}
      />

      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)',
          bottom: '-200px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        {/* CTA Block */}
        <div className="text-center mb-12 reveal">
          <p className="section-label mb-6">// 04 — Let's Connect</p>
          <h2
            className="font-display mb-6"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '0.04em',
              lineHeight: 0.9,
            }}
          >
            LET'S{' '}
            <span className="glow-text" style={{ color: 'var(--cyan)' }}>
              CONNECT
            </span>
          </h2>
          <p
            className="font-body text-base max-w-md mx-auto mb-10"
            style={{ color: 'var(--muted)', lineHeight: '1.8' }}
          >
            Open to research collaborations, full-time roles, and interesting side projects.
            Drop a line.
          </p>
          <a
            href={`mailto:${personal.email}`}
            className="btn-primary inline-block"
            style={{ textDecoration: 'none' }}
          >
            {personal.email}
          </a>
        </div>

        {/* Divider */}
        <hr className="hr-cyber mb-12" />

        {/* Footer bottom row */}
        <div className="flex items-center justify-center gap-8">
          {/* Social links */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href(personal)}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group flex items-center gap-2 glass glass-hover px-4 py-3 rounded-sm"
                style={{ color: 'var(--muted)', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = link.color;
                  e.currentTarget.style.borderColor = `${link.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                {link.icon}
                <span className="font-mono text-xs tracking-wider hidden sm:inline">
                  {link.label}
                </span>
              </a>
            ))}
          </div>

          {/* Copyright */}
          {/* <p className="font-mono text-xs text-center md:text-right" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} {personal.name}
            <br />
            
          </p> */}
        </div>

        {/* Bottom tagline */}
        <div className="text-center mt-12">
          <p
            className="font-mono text-xs tracking-widest"
            style={{ color: 'rgba(255,255,255,0.1)', letterSpacing: '0.4em' }}
          >
          </p>
        </div>
      </div>
    </section>
  );
});
