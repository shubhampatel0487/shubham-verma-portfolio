import React, { useState } from 'react';
import {
  FileCode,
  FolderOpen,
  Copy,
  Check,
  Terminal,
  Info,
  CheckCircle2,
  Shield,
  Lock
} from 'lucide-react';
import { projectCodeCollections, CodeFile } from '../../data/projectCodeData';

export const CodeExplorer: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('alcohol-detection');
  const activeCollection = projectCodeCollections.find(c => c.projectId === selectedProjectId) || projectCodeCollections[0];
  const [activeFile, setActiveFile] = useState<CodeFile>(activeCollection.files[0]);
  const [copied, setCopied] = useState<boolean>(false);

  // When project changes, reset active file to first in list
  const handleSelectProject = (projId: string) => {
    setSelectedProjectId(projId);
    const col = projectCodeCollections.find(c => c.projectId === projId);
    if (col && col.files.length > 0) {
      setActiveFile(col.files[0]);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const codeLines = activeFile.code.split('\n');

  return (
    <section id="code-explorer" className="py-24 relative z-10 border-t border-[#253247]/60 bg-[#070A12] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] px-3.5 py-1.5 rounded-full border border-[#253247] inline-flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
            Demonstration Code Exhibition
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Demonstration Code Viewer
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#94A3B8] leading-relaxed">
            Examine simplified conceptual demonstration snippets illustrating firmware sampling loops, adaptive engines, and mathematical PINN formulations without exposing private production code.
          </p>
        </div>

        {/* Global Mandatory Demonstration Disclaimer Banner */}
        <div className="max-w-4xl mx-auto mb-8 p-3.5 sm:p-4 rounded-2xl bg-[#0C1425] border border-cyan-500/30 text-xs text-slate-300 flex items-start gap-3 shadow-lg">
          <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-white block font-mono text-[11px] uppercase tracking-wider text-cyan-400">
              Demonstration Code Notice &bull; IP Protection
            </span>
            <p className="leading-relaxed text-slate-300">
              This is a simplified demonstration snippet created to explain the project concept. It is not the original production source code and does not expose the private implementation.
            </p>
          </div>
        </div>

        {/* Project Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {projectCodeCollections.map((col) => (
            <button
              key={col.projectId}
              onClick={() => handleSelectProject(col.projectId)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                selectedProjectId === col.projectId
                  ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow-md shadow-[#38BDF8]/20 scale-105'
                  : 'bg-[#111B2B] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#162338] border border-[#253247]'
              }`}
            >
              {col.projectTitle}
            </button>
          ))}
        </div>

        {/* IDE-Style Two-Column Container */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#0C1220] border-2 border-[#253247] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Panel: File Tree Explorer */}
          <div className="lg:w-72 bg-[#0C1220] border-b lg:border-b-0 lg:border-r border-[#253247] p-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] pb-2 border-b border-[#253247]">
                <span className="font-bold flex items-center gap-1.5 text-[#F8FAFC]">
                  <FolderOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
                  DEMO MODULES
                </span>
                <span className="text-[10px] text-[#64748B]">{activeCollection.files.length} Snippets</span>
              </div>

              {/* File list */}
              <div className="space-y-1">
                {activeCollection.files.map((file) => {
                  const isCurrent = activeFile.path === file.path;
                  return (
                    <button
                      key={file.path}
                      onClick={() => setActiveFile(file)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#162338] text-[#38BDF8] border border-[#38BDF8]/30 font-semibold'
                          : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111B2B]'
                      }`}
                    >
                      <FileCode className={`w-3.5 h-3.5 flex-shrink-0 ${isCurrent ? 'text-[#38BDF8]' : 'text-[#64748B]'}`} />
                      <span className="truncate">{file.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language & Sanitize Tag */}
            <div className="pt-4 mt-4 border-t border-[#253247] text-[10px] font-mono text-[#64748B] space-y-1">
              <p className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3 h-3" /> Safe Public Demonstration
              </p>
              <p className="flex items-center gap-1 text-amber-400">
                <Lock className="w-3 h-3" /> Zero Private Credentials
              </p>
            </div>
          </div>

          {/* Right Panel: Code Viewer */}
          <div className="flex-1 flex flex-col bg-[#070A12] min-w-0">
            
            {/* File Header Bar */}
            <div className="px-4 sm:px-6 py-3 bg-[#0C1220] border-b border-[#253247] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <FileCode className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <span className="font-mono text-xs font-bold text-[#F8FAFC] truncate">{activeFile.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111B2B] text-[#8B5CF6] border border-[#253247] uppercase font-bold">
                  {activeFile.language}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase font-bold tracking-wider">
                  DEMO CODE &bull; REPRESENTATIONAL EXAMPLE
                </span>
              </div>

              {/* Copy Demo Code Action Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="px-3.5 py-1.5 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-xs font-mono text-[#38BDF8] hover:text-white border border-[#253247] hover:border-[#38BDF8]/40 flex items-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#38BDF8] cursor-pointer"
                  title="Copy displayed demonstration code snippet"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Demo!' : 'Copy Demo Code'}</span>
                </button>
              </div>
            </div>

            {/* Code Body with Line Numbers */}
            <div className="p-4 overflow-x-auto max-h-[460px] font-mono text-xs leading-relaxed scrollbar-thin">
              <pre className="flex">
                {/* Line numbers */}
                <div className="select-none text-[#475569] pr-4 border-r border-[#253247]/60 text-right w-10 flex-shrink-0">
                  {codeLines.map((_, idx) => (
                    <div key={idx}>{idx + 1}</div>
                  ))}
                </div>

                {/* Actual code content */}
                <div className="pl-4 text-[#CBD5E1] whitespace-pre min-w-0">
                  {codeLines.map((line, idx) => (
                    <div key={idx} className="hover:bg-[#111B2B]/40">
                      {line}
                    </div>
                  ))}
                </div>
              </pre>
            </div>

            {/* Explanation & Function Breakdown Panel */}
            <div className="p-5 bg-[#0C1220] border-t border-[#253247] space-y-4">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] font-bold flex items-center gap-2">
                  <Info className="w-3.5 h-3.5" /> Conceptual Context &bull; {activeCollection.projectTitle}
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                  {activeFile.description}
                </p>
              </div>

              {/* Function Table */}
              {activeFile.keyFunctions && activeFile.keyFunctions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-[#64748B] uppercase font-bold">Key Method Signatures:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                    {activeFile.keyFunctions.map((fn, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-[#111B2B] border border-[#253247] space-y-1">
                        <span className="text-[#38BDF8] font-bold block truncate">{fn.name}</span>
                        <p className="text-[11px] text-[#94A3B8] font-sans">{fn.purpose}</p>
                        <div className="text-[10px] text-[#64748B] flex justify-between pt-1">
                          <span>In: {fn.inputs}</span>
                          <span>Out: {fn.outputs}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dependencies Pill */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
                <span className="text-[#64748B]">Dependencies:</span>
                {activeFile.dependencies.map((dep, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#111B2B] text-[#8B5CF6] border border-[#253247]">
                    {dep}
                  </span>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
