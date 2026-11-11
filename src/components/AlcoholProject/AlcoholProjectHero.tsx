import React from 'react';
import {
  Play,
  Layers,
  Image as ImageIcon,
  FileDown,
  Cpu,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ALCOHOL_PROJECT_DATA } from './alcoholProjectData';

interface AlcoholProjectHeroProps {
  onNavigateSection: (sectionId: string) => void;
  onDownloadReport: () => void;
}

export const AlcoholProjectHero: React.FC<AlcoholProjectHeroProps> = ({
  onNavigateSection,
  onDownloadReport
}) => {
  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-[#0C1220] to-[#070A12] border-2 border-[#253247] p-6 sm:p-10 overflow-hidden shadow-2xl">
      {/* Subtle Ambient Background Grid & Radial Glow */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Heading, Meta, Description & Real Action Buttons */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Top Status & Verification Pill */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
              <Cpu className="w-3.5 h-3.5" />
              EMBEDDED CASE STUDY
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Bench Prototype Verified
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#94A3B8] bg-[#111B2B] border border-[#253247]">
              Diploma CS &bull; 2023–2026
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight font-sans">
              {ALCOHOL_PROJECT_DATA.meta.title}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#38BDF8] mt-1.5">
              {ALCOHOL_PROJECT_DATA.meta.subtitle}
            </p>
          </div>

          {/* Structured Paragraph */}
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-sans max-w-2xl">
            {ALCOHOL_PROJECT_DATA.overview.summary}
          </p>

          {/* Technical Scope Transparency Banner */}
          <div className="p-3.5 rounded-xl bg-[#080B12]/80 border border-amber-500/30 flex items-start gap-2.5 text-xs font-mono text-[#CBD5E1]">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-400">Technical Scope Note:</strong> This is an educational benchtop hardware circuit using heated SnO2 semiconductor sensor response and relay actuation. It is not connected to a moving vehicle and is not a certified legal breathalyzer.
            </div>
          </div>

          {/* Phase 3 Action Buttons (All 4 Real & Functional) */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            {/* 1. Watch Project Overview */}
            <button
              onClick={() => onNavigateSection('alcohol-video')}
              className="px-4 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#070A12] font-mono font-bold text-xs tracking-wide transition-all shadow-lg shadow-[#38BDF8]/20 flex items-center gap-2 group"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Overview</span>
            </button>

            {/* 2. Explore System Architecture */}
            <button
              onClick={() => onNavigateSection('alcohol-architecture')}
              className="px-4 py-2.5 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-[#F8FAFC] hover:text-[#38BDF8] border border-[#253247] hover:border-[#38BDF8]/40 font-mono font-semibold text-xs transition-all flex items-center gap-2"
            >
              <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Architecture</span>
            </button>

            {/* 3. View Hardware Gallery */}
            <button
              onClick={() => onNavigateSection('alcohol-gallery')}
              className="px-4 py-2.5 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-[#CBD5E1] hover:text-[#F8FAFC] border border-[#253247] hover:border-[#38BDF8]/40 font-mono font-semibold text-xs transition-all flex items-center gap-2"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Hardware Gallery</span>
            </button>

            {/* 4. Download Project Report */}
            <button
              onClick={onDownloadReport}
              className="px-4 py-2.5 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 font-mono font-semibold text-xs transition-all flex items-center gap-2"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Project Report</span>
            </button>
          </div>

        </div>

        {/* Right Column: High-Fidelity Conceptual Schematic Vector with Telemetry Overlay */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl bg-[#080B12] border border-[#253247] p-3 shadow-xl overflow-hidden group">
            
            {/* Visual Vector Schematic */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#0C1220] flex items-center justify-center p-2">
              <img
                src="/projects/alcohol-detection.svg"
                alt="ESP32 Alcohol Detection System Circuit Architecture Schematic"
                className="w-full h-full object-contain filter drop-shadow group-hover:scale-[1.02] transition-transform duration-500"
              />
              
              {/* Overlay Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#070A12]/90 backdrop-blur-md border border-[#253247] text-[10px] font-mono text-[#38BDF8]">
                CONCEPT SCHEMATIC // 2D CAD
              </div>

              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#070A12]/90 border border-emerald-500/30 text-[9px] font-mono text-emerald-400">
                BENCHTOP PROTOTYPE
              </div>
            </div>

            {/* Quick Specs Strip */}
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
              <div className="p-2 rounded-lg bg-[#111B2B] border border-[#253247]">
                <span className="text-[#64748B] block">MCU TARGET</span>
                <span className="text-[#F8FAFC] font-bold">ESP32 30-PIN</span>
              </div>
              <div className="p-2 rounded-lg bg-[#111B2B] border border-[#253247]">
                <span className="text-[#64748B] block">SENSOR CORE</span>
                <span className="text-[#38BDF8] font-bold">SnO2 VAPOUR</span>
              </div>
              <div className="p-2 rounded-lg bg-[#111B2B] border border-[#253247]">
                <span className="text-[#64748B] block">INTERLOCK</span>
                <span className="text-emerald-400 font-bold">5V RELAY NC</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
