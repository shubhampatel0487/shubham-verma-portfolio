import React, { useState, useMemo } from 'react';
import {
  ExternalLink,
  ArrowRight,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Table,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Terminal,
  Activity,
  Bot,
  Lock
} from 'lucide-react';
import { GithubIcon } from '../UI/Icons';
import { projectsData } from '../../data/portfolioData';
import { ProjectItem } from '../../types/portfolio';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter Groups mapped to ProjectItem categories
  const filterGroups = [
    { label: 'All', value: 'All' },
    { label: 'Embedded & IoT', value: 'Embedded & IoT' },
    { label: 'Robotics & Simulation', value: 'Robotics Simulation' },
    { label: 'AI & Vision / PINNs', value: 'AI_GROUP' },
    { label: 'Full Stack & Academic', value: 'SOFTWARE_GROUP' }
  ];

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Category Filter
      let matchesCategory = true;
      if (selectedFilter === 'All') {
        matchesCategory = true;
      } else if (selectedFilter === 'AI_GROUP') {
        matchesCategory =
          project.category === 'AI & Vision' ||
          project.category === 'AI & PINNs' ||
          project.category === 'AI & EdTech';
      } else if (selectedFilter === 'SOFTWARE_GROUP') {
        matchesCategory =
          project.category === 'Academic Systems' ||
          project.category === 'Full Stack & Security' ||
          project.category === 'Python Apps' ||
          project.category === 'Workforce Tech';
      } else {
        matchesCategory = project.category === selectedFilter;
      }

      // Search Query Filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.overview.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  const getStatusBadge = (status: ProjectItem['status']) => {
    switch (status) {
      case 'Private Project':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10">
            <Lock className="w-3 h-3 text-amber-400" />
            Private Project
          </span>
        );
      case 'Under Development':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-sky-500/10 text-sky-300 border border-sky-500/30 shadow-sm shadow-sky-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Under Development
          </span>
        );
      case 'Demonstration Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            Demo Available
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            In Progress
          </span>
        );
      case 'Research Prototype':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Research Prototype
          </span>
        );
      case 'Experimental':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Experimental
          </span>
        );
    }
  };

  const getDomainIcon = (category: string) => {
    switch (category) {
      case 'Embedded & IoT':
        return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Robotics Simulation':
        return <Bot className="w-3.5 h-3.5 text-purple-400" />;
      case 'AI & Vision':
      case 'AI & PINNs':
        return <Activity className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <section id="projects" className="py-24 sm:py-32 relative z-10 border-t border-[#253247]/60 bg-[#070D18]/90 overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] border border-[#38BDF8]/30 shadow-sm shadow-[#38BDF8]/10">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>03 // Verified Engineering Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            Engineering Systems &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC]">Technical Prototypes</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            Physical hardware circuits, physics-informed AI models, real-time computer vision pipelines, and distributed robotics simulations built with reproducible bench evidence.
          </p>

          {/* Quick Stats Banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400">
            <span className="px-3 py-1 rounded-lg bg-[#0C1425] border border-[#253247] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <strong>7</strong> Built Systems
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#0C1425] border border-[#253247] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <strong>100%</strong> Documented Code
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#0C1425] border border-[#253247] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              FreeRTOS / ROS 2 / PyTorch
            </span>
          </div>
        </div>

        {/* Filter, Search & View Controls Bar */}
        <div className="mb-10 p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-[#0C1425] to-[#080E1C] border border-[#253247] shadow-xl space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by tech or keyword (e.g. ESP32, Python, ROS 2, OpenCV, Flask)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#070A12] border border-[#253247] focus:border-cyan-400 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 font-mono transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Toggle (Grid vs Table) */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <div className="flex items-center bg-[#070A12] p-1 rounded-xl border border-[#253247] text-xs font-mono">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    viewMode === 'grid'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Card Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cards</span>
                </button>

                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    viewMode === 'table'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Architecture Matrix Table View"
                >
                  <Table className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Matrix</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills Bar */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#1E293B]">
            <span className="text-[11px] font-mono text-slate-400 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
              Filter Domain:
            </span>
            {filterGroups.map((filter) => {
              const isSelected = selectedFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25 scale-[1.02]'
                      : 'bg-[#0E172A] text-slate-300 hover:text-white hover:bg-[#162338] border border-[#253247]'
                  }`}
                >
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter Bar */}
        <div className="mb-6 flex items-center justify-between text-xs font-mono text-slate-400">
          <div>
            Showing <strong className="text-cyan-400">{filteredProjects.length}</strong> of{' '}
            <strong className="text-white">{projectsData.length}</strong> engineering systems
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>
          <span className="hidden sm:inline text-slate-500">Tap card to inspect architecture schematic &amp; code</span>
        </div>

        {/* 1. CARD GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl bg-gradient-to-br from-[#0C1425] via-[#0A101F] to-[#070D18] border border-[#253247] hover:border-cyan-400/60 transition-all duration-300 shadow-2xl overflow-hidden flex flex-col justify-between group hover:shadow-cyan-500/10 hover:-translate-y-1"
              >
                {/* Top Image Banner Area */}
                <div>
                  <div
                    className="relative h-48 bg-[#050811] overflow-hidden cursor-pointer"
                    onClick={() => onSelectProject(project)}
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} schematic`}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C1425] via-[#0C1425]/40 to-transparent" />

                    {/* Status Pill (Top Right) */}
                    <div className="absolute top-3 right-3 shadow-lg">
                      {getStatusBadge(project.status)}
                    </div>

                    {/* Category Pill (Bottom Left) */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#070A12]/90 backdrop-blur-md border border-[#253247] text-[10px] font-mono text-cyan-300 shadow-md">
                      {getDomainIcon(project.category)}
                      <span>{project.category}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    
                    {/* Title & Tagline */}
                    <div>
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer font-sans leading-snug"
                      >
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-purple-400 mt-1 line-clamp-1">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Overview Text */}
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-sans">
                      {project.overview}
                    </p>

                    {/* Key Feature Highlight Pill */}
                    {project.keyFeatures && project.keyFeatures.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-[#070D18] border border-[#1E293B] text-[11px] text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-relaxed">
                          {project.keyFeatures[0]}
                        </span>
                      </div>
                    )}

                    {/* Tech Pills */}
                    <div className="pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] rounded-md bg-[#111B2B] text-slate-300 border border-[#253247] font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-1.5 py-0.5 text-[10px] text-cyan-400/80 font-mono bg-cyan-950/40 rounded border border-cyan-500/20">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Action Footer Bar */}
                <div className="px-5 sm:px-6 py-4 bg-[#080E1C] border-t border-[#253247] flex items-center justify-between">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 font-mono transition-colors"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.isPrivate ? (
                      <span
                        title="Private Project — Source Code Protected"
                        className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 text-[11px] font-mono shadow-sm shadow-amber-500/10"
                        aria-label="Private Project — Source Code Protected"
                      >
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[10px] hidden sm:inline font-bold">Protected</span>
                      </span>
                    ) : project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-slate-300 hover:text-white border border-[#253247] transition-colors"
                        aria-label="View GitHub Repository"
                        title="View GitHub Repository"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span
                        title="Repository available upon academic review"
                        className="p-2 rounded-xl bg-[#111B2B]/40 text-slate-600 border border-[#253247]/40 cursor-help"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </span>
                    )}

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-[#111B2B] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-[#253247] transition-colors"
                        aria-label="View Live Prototype Demo"
                        title="View Live Prototype Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => onSelectProject(project)}
                        className="p-2 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-cyan-400 border border-[#253247] transition-colors"
                        title="Inspect Engineering Schematics"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* 2. COMPACT ARCHITECTURE MATRIX (TABLE VIEW) */}
        {viewMode === 'table' && (
          <div className="rounded-2xl sm:rounded-3xl bg-[#091122] border border-[#253247] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0C1527] text-slate-300 border-b border-[#253247]">
                  <tr>
                    <th className="p-4">System Prototype</th>
                    <th className="p-4">Domain Category</th>
                    <th className="p-4">Primary Technologies</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#253247]/60 text-slate-200">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      onClick={() => onSelectProject(project)}
                      className="hover:bg-[#111B2B]/60 transition-colors cursor-pointer group"
                    >
                      <td className="p-4 space-y-0.5">
                        <div className="font-bold text-white group-hover:text-cyan-300 transition-colors font-sans text-sm">
                          {project.title}
                        </div>
                        <div className="text-[11px] text-purple-400 truncate max-w-xs sm:max-w-md">
                          {project.tagline}
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#070A12] border border-[#253247] text-[11px] text-cyan-300">
                          {getDomainIcon(project.category)}
                          <span>{project.category}</span>
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-[10px] rounded bg-[#111B2B] text-slate-300 border border-[#253247]"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-[10px] text-slate-500">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        {getStatusBadge(project.status)}
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProject(project);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold inline-flex items-center gap-1 transition-all"
                        >
                          <span>Inspect</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-[#0C1425] border border-[#253247] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#111B2B] border border-[#253247] text-cyan-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white font-sans">
              No engineering systems found matching "{searchQuery}"
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Try searching by generic keywords like <code>ESP32</code>, <code>Python</code>, <code>ROS 2</code>, or <code>OpenCV</code>, or reset the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('All');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs font-mono"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
