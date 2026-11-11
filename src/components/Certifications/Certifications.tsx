import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  ExternalLink,
  GraduationCap,
  Building2,
  Cpu,
  Bot,
  Terminal,
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface CredentialDisplayItem {
  id: string;
  title: string;
  issuer: string;
  issuerType: 'Industrial Institute' | 'Academic Board' | 'Engineering Lab' | 'Research Specialization';
  date: string;
  category: 'Certifications' | 'Academic' | 'Specializations';
  status: 'Completed' | 'In Progress' | 'Advanced Track';
  credentialUrl?: string;
  badge: string;
  skills: string[];
  summary: string;
}

export const Certifications: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Certifications' | 'Academic' | 'Specializations'>('All');

  const credentials: CredentialDisplayItem[] = [
    {
      id: "cred-techsima",
      title: "Industrial Training in Python & Systems Software",
      issuer: "Techsima Technologies Pvt. Ltd.",
      issuerType: "Industrial Institute",
      date: "July 2024 &bull; 45 Days Intensive",
      category: "Certifications",
      status: "Completed",
      credentialUrl: "https://github.com/shubhampatel0487",
      badge: "Verified Industry Certificate",
      skills: ["Python 3", "Data Structures", "OOP Architecture", "Socket Programming", "Automation"],
      summary: "Completed rigorous 45-day hands-on industrial syllabus focusing on robust software engineering, modular system design, and database-backed applications."
    },
    {
      id: "cred-diploma",
      title: "Diploma in Computer Science & Engineering",
      issuer: "CSJM Govt. Polytechnic &bull; BTEUP Board",
      issuerType: "Academic Board",
      date: "2023–2026 &bull; Final Year Scholar",
      category: "Academic",
      status: "In Progress",
      credentialUrl: undefined,
      badge: "Government Polytechnic",
      skills: ["Computer Architecture", "Operating Systems", "Microcontrollers", "C / C++", "Computer Networks"],
      summary: "Three-year government engineering curriculum affiliated with Board of Technical Education Uttar Pradesh, specializing in computing infrastructure and hardware-software integration."
    },
    {
      id: "cred-embedded",
      title: "Embedded Systems & FreeRTOS Firmware Engineering",
      issuer: "Hardware Prototyping & Bench Suite",
      issuerType: "Engineering Lab",
      date: "2024–2025 &bull; Practical Prototype",
      category: "Specializations",
      status: "Completed",
      credentialUrl: "https://github.com/shubhampatel0487/ESP32-Alcohol-Detection-Safety",
      badge: "Bench Hardware Verified",
      skills: ["ESP32 Xtensa Dual-Core", "FreeRTOS Kernel", "MQ-3 Gas Sensing", "Optocoupled Relays", "ADC Filtering"],
      summary: "Design and bench verification of real-time microcontroller firmware, deterministic multi-task scheduling, analog sensor noise filtering, and electromechanical safety interlocks."
    },
    {
      id: "cred-ros2",
      title: "Autonomous Robotics & Distributed Middleware (ROS 2)",
      issuer: "Robotics Research & Simulation Lab",
      issuerType: "Research Specialization",
      date: "2025–2026 &bull; Active Research",
      category: "Specializations",
      status: "Advanced Track",
      credentialUrl: "https://github.com/shubhampatel0487",
      badge: "Autonomous Systems Track",
      skills: ["ROS 2 Humble", "DDS Middleware", "MoveIt 2", "Kinematics Chains", "PX4 SITL Drone"],
      summary: "Applied study in articulated manipulator forward/inverse kinematics, zero-copy DDS messaging topologies, and autonomous quadcopter SITL flight telemetry."
    }
  ];

  const filteredCredentials = selectedFilter === 'All'
    ? credentials
    : credentials.filter(c => c.category === selectedFilter);

  const getStatusBadge = (status: CredentialDisplayItem['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-3 h-3" />
            Verified &amp; Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 flex items-center gap-1.5 shadow-sm">
            <Clock className="w-3 h-3" />
            Enrolled / Final Year
          </span>
        );
      case 'Advanced Track':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3 h-3" />
            Advanced Specialization
          </span>
        );
    }
  };

  const getIssuerIcon = (type: CredentialDisplayItem['issuerType']) => {
    switch (type) {
      case 'Industrial Institute': return Building2;
      case 'Academic Board': return GraduationCap;
      case 'Engineering Lab': return Cpu;
      case 'Research Specialization': return Bot;
      default: return Award;
    }
  };

  return (
    <section id="certifications" className="py-24 relative z-10 border-t border-[#253247]/60 bg-[#070A12]">
      
      {/* Background Subtle Gradients */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] px-3.5 py-1 rounded-full border border-[#253247] inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#38BDF8]" />
            Professional Credentials &amp; Verification
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC] font-sans">
            Technical Credentials &amp; Specializations
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Verified academic foundations, industry-certified practical training, and rigorous self-directed engineering specializations in robotics and embedded systems.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(['All', 'Certifications', 'Academic', 'Specializations'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                selectedFilter === tab
                  ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow-md shadow-[#38BDF8]/20 scale-105'
                  : 'bg-[#111B2B] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#162338] border border-[#253247]'
              }`}
            >
              {tab === 'All' ? 'All Credentials (4)' : tab}
            </button>
          ))}
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCredentials.map((cred) => {
            const Icon = getIssuerIcon(cred.issuerType);
            return (
              <div
                key={cred.id}
                className="p-6 sm:p-7 rounded-2xl bg-[#0C1220] border border-[#253247] hover:border-[#38BDF8]/50 transition-all duration-300 shadow-xl flex flex-col justify-between group space-y-5"
              >
                <div className="space-y-4">
                  
                  {/* Top Bar: Icon + Category + Status */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#111B2B] border border-[#253247] flex items-center justify-center text-[#38BDF8] group-hover:scale-110 group-hover:border-[#38BDF8]/40 transition-all shadow-md">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block">
                          {cred.issuerType}
                        </span>
                        <span className="text-xs font-mono text-[#94A3B8] font-medium" dangerouslySetInnerHTML={{ __html: cred.date }} />
                      </div>
                    </div>

                    <div>
                      {getStatusBadge(cred.status)}
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors font-sans">
                      {cred.title}
                    </h3>
                    <p className="text-xs font-mono text-[#38BDF8] mt-1" dangerouslySetInnerHTML={{ __html: cred.issuer }} />
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-[#CBD5E1] leading-relaxed font-sans">
                    {cred.summary}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {cred.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#070A12] text-[#94A3B8] border border-[#253247] group-hover:border-[#38BDF8]/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Footer Verification Link */}
                <div className="pt-4 border-t border-[#253247]/70 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Academic / Code Record</span>
                  </div>

                  {cred.credentialUrl ? (
                    <a
                      href={cred.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#38BDF8] hover:text-[#7dd3fc] font-bold transition-colors group/link"
                    >
                      <span>Verify Code</span>
                      <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span className="text-[10px] text-[#64748B] italic">Institutional Enrollment</span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Integrity & Verification Ledger Seal */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0C1220]/70 border border-[#253247] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[#F8FAFC] font-bold block">1. State Technical Board</span>
              <span className="text-[#94A3B8] text-[11px]">BTEUP / CSJM Govt. Polytechnic</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center flex-shrink-0 text-[#38BDF8]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[#F8FAFC] font-bold block">2. Industrial Training</span>
              <span className="text-[#94A3B8] text-[11px]">Techsima 45-Day Python Program</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0 text-purple-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[#F8FAFC] font-bold block">3. Reproducible Code</span>
              <span className="text-[#94A3B8] text-[11px]">Git Repositories &amp; Commits</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 text-amber-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[#F8FAFC] font-bold block">4. Bench Evidence</span>
              <span className="text-[#94A3B8] text-[11px]">Multimeter &amp; Serial Logging</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
