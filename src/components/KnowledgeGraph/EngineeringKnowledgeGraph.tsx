import React, { useState, useMemo } from 'react';
import {
  Network,
  Cpu,
  Brain,
  Terminal,
  ArrowUpRight,
  Zap,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Search,
  Sparkles,
  Layers,
  Compass,
  ArrowRight,
  Bot,
  CheckCircle2,
} from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  category: 'foundation' | 'domain' | 'technology' | 'project';
  tierLevel: 1 | 2 | 3 | 4; // 1 = Foundation, 2 = Domain, 3 = Toolchain, 4 = Project
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
  simpleExplanation: string; // Plain English non-technical summary
  technicalDetails: string;
  application: string;
  connectedTo: string[];
  status: 'Verified Project' | 'Production Code' | 'Research Prototype' | 'Core Competency';
  iconType: 'terminal' | 'brain' | 'cpu' | 'zap' | 'bot';
}

interface GuidedPathway {
  id: string;
  title: string;
  tag: string;
  color: string;
  nodeIds: string[];
  story: string;
}

const NODES: GraphNode[] = [
  // TIER 1: Foundations
  {
    id: 'cs',
    label: 'Computer Science',
    category: 'foundation',
    tierLevel: 1,
    x: 18,
    y: 20,
    size: 26,
    simpleExplanation: 'Strong academic foundation in computer hardware, software logic, memory management, and algorithm design.',
    technicalDetails: 'Diploma in Computer Science & Engineering (2023-2026) from CSJM Govt Polytechnic. Data structures and OS kernels.',
    application: 'Powers foundational thinking across embedded C register programming, Linux socket routing, and Python algorithms.',
    connectedTo: ['linux', 'cpp', 'python', 'embedded'],
    status: 'Core Competency',
    iconType: 'terminal',
  },
  {
    id: 'linux',
    label: 'Linux & Kali Linux',
    category: 'foundation',
    tierLevel: 1,
    x: 36,
    y: 18,
    size: 24,
    simpleExplanation: 'Primary operating system used daily for running servers, cybersecurity auditing, and automated scripts.',
    technicalDetails: 'POSIX shell scripting, kernel telemetry, systemd daemons, networking, and netfilter security auditing.',
    application: 'Daily-driver OS on Dell Inspiron 15 3520. Embedded cross-compilation toolchains and ROS 2 middleware.',
    connectedTo: ['cs', 'embedded', 'trustguard'],
    status: 'Core Competency',
    iconType: 'terminal',
  },
  {
    id: 'python',
    label: 'Python Ecosystem',
    category: 'foundation',
    tierLevel: 1,
    x: 56,
    y: 16,
    size: 24,
    simpleExplanation: 'Versatile programming language used to build high-traffic web applications, AI models, and automated tests.',
    technicalDetails: 'Scientific computing with NumPy, PyTorch, Django ORM, and asynchronous asyncio event loops.',
    application: 'Backend engine for 1QUIZ CBT platform, PINN physics loss engine, and automated NLP grading pipelines.',
    connectedTo: ['ai_ml', 'quiz_app', 'pinn', 'assignment_checker'],
    status: 'Production Code',
    iconType: 'terminal',
  },
  {
    id: 'cpp',
    label: 'Embedded C / C++',
    category: 'foundation',
    tierLevel: 1,
    x: 76,
    y: 18,
    size: 24,
    simpleExplanation: 'Low-level, fast programming language used to directly control microcontroller hardware and sensors.',
    technicalDetails: 'Bare-metal register manipulation, FreeRTOS queue management, interrupt service routines (ISR).',
    application: 'ESP32 firmware for automotive alcohol safety cutoff and sensor ADC voltage sampling.',
    connectedTo: ['cs', 'embedded', 'alcohol_project'],
    status: 'Production Code',
    iconType: 'terminal',
  },

  // TIER 2: Specialized Domains
  {
    id: 'embedded',
    label: 'Embedded Systems & IoT',
    category: 'domain',
    tierLevel: 2,
    x: 24,
    y: 42,
    size: 28,
    simpleExplanation: 'Connecting physical sensors, motors, and electronic circuits to microchips to make smart hardware devices.',
    technicalDetails: 'Microcontroller hardware architecture, ADC calibration, UART/I2C/SPI protocols, and safety interlocks.',
    application: 'Automotive alcohol interlock with 5V opto-isolated relay cutoff and SSD1306 OLED telemetry.',
    connectedTo: ['cpp', 'alcohol_project', 'esp32'],
    status: 'Verified Project',
    iconType: 'cpu',
  },
  {
    id: 'ai_ml',
    label: 'AI & Deep Learning',
    category: 'domain',
    tierLevel: 2,
    x: 52,
    y: 38,
    size: 30,
    simpleExplanation: 'Teaching neural networks to recognize patterns, predict battery lifespan, and evaluate complex text.',
    technicalDetails: 'Physics-informed neural networks (PINNs), LSTM sequences, and transformer text representations.',
    application: 'Battery degradation modeling under varying C-rates; semantic similarity in student assignment checks.',
    connectedTo: ['python', 'pinn', 'assignment_checker', 'trustguard'],
    status: 'Production Code',
    iconType: 'brain',
  },
  {
    id: 'robotics',
    label: 'Autonomous Robotics',
    category: 'domain',
    tierLevel: 2,
    x: 82,
    y: 36,
    size: 28,
    simpleExplanation: 'Programming robotic arms and aerial drones to perceive their environment and move autonomously.',
    technicalDetails: 'Kinematics, trajectory generation, sensor fusion, and ROS 2 communication nodes.',
    application: '6-DOF robotic manipulator inverse kinematics and PX4 autonomous drone waypoint mission planning.',
    connectedTo: ['ros2', 'drone_sim'],
    status: 'Research Prototype',
    iconType: 'bot',
  },

  // TIER 3: Toolchains & Frameworks
  {
    id: 'esp32',
    label: 'ESP32 & FreeRTOS',
    category: 'technology',
    tierLevel: 3,
    x: 15,
    y: 62,
    size: 22,
    simpleExplanation: 'Dual-core microcontroller running a real-time operating system to execute multiple tasks simultaneously.',
    technicalDetails: 'Dual-core Tensilica Xtensa 240MHz MCU, non-blocking FreeRTOS tasks, hardware timers.',
    application: 'Firmware controller coordinating MQ-3 sensor, camera trigger, and ignition relay module.',
    connectedTo: ['embedded', 'alcohol_project'],
    status: 'Production Code',
    iconType: 'cpu',
  },
  {
    id: 'ros2',
    label: 'ROS 2 & Gazebo',
    category: 'technology',
    tierLevel: 3,
    x: 86,
    y: 60,
    size: 22,
    simpleExplanation: 'The industry-standard robotics software framework used to simulate and control industrial machines in 3D.',
    technicalDetails: 'ROS 2 Humble DDS pub/sub architecture, URDF 3D models, Gazebo physics simulation.',
    application: '6-DOF robotic arm trajectory control and drone PX4 SITL MAVLink telemetry bridge.',
    connectedTo: ['robotics', 'drone_sim'],
    status: 'Research Prototype',
    iconType: 'bot',
  },
  {
    id: 'drone_sim',
    label: 'PX4 Drone SITL',
    category: 'technology',
    tierLevel: 3,
    x: 74,
    y: 70,
    size: 24,
    simpleExplanation: 'Realistic flight simulator testing quadcopter autopilots, GPS waypoints, and fail-safe safety landings.',
    technicalDetails: 'Software-In-The-Loop quadcopter dynamics, MAVROS telemetry bridge, offboard waypoint flight.',
    application: 'Virtual autonomous survey drone simulated with live GPS, pitch, roll, and battery telemetry.',
    connectedTo: ['robotics', 'ros2'],
    status: 'Research Prototype',
    iconType: 'bot',
  },

  // TIER 4: Implemented Flagship Projects
  {
    id: 'alcohol_project',
    label: 'Alcohol Lock IoT System',
    category: 'project',
    tierLevel: 4,
    x: 18,
    y: 84,
    size: 32,
    simpleExplanation: 'Smart vehicle safety device that detects breath alcohol and instantly cuts off the engine ignition to stop drunk driving.',
    technicalDetails: 'MQ-3 gas chamber + ESP32 + 5V opto-isolated relay + 50-sample moving average filter + OLED display.',
    application: 'Automotive safety system locking relay contacts within 15ms upon detecting alcohol vapors exceeding threshold.',
    connectedTo: ['embedded', 'esp32', 'cpp'],
    status: 'Verified Project',
    iconType: 'zap',
  },
  {
    id: 'trustguard',
    label: 'TrustGuard Anti-Scam',
    category: 'project',
    tierLevel: 4,
    x: 34,
    y: 56,
    size: 26,
    simpleExplanation: 'Cybersecurity defense tool that scans messages and emails to catch phishing scams and fake banking links.',
    technicalDetails: 'Cybersecurity SMS & email phishing classifier utilizing rule-based regex heuristics and lightweight intent model.',
    application: 'Local inference endpoint identifying fraudulent banking URLs and spoofed urgency patterns.',
    connectedTo: ['ai_ml', 'linux'],
    status: 'Production Code',
    iconType: 'zap',
  },
  {
    id: 'assignment_checker',
    label: 'AI Assignment Checker',
    category: 'project',
    tierLevel: 4,
    x: 42,
    y: 78,
    size: 30,
    simpleExplanation: 'Automated student evaluation portal using AI to read handwritten PDF assignments and grade them with an answer key.',
    technicalDetails: 'Django backend + PDF parser + BERT embedding vectors to calculate student score against answer key.',
    application: 'OCR text extraction + cosine similarity vectors scoring student answers with sub-second feedback.',
    connectedTo: ['ai_ml', 'python'],
    status: 'Verified Project',
    iconType: 'zap',
  },
  {
    id: 'quiz_app',
    label: '1QUIZ CBT Platform',
    category: 'project',
    tierLevel: 4,
    x: 58,
    y: 86,
    size: 30,
    simpleExplanation: 'High-speed online test platform that dynamically adjusts question difficulty based on student ability.',
    technicalDetails: 'Computer-based testing engine with 3-Parameter Item Response Theory (IRT) adaptive question selection.',
    application: 'Production Django app with dynamic latent trait estimation theta and anti-cheat event telemetry.',
    connectedTo: ['python'],
    status: 'Production Code',
    iconType: 'zap',
  },
  {
    id: 'pinn',
    label: 'PINN Battery Twin',
    category: 'project',
    tierLevel: 4,
    x: 64,
    y: 56,
    size: 28,
    simpleExplanation: 'Scientific AI model combining electrochemistry equations with neural networks to predict battery lifespan.',
    technicalDetails: 'Physics-Informed Neural Network predicting lithium-ion battery capacity loss & thermal runaway.',
    application: 'Custom loss function enforcing Butler-Volmer kinetics and Arrhenius thermal degradation laws.',
    connectedTo: ['ai_ml', 'python'],
    status: 'Production Code',
    iconType: 'zap',
  },
];

const GUIDED_PATHWAYS: GuidedPathway[] = [
  {
    id: 'iot_safety',
    title: 'Automotive IoT Safety Journey',
    tag: 'HARDWARE & FIRMWARE',
    color: '#38BDF8',
    nodeIds: ['cs', 'cpp', 'embedded', 'esp32', 'alcohol_project'],
    story: 'How Computer Science foundations lead to bare-metal Embedded C, FreeRTOS multitasking, and a working life-saving vehicle alcohol interlock system.',
  },
  {
    id: 'robotics_drone',
    title: 'Autonomous Robotics & Flight',
    tag: 'ROS 2 & KINEMATICS',
    color: '#8B5CF6',
    nodeIds: ['linux', 'robotics', 'ros2', 'drone_sim'],
    story: 'How Linux administration powers ROS 2 Humble DDS, Gazebo 3D simulation, and autonomous PX4 quadcopter waypoint flight algorithms.',
  },
  {
    id: 'scientific_ai',
    title: 'Physics-Informed AI Twin',
    tag: 'MACHINE LEARNING',
    color: '#10B981',
    nodeIds: ['cs', 'python', 'ai_ml', 'pinn'],
    story: 'How Python scientific computing merges with deep neural networks and electrochemistry laws to forecast EV battery degradation without physical teardowns.',
  },
  {
    id: 'edtech_eval',
    title: 'Full-Stack EdTech Platforms',
    tag: 'PRODUCTION APPS',
    color: '#F59E0B',
    nodeIds: ['python', 'ai_ml', 'quiz_app', 'assignment_checker'],
    story: 'How Python web architecture and NLP embeddings combine to create high-scale adaptive testing and automated assignment grading platforms.',
  },
];

export const EngineeringKnowledgeGraph: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('alcohol_project');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'network' | 'pipeline'>('network');
  const [activePathwayId, setActivePathwayId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const selectedNode = NODES.find((n) => n.id === selectedNodeId) || NODES[0];

  // Active Pathway Object
  const activePathway = GUIDED_PATHWAYS.find((p) => p.id === activePathwayId) || null;

  // Filtered Nodes based on Category & Search
  const filteredNodes = useMemo(() => {
    return NODES.filter((n) => {
      const matchesCat = categoryFilter === 'all' || n.category === categoryFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.simpleExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.technicalDetails.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  // Edges between nodes
  const edges = useMemo(() => {
    const list: { from: GraphNode; to: GraphNode }[] = [];
    NODES.forEach((source) => {
      source.connectedTo.forEach((targetId) => {
        const target = NODES.find((n) => n.id === targetId);
        if (target && source.id < target.id) {
          list.push({ from: source, to: target });
        }
      });
    });
    return list;
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'foundation':
        return '#38BDF8'; // Sky blue
      case 'domain':
        return '#8B5CF6'; // Purple
      case 'technology':
        return '#10B981'; // Emerald
      case 'project':
        return '#F59E0B'; // Amber
      default:
        return '#94A3B8';
    }
  };

  const getCategoryBadgeLabel = (category: string) => {
    switch (category) {
      case 'foundation':
        return 'Tier 1 // Core Foundation';
      case 'domain':
        return 'Tier 2 // Specialized Domain';
      case 'technology':
        return 'Tier 3 // Production Toolchain';
      case 'project':
        return 'Tier 4 // Implemented Project';
      default:
        return category;
    }
  };

  const getNodeIcon = (type: string, className: string = 'w-4 h-4') => {
    switch (type) {
      case 'terminal':
        return <Terminal className={className} />;
      case 'brain':
        return <Brain className={className} />;
      case 'cpu':
        return <Cpu className={className} />;
      case 'bot':
        return <Bot className={className} />;
      case 'zap':
        return <Zap className={className} />;
      default:
        return <Network className={className} />;
    }
  };

  return (
    <section id="knowledge-graph" className="py-24 relative z-10 bg-[#070A12] border-t border-[#253247]/60">
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#38BDF8]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#8B5CF6]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111B2B] border border-[#38BDF8]/30 text-xs font-mono text-[#38BDF8]">
            <Network className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>INTERCONNECTED TECHNICAL ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Engineering Knowledge Graph
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            See how Shubham's foundations in Computer Science connect to hardware safety systems, physics-informed AI models, and robotics simulations. Designed for both quick non-technical understanding and deep technical inspection.
          </p>
        </div>

        {/* Guided Story Pathways (Makes it super easy for anyone to understand!) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1420] border-2 border-[#253247] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono text-[#38BDF8] uppercase font-bold flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#38BDF8]" />
              GUIDED EXPLORATION PATHWAYS (CLICK TO TRACE THE STORY):
            </span>
            {activePathway && (
              <button
                onClick={() => setActivePathwayId(null)}
                className="text-[11px] font-mono text-slate-400 hover:text-white underline"
              >
                Clear Pathway Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {GUIDED_PATHWAYS.map((p) => {
              const isActive = activePathwayId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    if (isActive) {
                      setActivePathwayId(null);
                    } else {
                      setActivePathwayId(p.id);
                      setSelectedNodeId(p.nodeIds[p.nodeIds.length - 1]);
                    }
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#111E33] to-[#162744] border-2 border-[#38BDF8] shadow-lg shadow-[#38BDF8]/15 scale-[1.02]'
                      : 'bg-[#111B2B] hover:bg-[#162338] border-[#253247] text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="font-bold" style={{ color: p.color }}>
                      {p.tag}
                    </span>
                    {isActive && <span className="text-emerald-400 font-bold">● ACTIVE</span>}
                  </div>
                  <h4 className="text-xs font-bold text-white font-sans truncate">{p.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {p.story}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Toolbar: View Switcher, Search, Category Filter, Zoom */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0D1420] border border-[#253247]">
          {/* View Mode Toggle: Network Mesh vs Layered Pipeline */}
          <div className="flex items-center rounded-xl bg-[#111B2B] border border-[#253247] p-0.5 text-xs font-mono">
            <button
              onClick={() => setViewMode('network')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'network'
                  ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>NETWORK MESH</span>
            </button>
            <button
              onClick={() => setViewMode('pipeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'pipeline'
                  ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>LAYERED PIPELINE</span>
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, tools, projects..."
              className="w-full bg-[#111B2B] text-white text-xs pl-8 pr-3 py-1.5 rounded-xl border border-[#253247] outline-none focus:border-[#38BDF8] font-mono placeholder:text-slate-600"
            />
          </div>

          {/* Category Dimension Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Dimensions' },
              { id: 'foundation', label: 'Foundations' },
              { id: 'domain', label: 'Domains' },
              { id: 'technology', label: 'Toolchains' },
              { id: 'project', label: 'Projects' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  categoryFilter === tab.id
                    ? 'bg-slate-200 text-[#070A12] font-bold'
                    : 'bg-[#111B2B] text-slate-400 hover:text-white hover:bg-[#162338]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Zoom & Reset Controls */}
          <div className="flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1.5 rounded-lg bg-[#111B2B] text-slate-400 hover:text-white border border-[#253247]"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-400 text-[11px] px-1">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1.5 rounded-lg bg-[#111B2B] text-slate-400 hover:text-white border border-[#253247]"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setCategoryFilter('all');
                setActivePathwayId(null);
                setSearchQuery('');
                setSelectedNodeId('alcohol_project');
              }}
              className="p-1.5 rounded-lg bg-[#111B2B] text-slate-400 hover:text-white border border-[#253247]"
              title="Reset All"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Display: Interactive Network or Layered Pipeline View (8 Cols) + Detail Card (4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Visual Graph Container (Left 8 Cols) */}
          <div className="lg:col-span-8 relative rounded-3xl bg-[#090D16] border-2 border-[#253247] p-4 sm:p-6 shadow-2xl overflow-hidden min-h-[540px] flex items-center justify-center">
            {/* Fine Cyber Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#25324715_1px,transparent_1px),linear-gradient(to_bottom,#25324715_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* VIEW MODE 1: Interactive Network Mesh */}
            {viewMode === 'network' && (
              <div
                className="relative w-full h-[520px] transition-transform duration-300 origin-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <svg className="w-full h-full absolute inset-0 pointer-events-none">
                  <defs>
                    <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="activeEdgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="1" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="1" />
                    </linearGradient>
                  </defs>

                  {/* Render Network Edges */}
                  {edges.map(({ from, to }, idx) => {
                    const isSourceSelected = from.id === selectedNodeId;
                    const isTargetSelected = to.id === selectedNodeId;
                    const isPathwayEdge =
                      activePathway &&
                      activePathway.nodeIds.includes(from.id) &&
                      activePathway.nodeIds.includes(to.id);
                    const isActive = isSourceSelected || isTargetSelected || isPathwayEdge;

                    return (
                      <g key={`edge-g-${idx}`}>
                        <line
                          x1={`${from.x}%`}
                          y1={`${from.y}%`}
                          x2={`${to.x}%`}
                          y2={`${to.y}%`}
                          stroke={
                            isPathwayEdge
                              ? activePathway?.color || '#38BDF8'
                              : isActive
                              ? 'url(#activeEdgeGradient)'
                              : '#1E293B'
                          }
                          strokeWidth={isActive ? 2.5 : 1}
                          strokeDasharray={isActive ? '5 3' : 'none'}
                          className={isActive ? 'animate-pulse' : 'opacity-40'}
                        />

                        {/* Animated Energy Flow Particle when active */}
                        {isActive && (
                          <circle r="3" fill="#38BDF8" className="filter drop-shadow(0 0 4px #38BDF8)">
                            <animateMotion
                              path={`M ${from.x * 5.2} ${from.y * 5.2} L ${to.x * 5.2} ${to.y * 5.2}`}
                              dur="2.5s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Render Nodes */}
                {filteredNodes.map((node) => {
                  const isSelected = node.id === selectedNodeId;
                  const isNeighbor =
                    selectedNode.connectedTo.includes(node.id) ||
                    node.connectedTo.includes(selectedNode.id);
                  const isPathwayNode = activePathway?.nodeIds.includes(node.id);
                  const color = getCategoryColor(node.category);

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className="absolute cursor-pointer select-none transition-all duration-300 z-10 flex flex-col items-center group"
                    >
                      {/* Pulsing Aura */}
                      {(isSelected || isPathwayNode) && (
                        <div
                          className="absolute inset-0 rounded-full animate-ping opacity-35"
                          style={{ backgroundColor: color }}
                        />
                      )}

                      {/* Node Icon Circle */}
                      <div
                        className={`rounded-full flex items-center justify-center transition-transform shadow-xl ${
                          isSelected
                            ? 'scale-125 ring-4 ring-offset-2 ring-offset-[#090D16]'
                            : isNeighbor || isPathwayNode
                            ? 'scale-110 ring-2 ring-opacity-70'
                            : 'group-hover:scale-110'
                        }`}
                        style={{
                          width: `${node.size * 1.5}px`,
                          height: `${node.size * 1.5}px`,
                          backgroundColor: isSelected ? color : '#111B2B',
                          border: `2px solid ${color}`,
                        }}
                      >
                        {getNodeIcon(node.iconType, isSelected ? 'w-4 h-4 text-slate-950' : 'w-4 h-4 text-white')}
                      </div>

                      {/* Node Label Pill */}
                      <div
                        className={`mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold whitespace-nowrap shadow-lg transition-all ${
                          isSelected
                            ? 'bg-[#F8FAFC] text-[#070A12]'
                            : 'bg-[#0D1420]/90 text-[#CBD5E1] border border-[#253247] group-hover:border-[#38BDF8]'
                        }`}
                      >
                        {node.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* VIEW MODE 2: Hierarchical Layered Pipeline (Super Easy for Everyone to Understand!) */}
            {viewMode === 'pipeline' && (
              <div className="w-full space-y-6 py-2 relative z-10">
                <div className="text-center pb-2 border-b border-[#253247]">
                  <span className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-wider block">
                    HOW SHUBHAM'S ENGINEERING FLOWS (FOUNDATIONS ➔ SPECIALIZATIONS ➔ PROJECTS)
                  </span>
                </div>

                {[
                  {
                    tier: 1,
                    title: 'TIER 1: ACADEMIC & CS FOUNDATIONS',
                    sub: 'Diploma Curriculum, Operating Systems, Memory Management & Core Syntax',
                    color: '#38BDF8',
                    cat: 'foundation',
                  },
                  {
                    tier: 2,
                    title: 'TIER 2: SPECIALIZED ENGINEERING DOMAINS',
                    sub: 'Robotics Kinematics, Physics-Informed Neural AI, and Embedded Hardware Safety',
                    color: '#8B5CF6',
                    cat: 'domain',
                  },
                  {
                    tier: 3,
                    title: 'TIER 3: PRODUCTION TOOLCHAINS & FRAMEWORKS',
                    sub: 'FreeRTOS Task Scheduling, ROS 2 Humble DDS, and PX4 Drone SITL Simulator',
                    color: '#10B981',
                    cat: 'technology',
                  },
                  {
                    tier: 4,
                    title: 'TIER 4: WORKING FLAGSHIP PROJECTS & VERIFIED PROTOTYPES',
                    sub: 'Alcohol Ignition Interlock, 1QUIZ Engine, AI Grader, and Battery PINN Twin',
                    color: '#F59E0B',
                    cat: 'project',
                  },
                ].map((tierConfig, tIdx) => {
                  const tierNodes = NODES.filter((n) => n.tierLevel === tierConfig.tier);

                  return (
                    <div key={tierConfig.tier} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono border-b border-[#253247]/60 pb-1">
                        <span className="font-bold flex items-center gap-1.5" style={{ color: tierConfig.color }}>
                          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: tierConfig.color }} />
                          {tierConfig.title}
                        </span>
                        <span className="text-[10px] text-slate-400 hidden sm:inline">{tierConfig.sub}</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {tierNodes.map((n) => {
                          const isSel = selectedNodeId === n.id;
                          return (
                            <button
                              key={n.id}
                              onClick={() => setSelectedNodeId(n.id)}
                              className={`p-2.5 rounded-xl border text-left transition-all ${
                                isSel
                                  ? 'bg-[#162338] border-2 shadow-lg scale-[1.02]'
                                  : 'bg-[#111B2B] hover:bg-[#162338] border-[#253247] text-slate-300'
                              }`}
                              style={{
                                borderColor: isSel ? tierConfig.color : undefined,
                              }}
                            >
                              <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                                {getNodeIcon(n.iconType, 'w-3.5 h-3.5 text-slate-400')}
                                <span className="truncate">{n.label}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                                {n.status}
                              </p>
                            </button>
                          );
                        })}
                      </div>

                      {tIdx < 3 && (
                        <div className="flex justify-center py-1 text-slate-600">
                          <ArrowRight className="w-4 h-4 rotate-90" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Legend */}
            <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#94A3B8] bg-[#070A12]/85 backdrop-blur-md px-3 py-2 rounded-xl border border-[#253247]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" /> Foundations
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" /> Domains
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Toolchains
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Projects
                </span>
              </div>
              <span className="text-slate-400">Click any node to see details</span>
            </div>
          </div>

          {/* Detailed Inspector Card (Right 4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#0D1420] border-2 border-[#253247] p-5 sm:p-6 shadow-2xl space-y-4">
            {/* Header: Tier Category + Verification Badge */}
            <div className="flex items-center justify-between gap-2 border-b border-[#253247] pb-3">
              <span
                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                style={{
                  backgroundColor: `${getCategoryColor(selectedNode.category)}20`,
                  color: getCategoryColor(selectedNode.category),
                  border: `1px solid ${getCategoryColor(selectedNode.category)}40`,
                }}
              >
                {getCategoryBadgeLabel(selectedNode.category)}
              </span>

              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {selectedNode.status}
              </span>
            </div>

            {/* Title & Icon */}
            <div>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${getCategoryColor(selectedNode.category)}25`,
                    color: getCategoryColor(selectedNode.category),
                  }}
                >
                  {getNodeIcon(selectedNode.iconType, 'w-4 h-4')}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] font-sans">
                  {selectedNode.label}
                </h3>
              </div>
            </div>

            {/* In Simple English (Super Easy to Understand!) */}
            <div className="p-3.5 rounded-2xl bg-[#111B2B] border border-cyan-500/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                In Simple English (Non-Technical):
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {selectedNode.simpleExplanation}
              </p>
            </div>

            {/* Engineering Implementation Details */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                TECHNICAL IMPLEMENTATION:
              </span>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {selectedNode.technicalDetails}
              </p>
            </div>

            {/* Practical Application */}
            <div className="p-3 rounded-xl bg-[#090D16] border border-[#253247] space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                Where It Powers Real Projects:
              </span>
              <p className="text-[11px] text-[#CBD5E1] leading-relaxed">
                {selectedNode.application}
              </p>
            </div>

            {/* Direct Connected Technical Linkages */}
            <div className="space-y-2 pt-1 border-t border-[#253247]">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                DIRECT TECHNICAL LINKAGES ({selectedNode.connectedTo.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.connectedTo.map((neighborId) => {
                  const neighbor = NODES.find((n) => n.id === neighborId);
                  if (!neighbor) return null;
                  return (
                    <button
                      key={neighborId}
                      onClick={() => setSelectedNodeId(neighborId)}
                      className="px-2.5 py-1 rounded-lg bg-[#162338] hover:bg-[#1E2D44] text-[#CBD5E1] hover:text-[#38BDF8] border border-[#253247] text-[11px] font-mono flex items-center gap-1 transition-colors"
                    >
                      <span>{neighbor.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#38BDF8]" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Jump to Working Section Action */}
            <div className="pt-2">
              <a
                href={
                  selectedNode.category === 'project'
                    ? '#projects'
                    : selectedNode.category === 'domain' || selectedNode.category === 'technology'
                    ? '#engineering-lab'
                    : '#skills'
                }
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] hover:opacity-95 text-[#070A12] font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-md shadow-[#38BDF8]/20"
              >
                <span>Jump to Live Project Section</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
