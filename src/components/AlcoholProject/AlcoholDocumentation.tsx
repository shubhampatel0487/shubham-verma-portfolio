import React from 'react';
import {
  Download,
  ExternalLink,
  Lock
} from 'lucide-react';
import { GithubIcon } from '../UI/Icons';

interface AlcoholDocumentationProps {
  onDownloadReport: () => void;
}

export const AlcoholDocumentation: React.FC<AlcoholDocumentationProps> = ({ onDownloadReport }) => {
  const documents = [
    {
      id: "doc-overview",
      title: "Comprehensive Technical Project Report",
      type: "Markdown / Text Document",
      size: "14.2 KB",
      status: "Available Now",
      statusBadge: "emerald",
      description: "Complete technical write-up detailing the physical sensing principle, mathematical voltage conversion, firmware algorithms, and verification test logs.",
      onAction: onDownloadReport,
      actionText: "Download Report (.txt)"
    },
    {
      id: "doc-arch-svg",
      title: "2D System Architecture Vector",
      type: "Vector SVG Diagram",
      size: "8.5 KB",
      status: "Available Now",
      statusBadge: "emerald",
      description: "Exportable high-resolution SVG diagram representing the 5-node signal processing pipeline and voltage stages.",
      onAction: () => {
        const svgEl = document.getElementById('alcohol-architecture-svg');
        if (!svgEl) {
          alert('Please navigate to the Architecture section to download the active SVG diagram.');
          return;
        }
        const svgData = new XMLSerializer().serializeToString(svgEl);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ESP32_Alcohol_Detection_Architecture.svg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
      actionText: "Download SVG Diagram"
    },
    {
      id: "doc-schematic-cad",
      title: "Eagle / KiCAD Circuit Schematic",
      type: "CAD Project File (.kicad_sch)",
      size: "Pending",
      status: "Coming Soon",
      statusBadge: "amber",
      description: "Full printed circuit board (PCB) schematic with optoisolator protection, flyback diode ratings, and terminal block layouts.",
      actionText: "Coming Soon"
    },
    {
      id: "doc-github-repo",
      title: "Open-Source Firmware Repository",
      type: "Git Source Code",
      size: "Online",
      status: "Active Repository",
      statusBadge: "cyan",
      description: "GitHub repository containing source Arduino sketch, moving-average filter routines, and breadboard pinout documentation.",
      url: "https://github.com/shubhampatel0487/ESP32-Alcohol-Detection-Safety",
      actionText: "View on GitHub"
    }
  ];

  return (
    <section id="alcohol-docs" className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#253247] pb-4">
        <div>
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider block">
            PHASE 13 // TECHNICAL DOCUMENTATION &amp; ARTIFACTS
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-sans text-[#F8FAFC]">
            Project Documentation &amp; Artifact Hub
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-2xl bg-[#0C1220] border border-[#253247] hover:border-[#38BDF8]/40 transition-all flex flex-col justify-between space-y-4 group shadow-lg"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#64748B]">
                  {doc.type} &bull; {doc.size}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  doc.statusBadge === 'emerald'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : doc.statusBadge === 'cyan'
                    ? 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}>
                  {doc.status}
                </span>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors font-sans">
                  {doc.title}
                </h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed mt-1">
                  {doc.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#253247] flex items-center justify-between">
              {doc.onAction ? (
                <button
                  onClick={doc.onAction}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-xs font-mono font-semibold text-[#38BDF8] border border-[#253247] hover:border-[#38BDF8]/40 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{doc.actionText}</span>
                </button>
              ) : doc.url ? (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-xs font-mono font-semibold text-[#38BDF8] border border-[#253247] hover:border-[#38BDF8]/40 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>{doc.actionText}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#080B12] text-xs font-mono text-[#64748B] border border-[#253247]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{doc.actionText}</span>
                </span>
              )}

              <span className="text-[10px] font-mono text-[#64748B]">
                Academic Case Study
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
