import React, { useState } from 'react';
import {
  Briefcase,
  Award,
  Calendar,
  Building2,
  CheckCircle2,
  Code2,
  Terminal,
  Layers,
  Cpu,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  FileCode
} from 'lucide-react';
import { industrialTrainingData } from '../../data/portfolioData';

export const IndustrialTraining: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pillars' | 'projects'>('all');

  const trainingPillars = [
    {
      title: "Object-Oriented Architecture",
      icon: Layers,
      description: "Class design, encapsulation, inheritance, polymorphism, and modular software packaging.",
      tag: "Architecture & OOP",
      color: "cyan"
    },
    {
      title: "Data Structures & Algorithms",
      icon: Cpu,
      description: "Lists, dictionaries, sets, custom stack/queue implementations, and algorithmic time complexity.",
      tag: "Core Computing",
      color: "purple"
    },
    {
      title: "File I/O & System Automation",
      icon: FileCode,
      description: "Structured data parsing (JSON, CSV, plaintext), robust stream processing, and CLI utilities.",
      tag: "Systems I/O",
      color: "emerald"
    },
    {
      title: "Defensive Coding & Debugging",
      icon: Terminal,
      description: "Exception hierarchies, unit testing methodologies, edge-case mitigation, and PEP 8 standards.",
      tag: "Quality & Testing",
      color: "amber"
    }
  ];

  const technologies = [
    "Python 3.11",
    "OOP Architecture",
    "Data Structures",
    "Algorithms",
    "File I/O Processing",
    "Exception Handling",
    "CLI Tool Development",
    "Debugging & Profiling",
    "PEP 8 Clean Code"
  ];

  return (
    <section id="training" className="py-20 sm:py-28 relative z-10 border-t border-[#253247]/50 bg-[#070D18]/90 overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] border border-[#38BDF8]/30 shadow-sm shadow-[#38BDF8]/10">
            <Briefcase className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>06 // Industry Internship &amp; Practical Systems</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
            Practical Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC]">Industry Experience</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            Supervised 45-day practical industrial software internship at Techsima Technologies, translating theoretical computer science into production Python software architecture and modular engineering.
          </p>
        </div>

        {/* Quick Glance Metrics Bar (2-col on Mobile, 4-col on Desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14">
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#0D1527]/80 border border-[#253247] hover:border-cyan-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-cyan-400 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Host Enterprise</span>
              <Building2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-sm sm:text-base font-bold text-white truncate">Techsima Pvt. Ltd.</div>
            <div className="text-[11px] font-mono text-cyan-400 mt-0.5">Software Systems Div.</div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#0D1527]/80 border border-[#253247] hover:border-purple-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-purple-400 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Duration</span>
              <Calendar className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-sm sm:text-base font-bold text-white truncate">45 Days Intensive</div>
            <div className="text-[11px] font-mono text-purple-400 mt-0.5">July — August 2024</div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#0D1527]/80 border border-[#253247] hover:border-emerald-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-emerald-400 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Specialization</span>
              <Code2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm sm:text-base font-bold text-white truncate">Python 3 &amp; OOP</div>
            <div className="text-[11px] font-mono text-emerald-400 mt-0.5">Applied Software Intern</div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#0D1527]/80 border border-[#253247] hover:border-amber-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-amber-400 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Credential</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-sm sm:text-base font-bold text-white truncate">Certificate Issued</div>
            <div className="text-[11px] font-mono text-amber-400 mt-0.5">Industry Verified</div>
          </div>
        </div>

        {/* Industrial Training Spotlight Card */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0C1425] via-[#0A101F] to-[#070D18] border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 shadow-2xl relative overflow-hidden p-5 sm:p-8 md:p-10">
          
          {/* Top subtle light accent beam */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* Background decorative watermark (hidden on mobile to prevent clutter) */}
          <div className="hidden sm:block absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Briefcase className="w-64 h-64 text-cyan-400" />
          </div>

          {/* Header Row: Company, Role & Duration Pill */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#253247]/70 relative z-10">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Verified Corporate Training</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[#111B2B] text-slate-300 border border-[#253247]">
                  <Building2 className="w-3 h-3 text-purple-400" />
                  Techsima Technologies
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
                {industrialTrainingData.company}
              </h3>

              <p className="text-xs sm:text-sm font-mono text-[#38BDF8] flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>{industrialTrainingData.role}</span>
              </p>
            </div>

            {/* Right: Duration Badge & Status */}
            <div className="flex flex-row lg:flex-col items-start lg:items-end justify-between lg:justify-start gap-2 pt-2 lg:pt-0">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/40 text-xs sm:text-sm font-mono font-bold shadow-md shadow-cyan-500/10">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{industrialTrainingData.duration}</span>
              </span>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Successfully Completed &amp; Certified</span>
              </div>
            </div>
          </div>

          {/* Description & Narrative */}
          <div className="py-6 space-y-4 relative z-10">
            <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-normal">
              {industrialTrainingData.description}
            </p>

            {/* Core Focus Callout Box */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#091122] border border-[#1E2C45] text-xs sm:text-sm text-slate-300 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex-shrink-0 mt-0.5">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                  Industrial Syllabus Core Focus:
                </span>
                <span className="text-slate-300 leading-relaxed font-sans">
                  {industrialTrainingData.focus}
                </span>
              </div>
            </div>
          </div>

          {/* Filter Pills for Deep Exploration */}
          <div className="flex items-center gap-2 mb-6 border-b border-[#253247]/50 pb-3 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-[#111B2B] text-slate-400 hover:text-white border border-[#253247]'
              }`}
            >
              All Takeaways
            </button>
            <button
              onClick={() => setActiveTab('pillars')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                activeTab === 'pillars'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-[#111B2B] text-slate-400 hover:text-white border border-[#253247]'
              }`}
            >
              4 Core Training Pillars
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-[#111B2B] text-slate-400 hover:text-white border border-[#253247]'
              }`}
            >
              Competencies &amp; Skills
            </button>
          </div>

          {/* 4 Core Pillars Grid (Responsive 1-col on Mobile, 2-col on Tablet/Laptop) */}
          {(activeTab === 'all' || activeTab === 'pillars') && (
            <div className="mb-6 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Key Engineering Modules Mastered:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {trainingPillars.map((pillar, idx) => {
                  const PillarIcon = pillar.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl bg-[#0B1325]/80 border border-[#253247] hover:border-cyan-500/40 transition-all duration-200 space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111B2B] text-cyan-400 border border-cyan-500/20">
                          {pillar.tag}
                        </span>
                        <PillarIcon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <h4 className="text-sm font-bold text-white font-sans group-hover:text-cyan-300 transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {pillar.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Key Competencies Acquired List */}
          {(activeTab === 'all' || activeTab === 'projects') && (
            <div className="pt-4 border-t border-[#253247]/60 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Competencies Acquired &amp; Evaluated:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {industrialTrainingData.skillsAcquired.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#0E172A]/60 border border-[#1E293B] text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-sans">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology & Tooling Chips */}
          <div className="mt-6 pt-4 border-t border-[#253247]/60 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Applied Tooling &amp; Programming Paradigms:
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {technologies.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#111D30] text-slate-200 border border-[#253752] hover:border-cyan-400/40 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Practical Engineering Synergy Footnote */}
          <div className="mt-6 p-3.5 sm:p-4 rounded-xl bg-[#091122] border border-[#1E2C45] flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex-shrink-0 mt-0.5">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Direct Engineering Impact:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                The industrial software discipline acquired during this training at Techsima provided the exact object-oriented foundation required to write modular Python AI vision pipelines (OpenCV), custom ROS 2 middleware nodes, and data telemetry parsers.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
