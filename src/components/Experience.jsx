import { memo } from 'react';
import data from '../data/portfolio.json';

function FlowDot({ delay = 0, color }) {
  return (
    <span
      className="absolute rounded-full"
      style={{
        width: '6px',
        height: '6px',
        background: color,
        boxShadow: `0 0 10px ${color}`,
        animation: 'archPacket 2s ease-in-out infinite',
        animationDelay: `${delay}s`,
      }}
    />
  );
}

function ExperienceThumbnail({ job }) {
  // Use index or role name to determine which architecture to show
  const isSE1 = job.role === "Software Engineer I";
  const isIntern = job.role === "Software Engineering Intern";
  const isML = job.role === "Machine Learning Project Trainee";

  return (
    <div className="arch-scene" style={{ '--project-accent': job.color, minHeight: '280px', display: 'flex', flexDirection: 'column' }}>
      <div className="arch-grid" />
      <p className="arch-title mb-4">
        {isSE1 ? "Microservice settlement architecture" : isIntern ? "K8s observability pipeline" : "NLP inference pipeline"}
      </p>

      <div className="relative flex-1 flex items-center justify-center w-full h-full">
        {isSE1 && (
          <div className="w-full h-full flex items-center justify-between px-2 gap-4">
            <div className="flex flex-col gap-3 z-10">
              <div className="border border-white/10 bg-white/5 rounded px-3 py-2 text-xs font-mono text-center">Legacy App</div>
              <div className="border border-white/10 bg-white/5 rounded px-3 py-2 text-xs font-mono text-center">Trade API</div>
            </div>
            <div className="relative flex-1 h-full flex items-center justify-center">
               <div className="absolute inset-x-0 h-[2px] bg-white/10 top-1/2 -translate-y-1/2" />
               <FlowDot delay={0} color={job.color} />
               <FlowDot delay={0.6} color={job.color} />
               <div className="border border-[var(--project-accent)] bg-[var(--project-accent)]/10 rounded-full px-4 py-2 text-xs font-mono text-[var(--project-accent)] z-10">Kafka Event Bus</div>
            </div>
            <div className="flex flex-col gap-3 z-10">
              <div className="border border-[var(--project-accent)]/50 bg-black/50 rounded px-3 py-2 text-xs font-mono text-center shadow-[0_0_15px_rgba(0,229,255,0.2)]">Spring Svc A</div>
              <div className="border border-[var(--project-accent)]/50 bg-black/50 rounded px-3 py-2 text-xs font-mono text-center shadow-[0_0_15px_rgba(0,229,255,0.2)]">Spring Svc B</div>
            </div>
          </div>
        )}

        {isIntern && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6">
            <div className="flex justify-center gap-6 w-full z-10">
              {[1, 2, 3].map((pod) => (
                <div key={pod} className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded border border-white/20 flex items-center justify-center bg-white/5 animate-pulse" style={{ animationDelay: `${pod * 0.3}s` }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: job.color, boxShadow: `0 0 8px ${job.color}` }} />
                  </div>
                  <span className="text-[10px] font-mono text-white/50">Pod {pod}</span>
                </div>
              ))}
            </div>
            <div className="relative w-full flex justify-center items-center">
              <div className="w-[2px] h-8 bg-white/10 absolute -top-8" />
              <div className="w-48 h-[2px] bg-white/10 absolute -top-8" />
              <div className="border border-[var(--project-accent)] bg-[var(--project-accent)]/10 rounded px-6 py-3 text-xs font-mono text-[var(--project-accent)] z-10 w-full text-center tracking-widest shadow-[0_0_20px_rgba(0,184,212,0.15)]">
                PROMETHEUS & GRAFANA
              </div>
            </div>
          </div>
        )}

        {isML && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
             <div className="flex items-center gap-4 z-10 w-full">
               <div className="border border-white/10 bg-white/5 rounded px-3 py-3 text-[10px] font-mono text-center flex-1">Raw Report<br/><span className="text-white/40">TXT / PDF</span></div>
               <div className="h-[2px] flex-1 bg-white/10 relative">
                  <FlowDot delay={0} color={job.color} />
               </div>
               <div className="border border-white/20 bg-white/10 rounded px-3 py-3 text-[10px] font-mono text-[var(--project-accent)] text-center flex-1 shadow-[0_0_10px_rgba(123,0,255,0.2)]">spaCy / NLTK<br/><span className="text-white/60">Features</span></div>
               <div className="h-[2px] flex-1 bg-white/10 relative">
                  <FlowDot delay={0.5} color={job.color} />
               </div>
               <div className="border border-[var(--project-accent)] bg-[var(--project-accent)]/20 rounded px-3 py-3 text-[10px] font-mono text-[var(--project-accent)] text-center flex-1 shadow-[0_0_20px_rgba(123,0,255,0.3)]">SVM Model<br/><span className="text-white/80">85% Acc</span></div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ExperienceCard({ job, index }) {
  return (
    <div
      className="relative reveal"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {/* Timeline connector */}
      {index < data.experience.length - 1 && (
        <div
          className="absolute left-4 md:left-[calc(50%-1px)] top-full hidden md:block"
          style={{
            width: '1px',
            height: '2rem',
            background: `linear-gradient(to bottom, ${job.color}60, transparent)`,
          }}
        />
      )}

      <div
        className="glass glass-hover rounded-sm overflow-hidden flex flex-col xl:flex-row relative z-10"
        style={{
          borderLeft: `2px solid ${job.color}60`,
          transition: 'all 0.3s ease',
        }}
      >
        {/* Visual / Architecture Section */}
        <div
          className="xl:w-[35%] border-b xl:border-b-0 xl:border-r"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="p-4 md:p-6 h-full flex flex-col justify-center">
            <ExperienceThumbnail job={job} />
          </div>
        </div>

        {/* Text Section */}
        <div className="xl:w-[65%] flex flex-col">
          {/* Header */}
          <div
            className="p-6 md:p-8 pb-4 md:pb-6"
            style={{
              background: `linear-gradient(135deg, ${job.color}0c, transparent)`,
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3
                  className="font-display text-3xl md:text-4xl leading-tight mb-2"
                  style={{ letterSpacing: '0.05em' }}
                >
                  {job.role.toUpperCase()}
                </h3>
                <p className="font-mono text-base md:text-lg" style={{ color: job.color }}>
                  {job.company}
                </p>
              </div>
              <div className="text-right">
                <span
                  className="font-mono text-xs md:text-sm px-3 py-1.5 rounded-sm inline-block mb-2"
                  style={{
                    background: `${job.color}12`,
                    border: `1px solid ${job.color}30`,
                    color: job.color,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {job.period}
                </span>
                <p className="font-mono text-xs md:text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {job.location}
                </p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="p-6 md:p-8 flex-1 flex flex-col">
            <ul className="space-y-4 flex-1">
              {job.highlights.map((h, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="mt-2.5 flex-shrink-0"
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: job.color,
                      boxShadow: `0 0 8px ${job.color}`,
                    }}
                  />
                  <p className="text-base leading-relaxed text-gray-300">
                    {h}
                  </p>
                </li>
              ))}
            </ul>

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <div
                className="flex flex-wrap gap-2 mt-8 pt-6"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
              >
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono px-3 py-1.5 rounded-sm"
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      background: `${job.color}0c`,
                      border: `1px solid ${job.color}25`,
                      color: job.color,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(function Experience() {
  return (
    <section id="experience" className="pt-20 md:pt-24 pb-8 md:pb-10 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="reveal mb-10">
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

      <div className="space-y-6">
        {data.experience.map((job, i) => (
          <ExperienceCard key={i} job={job} index={i} />
        ))}
      </div>
    </section>
  );
}
);
