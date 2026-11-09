import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  FileText,
  ChevronDown,
  Bot,
  Navigation,
  Terminal,
  Cpu,
  Brain,
  Send,
  Film,
  Mic,
  Briefcase,
  Languages,
  Layers,
  Play,
  BookOpen,
  Network
} from 'lucide-react';
import { WhatsAppIcon } from '../UI/Icons';
import { personalProfile } from '../../data/portfolioData';
import { useLanguage } from '../../context/LanguageContext';

interface NavbarProps {
  currentName: string;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  onOpenRecruiterMode: () => void;
  onOpenVoiceNav: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentName,
  onOpenResume,
  onOpenRecruiterMode,
  onOpenVoiceNav,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = [
        'home',
        'about',
        'skills',
        'engineering-lab',
        'featured-showcase',
        'video-library',
        'code-explorer',
        'diagrams',
        'knowledge-graph',
        'exploded-view',
        'playground',
        'blog',
        'github',
        'education',
        'contact'
      ];
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setProjectsDropdownOpen(false);
    setLabsDropdownOpen(false);
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projectItems = [
    { title: "AI + IoT Alcohol Detection", href: "#featured-showcase", badge: "Flagship" },
    { title: "Digital Classroom Checker", href: "#featured-showcase", badge: "EdTech" },
    { title: "1QUIZ Platform", href: "#featured-showcase", badge: "AI + IRT" },
    { title: "PINN Battery Digital Twin", href: "#projects", badge: "Research" },
    { title: "TrustGuard Anti-Scam", href: "#projects", badge: "Security" }
  ];

  const labItems = [
    { title: "6-Axis Robotics Arm", href: "#engineering-lab", icon: Bot },
    { title: "Drone Flight (PX4 SITL)", href: "#engineering-lab", icon: Navigation },
    { title: "Kali Linux Terminal", href: "#engineering-lab", icon: Terminal },
    { title: "Embedded ESP32 Interlock", href: "#engineering-lab", icon: Cpu },
    { title: "AI & PINN Convergence", href: "#engineering-lab", icon: Brain },
    { title: "Knowledge Graph", href: "#knowledge-graph", icon: Network },
    { title: "3D Exploded Teardown", href: "#exploded-view", icon: Layers },
    { title: "Code Playground", href: "#playground", icon: Play }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070A12]/95 backdrop-blur-md border-b border-[#253247] shadow-xl py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Wordmark */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#38BDF8] to-[#8B5CF6] p-0.5 shadow-md shadow-[#38BDF8]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#070A12] rounded-[10px] flex items-center justify-center font-mono font-extrabold text-sm text-[#38BDF8]">
                SV
              </div>
            </div>
            <div>
              <span className="font-sans font-extrabold text-sm sm:text-base tracking-tight text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors block">
                {currentName}
              </span>
              <span className="text-[10px] font-mono text-[#94A3B8] tracking-wider uppercase block">
                Robotics &amp; AI Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-mono">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                activeSection === 'home'
                  ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              {t('nav_home')}
            </a>

            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                activeSection === 'about'
                  ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              {t('nav_about')}
            </a>

            <a
              href="#skills"
              onClick={(e) => { e.preventDefault(); handleNavClick('#skills'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                activeSection === 'skills'
                  ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              {t('nav_skills')}
            </a>

            {/* Engineering Lab Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLabsDropdownOpen(true)}
              onMouseLeave={() => setLabsDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('#engineering-lab')}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${
                  activeSection === 'engineering-lab' || activeSection === 'knowledge-graph' || activeSection === 'exploded-view' || activeSection === 'playground'
                    ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                <span>{t('nav_labs')}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {labsDropdownOpen && (
                <div className="absolute top-full left-0 w-60 rounded-xl bg-[#0C1220] border border-[#253247] shadow-2xl py-1.5 space-y-0.5 z-50">
                  {labItems.map((lab, i) => {
                    const Icon = lab.icon;
                    return (
                      <a
                        key={i}
                        href={lab.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(lab.href); }}
                        className="px-3.5 py-2 text-xs flex items-center gap-2 text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#111B2B] transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>{lab.title}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Projects Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProjectsDropdownOpen(true)}
              onMouseLeave={() => setProjectsDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('#featured-showcase')}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${
                  activeSection === 'featured-showcase' || activeSection === 'projects'
                    ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                <span>{t('nav_projects')}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {projectsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 rounded-xl bg-[#0C1220] border border-[#253247] shadow-2xl py-1.5 space-y-0.5 z-50">
                  {projectItems.map((proj, i) => (
                    <a
                      key={i}
                      href={proj.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(proj.href); }}
                      className="px-3.5 py-2 text-xs flex items-center justify-between text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#111B2B] transition-colors"
                    >
                      <span>{proj.title}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#111B2B] text-[#8B5CF6] border border-[#253247]">
                        {proj.badge}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#video-library"
              onClick={(e) => { e.preventDefault(); handleNavClick('#video-library'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                activeSection === 'video-library'
                  ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{t('nav_videos')}</span>
            </a>

            <a
              href="#code-explorer"
              onClick={(e) => { e.preventDefault(); handleNavClick('#code-explorer'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                activeSection === 'code-explorer'
                  ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Code
            </a>

            <a
              href="#blog"
              onClick={(e) => { e.preventDefault(); handleNavClick('#blog'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                activeSection === 'blog'
                  ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Articles</span>
            </a>

            <a
              href="#github"
              onClick={(e) => { e.preventDefault(); handleNavClick('#github'); }}
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                activeSection === 'github'
                  ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              GitHub
            </a>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            
            {/* Language Switcher Pill (EN | HI) */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-2.5 py-1.5 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-xs font-mono text-[#CBD5E1] hover:text-[#38BDF8] border border-[#253247] flex items-center gap-1.5 transition-colors"
              title="Toggle Language (English / हिन्दी)"
            >
              <Languages className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Voice Navigation Trigger */}
            <button
              onClick={onOpenVoiceNav}
              className="p-2 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-[#94A3B8] hover:text-[#38BDF8] border border-[#253247] transition-colors"
              title="Activate Voice Navigation"
            >
              <Mic className="w-3.5 h-3.5 text-[#38BDF8]" />
            </button>

            {/* Recruiter Mode Trigger */}
            <button
              onClick={onOpenRecruiterMode}
              className="px-3 py-1.5 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-xs font-mono font-bold text-[#C4B5FD] border border-[#8B5CF6]/40 flex items-center gap-1.5 transition-colors shadow-sm"
              title="Open Executive Recruiter Quick View"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>{t('recruiter_mode')}</span>
            </button>

            {/* Resume Action */}
            <button
              onClick={onOpenResume}
              className="px-3 py-1.5 rounded-xl bg-[#111B2B] text-[#F8FAFC] hover:text-[#38BDF8] hover:bg-[#162338] border border-[#253247] text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Resume</span>
            </button>

            {/* Contact CTA */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="px-3.5 py-1.5 rounded-xl bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#070A12] font-mono font-bold text-xs tracking-wide transition-all shadow-md shadow-[#38BDF8]/20 flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Contact</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-2 py-1 rounded-lg bg-[#111B2B] text-[11px] font-mono text-[#38BDF8] border border-[#253247]"
            >
              {language === 'en' ? 'HI' : 'EN'}
            </button>
            <button
              onClick={onOpenRecruiterMode}
              className="p-2 rounded-lg bg-[#8B5CF6]/20 text-[#C4B5FD] border border-[#8B5CF6]/40"
              title="Recruiter Mode"
            >
              <Briefcase className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#111B2B] text-[#F8FAFC] border border-[#253247] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#38BDF8]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-[#070A12]/98 backdrop-blur-2xl z-50 overflow-y-auto px-6 py-8 border-t border-[#253247] space-y-6 xl:hidden">
          
          <nav className="space-y-1.5 text-sm font-mono">
            {[
              { name: 'Home', href: '#home' },
              { name: 'About Me', href: '#about' },
              { name: 'Technical Expertise', href: '#skills' },
              { name: 'Engineering Labs (5 Labs)', href: '#engineering-lab' },
              { name: 'Knowledge Graph', href: '#knowledge-graph' },
              { name: '3D Hardware Teardown', href: '#exploded-view' },
              { name: 'Code Playground', href: '#playground' },
              { name: 'Featured Projects', href: '#featured-showcase' },
              { name: 'Project Video Library', href: '#video-library' },
              { name: 'Source Code Explorer', href: '#code-explorer' },
              { name: 'Technical Articles & Blog', href: '#blog' },
              { name: 'GitHub Repositories', href: '#github' },
              { name: 'Technical Diagrams & Pinouts', href: '#diagrams' },
              { name: 'Industrial Training', href: '#training' },
              { name: 'Education', href: '#education' },
              { name: 'Digital Identity Card', href: '#digital-id' },
              { name: 'Document Download Centre', href: '#downloads' },
              { name: 'Contact Me', href: '#contact' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="block py-2 px-3.5 rounded-xl text-[#CBD5E1] hover:text-[#38BDF8] hover:bg-[#111B2B] transition-colors border border-transparent hover:border-[#253247]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile CTA Buttons */}
          <div className="pt-4 border-t border-[#253247] space-y-2.5">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenVoiceNav(); }}
              className="w-full py-2.5 rounded-xl bg-[#111B2B] text-[#38BDF8] border border-[#253247] text-xs font-mono font-bold flex items-center justify-center gap-2"
            >
              <Mic className="w-4 h-4 text-[#38BDF8]" />
              <span>Voice Navigation</span>
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
              className="w-full py-2.5 rounded-xl bg-[#111B2B] text-[#F8FAFC] border border-[#253247] text-xs font-mono font-bold flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#38BDF8]" />
              <span>Download Technical Resume (PDF)</span>
            </button>

            <a
              href={personalProfile.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 6307510099)</span>
            </a>
          </div>

        </div>
      )}
    </header>
  );
};
