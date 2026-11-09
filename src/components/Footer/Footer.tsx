import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../UI/Icons';
import { personalProfile } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative z-10 border-t border-[#253247] bg-[#06080E] text-[#94A3B8] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-[#253247]/60">
          
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#111B2B] border border-[#253247] flex items-center justify-center font-mono font-bold text-sm text-[#38BDF8]">
                SP
              </div>
              <div>
                <h3 className="font-bold text-base text-[#F8FAFC]">
                  {personalProfile.name}
                </h3>
                <p className="text-xs font-mono text-[#38BDF8]">
                  {personalProfile.primaryTitle}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              Developing intelligent physical and computational systems through computer science, embedded hardware, ROS 2 simulation, and physics-informed AI.
            </p>

            <p className="text-[11px] font-mono text-[#64748B]">
              Diploma in CSE (2023–2026) • Ambedkar Nagar, UP, India
            </p>
          </div>

          {/* Quick Nav Links Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#F8FAFC] uppercase">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Connect & Social Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#F8FAFC] uppercase">
              Engineering Network
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={personalProfile.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#111B2B] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#38BDF8] border border-[#253247] transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalProfile.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#111B2B] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#38BDF8] border border-[#253247] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalProfile.contact.email}`}
                className="p-2.5 rounded-xl bg-[#111B2B] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#38BDF8] border border-[#253247] transition-colors"
                aria-label="Email Inquiry"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-[#64748B] pt-2">
              All personal, educational, and project details verified.
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p className="text-[#64748B] text-center sm:text-left">
            © {currentYear} {personalProfile.name}. Designed &amp; Engineered with Precision.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#1E293B] border border-[#253247] transition-all"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#38BDF8]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
