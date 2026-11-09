import React, { useState, useEffect } from 'react';
import { ArrowDown, Mail, FileText, Cpu, Layers } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../UI/Icons';
import { personalProfile } from '../../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const titles = [
    "Aspiring Robotics & AI Engineer",
    "Computer Science Graduate (2026)",
    "PINN & Battery Modeling Explorer",
    "Embedded Systems & IoT Prototyper",
    "ROS 2 & Aerial Simulation Researcher"
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = titles[currentTitleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 40 : 70);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTitleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full radial-glow-cyan pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full radial-glow-purple pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Personal Brand & Positioning */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141C2A] border border-[#263244] text-xs font-mono text-[#38BDF8] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Available for Technical Roles &amp; Engineering Research</span>
            </div>

            {/* Greeting & Name */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base font-mono font-medium text-[#94A3B8] tracking-widest uppercase">
                Hello, I'm
              </p>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#F8FAFC] font-sans">
                {personalProfile.name}
              </h1>
            </div>

            {/* Animated Title Typewriter */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#38BDF8] bg-clip-text text-transparent font-mono flex items-center">
                {displayedText}
                <span className="ml-1 inline-block w-[2px] h-6 bg-[#38BDF8] animate-pulse" />
              </span>
            </div>

            {/* Two-line introduction / Hero Tagline */}
            <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              <strong className="text-[#F8FAFC] font-medium">
                "{personalProfile.heroTagline}"
              </strong>{' '}
              Bridging computer science, physics-informed AI, embedded hardware, and autonomous robotics to engineer real-world intelligent systems.
            </p>

            {/* Sub-tagline / Disciplines */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {['Computer Science', 'Artificial Intelligence', 'Robotics', 'Embedded Systems', 'IoT'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#141C2A]/60 border border-[#263244] text-[#94A3B8]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#0284C7] text-[#080B12] font-bold text-sm tracking-wide shadow-lg shadow-[#38BDF8]/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                View Featured Projects
              </a>
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#141C2A] text-[#F8FAFC] font-semibold text-sm hover:text-[#38BDF8] hover:bg-[#1E293B] border border-[#263244] transition-all"
              >
                <FileText className="w-4 h-4 text-[#38BDF8]" />
                <span>Resume / CV</span>
              </button>
            </div>

            {/* Social & Contact Direct Links */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
              <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider">Connect:</span>
              <a
                href={personalProfile.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#141C2A] text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#1E293B] border border-[#263244] transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalProfile.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#141C2A] text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#1E293B] border border-[#263244] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalProfile.contact.email}`}
                className="p-2.5 rounded-lg bg-[#141C2A] text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#1E293B] border border-[#263244] transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: High-End Orbital Technical Portrait & Telemetry Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Outer Orbital Ring */}
            <div className="relative w-72 sm:w-88 md:w-96 aspect-square flex items-center justify-center">
              
              {/* Outer Slow Spinning Dashed Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#38BDF8]/30 animate-spin-slow pointer-events-none" />
              
              {/* Secondary Reverse Ring */}
              <div 
                className="absolute inset-6 rounded-full border border-dashed border-[#8B5CF6]/30 pointer-events-none"
                style={{ animation: 'spin 30s linear infinite reverse' }}
              />

              {/* Main Portrait Container */}
              <div className="relative w-64 sm:w-80 h-64 sm:h-80 rounded-3xl bg-[#0E1420] border-2 border-[#263244] p-3 shadow-2xl overflow-hidden group">
                <div className="w-full h-full rounded-2xl bg-[#080B12] overflow-hidden relative flex items-center justify-center">
                  <img
                    src="/images/portrait-placeholder.svg"
                    alt="Shubham Patel — Aspiring Robotics & AI Engineer Portrait Placeholder"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Floating Engineering Telemetry Card 1 — Robotics & Simulation */}
              <div className="absolute -top-3 -right-2 sm:-right-6 p-3 rounded-xl bg-[#141C2A]/90 backdrop-blur-md border border-[#263244] shadow-xl text-left hidden sm:flex items-center gap-3 animate-float">
                <div className="p-2 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8]">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-[#94A3B8]">Robotics Stack</p>
                  <p className="text-xs font-bold text-[#F8FAFC]">ROS 2 &amp; PX4 SITL</p>
                </div>
              </div>

              {/* Floating Engineering Telemetry Card 2 — PINN Physics AI */}
              <div 
                className="absolute -bottom-4 -left-2 sm:-left-6 p-3 rounded-xl bg-[#141C2A]/90 backdrop-blur-md border border-[#263244] shadow-xl text-left hidden sm:flex items-center gap-3"
                style={{ animation: 'float 7s ease-in-out infinite 1.5s' }}
              >
                <div className="p-2 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-[#94A3B8]">AI Research</p>
                  <p className="text-xs font-bold text-[#F8FAFC]">Physics-Informed ML</p>
                </div>
              </div>

              {/* Floating Engineering Telemetry Card 3 — Academic Badge */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-6 sm:-right-10 p-2.5 rounded-xl bg-[#0E1420]/95 backdrop-blur-md border border-[#38BDF8]/30 shadow-xl hidden md:flex flex-col items-center">
                <span className="text-[10px] font-mono text-[#38BDF8] font-bold">CSE 2026</span>
                <span className="text-[9px] text-[#94A3B8]">Govt Poly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Animated Scroll Indicator */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center justify-center gap-2 text-[#64748B]">
          <span className="text-[11px] font-mono tracking-widest uppercase">Scroll to explore</span>
          <a
            href="#about"
            aria-label="Scroll down to About section"
            className="p-1 rounded-full text-[#94A3B8] hover:text-[#38BDF8] transition-colors animate-bounce"
          >
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
