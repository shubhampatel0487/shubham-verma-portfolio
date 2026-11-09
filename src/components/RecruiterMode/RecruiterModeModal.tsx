import React, { useState } from 'react';
import {
  Briefcase,
  X,
  FileText,
  Mail,
  ExternalLink,
  CheckCircle2,
  Download,
  GraduationCap,
  Bot,
  Brain,
  Cpu,
  Code2
} from 'lucide-react';
import { WhatsAppIcon } from '../UI/Icons';
import { personalProfile } from '../../data/portfolioData';

interface RecruiterModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const RecruiterModeModal: React.FC<RecruiterModeModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');

  const roleFilters = [
    { id: 'all', label: 'All Disciplines', icon: Briefcase },
    { id: 'robotics', label: 'Robotics & Control', icon: Bot },
    { id: 'ai', label: 'AI & Data Modeling', icon: Brain },
    { id: 'embedded', label: 'Embedded Systems', icon: Cpu },
    { id: 'software', label: 'Software & Web APIs', icon: Code2 }
  ];

  const highlights = {
    robotics: [
      "ROS 2 DDS communication, topics, and robot state simulation",
      "PX4 Autopilot Software-in-the-Loop (SITL) quadcopter flight testing",
      "6-axis articulated robotic manipulator forward & inverse kinematics (DH parameters)"
    ],
    ai: [
      "Physics-Informed Neural Networks (PINNs) integrating electrochemical degradation equations",
      "Real-time OpenCV facial biometric verification for attendance & driver safety",
      "IRT-based adaptive testing engine in 1QUIZ with multi-model AI routing"
    ],
    embedded: [
      "ESP32 dual-core FreeRTOS task scheduling with 20 Hz deterministic safety cutoff",
      "MQ-3 ethanol gas analog ADC sampling with moving-average filtering",
      "Optoisolated safety relay circuit driving, PWM actuator control, and breadboard diagnostics"
    ],
    software: [
      "Python microservices & REST endpoints using Flask and FastAPI",
      "Django CBT exam engine with relational SQLite/MySQL database models",
      "Modern TypeScript, React 18, Tailwind CSS, and client-side interactive simulators"
    ]
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A12]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-[#0C1220] border-2 border-[#38BDF8]/50 shadow-2xl overflow-y-auto flex flex-col p-6 sm:p-8 space-y-6">
        
        {/* Modal Top Bar */}
        <div className="flex items-start justify-between pb-4 border-b border-[#253247]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>RECRUITER &amp; TECHNICAL HIRING VIEW</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] font-sans">
              {personalProfile.name}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#38BDF8]">
              {personalProfile.primaryTitle} — Ambedkar Nagar, UP, India
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#111B2B] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Executive Summary */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#111B2B] border border-[#253247] space-y-2">
          <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider font-bold">
            Executive Summary
          </span>
          <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
            {personalProfile.bioIntroduction} Diploma student in Computer Science &amp; Engineering graduating in 2026 from CSJM Govt Polytechnic. Completed 45-day Python Industrial Training at Techsima Pvt. Ltd. Combines low-level embedded hardware prototyping with mathematical physics-guided machine learning.
          </p>
        </div>

        {/* Action Bar for Hiring Managers */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenResume}
            className="flex-1 py-3 px-4 rounded-xl bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#070A12] font-mono font-bold text-xs tracking-wide shadow-md shadow-[#38BDF8]/20 flex items-center justify-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4 fill-current" />
            <span>Download Verified Resume (PDF)</span>
          </button>

          <a
            href={personalProfile.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp Quick Chat (+91 6307510099)</span>
          </a>

          <a
            href={`mailto:${personalProfile.contact.email}?subject=Technical%20Opportunity%20Inquiry%20for%20Shubham%20Verma`}
            className="py-3 px-4 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-[#F8FAFC] border border-[#253247] font-mono font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Mail className="w-4 h-4 text-[#38BDF8]" />
            <span>Send Email</span>
          </a>
        </div>

        {/* Role Filters */}
        <div className="space-y-3">
          <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block">
            Filter Core Technical Disciplines:
          </span>
          <div className="flex flex-wrap gap-2">
            {roleFilters.map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedRoleFilter(f.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                    selectedRoleFilter === f.id
                      ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow-md shadow-[#38BDF8]/20'
                      : 'bg-[#111B2B] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Discipline Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {(selectedRoleFilter === 'all' || selectedRoleFilter === 'robotics') && (
            <div className="p-4 rounded-2xl bg-[#111B2B] border border-[#253247] space-y-2">
              <span className="text-[#38BDF8] font-bold flex items-center gap-1.5">
                <Bot className="w-4 h-4" /> Robotics &amp; Autonomous Flight
              </span>
              <ul className="space-y-1.5 text-[#94A3B8] font-sans">
                {highlights.robotics.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(selectedRoleFilter === 'all' || selectedRoleFilter === 'ai') && (
            <div className="p-4 rounded-2xl bg-[#111B2B] border border-[#253247] space-y-2">
              <span className="text-[#8B5CF6] font-bold flex items-center gap-1.5">
                <Brain className="w-4 h-4" /> Artificial Intelligence &amp; PINNs
              </span>
              <ul className="space-y-1.5 text-[#94A3B8] font-sans">
                {highlights.ai.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(selectedRoleFilter === 'all' || selectedRoleFilter === 'embedded') && (
            <div className="p-4 rounded-2xl bg-[#111B2B] border border-[#253247] space-y-2">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> Embedded Firmware &amp; Circuits
              </span>
              <ul className="space-y-1.5 text-[#94A3B8] font-sans">
                {highlights.embedded.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(selectedRoleFilter === 'all' || selectedRoleFilter === 'software') && (
            <div className="p-4 rounded-2xl bg-[#111B2B] border border-[#253247] space-y-2">
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <Code2 className="w-4 h-4" /> Software Architecture &amp; Web APIs
              </span>
              <ul className="space-y-1.5 text-[#94A3B8] font-sans">
                {highlights.software.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Education & Verified Training Summary */}
        <div className="p-5 rounded-2xl bg-[#111B2B] border border-[#253247] space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] font-bold flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" /> Academic &amp; Industrial Credentials
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#0C1220] border border-[#253247] space-y-0.5">
              <p className="font-bold text-[#F8FAFC]">Diploma in CS &amp; Eng.</p>
              <p className="text-[#94A3B8] text-[11px]">CSJM Govt Polytechnic (2023–2026)</p>
              <span className="text-[10px] font-mono text-emerald-400">Final Year Ongoing</span>
            </div>

            <div className="p-3 rounded-xl bg-[#0C1220] border border-[#253247] space-y-0.5">
              <p className="font-bold text-[#F8FAFC]">Class 12 (Science Stream PCM)</p>
              <p className="text-[#94A3B8] text-[11px]">Jhinaka Devi Patel College (2023)</p>
              <span className="text-[10px] font-mono text-emerald-400">78.6% Distinction</span>
            </div>

            <div className="p-3 rounded-xl bg-[#0C1220] border border-[#253247] space-y-0.5">
              <p className="font-bold text-[#F8FAFC]">Python Industrial Training</p>
              <p className="text-[#94A3B8] text-[11px]">Techsima Pvt. Ltd. (45 Days)</p>
              <span className="text-[10px] font-mono text-emerald-400">Completed 2024</span>
            </div>
          </div>
        </div>

        {/* Direct Social Profile Links */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <span>Verified Public Profiles:</span>
            <a
              href={personalProfile.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38BDF8] hover:underline flex items-center gap-1"
            >
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={personalProfile.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38BDF8] hover:underline flex items-center gap-1"
            >
              LinkedIn <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <a
            href="/documents/Shubham_Patel_Contact.vcf"
            download
            className="px-3 py-1.5 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-[#38BDF8] border border-[#253247] flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save Contact Card (VCF)</span>
          </a>
        </div>

      </div>
    </div>
  );
};
