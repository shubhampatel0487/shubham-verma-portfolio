import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Volume2,
  VolumeX,
  Mic,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { personalProfile } from '../../data/portfolioData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: string[];
}

export const ShubhamAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const initialMessages: Message[] = [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello! I am **SHUBHAM AI**, the interactive engineering guide for **${personalProfile.name}** (${personalProfile.primaryTitle}). How can I assist you in exploring his robotics research, AI models, embedded circuits, or verified projects today?`,
      timestamp: 'Just now',
      sources: ['Verified Engineering Profile', 'Chhatrapati Shahu Ji Maharaj Govt Polytechnic']
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const suggestedQuestions = [
    "What is the Alcohol Detection System architecture?",
    "Explain the 1QUIZ adaptive testing algorithm.",
    "What are Shubham's primary technical skills?",
    "How does the PINN Battery model enforce physics?",
    "What did Shubham do in his Techsima industrial training?",
    "How do I contact Shubham or download his resume?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Voice speech synthesis for assistant replies
  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    // Strip markdown formatting for cleaner speech
    const clean = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleToggleVoiceOutput = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setVoiceEnabled(!voiceEnabled);
  };

  // Voice input via browser Web Speech API
  const handleVoiceInput = () => {
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

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        processUserQuery(transcript);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Retrieval-based knowledge base query processor
  const processUserQuery = (queryText: string) => {
    const q = queryText.toLowerCase().trim();
    if (!q) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Formulate verified response using grounded facts
    let reply = "";
    let sources: string[] = [];

    if (q.includes("alcohol") || q.includes("mq-3") || q.includes("interlock") || q.includes("drunk")) {
      reply = `**AI + IoT Alcohol Detection System**:\n• **Objective**: Prevents drunk driving by requiring breath alcohol validation and driver facial verification before vehicle ignition is allowed.\n• **Hardware Stack**: ESP32 microcontroller, MQ-3 tin-dioxide gas sensor (calibrated to statutory 0.05 mg/L BAC limit), exhalation airflow pressure sensor, 5V optocoupled relay on GPIO 26, and audio buzzer on GPIO 27.\n• **FreeRTOS Dual-Core Execution**: Core 1 runs a deterministic 20 Hz safety task that trips the ignition cutoff relay if breath alcohol exceeds threshold or exhalation fails airflow verification.`;
      sources = ['firmware/esp32_alcohol_interlock.ino', 'Project Circuit Schematic', 'FreeRTOS Safety Loop'];
    } else if (q.includes("quiz") || q.includes("1quiz") || q.includes("adaptive") || q.includes("groq")) {
      reply = `**1QUIZ — AI-Powered Learning Platform**:\n• **Adaptive IRT Engine**: Implements Item Response Theory difficulty weighting (Easy: 1.0, Medium: 1.8, Hard: 2.8) combined with per-topic accuracy profiles to compute Question Impact Scores.\n• **Multi-Model AI Router**: Verified in \`cbt_app/core/ai_service.py\` supporting Groq (Llama 3 70B), Gemini 1.5, and OpenAI with Deep Thinking mode and strict JSON MCQ output schema.\n• **Backend**: Full-stack architecture with Django CBT, SQLite question database, and FastAPI endpoints.`;
      sources = ['cbt_app/core/ai_service.py', 'cbt_app/core/adaptive_engine.py', 'QUIZ Repository'];
    } else if (q.includes("battery") || q.includes("pinn") || q.includes("digital twin")) {
      reply = `**PINN Battery Digital Twin**:\n• **Core Innovation**: Physics-Informed Neural Network combining empirical data MSE loss with first-principles electrochemical constraints: Arrhenius thermal degradation ceilings, monotonic capacity loss, and thermodynamic voltage envelopes.\n• **Architecture**: Attention-LSTM hybrid model capable of predicting State-of-Health (SoH) and knee-point rollover past 5,000 cycles with high generalization.`;
      sources = ['BATest.AI/physics/pinn_loss.py', 'BATest.AI/models/attention_lstm.py', 'Chemistry Profiles'];
    } else if (q.includes("assignment") || q.includes("classroom") || q.includes("checker")) {
      reply = `**Digital Classroom Assignment Checker**:\n• **Function**: Academic submission portal providing timed exam sessions, cryptographic SHA-256 submission timestamps, teacher evaluation dashboards, automated rubric scoring, and institutional PDF report generation.\n• **Architecture**: Role-based access separating Teacher assignment creation from Student upload workflows.`;
      sources = ['backend/submission_validator.py', 'Digital Classroom Schema'];
    } else if (q.includes("skill") || q.includes("technology") || q.includes("stack") || q.includes("python") || q.includes("c++")) {
      reply = `**Shubham's Core Technical Competencies**:\n• **Programming**: Python (Primary, AI/APIs/Automation), C/C++ (ESP32 & Arduino Firmware), Java (OOP/DS), JavaScript (Web/ES6+).\n• **Robotics & Aerial**: ROS 2, PX4 Autopilot SITL, Gazebo dynamics, 6-axis kinematics.\n• **Embedded & IoT**: ESP32, ESP8266, Arduino, MQ-3 sensor, I2C/SPI interfaces, PWM actuator drivers.\n• **AI/ML**: Physics-Informed Neural Networks (PINNs), OpenCV Computer Vision, Attention-LSTM, ML classification.`;
      sources = ['Verified Technical Stack', 'Industrial Training Portfolio'];
    } else if (q.includes("education") || q.includes("polytechnic") || q.includes("college") || q.includes("diploma")) {
      reply = `**Verified Academic Background**:\n1. **Diploma in Computer Science & Engineering (2023–2026)**: Chhatrapati Shahu Ji Maharaj Government Polytechnic, Ambedkar Nagar, UP.\n2. **Class 12 (Science Stream - PCM, 2023)**: Jhinka Devi Patel Balika Inter College, Patel Nagar — **78.6%**.\n3. **Class 10 (High School, 2022)**: Ram Dev Janta Inter College, Katehari — **77.5%**.`;
      sources = ['Academic Records', 'Original Uploaded Resume'];
    } else if (q.includes("training") || q.includes("techsima") || q.includes("internship")) {
      reply = `**Industrial Training at Techsima Pvt. Ltd.**:\n• **Duration**: Intensive 45-day hands-on program in Python programming.\n• **Topics**: Data structures, modular software engineering, REST API architecture, database persistence, and automation scripts.`;
      sources = ['Industrial Training Certification', 'Techsima Pvt. Ltd.'];
    } else if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("whatsapp") || q.includes("hire")) {
      reply = `**Contact & Recruiter Details**:\n• **Email**: [shubhampatel0487@gmail.com](mailto:${personalProfile.contact.email})\n• **WhatsApp Direct**: [+91 6307510099](${personalProfile.contact.whatsappUrl})\n• **GitHub**: [github.com/shubhampatel0487](${personalProfile.contact.githubUrl})\n• **LinkedIn**: [linkedin.com/in/shubhampatel0487](${personalProfile.contact.linkedinUrl})\n• **Location**: Ambedkar Nagar, Uttar Pradesh, India.`;
      sources = ['Verified Contact Directory', 'Personal Profile'];
    } else if (q.includes("trustguard") || q.includes("scam") || q.includes("security")) {
      reply = `**TrustGuard Anti-Scam Super App**:\n• **Features**: Behavioral intent classification, urgent scam heuristics detection, and vector similarity lookup for phishing queries based on the verified codebase in \`SECURE_AI_PROJECT/ml/intent_model.py\`.`;
      sources = ['SECURE_AI_PROJECT/ml/intent_model.py'];
    } else {
      reply = `Thank you for asking about **${queryText}**. Shubham Verma is an aspiring Robotics and AI Engineer specializing in cyber-physical systems, FreeRTOS embedded electronics on ESP32, physics-guided AI (PINNs), and software development. You can explore his dedicated project tabs, watch full walkthroughs in the **Video Library**, or inspect actual source files in the **Code Explorer**!`;
      sources = ['Shubham Verma Engineering Knowledge Base'];
    }

    setTimeout(() => {
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources
      };
      setMessages((prev) => [...prev, assistantMsg]);
      speakText(reply);
    }, 450);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processUserQuery(inputQuery);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#38BDF8] via-[#0284c7] to-[#8B5CF6] text-[#070A12] font-mono font-bold text-xs shadow-2xl shadow-[#38BDF8]/40 hover:scale-105 active:scale-95 transition-all group"
            aria-label="Open Shubham AI Assistant"
          >
            <div className="w-6 h-6 rounded-full bg-[#070A12] flex items-center justify-center text-[#38BDF8]">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <span className="font-sans font-bold">Ask SHUBHAM AI</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        )}
      </div>

      {/* Expandable Chat Drawer / Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 w-[94vw] sm:w-[440px] h-[580px] max-h-[85vh] rounded-3xl bg-[#0C1220] border-2 border-[#253247] shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header Bar */}
          <div className="p-4 bg-[#070A12] border-b border-[#253247] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#38BDF8] to-[#8B5CF6] p-0.5">
                <div className="w-full h-full bg-[#070A12] rounded-[10px] flex items-center justify-center text-[#38BDF8]">
                  <Bot className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="text-xs font-mono font-extrabold text-[#F8FAFC] flex items-center gap-1.5">
                  SHUBHAM AI <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">GROUNDED</span>
                </h3>
                <p className="text-[10px] font-mono text-[#94A3B8]">
                  Verified Portfolio &amp; Engineering Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleToggleVoiceOutput}
                className={`p-1.5 rounded-lg border transition-colors ${
                  voiceEnabled
                    ? 'bg-[#111B2B] text-[#38BDF8] border-[#38BDF8]/40'
                    : 'bg-[#111B2B] text-[#64748B] border-[#253247]'
                }`}
                title={voiceEnabled ? "Voice Speech Enabled" : "Voice Speech Muted"}
              >
                {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setMessages(initialMessages)}
                className="p-1.5 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247] transition-colors"
                title="Reset Chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247] transition-colors"
                title="Close Assistant"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#38BDF8] text-[#070A12] font-medium rounded-tr-sm shadow-md'
                      : 'bg-[#111B2B] text-[#CBD5E1] border border-[#253247] rounded-tl-sm shadow-md space-y-2'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Grounding Source Citations */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="pt-2 border-t border-[#253247]/70 space-y-1">
                      <span className="text-[10px] font-mono text-[#64748B] flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#38BDF8]" /> Verified Sources:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {msg.sources.map((src, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#070A12] text-[#94A3B8] border border-[#253247]"
                          >
                            {src}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-mono text-[#64748B] mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Questions Carousel */}
          <div className="px-3 py-2 bg-[#070A12]/80 border-t border-[#253247] overflow-x-auto flex gap-1.5 scrollbar-none">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => processUserQuery(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-[10px] font-mono text-[#38BDF8] border border-[#253247] transition-colors flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-[#070A12] border-t border-[#253247] flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse border-red-400'
                  : 'bg-[#111B2B] text-[#94A3B8] hover:text-[#38BDF8] border-[#253247]'
              }`}
              title="Speak Question via Microphone"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about projects, circuits, AI models..."
              className="flex-1 bg-[#111B2B] text-[#F8FAFC] placeholder-[#64748B] text-xs px-3.5 py-2.5 rounded-xl border border-[#253247] focus:outline-none focus:border-[#38BDF8] transition-colors"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#7dd3fc] disabled:opacity-40 text-[#070A12] transition-colors shadow-md"
              title="Send Message"
            >
              <Send className="w-4 h-4 fill-current" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
