import { useState } from 'react';
import data from '../data/portfolio.json';

const PROJECT_DETAILS = {
  'Constraint-Aware Financial Disclosure Search Engine': {
    tags: ['IR SYSTEM', 'FINANCE AI'],
    bullets: [
      'Retrieves exact SEC 10-K evidence passages instead of returning full filings.',
      'Combines BM25, FinBERT-style dense search, hybrid ranking, and constraint penalties.',
      'Explains why each result ranked highly through score breakdowns and mismatch labels.',
    ],
    metrics: [
      { value: 'S&P 100', label: '10-K filing universe' },
      { value: '200-250', label: 'word evidence chunks' },
      { value: '5+', label: 'query constraint types' },
    ],
    workflow: [
      'Ingest SEC EDGAR 10-K filings and extract Item 1A / Item 7 sections.',
      'Chunk filings into passage-level evidence with company, year, sector, ticker, and region metadata.',
      'Run BM25 and dense vector retrieval in OpenSearch, then apply constraint-aware re-ranking.',
      'Return citable passages with coverage status, penalties, and transparent final scores.',
    ],
    diagram: {
      title: 'Constraint-aware retrieval loop',
      nodes: ['SEC 10-Ks', 'Passage Index', 'BM25 + FinBERT', 'Constraint Ranker', 'Evidence Results'],
      output: 'Transparent passage scores',
    },
  },
  'Critic-Guided Iterative RAG for QA': {
    tags: ['AGENTIC RAG', 'NLP'],
    bullets: [
      'Implements a control loop where an LLM critic evaluates context sufficiency before generating an answer.',
      'Triggers automatic query rewriting and secondary retrieval passes when evidence is incomplete or off-topic.',
      'Mitigates hallucinations by ensuring answers are only generated when the retrieved context provides full support.',
    ],
    metrics: [
      { value: '3', label: 'retrieval pipelines compared' },
      { value: '3', label: 'QA datasets evaluated' },
      { value: '7B+', label: 'stronger model sweet spot' },
    ],
    workflow: [
      'Retrieve top-k passages for the original question using dense search.',
      'Ask the critic to label the context as sufficient, partial, or insufficient.',
      'Rewrite the query when the critic finds missing evidence, then retrieve again.',
      'Generate the final answer only after the loop finds enough supporting context or reaches max iterations.',
    ],
    diagram: {
      title: 'Critic-guided answer loop',
      nodes: ['Question', 'Retriever', 'Context Critic', 'Query Rewriter', 'Grounded Answer'],
      output: 'Stops when evidence is sufficient',
    },
  },
  'Signal Detection in RSMA': {
    tags: ['DEEP LEARNING', 'WIRELESS'],
    bullets: [
      'Models noisy multi-user wireless channels with temporal sequence learning.',
      'Uses LSTM-based detection to reduce bit errors in RSMA communication systems.',
      'Published as lead author at IEEE NCC 2023.',
    ],
    metrics: [
      { value: 'IEEE', label: 'NCC 2023 publication' },
      { value: 'LSTM', label: 'sequence detector' },
      { value: '5G+', label: 'wireless research domain' },
    ],
    workflow: [
      'Simulate two-user RSMA channel data under noisy transmission settings.',
      'Represent received signals as temporal sequences for the neural detector.',
      'Train the LSTM model to infer transmitted symbols from noisy observations.',
      'Compare bit-error behavior against conventional signal detection baselines.',
    ],
    diagram: {
      title: 'Neural signal detection path',
      nodes: ['RSMA Signal', 'Noisy Channel', 'Sequence Window', 'LSTM Detector', 'Symbol Decision'],
      output: 'Lower bit-error detection',
    },
  },
  'Radiogenomic Brain Tumor Classification': {
    tags: ['MEDICAL AI', 'COMPUTER VISION'],
    bullets: [
      'Predicts IDH genetic biomarker status from MRI scans using transfer learning.',
      'Compares ResNet and AlexNet-style CNN pipelines on radiogenomic data.',
      'Published as lead author at IEEE INDICON 2022.',
    ],
    metrics: [
      { value: '82%', label: 'classification accuracy' },
      { value: 'MRI', label: 'medical imaging input' },
      { value: 'IEEE', label: 'INDICON 2022 publication' },
    ],
    workflow: [
      'Extract tumor-relevant MRI slices from the RSNA-MICCAI dataset.',
      'Apply preprocessing and augmentation to improve model robustness.',
      'Train transfer-learning CNN models to classify IDH mutation status.',
      'Evaluate predictions as a non-invasive signal for treatment-response planning.',
    ],
    diagram: {
      title: 'Radiogenomic classification path',
      nodes: ['MRI Slices', 'Augmentation', 'CNN Backbone', 'Feature Head', 'IDH Prediction'],
      output: '82% classification accuracy',
    },
  },
  'AI-Powered Document Classifier': {
    tags: ['LLM API', 'OCR'],
    bullets: [
      'Processes PDF uploads through a FastAPI document analysis service.',
      'Falls back to OCR when text extraction is weak or scanned pages are present.',
      'Uses local LLM inference to classify documents from extracted page content.',
    ],
    metrics: [
      { value: 'API', label: 'Swagger-testable service' },
      { value: 'OCR', label: 'scanned PDF fallback' },
      { value: 'LLM', label: 'document classification layer' },
    ],
    workflow: [
      'Upload a PDF through the API endpoint or Swagger interface.',
      'Extract embedded text with PyMuPDF and run OCR fallback with Tesseract when needed.',
      'Compute page-level legibility, image counts, text spans, and processing diagnostics.',
      'Send extracted content to an Ollama-hosted LLM for final document classification.',
    ],
    diagram: {
      title: 'Document intelligence pipeline',
      nodes: ['PDF Upload', 'Text Extractor', 'OCR Fallback', 'LLM Classifier', 'JSON Response'],
      output: 'Page diagnostics + class label',
    },
  },
  'NLP Topic Summarizer': {
    tags: ['NLP', 'SUMMARIZATION'],
    bullets: [
      'Aggregates raw web content from multiple sources for a given topic.',
      'Uses a BART transformer to generate abstractive summaries.',
      'Wraps the summarization pipeline in an interactive Flask frontend.',
    ],
    metrics: [
      { value: 'BART', label: 'abstractive model' },
      { value: 'Flask', label: 'interactive UI' },
      { value: 'Multi', label: 'source summarization' },
    ],
    workflow: [
      'Scrape topic-related web pages and extract clean article text.',
      'Normalize and preprocess content before transformer inference.',
      'Generate concise summaries using a BART-based abstractive model.',
      'Serve the result through a lightweight Flask application.',
    ],
    diagram: {
      title: 'Multi-source summarization flow',
      nodes: ['Web Sources', 'Text Cleaner', 'BART Model', 'Summary Builder', 'Flask UI'],
      output: 'Coherent topic overview',
    },
  },
  'Financial Research Agent Platform': {
    tags: ['AI AGENTS', 'FINANCE'],
    bullets: [
      'Automates financial research using an ensemble of specialized AI agents.',
      'Aggregates real-time market data, earnings reports, and news sentiment.',
      'Generates comprehensive analysis reports with citations and structured data.',
    ],
    metrics: [
      { value: 'Agents', label: 'specialized roles' },
      { value: 'Real-time', label: 'market data ingestion' },
      { value: 'Web', label: 'interactive platform' },
    ],
    workflow: [
      'User requests research on a specific stock, sector, or macroeconomic trend.',
      'Data-gathering agents fetch real-time pricing, news, and financial statements.',
      'Analyst agents process the raw data to identify trends and summarize sentiment.',
      'The platform compiles the findings into a structured, easy-to-read report.',
    ],
    diagram: {
      title: 'Agentic research workflow',
      nodes: ['User Query', 'Data Agents', 'Analyst Agents', 'Report Generator', 'Web UI'],
      output: 'Actionable financial insights',
    },
  },
};

function FlowDot({ delay = 0 }) {
  return <span className="arch-flow-dot" style={{ animationDelay: `${delay}s` }} />;
}

function FinancialSearchArchitecture({ project }) {
  return (
    <div className="arch-scene financial-scene" style={{ '--project-accent': project.accent }}>
      <div className="arch-grid" />
      <p className="arch-title">SEC disclosure search architecture</p>

      <div className="finance-layout">
        <div className="sec-docs">
          <span className="arch-label">SEC EDGAR</span>
          {['AAPL 10-K', 'JPM 10-K', 'NVDA 10-K'].map((doc, index) => (
            <div key={doc} className="sec-doc" style={{ animationDelay: `${index * 0.18}s` }}>
              <strong>{doc}</strong>
              <span>Item 1A / Item 7</span>
            </div>
          ))}
        </div>

        <div className="finance-ingest-line">
          <FlowDot delay={0} />
          <FlowDot delay={0.45} />
          <FlowDot delay={0.9} />
        </div>

        <div className="vector-store">
          <div className="db-cylinder">
            <span />
            <span />
            <span />
          </div>
          <strong>OpenSearch</strong>
          <p>BM25 + FinBERT vectors</p>
        </div>

        <div className="search-console">
          <div className="search-bar">
            <span>Search</span>
            <p>FX volatility revenue pressure 2023</p>
          </div>
          <div className="constraint-chips">
            {['FY 2023', 'Financials', 'Region', 'Ticker'].map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </div>

        <div className="result-cards">
          <span className="arch-label">Ranked evidence</span>
          {[92, 86, 78].map((score, index) => (
            <div key={score} className="result-card" style={{ animationDelay: `${index * 0.2}s` }}>
              <strong>Passage score {score}</strong>
              <span>company + fiscal year + section</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RagArchitecture({ project }) {
  return (
    <div className="arch-scene rag-scene" style={{ '--project-accent': project.accent }}>
      <div className="arch-grid" />
      <p className="arch-title">Agentic RAG control loop</p>
      <div className="rag-loop">
        <div className="rag-question">Question</div>
        <div className="rag-store">
          <strong>Retriever</strong>
          <span>top-k passages</span>
        </div>
        <div className="rag-critic">
          <strong>Critic</strong>
          <span>SUFFICIENT?</span>
        </div>
        <div className="rag-rewrite">
          <strong>Rewrite</strong>
          <span>if partial / missing</span>
        </div>
        <div className="rag-answer">Grounded answer</div>
        <div className="rag-loop-line">
          <FlowDot delay={0} />
          <FlowDot delay={0.55} />
        </div>
      </div>
    </div>
  );
}

function SignalArchitecture({ project }) {
  return (
    <div className="arch-scene signal-scene" style={{ '--project-accent': project.accent }}>
      <div className="arch-grid" />
      <p className="arch-title">RSMA neural detector pipeline</p>
      <div className="signal-wave">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((bar) => (
          <span key={bar} style={{ animationDelay: `${bar * 0.08}s` }} />
        ))}
      </div>
      <div className="signal-pipeline">
        {['RSMA symbols', 'Noisy channel', 'Sequence window', 'LSTM cells', 'Decoded bits'].map((label, index) => (
          <div key={label} className={index === 3 ? 'signal-block lstm' : 'signal-block'}>
            <strong>{label}</strong>
            {index === 3 && (
              <div className="lstm-cells">
                {[0, 1, 2, 3].map((cell) => <span key={cell} />)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MedicalArchitecture({ project }) {
  return (
    <div className="arch-scene medical-scene" style={{ '--project-accent': project.accent }}>
      <div className="arch-grid" />
      <p className="arch-title">MRI to biomarker prediction</p>
      <div className="medical-layout">
        <div className="mri-stack">
          {[0, 1, 2].map((slice) => (
            <div key={slice} className="mri-slice" style={{ animationDelay: `${slice * 0.18}s` }}>
              <span />
            </div>
          ))}
          <p>MRI slices</p>
        </div>
        <div className="cnn-layers">
          {[0, 1, 2, 3, 4].map((layer) => <span key={layer} />)}
        </div>
        <div className="prediction-card">
          <span>IDH status</span>
          <strong>Mutation probability</strong>
          <div className="confidence-bar"><span /></div>
        </div>
      </div>
    </div>
  );
}

function DocumentArchitecture({ project }) {
  return (
    <div className="arch-scene document-scene" style={{ '--project-accent': project.accent }}>
      <div className="arch-grid" />
      <p className="arch-title">PDF classification service</p>
      <div className="document-layout">
        <div className="pdf-card">
          <strong>PDF</strong>
          <span>uploaded file</span>
        </div>
        <div className="doc-process">
          {['PyMuPDF text', 'Tesseract OCR', 'Legibility score', 'Ollama LLM'].map((step, index) => (
            <div key={step} style={{ animationDelay: `${index * 0.12}s` }}>{step}</div>
          ))}
        </div>
        <div className="json-output">
          <span>{'{'}</span>
          <p>"class": "report"</p>
          <p>"pages": 12</p>
          <p>"score": 0.91</p>
          <span>{'}'}</span>
        </div>
      </div>
    </div>
  );
}

function SummarizerArchitecture({ project }) {
  return (
    <div className="arch-scene summary-scene" style={{ '--project-accent': project.accent }}>
      <div className="arch-grid" />
      <p className="arch-title">Multi-source summarization path</p>
      <div className="summary-layout">
        <div className="web-pages">
          {[0, 1, 2].map((page) => (
            <div key={page} className="web-page">
              <span />
              <span />
              <span />
            </div>
          ))}
        </div>
        <div className="bart-core">
          <strong>BART</strong>
          <span>abstractive transformer</span>
        </div>
        <div className="summary-output">
          <strong>Topic overview</strong>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function FinancialAgentArchitecture({ project }) {
  return (
    <div className="arch-scene summary-scene" style={{ '--project-accent': project.accent }}>
      <div className="arch-grid" />
      <p className="arch-title">Multi-agent research pipeline</p>
      <div className="summary-layout">
        <div className="web-pages">
          {[0, 1].map((agent) => (
            <div key={agent} className="web-page">
              <span style={{ backgroundColor: project.accent, opacity: 0.5 }} />
              <span />
            </div>
          ))}
        </div>
        <div className="bart-core" style={{ border: `1px solid ${project.accent}50` }}>
          <strong style={{ color: project.accent }}>LangChain</strong>
          <span>Agent Swarm</span>
        </div>
        <div className="summary-output">
          <strong>Research Report</strong>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function ProjectMotionDiagram({ project, details }) {
  if (project.title === 'Constraint-Aware Financial Disclosure Search Engine') {
    return <FinancialSearchArchitecture project={project} />;
  }
  if (project.title === 'Critic-Guided Iterative RAG for QA') {
    return <RagArchitecture project={project} />;
  }
  if (project.title === 'Signal Detection in RSMA') {
    return <SignalArchitecture project={project} />;
  }
  if (project.title === 'Radiogenomic Brain Tumor Classification') {
    return <MedicalArchitecture project={project} />;
  }
  if (project.title === 'AI-Powered Document Classifier') {
    return <DocumentArchitecture project={project} />;
  }
  if (project.title === 'NLP Topic Summarizer') {
    return <SummarizerArchitecture project={project} />;
  }
  if (project.title === 'Financial Research Agent Platform') {
    return <FinancialAgentArchitecture project={project} />;
  }
  return <RagArchitecture project={project} details={details} />;
}

function ProjectPanel({ project, index }) {
  const [activeTab, setActiveTab] = useState('overview');
  const details = PROJECT_DETAILS[project.title] || {
    tags: [project.type],
    bullets: [project.description],
    metrics: [{ value: '', label: project.type }],
    workflow: ['Review the GitHub repository for implementation details.'],
  };

  return (
    <article
      className="project-panel reveal"
      style={{ transitionDelay: `${index * 0.08}s`, borderColor: `${project.accent}28` }}
    >
      <div className="project-panel-glow" style={{ background: project.accent }} />

      <div className="project-panel-header">
        <div className="flex flex-wrap gap-2">
          {details.tags.map((tag) => (
            <span key={tag} className="project-pill" style={{ color: project.accent, borderColor: `${project.accent}55`, background: `${project.accent}14` }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="project-tabs" role="tablist" aria-label={`${project.title} details`}>
          {[
            ['overview', 'Overview'],
            ['workflow', 'How It Works'],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={activeTab === key ? 'project-tab active' : 'project-tab'}
              style={activeTab === key ? { background: project.accent, borderColor: project.accent } : undefined}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="project-panel-body">
        <div className="project-copy">
          <p className="font-mono text-xs tracking-wider mb-3" style={{ color: project.accent, opacity: 0.85 }}>
            {project.subtitle}
          </p>
          <h3 className="project-panel-title">{project.title}</h3>
          <p className="project-panel-description">{project.description}</p>

          {activeTab === 'overview' ? (
            <ul className="project-bullets">
              {details.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : (
            <ol className="project-steps">
              {details.workflow.map((step, stepIndex) => (
                <li key={step}>
                  <span style={{ color: project.accent }}>{String(stepIndex + 1).padStart(2, '0')}</span>
                  {step}
                </li>
              ))}
            </ol>
          )}

          <div className="flex flex-wrap gap-2 mt-7">
            {project.tech.map((tech) => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="project-link mt-5"
              aria-label={`Open ${project.title} on GitHub`}
            >
              GitHub
            </a>
          )}
        </div>

        <aside className="project-proof-card">
          {activeTab === 'overview' ? (
            <>
              <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color: project.accent }}>
                Evidence
              </p>
              <div className="space-y-6">
                {details.metrics.map((metric) => (
                  <div key={`${metric.value}-${metric.label}`} className="project-metric">
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color: project.accent }}>
                Live Diagram
              </p>
              <ProjectMotionDiagram project={project} details={details} />
            </>
          )}
        </aside>
      </div>
    </article>
  );
}

function Publications() {
  return (
    <div className="mt-12">
      <p className="section-label mb-8 reveal">// Publications</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.publications.map((pub, i) => (
          <div
            key={pub.doi}
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
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs break-words" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    DOI: {pub.doi}
                  </span>
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link"
                      aria-label={`Open IEEE publication for ${pub.title}`}
                    >
                      IEEE
                    </a>
                  )}
                </div>
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

  return (
    <section id="projects" className="pt-8 md:pt-10 pb-8 md:pb-10 px-6 md:px-10 max-w-7xl mx-auto">
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
            Research systems and AI products with implementation detail.
          </p>
        </div>
        <hr className="hr-cyber mt-6" />
      </div>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <ProjectPanel key={project.id} project={project} index={index} />
        ))}
      </div>

      <Publications />
    </section>
  );
}
