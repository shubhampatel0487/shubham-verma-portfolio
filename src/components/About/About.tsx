import React from 'react';
import { Compass, Target, Lightbulb, GraduationCap, CheckCircle2, ArrowRight, Cpu, Code2, Bot, Brain, Shield } from 'lucide-react';
import { personalProfile, educationData } from '../../data/portfolioData';

export const About: React.FC = () => {
  const disciplineChain = [
    { name: "Software", icon: Code2, desc: "Python, C/C++, Algorithms & Data Structures" },
    { name: "Electronics", icon: Cpu, desc: "ESP32, Microcontrollers, Sensors & Relays" },
    { name: "Artificial Intelligence", icon: Brain, desc: "Computer Vision, PINNs & Machine Learning" },
    { name: "Robotics", icon: Bot, desc: "ROS 2, Drone Dynamics & Kinematics" },
    { name: "Intelligent Systems", icon: Shield, desc: "Autonomous, Safe & Scalable Cyber-Physical Systems" },
  ];

  return (
    <section id="about" className="py-24 relative z-10 border-t border-[#263244]/40 bg-[#080B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#141C2A] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Engineering Philosophy &amp; Background
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            An emerging engineer passionate about developing intelligent machines by fusing computer science, physics-informed AI, and embedded hardware.
          </p>
        </div>

        {/* Technical Relationship Visual: Software -> Electronics -> AI -> Robotics -> Intelligent Systems */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-[#0E1420] border-2 border-[#263244] shadow-2xl overflow-x-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#38BDF8]">
              Interdisciplinary Engineering Continuum
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC] font-sans mt-1">
              How Software Becomes Physical Intelligence
            </h3>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 min-w-[700px]">
            {disciplineChain.map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.name}>
                  <div className="flex-1 p-4 rounded-2xl bg-[#141C2A] border border-[#263244] hover:border-[#38BDF8]/50 transition-all text-center space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#0E1420] border border-[#263244] mx-auto flex items-center justify-center text-[#38BDF8]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-bold text-[#F8FAFC]">{step.name}</div>
                    <p className="text-[11px] text-[#94A3B8] leading-tight">{step.desc}</p>
                  </div>
                  {idx < disciplineChain.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-[#38BDF8] flex-shrink-0 hidden md:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Editorial Grid: Photo + Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Original Portrait */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl bg-[#0E1420] border-2 border-[#263244] p-3 shadow-2xl overflow-hidden group">
              <div className="relative w-full aspect-square rounded-2xl bg-[#080B12] overflow-hidden">
                <img
                  src="/assets/profile/original-photo.png"
                  alt="SHUBHAM VERMA Original Professional Portrait"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B12]/80 via-transparent to-transparent opacity-40" />
                <div className="absolute bottom-3 left-3 bg-[#080B12]/90 backdrop-blur-md px-3 py-1 rounded-md border border-emerald-500/40 text-[10px] font-mono text-emerald-400 font-bold">
                  ORIGINAL VERIFIED PORTRAIT
                </div>
              </div>
            </div>

            {/* Quick Academic Snapshot */}
            <div className="p-6 rounded-2xl bg-[#0E1420] border border-[#263244] shadow-xl space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Academic Credentials
              </h4>
              <div className="space-y-2 text-xs">
                {educationData.map((e, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#141C2A] border border-[#263244]/80">
                    <p className="font-semibold text-[#F8FAFC]">{e.degree}</p>
                    <p className="text-[#94A3B8] text-[11px]">{e.institution} ({e.period})</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio Prose & Engineering Values */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1420] border border-[#263244] shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-[#F8FAFC] font-sans flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
                Technical Journey &amp; Engineering Focus
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

            {/* Guiding Principles */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1420] border border-[#263244] shadow-xl space-y-4">
              <h3 className="text-base font-bold text-[#F8FAFC] font-sans flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Guiding Engineering Philosophy
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {personalProfile.engineeringPhilosophy.map((phil, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#141C2A]/60 border border-[#263244]/80 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                    <span className="text-[#CBD5E1]">{phil}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#0E1420] border border-[#263244] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#38BDF8]">
                  <Target className="w-3.5 h-3.5" /> Mission
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  "{personalProfile.mission}"
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0E1420] border border-[#263244] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#8B5CF6]">
                  <Compass className="w-3.5 h-3.5" /> Career Vision
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  "{personalProfile.vision}"
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
