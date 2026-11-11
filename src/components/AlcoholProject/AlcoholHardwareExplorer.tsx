import React, { useState } from 'react';
import { ALCOHOL_PROJECT_DATA, HardwareComponentItem } from './alcoholProjectData';

export const AlcoholHardwareExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeComponent, setActiveComponent] = useState<HardwareComponentItem | null>(null);

  const components = ALCOHOL_PROJECT_DATA.hardwareComponents;

  const categories = ['All', 'Processing', 'Sensing', 'Actuation', 'Interface', 'Power'];

  const filtered = selectedCategory === 'All'
    ? components
    : components.filter(c => c.category === selectedCategory);

  const getStatusBadge = (status: HardwareComponentItem['status']) => {
    switch (status) {
      case 'Verified in Prototype':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            ● Verified in Prototype
          </span>
        );
      case 'Bench Tested':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            ● Bench Tested
          </span>
        );
      case 'Model To Be Confirmed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            ● Exact Model To Be Confirmed
          </span>
        );
      case 'Proposed (Future)':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
            ○ Proposed Extension
          </span>
        );
    }
  };

  return (
    <section id="alcohol-hardware" className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#253247] pb-4">
        <div>
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider block">
            PHASE 06 // 2D COMPONENT EXPLORER
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-sans text-[#F8FAFC]">
            Verified Hardware Subsystems &amp; Interfacing
          </h3>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#0C1220] p-1 rounded-xl border border-[#253247]">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111B2B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Component Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(comp => (
          <div
            key={comp.id}
            onClick={() => setActiveComponent(comp)}
            className="p-5 rounded-2xl bg-[#0C1220] border border-[#253247] hover:border-[#38BDF8]/40 transition-all flex flex-col justify-between cursor-pointer group shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#64748B] uppercase">
                  {comp.category}
                </span>
                {getStatusBadge(comp.status)}
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors font-sans">
                  {comp.name}
                </h4>
                <p className="text-xs font-mono text-[#38BDF8] mt-0.5">
                  {comp.verifiedModel}
                </p>
              </div>

              <p className="text-xs text-[#CBD5E1] line-clamp-3 leading-relaxed">
                {comp.role}
              </p>
            </div>

            <div className="pt-3 mt-4 border-t border-[#253247]/70 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#64748B]">Pinout / Port:</span>
                <span className="text-[#F8FAFC] font-bold truncate max-w-[160px] text-right">
                  {comp.pinoutOrInterface}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#38BDF8] group-hover:underline block text-right">
                View Full Specs &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Deep-Dive Modal / Flyout when a card is clicked */}
      {activeComponent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A12]/80 backdrop-blur-md"
          onClick={() => setActiveComponent(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl bg-[#0C1220] border-2 border-[#38BDF8]/40 p-6 sm:p-8 space-y-5 shadow-2xl text-[#F8FAFC]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-[#38BDF8] uppercase">
                  {activeComponent.category} Subsystem
                </span>
                <h3 className="text-xl font-bold font-sans mt-0.5">
                  {activeComponent.name}
                </h3>
                <p className="text-xs font-mono text-[#94A3B8]">
                  Model: {activeComponent.verifiedModel}
                </p>
              </div>
              <div>{getStatusBadge(activeComponent.status)}</div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247] space-y-1">
                <span className="text-[#38BDF8] font-mono font-bold block">Role in Prototype</span>
                <p className="text-[#CBD5E1]">{activeComponent.role}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247] space-y-1">
                <span className="text-emerald-400 font-mono font-bold block">Why Required</span>
                <p className="text-[#CBD5E1]">{activeComponent.whyRequired}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247] space-y-1">
                <span className="text-[#8B5CF6] font-mono font-bold block">Hardware Interaction</span>
                <p className="text-[#CBD5E1]">{activeComponent.hardwareInteraction}</p>
              </div>
            </div>

            {/* Verified Specs */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-[#64748B] uppercase">Specifications:</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {activeComponent.specifications.map((spec, i) => (
                  <div key={i} className="p-2 rounded-lg bg-[#070A12] border border-[#253247] text-[#CBD5E1]">
                    {spec}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#253247] flex justify-end">
              <button
                onClick={() => setActiveComponent(null)}
                className="px-4 py-2 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-[#F8FAFC] text-xs font-mono border border-[#253247] transition-colors"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
