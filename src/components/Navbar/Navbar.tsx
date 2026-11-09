import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ChevronRight, MessageSquare, Volume2, VolumeX, Terminal as TerminalIcon } from 'lucide-react';
import { personalProfile } from '../../data/portfolioData';
import { soundFX } from '../../utils/audio';

interface NavbarProps {
  currentName: string;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentName, onOpenResume, onOpenTerminal }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFX.getIsMuted());

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Training', href: '#training' },
    { name: 'Education', href: '#education' },
    { name: 'Digital ID', href: '#digital-id' },
    { name: 'Downloads', href: '#downloads' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    soundFX.playClick();
    setMobileMenuOpen(false);
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B12]/92 backdrop-blur-md border-b border-[#263244]/80 py-2.5 shadow-lg shadow-black/40'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo / Monogram */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#38BDF8] rounded-lg p-1"
            aria-label={`${currentName} Home`}
          >
            <div className="w-9 h-9 rounded-xl bg-[#141C2A] border border-[#263244] flex items-center justify-center relative overflow-hidden group-hover:border-[#38BDF8]/60 transition-colors shadow-md">
              <span className="font-mono font-bold text-xs bg-gradient-to-tr from-[#38BDF8] to-[#8B5CF6] bg-clip-text text-transparent">
                SP
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#38BDF8]/10 to-[#8B5CF6]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-xs sm:text-sm text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors">
                {currentName}
              </span>
              <span className="text-[9px] font-mono text-[#94A3B8] tracking-wider uppercase">
                Robotics &amp; AI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  onMouseEnter={() => soundFX.playHover()}
                  className={`relative px-2.5 py-1 text-xs font-medium tracking-wide transition-all rounded-md ${
                    isActive
                      ? 'text-[#38BDF8] bg-[#141C2A]/80 shadow-sm border border-[#38BDF8]/30'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#141C2A]/40'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#38BDF8] rounded-full shadow-[0_0_8px_#38BDF8]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Terminal Button */}
            <button
              onClick={onOpenTerminal}
              className="p-1.5 rounded-lg bg-[#141C2A] text-[#94A3B8] hover:text-[#38BDF8] border border-[#263244] transition-colors text-xs font-mono flex items-center gap-1"
              title="Launch Cyber Terminal (Ctrl+K)"
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px]">Terminal</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-1.5 rounded-lg border transition-colors ${
                isMuted
                  ? 'bg-[#141C2A] text-[#64748B] border-[#263244]'
                  : 'bg-[#141C2A] text-[#38BDF8] border-[#38BDF8]/40'
              }`}
              title={isMuted ? 'Unmute Audio UI Effects' : 'Mute Audio UI Effects'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Direct WhatsApp Chat Shortcut */}
            <a
              href={personalProfile.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#141C2A] text-[#F8FAFC] hover:text-[#38BDF8] hover:border-[#38BDF8]/50 border border-[#263244] transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] text-[#080B12] hover:opacity-95 transition-opacity shadow-md shadow-[#38BDF8]/10"
            >
              <span>Connect</span>
              <ChevronRight className="w-3 h-3 text-[#080B12]" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-[#141C2A] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#263244] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A0F1A]/98 border-b border-[#263244] px-4 pt-3 pb-6 shadow-2xl backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#141C2A] text-[#38BDF8] border-l-2 border-[#38BDF8]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#141C2A]/50'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />}
                </a>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#263244] flex flex-col gap-2">
            <a
              href={personalProfile.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-500 text-xs font-bold text-[#052e16] flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-[#141C2A] text-xs font-semibold text-[#F8FAFC] flex items-center justify-center gap-2 border border-[#263244]"
            >
              <FileText className="w-4 h-4 text-[#38BDF8]" />
              <span>Preview &amp; Download Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
