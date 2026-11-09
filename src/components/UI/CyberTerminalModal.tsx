import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft, Maximize2, Minimize2 } from 'lucide-react';
import { personalProfile, skillsData, projectsData, educationData } from '../../data/portfolioData';
import { soundFX } from '../../utils/audio';

interface CyberTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject?: (projectId: string) => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const CyberTerminalModal: React.FC<CyberTerminalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'sysinfo',
      output: (
        <div className="text-xs space-y-1 text-[#94A3B8]">
          <p className="text-[#38BDF8] font-bold">
            SHUBHAM PATEL // ROBOTICS &amp; AI CLI INTERFACE [v1.0.4]
          </p>
          <p>Target: Chhatrapati Shahu Ji Maharaj Govt Polytechnic (CSE 2026)</p>
          <p>Type <span className="text-[#38BDF8] font-bold">help</span> to view available diagnostics commands.</p>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      soundFX.playBeep(900, 0.05);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    soundFX.playClick();
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    let output: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs py-1">
            <div><span className="text-[#38BDF8] font-mono">about</span> — Engineering philosophy &amp; bio</div>
            <div><span className="text-[#38BDF8] font-mono">skills</span> — Categorized technical competencies</div>
            <div><span className="text-[#38BDF8] font-mono">projects</span> — List 5 engineering prototypes</div>
            <div><span className="text-[#38BDF8] font-mono">pinn</span> — Physics-Informed ML Battery Twin</div>
            <div><span className="text-[#38BDF8] font-mono">drone</span> — ROS 2 / PX4 SITL simulation</div>
            <div><span className="text-[#38BDF8] font-mono">edu</span> — Verified academic history</div>
            <div><span className="text-[#38BDF8] font-mono">contact</span> — Email, GitHub &amp; LinkedIn</div>
            <div><span className="text-[#38BDF8] font-mono">clear</span> — Flush terminal output</div>
            <div><span className="text-[#38BDF8] font-mono">exit</span> — Close terminal</div>
          </div>
        );
        break;

      case 'about':
      case 'bio':
        output = (
          <div className="space-y-1.5 text-xs text-[#CBD5E1]">
            <p className="text-[#38BDF8] font-bold">{personalProfile.name} — {personalProfile.primaryTitle}</p>
            <p className="italic">"{personalProfile.heroTagline}"</p>
            <p>{personalProfile.bioIntroduction}</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-[#38BDF8] font-bold">CORE TECHNICAL COMPETENCIES:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#94A3B8]">
              {skillsData.slice(0, 10).map((s) => (
                <div key={s.name} className="flex justify-between border-b border-[#263244]/40 pb-0.5">
                  <span className="text-[#F8FAFC]">{s.name}</span>
                  <span className="text-[10px] text-[#38BDF8]">{s.level}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#64748B]">Type 'projects' to see practical applied implementations.</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            <p className="text-[#8B5CF6] font-bold">FEATURED ENGINEERING PROTOTYPES:</p>
            {projectsData.map((p, idx) => (
              <div key={p.id} className="p-2 rounded bg-[#141C2A]/60 border border-[#263244]">
                <div className="flex justify-between">
                  <span className="text-[#38BDF8] font-semibold">0{idx + 1}. {p.title}</span>
                  <span className="text-[10px] text-amber-400">[{p.status}]</span>
                </div>
                <p className="text-[#94A3B8] text-[11px] mt-0.5">{p.overview}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'pinn':
        output = (
          <div className="p-2.5 rounded bg-[#141C2A] border border-[#38BDF8]/40 text-xs space-y-1">
            <p className="text-[#38BDF8] font-bold">PINN Battery Digital Twin</p>
            <p className="text-[#CBD5E1]">Physics-informed loss constraint: L = L_data + λ * L_physics</p>
            <p className="text-[#94A3B8]">Eliminates non-physical SoC/SoH drift under extreme temperature stresses.</p>
          </div>
        );
        break;

      case 'drone':
        output = (
          <div className="p-2.5 rounded bg-[#141C2A] border border-[#8B5CF6]/40 text-xs space-y-1">
            <p className="text-[#8B5CF6] font-bold">ROS 2 Aerial Robotics Stack</p>
            <p className="text-[#CBD5E1]">PX4 Autopilot SITL + Gazebo Physics + RViz 3D Telemetry Passthrough</p>
            <p className="text-[#94A3B8]">DDS middleware publishing odometry at 100Hz with custom Python control nodes.</p>
          </div>
        );
        break;

      case 'edu':
      case 'education':
        output = (
          <div className="space-y-2 text-xs">
            {educationData.map((e, idx) => (
              <div key={idx} className="border-l-2 border-[#38BDF8] pl-2">
                <p className="text-[#F8FAFC] font-semibold">{e.degree} ({e.period})</p>
                <p className="text-[#94A3B8]">{e.institution}</p>
                {e.score && <p className="text-emerald-400 font-mono text-[11px]">Score: {e.score}</p>}
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs text-[#CBD5E1]">
            <p>Email: <span className="text-[#38BDF8]">{personalProfile.contact.email}</span></p>
            <p>GitHub: <a href={personalProfile.contact.githubUrl} target="_blank" rel="noopener noreferrer" className="underline text-[#38BDF8]">{personalProfile.contact.githubUrl}</a></p>
            <p>LinkedIn: <a href={personalProfile.contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="underline text-[#8B5CF6]">{personalProfile.contact.linkedinUrl}</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        output = (
          <p className="text-xs text-red-400">
            command not found: '{trimmed}'. Type <span className="text-[#38BDF8] underline">help</span> for valid commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        command: cmd,
        output,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx < commandHistory.length) {
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#080B12]/85 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full ${
          isMaximized ? 'max-w-6xl h-[85vh]' : 'max-w-2xl h-[520px]'
        } bg-[#0A0E18] border-2 border-[#263244] rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono text-[#F8FAFC] transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0E1420] border-b border-[#263244] select-none">
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
            <TerminalIcon className="w-4 h-4 text-[#38BDF8]" />
            <span className="font-bold text-[#F8FAFC]">shubham@robotics-core: ~</span>
            <span className="text-[10px] text-[#64748B] hidden sm:inline">[bash 5.2]</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#141C2A] transition-colors"
              aria-label="Toggle Fullscreen"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-[#94A3B8] hover:text-red-400 hover:bg-[#141C2A] transition-colors"
              aria-label="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((h) => (
            <div key={h.id} className="space-y-1">
              <div className="flex items-center gap-2 text-[#38BDF8]">
                <span>guest@patel-core:~$</span>
                <span className="text-[#F8FAFC] font-semibold">{h.command}</span>
              </div>
              <div className="pl-4">{h.output}</div>
            </div>
          ))}

          {/* Current Input Prompt */}
          <div className="flex items-center gap-2 text-[#38BDF8] pt-1">
            <span>guest@patel-core:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-[#F8FAFC] outline-none font-mono text-xs border-none p-0 focus:ring-0"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <CornerDownLeft className="w-3 h-3 text-[#64748B]" />
          </div>
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Footer Quick Links */}
        <div className="px-4 py-2 bg-[#0E1420]/70 border-t border-[#263244] flex items-center justify-between text-[11px] text-[#64748B]">
          <div className="flex items-center gap-2">
            <span>Quick:</span>
            {['help', 'skills', 'projects', 'pinn', 'drone'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-1.5 py-0.5 rounded bg-[#141C2A] text-[#38BDF8] hover:text-[#F8FAFC] border border-[#263244]"
              >
                {cmd}
              </button>
            ))}
          </div>
          <span className="hidden sm:inline">ESC or type 'exit' to quit</span>
        </div>
      </div>
    </div>
  );
};
