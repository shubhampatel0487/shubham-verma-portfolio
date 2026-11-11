import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Film,
  Bot,
  Cpu,
  Layers,
  User,
  ArrowUpRight,
  Send
} from 'lucide-react';

interface NavbarProps {
  currentName: string;
  onOpenResume?: () => void;
  onOpenTerminal?: () => void;
  onOpenRecruiterMode?: () => void;
  onOpenVoiceNav?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentName,
}) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background scrolling when mobile menu is open
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
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'About', href: '#about', icon: User },
    { label: 'Skills', href: '#skills', icon: Cpu },
    { label: '3D Labs', href: '#engineering-lab', icon: Bot },
    { label: 'Projects', href: '#featured-showcase', icon: Layers },
    { label: 'Videos', href: '#video-library', icon: Film, isNew: true },
    { label: 'Contact', href: '#contact', icon: Send }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070A12]/85 backdrop-blur-xl border-b border-[#253247]/70 shadow-[0_10px_30px_rgba(0,0,0,0.6)] py-2.5'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      {/* Top subtle ambient highlight line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8]/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Identity / Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              {/* Outer glowing aura */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] rounded-xl blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
              
              {/* Core Badge */}
              <div className="relative w-10 h-10 rounded-xl bg-[#070A12] border border-[#38BDF8]/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="font-mono font-extrabold text-sm tracking-tighter bg-gradient-to-br from-[#38BDF8] to-[#CBD5E1] bg-clip-text text-transparent group-hover:from-white group-hover:to-[#38BDF8]">
                  SV
                </span>
                <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-2 ring-[#070A12] animate-pulse" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-sans font-bold text-sm sm:text-base tracking-tight text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors">
                  {currentName}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#94A3B8]">
                <span className="text-[#38BDF8]">SYS //</span>
                <span className="tracking-widest uppercase">Robotics &amp; AI</span>
              </div>
            </div>
          </a>

          {/* Center Floating Navigation Capsule (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0C1220]/90 backdrop-blur-md px-2 py-1.5 rounded-full border border-[#253247]/80 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#38BDF8] bg-[#162338] shadow-[0_0_15px_rgba(56,189,248,0.25)] border border-[#38BDF8]/40'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111B2B]/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#38BDF8]' : 'text-[#64748B] group-hover:text-[#94A3B8]'}`} />
                  <span>{link.label}</span>
                  {link.isNew && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action CTA Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#0284C7] bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-[#070A12] font-mono font-bold text-xs tracking-wide shadow-md shadow-[#38BDF8]/25 flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-[#070A12] font-mono font-bold text-xs shadow-sm flex items-center gap-1"
            >
              <span>Connect</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#111B2B] text-[#F8FAFC] border border-[#253247] hover:border-[#38BDF8]/60 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#38BDF8]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] bg-[#070A12]/98 backdrop-blur-2xl z-50 px-5 py-6 border-t border-[#253247] flex flex-col justify-between lg:hidden overflow-y-auto">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#253247]/60">
              <span className="text-[11px] font-mono tracking-widest text-[#64748B] uppercase">
                Navigation
              </span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>

            <nav className="space-y-1.5 font-mono text-sm">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all border ${
                      isActive
                        ? 'bg-[#162338] text-[#38BDF8] border-[#38BDF8]/40 font-bold shadow-sm'
                        : 'text-[#CBD5E1] hover:text-[#38BDF8] hover:bg-[#111B2B] border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#38BDF8]' : 'text-[#64748B]'}`} />
                      <span>{link.label}</span>
                    </div>
                    {link.isNew ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40">
                        NEW
                      </span>
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B]" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Bottom Action inside Mobile Drawer */}
          <div className="pt-6 border-t border-[#253247] space-y-3 mt-6">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-[#070A12] text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#38BDF8]/20"
            >
              <Send className="w-4 h-4" />
              <span>Get in Touch / Connect</span>
            </a>
          </div>

        </div>
      )}
    </header>
  );
};
