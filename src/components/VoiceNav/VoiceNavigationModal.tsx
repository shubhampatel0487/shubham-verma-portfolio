import React, { useState } from 'react';
import {
  Mic,
  X,
  Navigation,
  Command
} from 'lucide-react';

interface VoiceNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenTerminal?: () => void;
  onOpenRecruiterMode?: () => void;
}

export const VoiceNavigationModal: React.FC<VoiceNavigationModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenTerminal,
  onOpenRecruiterMode,
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('Click microphone and speak a command.');
  const [status, setStatus] = useState<'idle' | 'listening' | 'success' | 'error'>('idle');

  const voiceCommands = [
    { cmd: "Open Robotics Lab", action: "Navigate to 6-Axis Robotic Arm Lab" },
    { cmd: "Show Alcohol Detection Project", action: "Jump to AI + IoT Alcohol Safety Showcase" },
    { cmd: "Show Video Library", action: "Stream project walkthrough videos" },
    { cmd: "Open Code Explorer", action: "Inspect repository source files" },
    { cmd: "Open Diagrams", action: "View circuit schematics and pinouts" },
    { cmd: "Open Resume", action: "Launch verified resume PDF modal" },
    { cmd: "Open Terminal", action: "Launch cybernetic CLI shell" },
    { cmd: "Open Recruiter Mode", action: "Open executive hiring overview" },
    { cmd: "Open Contact Page", action: "Scroll to WhatsApp and email contact form" },
    { cmd: "Show GitHub", action: "Open github.com/shubhampatel0487" }
  ];

  const executeVoiceCommand = (commandText: string) => {
    const text = commandText.toLowerCase().trim();
    setTranscript(commandText);

    if (text.includes("robotics") || text.includes("arm") || text.includes("drone") || text.includes("lab")) {
      document.getElementById("engineering-lab")?.scrollIntoView({ behavior: "smooth" });
      setStatus("success");
      setFeedback("Navigating to Engineering Lab...");
      setTimeout(onClose, 1400);
    } else if (text.includes("alcohol") || text.includes("interlock") || text.includes("showcase")) {
      document.getElementById("featured-showcase")?.scrollIntoView({ behavior: "smooth" });
      setStatus("success");
      setFeedback("Opening Alcohol Detection Showcase...");
      setTimeout(onClose, 1400);
    } else if (text.includes("video") || text.includes("library") || text.includes("watch")) {
      document.getElementById("video-library")?.scrollIntoView({ behavior: "smooth" });
      setStatus("success");
      setFeedback("Opening Project Video Library...");
      setTimeout(onClose, 1400);
    } else if (text.includes("code") || text.includes("explorer") || text.includes("firmware") || text.includes("source")) {
      document.getElementById("code-explorer")?.scrollIntoView({ behavior: "smooth" });
      setStatus("success");
      setFeedback("Opening Source Code Explorer...");
      setTimeout(onClose, 1400);
    } else if (text.includes("diagram") || text.includes("circuit") || text.includes("pinout") || text.includes("schematic")) {
      document.getElementById("diagrams")?.scrollIntoView({ behavior: "smooth" });
      setStatus("success");
      setFeedback("Opening Technical Diagram Viewer...");
      setTimeout(onClose, 1400);
    } else if (text.includes("resume") || text.includes("cv") || text.includes("download")) {
      setStatus("success");
      setFeedback("Launching Verified Resume Modal...");
      onOpenResume();
      setTimeout(onClose, 800);
    } else if (text.includes("terminal") || text.includes("cli") || text.includes("shell")) {
      setStatus("success");
      setFeedback("Launching Cybernetic Terminal...");
      if (onOpenTerminal) onOpenTerminal();
      setTimeout(onClose, 800);
    } else if (text.includes("recruiter") || text.includes("hiring")) {
      setStatus("success");
      setFeedback("Opening Recruiter Mode...");
      if (onOpenRecruiterMode) onOpenRecruiterMode();
      setTimeout(onClose, 800);
    } else if (text.includes("contact") || text.includes("email") || text.includes("message") || text.includes("whatsapp")) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      setStatus("success");
      setFeedback("Scrolling to Contact section...");
      setTimeout(onClose, 1400);
    } else if (text.includes("github") || text.includes("repo")) {
      window.open("https://github.com/shubhampatel0487", "_blank");
      setStatus("success");
      setFeedback("Opening GitHub in a new tab...");
      setTimeout(onClose, 1400);
    } else {
      setStatus("error");
      setFeedback(`Command not recognized: "${commandText}". Please try one of the commands below.`);
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Brave.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setStatus("listening");
        setFeedback("Listening... Speak your command clearly.");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setStatus("error");
        setFeedback("Microphone capture timed out or permission denied.");
      };

      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript;
        executeVoiceCommand(spoken);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A12]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0C1220] border-2 border-[#253247] shadow-2xl overflow-hidden p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#253247]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#111B2B] text-[#38BDF8] border border-[#253247]">
              <Command className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F8FAFC] font-sans">Voice Navigation Assistant</h3>
              <p className="text-[11px] font-mono text-[#94A3B8]">Hands-free audio command controller</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Central Audio Microphone Visualizer */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <button
            onClick={startListening}
            className={`relative p-6 rounded-full border-2 transition-all duration-300 ${
              isListening
                ? 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-xl shadow-rose-500/30 scale-110'
                : 'bg-[#111B2B] border-[#38BDF8] text-[#38BDF8] hover:bg-[#162338] hover:scale-105'
            }`}
          >
            {isListening && (
              <span className="absolute inset-0 rounded-full bg-rose-500/30 animate-ping" />
            )}
            <Mic className="w-8 h-8 relative z-10" />
          </button>

          <div className="text-center space-y-1">
            <p className="text-xs font-mono font-bold text-[#F8FAFC]">
              {isListening ? 'LISTENING NOW...' : 'CLICK MICROPHONE TO SPEAK'}
            </p>
            <p className={`text-xs font-mono ${
              status === 'success' ? 'text-emerald-400' : status === 'error' ? 'text-rose-400' : 'text-[#94A3B8]'
            }`}>
              {feedback}
            </p>
            {transcript && (
              <p className="text-xs font-mono text-[#38BDF8] bg-[#111B2B] px-3 py-1 rounded-full border border-[#253247] inline-block">
                Captured: "{transcript}"
              </p>
            )}
          </div>
        </div>

        {/* Available Voice Commands Reference */}
        <div className="space-y-2 border-t border-[#253247] pt-4">
          <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider block">
            Suggested Audio Commands (Click any to test)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {voiceCommands.map((item, idx) => (
              <button
                key={idx}
                onClick={() => executeVoiceCommand(item.cmd)}
                className="p-2.5 rounded-xl bg-[#111B2B] hover:bg-[#162338] border border-[#253247] text-left transition-colors flex items-center justify-between group"
              >
                <div className="truncate">
                  <p className="text-xs font-mono font-bold text-[#CBD5E1] group-hover:text-[#38BDF8] truncate">
                    "{item.cmd}"
                  </p>
                  <p className="text-[10px] text-[#64748B] truncate">{item.action}</p>
                </div>
                <Navigation className="w-3 h-3 text-[#64748B] group-hover:text-[#38BDF8] flex-shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
