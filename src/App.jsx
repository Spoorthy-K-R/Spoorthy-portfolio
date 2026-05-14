import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ParticleCanvas from './components/ParticleCanvas';
import Projects from './components/Projects';
import Skills, { SkillsMarquee } from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Contact from './components/Contact';
import SideBars from './components/SideBars';

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
      <SideBars />
      <main className="relative z-10">
        <Hero />
        <Education />
        <SkillsMarquee />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
