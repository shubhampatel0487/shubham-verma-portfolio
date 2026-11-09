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
  Film
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '../UI/Icons';
import { personalProfile } from '../../data/portfolioData';

interface NavbarProps {
  currentName: string;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentName, onOpenResume }) => {
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
    { title: "AI & PINN Convergence", href: "#engineering-lab", icon: Brain }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070A12]/90 backdrop-blur-md border-b border-[#253247] shadow-xl py-2.5'
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
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === 'home'
                  ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Home
            </a>

            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === 'about'
                  ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              About
            </a>

            <a
              href="#skills"
              onClick={(e) => { e.preventDefault(); handleNavClick('#skills'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === 'skills'
                  ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Expertise
            </a>

            {/* Engineering Lab Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLabsDropdownOpen(true)}
              onMouseLeave={() => setLabsDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('#engineering-lab')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${
                  activeSection === 'engineering-lab'
                    ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                <span>Engineering Lab</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {labsDropdownOpen && (
                <div className="absolute top-full left-0 w-56 rounded-xl bg-[#0C1220] border border-[#253247] shadow-2xl py-1.5 space-y-0.5 z-50">
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
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors ${
                  activeSection === 'featured-showcase' || activeSection === 'projects'
                    ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                <span>Projects</span>
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
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                activeSection === 'video-library'
                  ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Video Library</span>
            </a>

            <a
              href="#code-explorer"
              onClick={(e) => { e.preventDefault(); handleNavClick('#code-explorer'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === 'code-explorer'
                  ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Code Explorer
            </a>

            <a
              href="#diagrams"
              onClick={(e) => { e.preventDefault(); handleNavClick('#diagrams'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === 'diagrams'
                  ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Diagrams
            </a>

            <a
              href="#education"
              onClick={(e) => { e.preventDefault(); handleNavClick('#education'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === 'education'
                  ? 'text-[#38BDF8] font-bold bg-[#111B2B]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Education
            </a>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Social quick links */}
            <a
              href={personalProfile.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#38BDF8] border border-[#253247] transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={personalProfile.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#38BDF8] border border-[#253247] transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={personalProfile.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-emerald-400 border border-[#253247] transition-colors"
              title="WhatsApp Direct"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </a>

            {/* Resume Action */}
            <button
              onClick={onOpenResume}
              className="px-3.5 py-1.5 rounded-xl bg-[#111B2B] text-[#F8FAFC] hover:text-[#38BDF8] hover:bg-[#162338] border border-[#253247] text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm"
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#111B2B] text-[#F8FAFC] border border-[#253247] transition-colors"
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
          
          <nav className="space-y-2 text-sm font-mono">
            {[
              { name: 'Home', href: '#home' },
              { name: 'About Me', href: '#about' },
              { name: 'Technical Expertise', href: '#skills' },
              { name: 'Engineering Lab (5 Labs)', href: '#engineering-lab' },
              { name: 'Featured Projects (Showcase)', href: '#featured-showcase' },
              { name: 'Project Video Library', href: '#video-library' },
              { name: 'Source Code Explorer', href: '#code-explorer' },
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
                className="block py-2.5 px-4 rounded-xl text-[#CBD5E1] hover:text-[#38BDF8] hover:bg-[#111B2B] transition-colors border border-transparent hover:border-[#253247]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile CTA Buttons */}
          <div className="pt-4 border-t border-[#253247] space-y-3">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
              className="w-full py-3 rounded-xl bg-[#111B2B] text-[#F8FAFC] border border-[#253247] text-xs font-mono font-bold flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#38BDF8]" />
              <span>Download Technical Resume (PDF)</span>
            </button>

            <a
              href={personalProfile.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-2"
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
