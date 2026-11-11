import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  MapPin,
  Calendar,
  CheckCircle2,
  Building2,
  Cpu,
  Calculator,
  Binary,
  BookOpen,
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

interface AcademicMilestone {
  id: string;
  step: string;
  degree: string;
  degreeShort: string;
  stream?: string;
  institution: string;
  institutionShort: string;
  board: string;
  location: string;
  period: string;
  status: 'Ongoing • Final Year' | 'Completed with Distinction' | 'Completed • High Standing';
  statusType: 'ongoing' | 'distinction' | 'completed';
  score?: string;
  scoreLabel?: string;
  icon: React.ElementType;
  accentColor: {
    border: string;
    borderHover: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    glow: string;
    iconBg: string;
    iconText: string;
  };
  coursework: string[];
  highlights: string[];
  engineeringImpact: string;
}

export const Education: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const milestones: AcademicMilestone[] = [
    {
      id: "edu-diploma",
      step: "01",
      degree: "Diploma in Computer Science & Engineering",
      degreeShort: "Diploma in CSE",
      stream: "Computer Science & Systems Engineering",
      institution: "Chhatrapati Shahu Ji Maharaj Government Polytechnic",
      institutionShort: "CSJM Govt. Polytechnic",
      board: "Board of Technical Education Uttar Pradesh (BTEUP)",
      location: "Ambedkar Nagar, Uttar Pradesh, India",
      period: "August 2023 — June 2026",
      status: "Ongoing • Final Year",
      statusType: "ongoing",
      score: "Final Year (2026)",
      scoreLabel: "Status",
      icon: Cpu,
      accentColor: {
        border: "border-cyan-500/30",
        borderHover: "hover:border-cyan-400/60",
        badgeBg: "bg-cyan-500/10",
        badgeText: "text-cyan-400",
        badgeBorder: "border-cyan-500/30",
        glow: "shadow-cyan-500/10",
        iconBg: "bg-cyan-950/60",
        iconText: "text-cyan-400"
      },
      coursework: [
        "Data Structures & Algorithms",
        "Operating Systems & Kernel Architecture",
        "Microprocessors & 8085/ARM Interfacing",
        "Database Management Systems (SQL)",
        "Computer Networks & Communication",
        "C / C++ Systems Programming",
        "Embedded Hardware Prototyping"
      ],
      highlights: [
        "Three-year government technical engineering curriculum with intensive hands-on lab experiments and systems architecture.",
        "Practical laboratory design of digital logic circuits, sensor interfacing, and low-level microcontroller communication.",
        "Direct translation of theoretical computer science algorithms into physical autonomous robotics and IoT prototypes."
      ],
      engineeringImpact: "Provides the foundational bedrock for deterministic embedded firmware, memory management, and low-latency system scheduling."
    },
    {
      id: "edu-12th",
      step: "02",
      degree: "Class 12 (Senior Secondary / Intermediate)",
      degreeShort: "Class 12th PCM",
      stream: "Science Stream (Physics, Chemistry & Mathematics — PCM)",
      institution: "Jhinaka Devi Patel Balika Inter College",
      institutionShort: "JDPB Inter College",
      board: "Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)",
      location: "Ambedkar Nagar, Uttar Pradesh",
      period: "April 2023 — May 2024",
      status: "Completed with Distinction",
      statusType: "distinction",
      score: "78.6%",
      scoreLabel: "Distinction Score",
      icon: Calculator,
      accentColor: {
        border: "border-emerald-500/30",
        borderHover: "hover:border-emerald-400/60",
        badgeBg: "bg-emerald-500/10",
        badgeText: "text-emerald-400",
        badgeBorder: "border-emerald-500/30",
        glow: "shadow-emerald-500/10",
        iconBg: "bg-emerald-950/60",
        iconText: "text-emerald-400"
      },
      coursework: [
        "Differential & Integral Calculus",
        "Vector Algebra & 3D Coordinate Geometry",
        "Electromagnetism & Circuits",
        "Classical Kinematics & Mechanics",
        "Thermodynamics & Physical Principles"
      ],
      highlights: [
        "Graduated with 78.6% distinction, establishing rigorous mathematical discipline and analytical problem solving.",
        "Deep exploration of vector fields, derivatives, and spatial transformations essential for physical systems simulation.",
        "Formed the core analytical mindset required for evaluating algorithmic complexity and machine learning loss equations."
      ],
      engineeringImpact: "Powers 6-DOF robotic manipulator forward/inverse kinematics, PID controller tuning, and quadcopter physics modeling."
    },
    {
      id: "edu-10th",
      step: "03",
      degree: "Class 10 (Secondary High School)",
      degreeShort: "Class 10th High School",
      stream: "General Science, Mathematics & Computing Logic",
      institution: "Ram Dev Janta Inter College",
      institutionShort: "RDJ Inter College",
      board: "Uttar Pradesh Board (UPMSP)",
      location: "Katehari, Ambedkar Nagar, Uttar Pradesh",
      period: "April 2021 — May 2022",
      status: "Completed • High Standing",
      statusType: "completed",
      score: "77.5%",
      scoreLabel: "First Division",
      icon: BookOpen,
      accentColor: {
        border: "border-amber-500/30",
        borderHover: "hover:border-amber-400/60",
        badgeBg: "bg-amber-500/10",
        badgeText: "text-amber-400",
        badgeBorder: "border-amber-500/30",
        glow: "shadow-amber-500/10",
        iconBg: "bg-amber-950/60",
        iconText: "text-amber-400"
      },
      coursework: [
        "Foundational Mathematics & Geometry",
        "Physics & Chemistry Fundamentals",
        "Computer Basics & Algorithmic Logic",
        "Social Sciences & English Communication"
      ],
      highlights: [
        "Completed secondary education with 77.5% marks, achieving top academic standing in Science and Mathematics.",
        "Early hands-on experimentation with small electronics kits, battery circuits, and basic logic gates.",
        "Cultivated rigorous academic habits and analytical mindset that catalyzed the pursuit of engineering."
      ],
      engineeringImpact: "Sparked the initial passion for electronics and algorithmic problem-solving that led directly to polytechnic computer engineering."
    }
  ];

  const filteredMilestones = activeTab === 'all'
    ? milestones
    : milestones.filter(m => m.id === activeTab);

  return (
    <section id="education" className="py-20 sm:py-28 relative z-10 border-t border-[#253247]/50 bg-[#070D18]/90 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] border border-[#38BDF8]/30 shadow-sm shadow-[#38BDF8]/10">
            <GraduationCap className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>05 // Academic Rigor &amp; Engineering Foundation</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
            Academic Foundation &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC]">Technical Qualifications</span>
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            Formal technical qualification in Computer Science and Engineering from a premier state polytechnic, backed by strong mathematics, calculus, and scientific principles.
          </p>
        </div>

        {/* Quick Glance Metrics Bar (Responsive 2-col on Mobile, 4-col on Desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#0D1527]/80 border border-[#253247] hover:border-cyan-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-cyan-400 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Engineering</span>
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-sm sm:text-base font-bold text-white truncate">Diploma CSE</div>
            <div className="text-[11px] font-mono text-cyan-400 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Final Year (2026)
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#0D1527]/80 border border-[#253247] hover:border-emerald-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-emerald-400 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Intermediate</span>
              <Calculator className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm sm:text-base font-bold text-white truncate">Class 12th PCM</div>
            <div className="text-[11px] font-mono text-emerald-400 font-semibold mt-0.5">
              78.6% Distinction
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#0D1527]/80 border border-[#253247] hover:border-amber-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-amber-400 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">High School</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-sm sm:text-base font-bold text-white truncate">Class 10th</div>
            <div className="text-[11px] font-mono text-amber-400 font-semibold mt-0.5">
              77.5% First Div
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#0D1527]/80 border border-[#253247] hover:border-purple-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-purple-400 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Board Affiliations</span>
              <Building2 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-sm sm:text-base font-bold text-white truncate">BTEUP &amp; UPMSP</div>
            <div className="text-[11px] font-mono text-purple-400 mt-0.5">
              Govt. Verified
            </div>
          </div>
        </div>

        {/* Milestone Quick Filter Tabs for Mobile / Laptop Convenience */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-[#111B2B] text-slate-300 hover:text-white border border-[#253247]'
            }`}
          >
            All Milestones (3)
          </button>
          {milestones.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.id)}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === m.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-[#111B2B] text-slate-300 hover:text-white border border-[#253247]'
              }`}
            >
              <span>{m.degreeShort}</span>
            </button>
          ))}
        </div>

        {/* Timeline / Card Stream Container */}
        <div className="relative">
          
          {/* Desktop connecting vertical line (hidden on small mobile screens to prevent cramped text) */}
          <div className="hidden md:block absolute left-8 lg:left-10 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-amber-500/30" />

          <div className="space-y-8 sm:space-y-12">
            {filteredMilestones.map((milestone) => {
              const IconComponent = milestone.icon;

              return (
                <div 
                  key={milestone.id} 
                  className="relative md:pl-20 lg:pl-24 transition-all duration-300"
                >
                  
                  {/* Desktop Step Badge on Timeline */}
                  <div className="hidden md:flex absolute left-3 lg:left-5 top-5 w-10 h-10 rounded-xl bg-[#0B132B] border-2 border-[#253247] items-center justify-center text-xs font-mono font-bold text-white shadow-xl group-hover:scale-105 z-10">
                    <IconComponent className={`w-4 h-4 ${milestone.accentColor.iconText}`} />
                  </div>

                  {/* Main Academic Card */}
                  <div className={`rounded-2xl bg-gradient-to-br from-[#0C1425] via-[#0A101F] to-[#070D18] border ${milestone.accentColor.border} ${milestone.accentColor.borderHover} p-5 sm:p-7 md:p-8 shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl`}>
                    
                    {/* Top Accent Light Beam */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

                    {/* Card Header Zone */}
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 border-b border-[#253247]/60">
                      
                      {/* Left: Milestone Meta & Titles */}
                      <div className="space-y-2">
                        
                        {/* Milestone Step Pill & Period Badge */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#111B2B] text-slate-300 border border-[#253247]">
                            <span className="text-cyan-400">Step {milestone.step}</span>
                            <span className="text-slate-600">•</span>
                            <span>{milestone.period}</span>
                          </span>

                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold ${milestone.accentColor.badgeBg} ${milestone.accentColor.badgeText} border ${milestone.accentColor.badgeBorder}`}>
                            <Calendar className="w-3 h-3" />
                            {milestone.period.split('—')[0].trim()}
                          </span>
                        </div>

                        {/* Full Degree Title */}
                        <h3 className="text-xl sm:text-2xl md:text-2xl font-extrabold text-white font-sans tracking-tight leading-snug">
                          {milestone.degree}
                        </h3>

                        {/* Stream / Focus */}
                        {milestone.stream && (
                          <div className="text-xs sm:text-sm font-mono text-[#38BDF8] flex items-center gap-1.5">
                            <Binary className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{milestone.stream}</span>
                          </div>
                        )}

                        {/* Institution, Board & Location */}
                        <div className="pt-1 space-y-1 text-xs sm:text-sm text-slate-300">
                          <div className="flex items-start sm:items-center gap-2 font-medium text-slate-200">
                            <Building2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                            <span className="font-semibold">{milestone.institution}</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 text-xs font-mono">
                            <span className="flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                              {milestone.board}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-500" />
                              {milestone.location}
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* Right: Academic Standing & Score Pill */}
                      <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-2 pt-2 lg:pt-0">
                        {milestone.statusType === 'ongoing' ? (
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/40 text-xs sm:text-sm font-mono font-bold shadow-md shadow-cyan-500/10">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                            </span>
                            <span>{milestone.status}</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/40 text-xs sm:text-sm font-mono font-bold shadow-md shadow-emerald-500/10">
                            <Award className="w-4 h-4 text-emerald-400" />
                            <span>{milestone.score} • {milestone.scoreLabel}</span>
                          </div>
                        )}

                        <span className="text-[11px] font-mono text-slate-400 bg-[#111B2B] px-2.5 py-1 rounded-md border border-[#253247]">
                          Verified Academic Record
                        </span>
                      </div>

                    </div>

                    {/* Core Curriculum Chips */}
                    <div className="py-4 space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Core Curriculum &amp; Specialization Modules:</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {milestone.coursework.map((course, cIdx) => (
                          <span 
                            key={cIdx}
                            className="px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono bg-[#111D30] text-slate-200 border border-[#253752] hover:border-cyan-500/40 hover:text-white transition-colors"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Academic Accomplishments List */}
                    <div className="pt-2 pb-4 space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span>Key Academic Milestones &amp; Practical Rigor:</span>
                      </div>
                      <ul className="space-y-2">
                        {milestone.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Engineering Synergy Footnote */}
                    <div className="mt-2 p-3 sm:p-4 rounded-xl bg-[#091122] border border-[#1E2C45] flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 flex-shrink-0 mt-0.5">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                          Practical Engineering Synergy:
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {milestone.engineeringImpact}
                        </p>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Academic Documentation & Identity Notice */}
        <div className="mt-12 sm:mt-16 p-4 sm:p-6 rounded-2xl bg-[#0B1325]/90 border border-[#253247] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                Official Government Board Documentation
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Documented
                </span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Registered under official name <strong className="text-slate-200">Shubham Verma</strong> across all BTEUP polytechnic and UPMSP board records. All official marksheets and transcripts are available for direct engineering recruitment verification.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Ready for Technical Verification</span>
          </div>
        </div>

      </div>
    </section>
  );
};
