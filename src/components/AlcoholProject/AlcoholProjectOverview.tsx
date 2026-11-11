import React from 'react';
import {
  FileText,
  AlertCircle,
  Target,
  Lightbulb,
  Cpu,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { ALCOHOL_PROJECT_DATA } from './alcoholProjectData';

export const AlcoholProjectOverview: React.FC = () => {
  const { overview } = ALCOHOL_PROJECT_DATA;

  return (
    <section id="alcohol-overview" className="space-y-6">
      
      {/* Section Header */}
      <div className="flex items-center gap-2 border-b border-[#253247] pb-3">
        <FileText className="w-4 h-4 text-[#38BDF8]" />
        <h3 className="text-base sm:text-lg font-bold font-sans text-[#F8FAFC]">
          Project Overview &amp; Engineering Rationale
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
        
        {/* 1. Project Overview */}
        <div className="p-5 rounded-2xl bg-[#0C1220] border border-[#253247] space-y-2.5">
          <div className="flex items-center gap-2 text-[#38BDF8] font-mono font-bold text-xs">
            <Activity className="w-4 h-4" />
            <span>01 // SYSTEM OVERVIEW</span>
          </div>
          <p className="text-[#CBD5E1] leading-relaxed">
            {overview.summary}
          </p>
        </div>

        {/* 2. Problem Statement */}
        <div className="p-5 rounded-2xl bg-[#0C1220] border border-[#253247] space-y-2.5">
          <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs">
            <AlertCircle className="w-4 h-4" />
            <span>02 // PROBLEM STATEMENT</span>
          </div>
          <p className="text-[#CBD5E1] leading-relaxed">
            {overview.problemStatement}
          </p>
        </div>

        {/* 3. Project Objectives */}
        <div className="p-5 rounded-2xl bg-[#0C1220] border border-[#253247] space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs">
            <Target className="w-4 h-4" />
            <span>03 // PROJECT OBJECTIVES</span>
          </div>
          <ul className="space-y-2 text-[#CBD5E1]">
            {overview.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#38BDF8] font-mono font-bold mt-0.5">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Proposed Solution */}
        <div className="p-5 rounded-2xl bg-[#0C1220] border border-[#253247] space-y-2.5">
          <div className="flex items-center gap-2 text-[#8B5CF6] font-mono font-bold text-xs">
            <Lightbulb className="w-4 h-4" />
            <span>04 // PROPOSED SOLUTION</span>
          </div>
          <p className="text-[#CBD5E1] leading-relaxed">
            {overview.proposedSolution}
          </p>
          <div className="pt-2 border-t border-[#253247]/60 text-xs font-mono text-[#94A3B8]">
            Key architectural focus: Decoupling sensitive low-voltage analog conversion from inductive actuator circuitry.
          </div>
        </div>

        {/* 5. Engineering Approach */}
        <div className="p-5 rounded-2xl bg-[#0C1220] border border-[#253247] space-y-2.5">
          <div className="flex items-center gap-2 text-[#38BDF8] font-mono font-bold text-xs">
            <Cpu className="w-4 h-4" />
            <span>05 // ENGINEERING APPROACH</span>
          </div>
          <p className="text-[#CBD5E1] leading-relaxed">
            {overview.engineeringApproach}
          </p>
        </div>

        {/* 6. Project Scope & 7. Current Implementation Status */}
        <div className="p-5 rounded-2xl bg-[#0C1220] border border-[#253247] space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>06 // BOUNDARIES &amp; SCOPE</span>
            </div>
            <p className="text-[#CBD5E1] leading-relaxed">
              {overview.projectScope}
            </p>
          </div>

          <div className="pt-3 border-t border-[#253247] space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#94A3B8]">07 // IMPLEMENTATION STATUS:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                BENCHTOP VERIFIED
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {overview.currentStatus}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

