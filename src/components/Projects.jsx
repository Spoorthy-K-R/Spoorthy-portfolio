import { useRef } from 'react';
import data from '../data/portfolio.json';

// Generates an SVG thumbnail pattern based on project type
function ProjectThumbnail({ accent, type, title }) {
  const patterns = {
    Research: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id={`g-${title}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill={`url(#g-${title})`} />
        {[...Array(6)].map((_, i) => (
          <circle
            key={i}
            cx={50 + i * 60}
            cy={110}
            r={4 + i * 3}
            fill="none"
            stroke={accent}
            strokeWidth="0.5"
            opacity={0.3 - i * 0.03}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1={0}
            y1={30 + i * 40}
            x2={400}
            y2={30 + i * 40}
            stroke={accent}
            strokeWidth="0.3"
            opacity="0.15"
          />
        ))}
        {/* Sine wave */}
        <path
          d={`M 0 110 ${[...Array(20)].map((_, i) => `Q ${i * 20 + 10} ${110 + Math.sin(i) * 40} ${(i + 1) * 20} 110`).join(' ')}`}
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          opacity="0.5"
        />
      </svg>
    ),
    'AI/ML': (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id={`g-${title}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7b00ff" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill={`url(#g-${title})`} />
        {/* Neural network nodes */}
        {[[60, 60], [60, 110], [60, 160],
          [160, 40], [160, 90], [160, 140], [160, 190],
          [260, 60], [260, 110], [260, 160],
          [340, 110]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill={accent} opacity="0.4" />
        ))}
        {/* Connections */}
        {[[60,60,160,40],[60,60,160,90],[60,110,160,90],[60,110,160,140],
          [60,160,160,140],[60,160,160,190],[160,40,260,60],[160,90,260,60],
          [160,90,260,110],[160,140,260,110],[160,140,260,160],[160,190,260,160],
          [260,60,340,110],[260,110,340,110],[260,160,340,110]].map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth="0.5" opacity="0.2" />
        ))}
      </svg>
    ),
    'Full Stack': (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id={`g-${title}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill={`url(#g-${title})`} />
        {[0,1,2,3].map(i => (
          <rect key={i} x={40 + i * 85} y={70} width={60} height={80} rx="4"
            fill="none" stroke={accent} strokeWidth="0.8" opacity={0.3 - i * 0.04} />
        ))}
        {[0,1,2].map(i => (
          <line key={i} x1={100 + i * 85} y1={110} x2={125 + i * 85} y2={110}
            stroke={accent} strokeWidth="1" opacity="0.4" />
        ))}
      </svg>
    ),
    NLP: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id={`g-${title}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill={`url(#g-${title})`} />
        {[80,120,160,80,100].map((w, i) => (
          <rect key={i} x={40} y={40 + i * 32} width={w} height={14} rx="3"
            fill={accent} opacity={0.15 + i * 0.03} />
        ))}
        {[60,140,100,120].map((w, i) => (
          <rect key={i} x={240} y={40 + i * 40} width={w} height={14} rx="3"
            fill={accent} opacity={0.12 + i * 0.03} />
        ))}
        <path d="M 160 75 Q 200 60 240 75" fill="none" stroke={accent} strokeWidth="1" opacity="0.3" />
        <path d="M 160 110 Q 200 100 240 115" fill="none" stroke={accent} strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  };

  return (
    <div className="w-full h-full">
      {patterns[type] || patterns['AI/ML']}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * 8;
    const ry = ((x / rect.width) - 0.5) * -8;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
  };

  return (
    <div
      ref={cardRef}
      className="project-card holo-border reveal"
      style={{
        transitionDelay: `${index * 0.1}s`,
        transition: 'transform 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-overlay" />

      {/* Thumbnail */}
      <div
        className="relative overflow-hidden"
        style={{ height: '180px', background: 'var(--bg3)' }}
      >
        <ProjectThumbnail accent={project.accent} type={project.type} title={project.title} />
        {/* Color stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        />
        {/* Type badge */}
        <div className="absolute top-3 right-3">
          <span
            className="font-mono text-xs px-2 py-1 rounded-sm"
            style={{
              background: `${project.accent}18`,
              border: `1px solid ${project.accent}40`,
              color: project.accent,
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
            }}
          >
            {project.type}
          </span>
        </div>
        {/* Year */}
        <div className="absolute bottom-3 left-3">
          <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {project.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-1">
          <span className="font-mono text-xs tracking-wider" style={{ color: project.accent, opacity: 0.8 }}>
            {project.subtitle}
          </span>
        </div>

        <h3
          className="font-display text-2xl mb-3 leading-tight"
          style={{ letterSpacing: '0.05em' }}
        >
          {project.title.toUpperCase()}
        </h3>

        <p className="text-sm leading-relaxed mb-5" style={{ color: '#888', lineHeight: '1.7' }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
      />
    </div>
  );
}

function Publications() {
  return (
    <div className="mt-12">
      <p className="section-label mb-8 reveal">// Publications</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.publications.map((pub, i) => (
          <div
            key={i}
            className="glass glass-hover reveal p-4 sm:p-5 rounded-sm"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <span
                className="font-display text-2xl sm:text-3xl mt-1 flex-shrink-0"
                style={{ color: 'var(--cyan)', opacity: 0.4 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-body text-sm leading-relaxed mb-2 break-words" style={{ color: '#ccc' }}>
                  {pub.title}
                </p>
                <p className="font-mono text-xs break-words" style={{ color: 'var(--cyan)', opacity: 0.7 }}>
                  {pub.venue}
                </p>
                <p className="font-mono text-xs mt-1 break-words" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  DOI: {pub.doi}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const { projects } = data;
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="projects" className="pt-8 md:pt-10 pb-8 md:pb-10 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="reveal mb-10">
        <p className="section-label mb-4">// 01 — Selected Work</p>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2
            className="font-display leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.05em' }}
          >
            PROJECTS
          </h2>
          <p className="font-mono text-xs max-w-xs text-right" style={{ color: 'var(--muted)' }}>
            Research papers, production systems, and experimental builds.
          </p>
        </div>
        <hr className="hr-cyber mt-6" />
      </div>

      {/* Featured project - full width */}
      <div className="mb-8">
        <div
          ref={null}
          className="project-card holo-border reveal grid grid-cols-1 md:grid-cols-2"
        >
          <div className="card-overlay" />

          {/* Left: thumbnail */}
          <div
            className="relative overflow-hidden hidden md:block"
            style={{ minHeight: '320px', background: 'var(--bg3)' }}
          >
            <ProjectThumbnail
              accent={featured.accent}
              type={featured.type}
              title={featured.title}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, transparent 60%, var(--bg2))`,
              }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: `linear-gradient(90deg, ${featured.accent}, transparent)` }}
            />
          </div>

          {/* Right: content */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="font-mono text-xs mb-2" style={{ color: featured.accent, opacity: 0.8 }}>
              {featured.subtitle}
            </span>
            <h3
              className="font-display text-3xl md:text-4xl mb-4 leading-tight"
              style={{ letterSpacing: '0.05em' }}
            >
              {featured.title.toUpperCase()}
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#888', lineHeight: '1.8' }}>
              {featured.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {featured.tech.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2×2 grid for remaining projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rest.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <Publications />
    </section>
  );
}
