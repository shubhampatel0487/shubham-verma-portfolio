import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Activity,
  Zap,
  Cpu,
  Bell,
  CheckCircle2
} from 'lucide-react';
import { ALCOHOL_PROJECT_DATA } from './alcoholProjectData';

export const AlcoholWorkflow: React.FC = () => {
  const stages = ALCOHOL_PROJECT_DATA.workflowStages;
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);

  const activeStage = stages[activeStageIdx];

  const handleNext = () => {
    setActiveStageIdx((prev) => (prev < stages.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveStageIdx((prev) => (prev > 0 ? prev - 1 : stages.length - 1));
  };

  const handleReset = () => {
    setActiveStageIdx(0);
  };

  const getStageIcon = (idx: number) => {
    switch (idx) {
      case 0: return Activity;
      case 1: return Zap;
      case 2: return Cpu;
      case 3: return Bell;
      default: return Activity;
    }
  };

  return (
    <section id="alcohol-workflow" className="p-6 sm:p-8 rounded-3xl bg-[#0C1220] border border-[#253247] space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#253247]">
        <div>
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider block">
            PHASE 05 // DETERMINISTIC 4-STAGE PIPELINE
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-sans text-[#F8FAFC]">
            Interactive System Workflow
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#94A3B8]">Stage {activeStageIdx + 1} of 4</span>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247] transition-colors"
            title="Reset Workflow"
            aria-label="Reset Workflow"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Connected 4 Stages Bar with Animated Signal Flow */}
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-5 left-4 right-4 h-1 bg-[#1E293B] hidden sm:block -z-0">
          <div
            className="h-full bg-gradient-to-r from-[#38BDF8] to-emerald-400 transition-all duration-300"
            style={{ width: `${(activeStageIdx / (stages.length - 1)) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
          {stages.map((stage, idx) => {
            const isSelected = activeStageIdx === idx;
            const isCompleted = activeStageIdx > idx;
            const Icon = getStageIcon(idx);

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageIdx(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#162338] border-[#38BDF8] shadow-lg shadow-[#38BDF8]/15 scale-[1.02]'
                    : isCompleted
                    ? 'bg-[#111B2B] border-emerald-500/40 hover:border-[#38BDF8]/40'
                    : 'bg-[#080B12] border-[#253247] hover:border-[#38BDF8]/30 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                    isSelected
                      ? 'bg-[#38BDF8] text-[#070A12]'
                      : isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-[#1E293B] text-[#94A3B8]'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    stage.status === 'Implemented' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#38BDF8]/10 text-[#38BDF8]'
                  }`}>
                    {stage.status}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-[#38BDF8]' : 'text-[#F8FAFC]'}`}>
                    {stage.title.split(': ')[1] || stage.title}
                  </h4>
                  <p className="text-[11px] text-[#94A3B8] line-clamp-1">
                    {stage.shortSummary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep-Dive Card */}
      <div className="p-6 rounded-2xl bg-[#080B12] border border-[#253247] space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#253247]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] animate-pulse" />
            <h4 className="text-base sm:text-lg font-bold font-sans text-[#F8FAFC]">
              {activeStage.title}
            </h4>
          </div>
          <span className="text-xs font-mono text-[#38BDF8] bg-[#111B2B] px-3 py-1 rounded-full border border-[#253247]">
            Status: {activeStage.status}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
          {activeStage.shortSummary}
        </p>

        {/* 3 Step Matrix: Input -> Processing -> Output */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247] space-y-1">
            <span className="text-[#64748B] text-[10px] uppercase font-bold block">1. Physical Input</span>
            <p className="text-[#F8FAFC]">{activeStage.inputDescription}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247] space-y-1">
            <span className="text-[#38BDF8] text-[10px] uppercase font-bold block">2. Transfer / Processing</span>
            <p className="text-[#CBD5E1]">{activeStage.processingDescription}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247] space-y-1">
            <span className="text-emerald-400 text-[10px] uppercase font-bold block">3. State / Output</span>
            <p className="text-[#F8FAFC]">{activeStage.outputDescription}</p>
          </div>
        </div>

        {/* Technical Mechanism Formula / Note */}
        <div className="p-3.5 rounded-xl bg-[#0C1220] border border-[#253247] flex items-center justify-between text-xs font-mono text-[#94A3B8]">
          <span className="text-[#38BDF8] font-bold">Mechanism:</span>
          <span className="text-[#CBD5E1] truncate ml-2">{activeStage.technicalMechanism}</span>
        </div>

      </div>

      {/* Workflow Navigation Controls (Prev / Next & Keys) */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          className="px-4 py-2 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-[#CBD5E1] hover:text-[#F8FAFC] border border-[#253247] text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Stage</span>
        </button>

        {/* Dots Indicator */}
        <div className="flex items-center gap-2">
          {stages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStageIdx(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeStageIdx === i ? 'bg-[#38BDF8] scale-125' : 'bg-[#253247] hover:bg-[#94A3B8]'
              }`}
              aria-label={`Go to stage ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-xl bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#070A12] font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#38BDF8]/20"
        >
          <span>Next Stage</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
};
