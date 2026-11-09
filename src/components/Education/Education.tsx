import React from 'react';
import { GraduationCap, Award, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { educationData } from '../../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative z-10 border-t border-[#253247]/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            05 // Education History
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Academic Foundation &amp; Technical Qualifications
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Formal technical education in Computer Science and Engineering, supported by rigorous intermediate sciences and mathematics.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="relative border-l border-[#253247] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {educationData.map((edu, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#0C1220] border-2 border-[#8B5CF6] flex items-center justify-center shadow-md shadow-[#8B5CF6]/20 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-3 h-3 text-[#8B5CF6]" />
              </div>

              {/* Education Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0C1220] border border-[#253247] hover:border-[#8B5CF6]/40 transition-colors shadow-xl space-y-4">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-mono bg-[#111B2B] text-[#8B5CF6] border border-[#8B5CF6]/20 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{edu.period}</span>
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] font-sans">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-medium text-[#CBD5E1] mt-1 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                      <span>{edu.institution}, {edu.location}</span>
                    </p>
                  </div>

                  {/* Score or Status Pill */}
                  <div className="flex flex-col sm:items-end gap-1.5">
                    {edu.score ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                        <Award className="w-3.5 h-3.5" />
                        <span>Score: {edu.score}</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 text-xs font-mono font-bold">
                        <span>{edu.status}</span>
                      </div>
                    )}
                    {edu.stream && (
                      <span className="text-[11px] font-mono text-[#94A3B8]">
                        {edu.stream}
                      </span>
                    )}
                  </div>
                </div>

                {/* Highlights List */}
                <div className="pt-2 border-t border-[#253247] space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                    Curriculum &amp; Academic Focus:
                  </h4>
                  <ul className="space-y-1.5">
                    {edu.highlights.map((high, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs text-[#94A3B8]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{high}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

