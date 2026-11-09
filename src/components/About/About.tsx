import React from 'react';
import { Compass, Target, Lightbulb, GraduationCap, CheckCircle2 } from 'lucide-react';
import { personalProfile, educationData } from '../../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative z-10 border-t border-[#263244]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#141C2A] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            01 // About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Engineering Philosophy &amp; Background
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            An emerging engineer passionate about developing intelligent machines by fusing computer science, physics-informed AI, and embedded hardware.
          </p>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Structured Biography & Values */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Bio Prose */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1420] border border-[#263244] shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-[#F8FAFC] font-sans flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                Technical Journey &amp; Core Motivation
              </h3>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {personalProfile.fullBio.paragraph1}
              </p>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {personalProfile.fullBio.paragraph2}
              </p>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {personalProfile.fullBio.paragraph3}
              </p>
            </div>

            {/* Engineering Principles */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1420] border border-[#263244] shadow-xl space-y-4">
              <h3 className="text-base font-bold text-[#F8FAFC] font-sans flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Guiding Engineering Philosophy
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {personalProfile.engineeringPhilosophy.map((phil, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#141C2A]/60 border border-[#263244]/80 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                    <span className="text-[#CBD5E1]">{phil}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Mission, Vision & Educational Summary */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Mission Card */}
            <div className="p-6 rounded-2xl bg-[#0E1420] border border-[#263244] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target className="w-24 h-24 text-[#38BDF8]" />
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#38BDF8] mb-2">
                <Target className="w-4 h-4" /> Personal Mission
              </div>
              <p className="text-sm text-[#F8FAFC] leading-relaxed font-medium">
                "{personalProfile.mission}"
              </p>
            </div>

            {/* Vision Card */}
            <div className="p-6 rounded-2xl bg-[#0E1420] border border-[#263244] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Compass className="w-24 h-24 text-[#8B5CF6]" />
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#8B5CF6] mb-2">
                <Compass className="w-4 h-4" /> Career Vision
              </div>
              <p className="text-sm text-[#F8FAFC] leading-relaxed font-medium">
                "{personalProfile.vision}"
              </p>
            </div>

            {/* Academic Snapshot Card */}
            <div className="p-6 rounded-2xl bg-[#0E1420] border border-[#263244] shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#38BDF8]" />
                  Educational Credentials
                </h4>
                <span className="text-[10px] font-mono bg-[#10B981]/10 text-emerald-400 px-2 py-0.5 rounded border border-[#10B981]/20">
                  Verified Records
                </span>
              </div>

              <div className="space-y-3">
                {educationData.map((edu, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#141C2A]/50 border border-[#263244]/80 text-xs">
                    <div className="flex items-center justify-between font-semibold text-[#F8FAFC]">
                      <span>{edu.degree}</span>
                      <span className="text-[#38BDF8] font-mono">{edu.period}</span>
                    </div>
                    <p className="text-[#94A3B8] mt-0.5 line-clamp-1">{edu.institution}</p>
                    {edu.score && (
                      <span className="inline-block mt-1 text-[11px] font-mono text-emerald-400 font-medium">
                        Result: {edu.score}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Quick Stats — Honest, No Fake Figures */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-[#141C2A]/80 border border-[#263244] text-center">
                <div className="text-2xl font-bold font-mono text-[#38BDF8]">2026</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Diploma Completion Target</div>
              </div>
              <div className="p-4 rounded-xl bg-[#141C2A]/80 border border-[#263244] text-center">
                <div className="text-2xl font-bold font-mono text-[#8B5CF6]">5+</div>
                <div className="text-[11px] text-[#94A3B8] mt-0.5">Key Engineering Projects</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

