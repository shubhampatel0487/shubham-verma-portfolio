# Shubham Patel — Personal Portfolio Website
### Aspiring Robotics & AI Engineer | Computer Science & Engineering

> *"Engineering Intelligence. Building the Future."*  
> *"Where Code Meets Machines, Intelligence Meets Reality."*

A luxury futuristic dark-themed personal portfolio engineered specifically for **Shubham Patel**. Designed with a sophisticated N101-inspired cyberpunk palette, interactive 3D particle canvas, full responsiveness, verified academic background, honest capability appraisals, and deep architectural breakdowns for featured engineering projects.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS (Dark theme design tokens: `#080B12`, `#0E1420`, `#141C2A`, `#38BDF8`, `#8B5CF6`)
- **Animations:** Lightweight HTML5 Canvas particle & orbital network mesh, custom desktop cursor, smooth scroll navigation
- **Icons:** Custom SVG icons & Lucide Icons
- **SEO & Accessibility:** Open Graph metadata, Twitter Cards, JSON-LD Schema markup, `sitemap.xml`, `robots.txt`, `prefers-reduced-motion` compliance
- **Build Tool:** Vite 6 with TypeScript type-checking

---

## 📁 Project Structure

```text
PORTFOLIO/
├── public/
│   ├── favicon.svg               # Cybernetic SP monogram favicon
│   ├── robots.txt                # Search engine crawler permissions
│   ├── sitemap.xml               # Search index sitemap
│   ├── images/
│   │   └── portrait-placeholder.svg  # High-end futuristic portrait placeholder
│   ├── projects/
│   │   ├── pinn-battery.svg      # PINN Battery Digital Twin schematic graphic
│   │   ├── trustguard.svg        # TrustGuard Anti-Scam schematic graphic
│   │   ├── assignment-checker.svg# Assignment Checker workflow graphic
│   │   ├── robotics-iot.svg      # Robotics & IoT Microcontroller schematic
│   │   └── ros2-drone.svg        # ROS 2 & Drone Simulation schematic
│   └── resume/
│       └── Shubham_Patel_Resume.pdf  # Verified downloadable PDF resume
├── src/
│   ├── assets/                   # Static imports
│   ├── components/
│   │   ├── About/                # Bio, engineering philosophy & mission
│   │   ├── Certifications/       # Honest credentials state & roadmap
│   │   ├── Contact/              # Real input validation & mailto dispatch
│   │   ├── Education/            # Vertical verified academic timeline
│   │   ├── Experience/           # Independent research & lab timeline
│   │   ├── Footer/               # Dynamic copyright, social links & back-to-top
│   │   ├── Hero/                 # Typewriter hero, orbital portrait & status
│   │   ├── Interests/            # Robotics, AI, PINN & drone trajectory
│   │   ├── Navbar/               # Dark blur fixed navbar & active link tracker
│   │   ├── Profiles/             # GitHub, LinkedIn & Email cards
│   │   ├── Projects/             # Filterable project cards & live links
│   │   └── UI/
│   │       ├── CustomCursor.tsx  # Smooth desktop cursor
│   │       ├── CyberBackground.tsx # Interactive canvas mesh
│   │       ├── Icons.tsx         # Crisp SVG brand icons
│   │       ├── ProjectModal.tsx  # Deep dive project architecture modal
│   │       ├── ResumeModal.tsx   # In-app CV preview modal
│   │       └── ScrollProgress.tsx# Top scroll progress bar
│   ├── data/
│   │   └── portfolioData.ts      # ⭐ CENTRALIZED CONFIGURATION (Edit details here!)
│   ├── styles/
│   │   └── index.css             # Tailwind base & custom cybernetic utilities
│   ├── types/
│   │   └── portfolio.ts          # TypeScript interfaces
│   ├── App.tsx                   # Main layout container
│   └── main.tsx                  # Application entry point
├── index.html                    # SEO & OpenGraph metadata
├── tailwind.config.js            # Design tokens & palette
├── vite.config.ts                # Vite config
├── tsconfig.json                 # Strict TypeScript config
└── package.json
```

---

## ⚡ Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory with zero TypeScript or bundling errors.

### 4. Preview Production Build
```bash
npm run preview
```

---

## ✏️ How to Customize Personal Details

All personal profile information, skills, projects, and contact channels are isolated inside a single file:
👉 **`src/data/portfolioData.ts`**

### 1. Update Contact & Social URLs
Open `src/data/portfolioData.ts` and edit:
```typescript
contact: {
  email: "your_real_email@gmail.com",
  githubUsername: "your_github_username",
  githubUrl: "https://github.com/your_username",
  linkedinUrl: "https://linkedin.com/in/your_profile",
  locationCity: "Ambedkar Nagar, UP",
  locationCountry: "India"
}
```

### 2. Replace the Portrait Photo
1. Copy your portrait photo (e.g. `profile.jpg` or `profile.png`) to `public/images/profile.jpg`.
2. In `src/components/Hero/Hero.tsx`, change:
   ```tsx
   src="/images/portrait-placeholder.svg"
   ```
   to:
   ```tsx
   src="/images/profile.jpg"
   ```

### 3. Replace or Update Resume PDF
Place your updated resume inside `public/resume/Shubham_Patel_Resume.pdf`.

---

## 🚀 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Framework Preset: **Vite**.
5. Click **Deploy**. Vercel will build and serve your portfolio globally on HTTPS.

### Deploy to Netlify
1. Sign in to [Netlify](https://www.netlify.com/).
2. Select **"Import from Git"** and pick this repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy Site**.

### Deploy to GitHub Pages
1. In `vite.config.ts`, set `base: '/<repository-name>/'`.
2. Run `npm run build`.
3. Deploy the `dist` folder to the `gh-pages` branch.

---

## 🛡️ Verification & Ethics Statement

- **No Fabricated Employment:** Experience entries strictly represent independent research, laboratory practice, and academic systems engineering.
- **Accurate Academic Credentials:** 
  - Class 10 (2022, 77.5%, Ram Dev Janta Inter College)
  - Class 12 Science PCM (2023, 78.6%, Jhinka Devi Patel Balika Inter College)
  - Diploma in Computer Science & Engineering (2023–2026, Chhatrapati Shahu Ji Maharaj Govt Polytechnic)
- **Honest Skill Proficiency:** Skills feature granular descriptions explaining real-world lab and coursework application.
- **No Unearned Certifications:** Dedicated empty state and study roadmap provided without fake certificates.
