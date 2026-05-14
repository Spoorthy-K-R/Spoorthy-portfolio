import { useEffect, useState } from 'react';
import data from '../data/portfolio.json';

// Typewriter hook
function useTypewriter(text, speed = 45, delay = 800) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay]);
  return displayed;
}

export default function Hero() {
  const { personal } = data;
  const role = useTypewriter(personal.role, 40, 1000);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
    >
      {/* Radial gradient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)',
          top: '10%',
          right: '-10%',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,0,110,0.04) 0%, transparent 70%)',
          bottom: '15%',
          left: '-5%',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-24 pb-16">
        {/* Status badge */}
        <div
          className="status-badge mb-8 inline-flex"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'all 0.6s ease 0.2s',
          }}
        >
          <span className="status-dot" />
          {personal.status}
        </div>

        {/* Name */}
        <h1
          className="glitch font-display leading-none mb-2"
          data-text={personal.fullName.toUpperCase()}
          style={{
            fontSize: 'clamp(2.6rem, 8.6vw, 7.8rem)',
            letterSpacing: '0.04em',
            color: '#f0f0f0',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.23,1,0.32,1) 0.4s',
          }}
        >
          {personal.fullName.toUpperCase()}
        </h1>

        {/* Role typewriter */}
        <div
          className="flex items-center gap-3 mb-6"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.6s ease 0.9s',
          }}
        >
          <span
            className="font-mono text-sm md:text-base tracking-widest cursor-blink"
            style={{ color: 'var(--cyan)', letterSpacing: '0.15em' }}
          >
            {role || '\u00A0'}
          </span>
        </div>

        {/* Divider */}
        <div
          className="hr-cyber mb-8"
          style={{
            maxWidth: '400px',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.6s ease 1.2s',
          }}
        />

        {/* Tagline */}
        <p
          className="text-base md:text-lg leading-relaxed mb-10 max-w-xl"
          style={{
            color: '#999',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(15px)',
            transition: 'all 0.8s ease 1.3s',
          }}
        >
          {personal.tagline}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center gap-4"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(15px)',
            transition: 'all 0.8s ease 1.5s',
          }}
        >
          <button className="btn-primary" onClick={() => scrollTo('#projects')}>
            View Projects
          </button>
          <button className="btn-secondary" onClick={() => scrollTo('#contact')}>
            Get in Touch
          </button>
          <a
            href={personal.resume}
            download="Spoorthy-KR-Resume.pdf"
            className="btn-secondary"
            aria-label="Download Spoorthy K.R. resume"
          >
            Download Resume
          </a>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-wrap gap-8 mt-16"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.8s ease 1.8s',
          }}
        >
          {[
            { value: '2+', label: 'Years at JPMorgan' },
            { value: '2', label: 'IEEE Publications' },
            { value: '4.0', label: 'GPA @ TAMU' },
            { value: '$15B+', label: 'Trade Volume Served' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span
                className="font-display text-3xl md:text-4xl glow-text"
                style={{ color: 'var(--cyan)', letterSpacing: '0.05em' }}
              >
                {stat.value}
              </span>
              <span className="font-mono text-xs mt-1" style={{ color: 'var(--muted)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{
          transform: 'translateX(-50%)',
          opacity: mounted ? 0.5 : 0,
          transition: 'opacity 1s ease 2.2s',
        }}
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--muted)' }}>
          SCROLL
        </span>
        <div
          className="w-px h-12"
          style={{
            background: 'linear-gradient(to bottom, var(--cyan), transparent)',
            animation: 'fadeIn 2s ease infinite alternate',
          }}
        />
      </div>
    </section>
  );
}
