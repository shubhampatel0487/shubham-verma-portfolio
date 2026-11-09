import React, { useEffect } from 'react';
import { X, Download, FileText, CheckCircle, GraduationCap, Code2, Sparkles } from 'lucide-react';
import { personalProfile, educationData, projectsData } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#080B12]/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#0E1420] border border-[#263244] rounded-2xl shadow-2xl overflow-hidden my-6 text-[#F8FAFC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#263244] bg-[#0A0F1A]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="resume-modal-title" className="text-base sm:text-lg font-bold font-sans">
                Official Curriculum Vitae Preview
              </h2>
              <p className="text-xs text-[#94A3B8] font-mono">
                {personalProfile.resume.filename} • Verified Academic Profile
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={personalProfile.resume.path}
              download={personalProfile.resume.filename}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#38BDF8] text-[#080B12] text-xs font-semibold hover:bg-[#7dd3fc] transition-colors shadow-lg shadow-[#38BDF8]/10"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#141C2A] transition-colors"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto bg-[#080B12]/40 text-sm">
          {/* Resume Header */}
          <div className="border-b border-[#263244] pb-5">
            <h1 className="text-2xl font-bold tracking-tight text-[#F8FAFC]">
              {personalProfile.name.toUpperCase()}
            </h1>
            <p className="text-sm font-semibold text-[#38BDF8] mt-0.5 tracking-wide uppercase font-mono">
              {personalProfile.primaryTitle}
            </p>
            <p className="text-xs text-[#94A3B8] mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
              <span>{personalProfile.location}</span>
              <span>•</span>
              <span>{personalProfile.contact.email}</span>
              <span>•</span>
              <a href={personalProfile.contact.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#38BDF8] underline">
                GitHub
              </a>
              <span>•</span>
              <a href={personalProfile.contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#38BDF8] underline">
                LinkedIn
              </a>
            </p>
          </div>

          {/* Professional Introduction */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-[#38BDF8] uppercase mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Professional Summary
            </h3>
            <p className="text-[#CBD5E1] text-xs sm:text-sm leading-relaxed">
              {personalProfile.bioIntroduction}
            </p>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-[#38BDF8] uppercase mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> Education History
            </h3>
            <div className="space-y-3">
              {educationData.map((edu, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#141C2A]/60 border border-[#263244]/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-semibold text-xs sm:text-sm text-[#F8FAFC]">
                      {edu.degree}
                    </span>
                    <span className="text-xs font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded border border-[#38BDF8]/20 w-fit">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    {edu.institution}, {edu.location}
                  </p>
                  {edu.score && (
                    <p className="text-xs font-mono text-emerald-400 mt-1">
                      Academic Score: <strong>{edu.score}</strong>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical Competencies */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-[#38BDF8] uppercase mb-2 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> Technical Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-[#141C2A]/40 border border-[#263244]">
                <strong className="text-[#38BDF8]">Languages:</strong> Python, C/C++, JavaScript, HTML5, CSS3
              </div>
              <div className="p-3 rounded-lg bg-[#141C2A]/40 border border-[#263244]">
                <strong className="text-[#8B5CF6]">AI &amp; Robotics:</strong> PINNs, ROS 2, Gazebo, Machine Learning, Computer Vision
              </div>
              <div className="p-3 rounded-lg bg-[#141C2A]/40 border border-[#263244]">
                <strong className="text-emerald-400">Embedded Systems:</strong> Arduino, ESP32, ESP8266, Sensors, UART/I2C/SPI
              </div>
              <div className="p-3 rounded-lg bg-[#141C2A]/40 border border-[#263244]">
                <strong className="text-amber-400">Backend &amp; Tools:</strong> Django REST Framework, Flask, Git, Linux, Docker
              </div>
            </div>
          </div>

          {/* Featured Projects Summary */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-[#38BDF8] uppercase mb-2">
              Key Engineering Projects
            </h3>
            <div className="space-y-2">
              {projectsData.map((proj) => (
                <div key={proj.id} className="p-3 rounded-lg bg-[#141C2A]/40 border border-[#263244] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#F8FAFC]">{proj.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#263244] text-[#94A3B8]">
                      {proj.status}
                    </span>
                  </div>
                  <p className="text-[#94A3B8] mt-1 line-clamp-2">{proj.overview}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Action */}
        <div className="p-4 px-6 bg-[#0A0F1A] border-t border-[#263244] flex items-center justify-between">
          <span className="text-xs text-[#64748B] flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            100% verified academic profile — No fabricated experience
          </span>
          <a
            href={personalProfile.resume.path}
            download={personalProfile.resume.filename}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#38BDF8] text-[#080B12] text-xs font-bold hover:bg-[#7dd3fc] transition-colors"
          >
            <Download className="w-4 h-4" /> Download PDF Resume
          </a>
        </div>
      </div>
    </div>
  );
};
