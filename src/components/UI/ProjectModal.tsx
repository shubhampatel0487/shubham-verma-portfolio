import React, { useEffect, useState } from 'react';
import {
  X,
  ExternalLink,
  Cpu,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  Shield,
  Copy,
  Check,
  Lock,
  Layers,
  Target,
  Zap,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { ProjectItem } from '../../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [codeCopied, setCodeCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyDemoCode = () => {
    if (project.demoCode?.snippet) {
      navigator.clipboard.writeText(project.demoCode.snippet);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2200);
    }
  };

  const getStatusBadge = (status: ProjectItem['status']) => {
    switch (status) {
      case 'Private Project':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Lock className="w-3.5 h-3.5" />
            Private Project
          </span>
        );
      case 'Under Development':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Clock className="w-3.5 h-3.5" />
            Under Development
          </span>
        );
      case 'Demonstration Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Demonstration Available
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Prototype
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Clock className="w-3.5 h-3.5" />
            Active Development
          </span>
        );
      case 'Experimental':
      case 'Research Prototype':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Experimental Research
          </span>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#070A12]/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0C1220] border-2 border-[#253247] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto text-[#F8FAFC] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header Bar */}
        <div className="sticky top-0 z-30 px-5 sm:px-6 py-3.5 bg-[#0A101C]/95 backdrop-blur-md border-b border-[#253247] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider bg-[#111B2B] text-[#38BDF8] border border-[#38BDF8]/30 flex-shrink-0">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400 truncate hidden sm:inline">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {getStatusBadge(project.developmentStatus || project.status)}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-[#111B2B] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#162338] border border-[#253247] transition-colors focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
              aria-label="Close project modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-7">
          
          {/* Header Banner & Title Block */}
          <div className="space-y-4">
            <div className="relative w-full h-44 sm:h-64 rounded-2xl bg-[#070A12] border border-[#253247] overflow-hidden flex items-center justify-center">
              <img
                src={project.image}
                alt={`${project.title} project illustration`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1220] via-[#0C1220]/40 to-transparent" />
              
              {project.isPrivate && (
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#070A12]/90 backdrop-blur-md border border-amber-500/40 text-amber-300 font-mono text-xs flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Confidential Architecture &bull; Safe Public View</span>
                </div>
              )}
            </div>

            <div>
              <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-cyan-400 mt-1 font-mono">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Project Overview */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#38BDF8] flex items-center gap-1.5 font-bold">
              <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" /> Project Overview
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Problem Statement */}
          <div className="p-4 rounded-2xl bg-[#111B2B] border border-amber-500/30 space-y-1.5">
            <h3 className="text-xs uppercase font-mono tracking-widest text-amber-400 flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Problem Statement
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {project.problemStatement}
            </p>
          </div>

          {/* Project Objectives (if present) */}
          {project.projectObjectives && project.projectObjectives.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs uppercase font-mono tracking-widest text-emerald-400 flex items-center gap-1.5 font-bold">
                <Target className="w-3.5 h-3.5 text-emerald-400" /> Project Objectives
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-sans">
                {project.projectObjectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-[#111B2B]/60 border border-[#253247]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Features */}
          <div className="space-y-2.5">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#38BDF8] flex items-center gap-1.5 font-bold">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Key Features
            </h3>
            <ul className="space-y-2">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 p-2.5 rounded-xl bg-[#070A12] border border-[#253247]/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* My Contribution */}
          {project.myContribution && (
            <div className="p-4 rounded-2xl bg-[#0E172A] border border-cyan-500/30 space-y-1.5">
              <h3 className="text-xs uppercase font-mono tracking-widest text-cyan-400 flex items-center gap-1.5 font-bold">
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" /> My Engineering Contribution
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {project.myContribution}
              </p>
            </div>
          )}

          {/* Implementation Highlights & Learnings */}
          {project.implementationHighlights && project.implementationHighlights.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono tracking-widest text-purple-400 flex items-center gap-1.5 font-bold">
                <Layers className="w-3.5 h-3.5 text-purple-400" /> Implementation Highlights
              </h3>
              <ul className="space-y-1.5">
                {project.implementationHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-purple-400 font-mono font-bold">▸</span>
                    <span className="leading-relaxed">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Future Improvements */}
          {project.futureImprovements && project.futureImprovements.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono tracking-widest text-indigo-400 flex items-center gap-1.5 font-bold">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> Future Improvements &amp; Roadmap
              </h3>
              <ul className="space-y-1.5">
                {project.futureImprovements.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-indigo-400 font-mono font-bold">→</span>
                    <span className="leading-relaxed">{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Stack Badges */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase font-mono tracking-widest text-slate-400 font-bold">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs rounded-lg bg-[#111B2B] text-slate-200 border border-[#253247] font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* DEMONSTRATION CODE VIEWER SECTION */}
          {project.demoCode && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
                    DEMO CODE — REPRESENTATIONAL EXAMPLE
                  </span>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">
                    {project.demoCode.filename} ({project.demoCode.language.toUpperCase()})
                  </span>
                </div>

                <button
                  onClick={handleCopyDemoCode}
                  className="px-3 py-1.5 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-xs font-mono text-[#38BDF8] border border-[#253247] hover:border-[#38BDF8]/40 flex items-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  title="Copy Demo Code snippet"
                >
                  {codeCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{codeCopied ? 'Copied Snippet!' : 'Copy Demo Code'}</span>
                </button>
              </div>

              {/* Code Box */}
              <div className="rounded-xl bg-[#070A12] border border-[#253247] p-4 overflow-x-auto max-h-64 font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin">
                <pre className="whitespace-pre">
                  <code>{project.demoCode.snippet}</code>
                </pre>
              </div>

              {/* Mandatory Demonstration Disclaimer */}
              <div className="p-3.5 rounded-xl bg-[#090E1A] border border-amber-500/30 text-[11px] font-sans text-slate-300 leading-relaxed">
                <span className="font-mono font-bold text-amber-400 block mb-1">
                  DEMO CODE — REPRESENTATIONAL EXAMPLE
                </span>
                <p>
                  "This is a simplified illustrative example created for demonstration and educational purposes. It is not the original private project source code and does not represent the complete production implementation."
                </p>
              </div>
            </div>
          )}

          {/* Confidentiality & Engineering Integrity Banner */}
          <div className="p-3.5 rounded-xl bg-[#070A12] border border-[#253247] text-xs text-slate-400 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-slate-200 font-bold block">Engineering Integrity &amp; IP Protection</span>
              <p className="leading-relaxed">
                {project.isPrivate
                  ? 'This project contains proprietary architecture and private implementation files. Demonstrations and conceptual explanations are published safely without exposing production credentials or private source directories.'
                  : 'All published materials represent authentic student and independent engineering implementations verified across laboratory test benches.'}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer with Actions */}
        <div className="px-5 sm:px-6 py-4 bg-[#0A101C] border-t border-[#253247] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {project.isPrivate ? (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#111B2B] text-xs font-mono text-amber-300 border border-amber-500/30">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Protected Source / Private Repository</span>
              </span>
            ) : project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111B2B] text-xs font-mono text-white hover:bg-[#162338] border border-[#253247] hover:border-cyan-500/40 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111B2B]/60 text-xs font-mono text-slate-500 border border-[#253247]/60">
                <Lock className="w-3.5 h-3.5" />
                <span>Repository On-Demand</span>
              </span>
            )}

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#38BDF8] text-xs font-mono text-[#070A12] font-bold hover:bg-[#7dd3fc] transition-colors shadow-md shadow-[#38BDF8]/20"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Interactive Demo</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111B2B]/60 text-xs font-mono text-slate-500 border border-[#253247]/60">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Interactive Bench / Lab Demo</span>
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-[#111B2B] text-slate-300 hover:text-white hover:bg-[#162338] border border-[#253247] transition-colors focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
