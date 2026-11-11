import React, { useState } from 'react';
import {
  Compass,
  Target,
  Lightbulb,
  GraduationCap,
  CheckCircle2,
  Cpu,
  Code2,
  Bot,
  Brain,
  Shield,
  Layers,
  Sparkles,
  UserCheck,
  MapPin,
  School,
  ArrowRight,
  Activity,
  ShieldCheck,
  Sliders,
  Check,
  Terminal,
  FileText,
  Rocket
} from 'lucide-react';
import { personalProfile } from '../../data/portfolioData';

type StoryTabType = 'foundation' | 'hardware_ai' | 'robotics' | 'strategic_vision';

export const About: React.FC = () => {
  const [activeStoryTab, setActiveStoryTab] = useState<StoryTabType>('foundation');
  const [selectedAxiomId, setSelectedAxiomId] = useState<string>('axiom-first-principles');

  // Display Name sync with localStorage
  const displayName = typeof window !== 'undefined'
    ? localStorage.getItem('shubham_display_name') || personalProfile.name
    : personalProfile.name;

  const philosophyAxioms = [
    {
      id: "axiom-first-principles",
      axiomNum: "AXIOM 01",
      title: "First Principles Thinking",
      tagline: "Physics & Fundamental Math Over Black-Box Abstractions",
      icon: Lightbulb,
      color: "cyan",
      borderColor: "border-cyan-500/40",
      accentBg: "bg-cyan-500/10",
      textColor: "text-cyan-400",
      glowColor: "shadow-cyan-500/20",
      lawFormula: "V_out = V_cc · [ R_L / (R_s + R_L) ]",
      domain: "Underlying Physics & Discrete Mathematics",
      thesis: "Never treat hardware or neural networks as black boxes. Deconstruct every system down to underlying physics, discrete mathematics, and thermodynamic constraints before writing a single line of software.",
      appliedEvidence: "In the Alcohol Detection System, rather than accepting arbitrary analog reads, derived the SnO2 tin-dioxide surface oxidation curve and calibrated a precision 10kΩ load resistor against thermal drift.",
      keyTakeaway: "Break complex problems into undeniable baseline truths; synthesize solutions from there."
    },
    {
      id: "axiom-hw-sw-synergy",
      axiomNum: "AXIOM 02",
      title: "Hardware-Software Co-Design",
      tagline: "Microsecond Latency, Jitter & Real-Time RTOS Deadlines",
      icon: Cpu,
      color: "purple",
      borderColor: "border-purple-500/40",
      accentBg: "bg-purple-500/10",
      textColor: "text-purple-400",
      glowColor: "shadow-purple-500/20",
      lawFormula: "T_loop = t_sample + t_filter + t_actuate < 2.5ms",
      domain: "Silicon Limits & Deterministic Concurrency",
      thesis: "True autonomous intelligence is bottlenecked by physical constraints: sensor conversion delay, bus serialization overhead, and RTOS context switching. Software must respect silicon limits.",
      appliedEvidence: "Partitioned ESP32 Xtensa dual cores: Core 0 dedicated exclusively to 100kS/s ADC sampling and moving-average DSP, while Core 1 executes FreeRTOS safety interlock state machines and OLED updates.",
      keyTakeaway: "Architect code around memory hierarchies, hardware interrupts, and electrical isolation."
    },
    {
      id: "axiom-empirical-testing",
      axiomNum: "AXIOM 03",
      title: "Methodical Empirical Validation",
      tagline: "Reproducible Physics Simulation & Telemetry Over Guesses",
      icon: Activity,
      color: "emerald",
      borderColor: "border-emerald-500/40",
      accentBg: "bg-emerald-500/10",
      textColor: "text-emerald-400",
      glowColor: "shadow-emerald-500/20",
      lawFormula: "EKF2: x̂_k = x̂_k- + K_k (z_k - H_k x̂_k-)",
      domain: "Telemetry Logs & Physics-Engine SITL",
      thesis: "Assumptions are hazards in cyber-physical robotics. Every hypothesis must be validated across high-fidelity SITL (Software-in-the-Loop) simulations, physical bench oscilloscopes, and logged telemetry.",
      appliedEvidence: "Validated PX4 drone flight dynamics and waypoint splines across 50+ Gazebo SITL simulation flight hours before hardware arming, logging IMU vibration spectrums and DShot motor RPMs.",
      keyTakeaway: "If it is not measured with reproducible instrumentation, it does not exist."
    },
    {
      id: "axiom-radical-rigor",
      axiomNum: "AXIOM 04",
      title: "Radical Transparency & Rigor",
      tagline: "Honest Failure-Mode Analysis, Zero Marketing Hype",
      icon: ShieldCheck,
      color: "amber",
      borderColor: "border-amber-500/40",
      accentBg: "bg-amber-500/10",
      textColor: "text-amber-400",
      glowColor: "shadow-amber-500/20",
      lawFormula: "Margin of Safety (MoS) = [ P_fail / P_applied ] - 1 > 1.5",
      domain: "Safety-Critical Design & Fail-Safe Interlocks",
      thesis: "Genuine engineering maturity is demonstrated through honest assessment of failure modes, edge-case handling, and rigorous documentation rather than inflated buzzword claims.",
      appliedEvidence: "Documented the exact 3-minute warm-up requirement for SnO2 sensors, built an explicit broken-wire detection circuit, and provided full schematic transparency with galvanic optocoupler barriers.",
      keyTakeaway: "Engineering integrity builds trustworthy autonomous systems that never fail unexpectedly."
    }
  ];

  const activeAxiom = philosophyAxioms.find(a => a.id === selectedAxiomId) || philosophyAxioms[0];

  const disciplineChain = [
    {
      step: "01",
      name: "Software Architecture",
      icon: Code2,
      desc: "Python 3 OOP, C/C++, Data Structures & Memory Optimization",
      color: "cyan",
      borderColor: "border-cyan-500/30",
      textColor: "text-cyan-400",
      badge: "Compute Layer"
    },
    {
      step: "02",
      name: "Embedded Firmware",
      icon: Cpu,
      desc: "ESP32 Dual-Core, FreeRTOS Tasks, ADC Moving-Average Filters & Opto Relays",
      color: "purple",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-400",
      badge: "Real-Time I/O"
    },
    {
      step: "03",
      name: "Physics-Guided AI",
      icon: Brain,
      desc: "Computer Vision (OpenCV), Loss Gradients & Physics-Informed ML (PINNs)",
      color: "emerald",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400",
      badge: "Inference Engine"
    },
    {
      step: "04",
      name: "Autonomous Robotics",
      icon: Bot,
      desc: "ROS 2 Humble DDS, PX4 Drone SITL Telemetry & 6-DOF Manipulator Kinematics",
      color: "amber",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400",
      badge: "Kinematics & Motion"
    },
    {
      step: "05",
      name: "Cyber-Physical Systems",
      icon: Shield,
      desc: "Deterministic Interlocks, Fail-Safe Automotive Relays & Resilient Edge Nodes",
      color: "blue",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
      badge: "Safety Closed-Loop"
    }
  ];

  const storyPillars = {
    foundation: {
      title: "Core Computer Science & Discrete Foundations",
      subtitle: "Academic Rigor Meets Systems Engineering",
      icon: School,
      paragraph1: personalProfile.fullBio.paragraph1,
      keyHighlights: [
        "Final year CS Diploma scholar at CSJM Government Polytechnic (BTEUP Board, 2023–2026).",
        "Rigorous foundation in computer architecture, microprocessors (8085/ARM), memory hierarchies, and data structures.",
        "Passionate conviction that true engineering mastery begins at binary logic and asymptotic efficiency before adopting high-level libraries."
      ],
      milestone: "Class 12th PCM: 78.6% Distinction (UP Board) with strong mathematics background"
    },
    hardware_ai: {
      title: "Embedded Hardware & Physics-Guided AI",
      subtitle: "Bridging Microcontroller Firmware with Intelligent Vision",
      icon: Cpu,
      paragraph1: personalProfile.fullBio.paragraph2,
      keyHighlights: [
        "Design and bench verification of ESP32 dual-core real-time firmware under FreeRTOS.",
        "Analog sensor noise reduction using 50-sample moving average digital filtering on 12-bit ADC.",
        "Practical AI integration: Haar-cascade face recognition for vehicle driver verification and PINN battery modeling."
      ],
      milestone: "Constructed 5+ fully functional benchtop physical electronics & IoT prototypes"
    },
    robotics: {
      title: "Autonomous Robotics & Industrial Software",
      subtitle: "ROS 2 Middleware, Flight Physics & Applied Python",
      icon: Bot,
      paragraph1: personalProfile.fullBio.paragraph3,
      keyHighlights: [
        "Completed intensive 45-day software engineering internship at Techsima Technologies (Python OOP & Systems).",
        "Applied study in ROS 2 Humble DDS zero-copy publish-subscribe topics and multi-node architectures.",
        "6-DOF robotic manipulator forward/inverse kinematics modeling and PX4 drone SITL flight telemetry in Gazebo."
      ],
      milestone: "Graduated Techsima 45-Day Training with Grade 'A' Industrial Evaluation"
    },
    strategic_vision: {
      title: "Strategic Vision & 2026–2028 Engineering Roadmap",
      subtitle: "Architecting Next-Generation Autonomous Systems",
      icon: Rocket,
      paragraph1: "My long-term technical objective is to pioneer reliable cyber-physical systems where advanced artificial intelligence operates directly within hard real-time hardware constraints. Rather than disconnected cloud AI, I am building edge intelligence capable of perceiving, planning, and actuating in unpredictable physical environments.",
      keyHighlights: [
        "Phase 1 (2026): Complete CS Diploma with top distinction; author production-grade ROS 2 autonomous drone packages and publish embedded hardware benchmarks.",
        "Phase 2 (2026–2027): Advanced Degree in Robotics & AI Engineering; specialize in visual-inertial odometry (VIO), EKF sensor fusion, and micro-controller Edge-AI accelerators.",
        "Phase 3 (2027–2028): Lead the development of safety-critical autonomous aerial/ground robots and predictive industrial digital twins with deterministic fail-safes."
      ],
      milestone: "Committed to open-source reproducible robotics code and zero-hype technical transparency"
    }
  };

  const activePillar = storyPillars[activeStoryTab];

  return (
    <section id="about" className="py-20 sm:py-28 relative z-10 border-t border-[#253247]/60 bg-[#070D18]/95 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] border border-[#38BDF8]/30 shadow-sm shadow-[#38BDF8]/10">
            <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>01 // Professional Narrative &amp; Vision</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            About Me &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC]">Technical Vision</span>
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            Multidisciplinary engineering scholar bridging theoretical computer science, deterministic embedded firmware, physics-informed machine learning, and autonomous robotics.
          </p>
        </div>

        {/* 2-Column Responsive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column (5 Cols): Identity Card & Verified Academic Credentials */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* High-Tech Profile Card */}
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0C1425] via-[#0A101F] to-[#070D18] border border-cyan-500/30 p-5 sm:p-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              
              {/* Photo & Quick Intro */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center gap-5">
                
                {/* Framed Portrait with Status Ring */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-[#070A12] border-2 border-cyan-500/40 p-1.5 shadow-xl flex-shrink-0 group-hover:border-cyan-400 transition-colors">
                  <img
                    src="/assets/profile/original-photo.png"
                    alt="SHUBHAM Technical Portrait"
                    className="w-full h-full object-cover object-center rounded-xl"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-[#070D18]/90 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-emerald-400 border border-emerald-500/40 flex items-center justify-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>VERIFIED PROFILE</span>
                  </div>
                </div>

                {/* Identity & Current Role Details */}
                <div className="space-y-2 text-center sm:text-left lg:text-center w-full">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans tracking-tight">
                      {displayName}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 font-bold">
                      {personalProfile.primaryTitle}
                    </p>
                  </div>

                  <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start lg:justify-center gap-2 text-xs font-mono text-slate-300">
                    <span className="flex items-center gap-1">
                      <School className="w-3.5 h-3.5 text-purple-400" />
                      CSJM Govt. Polytechnic
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      Ambedkar Nagar, UP
                    </span>
                  </div>

                  {/* Dual Name Transparency Badge */}
                  <div className="p-2.5 rounded-xl bg-[#0E172A] border border-[#253247] text-[11px] font-mono text-slate-300 flex items-center justify-center gap-1.5 shadow-inner">
                    <UserCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>Govt. Academic Record: <strong>Shubham Verma</strong></span>
                  </div>
                </div>

              </div>

              {/* Quick Engineering Milestones Bar */}
              <div className="grid grid-cols-2 gap-2.5 pt-5 mt-5 border-t border-[#253247]/70">
                <div className="p-2.5 rounded-xl bg-[#111B2B] border border-[#253247] text-center">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Diploma CSE</div>
                  <div className="text-xs font-bold text-cyan-400 mt-0.5">Final Year 2026</div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#111B2B] border border-[#253247] text-center">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Class 12th PCM</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">78.6% Distinction</div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#111B2B] border border-[#253247] text-center">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Industrial Training</div>
                  <div className="text-xs font-bold text-purple-400 mt-0.5">45 Days Techsima</div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#111B2B] border border-[#253247] text-center">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Prototypes</div>
                  <div className="text-xs font-bold text-amber-400 mt-0.5">5+ Engineering Labs</div>
                </div>
              </div>

            </div>

            {/* Quick Link Card to Dedicated Education Section */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1325] border border-[#253247] flex items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    Verified Academic Qualifications
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    BTEUP marksheet transcripts &amp; UPMSP records.
                  </p>
                </div>
              </div>
              <a
                href="#education"
                className="px-3 py-1.5 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-cyan-400 hover:text-white border border-[#253247] text-xs font-mono flex items-center gap-1 transition-colors flex-shrink-0"
              >
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* Mission & Future Career Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0C1425] border border-cyan-500/30 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-bold">
                  <Target className="w-4 h-4" /> Engineering Mission
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  &ldquo;{personalProfile.mission}&rdquo;
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0C1425] border border-purple-500/30 space-y-2 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-bold">
                  <Compass className="w-4 h-4" /> Career Vision
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  &ldquo;{personalProfile.vision}&rdquo;
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (7 Cols): Technical Narrative & Strategic Vision Explorer */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Narrative Tabs & Dynamic Story Card */}
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0C1425] via-[#0A101F] to-[#070D18] border border-[#253247] p-5 sm:p-8 shadow-xl space-y-5">
              
              {/* Interactive Story Pillar Switcher (4 Tabs with Vision Roadmap) */}
              <div className="flex items-center gap-2 border-b border-[#253247] pb-3 overflow-x-auto scrollbar-thin">
                <button
                  onClick={() => setActiveStoryTab('foundation')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    activeStoryTab === 'foundation'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-[#111B2B] text-slate-300 hover:text-white border border-[#253247]'
                  }`}
                >
                  <School className="w-3.5 h-3.5" />
                  <span>Foundations</span>
                </button>

                <button
                  onClick={() => setActiveStoryTab('hardware_ai')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    activeStoryTab === 'hardware_ai'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-[#111B2B] text-slate-300 hover:text-white border border-[#253247]'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Hardware + AI</span>
                </button>

                <button
                  onClick={() => setActiveStoryTab('robotics')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    activeStoryTab === 'robotics'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-[#111B2B] text-slate-300 hover:text-white border border-[#253247]'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Autonomous Robotics</span>
                </button>

                <button
                  onClick={() => setActiveStoryTab('strategic_vision')}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    activeStoryTab === 'strategic_vision'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold shadow-md shadow-purple-500/30'
                      : 'bg-[#111B2B] text-purple-300 hover:text-white border border-purple-500/30'
                  }`}
                >
                  <Rocket className="w-3.5 h-3.5 text-amber-400" />
                  <span>Strategic Vision (2026–28)</span>
                </button>
              </div>

              {/* Active Pillar Header */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  {activePillar.subtitle}
                </span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white font-sans">
                  {activePillar.title}
                </h3>
              </div>

              {/* Narrative Text */}
              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                {activePillar.paragraph1}
              </p>

              {/* Key Bullet Takeaways */}
              <div className="pt-2 space-y-2.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Core Technical Highlights:</span>
                </div>
                <div className="space-y-2">
                  {activePillar.keyHighlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestone Footer Badge */}
              <div className="p-3 rounded-xl bg-[#070A12] border border-[#253247] flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{activePillar.milestone}</span>
              </div>

            </div>

            {/* Quick Action Matrix: Jump into Terminal or Resume */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="#engineering-lab"
                className="p-4 rounded-2xl bg-[#0D1420] border border-cyan-500/30 hover:border-cyan-400 text-left transition-all group shadow-md"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    3D Interactive Labs
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-slate-300">
                  Inspect the 3D Robotic Arm, Drone Simulator &amp; Exploded Hardware Teardown.
                </p>
              </a>

              <a
                href="#education"
                className="p-4 rounded-2xl bg-[#0D1420] border border-purple-500/30 hover:border-purple-400 text-left transition-all group shadow-md"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Transcript &amp; Certificates
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-slate-300">
                  Examine semester marksheets, Techsima certificate, and project documentation.
                </p>
              </a>
            </div>

          </div>

        </div>

        {/* Standalone Full-Width Showcase: Engineering Philosophy & First Principles */}
        <div id="engineering-philosophy" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0C1425] via-[#0A101F] to-[#070D18] border border-cyan-500/30 shadow-2xl space-y-6">
          
          {/* Header with Axiom Badge & Visitor Guide */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#253247] pb-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold uppercase tracking-wider">
                  02 // SYSTEM AXIOMS &amp; MENTAL MODELS
                </span>
                <span className="text-xs font-mono text-purple-400">
                  4 Core Engineering Principles
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans flex items-center gap-2.5">
                <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>Engineering Philosophy &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">First Principles</span></span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Fundamental axioms that dictate every line of firmware, ML model constraint, and robotic trajectory. Tap any axiom to inspect its mathematical law and real portfolio implementation.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#070A12] px-3.5 py-2 rounded-xl border border-[#253247] self-start lg:self-center">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Select an axiom below to inspect details:</span>
            </div>
          </div>

          {/* 4 Interactive Axiom Selector Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {philosophyAxioms.map((axiom) => {
              const Icon = axiom.icon;
              const isSelected = selectedAxiomId === axiom.id;

              return (
                <button
                  key={axiom.id}
                  onClick={() => setSelectedAxiomId(axiom.id)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 relative flex flex-col justify-between group cursor-pointer ${
                    isSelected
                      ? `bg-gradient-to-br from-[#0F1E3D] via-[#0B152B] to-[#070D1A] ${axiom.borderColor} shadow-xl ${axiom.glowColor} ring-1 ring-cyan-400 scale-[1.02]`
                      : 'bg-[#0B1325]/90 border-[#253247] hover:border-slate-500 hover:bg-[#0E172A]'
                  }`}
                >
                  {/* Top: Axiom Number & Icon */}
                  <div className="flex items-center justify-between mb-3 w-full">
                    <span className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                      isSelected ? `${axiom.accentBg} ${axiom.textColor} font-black border border-cyan-400/40` : 'bg-[#111B2B] text-slate-400 border border-[#253247]'
                    }`}>
                      {axiom.axiomNum}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected ? `${axiom.accentBg} ${axiom.textColor}` : 'bg-[#111B2B] text-slate-500'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h4 className={`text-sm sm:text-base font-bold font-sans transition-colors leading-snug ${
                      isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                    }`}>
                      {axiom.title}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-400 line-clamp-2 leading-relaxed">
                      {axiom.tagline}
                    </p>
                  </div>

                  {/* Mathematical Formula Preview & Active Indicator */}
                  <div className="mt-4 pt-2.5 border-t border-[#1E293B] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-300/80 truncate">
                      {axiom.lawFormula}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Axiom Detailed Deep-Dive Stage */}
          <div className="p-5 sm:p-7 rounded-2xl bg-[#070A12] border border-cyan-500/25 shadow-inner">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column (5 Cols): Theory, Domain & Mathematical Law */}
              <div className="lg:col-span-5 space-y-4 lg:border-r lg:border-[#1E293B] lg:pr-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${activeAxiom.accentBg} ${activeAxiom.textColor} border border-cyan-400/30`}>
                      {activeAxiom.axiomNum} THEORY
                    </span>
                    <span className="text-[10px] font-mono text-purple-400">
                      {activeAxiom.domain}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white font-sans">
                    {activeAxiom.title}
                  </h4>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                    Core Thesis:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {activeAxiom.thesis}
                  </p>
                </div>

                {/* Mathematical Formulation Box */}
                <div className="p-3.5 rounded-xl bg-[#0C1527] border border-[#1E293B] space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                    Governing Law / Formulation:
                  </span>
                  <div className="font-mono text-xs sm:text-sm text-cyan-300 font-bold bg-[#070A12] px-3 py-1.5 rounded-lg border border-cyan-500/20">
                    {activeAxiom.lawFormula}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 pt-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Heuristic: <em>&ldquo;{activeAxiom.keyTakeaway}&rdquo;</em></span>
                </div>
              </div>

              {/* Right Column (7 Cols): Applied Portfolio Evidence & Bench Proof */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    Concrete Engineering Proof in this Portfolio:
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Bench Verified
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans bg-[#0C1527] p-4 rounded-xl border border-[#1E293B]">
                  {activeAxiom.appliedEvidence}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#091122] border border-[#1E293B] space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase block">Implementation Rigor:</span>
                    <span className="text-white font-bold block">Zero Theoretical Assumptions</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#091122] border border-[#1E293B] space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase block">Telemetry &amp; Signal:</span>
                    <span className="text-cyan-400 font-bold block">100% Instrument Calibrated</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Interdisciplinary Continuum Pipeline (Visual Flow With Connecting Arrows) */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0C1425] via-[#0A101F] to-[#070D18] border border-cyan-500/30 shadow-2xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center justify-center gap-1.5 font-bold">
              <Layers className="w-3.5 h-3.5" /> Interdisciplinary Continuum
            </span>
            <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white font-sans">
              How Software, Electronics &amp; AI Converge Into Autonomous Robotics
            </h3>
            <p className="text-xs text-slate-400">
              Each discipline feeds directly into the next, forming a deterministic cyber-physical engineering pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative">
            {disciplineChain.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.name} 
                  className={`p-4 rounded-2xl bg-[#0B1325]/90 border ${step.borderColor} hover:border-cyan-400/80 transition-all duration-300 space-y-3 group relative flex flex-col justify-between shadow-lg hover:-translate-y-1`}
                >
                  {/* Step Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111B2B] text-slate-400 border border-[#253247] font-bold">
                        Phase {step.step}
                      </span>
                      <div className={`w-8 h-8 rounded-xl bg-[#111B2B] border border-white/5 flex items-center justify-center ${step.textColor} group-hover:scale-110 group-hover:shadow-md transition-transform`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="text-xs font-mono text-cyan-400/90 uppercase tracking-wider font-bold">
                      {step.badge}
                    </div>

                    <div className="text-sm font-bold text-white font-sans group-hover:text-cyan-300 transition-colors">
                      {step.name}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>

                  {/* Flow arrow to next step (visible on large screen) */}
                  {idx < disciplineChain.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                      <div className="w-6 h-6 rounded-full bg-[#070A12] border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
