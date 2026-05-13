import data from '../data/portfolio.json';

const CATEGORY_ICONS = {
  Languages: '{ }',
  Frontend: '◈',
  'Backend & APIs': '⟁',
  'ML & AI': '◉',
  'DevOps & Cloud': '⬡',
  Databases: '⊟',
};

const CATEGORY_COLORS = {
  Languages: '#00e5ff',
  Frontend: '#ff006e',
  'Backend & APIs': '#00ff9d',
  'ML & AI': '#7b00ff',
  'DevOps & Cloud': '#ffaa00',
  Databases: '#00b8d4',
};

function SkillCategory({ category, skills, color, icon, index }) {
  return (
    <div
      className="glass glass-hover reveal rounded-sm p-6"
      style={{
        transitionDelay: `${index * 0.08}s`,
        borderTop: `2px solid ${color}30`,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className="font-mono text-lg"
          style={{ color, opacity: 0.8, minWidth: '1.5rem', textAlign: 'center' }}
        >
          {icon}
        </span>
        <h3 className="font-mono text-xs tracking-widest uppercase" style={{ color }}>
          {category}
        </h3>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="skill-chip">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// All skills flattened for the marquee
const ALL_SKILLS = Object.values(data.skills).flat();

export default function Skills() {
  const categories = Object.entries(data.skills);

  return (
    <section id="skills" className="py-32 overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-16 reveal">
        <p className="section-label mb-4">// 02 — Capabilities</p>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2
            className="font-display leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.05em' }}
          >
            SKILLS
          </h2>
          <p className="font-mono text-xs max-w-xs text-right" style={{ color: 'var(--muted)' }}>
            Tools and technologies I work with across the stack.
          </p>
        </div>
        <hr className="hr-cyber mt-6" />
      </div>

      {/* Skill grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(([category, skills], i) => (
            <SkillCategory
              key={category}
              category={category}
              skills={skills}
              color={CATEGORY_COLORS[category] || 'var(--cyan)'}
              icon={CATEGORY_ICONS[category] || '◆'}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div
        className="relative overflow-hidden py-4"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, var(--bg), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(-90deg, var(--bg), transparent)' }}
        />

        <div className="flex" style={{ width: 'max-content' }}>
          <div className="marquee-track flex gap-6 pr-6">
            {[...ALL_SKILLS, ...ALL_SKILLS].map((skill, i) => (
              <span
                key={i}
                className="font-mono text-xs whitespace-nowrap px-3 py-1.5"
                style={{
                  color: i % 7 === 0 ? 'var(--cyan)' :
                         i % 7 === 2 ? 'var(--pink)' :
                         i % 7 === 4 ? '#00ff9d' : 'rgba(255,255,255,0.25)',
                  letterSpacing: '0.1em',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Publications strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-16">
        <p className="section-label mb-8 reveal">// Publications</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.publications.map((pub, i) => (
            <div
              key={i}
              className="glass glass-hover reveal p-5 rounded-sm"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="font-display text-3xl mt-1 flex-shrink-0"
                  style={{ color: 'var(--cyan)', opacity: 0.4 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-body text-sm leading-relaxed mb-2" style={{ color: '#ccc' }}>
                    {pub.title}
                  </p>
                  <p className="font-mono text-xs" style={{ color: 'var(--cyan)', opacity: 0.7 }}>
                    {pub.venue}
                  </p>
                  <p className="font-mono text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    DOI: {pub.doi}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
