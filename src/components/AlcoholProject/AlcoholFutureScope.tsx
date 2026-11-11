import React from 'react';
import { Sparkles } from 'lucide-react';
import { ALCOHOL_PROJECT_DATA } from './alcoholProjectData';

export const AlcoholFutureScope: React.FC = () => {
  const futureItems = ALCOHOL_PROJECT_DATA.futureScope;

  return (
    <section id="alcohol-future" className="p-6 sm:p-8 rounded-3xl bg-[#0C1220] border border-purple-500/30 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#253247] pb-4">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
            PHASE 14 // FUTURE ROADMAP &amp; RESEARCH SCOPE
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-sans text-[#F8FAFC]">
            Planned Extensions &amp; Industrial Refinements
          </h3>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Future Research Scope</span>
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-3xl">
        The current implementation proves benchtop signal acquisition and relay cutoff logic. The following roadmap outlines the necessary engineering phases required to advance from student prototype to automotive-grade deployment:
      </p>

      {/* Roadmap Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {futureItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-[#080B12] border border-[#253247] space-y-2.5 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-purple-400 font-bold block">
                {item.phase}
              </span>
              <h4 className="text-sm font-bold text-[#F8FAFC] font-sans">
                {item.title}
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#253247]/60 flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#64748B]">Status:</span>
              <span className="text-purple-400 font-bold">{item.status}</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
