import React, { useState } from 'react';
import { ScrollProgress } from './components/UI/ScrollProgress';
import { CustomCursor } from './components/UI/CustomCursor';
import { CyberBackground } from './components/UI/CyberBackground';
import { ProjectModal } from './components/UI/ProjectModal';
import { ResumeModal } from './components/UI/ResumeModal';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { Projects } from './components/Projects/Projects';
import { Experience } from './components/Experience/Experience';
import { Education } from './components/Education/Education';
import { Certifications } from './components/Certifications/Certifications';
import { Interests } from './components/Interests/Interests';
import { Profiles } from './components/Profiles/Profiles';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { ProjectItem } from './types/portfolio';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#080B12] text-[#F8FAFC] selection:bg-[#38BDF8] selection:text-[#080B12] font-sans overflow-x-hidden">
      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Desktop Custom Interactive Cursor */}
      <CustomCursor />

      {/* Lightweight Cyber Interactive Particle Canvas */}
      <CyberBackground />

      {/* Fixed Cyber Dark Navbar */}
      <Navbar onOpenResume={() => setIsResumeModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenResume={() => setIsResumeModalOpen(true)} />
        <About />
        <Skills />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <Experience />
        <Education />
        <Certifications />
        <Interests />
        <Profiles onOpenResume={() => setIsResumeModalOpen(true)} />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Detailed Architecture & Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Verified Resume Preview & Download Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};

export default App;
