import React, { useState, useEffect } from 'react';
import { ArrowDown, Mail, Film, Send, Sparkles, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '../UI/Icons';
import { personalProfile } from '../../data/portfolioData';

interface HeroProps {
  currentName: string;
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentName }) => {
  const titles = [
    "Aspiring Robotics & AI Engineer",
    "Computer Science Graduate (2026)",
    "Autonomous Systems & ROS 2 Researcher",
    "Embedded Systems & IoT Prototyper",
    "Physics-Informed Neural Network Explorer"
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  useEffect(() => {
    const fullText = titles[currentTitleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 35 : 75);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTitleIndex]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-24 pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* Restrained Engineering Background Ambient Accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#38BDF8]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#8B5CF6]/5 blur-3xl pointer-events-none" />

      {/* Subtle Fine Engineering Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#25324715_1px,transparent_1px),linear-gradient(to_bottom,#25324715_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Personal Brand & Positioning */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Professional Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111B2B] border border-[#253247] text-xs font-mono text-[#38BDF8] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Available for Technical Roles &amp; Engineering Research</span>
            </div>

            {/* Greeting & Confirmed Display Name */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-mono font-medium text-[#94A3B8] tracking-widest uppercase flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                Engineering Identity
              </p>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#F8FAFC] font-sans">
                {currentName}
              </h1>
            </div>

            {/* Animated Title Typewriter */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
              <div className="px-3 py-1.5 rounded-lg bg-[#111B2B]/60 border border-[#253247] inline-flex items-center">
                <span className="text-base sm:text-xl font-bold text-[#38BDF8] font-mono flex items-center">
                  {displayedText}
                  <span className="ml-1 inline-block w-2 h-5 bg-[#38BDF8] animate-pulse" />
                </span>
              </div>
            </div>

            {/* Professional Introduction */}
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              {personalProfile.bioIntroduction}
            </p>

            {/* Primary Tagline & Secondary Tagline */}
            <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247] max-w-2xl text-xs sm:text-sm font-mono text-[#F8FAFC]">
              <span className="text-[#38BDF8] font-bold">"{personalProfile.heroTagline}"</span>
              <span className="text-[#64748B] mx-2">|</span>
              <span className="text-[#94A3B8]">{personalProfile.alternativeTagline}</span>
            </div>

            {/* Action Buttons: Explore Projects, Watch Walkthroughs, Contact Me */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#070A12] font-bold text-sm tracking-wide shadow-md shadow-[#38BDF8]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore Projects
              </a>

              <a
                href="#video-library"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111B2B] text-[#F8FAFC] font-semibold text-sm hover:text-[#38BDF8] hover:bg-[#162338] border border-[#253247] hover:border-[#38BDF8]/40 transition-all transform hover:-translate-y-0.5"
              >
                <Film className="w-4 h-4 text-[#38BDF8]" />
                <span>Video Demos</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111B2B] text-[#94A3B8] hover:text-[#F8FAFC] font-semibold text-sm border border-[#253247] hover:border-[#38BDF8]/40 transition-all"
              >
                <Send className="w-4 h-4 text-[#8B5CF6]" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quick Copy Pill: Email & WhatsApp */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono">
              <button
                onClick={() => handleCopy(personalProfile.contact.email, 'email')}
                className="px-3 py-1.5 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#38BDF8] border border-[#253247] flex items-center gap-1.5 transition-colors"
                title="Click to copy email address"
              >
                {copiedType === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'email' ? 'Copied Email' : personalProfile.contact.email}</span>
              </button>

              <button
                onClick={() => handleCopy(personalProfile.contact.phone, 'phone')}
                className="px-3 py-1.5 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#38BDF8] border border-[#253247] flex items-center gap-1.5 transition-colors"
                title="Click to copy phone number"
              >
                {copiedType === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'phone' ? 'Copied WhatsApp' : personalProfile.contact.phone}</span>
              </button>
            </div>

            {/* Social Media Icons */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
              <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider">Social:</span>
              <a
                href={personalProfile.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#162338] border border-[#253247] transition-colors"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalProfile.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#162338] border border-[#253247] transition-colors"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={personalProfile.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-emerald-400 hover:bg-[#162338] border border-[#253247] transition-colors"
                aria-label="WhatsApp Direct Chat"
                title="WhatsApp Direct"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalProfile.contact.email}`}
                className="p-2.5 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#162338] border border-[#253247] transition-colors"
                aria-label="Send Email"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Premium Executive Portrait Composition */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Subtle Backing Halo Gradient */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#38BDF8]/20 via-[#8B5CF6]/10 to-transparent blur-xl opacity-75" />
              
              {/* Main Portrait Frame */}
              <div className="relative rounded-2xl bg-[#0C1220] border border-[#253247] p-2 sm:p-2.5 shadow-2xl overflow-hidden group">
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#070A12]">
                  <img
                    src="/assets/profile/original-photo.png"
                    alt={`${currentName} — Aspiring Robotics & AI Engineer`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  
                  {/* Subtle Gradient Vignette at the Base */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070A12] via-[#070A12]/60 to-transparent pointer-events-none" />

                  {/* Clean Technical HUD Badge at the bottom of portrait */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-[#070A12]/90 backdrop-blur-md border border-[#253247] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#F8FAFC] tracking-wide font-sans">{currentName}</p>
                      <p className="text-[10px] font-mono text-[#38BDF8]">Aspiring Robotics &amp; AI Engineer</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#111B2B] border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>ONLINE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimal Corner Technical Accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#38BDF8]/60" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#38BDF8]/60" />
            </div>
          </div>

        </div>

        {/* Minimal Scroll Down Indicator */}
        <div className="mt-14 sm:mt-16 flex flex-col items-center justify-center gap-1.5 text-[#64748B]">
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to explore</span>
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
