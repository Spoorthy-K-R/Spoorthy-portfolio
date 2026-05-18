import { useEffect, useRef, useState } from 'react';
import data from '../data/portfolio.json';

const NAV_LINKS = [
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { personal } = data;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 60;
      if (isScrolled !== scrolledRef.current) {
        scrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(10,10,10,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, '#hero')}
          className="font-display text-2xl tracking-widest"
          style={{ color: 'var(--cyan)', letterSpacing: '0.25em' }}
        >
          SKR
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link"
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={personal.resume}
              download="Spoorthy-KR-Resume.pdf"
              className="nav-link"
              aria-label="Download Spoorthy K.R. resume"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 bg-current transition-transform duration-300"
            style={{
              background: 'var(--cyan)',
              transform: menuOpen ? 'rotate(45deg) translate(3px, 6px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-0.5 transition-opacity duration-300"
            style={{ background: 'var(--cyan)', opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 bg-current transition-transform duration-300"
            style={{
              background: 'var(--cyan)',
              transform: menuOpen ? 'rotate(-45deg) translate(3px, -6px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '300px' : '0',
          background: 'rgba(10,10,10,0.97)',
          borderBottom: menuOpen ? '1px solid rgba(255,255,255,0.07)' : 'none',
        }}
      >
        <ul className="flex flex-col px-6 py-4 gap-5">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link text-sm"
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={personal.resume}
              download="Spoorthy-KR-Resume.pdf"
              className="nav-link text-sm"
              onClick={() => setMenuOpen(false)}
              style={{ color: 'var(--cyan)' }}
              aria-label="Download Spoorthy K.R. resume"
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
