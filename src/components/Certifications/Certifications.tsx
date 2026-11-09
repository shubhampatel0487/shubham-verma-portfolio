import React from 'react';
import { Award, ShieldAlert, BookOpen } from 'lucide-react';
import { certificationsData } from '../../data/portfolioData';

export const Certifications: React.FC = () => {
  const plannedCertifications = [
    {
      title: "ROS 2 Basics & Industrial Manipulation",
      domain: "Robotics & Automation",
      status: "In Progress / Active Study"
    },
    {
      title: "Embedded Systems & RTOS Firmware (ARM / ESP32)",
      domain: "Embedded Electronics",
      status: "Planned 2025–2026"
    },
    {
      title: "Deep Learning & Physics-Informed Neural Networks",
      domain: "Artificial Intelligence",
      status: "Research in Progress"
    }
  ];

  return (
    <section id="certifications" className="py-24 relative z-10 border-t border-[#253247]/40 bg-[#0A0E18]/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            06 // Certifications &amp; Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Professional Credentials &amp; Verification
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Commitment to professional engineering ethics and strict verification. Credentials will be updated with cryptographic links upon completion.
          </p>
        </div>

        {/* If certifications exist, render them; otherwise show honest state */}
        {certificationsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificationsData.map((cert) => (
              <div key={cert.id} className="p-6 rounded-2xl bg-[#0C1220] border border-[#253247] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#38BDF8]">{cert.issuer}</span>
                  <span className="text-xs text-[#94A3B8]">{cert.date}</span>
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC]">{cert.title}</h3>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#38BDF8] hover:underline"
                  >
                    <span>Verify Credential</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Tasteful Honest Empty State */
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0C1220] border border-[#253247] shadow-2xl text-center space-y-6 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Award className="w-48 h-48 text-[#38BDF8]" />
            </div>

            <div className="w-16 h-16 rounded-2xl bg-[#111B2B] border border-[#253247] flex items-center justify-center mx-auto text-[#38BDF8] shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] font-sans">
                Professional Credentials Pending Verification
              </h3>
              <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto italic">
                "Certifications and professional learning credentials will be added as they are earned."
              </p>
            </div>

            {/* Credential Learning Roadmap */}
            <div className="pt-6 border-t border-[#253247] text-left space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Active Study &amp; Certification Roadmap
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {plannedCertifications.map((plan, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#111B2B]/70 border border-[#253247] text-xs space-y-1">
                    <p className="font-semibold text-[#F8FAFC] line-clamp-2">{plan.title}</p>
                    <p className="text-[11px] font-mono text-[#8B5CF6]">{plan.domain}</p>
                    <span className="inline-block text-[10px] text-[#94A3B8] pt-1">
                      {plan.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-xs text-[#64748B] flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Strict Transparency Policy: No fabricated or unearned certificates are displayed.</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
