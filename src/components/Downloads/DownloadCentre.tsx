import React from 'react';
import { Download, FileText, Smartphone, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { downloadDocuments } from '../../data/portfolioData';

interface DownloadCentreProps {
  onPreviewResume: () => void;
}

export const DownloadCentre: React.FC<DownloadCentreProps> = ({ onPreviewResume }) => {
  return (
    <section id="downloads" className="py-24 relative z-10 border-t border-[#263244]/40 bg-[#080B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#141C2A] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            Official Documents
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            My Documents &amp; Downloads
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Verified curriculum vitae, contact card (VCF), and training documentation available for immediate inspection and download.
          </p>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {downloadDocuments.map((doc) => {
            const isVCF = doc.fileType === 'VCF';
            return (
              <div
                key={doc.id}
                className="p-6 sm:p-8 rounded-2xl bg-[#0E1420] border border-[#263244] hover:border-[#38BDF8]/40 transition-all shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#141C2A] border border-[#263244] flex items-center justify-center text-[#38BDF8] group-hover:scale-110 transition-transform">
                      {isVCF ? <Smartphone className="w-6 h-6 text-[#10B981]" /> : <FileText className="w-6 h-6 text-[#38BDF8]" />}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#141C2A] text-[#94A3B8] border border-[#263244]">
                        {doc.fileSize}
                      </span>
                      <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        isVCF ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30'
                      }`}>
                        {doc.fileType}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors font-sans">
                      {doc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-[#263244] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={doc.path}
                      download={doc.filename}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#38BDF8] text-[#080B12] text-xs font-bold hover:bg-[#7dd3fc] transition-all shadow-md shadow-[#38BDF8]/10"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </a>

                    {!isVCF && (
                      <button
                        onClick={onPreviewResume}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#141C2A] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] border border-[#263244] text-xs font-semibold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-[#64748B] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified File
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Guarantee Notice */}
        <div className="mt-12 p-4 rounded-xl bg-[#141C2A]/40 border border-[#263244] text-center text-xs text-[#94A3B8] flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>The original uploaded resume remains available as an unchanged, permanent downloadable record.</span>
        </div>

      </div>
    </section>
  );
};

