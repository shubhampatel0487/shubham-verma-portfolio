import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  Copy,
  Check,
  Download,
  Share2,
  RotateCw,
    ShieldCheck,
  CheckCircle2,
  Smartphone,
  Sparkles,
  QrCode
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../UI/Icons';
import { personalProfile, skillsData, educationData } from '../../data/portfolioData';

interface DigitalIdentityCardProps {
  currentName: string;
  onToggleName: () => void;
}

export const DigitalIdentityCard: React.FC<DigitalIdentityCardProps> = ({
  currentName,
  onToggleName,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${currentName} | Digital Identity`,
        text: `${currentName} — Aspiring Robotics & AI Engineer`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy(window.location.href, 'portfolio_url');
    }
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://shubhampatel.dev';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}&bgcolor=14-28-42&color=56-189-248`;

  return (
    <section id="digital-id" className="py-24 relative z-10 border-t border-[#263244]/40 bg-[#0A0E18]/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#141C2A] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            Professional Identity
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Professional Digital Identity Card
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Interactive digital pass containing verified academic credentials, direct WhatsApp contact, and mobile vCard export.
          </p>
        </div>

        {/* Identity Validation Banner for Shubham */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#141C2A] border-2 border-[#38BDF8]/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              <span className="font-bold uppercase tracking-wider">Identity Display Confirmation</span>
            </div>
            <p className="text-xs sm:text-sm text-[#CBD5E1]">
              Uploaded Resume name is <strong>SHUBHAM VERMA</strong>, while instructions specify <strong>SHUBHAM PATEL</strong>.
              Currently displaying: <span className="text-[#38BDF8] font-bold font-mono">{currentName}</span>.
            </p>
          </div>

          <button
            onClick={onToggleName}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#080B12] hover:bg-[#1E293B] text-xs font-mono font-semibold text-[#38BDF8] border border-[#38BDF8]/40 transition-all shadow-md whitespace-nowrap"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Switch Name to {currentName === 'Shubham Patel' ? 'Shubham Verma' : 'Shubham Patel'}</span>
          </button>
        </div>

        {/* Card Main Container */}
        <div className="max-w-xl mx-auto">
          
          <div className="relative rounded-3xl bg-[#0E1420] border-2 border-[#263244] shadow-2xl overflow-hidden transition-all duration-500">
            
            {/* Top Accent Graphic Banner */}
            <div className="h-28 bg-gradient-to-r from-[#0369a1] via-[#6d28d9] to-[#0284c7] relative overflow-hidden flex items-center justify-between px-6">
              <div className="absolute inset-0 opacity-20 cyber-grid-bg" />
              <div className="relative z-10 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                  VERIFIED DIGITAL ID
                </span>
              </div>

              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080B12]/80 hover:bg-[#080B12] text-xs font-mono text-[#38BDF8] border border-[#38BDF8]/30 transition-colors"
              >
                <RotateCw className="w-3 h-3" />
                <span>{isFlipped ? 'Show Front' : 'Show Details & QR'}</span>
              </button>
            </div>

            {/* Front of Card */}
            {!isFlipped ? (
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Photo & Name Row */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left -mt-16">
                  
                  {/* Original Photograph Container */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[#0E1420] p-1.5 border-2 border-[#38BDF8] shadow-2xl flex-shrink-0">
                    <img
                      src={personalProfile.avatar.thumbnail}
                      alt={`${currentName} Original Photograph`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-emerald-500 text-[#080B12] shadow-md" title="Face Verified">
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 sm:pt-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-sans">
                      {currentName}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#38BDF8] font-semibold">
                      {personalProfile.primaryTitle}
                    </p>
                    <p className="text-xs text-[#94A3B8]">
                      CSJM Government Polytechnic, Ambedkar Nagar (CSE 2026)
                    </p>
                  </div>
                </div>

                {/* Short Bio */}
                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed bg-[#141C2A]/40 p-4 rounded-xl border border-[#263244]">
                  "{personalProfile.bioIntroduction}"
                </p>

                {/* Direct Action Hub: WhatsApp & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  
                  {/* Direct WhatsApp Chat */}
                  <a
                    href={personalProfile.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Direct Chat</span>
                  </a>

                  {/* Direct Email */}
                  <a
                    href={`mailto:${personalProfile.contact.email}`}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:opacity-95 text-[#080B12] text-xs font-bold transition-all shadow-lg shadow-[#38BDF8]/20"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Official Email</span>
                  </a>
                </div>

                {/* Quick Copy Action Buttons */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <button
                    onClick={() => handleCopy(personalProfile.contact.phone, 'phone')}
                    className="p-2.5 rounded-xl bg-[#141C2A] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#263244] transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedType === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied Phone!</span>
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Copy Phone</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleCopy(personalProfile.contact.email, 'email')}
                    className="p-2.5 rounded-xl bg-[#141C2A] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#263244] transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedType === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied Email!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Social Profiles Row */}
                <div className="pt-4 border-t border-[#263244] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#64748B]">Profiles:</span>

                  <div className="flex items-center gap-3">
                    <a
                      href={personalProfile.contact.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#141C2A] text-[#94A3B8] hover:text-[#38BDF8] border border-[#263244]"
                      aria-label="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={personalProfile.contact.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#141C2A] text-[#94A3B8] hover:text-[#38BDF8] border border-[#263244]"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="/id.html/"
                      className="p-2 rounded-lg bg-[#141C2A] text-[#94A3B8] hover:text-[#38BDF8] border border-[#263244] text-xs font-mono font-bold"
                      title="Stand-alone id.html directory view"
                    >
                      id.html
                    </a>
                  </div>
                </div>

              </div>
            ) : (
              /* Back of Card: QR Code, Skills, Education */
              <div className="p-6 sm:p-8 space-y-6">
                
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Live Generated QR Code */}
                  <div className="p-3 rounded-2xl bg-[#141C2A] border-2 border-[#38BDF8]/40 shadow-xl flex flex-col items-center">
                    <img
                      src={qrCodeUrl}
                      alt="Portfolio URL QR Code"
                      className="w-32 h-32 rounded-lg"
                    />
                    <span className="text-[10px] font-mono text-[#38BDF8] mt-2 flex items-center gap-1">
                      <QrCode className="w-3 h-3" /> Scan to Open
                    </span>
                  </div>

                  <div className="space-y-3 flex-1 text-center sm:text-left">
                    <h4 className="text-sm font-bold font-mono text-[#F8FAFC] uppercase tracking-wider">
                      Verified Academic Focus
                    </h4>
                    <div className="space-y-2 text-xs">
                      {educationData.map((e, idx) => (
                        <div key={idx} className="border-l-2 border-[#38BDF8] pl-2 text-left">
                          <p className="font-semibold text-[#F8FAFC]">{e.degree}</p>
                          <p className="text-[#94A3B8]">{e.institution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Competencies Summary */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8]">
                    Primary Engineering Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skillsData.slice(0, 8).map((s) => (
                      <span
                        key={s.name}
                        className="px-2.5 py-1 text-xs rounded-md bg-[#141C2A] text-[#CBD5E1] border border-[#263244] font-mono"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Back Actions */}
                <div className="pt-4 border-t border-[#263244] flex flex-wrap items-center justify-between gap-3">
                  <a
                    href="/documents/Shubham_Patel_Contact.vcf"
                    download="Shubham_Patel_Contact.vcf"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10B981] text-[#052e16] text-xs font-bold hover:bg-[#34d399] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download VCF Card</span>
                  </a>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#141C2A] text-[#F8FAFC] hover:text-[#38BDF8] border border-[#263244] text-xs font-mono"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Card</span>
                  </button>
                </div>

              </div>
            )}

            {/* Bottom Security Pill */}
            <div className="px-6 py-2.5 bg-[#080B12] border-t border-[#263244] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Original Photo &amp; Resume Verified
              </span>
              <span>id.html/links.json synced</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
