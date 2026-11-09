import React, { useEffect } from 'react';
import { X, ExternalLink, Cpu, AlertCircle, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import { ProjectItem } from '../../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
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

  const getStatusBadge = (status: ProjectItem['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Working Prototype
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080B12]/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#0E1420] border border-[#263244] rounded-2xl shadow-2xl overflow-hidden my-8 text-[#F8FAFC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image / Schematic Banner */}
        <div className="relative w-full h-56 sm:h-72 bg-[#080B12] border-b border-[#263244] overflow-hidden flex items-center justify-center">
          <img
            src={project.image}
            alt={`${project.title} schematic illustration`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1420] via-transparent to-transparent opacity-80" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#080B12]/80 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#141C2A] border border-[#263244] transition-colors focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Tag */}
          <div className="absolute bottom-4 left-6">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-medium tracking-wider bg-[#141C2A]/90 text-[#38BDF8] border border-[#38BDF8]/30">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Title & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC] font-sans">
                {project.title}
              </h2>
              <p className="text-sm text-[#94A3B8] mt-1 font-mono">
                {project.tagline}
              </p>
            </div>
            <div>{getStatusBadge(project.status)}</div>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#38BDF8] flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Project Overview
            </h3>
            <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Problem Statement */}
          <div className="p-4 rounded-xl bg-[#141C2A]/70 border border-[#263244] space-y-1.5">
            <h3 className="text-xs uppercase font-mono tracking-widest text-amber-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> Engineering Problem Solved
            </h3>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          {/* Key Architectural Features */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#38BDF8]">
              Key System Capabilities
            </h3>
            <ul className="grid grid-cols-1 gap-2.5">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#94A3B8]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] mt-2 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Details if present */}
          {project.architectureDetails && (
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono tracking-widest text-[#8B5CF6]">
                Technical Architecture
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {project.architectureDetails}
              </p>
            </div>
          )}

          {/* Engineering Learnings */}
          {project.engineeringLearnings && project.engineeringLearnings.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono tracking-widest text-[#10B981]">
                Key Engineering Learnings
              </h3>
              <ul className="space-y-1.5">
                {project.engineeringLearnings.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                    <span className="text-[#10B981] font-mono">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#94A3B8]">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs rounded-md bg-[#141C2A] text-[#F8FAFC] border border-[#263244] font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Honest Notice about Link Availability */}
          <div className="p-3.5 rounded-lg bg-[#080B12] border border-[#263244]/80 text-xs text-[#64748B] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
            <span>
              <strong>Engineering Integrity Notice:</strong> All project code, schematics, and experimental logs are real student/independent engineering work. Source repositories are added as repositories are made public or reviewed.
            </span>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-6 bg-[#0B0F19] border-t border-[#263244] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#141C2A] text-sm text-[#F8FAFC] hover:bg-[#1E293B] border border-[#263244] transition-colors"
              >
                <GithubIcon className="w-4 h-4" /> GitHub Repo
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#141C2A]/40 text-xs text-[#64748B] border border-[#263244]/50 cursor-not-allowed">
                <GithubIcon className="w-4 h-4" /> Repo Available Upon Request
              </span>
            )}

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#38BDF8] text-sm text-[#080B12] font-semibold hover:bg-[#7dd3fc] transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#141C2A]/40 text-xs text-[#64748B] border border-[#263244]/50 cursor-not-allowed">
                <ExternalLink className="w-4 h-4" /> Demo: Lab Environment
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-medium bg-[#141C2A] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] border border-[#263244] transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
