import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ParticleCanvas from './components/ParticleCanvas';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function App() {
  // Reveal-on-scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    const targets = document.querySelectorAll('.reveal');
    targets.forEach((el) => observer.observe(el));

    return () => targets.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="scanlines noise bg-dark text-white min-h-screen font-body relative">
      <ParticleCanvas />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
