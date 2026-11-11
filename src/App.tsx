import React, { useState, useEffect } from 'react';
import { ScrollProgress } from './components/UI/ScrollProgress';
import { CustomCursor } from './components/UI/CustomCursor';
import { CyberBackground } from './components/UI/CyberBackground';
import { ProjectModal } from './components/UI/ProjectModal';
import { ResumeModal } from './components/UI/ResumeModal';
import { CyberTerminalModal } from './components/UI/CyberTerminalModal';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { EngineeringLabs } from './components/EngineeringLabs/EngineeringLabs';
import { EngineeringKnowledgeGraph } from './components/KnowledgeGraph/EngineeringKnowledgeGraph';
import { Exploded3DView } from './components/Exploded3DView/Exploded3DView';
import { CodeExecutionPlayground } from './components/CodePlayground/CodeExecutionPlayground';
import { ThreeMainProjects } from './components/FeaturedShowcase/ThreeMainProjects';
import { VideoLibrary } from './components/VideoLibrary/VideoLibrary';
import { CodeExplorer } from './components/CodeExplorer/CodeExplorer';
import { DiagramViewer } from './components/DiagramViewer/DiagramViewer';
import { TechnicalBlog } from './components/Blog/TechnicalBlog';
import { GitHubIntegration } from './components/GitHub/GitHubIntegration';
import { Projects } from './components/Projects/Projects';
import { IndustrialTraining } from './components/IndustrialTraining/IndustrialTraining';
import { Education } from './components/Education/Education';
import { Certifications } from './components/Certifications/Certifications';
import { Interests } from './components/Interests/Interests';
import { Profiles } from './components/Profiles/Profiles';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { ShubhamAI } from './components/AIAssistant/ShubhamAI';
import { VoiceNavigationModal } from './components/VoiceNav/VoiceNavigationModal';
import { RecruiterModeModal } from './components/RecruiterMode/RecruiterModeModal';
import { LanguageProvider } from './context/LanguageContext';
import { ProjectItem } from './types/portfolio';
import { personalProfile } from './data/portfolioData';

export const AppContent: React.FC = () => {
  // Confirmed Name: SHUBHAM VERMA (with quick toggle confirmation support)
  const [currentName] = useState<string>(() => {
    return localStorage.getItem('shubham_display_name') || personalProfile.name;
  });

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);
  const [isVoiceNavOpen, setIsVoiceNavOpen] = useState(false);

  // Keyboard shortcut for Cyber Terminal (Ctrl+K or `~`)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'k') || e.key === '`') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070A12] text-[#F8FAFC] selection:bg-[#38BDF8] selection:text-[#070A12] font-sans overflow-x-hidden">
      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Desktop Custom Interactive Cursor */}
      <CustomCursor />

      {/* Lightweight Cyber Interactive Particle Canvas */}
      <CyberBackground />

      {/* Fixed Cyber Dark Navbar with Language, Voice Nav, and Recruiter Mode */}
      <Navbar
        currentName={currentName}
        onOpenResume={() => setIsResumeModalOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenRecruiterMode={() => setIsRecruiterModalOpen(true)}
        onOpenVoiceNav={() => setIsVoiceNavOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          currentName={currentName}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />
        <About />
        <Skills />
        <EngineeringLabs />
        <EngineeringKnowledgeGraph />
        <Exploded3DView />
        <CodeExecutionPlayground />
        <ThreeMainProjects />
        <VideoLibrary />
        <CodeExplorer />
        <DiagramViewer />
        <TechnicalBlog />
        <GitHubIntegration />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <IndustrialTraining />
        <Education />
        <Certifications />
        <Interests />
        <Profiles onOpenResume={() => setIsResumeModalOpen(true)} />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating SHUBHAM AI Conversational Assistant */}
      <ShubhamAI />

      {/* Voice-Based Navigation Modal */}
      <VoiceNavigationModal
        isOpen={isVoiceNavOpen}
        onClose={() => setIsVoiceNavOpen(false)}
        onOpenResume={() => setIsResumeModalOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenRecruiterMode={() => setIsRecruiterModalOpen(true)}
      />

      {/* Executive Recruiter Mode Modal */}
      <RecruiterModeModal
        isOpen={isRecruiterModalOpen}
        onClose={() => setIsRecruiterModalOpen(false)}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* Interactive Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Verified Resume Preview & Download Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Cybernetic CLI Terminal Modal */}
      <CyberTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
