# Spoorthy K.R. — Portfolio

A dark-mode, immersive portfolio with WebGL-like particle interactions, glassmorphism, and 90s retro-futuristic aesthetics. Built with React + Vite + Tailwind CSS.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

---

## 📁 Project Structure

```
portfolio/
├── index.html                  # HTML entry with Google Fonts
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root component + scroll observer
    ├── index.css               # Global styles, animations, design system
    ├── data/
    │   └── portfolio.json      # ← ALL CONTENT LIVES HERE (update this!)
    └── components/
        ├── Navbar.jsx          # Fixed transparent navbar
        ├── ParticleCanvas.jsx  # Canvas particle system w/ mouse interaction
        ├── Hero.jsx            # Full-viewport hero + typewriter animation
        ├── Projects.jsx        # Featured + card grid with 3D hover
        ├── Skills.jsx          # Categorized skill grid + marquee strip
        ├── Experience.jsx      # Work timeline + education cards
        └── Contact.jsx         # Minimal CTA footer + social links
```

---

## ✏️ Updating Your Content

**Everything is driven from `src/data/portfolio.json`.** Just edit that file to update the site.

### Personal Info
```json
"personal": {
  "name": "Your Name",
  "role": "Your Role",
  "tagline": "Your tagline...",
  "email": "you@email.com",
  "github": "https://github.com/you",
  "linkedin": "https://linkedin.com/in/you"
}
```

### Adding a Project
```json
{
  "id": 6,
  "title": "Project Title",
  "subtitle": "Where it was built",
  "description": "2-3 sentence description...",
  "tech": ["React", "Python", "etc"],
  "accent": "#00e5ff",        // Card accent color (hex)
  "type": "Full Stack",       // Research | AI/ML | Full Stack | NLP
  "year": "2025",
  "link": "https://github.com/..." // or null
}
```

### Adding a Skill Category
```json
"skills": {
  "New Category": ["Skill A", "Skill B", "Skill C"]
}
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Background | `#0a0a0a` | Page background |
| Cyan | `#00e5ff` | Primary accent |
| Pink | `#ff006e` | Secondary accent |
| Violet | `#7b00ff` | Tertiary accent |
| Neo Green | `#00ff9d` | Status indicators |
| Font Display | Bebas Neue | Headings |
| Font Mono | JetBrains Mono | Labels, tags, code |
| Font Body | Outfit | Paragraphs |

---

## 🌐 Deployment

Deploy to **Vercel** (recommended):
```bash
npm run build
# Then drag the `dist/` folder to vercel.com/new
```

Or **Netlify**:
```bash
npm run build
# Drag `dist/` to netlify.com/drop
```
