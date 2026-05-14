import data from '../data/portfolio.json';

export default function Education() {
  return (
    <section id="education" className="pt-8 md:pt-10 pb-20 md:pb-24 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="reveal mb-10">
        <p className="section-label mb-4">// Education</p>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2
            className="font-display leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.05em' }}
          >
            EDUCATION
          </h2>
          <p className="font-mono text-xs max-w-xs text-right" style={{ color: 'var(--muted)' }}>
            Academic foundations across CS, AI, and engineering.
          </p>
        </div>
        <hr className="hr-cyber mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.education.map((edu, i) => {
          const color = i === 0 ? 'var(--cyan)' : '#00ff9d';

          return (
            <div
              key={edu.school}
              className="glass glass-hover reveal rounded-sm p-6"
              style={{
                transitionDelay: `${i * 0.1}s`,
                borderTop: `2px solid ${color}30`,
              }}
            >
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <h3 className="font-mono text-xs tracking-wider" style={{ color }}>
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
                    {edu.highlight}
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
                  style={{ color, letterSpacing: '0.05em' }}
                >
                  {edu.gpa}
                </span>
                <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                  GPA
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {edu.courses.map((course) => (
                  <span key={course} className="tag" style={{ fontSize: '0.6rem' }}>
                    {course}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
