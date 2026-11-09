import React, { useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../UI/Icons';
import { projectsData } from '../../data/portfolioData';
import { ProjectItem } from '../../types/portfolio';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filterOptions = [
    'All',
    'AI & PINNs',
    'Robotics Simulation',
    'Embedded & IoT',
    'Full Stack & Security',
    'Web Systems'
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (selectedFilter === 'All') return true;
    return p.category === selectedFilter;
  });

  const getStatusBadge = (status: ProjectItem['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ● Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
            ● In Progress
          </span>
        );
      case 'Experimental':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            ● Experimental
          </span>
        );
    }
  };

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-[#263244]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#141C2A] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            03 // Featured Projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Engineering Systems &amp; Technical Prototypes
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Practical applications spanning physics-informed machine learning, robotics simulation, embedded microcontroller circuits, and full-stack platforms.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedFilter === filter
                  ? 'bg-[#38BDF8] text-[#080B12] font-semibold shadow-md shadow-[#38BDF8]/20'
                  : 'bg-[#141C2A] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] border border-[#263244]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-[#0E1420] border border-[#263244] hover:border-[#38BDF8]/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col group"
            >
              {/* Card Image Banner */}
              <div 
                className="relative h-48 bg-[#080B12] overflow-hidden cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <img
                  src={project.image}
                  alt={`${project.title} schematic`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1420] via-transparent to-transparent opacity-80" />
                
                {/* Status Pill */}
                <div className="absolute top-3 right-3">
                  {getStatusBadge(project.status)}
                </div>

                {/* Category Pill */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141C2A]/90 text-[#38BDF8] border border-[#38BDF8]/30">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="text-lg font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors cursor-pointer font-sans"
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-[#8B5CF6]">
                    {project.tagline}
                  </p>
                  <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed pt-1">
                    {project.overview}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] rounded bg-[#141C2A] text-[#CBD5E1] border border-[#263244] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] text-[#64748B] font-mono">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Bar */}
                <div className="pt-4 border-t border-[#263244] flex items-center justify-between">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] hover:text-[#7dd3fc] transition-colors"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-[#141C2A] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#263244] transition-colors"
                        aria-label="View GitHub Repository"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span
                        title="Repository available upon academic review"
                        className="p-1.5 rounded-lg bg-[#141C2A]/40 text-[#64748B] border border-[#263244]/40 cursor-help"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </span>
                    )}

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-[#141C2A] text-[#94A3B8] hover:text-[#38BDF8] border border-[#263244] transition-colors"
                        aria-label="View Live Project Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span
                        title="Lab & simulation prototype environment"
                        className="p-1.5 rounded-lg bg-[#141C2A]/40 text-[#64748B] border border-[#263244]/40 cursor-help"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
