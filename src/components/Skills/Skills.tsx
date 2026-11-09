import React, { useState } from 'react';
import { Search, Code2, Brain, Bot, Cpu, Globe, Wrench, ShieldCheck } from 'lucide-react';
import { skillsData } from '../../data/portfolioData';
import { SkillItem } from '../../types/portfolio';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Technologies', icon: Code2 },
    { id: 'programming', label: 'Programming', icon: Code2 },
    { id: 'ai_ml', label: 'Artificial Intelligence', icon: Brain },
    { id: 'robotics', label: 'Robotics & Control', icon: Bot },
    { id: 'embedded', label: 'Embedded Systems', icon: Cpu },
    { id: 'web', label: 'Web & APIs', icon: Globe },
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
    <section id="skills" className="py-24 relative z-10 border-t border-[#253247]/60 bg-[#070A12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] px-3.5 py-1.5 rounded-full border border-[#253247]">
            Core Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
            Engineering Expertise &amp; Technical Stack
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Honest, verified skills across low-level embedded hardware, mathematical AI architectures, and full-stack software development.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow-md shadow-[#38BDF8]/20'
                      : 'bg-[#111B2B] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#162338] border border-[#253247]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search skill (e.g. ROS, C++, ESP32)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[#111B2B] text-[#F8FAFC] placeholder-[#64748B] border border-[#253247] focus:outline-none focus:border-[#38BDF8] transition-all"
            />
          </div>

        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-5 rounded-2xl bg-[#111B2B] border border-[#253247] hover:border-[#38BDF8]/40 transition-all duration-300 shadow-md group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-base text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors font-sans">
                    {skill.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0C1220] text-[#38BDF8] border border-[#253247] whitespace-nowrap">
                    {skill.category.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Owner-Editable Proficiency Indicator */}
              <div className="pt-4 mt-3 border-t border-[#253247]/60 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#64748B]">Proficiency Level</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Skill Integrity Notice */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-[#64748B]">
            ℹ️ All competencies represent authentic coursework, physical lab experimentation, and verified project code.
          </p>
        </div>

      </div>
    </section>
  );
};
