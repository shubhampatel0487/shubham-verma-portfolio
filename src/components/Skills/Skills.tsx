import React, { useState } from 'react';
import { Search, Code2, Brain, Bot, Cpu, Database, Wrench, Info } from 'lucide-react';
import { skillsData } from '../../data/portfolioData';
import { SkillItem } from '../../types/portfolio';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Disciplines', icon: Code2 },
    { id: 'programming', label: 'Programming', icon: Code2 },
    { id: 'ai_ml', label: 'AI & Machine Learning', icon: Brain },
    { id: 'robotics', label: 'Robotics & Automation', icon: Bot },
    { id: 'embedded', label: 'Embedded & IoT', icon: Cpu },
    { id: 'backend', label: 'Backend & DB', icon: Database },
    { id: 'tools', label: 'Tools & Linux', icon: Wrench },
  ];

  const filteredSkills = skillsData.filter((skill: SkillItem) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.description && skill.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      skill.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 relative z-10 border-t border-[#263244]/40 bg-[#0A0E18]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#141C2A] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            02 // Technical Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Categorized Technical Stack &amp; Competencies
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            An honest, transparent appraisal of technical capabilities spanning software development, AI research, and embedded electronics.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#38BDF8] text-[#080B12] font-semibold shadow-md shadow-[#38BDF8]/20'
                      : 'bg-[#141C2A] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] border border-[#263244]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input for Recruiters */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search skill (e.g. ROS, C++, PINN)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#141C2A] text-[#F8FAFC] placeholder-[#64748B] border border-[#263244] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"
            />
          </div>

        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-5 rounded-xl bg-[#0E1420] border border-[#263244] hover:border-[#38BDF8]/40 transition-all duration-300 shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-base text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors font-sans">
                    {skill.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141C2A] text-[#38BDF8] border border-[#38BDF8]/20 whitespace-nowrap">
                    {skill.category.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed mb-3">
                  {skill.description}
                </p>
              </div>

              {/* Honest Proficiency Level Label */}
              <div className="pt-3 border-t border-[#263244]/60 flex items-center justify-between text-xs font-mono">
                <span className="text-[#64748B] text-[11px]">Proficiency:</span>
                <span className="text-[#CBD5E1] font-medium bg-[#141C2A] px-2 py-0.5 rounded border border-[#263244]">
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-[#94A3B8]">
            <p className="text-sm">No skills found matching your search filter "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs text-[#38BDF8] underline font-mono"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Honest Transparency Notice */}
        <div className="mt-12 p-4 rounded-xl bg-[#141C2A]/60 border border-[#263244] flex items-start sm:items-center gap-3 text-xs text-[#94A3B8]">
          <Info className="w-5 h-5 text-[#38BDF8] flex-shrink-0" />
          <span>
            <strong>Honest Capability Notice:</strong> Skill ratings reflect academic coursework, personal research experiments, and practical lab prototyping. In accordance with professional engineering ethics, no unsubstantiated "expert" status is claimed.
          </span>
        </div>

      </div>
    </section>
  );
};
