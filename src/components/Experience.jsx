import data from '../data/portfolio.json';

function ExperienceCard({ job, index }) {
  return (
    <div
      className="relative reveal"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {/* Timeline connector */}
      {index < data.experience.length - 1 && (
        <div
          className="absolute left-4 md:left-[calc(50%-1px)] top-full"
          style={{
            width: '1px',
            height: '2rem',
            background: 'linear-gradient(to bottom, rgba(0,229,255,0.3), transparent)',
          }}
        />
      )}

      <div
        className="glass glass-hover rounded-sm overflow-hidden"
        style={{
          borderLeft: `2px solid ${job.color}40`,
          transition: 'all 0.3s ease',
        }}
      >
        {/* Header */}
        <div
          className="p-6 pb-4"
          style={{
            background: `linear-gradient(135deg, ${job.color}08, transparent)`,
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3
                className="font-display text-2xl md:text-3xl leading-tight mb-1"
                style={{ letterSpacing: '0.05em' }}
              >
                {job.role.toUpperCase()}
              </h3>
              <p className="font-mono text-sm" style={{ color: job.color }}>
                {job.company}
              </p>
            </div>
            <div className="text-right">
              <span
                className="font-mono text-xs px-3 py-1 rounded-sm"
                style={{
                  background: `${job.color}12`,
                  border: `1px solid ${job.color}30`,
                  color: job.color,
                  whiteSpace: 'nowrap',
                }}
              >
                {job.period}
              </span>
              <p className="font-mono text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {job.location}
              </p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="p-6">
          <ul className="space-y-3">
            {job.highlights.map((h, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-2 flex-shrink-0"
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: job.color,
                    boxShadow: `0 0 6px ${job.color}`,
                  }}
                />
                <p className="text-sm leading-relaxed" style={{ color: '#999' }}>
                  {h}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="reveal mb-16">
        <p className="section-label mb-4">// 03 — Work History</p>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2
            className="font-display leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.05em' }}
          >
            EXPERIENCE
          </h2>
        </div>
        <hr className="hr-cyber mt-6" />
      </div>

      {/* Education cards */}
      <div className="mb-12">
        <p className="section-label mb-6 reveal" style={{ opacity: 0.7 }}>— Education</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {data.education.map((edu, i) => (
            <div
              key={i}
              className="glass glass-hover reveal rounded-sm p-6"
              style={{
                transitionDelay: `${i * 0.1}s`,
                borderTop: `2px solid ${i === 0 ? 'var(--cyan)' : '#00ff9d'}30`,
              }}
            >
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <h3 className="font-mono text-xs tracking-wider" style={{ color: i === 0 ? 'var(--cyan)' : '#00ff9d' }}>
                  {edu.school}
                </h3>
                {edu.highlight && (
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded-sm"
                    style={{
                      background: '#ffaa0015',
                      border: '1px solid #ffaa0040',
                      color: '#ffaa00',
                    }}
                  >
                    🏆 {edu.highlight}
                  </span>
                )}
              </div>
              <p className="font-body text-base font-medium mb-1" style={{ color: '#ddd' }}>
                {edu.degree}
              </p>
              <p className="font-mono text-xs mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {edu.period}
              </p>
              <div className="flex items-center gap-4">
                <span
                  className="font-display text-2xl"
                  style={{ color: i === 0 ? 'var(--cyan)' : '#00ff9d', letterSpacing: '0.05em' }}
                >
                  {edu.gpa}
                </span>
                <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>GPA</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {edu.courses.map(c => (
                  <span key={c} className="tag" style={{ fontSize: '0.6rem' }}>{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Work experience */}
      <p className="section-label mb-6 reveal" style={{ opacity: 0.7 }}>— Industry</p>
      <div className="space-y-6">
        {data.experience.map((job, i) => (
          <ExperienceCard key={i} job={job} index={i} />
        ))}
      </div>
    </section>
  );
}
