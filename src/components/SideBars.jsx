import data from '../data/portfolio.json';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.13-4.56-5.05 0-1.11.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.04A9.35 9.35 0 0 1 12 6.99c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.04 2.75-1.04.55 1.4.2 2.44.1 2.7.64.71 1.03 1.63 1.03 2.74 0 3.93-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.1 10.1 0 0 0 22 12.22C22 6.58 17.52 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const MediumIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13.54 12c0 3.73-3.03 6.76-6.77 6.76S0 15.73 0 12s3.03-6.76 6.77-6.76 6.77 3.03 6.77 6.76zm7.43 0c0 3.51-1.51 6.36-3.37 6.36s-3.37-2.85-3.37-6.36 1.51-6.36 3.37-6.36 3.37 2.85 3.37 6.36zM24 12c0 3.14-.53 5.69-1.18 5.69s-1.18-2.55-1.18-5.69.53-5.69 1.18-5.69S24 8.86 24 12z" />
  </svg>
);

const KaggleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.84 24h-4.08c-.57 0-.9-.21-1.23-.68l-4.67-6.07-1.35 1.29v4.6c0 .55-.31.86-.86.86H3.55c-.55 0-.86-.31-.86-.86V.86c0-.55.31-.86.86-.86h3.1c.55 0 .86.31.86.86v11.7l5.93-6.7c.37-.43.68-.61 1.23-.61h3.69c.76 0 1.04.75.51 1.29l-6.55 7.11 7.1 9c.44.61.15 1.35-.58 1.35z" />
  </svg>
);

const SOCIAL_LINKS = [
  { key: 'github', label: 'GitHub', Icon: GithubIcon },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedinIcon },
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
  { key: 'medium', label: 'Medium', Icon: MediumIcon },
  { key: 'kaggle', label: 'Kaggle', Icon: KaggleIcon },
];

export default function SideBars() {
  const { personal } = data;

  return (
    <>
      <aside className="side-rail side-rail-left" aria-label="Social links">
        {SOCIAL_LINKS.map(({ key, label, Icon }) => (
          personal[key] ? (
            <a key={key} href={personal[key]} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon />
            </a>
          ) : null
        ))}
      </aside>

      <aside className="side-rail side-rail-right" aria-label="Email link">
        <a className="side-email" href={`mailto:${personal.email}`}>
          {personal.email}
        </a>
      </aside>
    </>
  );
}
