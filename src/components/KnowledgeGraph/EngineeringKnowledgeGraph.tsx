import React, { useState } from 'react';
import { Network, Cpu, Brain, Terminal, Shield, ArrowUpRight, Zap, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  category: 'foundation' | 'domain' | 'project' | 'technology';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
  description: string;
  application: string;
  connectedTo: string[];
  status: 'Verified Project' | 'Production Code' | 'Research Prototype' | 'Core Competency';
}

const NODES: GraphNode[] = [
  // Foundations
  {
    id: 'cs',
    label: 'Computer Science',
    category: 'foundation',
    x: 18,
    y: 20,
    size: 26,
    description: 'Diploma in Computer Science & Engineering (2023-2026) from CSJM Govt Polytechnic.',
    application: 'Data structures, algorithms, operating system architecture, and low-level memory management.',
    connectedTo: ['linux', 'cpp', 'python', 'embedded'],
    status: 'Core Competency'
  },
  {
    id: 'linux',
    label: 'Linux & Kali Linux',
    category: 'foundation',
    x: 32,
    y: 18,
    size: 24,
    description: 'POSIX shell scripting, kernel telemetry, systemd daemons, networking, and security auditing.',
    application: 'Primary daily-driver OS on Dell Inspiron 15 3520. Embedded cross-compilation toolchains.',
    connectedTo: ['cs', 'embedded', 'trustguard'],
    status: 'Core Competency'
  },
  {
    id: 'python',
    label: 'Python Ecosystem',
    category: 'foundation',
    x: 48,
    y: 16,
    size: 24,
    description: 'Scientific computing with NumPy, PyTorch, Django ORM, and asyncio frameworks.',
    application: 'Backend algorithms for 1QUIZ, PINN physics loss engine, and automated NLP grading pipelines.',
    connectedTo: ['ai_ml', 'quiz_app', 'pinn', 'assignment_checker'],
    status: 'Production Code'
  },
  {
    id: 'cpp',
    label: 'Embedded C / C++',
    category: 'foundation',
    x: 70,
    y: 18,
    size: 24,
    description: 'Bare-metal register manipulation, FreeRTOS queue management, interrupt service routines (ISR).',
    application: 'ESP32 firmware for automotive alcohol interlock and sensor sampling routines.',
    connectedTo: ['cs', 'embedded', 'alcohol_project'],
    status: 'Production Code'
  },

  // Domains
  {
    id: 'robotics',
    label: 'Autonomous Robotics',
    category: 'domain',
    x: 82,
    y: 36,
    size: 28,
    description: 'Kinematics, trajectory generation, sensor fusion, and ROS 2 communication nodes.',
    application: 'Robotic manipulator inverse kinematics and PX4 autonomous drone waypoint mission planning.',
    connectedTo: ['ros2', 'drone_sim'],
    status: 'Research Prototype'
  },
  {
    id: 'ai_ml',
    label: 'AI & Deep Learning',
    category: 'domain',
    x: 50,
    y: 38,
    size: 30,
    description: 'Physics-informed neural networks (PINNs), LSTM sequences, and transformer text representations.',
    application: 'Battery degradation modeling under varying C-rates; semantic similarity in student assignment checks.',
    connectedTo: ['python', 'pinn', 'assignment_checker', 'trustguard'],
    status: 'Production Code'
  },
  {
    id: 'embedded',
    label: 'Embedded Systems & IoT',
    category: 'domain',
    x: 24,
    y: 42,
    size: 28,
    description: 'Microcontroller hardware architecture, ADC calibration, UART/I2C/SPI protocols, and safety interlocks.',
    application: 'Automotive alcohol interlock with relay cutoff and cloud telemetry broadcasting.',
    connectedTo: ['cpp', 'alcohol_project', 'esp32'],
    status: 'Verified Project'
  },

  // Technologies
  {
    id: 'esp32',
    label: 'ESP32 & FreeRTOS',
    category: 'technology',
    x: 15,
    y: 62,
    size: 22,
    description: 'Dual-core Tensilica Xtensa 240MHz MCU, non-blocking FreeRTOS tasks, hardware timers.',
    application: 'Firmware controller coordinating MQ-3 sensor, camera trigger, and ignition relay module.',
    connectedTo: ['embedded', 'alcohol_project'],
    status: 'Production Code'
  },
  {
    id: 'ros2',
    label: 'ROS 2 & Gazebo',
    category: 'technology',
    x: 85,
    y: 60,
    size: 22,
    description: 'ROS 2 Humble DDS pub/sub architecture, URDF 3D models, Gazebo physics simulation.',
    application: '6-DOF robotic arm trajectory control and drone PX4 SITL MAVLink telemetry bridge.',
    connectedTo: ['robotics', 'drone_sim'],
    status: 'Research Prototype'
  },
  {
    id: 'drone_sim',
    label: 'PX4 Drone SITL',
    category: 'technology',
    x: 72,
    y: 72,
    size: 24,
    description: 'Software-In-The-Loop quadcopter dynamics, MAVROS telemetry bridge, offboard waypoint flight.',
    application: 'Virtual autonomous survey drone simulated with live GPS, pitch, roll, and battery telemetry.',
    connectedTo: ['robotics', 'ros2'],
    status: 'Research Prototype'
  },

  // Flagship & Additional Projects
  {
    id: 'alcohol_project',
    label: 'Alcohol Lock IoT System',
    category: 'project',
    x: 20,
    y: 84,
    size: 32,
    description: 'IoT smart breathalyzer ignition interlock preventing drunk driving with immediate engine cutoff.',
    application: 'MQ-3 gas chamber + ESP32 + 5V opto-isolated relay + ESP32-CAM facial verification + GPS location.',
    connectedTo: ['embedded', 'esp32', 'cpp'],
    status: 'Verified Project'
  },
  {
    id: 'assignment_checker',
    label: 'AI Assignment Checker',
    category: 'project',
    x: 40,
    y: 78,
    size: 30,
    description: 'Automated grading portal combining OCR text extraction with semantic cosine similarity.',
    application: 'Django backend + PDF parser + BERT embedding vectors to calculate student score against answer key.',
    connectedTo: ['ai_ml', 'python'],
    status: 'Verified Project'
  },
  {
    id: 'quiz_app',
    label: '1QUIZ CBT Platform',
    category: 'project',
    x: 56,
    y: 86,
    size: 30,
    description: 'Computer-based testing engine with 3-Parameter Item Response Theory (IRT) adaptive question selection.',
    application: 'Production Django app with dynamic latent trait estimation theta and anti-cheat event telemetry.',
    connectedTo: ['python'],
    status: 'Production Code'
  },
  {
    id: 'pinn',
    label: 'PINN Battery Twin',
    category: 'project',
    x: 62,
    y: 56,
    size: 28,
    description: 'Physics-Informed Neural Network predicting lithium-ion battery capacity loss & thermal runaway.',
    application: 'Loss function penalizing violations of Butler-Volmer kinetics and Arrhenius thermal degradation.',
    connectedTo: ['ai_ml', 'python'],
    status: 'Production Code'
  },
  {
    id: 'trustguard',
    label: 'TrustGuard Anti-Scam',
    category: 'project',
    x: 36,
    y: 54,
    size: 26,
    description: 'Cybersecurity SMS & email phishing classifier utilizing rule-based regex heuristics and lightweight intent model.',
    application: 'Local inference endpoint identifying fraudulent banking URLs and spoofed urgency patterns.',
    connectedTo: ['ai_ml', 'linux'],
    status: 'Production Code'
  }
];

export const EngineeringKnowledgeGraph: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('alcohol_project');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const selectedNode = NODES.find((n) => n.id === selectedNodeId) || NODES[0];

  const filteredNodes = categoryFilter === 'all'
    ? NODES
    : NODES.filter((n) => n.category === categoryFilter);

  // Generate unique edges from the node relationships
  const edges: { from: GraphNode; to: GraphNode }[] = [];
  NODES.forEach((source) => {
    source.connectedTo.forEach((targetId) => {
      const target = NODES.find((n) => n.id === targetId);
      if (target && source.id < target.id) {
        edges.push({ from: source, to: target });
      }
    });
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'foundation':
        return '#38BDF8'; // Sky blue
      case 'domain':
        return '#8B5CF6'; // Violet
      case 'technology':
        return '#10B981'; // Emerald
      case 'project':
        return '#F59E0B'; // Amber
      default:
        return '#94A3B8';
    }
  };

  return (
    <section id="knowledge-graph" className="py-24 relative z-10 bg-[#070A12] border-t border-[#253247]/60">
      {/* Background Glow Accents */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#38BDF8]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#8B5CF6]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111B2B] border border-[#38BDF8]/30 text-xs font-mono text-[#38BDF8]">
            <Network className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>INTERCONNECTED TECHNICAL ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Engineering Knowledge Graph
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Explore how Shubham's foundations in Computer Science connect to hardware safety systems, physics-informed AI models, and robotics simulations.
          </p>
        </div>

        {/* Filter Controls & Zoom Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-3 rounded-2xl bg-[#0D1420] border border-[#253247]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Dimensions' },
              { id: 'foundation', label: 'Core Foundations' },
              { id: 'domain', label: 'Specialized Domains' },
              { id: 'technology', label: 'Toolchains & Frameworks' },
              { id: 'project', label: 'Implemented Projects' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  categoryFilter === tab.id
                    ? 'bg-[#38BDF8] text-[#070A12] shadow-md shadow-[#38BDF8]/20'
                    : 'bg-[#111B2B] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#162338]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Zoom & Reset Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1.5 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#38BDF8] border border-[#253247] transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-[#94A3B8] px-1">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1.5 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#38BDF8] border border-[#253247] transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setSelectedNodeId('alcohol_project');
                setCategoryFilter('all');
              }}
              className="p-1.5 rounded-lg bg-[#111B2B] text-[#94A3B8] hover:text-[#38BDF8] border border-[#253247] transition-colors ml-1"
              title="Reset View"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Graph Viewport & Node Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Interactive SVG Graph Area (8 cols) */}
          <div className="lg:col-span-8 relative rounded-3xl bg-[#090D16] border border-[#253247] p-4 sm:p-6 shadow-2xl overflow-hidden min-h-[520px] flex items-center justify-center">
            
            {/* Fine Graph Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#25324715_1px,transparent_1px),linear-gradient(to_bottom,#25324715_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div
              className="relative w-full h-[500px] transition-transform duration-300 origin-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <svg className="w-full h-full absolute inset-0 pointer-events-none">
                <defs>
                  <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="activeEdgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Render Interconnecting Network Edges */}
                {edges.map(({ from, to }, idx) => {
                  const isSourceSelected = from.id === selectedNodeId;
                  const isTargetSelected = to.id === selectedNodeId;
                  const isActiveEdge = isSourceSelected || isTargetSelected;

                  return (
                    <line
                      key={`edge-${idx}`}
                      x1={`${from.x}%`}
                      y1={`${from.y}%`}
                      x2={`${to.x}%`}
                      y2={`${to.y}%`}
                      stroke={isActiveEdge ? 'url(#activeEdgeGradient)' : '#253247'}
                      strokeWidth={isActiveEdge ? 2.5 : 1}
                      strokeDasharray={isActiveEdge ? '4 2' : 'none'}
                      className={isActiveEdge ? 'animate-pulse' : 'opacity-40'}
                    />
                  );
                })}
              </svg>

              {/* Render Interactive Graph Nodes */}
              {filteredNodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const isNeighbor = selectedNode.connectedTo.includes(node.id) || node.connectedTo.includes(selectedNode.id);
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
                    className={`absolute cursor-pointer select-none transition-all duration-300 z-10 flex flex-col items-center group`}
                  >
                    {/* Pulsing selection aura */}
                    {isSelected && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-30"
                        style={{ backgroundColor: color }}
                      />
                    )}

                    {/* Node Circle */}
                    <div
                      className={`rounded-full flex items-center justify-center transition-transform shadow-xl ${
                        isSelected
                          ? 'scale-125 ring-4 ring-offset-2 ring-offset-[#090D16]'
                          : isNeighbor
                          ? 'scale-110 ring-2 ring-opacity-60'
                          : 'group-hover:scale-110'
                      }`}
                      style={{
                        width: `${node.size * 1.5}px`,
                        height: `${node.size * 1.5}px`,
                        backgroundColor: isSelected ? color : '#111B2B',
                        border: `2px solid ${color}`,
                      }}
                    >
                      {node.category === 'foundation' && <Terminal className="w-4 h-4 text-white" />}
                      {node.category === 'domain' && <Brain className="w-4 h-4 text-white" />}
                      {node.category === 'technology' && <Cpu className="w-4 h-4 text-white" />}
                      {node.category === 'project' && <Zap className="w-4 h-4 text-white" />}
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

            {/* Bottom Legend */}
            <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#94A3B8] bg-[#070A12]/80 backdrop-blur-md px-3 py-2 rounded-xl border border-[#253247]">
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
              <span className="text-[#64748B]">Click any node to inspect details</span>
            </div>
          </div>

          {/* Node Inspector Details Card (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#0D1420] border border-[#253247] p-6 shadow-2xl space-y-5">
            {/* Header with status badge */}
            <div className="flex items-center justify-between gap-2 border-b border-[#253247] pb-4">
              <span
                className="text-xs font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                style={{
                  backgroundColor: `${getCategoryColor(selectedNode.category)}20`,
                  color: getCategoryColor(selectedNode.category),
                  border: `1px solid ${getCategoryColor(selectedNode.category)}40`
                }}
              >
                {selectedNode.category}
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {selectedNode.status}
              </span>
            </div>

            {/* Node Title & Description */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#F8FAFC] font-sans flex items-center gap-2">
                {selectedNode.label}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {/* Engineering Application */}
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-[#111B2B] border border-[#253247]">
              <h4 className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Practical Implementation
              </h4>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {selectedNode.application}
              </p>
            </div>

            {/* Interconnected Neighbors */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold text-[#94A3B8] uppercase tracking-wider">
                Direct Technical Linkages ({selectedNode.connectedTo.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.connectedTo.map((neighborId) => {
                  const neighbor = NODES.find((n) => n.id === neighborId);
                  if (!neighbor) return null;
                  return (
                    <button
                      key={neighborId}
                      onClick={() => setSelectedNodeId(neighborId)}
                      className="px-2.5 py-1 rounded-lg bg-[#162338] hover:bg-[#1E2D44] text-[#CBD5E1] hover:text-[#38BDF8] border border-[#253247] text-xs font-mono flex items-center gap-1 transition-colors"
                    >
                      <span>{neighbor.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-[#38BDF8]" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Link to Relevant Section */}
            <div className="pt-2">
              <a
                href={
                  selectedNode.category === 'project'
                    ? '#projects'
                    : selectedNode.category === 'domain' || selectedNode.category === 'technology'
                    ? '#engineering-labs'
                    : '#skills'
                }
                className="w-full py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#070A12] font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-md shadow-[#38BDF8]/20"
              >
                <span>Jump to Related Implementation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
