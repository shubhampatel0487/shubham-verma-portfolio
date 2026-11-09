import React from 'react';
import { Brain, Bot, Cpu, Navigation, Eye, Atom, Wifi, Cog, Sparkles, Compass } from 'lucide-react';
import { interestsList } from '../../data/portfolioData';

export const Interests: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5 text-[#38BDF8]" />;
      case 'Bot': return <Bot className="w-5 h-5 text-[#8B5CF6]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Navigation': return <Navigation className="w-5 h-5 text-[#38BDF8]" />;
      case 'Eye': return <Eye className="w-5 h-5 text-amber-400" />;
      case 'Atom': return <Atom className="w-5 h-5 text-[#8B5CF6]" />;
      case 'Wifi': return <Wifi className="w-5 h-5 text-emerald-400" />;
      case 'Cog':
      default:
        return <Cog className="w-5 h-5 text-[#38BDF8]" />;
    }
  };

  return (
    <section id="interests" className="py-24 relative z-10 border-t border-[#253247]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            07 // Interests &amp; Vision
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Future Engineering Trajectory
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Domains where computational theory transforms into physical kinetic systems and autonomous machines.
          </p>
        </div>

        {/* Future Vision Highlight Statement Banner */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0C1220] via-[#111B2B] to-[#0C1220] border-2 border-[#253247] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Compass className="w-32 h-32 text-[#38BDF8]" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Core Aspiration
            </div>
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F8FAFC] tracking-tight leading-snug font-sans">
              "My goal is to develop intelligent machines and systems that combine AI, electronics, software, and mechanical engineering to solve real-world problems."
            </blockquote>
            <p className="text-xs sm:text-sm font-mono text-[#94A3B8]">
              — Shubham Patel • Aspiring Robotics &amp; AI Engineer
            </p>
          </div>
        </div>

        {/* Interactive Interests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {interestsList.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0C1220] border border-[#253247] hover:border-[#38BDF8]/50 hover:bg-[#111B2B] transition-all duration-300 shadow-lg group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#111B2B] border border-[#253247] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors font-sans">
                  {item.title}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-[#253247]/60 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                <span>FOCUS DOMAIN</span>
                <span className="text-[#38BDF8]">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

