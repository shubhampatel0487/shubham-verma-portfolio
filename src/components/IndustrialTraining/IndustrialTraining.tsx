import React from 'react';
import { Briefcase, CheckCircle2, Code2, Award, Calendar } from 'lucide-react';
import { industrialTrainingData } from '../../data/portfolioData';

export const IndustrialTraining: React.FC = () => {
  return (
    <section id="training" className="py-24 relative z-10 border-t border-[#263244]/40 bg-[#0A0E18]/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#141C2A] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            Industrial Training
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Practical Software Industry Experience
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Supervised practical training bridging academic computer science with real-world programming practices.
          </p>
        </div>

        {/* Industrial Training Spotlight Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0E1420] border-2 border-[#263244] shadow-2xl relative overflow-hidden group hover:border-[#38BDF8]/40 transition-all">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Briefcase className="w-48 h-48 text-[#38BDF8]" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#263244]">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 text-xs font-mono font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>Verified Industrial Program</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-sans">
                {industrialTrainingData.company}
              </h3>
              <p className="text-sm font-mono text-[#8B5CF6]">
                {industrialTrainingData.role}
              </p>
            </div>

            <div className="flex flex-col sm:items-end">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141C2A] text-[#38BDF8] border border-[#263244] text-xs font-mono font-bold">
                <Calendar className="w-3.5 h-3.5" />
                {industrialTrainingData.duration}
              </span>
              <span className="text-[11px] font-mono text-[#94A3B8] mt-1">
                Completed Program
              </span>
            </div>
          </div>

          {/* Description & Core Takeaways */}
          <div className="py-6 space-y-4">
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              {industrialTrainingData.description}
            </p>

            <div className="p-4 rounded-xl bg-[#141C2A]/60 border border-[#263244] text-xs text-[#94A3B8] flex items-start gap-2.5">
              <Code2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Program Core Focus:</strong> {industrialTrainingData.focus}
              </span>
            </div>
          </div>

          {/* Key Competencies Acquired */}
          <div className="pt-4 border-t border-[#263244] space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8]">
              Key Competencies Acquired:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {industrialTrainingData.skillsAcquired.map((skill, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

