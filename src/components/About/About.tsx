import React from 'react';
import { Compass, Target, Lightbulb, GraduationCap, CheckCircle2, Cpu, Code2, Bot, Brain, Shield, Clock, BookOpen, Layers } from 'lucide-react';
import { personalProfile, educationData } from '../../data/portfolioData';

export const About: React.FC = () => {
  const disciplineChain = [
    { name: "Software", icon: Code2, desc: "Python, C/C++, Algorithms & System Architectures" },
    { name: "Electronics", icon: Cpu, desc: "ESP32, Microcontrollers, Analog/Digital Sensors" },
    { name: "Artificial Intelligence", icon: Brain, desc: "Computer Vision, PINNs & Physics-Guided ML" },
    { name: "Robotics", icon: Bot, desc: "ROS 2, Drone Dynamics & Forward/Inverse Kinematics" },
    { name: "Intelligent Systems", icon: Shield, desc: "Autonomous, Safe & Scalable Cyber-Physical Systems" },
  ];

  const technicalTimeline = [
    {
      year: "2022",
      title: "Secondary School (Class 10)",
      org: "Ram Dev Janta Inter College, Katehari",
      desc: "Graduated with 77.5%, establishing strong foundational analytical and mathematical interest.",
      badge: "Foundation"
    },
    {
      year: "2023",
      title: "Senior Secondary (Class 12 - PCM)",
      org: "Jhinka Devi Patel Balika Inter College, Patel Nagar",
      desc: "Completed Physics, Chemistry, and Mathematics with 78.6%, reinforcing physical intuition and scientific modeling.",
      badge: "Science Stream"
    },
    {
      year: "2023 — 2026",
      title: "Diploma in Computer Science & Engineering",
      org: "Chhatrapati Shahu Ji Maharaj Govt Polytechnic, Ambedkar Nagar",
      desc: "Deep dive into algorithms, microcontrollers, embedded C, Linux environments, and distributed computing architectures.",
      badge: "Core Engineering"
    },
    {
      year: "2024",
      title: "Python Industrial Training (45 Days)",
      org: "Techsima Pvt. Ltd.",
      desc: "Rigorous 45-day hands-on program mastering Python, modular architecture, REST APIs, and automated processing scripts.",
      badge: "Industrial Training"
    },
    {
      year: "2025 — Present",
      title: "Robotics, PINN & Cyber-Physical R&D",
      org: "Independent Laboratory Prototyping",
      desc: "Developing AI+IoT vehicle safety interlocks, physics-informed neural network battery models, and ROS 2 drone simulations.",
      badge: "Active R&D"
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10 border-t border-[#253247]/60 bg-[#070A12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] px-3.5 py-1.5 rounded-full border border-[#253247]">
            Professional Narrative
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC] font-sans">
            About Me &amp; Technical Vision
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            An aspiring Robotics and AI Engineer bridging theoretical computer science, physics-informed algorithms, and physical embedded hardware.
          </p>
        </div>

        {/* 2-Column Main Layout: Left Photo & Credentials, Right Bio & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          
          {/* Left Column: Authentic Portrait & Academic Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl bg-[#0C1220] border border-[#253247] p-2.5 shadow-xl overflow-hidden group">
              <div className="relative w-full aspect-[4/5] rounded-xl bg-[#070A12] overflow-hidden">
                <img
                  src="/assets/profile/original-photo.png"
                  alt="SHUBHAM VERMA Technical Portrait"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/80 via-transparent to-transparent opacity-50" />
                <div className="absolute bottom-3 left-3 bg-[#070A12]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/40 text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>VERIFIED ORIGINAL PROFILE</span>
                </div>
              </div>
            </div>

            {/* Academic Credentials Box */}
            <div className="p-6 rounded-2xl bg-[#111B2B] border border-[#253247] shadow-lg space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Academic Foundation
              </h4>
              <div className="space-y-2.5 text-xs">
                {educationData.map((e, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0C1220] border border-[#253247]">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#F8FAFC]">{e.degree}</p>
                      <span className="text-[10px] font-mono text-[#38BDF8]">{e.period}</span>
                    </div>
                    <p className="text-[#94A3B8] text-[11px] mt-0.5">{e.institution}</p>
                    {(e.score || e.grade) && (
                      <span className="inline-block mt-1 text-[10px] font-mono text-emerald-400 font-medium">
                        Score: {e.score || e.grade}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Technical Story & Mission */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Professional Biography */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111B2B] border border-[#253247] shadow-lg space-y-4">
              <h3 className="text-xl font-bold text-[#F8FAFC] font-sans flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#38BDF8]" />
                Technical Story &amp; Independent Development
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {personalProfile.fullBio.paragraph1}
              </p>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {personalProfile.fullBio.paragraph2}
              </p>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {personalProfile.fullBio.paragraph3}
              </p>
            </div>

            {/* Engineering Values & Guiding Philosophy */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111B2B] border border-[#253247] shadow-lg space-y-4">
              <h3 className="text-base font-bold text-[#F8FAFC] font-sans flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Engineering Philosophy &amp; First Principles
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {personalProfile.engineeringPhilosophy.map((phil, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#0C1220] border border-[#253247] text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                    <span className="text-[#F8FAFC] leading-relaxed">{phil}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission & Future Career Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#111B2B] border border-[#253247] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#38BDF8] font-bold">
                  <Target className="w-4 h-4" /> Engineering Mission
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  "{personalProfile.mission}"
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#111B2B] border border-[#253247] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#8B5CF6] font-bold">
                  <Compass className="w-4 h-4" /> Career Vision
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  "{personalProfile.vision}"
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Professional Technical Timeline */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0C1220] border border-[#253247] shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#38BDF8] flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Chronological Progression
            </span>
            <h3 className="text-xl font-bold text-[#F8FAFC]">
              Verified Technical &amp; Academic Timeline
            </h3>
          </div>

          <div className="relative border-l-2 border-[#253247] ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
            {technicalTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#070A12] border-2 border-[#38BDF8] group-hover:bg-[#38BDF8] transition-colors" />
                
                <div className="p-4 sm:p-5 rounded-2xl bg-[#111B2B] border border-[#253247] hover:border-[#38BDF8]/40 transition-all space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono text-[#38BDF8] font-bold">{item.year}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1220] border border-[#253247] text-[#94A3B8]">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#F8FAFC]">{item.title}</h4>
                  <p className="text-xs font-mono text-[#38BDF8]/80">{item.org}</p>
                  <p className="text-xs text-[#94A3B8] leading-relaxed pt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interdisciplinary Engineering Continuum */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#111B2B] border border-[#253247] shadow-xl">
          <div className="text-center mb-6 space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#38BDF8] flex items-center justify-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Interdisciplinary Continuum
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">
              How Software, Electronics &amp; AI Converge Into Autonomous Robotics
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {disciplineChain.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.name} className="p-4 rounded-2xl bg-[#0C1220] border border-[#253247] hover:border-[#38BDF8]/40 transition-all text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#111B2B] border border-[#253247] mx-auto flex items-center justify-center text-[#38BDF8]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-[#F8FAFC]">{step.name}</div>
                  <p className="text-[11px] text-[#94A3B8] leading-tight">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
