import React from 'react';
import { Mail, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../UI/Icons';
import { personalProfile } from '../../data/portfolioData';

interface ProfilesProps {
  onOpenResume: () => void;
}

export const Profiles: React.FC<ProfilesProps> = ({ onOpenResume }) => {
  const profileCards = [
    {
      title: "GitHub Development Space",
      handle: `@${personalProfile.contact.githubUsername}`,
      description: "Explore open-source repositories, microcontroller firmware sketches, PINN model prototypes, and robotics simulation experiments.",
      icon: GithubIcon,
      actionText: "Visit GitHub Profile",
      actionUrl: personalProfile.contact.githubUrl,
      isExternal: true,
      color: "border-[#38BDF8]/40 text-[#38BDF8]"
    },
    {
      title: "LinkedIn Professional Network",
      handle: "shubham-patel-robotics",
      description: "Connect for technical collaborations, robotics engineering opportunities, academic discussions, and professional networking.",
      icon: LinkedinIcon,
      actionText: "Connect on LinkedIn",
      actionUrl: personalProfile.contact.linkedinUrl,
      isExternal: true,
      color: "border-[#8B5CF6]/40 text-[#8B5CF6]"
    },
    {
      title: "Direct Engineering Correspondence",
      handle: personalProfile.contact.email,
      description: "Reach out directly for formal inquiries, robotics project discussions, or academic collaborations via email.",
      icon: Mail,
      actionText: "Send Direct Email",
      actionUrl: `mailto:${personalProfile.contact.email}`,
      isExternal: false,
      color: "border-emerald-500/40 text-emerald-400"
    },
    {
      title: "Official Curriculum Vitae",
      handle: personalProfile.resume.filename,
      description: "Download or preview the complete verified resume detailing education, technical stack, projects, and contact channels.",
      icon: FileText,
      actionText: "Preview / Download CV",
      onAction: onOpenResume,
      isExternal: false,
      color: "border-amber-500/40 text-amber-400"
    }
  ];

  return (
    <section id="profiles" className="py-24 relative z-10 border-t border-[#263244]/40 bg-[#0A0E18]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#141C2A] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            08 // Professional Profiles
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Verified Online Footprint &amp; Repositories
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Direct verified channels to review engineering code, connect professionally, and inspect academic milestones.
          </p>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-[#0E1420] border border-[#263244] hover:border-[#38BDF8]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#141C2A] border border-[#263244] flex items-center justify-center text-[#F8FAFC] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#141C2A] text-[#94A3B8] border border-[#263244]">
                      {card.handle}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors font-sans">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-[#263244] flex items-center justify-between">
                  {card.actionUrl ? (
                    <a
                      href={card.actionUrl}
                      target={card.isExternal ? "_blank" : undefined}
                      rel={card.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#38BDF8] hover:text-[#7dd3fc] transition-colors"
                    >
                      <span>{card.actionText}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      onClick={card.onAction}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#38BDF8] hover:text-[#7dd3fc] transition-colors"
                    >
                      <span>{card.actionText}</span>
                      <FileText className="w-4 h-4" />
                    </button>
                  )}

                  <span className="text-[11px] font-mono text-[#64748B] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Link
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
