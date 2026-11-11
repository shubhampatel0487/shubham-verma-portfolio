# Portfolio Architecture & Safe Update Guidelines

This document establishes the architecture, separation of concerns, and protocols for updating the portfolio safely without breaking existing UI or design integrity.

---

## 1. Directory Structure & Separation of Concerns

```
PORTFOLIO/
├── public/                     # Static media & assets (do not alter without reference check)
│   ├── assets/profile/         # Verified portrait and background images
│   ├── documents/              # Resumes, transcripts, VCF contact card
│   ├── projects/               # Benchtop hardware photographs & project assets
│   └── videos/                 # Verified project demonstration videos (.mp4)
│
├── src/
│   ├── data/                   # 1. CONTENT & DATA LAYER (All project text, metadata, links)
│   │   ├── portfolioData.ts    # Single Source of Truth: Bio, Contacts, Skills, Education
│   │   ├── videoData.ts        # Video library items, durations, tags, and filepaths
│   │   └── projectCodeData.ts  # Code files for CodeExplorer & Project code trees
│   │
│   ├── types/                  # Type definitions ensuring TypeScript build integrity
│   │   └── portfolio.ts        # Interfaces for ProjectItem, SkillItem, etc.
│   │
│   ├── styles/                 # 2. STYLING LAYER
│   │   └── index.css           # Global Tailwind directives, scrollbar rules, fonts
│   │
│   ├── utils/                  # 3. BUSINESS LOGIC & HELPERS
│   │   └── audio.ts            # Cyber audio synthesizer (Web Audio API soundFX)
│   │
│   └── components/             # 4. MODULAR UI COMPONENTS
│       ├── Navbar/             # Fixed Cyber Capsule Navigation
│       ├── Hero/               # High-tech Cyber Hero with social links
│       ├── About/              # About Me, Narrative Pillars, Engineering Philosophy
│       ├── Skills/             # Radar, categorized skills, proficiency metrics
│       ├── EngineeringLabs/    # 3D Interactive Labs (Robotic Arm, Drone, ESP32, Cyber Terminal)
│       ├── Exploded3DView/     # Three.js 7-layer CAD hardware teardown
│       ├── FeaturedShowcase/   # Three flagship projects deep-dive
│       ├── VideoLibrary/       # Video modal player with custom playback controls
│       ├── DiagramViewer/      # 4 interactive EDA schematics & system topologies
│       ├── Projects/           # Filterable projects grid & architecture matrix
│       ├── Education/          # Academic transcripts, BTEUP marksheets
│       ├── Contact/            # Direct messaging form, WhatsApp, LinkedIn
│       └── Footer/             # Persistent cyber-engineering footer
```

---

## 2. Safe Update Protocols

### A. How to Add or Update a Project
1. **Never edit the UI component** to change project descriptions, titles, or tags.
2. Edit `src/data/portfolioData.ts`:
   - Locate `projects` array.
   - Modify or append the project following the `ProjectItem` interface.
3. If the project has an interactive code snippet, update `src/data/projectCodeData.ts`.
4. If adding media:
   - Place photos in `public/projects/<project-slug>/`.
   - Place videos in `public/videos/<project-slug>.mp4`.
5. Run `npm run build` to verify types.

### B. How to Add or Replace a Video
1. Place the new `.mp4` video in `public/videos/`.
2. Add the video metadata in `src/data/videoData.ts` under `PROJECT_VIDEOS`.
3. The `VideoLibrary` UI component will automatically render the new video card with thumbnail, player, and speed controls without code modifications.

### C. How to Update Social or Contact Links
1. Update `personalProfile.contact` in `src/data/portfolioData.ts`.
2. All components (`Navbar`, `Hero`, `Profiles`, `Contact`, `Footer`, `ResumeModal`, `ShubhamAI`) consume this object dynamically.

---

## 3. Git Safety & Rollback Commands

- **Current Stable Checkpoint Tag:** `checkpoint-v1.0-stable`
- To inspect changes:
  ```bash
  git status
  git diff
  ```
- To test the production build:
  ```bash
  npm run build
  ```
- To rollback safely in case of any regression:
  ```bash
  git reset --hard checkpoint-v1.0-stable
  ```
