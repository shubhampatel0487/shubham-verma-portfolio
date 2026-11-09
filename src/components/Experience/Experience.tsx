import React from 'react';
import { Cpu, Code2, Bot, CheckCircle2, FlaskConical } from 'lucide-react';
import { experienceTimeline } from '../../data/portfolioData';

export const Experience: React.FC = () => {
  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
      case 'Independent Research':
        return <FlaskConical className="w-4 h-4 text-[#8B5CF6]" />;
      case 'Hands-on Prototyping':
        return <Cpu className="w-4 h-4 text-[#38BDF8]" />;
      case 'Academic / Lab Work':
        return <Bot className="w-4 h-4 text-emerald-400" />;
      case 'Technical Project':
      default:
        return <Code2 className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <section id="experience" className="py-24 relative z-10 border-t border-[#263244]/40 bg-[#0A0E18]/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#141C2A] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            04 // Experience &amp; Practical Learning
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Engineering Practice &amp; Research Initiatives
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            A documented record of independent research, lab prototyping, embedded engineering experiments, and academic initiatives. No fabricated corporate titles.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-[#263244] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experienceTimeline.map((item) => (
            <div key={item.id} className="relative group">
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#0E1420] border-2 border-[#38BDF8] flex items-center justify-center shadow-md shadow-[#38BDF8]/20 group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1420] border border-[#263244] hover:border-[#38BDF8]/40 transition-colors shadow-xl space-y-4">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-mono bg-[#141C2A] text-[#38BDF8] border border-[#38BDF8]/20 mb-2">
                      {getRoleIcon(item.roleType)}
                      <span>{item.roleType}</span>
                    </span>
                    <h3 className="text-xl font-bold text-[#F8FAFC] font-sans">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-[#8B5CF6] mt-0.5">
                      Focus: {item.focus}
                    </p>
                  </div>

                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#141C2A] text-[#94A3B8] border border-[#263244] w-fit">
                    {item.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#CBD5E1]">
                    Key Technical Contributions:
                  </h4>
                  <ul className="space-y-1.5">
                    {item.highlights.map((high, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#94A3B8]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                        <span>{high}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="pt-3 border-t border-[#263244] flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[#141C2A] text-[#CBD5E1] text-[11px] font-mono border border-[#263244]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
