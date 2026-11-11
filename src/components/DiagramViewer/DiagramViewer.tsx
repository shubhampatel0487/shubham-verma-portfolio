import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Info,
  ShieldCheck,
  Sparkles,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Terminal,
  CircuitBoard,
  Play,
  Flame,
  Activity,
  Sliders,
  Check,
  AlertTriangle
} from 'lucide-react';

interface DiagramNode {
  id: string;
  name: string;
  refDes?: string; // Reference Designator e.g., U1, R1, Q1
  category: 'MCU' | 'Sensor' | 'Actuator' | 'Display' | 'Service' | 'Database' | 'Client' | 'Protocol';
  role: string;
  specs: string;
  pinoutOrEndpoint: string;
  voltageOrProtocol: string;
  status: string;
  tolerances?: string;
  currentDraw?: string;
}

interface ConnectionRow {
  component: string;
  pin: string;
  target: string;
  signal: string;
  voltage: string;
  wireColor: string;
  tolerances: string;
  currentDraw: string;
}

interface DiagramItem {
  id: string;
  title: string;
  shortTitle: string;
  type: 'Circuit Schematic' | 'System Architecture' | 'Data Flow' | 'Distributed Middleware';
  project: string;
  description: string;
  engineeringRationale: string;
  nodes: DiagramNode[];
  connections?: ConnectionRow[];
}

export const DiagramViewer: React.FC = () => {
  // Diagrams definition with authentic hardware & architectural schemas
  const diagrams: DiagramItem[] = [
    {
      id: "diag-alc-circuit",
      title: "AI + IoT Alcohol Detection — Detailed Hardware Circuit & EDA Schematic",
      shortTitle: "Alcohol Detection Circuit",
      type: "Circuit Schematic",
      project: "Alcohol Detection Safety System",
      description: "Production-grade electronics schematic interconnecting the ESP32 dual-core MCU, SnO2 semiconductor gas sensor, differential airflow breath transducer, optocoupled safety interlock relay, 1N4007 flyback suppression, and SSD1306 OLED display.",
      engineeringRationale: "Galvanic optical isolation (EL817 optocoupler with 3.75kVrms rating) separates the vehicle's inductive 12V starter solenoid circuit from the 3.3V ESP32 microcontroller logic, completely eliminating inductive flyback resets. A 10µF tantalum decoupling capacitor buffers the internal 12-bit SAR ADC reference against the MQ-3 heater's 150mA current draw.",
      nodes: [
        {
          id: "node-esp32",
          refDes: "U1",
          name: "ESP32 Xtensa Dual-Core MCU",
          category: "MCU",
          role: "Central real-time controller running FreeRTOS tasks for 50-sample moving average filtering, threshold detection, and fail-safe relay tripping.",
          specs: "240 MHz Dual-Core LX6, 520 KB SRAM, 12-bit SAR ADC (0-4095), calibrated 11dB attenuation",
          pinoutOrEndpoint: "GPIO 34 (ADC1_CH6), GPIO 35 (ADC1_CH7), GPIO 26 (Relay), GPIO 27 (PWM), GPIO 21/22 (I2C)",
          voltageOrProtocol: "3.3V Logic Level / 5V USB Vin",
          status: "Verified & Programmed",
          tolerances: "Vref Calibrated ±12mV",
          currentDraw: "80mA — 240mA (Peak RF)"
        },
        {
          id: "node-mq3",
          refDes: "U2",
          name: "MQ-3 Tin-Dioxide (SnO2) Sensor",
          category: "Sensor",
          role: "Semiconductor gas sensor measuring airborne ethanol concentration via SnO2 surface conductivity changes across load resistor RL.",
          specs: "Sensitivity: 0.04 mg/L – 4.0 mg/L ethanol vapor, 33Ω internal heater coil, analog output (0–3.3V)",
          pinoutOrEndpoint: "AOUT -> ESP32 GPIO 34 (ADC1_CH6)",
          voltageOrProtocol: "5.0V VCC / 3.3V Analog Signal",
          status: "Calibrated with baseline offset",
          tolerances: "RL = 10kΩ 1% Precision",
          currentDraw: "150mA (Heater Coil)"
        },
        {
          id: "node-airflow",
          refDes: "U3",
          name: "Differential Airflow Pressure Sensor",
          category: "Sensor",
          role: "Anti-bypass breath validator requiring sustained pulmonary exhalation (>= 120 Pa, >= 1.5s) before sensor reading is accepted.",
          specs: "Piezoresistive diaphragm transducer, differential output range 0-500 Pa, high noise immunity",
          pinoutOrEndpoint: "VOUT -> ESP32 GPIO 35 (ADC1_CH7)",
          voltageOrProtocol: "3.3V DC Analog",
          status: "Software Interlocked",
          tolerances: "Linearity: ±1.5% F.S.",
          currentDraw: "< 5mA"
        },
        {
          id: "node-relay",
          refDes: "K1 / U4",
          name: "5V Optocoupled Safety Relay",
          category: "Actuator",
          role: "Electromechanical interlock switch wired in series with the vehicle starter solenoid circuit. Active-LOW fail-safe cutoff.",
          specs: "10A 250VAC / 30VDC contacts, EL817 optoisolator barrier (3.75kVrms), 1N4007 flyback protection diode",
          pinoutOrEndpoint: "IN -> ESP32 GPIO 26, NC -> Starter Solenoid",
          voltageOrProtocol: "5V VCC / Optoisolated Trigger",
          status: "Fail-Safe Cutoff Armed",
          tolerances: "Contact Resistance: < 50mΩ",
          currentDraw: "70mA (Coil Active)"
        },
        {
          id: "node-oled",
          refDes: "DISP1",
          name: "0.96\" I2C OLED Display (SSD1306)",
          category: "Display",
          role: "Real-time driver telemetry dashboard displaying current alcohol concentration, system status, and countdown timers.",
          specs: "128x64 monochrome pixel matrix, 400 kHz fast I2C bus, 4.7kΩ pull-up resistors to 3.3V",
          pinoutOrEndpoint: "SDA -> GPIO 21, SCL -> GPIO 22",
          voltageOrProtocol: "3.3V I2C (Address 0x3C)",
          status: "Active Telemetry Screen",
          tolerances: "I2C Bus Pull-ups: 4.7kΩ",
          currentDraw: "15mA (Average)"
        },
        {
          id: "node-alarm",
          refDes: "LS1 / LED1-2",
          name: "Piezo Buzzer & Dual Status LEDs",
          category: "Actuator",
          role: "Multi-sensory alarm signaling: Green LED (Safe), Red LED (Threshold Exceeded), 2.4kHz Active Piezo Buzzer (85dB).",
          specs: "85dB acoustic piezo transducer, 5mm high-efficiency diffused LEDs with 330Ω current limiting resistors",
          pinoutOrEndpoint: "Buzzer -> GPIO 27, Red LED -> GPIO 12, Green LED -> GPIO 14",
          voltageOrProtocol: "3.3V Digital Output / PWM",
          status: "Real-time Multi-State Output",
          tolerances: "Current Limiting: 330Ω ±5%",
          currentDraw: "25mA (All Active)"
        }
      ],
      connections: [
        { component: "MQ-3 Gas Sensor (AOUT)", pin: "AOUT", target: "ESP32 GPIO 34 (ADC1_CH6)", signal: "Analog Voltage (0–3.3V)", voltage: "5V VCC / 3.3V Out", wireColor: "#F59E0B", tolerances: "RL = 10kΩ 1%", currentDraw: "150mA (Heater)" },
        { component: "Airflow Breath Sensor", pin: "VOUT", target: "ESP32 GPIO 35 (ADC1_CH7)", signal: "Analog Pressure Voltage", voltage: "3.3V DC", wireColor: "#38BDF8", tolerances: "Differential >120Pa", currentDraw: "< 5mA" },
        { component: "5V Optocoupled Relay", pin: "IN", target: "ESP32 GPIO 26", signal: "Digital Active-LOW Cutoff", voltage: "5V VCC / Optoisolated", wireColor: "#EF4444", tolerances: "EL817 Optocoupler", currentDraw: "70mA (Coil)" },
        { component: "Piezo Alarm Buzzer", pin: "Positive (+)", target: "ESP32 GPIO 27", signal: "PWM Audio Frequency (2.4kHz)", voltage: "3.3V PWM", wireColor: "#C084FC", tolerances: "SPL: 85dB @ 10cm", currentDraw: "15mA" },
        { component: "Red Alert LED (via 330Ω)", pin: "Anode (+)", target: "ESP32 GPIO 12", signal: "Digital HIGH on Trip", voltage: "3.3V Digital", wireColor: "#F43F5E", tolerances: "330Ω Current Limiter", currentDraw: "8mA" },
        { component: "Green Safe LED (via 330Ω)", pin: "Anode (+)", target: "ESP32 GPIO 14", signal: "Digital HIGH when Safe", voltage: "3.3V Digital", wireColor: "#10B981", tolerances: "330Ω Current Limiter", currentDraw: "8mA" },
        { component: "SSD1306 OLED (SDA/SCL)", pin: "SDA / SCL", target: "ESP32 GPIO 21 / 22", signal: "I2C Serial Data / Clock", voltage: "3.3V Logic (400kHz)", wireColor: "#60A5FA", tolerances: "4.7kΩ Pull-ups", currentDraw: "15mA" }
      ]
    },
    {
      id: "diag-asg-flow",
      title: "Digital Classroom — Enterprise Multi-Tier Architecture & Automated Evaluation Engine",
      shortTitle: "Assignment Checker Flow",
      type: "System Architecture",
      project: "Digital Classroom Platform",
      description: "End-to-end multi-tier pipeline connecting Teacher Room Generator, tokenized Student Upload Portal, AST & Rubric Scoring Engine, and automated PDF Certificate Compiler.",
      engineeringRationale: "Decoupled client-server architecture with stateful room hash tokens guarantees student submission integrity without requiring persistent backend database locking during peak submission windows. Deterministic rubric parser executes client-side code analysis with zero latency bottlenecks.",
      nodes: [
        {
          id: "node-teacher-portal",
          refDes: "Tier-1A",
          name: "Teacher Management Portal",
          category: "Client",
          role: "Configures assignment parameters, generates cryptographically signed room codes, defines scoring rubrics, and monitors cohort progress in real time.",
          specs: "React 18 + TypeScript SPA, reactive state hooks, responsive desktop/tablet dashboard",
          pinoutOrEndpoint: "/teacher/dashboard",
          voltageOrProtocol: "HTTPS / REST State API",
          status: "Live UI Verified"
        },
        {
          id: "node-student-portal",
          refDes: "Tier-1B",
          name: "Student Submission Workstation",
          category: "Client",
          role: "Student workspace for viewing prompts, entering assignment solutions, local markdown rendering, and cryptographically signed payload dispatch.",
          specs: "Client-side syntax validation, local draft persistence in localStorage",
          pinoutOrEndpoint: "/student/submit",
          voltageOrProtocol: "HTTPS Client Payload",
          status: "Live UI Verified"
        },
        {
          id: "node-session-router",
          refDes: "Tier-2A",
          name: "Room & Token Router (HMAC-SHA256)",
          category: "Service",
          role: "Validates active classroom sessions, enforces deadline timestamps, and manages cryptographic payload delivery with zero server locks.",
          specs: "Stateless session authority with expiry enforcement, SHA-256 integrity tokens",
          pinoutOrEndpoint: "/api/session/verify",
          voltageOrProtocol: "JSON / Tokenized Header",
          status: "Operational"
        },
        {
          id: "node-ingest-stream",
          refDes: "Tier-2B",
          name: "Multipart Payload Ingestion Buffer",
          category: "Service",
          role: "Handles multi-file student archives, sanitizes file buffers, enforces size ceilings (25MB limit), and unbundles code assets.",
          specs: "In-memory streaming unzipper, virus/script sanitization pass",
          pinoutOrEndpoint: "/api/submissions/upload",
          voltageOrProtocol: "Multipart/Form-Data",
          status: "High Throughput"
        },
        {
          id: "node-grading-core",
          refDes: "Tier-3A",
          name: "Automated Rubric Evaluation Engine",
          category: "Service",
          role: "Processes submitted assignments against rubric scoring criteria, calculating score weights, syntax deductions, and benchmark percentiles.",
          specs: "Algorithmic rubric parser, penalty calculators, multi-criteria score aggregator",
          pinoutOrEndpoint: "/services/evaluator",
          voltageOrProtocol: "Deterministic Compute",
          status: "Fully Evaluated"
        },
        {
          id: "node-ast-checker",
          refDes: "Tier-3B",
          name: "AST Syntax & Similarity Analyzer",
          category: "Service",
          role: "Abstract Syntax Tree inspection verifying structural code correctness, coding convention adherence, and semantic similarity checks.",
          specs: "Babel/TypeScript AST traversal, tokenized n-gram cosine similarity",
          pinoutOrEndpoint: "/services/ast-parser",
          voltageOrProtocol: "Static Code Analysis",
          status: "Deterministic"
        },
        {
          id: "node-pdf-engine",
          refDes: "Tier-4A",
          name: "Vector PDF Synthesis & Grade Export",
          category: "Service",
          role: "Compiles formatted evaluation certificates, performance summaries, and exportable grade reports for students and instructors.",
          specs: "Vector PDF synthesis with institutional branding, marks breakdown, and verification signatures",
          pinoutOrEndpoint: "/export/pdf-transcript",
          voltageOrProtocol: "Binary Document Blob",
          status: "Export Ready"
        }
      ],
      connections: [
        { component: "Teacher Portal", pin: "Create Session", target: "Room & Token Router", signal: "Session Init (Rubric + Deadline)", voltage: "JSON / REST", wireColor: "#38BDF8", tolerances: "Latency: < 50ms", currentDraw: "Stateless" },
        { component: "Student Portal", pin: "Submit Assignment", target: "Room & Token Router", signal: "Signed Student Payload", voltage: "JSON Payload", wireColor: "#10B981", tolerances: "SHA-256 Digest", currentDraw: "Client Payload" },
        { component: "Room Router", pin: "Deliver Submissions", target: "Payload Ingestion Buffer", signal: "Sanitized Stream Array", voltage: "Internal Bus", wireColor: "#C084FC", tolerances: "Zero Drop Guarantee", currentDraw: "In-Memory Stream" },
        { component: "Ingestion Buffer", pin: "Dispatch Code", target: "Rubric Evaluation Engine", signal: "Code Archive & Rubric Matrix", voltage: "Compute Bus", wireColor: "#F59E0B", tolerances: "Deterministic Parse", currentDraw: "CPU Compute" },
        { component: "Evaluation Engine", pin: "Generate Results", target: "Vector PDF Synthesis", signal: "Structured Scores & Rubric Marks", voltage: "Compute Output", wireColor: "#10B981", tolerances: "Deterministic Mark Matrix", currentDraw: "CPU Compute" },
        { component: "PDF Export", pin: "Download Transcript", target: "Student / Teacher Portal", signal: "Generated PDF Gradebook", voltage: "Binary Blob", wireColor: "#38BDF8", tolerances: "ISO 32000-1 PDF", currentDraw: "Binary Stream" }
      ]
    },
    {
      id: "diag-quiz-arch",
      title: "1QUIZ — Adaptive AI Quiz Engine & Dynamic Difficulty Architecture",
      shortTitle: "1QUIZ Adaptive Engine",
      type: "System Architecture",
      project: "1QUIZ Platform",
      description: "High-performance adaptive assessment architecture uniting dynamic question pools, Item Response Theory (IRT 2PL) capability estimation, instant answer validation, and streak analytics.",
      engineeringRationale: "Client-side deterministic evaluation ensures sub-10ms response latency upon answer click, delivering instant feedback and engaging gamified streak multipliers without waiting for server roundtrips. The 2-Parameter Logistic (2PL) model dynamically updates student ability index theta [-3.0 to +3.0].",
      nodes: [
        {
          id: "node-quiz-ui",
          refDes: "UI-Core",
          name: "60 FPS Gamified Quiz Client",
          category: "Client",
          role: "Interactive user interface rendering question cards, animated timer rings, option selectors, and immediate visual validation feedback.",
          specs: "React + Tailwind CSS, 60fps CSS animations, responsive touch buttons",
          pinoutOrEndpoint: "/quiz/session",
          voltageOrProtocol: "React DOM / Virtual Tree",
          status: "High Performance"
        },
        {
          id: "node-irt-engine",
          refDes: "AI-2PL",
          name: "Adaptive Difficulty Engine (IRT 2PL)",
          category: "Service",
          role: "Calculates real-time user capability estimate (theta) and dynamically pulls easier or harder questions based on rolling accuracy.",
          specs: "2-Parameter Logistic (2PL) Item Response Model, difficulty index theta [-3.0 to +3.0]",
          pinoutOrEndpoint: "/engine/irt/next-question",
          voltageOrProtocol: "Internal In-Memory Compute",
          status: "Algorithm Verified"
        },
        {
          id: "node-question-bank",
          refDes: "DB-Pool",
          name: "Curated Technical Question Matrix",
          category: "Database",
          role: "Categorized engineering question repository spanning Computer Science, Microcontrollers, Python OOP, and Robotics.",
          specs: "Structured JSON schema with difficulty tags, verified answer keys, and pedagogical explanations",
          pinoutOrEndpoint: "/data/quizBank.ts",
          voltageOrProtocol: "Static Asset / Zero Overhead",
          status: "Indexed & Validated"
        },
        {
          id: "node-scoring-tracker",
          refDes: "Score-Mux",
          name: "Instant Scoring & Streak Multiplexer",
          category: "Service",
          role: "Calculates instantaneous points based on response speed, base question difficulty, and consecutive correct answer multipliers.",
          specs: "Exponential time-decay scoring, +1.5x to 3.0x streak multiplier for consecutive correct answers",
          pinoutOrEndpoint: "/state/scoringSlice",
          voltageOrProtocol: "Synchronous State Reducer",
          status: "Instantaneous Validation"
        },
        {
          id: "node-analytics-summary",
          refDes: "Radar-Viz",
          name: "5-Axis Competency Radar Analytics",
          category: "Display",
          role: "Renders final skill radar chart, speed vs. accuracy curve, topic strengths, and recommended study tracks.",
          specs: "Canvas/SVG radar visualization, percentage distribution breakdown",
          pinoutOrEndpoint: "/quiz/summary",
          voltageOrProtocol: "SVG Visual Render",
          status: "Analytics Ready"
        }
      ],
      connections: [
        { component: "Quiz Client UI", pin: "Answer Click", target: "Instant Scoring Tracker", signal: "Selected Option Index + Timestamp", voltage: "User Event", wireColor: "#38BDF8", tolerances: "Latency: < 10ms", currentDraw: "Local Event" },
        { component: "Scoring Tracker", pin: "Verification Signal", target: "Adaptive Difficulty Engine", signal: "Correct/Incorrect + Time Taken", voltage: "Telemetry Stream", wireColor: "#10B981", tolerances: "IRT 2PL Weight", currentDraw: "In-Memory" },
        { component: "Adaptive Engine", pin: "Query Next", target: "Technical Question Bank", signal: "Difficulty Index & Category Filter", voltage: "Schema Query", wireColor: "#C084FC", tolerances: "Theta Range [-3,+3]", currentDraw: "JSON Query" },
        { component: "Question Bank", pin: "Inject Question", target: "Quiz Client UI", signal: "Rendered Question & Options", voltage: "Component Props", wireColor: "#F59E0B", tolerances: "Zero Overhead", currentDraw: "Static Prop" },
        { component: "Scoring Tracker", pin: "Session Finished", target: "Post-Quiz Competency Analytics", signal: "Aggregated Score & Time Series", voltage: "Final Payload", wireColor: "#38BDF8", tolerances: "5-Axis Distribution", currentDraw: "Report Payload" }
      ]
    },
    {
      id: "diag-ros2-drone",
      title: "Autonomous Robotics & Drone — Distributed Telemetry Pipeline (ROS 2 / PX4)",
      shortTitle: "ROS 2 & Drone Pipeline",
      type: "Distributed Middleware",
      project: "Robotics & Drone Systems",
      description: "Distributed publish-subscribe messaging topology connecting onboard avionics sensor suites, PX4 flight controllers, ROS 2 Humble DDS topics, and ground control telemetry.",
      engineeringRationale: "Decentralized Data Distribution Service (DDS) architecture guarantees deterministic real-time communication across sensor publishers and actuation subscribers with zero single-point-of-failure bottlenecks. Micro-XRCE-DDS bridge serializes MAVLink and uORB messages into standard ROS 2 message types.",
      nodes: [
        {
          id: "node-sensor-suite",
          refDes: "Avionics-HW",
          name: "Avionics & Sensor Suite",
          category: "Sensor",
          role: "High-rate environmental telemetry acquisition: 9-DOF IMU, optical flow camera, barometric altimeter, and GPS magnetometer.",
          specs: "SPI/I2C digital sensor bus, 200 Hz IMU rate, microsecond timestamp synchronization",
          pinoutOrEndpoint: "SPI Bus -> Microcontroller",
          voltageOrProtocol: "3.3V High-Speed SPI (20MHz)",
          status: "Bench Telemetry Active"
        },
        {
          id: "node-px4-fcu",
          refDes: "FMU-Core",
          name: "PX4 Autopilot Flight Controller",
          category: "MCU",
          role: "Runs low-level Extended Kalman Filter (EKF2) attitude estimation, PID rate loops, and brushless motor PWM actuation.",
          specs: "ARM Cortex-M7 Core, real-time NuttX RTOS kernel, 400 Hz ESC motor mixing",
          pinoutOrEndpoint: "PWM CH1-CH4 -> Electronic Speed Controllers",
          voltageOrProtocol: "5V Power / 400Hz DShot PWM",
          status: "SITL Flight Verified"
        },
        {
          id: "node-ros2-dds",
          refDes: "DDS-Bridge",
          name: "ROS 2 Humble DDS Middleware",
          category: "Protocol",
          role: "Zero-copy publish/subscribe messaging bus routing vehicle odometry, velocity setpoints, and camera image streams.",
          specs: "Fast-DDS / CycloneDDS middleware, CDR serialized standard ROS 2 topic types",
          pinoutOrEndpoint: "/fmu/out/vehicle_odometry, /cmd_vel",
          voltageOrProtocol: "UDP / Ethernet Middleware",
          status: "DDS Topics Operational"
        },
        {
          id: "node-nav-core",
          refDes: "Nav-Compute",
          name: "Autonomous Trajectory Planner",
          category: "Service",
          role: "Computes 3D polynomial trajectory waypoints, collision avoidance vectors, and return-to-launch (RTL) safety paths.",
          specs: "Geometric collision checking, cubic spline generation, dynamic velocity limits",
          pinoutOrEndpoint: "/trajectory_generator",
          voltageOrProtocol: "ROS 2 Action Client",
          status: "Simulation Validated"
        },
        {
          id: "node-gcs-telemetry",
          refDes: "GCS-HUD",
          name: "Ground Station Telemetry UI",
          category: "Display",
          role: "Real-time pilot monitoring station displaying 3D attitude artificial horizon, battery state-of-charge, altitude, and manual override.",
          specs: "QGroundControl / Custom Web Telemetry, 10Hz telemetry down-link",
          pinoutOrEndpoint: "/telemetry/downlink",
          voltageOrProtocol: "MAVLink v2 / WebSockets",
          status: "Telemetry Linked"
        }
      ],
      connections: [
        { component: "Avionics Sensor Suite", pin: "Raw IMU Data", target: "PX4 Autopilot FCU", signal: "High-rate Accelerometer & Gyro (200Hz)", voltage: "SPI Bus (20MHz)", wireColor: "#38BDF8", tolerances: "Noise: < 0.05 mg", currentDraw: "12mA" },
        { component: "PX4 Autopilot FCU", pin: "State Estimation", target: "ROS 2 DDS Middleware", signal: "/fmu/out/vehicle_odometry (100Hz)", voltage: "DDS UDP Protocol", wireColor: "#10B981", tolerances: "EKF2 Covariance < 0.02", currentDraw: "180mA" },
        { component: "ROS 2 Middleware", pin: "Odometry Topic", target: "Autonomous Trajectory Planner", signal: "Vehicle 3D Pose & Velocity Vector", voltage: "ROS 2 Subscription", wireColor: "#C084FC", tolerances: "Zero-Copy Shared Mem", currentDraw: "Compute Task" },
        { component: "Autonomous Planner", pin: "Trajectory Commands", target: "ROS 2 DDS Middleware", signal: "/fmu/in/trajectory_setpoint (50Hz)", voltage: "ROS 2 Publisher", wireColor: "#F59E0B", tolerances: "Cubic Spline Jitter < 2ms", currentDraw: "Compute Task" },
        { component: "ROS 2 Middleware", pin: "Telemetry Bridge", target: "Ground Station Telemetry UI", signal: "Attitude, Battery & Altitude Telemetry", voltage: "MAVLink v2 / WebSockets", wireColor: "#38BDF8", tolerances: "10Hz Downlink Rate", currentDraw: "Network Stream" }
      ]
    }
  ];

  const [activeDiagram, setActiveDiagram] = useState<DiagramItem>(diagrams[0]);
  const [selectedNode, setSelectedNode] = useState<DiagramNode>(diagrams[0].nodes[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'connections' | 'rationale'>('visual');

  // Interactive Live Simulation States for Each Diagram:
  // 1. Alcohol Circuit: Normal Safe (0.00% BAC) vs Intoxicated Spike (0.06% BAC / Relay Tripped)
  const [alcSimMode, setAlcSimMode] = useState<'safe' | 'spike'>('safe');
  
  // 2. Assignment Checker: Step 0=Idle, 1=Student Submit, 2=Token Verified, 3=Rubric Scored, 4=PDF Ready
  const [asgSimStep, setAsgSimStep] = useState<number>(0);
  const [isAsgRunning, setIsAsgRunning] = useState<boolean>(false);

  // 3. 1QUIZ Engine: Streak count (0 to 4) & Theta ability index (-2 to +2.5)
  const [quizStreak, setQuizStreak] = useState<number>(3);
  const [quizTheta, setQuizTheta] = useState<number>(1.2);

  // 4. ROS 2 Drone: Mode ('hover' | 'waypoint' | 'rtl')
  const [droneMode, setDroneMode] = useState<'hover' | 'waypoint' | 'rtl'>('waypoint');

  const handleSelectDiagram = (d: DiagramItem) => {
    setActiveDiagram(d);
    setSelectedNode(d.nodes[0]);
    setZoomLevel(1);
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(1.8, +(z + 0.15).toFixed(2)));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.7, +(z - 0.15).toFixed(2)));
  const handleResetZoom = () => setZoomLevel(1);

  // Run assignment pipeline step-by-step
  const triggerAssignmentSimulation = () => {
    if (isAsgRunning) return;
    setIsAsgRunning(true);
    setAsgSimStep(1);
    setTimeout(() => setAsgSimStep(2), 800);
    setTimeout(() => setAsgSimStep(3), 1600);
    setTimeout(() => {
      setAsgSimStep(4);
      setIsAsgRunning(false);
    }, 2400);
  };

  const handleDownloadSVG = () => {
    const svgElement = document.getElementById(`interactive-svg-${activeDiagram.id}`);
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `${activeDiagram.id}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  return (
    <section id="diagrams" className="py-20 sm:py-28 relative z-10 border-t border-[#253247]/60 bg-[#070D18]/95 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] border border-[#38BDF8]/30 shadow-sm shadow-[#38BDF8]/10">
            <CircuitBoard className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>04 // Interactive Engineering Blueprints</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
            Interactive Technical Diagrams &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC]">Circuit Schematics</span>
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            Directly inspect verified microcontroller pinouts, sensor wiring, signal voltage levels, and multi-tier distributed architectures. Tap any component to inspect its live hardware specifications.
          </p>

          {/* Plain-English Visitor Guide Box */}
          <div className="p-3 sm:p-4 rounded-2xl bg-[#0B1528] border border-cyan-500/20 text-left font-sans text-xs text-slate-300 flex items-start gap-3 shadow-lg">
            <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5 font-mono text-[11px] uppercase tracking-wider text-cyan-400">
                How to explore these interactive blueprints:
              </span>
              <p className="leading-relaxed">
                Neeche diye gaye 4 engineering diagrams me se kisi ko bhi select karein. Har diagram ke andar <strong>Live Interactive Simulation controls</strong> hain (e.g. Alcohol Spike trigger karna, Assignment pipeline run karna, ya Drone telemetry mode badalna). Wires par animated signal packets flow hote dekhein aur kisi bhi component par click karke uski exact voltage, pinout aur tolerances inspect karein.
              </p>
            </div>
          </div>
        </div>

        {/* Diagram Switcher: 4-Card Responsive Engineering Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {diagrams.map((d, index) => {
            const isSelected = activeDiagram.id === d.id;
            return (
              <button
                key={d.id}
                onClick={() => handleSelectDiagram(d)}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 relative flex flex-col justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#0F1E3D] via-[#0B152B] to-[#070D1A] border-cyan-400 shadow-xl shadow-cyan-500/20 ring-1 ring-cyan-400 scale-[1.02]'
                    : 'bg-[#0B1325]/90 border-[#253247] hover:border-slate-500 hover:bg-[#0E172A]'
                }`}
              >
                {/* Top Row: Index Badge & Type Badge */}
                <div className="flex items-center justify-between mb-2.5 w-full">
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-cyan-400 text-slate-950 font-black shadow-md shadow-cyan-400/40'
                        : 'bg-[#111B2B] text-slate-300 border border-[#253247] group-hover:border-slate-500'
                    }`}
                  >
                    0{index + 1}
                  </span>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md border tracking-wider uppercase transition-colors ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 font-bold'
                        : 'bg-[#111B2B] text-slate-400 border-[#253247]'
                    }`}
                  >
                    {d.type}
                  </span>
                </div>

                {/* Main Title & Subtitle */}
                <div className="space-y-1">
                  <h4
                    className={`text-sm sm:text-base font-bold font-sans transition-colors leading-snug ${
                      isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                    }`}
                  >
                    {d.shortTitle}
                  </h4>
                  <p className="text-[11px] font-mono text-purple-400/90 truncate">
                    {d.project}
                  </p>
                </div>

                {/* Bottom Active Status Bar */}
                <div className="mt-3.5 pt-2.5 border-t border-[#1E293B] flex items-center justify-between text-[11px] font-mono">
                  <span className={isSelected ? 'text-cyan-400 font-bold flex items-center gap-1.5' : 'text-slate-500 group-hover:text-slate-300'}>
                    {isSelected ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                        ACTIVE BLUEPRINT
                      </>
                    ) : (
                      'Tap to View'
                    )}
                  </span>
                  <span className={`text-[10px] ${isSelected ? 'text-cyan-300' : 'text-slate-600'}`}>
                    #{index + 1}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Diagram Viewer Enclosure */}
        <div className={`rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0C1425] via-[#0A101F] to-[#070D18] border border-cyan-500/30 shadow-2xl overflow-hidden transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50 overflow-y-auto bg-[#070D18]' : ''}`}>
          
          {/* Top Control Bar */}
          <div className="px-4 sm:px-6 py-3.5 bg-[#0A1120] border-b border-[#253247] flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase font-bold">
                  {activeDiagram.type}
                </span>
                <span className="text-xs font-mono text-purple-400">
                  {activeDiagram.project}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white font-sans truncate max-w-md sm:max-w-xl">
                {activeDiagram.title}
              </h3>
            </div>

            {/* View Mode Tabs & Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex items-center bg-[#111B2B] p-1 rounded-lg border border-[#253247]">
                <button
                  onClick={() => setActiveTab('visual')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    activeTab === 'visual' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Blueprint
                </button>
                <button
                  onClick={() => setActiveTab('connections')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    activeTab === 'connections' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pinout Matrix
                </button>
                <button
                  onClick={() => setActiveTab('rationale')}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    activeTab === 'rationale' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Rationale
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center gap-1 bg-[#111B2B] p-1 rounded-lg border border-[#253247]">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded hover:bg-[#1C283F] text-slate-400 hover:text-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-cyan-400 px-1 font-semibold">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded hover:bg-[#1C283F] text-slate-400 hover:text-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 rounded hover:bg-[#1C283F] text-slate-400 hover:text-white transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Fullscreen / Download */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-slate-400 hover:text-white border border-[#253247] transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={handleDownloadSVG}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors"
                title="Download Standalone SVG"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Export SVG</span>
              </button>
            </div>
          </div>

          {/* Blueprint Canvas Viewport */}
          {activeTab === 'visual' && (
            <div className="relative bg-[#060A14] overflow-hidden p-3 sm:p-6 select-none">
              
              {/* TOP INTERACTIVE SIMULATION DOCK (Tailored per diagram) */}
              <div className="mb-4 p-2.5 sm:p-3 rounded-xl bg-[#091122] border border-[#253247] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                
                {/* 1. Alcohol Circuit Simulator Controls */}
                {activeDiagram.id === 'diag-alc-circuit' && (
                  <div className="flex flex-wrap items-center gap-2 w-full justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                        <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                        Live Circuit Signal State:
                      </span>
                      <button
                        onClick={() => setAlcSimMode('safe')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          alcSimMode === 'safe'
                            ? 'bg-emerald-500 text-slate-950 shadow-sm'
                            : 'bg-[#111B2B] text-slate-400 hover:text-white border border-[#253247]'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        Clean Air (0.00% BAC) &bull; Starter Armed
                      </button>
                      <button
                        onClick={() => setAlcSimMode('spike')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          alcSimMode === 'spike'
                            ? 'bg-red-500 text-white shadow-sm'
                            : 'bg-[#111B2B] text-slate-400 hover:text-white border border-[#253247]'
                        }`}
                      >
                        <AlertTriangle className="w-3 h-3" />
                        Alcohol Spike (185 PPM) &bull; Interlock Cutoff
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>ADC: <strong className={alcSimMode === 'safe' ? 'text-cyan-400' : 'text-red-400'}>{alcSimMode === 'safe' ? '0.33V (415)' : '2.45V (3040)'}</strong></span>
                      <span>Relay: <strong className={alcSimMode === 'safe' ? 'text-emerald-400' : 'text-red-400'}>{alcSimMode === 'safe' ? 'CLOSED (PASS)' : 'OPEN (CUTOFF)'}</strong></span>
                    </div>
                  </div>
                )}

                {/* 2. Assignment Checker Simulator Controls */}
                {activeDiagram.id === 'diag-asg-flow' && (
                  <div className="flex flex-wrap items-center gap-2 w-full justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={triggerAssignmentSimulation}
                        disabled={isAsgRunning}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isAsgRunning
                            ? 'bg-purple-600 text-white animate-pulse'
                            : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        {isAsgRunning ? 'Running Submission Pipeline...' : '▶ Simulate Assignment Submission'}
                      </button>
                      <span className="text-[11px] text-slate-400">
                        {asgSimStep === 0 && 'Ready to submit student code payload.'}
                        {asgSimStep === 1 && '1/4: Student IDE encrypts and signs payload (SHA-256)...'}
                        {asgSimStep === 2 && '2/4: Room Router authenticates token and timestamp...'}
                        {asgSimStep === 3 && '3/4: Rubric Evaluation Core scoring code against benchmarks...'}
                        {asgSimStep === 4 && '4/4: PDF Certificate Synthesized! Grade: 94/100 (A+) ✓'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <span
                          key={step}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            asgSimStep >= step ? 'bg-cyan-400 scale-110 shadow-sm shadow-cyan-400/50' : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. 1QUIZ Adaptive Engine Simulator Controls */}
                {activeDiagram.id === 'diag-quiz-arch' && (
                  <div className="flex flex-wrap items-center gap-2 w-full justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        Test Student Response:
                      </span>
                      <button
                        onClick={() => {
                          setQuizStreak((s) => Math.min(5, s + 1));
                          setQuizTheta((t) => Math.min(2.8, +(t + 0.4).toFixed(1)));
                        }}
                        className="px-2.5 py-1 rounded bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold transition-all text-xs"
                      >
                        + Correct (Boost Theta &amp; Streak)
                      </button>
                      <button
                        onClick={() => {
                          setQuizStreak(0);
                          setQuizTheta((t) => Math.max(-2.0, +(t - 0.5).toFixed(1)));
                        }}
                        className="px-2.5 py-1 rounded bg-red-600/80 hover:bg-red-500 text-white font-bold transition-all text-xs"
                      >
                        ✕ Wrong (Reset Streak)
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-300 flex items-center gap-3">
                      <span>Theta (Ability): <strong className="text-purple-400">{quizTheta >= 0 ? `+${quizTheta}` : quizTheta}σ</strong></span>
                      <span>Streak: <strong className="text-amber-400">{quizStreak}x ({quizStreak >= 3 ? '🔥 2.0x Combo' : '1.0x'})</strong></span>
                      <span>Difficulty: <strong className="text-cyan-400">{quizTheta > 1.5 ? 'EXPERT' : quizTheta > 0 ? 'INTERMEDIATE' : 'FOUNDATIONAL'}</strong></span>
                    </div>
                  </div>
                )}

                {/* 4. ROS 2 Drone Telemetry Controls */}
                {activeDiagram.id === 'diag-ros2-drone' && (
                  <div className="flex flex-wrap items-center gap-2 w-full justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" />
                        Flight Control State:
                      </span>
                      <button
                        onClick={() => setDroneMode('hover')}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                          droneMode === 'hover' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-[#111B2B] text-slate-400 hover:text-white border border-[#253247]'
                        }`}
                      >
                        Stationary Hover (10Hz)
                      </button>
                      <button
                        onClick={() => setDroneMode('waypoint')}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                          droneMode === 'waypoint' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-[#111B2B] text-slate-400 hover:text-white border border-[#253247]'
                        }`}
                      >
                        Waypoint Trajectory (100Hz DDS)
                      </button>
                      <button
                        onClick={() => setDroneMode('rtl')}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                          droneMode === 'rtl' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-[#111B2B] text-slate-400 hover:text-white border border-[#253247]'
                        }`}
                      >
                        Emergency Return-to-Launch (RTL)
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>DDS Topic: <strong className="text-cyan-400">/fmu/out/vehicle_odometry</strong></span>
                      <span>Rate: <strong className="text-emerald-400">{droneMode === 'waypoint' ? '100 Hz' : droneMode === 'hover' ? '20 Hz' : '50 Hz'}</strong></span>
                    </div>
                  </div>
                )}

              </div>

              {/* Quick Component Clickable Selector Pill Bar */}
              <div className="mb-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Tap Node to Inspect:
                </span>
                {activeDiagram.nodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      selectedNode.id === node.id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-[#111B2B] text-slate-300 hover:text-white border border-[#253247]'
                    }`}
                  >
                    {node.refDes && (
                      <span className={`text-[9px] px-1 rounded ${selectedNode.id === node.id ? 'bg-slate-900/40 text-slate-950 font-bold' : 'bg-cyan-500/20 text-cyan-300'}`}>
                        {node.refDes}
                      </span>
                    )}
                    <span>
                      {node.name.includes('Airflow')
                        ? 'Airflow Sensor'
                        : node.name.includes('ESP32')
                        ? 'ESP32 MCU'
                        : node.name.includes('OLED')
                        ? 'OLED Display'
                        : node.name.includes('Relay')
                        ? '5V Relay'
                        : node.name.includes('Buzzer')
                        ? 'Alarm / LEDs'
                        : node.name.includes('Teacher')
                        ? 'Teacher Portal'
                        : node.name.includes('Student')
                        ? 'Student Workstation'
                        : node.name.includes('Token')
                        ? 'Token Router'
                        : node.name.includes('Ingest')
                        ? 'Ingest Buffer'
                        : node.name.includes('Rubric')
                        ? 'Rubric Evaluator'
                        : node.name.includes('PDF')
                        ? 'PDF Synthesis'
                        : node.name.includes('Quiz')
                        ? 'Quiz UI'
                        : node.name.includes('IRT')
                        ? 'IRT 2PL Engine'
                        : node.name.includes('Question')
                        ? 'Question Bank'
                        : node.name.includes('Streak')
                        ? 'Score Multiplexer'
                        : node.name.includes('Radar')
                        ? 'Competency Radar'
                        : node.name.includes('Avionics')
                        ? '9-DOF Avionics'
                        : node.name.includes('PX4')
                        ? 'PX4 Autopilot'
                        : node.name.includes('Trajectory')
                        ? 'Trajectory Planner'
                        : node.name.includes('Ground')
                        ? 'Ground Station'
                        : node.name.split(' (')[0].split(' — ')[0]}
                    </span>
                    {selectedNode.id === node.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>

              {/* SVG Canvas Container with Zoom Transform */}
              <div 
                className="w-full flex items-center justify-center min-h-[420px] sm:min-h-[520px] transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
              >
                
                {/* 1. ESP32 ALCOHOL DETECTION EDA CIRCUIT SCHEMATIC */}
                {activeDiagram.id === 'diag-alc-circuit' && (
                  <svg
                    id="interactive-svg-diag-alc-circuit"
                    viewBox="0 0 1020 580"
                    className="w-full h-auto max-h-[560px] drop-shadow-2xl"
                  >
                    <defs>
                      <linearGradient id="grid-alc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0B132B" />
                        <stop offset="100%" stopColor="#060A14" />
                      </linearGradient>
                      <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                      <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Canvas Background Grid (KiCad / Altium CAD style) */}
                    <rect width="1020" height="580" rx="16" fill="url(#grid-alc-grad)" stroke="#1E293B" strokeWidth="1.5" />
                    
                    {/* CAD Schematic Grid Crosshairs / Dots */}
                    <g opacity="0.15" stroke="#38BDF8" strokeWidth="0.5">
                      {[...Array(26)].map((_, i) => (
                        <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="580" strokeDasharray="1 3" />
                      ))}
                      {[...Array(15)].map((_, i) => (
                        <line key={`h-${i}`} x1="0" y1={i * 40} x2="1020" y2={i * 40} strokeDasharray="1 3" />
                      ))}
                    </g>

                    {/* CAD Drawing Sheet Title Block Frame */}
                    <rect x="20" y="20" width="980" height="540" fill="none" stroke="#253247" strokeWidth="1.5" />
                    <rect x="740" y="500" width="260" height="60" fill="#0C1425" stroke="#253247" strokeWidth="1" />
                    <text x="750" y="518" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold">DWG: ALC-DET-REV-2.4</text>
                    <text x="750" y="534" fill="#94A3B8" fontSize="9" fontFamily="monospace">PROJECT: AUTOMOTIVE ALCOHOL INTERLOCK</text>
                    <text x="750" y="548" fill="#10B981" fontSize="8" fontFamily="monospace">STATUS: BENCH VALIDATED ✓</text>

                    {/* VOLTAGE RAILS */}
                    {/* +5V VCC RAIL (TOP) */}
                    <path d="M 40 45 H 980" stroke="#EF4444" strokeWidth="2" strokeDasharray="6 3" opacity="0.5" />
                    <text x="45" y="38" fill="#EF4444" fontSize="9" fontFamily="monospace" fontWeight="bold">+5V VCC POWER RAIL (HEATER &amp; RELAY SUPPLY)</text>

                    {/* +3.3V VCC RAIL */}
                    <path d="M 40 70 H 980" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                    <text x="45" y="65" fill="#F59E0B" fontSize="8" fontFamily="monospace">+3.3V REGULATED LOGIC RAIL (ESP32 / I2C / AIRFLOW)</text>
                    
                    {/* COMMON GROUND RAIL (BOTTOM) */}
                    <path d="M 40 485 H 980" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6 3" opacity="0.5" />
                    <text x="45" y="502" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="bold">GND // STAR COMMON GROUND RAIL (0V REFERENCE)</text>

                    {/* LIVE ELECTRON / SIGNAL ANIMATION PATHWAYS */}
                    {/* Wire 1: MQ-3 AOUT -> ESP32 GPIO 34 */}
                    <path d="M 230 150 H 380 V 230 H 420" fill="none" stroke={alcSimMode === 'safe' ? '#F59E0B' : '#EF4444'} strokeWidth="2.5" />
                    <text x="270" y="142" fill={alcSimMode === 'safe' ? '#F59E0B' : '#EF4444'} fontSize="9" fontFamily="monospace">
                      {alcSimMode === 'safe' ? 'ADC1_CH6 (0.33V Baseline)' : 'ADC1_CH6 (2.45V SPIKE!)'}
                    </text>
                    <circle r="4" fill={alcSimMode === 'safe' ? '#F59E0B' : '#EF4444'}>
                      <animateMotion path="M 230 150 H 380 V 230 H 420" dur={alcSimMode === 'safe' ? '2.5s' : '0.9s'} repeatCount="indefinite" />
                    </circle>

                    {/* Resistor RL = 10kΩ pull-down to GND for MQ-3 */}
                    <path d="M 230 150 V 200" stroke="#F59E0B" strokeWidth="1.5" />
                    {/* Zigzag Resistor Symbol */}
                    <path d="M 230 200 l -4 3 l 8 6 l -8 6 l 8 6 l -8 6 l 4 3" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
                    <text x="242" y="218" fill="#F59E0B" fontSize="8" fontFamily="monospace">RL=10kΩ</text>
                    <path d="M 230 230 V 260" stroke="#F59E0B" strokeWidth="1.5" />
                    {/* Ground Symbol */}
                    <path d="M 222 260 H 238 M 225 264 H 235 M 228 268 H 232" stroke="#38BDF8" strokeWidth="1.5" />

                    {/* Wire 2: Airflow -> ESP32 GPIO 35 */}
                    <path d="M 230 380 H 380 V 320 H 420" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
                    <text x="260" y="372" fill="#38BDF8" fontSize="9" fontFamily="monospace">Pressure (P &gt;= 120 Pa) GPIO 35</text>
                    <circle r="4" fill="#38BDF8">
                      <animateMotion path="M 230 380 H 380 V 320 H 420" dur="2.0s" repeatCount="indefinite" />
                    </circle>

                    {/* Wire 3: ESP32 GPIO 26 -> Optocoupler EL817 -> Relay */}
                    <path d="M 540 230 H 640 V 160 H 700" fill="none" stroke={alcSimMode === 'safe' ? '#10B981' : '#EF4444'} strokeWidth="2.5" />
                    <text x="560" y="180" fill={alcSimMode === 'safe' ? '#10B981' : '#EF4444'} fontSize="9" fontFamily="monospace">
                      GPIO 26: {alcSimMode === 'safe' ? 'LOW (Armed)' : 'HIGH (Cutoff)'}
                    </text>
                    <circle r="4" fill={alcSimMode === 'safe' ? '#10B981' : '#EF4444'}>
                      <animateMotion path="M 540 230 H 640 V 160 H 700" dur={alcSimMode === 'safe' ? '1.8s' : '0.6s'} repeatCount="indefinite" />
                    </circle>

                    {/* Wire 4: ESP32 GPIO 27 -> Piezo Alarm & GPIO 12/14 LEDs */}
                    <path d="M 540 320 H 640 V 380 H 700" fill="none" stroke="#C084FC" strokeWidth="2.5" />
                    <text x="560" y="370" fill="#C084FC" fontSize="9" fontFamily="monospace">GPIO 27: PWM 2.4kHz</text>
                    <circle r="4" fill="#C084FC">
                      <animateMotion path="M 540 320 H 640 V 380 H 700" dur="1.5s" repeatCount="indefinite" />
                    </circle>

                    {/* Wire 5: ESP32 I2C (GPIO 21/22) -> SSD1306 Display */}
                    <path d="M 480 170 V 105" fill="none" stroke="#60A5FA" strokeWidth="2" />
                    <text x="495" y="140" fill="#60A5FA" fontSize="8" fontFamily="monospace">I2C (400kHz)</text>
                    <circle r="3" fill="#60A5FA">
                      <animateMotion path="M 480 170 V 105" dur="1.2s" repeatCount="indefinite" />
                    </circle>

                    {/* Wire 6: Relay Output -> Starter Ignition Motor */}
                    <path d="M 870 160 H 940" fill="none" stroke={alcSimMode === 'safe' ? '#10B981' : '#EF4444'} strokeWidth={alcSimMode === 'safe' ? '3' : '1.5'} strokeDasharray={alcSimMode === 'safe' ? undefined : '4 3'} />
                    <circle cx="940" cy="160" r="6" fill={alcSimMode === 'safe' ? '#10B981' : '#EF4444'} />
                    <text x="880" y="148" fill={alcSimMode === 'safe' ? '#10B981' : '#EF4444'} fontSize="9" fontFamily="monospace" fontWeight="bold">
                      {alcSimMode === 'safe' ? '12V SOLENOID [CLOSED]' : '12V SOLENOID [DISCONNECTED]'}
                    </text>

                    {/* COMPONENT 1: MQ-3 GAS SENSOR MODULE (U2) */}
                    <g 
                      onClick={() => setSelectedNode(activeDiagram.nodes[1])}
                      className="cursor-pointer group"
                      transform="translate(60, 95)"
                    >
                      <rect 
                        width="170" 
                        height="130" 
                        rx="12" 
                        fill="#0E172A" 
                        stroke={selectedNode.id === 'node-mq3' ? '#38BDF8' : '#253247'} 
                        strokeWidth={selectedNode.id === 'node-mq3' ? '3' : '1.5'} 
                        className="transition-all"
                      />
                      <rect x="10" y="8" width="36" height="18" rx="4" fill="#1E293B" />
                      <text x="28" y="20" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">U2</text>
                      
                      {/* Sensor Mesh Circle */}
                      <circle cx="48" cy="55" r="24" fill="#162238" stroke="#F59E0B" strokeWidth="2" />
                      <circle cx="48" cy="55" r="14" fill="#0E172A" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
                      <text x="48" y="59" fill="#F59E0B" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">SnO2</text>
                      
                      <text x="86" y="46" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">MQ-3 GAS SENSOR</text>
                      <text x="86" y="62" fill="#94A3B8" fontSize="8" fontFamily="monospace">Heater: 5V (33Ω)</text>
                      <text x="86" y="76" fill="#F59E0B" fontSize="8" fontFamily="monospace">RL = 10kΩ Precision</text>
                      
                      <rect x="15" y="96" width="140" height="22" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="85" y="111" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">PIN: GPIO 34 (ADC1_6)</text>
                    </g>

                    {/* COMPONENT 2: AIRFLOW SENSOR MODULE (U3) */}
                    <g 
                      onClick={() => setSelectedNode(activeDiagram.nodes[2])}
                      className="cursor-pointer group"
                      transform="translate(60, 320)"
                    >
                      <rect 
                        width="170" 
                        height="130" 
                        rx="12" 
                        fill="#0E172A" 
                        stroke={selectedNode.id === 'node-airflow' ? '#38BDF8' : '#253247'} 
                        strokeWidth={selectedNode.id === 'node-airflow' ? '3' : '1.5'} 
                        className="transition-all"
                      />
                      <rect x="10" y="8" width="36" height="18" rx="4" fill="#1E293B" />
                      <text x="28" y="20" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">U3</text>

                      <rect x="25" y="38" width="40" height="34" rx="6" fill="#162238" stroke="#38BDF8" strokeWidth="1.5" />
                      <path d="M 33 55 Q 45 42 57 55" fill="none" stroke="#38BDF8" strokeWidth="2" />
                      <text x="82" y="48" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">AIRFLOW TRANSDUCER</text>
                      <text x="82" y="64" fill="#94A3B8" fontSize="8" fontFamily="monospace">Piezoresistive Diaph</text>
                      <text x="82" y="78" fill="#38BDF8" fontSize="8" fontFamily="monospace">Limit: &gt;= 120 Pa</text>
                      
                      <rect x="15" y="96" width="140" height="22" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="85" y="111" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">PIN: GPIO 35 (ADC1_7)</text>
                    </g>

                    {/* COMPONENT 3: ESP32 MCU (U1 CENTER SILICON) */}
                    <g 
                      onClick={() => setSelectedNode(activeDiagram.nodes[0])}
                      className="cursor-pointer group"
                      transform="translate(420, 170)"
                    >
                      <rect 
                        width="120" 
                        height="200" 
                        rx="14" 
                        fill="#091224" 
                        stroke={selectedNode.id === 'node-esp32' ? '#38BDF8' : '#38BDF8'} 
                        strokeWidth={selectedNode.id === 'node-esp32' ? '3.5' : '2'} 
                        filter={selectedNode.id === 'node-esp32' ? 'url(#glow-cyan)' : undefined}
                        className="transition-all"
                      />
                      <rect x="8" y="8" width="36" height="18" rx="4" fill="#1E293B" />
                      <text x="26" y="20" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">U1</text>

                      {/* Silicon Core */}
                      <rect x="25" y="32" width="70" height="70" rx="8" fill="#111B2B" stroke="#253247" strokeWidth="1.5" />
                      <text x="60" y="65" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ESP-32</text>
                      <text x="60" y="80" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="monospace">Xtensa LX6</text>

                      <text x="60" y="125" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">DUAL-CORE</text>
                      <text x="60" y="140" fill="#10B981" fontSize="9" textAnchor="middle" fontFamily="monospace">240 MHz RTOS</text>
                      <text x="60" y="156" fill="#C084FC" fontSize="8" textAnchor="middle" fontFamily="monospace">50-Avg Filter</text>

                      {/* Pin Terminals Left */}
                      <circle cx="0" cy="60" r="4" fill="#F59E0B" />
                      <text x="8" y="64" fill="#F59E0B" fontSize="8" fontFamily="monospace">34</text>
                      <circle cx="0" cy="150" r="4" fill="#38BDF8" />
                      <text x="8" y="154" fill="#38BDF8" fontSize="8" fontFamily="monospace">35</text>
                      
                      {/* Pin Terminals Right */}
                      <circle cx="120" cy="60" r="4" fill={alcSimMode === 'safe' ? '#10B981' : '#EF4444'} />
                      <text x="98" y="64" fill={alcSimMode === 'safe' ? '#10B981' : '#EF4444'} fontSize="8" fontFamily="monospace">26</text>
                      <circle cx="120" cy="150" r="4" fill="#C084FC" />
                      <text x="98" y="154" fill="#C084FC" fontSize="8" fontFamily="monospace">27</text>

                      {/* Pin Terminals Top */}
                      <circle cx="45" cy="0" r="4" fill="#60A5FA" />
                      <circle cx="75" cy="0" r="4" fill="#60A5FA" />
                      <text x="60" y="12" fill="#60A5FA" fontSize="8" textAnchor="middle" fontFamily="monospace">I2C</text>
                    </g>

                    {/* COMPONENT 4: I2C OLED (DISP1 TOP) */}
                    <g 
                      onClick={() => setSelectedNode(activeDiagram.nodes[4])}
                      className="cursor-pointer group"
                      transform="translate(395, 25)"
                    >
                      <rect 
                        width="170" 
                        height="80" 
                        rx="10" 
                        fill="#0E172A" 
                        stroke={selectedNode.id === 'node-oled' ? '#38BDF8' : '#253247'} 
                        strokeWidth={selectedNode.id === 'node-oled' ? '3' : '1.5'} 
                      />
                      <rect x="8" y="6" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="31" y="18" fill="#60A5FA" fontSize="8" textAnchor="middle" fontFamily="monospace">DISP1</text>
                      
                      <rect x="15" y="24" width="140" height="34" rx="4" fill="#000000" stroke="#38BDF8" strokeWidth="0.8" />
                      <text x="85" y="38" fill="#38BDF8" fontSize="8" textAnchor="middle" fontFamily="monospace">
                        {alcSimMode === 'safe' ? 'ALC: 0.00 mg/L [PASS]' : 'ALC: 0.38 mg/L [LOCK]'}
                      </text>
                      <text x="85" y="50" fill={alcSimMode === 'safe' ? '#10B981' : '#EF4444'} fontSize="8" textAnchor="middle" fontFamily="monospace">
                        {alcSimMode === 'safe' ? 'IGNITION: PERMITTED' : 'INTERLOCK: CUTOFF!'}
                      </text>
                      <text x="85" y="70" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">SSD1306 (0x3C, 400kHz)</text>
                    </g>

                    {/* COMPONENT 5: OPTOCOUPLED RELAY STAGE (K1 / U4) */}
                    <g 
                      onClick={() => setSelectedNode(activeDiagram.nodes[3])}
                      className="cursor-pointer group"
                      transform="translate(700, 95)"
                    >
                      <rect 
                        width="170" 
                        height="130" 
                        rx="12" 
                        fill="#0E172A" 
                        stroke={selectedNode.id === 'node-relay' ? '#38BDF8' : '#253247'} 
                        strokeWidth={selectedNode.id === 'node-relay' ? '3' : '1.5'} 
                      />
                      <rect x="10" y="8" width="44" height="18" rx="4" fill="#1E293B" />
                      <text x="32" y="20" fill="#EF4444" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">K1/U4</text>
                      
                      {/* Galvanic Optical Barrier Representation */}
                      <rect x="20" y="32" width="46" height="50" rx="6" fill="#162238" stroke="#EF4444" strokeWidth="1.5" />
                      <path d="M 28 45 L 36 55 M 36 55 L 44 45" stroke="#EF4444" strokeWidth="1.5" />
                      <line x1="43" y1="36" x2="43" y2="78" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
                      
                      <text x="74" y="46" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">5V OPTO RELAY</text>
                      <text x="74" y="62" fill="#EF4444" fontSize="8" fontFamily="monospace">EL817 (3.75kV Iso)</text>
                      <text x="74" y="76" fill="#94A3B8" fontSize="8" fontFamily="monospace">1N4007 Diode Guard</text>

                      <rect x="15" y="96" width="140" height="22" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="85" y="111" fill={alcSimMode === 'safe' ? '#10B981' : '#EF4444'} fontSize="9" textAnchor="middle" fontFamily="monospace">
                        {alcSimMode === 'safe' ? 'CONTACTS: CLOSED' : 'CONTACTS: SPRING OPEN'}
                      </text>
                    </g>

                    {/* COMPONENT 6: AUDIBLE / VISUAL ALARMS (LS1 & LED1-2) */}
                    <g 
                      onClick={() => setSelectedNode(activeDiagram.nodes[5])}
                      className="cursor-pointer group"
                      transform="translate(700, 320)"
                    >
                      <rect 
                        width="170" 
                        height="130" 
                        rx="12" 
                        fill="#0E172A" 
                        stroke={selectedNode.id === 'node-alarm' ? '#38BDF8' : '#253247'} 
                        strokeWidth={selectedNode.id === 'node-alarm' ? '3' : '1.5'} 
                      />
                      <rect x="10" y="8" width="44" height="18" rx="4" fill="#1E293B" />
                      <text x="32" y="20" fill="#C084FC" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">LS1</text>

                      {/* Piezo buzzer & LEDs */}
                      <circle cx="36" cy="54" r="16" fill="#162238" stroke="#C084FC" strokeWidth="1.5" />
                      <path d="M 30 54 Q 36 46 42 54" fill="none" stroke="#C084FC" strokeWidth="2" />
                      <circle cx="76" cy="54" r="8" fill="#10B981" opacity={alcSimMode === 'safe' ? '1' : '0.2'} />
                      <circle cx="102" cy="54" r="8" fill="#EF4444" opacity={alcSimMode === 'safe' ? '0.2' : '1'} />
                      
                      <text x="120" y="58" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">INDICATORS</text>
                      <text x="36" y="84" fill="#94A3B8" fontSize="8" fontFamily="monospace">2.4kHz Piezo &amp; 330Ω LEDs</text>

                      <rect x="15" y="96" width="140" height="22" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="85" y="111" fill={alcSimMode === 'safe' ? '#10B981' : '#EF4444'} fontSize="9" textAnchor="middle" fontFamily="monospace">
                        {alcSimMode === 'safe' ? 'GREEN PASS &bull; SILENT' : 'RED ACTIVE &bull; 85dB ALARM'}
                      </text>
                    </g>

                  </svg>
                )}

                {/* 2. DIGITAL CLASSROOM DUAL PORTAL FLOW ARCHITECTURE */}
                {activeDiagram.id === 'diag-asg-flow' && (
                  <svg
                    id="interactive-svg-diag-asg-flow"
                    viewBox="0 0 1020 580"
                    className="w-full h-auto max-h-[560px] drop-shadow-2xl"
                  >
                    {/* Background */}
                    <rect width="1020" height="580" rx="16" fill="#070D1A" stroke="#1E293B" strokeWidth="1.5" />
                    
                    {/* Architectural Tiers Swimlanes */}
                    <g opacity="0.4">
                      {/* Tier 1: Client Frontends */}
                      <rect x="30" y="30" width="220" height="520" rx="10" fill="#0C1425" stroke="#253247" strokeDasharray="3 3" />
                      <text x="45" y="54" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold">TIER 1 // CLIENT FRONTENDS</text>

                      {/* Tier 2: Ingress & Token Gateway */}
                      <rect x="270" y="30" width="220" height="520" rx="10" fill="#0C1425" stroke="#253247" strokeDasharray="3 3" />
                      <text x="285" y="54" fill="#C084FC" fontSize="10" fontFamily="monospace" fontWeight="bold">TIER 2 // TOKEN GATEWAY</text>

                      {/* Tier 3: Compute & Rubric Core */}
                      <rect x="510" y="30" width="230" height="520" rx="10" fill="#0C1425" stroke="#253247" strokeDasharray="3 3" />
                      <text x="525" y="54" fill="#F59E0B" fontSize="10" fontFamily="monospace" fontWeight="bold">TIER 3 // RUBRIC ENGINE</text>

                      {/* Tier 4: Synthesis & Output */}
                      <rect x="760" y="30" width="230" height="520" rx="10" fill="#0C1425" stroke="#253247" strokeDasharray="3 3" />
                      <text x="775" y="54" fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold">TIER 4 // REPORT SYNTHESIS</text>
                    </g>

                    {/* Connecting Pipes with animated packets */}
                    {/* Teacher -> Token Router */}
                    <path d="M 230 145 H 290" fill="none" stroke="#38BDF8" strokeWidth="2" />
                    <circle r="4" fill="#38BDF8">
                      <animateMotion path="M 230 145 H 290" dur="2s" repeatCount="indefinite" />
                    </circle>

                    {/* Student -> Ingest Buffer */}
                    <path d="M 230 365 H 290" fill="none" stroke="#10B981" strokeWidth="2.5" />
                    <circle r="4" fill="#10B981">
                      <animateMotion path="M 230 365 H 290" dur="1.8s" repeatCount="indefinite" />
                    </circle>

                    {/* Token Router -> Grading Core */}
                    <path d="M 470 145 H 530" fill="none" stroke="#C084FC" strokeWidth="2" />
                    <circle r="4" fill="#C084FC">
                      <animateMotion path="M 470 145 H 530" dur="2.2s" repeatCount="indefinite" />
                    </circle>

                    {/* Ingest Buffer -> Grading Core */}
                    <path d="M 470 365 H 530" fill="none" stroke="#F59E0B" strokeWidth="2" />
                    <circle r="4" fill="#F59E0B">
                      <animateMotion path="M 470 365 H 530" dur="1.7s" repeatCount="indefinite" />
                    </circle>

                    {/* Grading Core -> PDF Engine */}
                    <path d="M 720 250 H 780" fill="none" stroke="#10B981" strokeWidth="3" />
                    <circle r="5" fill="#10B981">
                      <animateMotion path="M 720 250 H 780" dur="1.4s" repeatCount="indefinite" />
                    </circle>

                    {/* NODES */}
                    {/* Node 1: Teacher Portal */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[0])} className="cursor-pointer" transform="translate(45, 80)">
                      <rect width="190" height="130" rx="12" fill="#0E172A" stroke={selectedNode.id === 'node-teacher-portal' ? '#38BDF8' : '#253247'} strokeWidth={selectedNode.id === 'node-teacher-portal' ? '3' : '1.5'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#38BDF8" fontSize="8" textAnchor="middle" fontFamily="monospace">PORTAL-A</text>
                      <text x="95" y="46" fill="#38BDF8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TEACHER PORTAL</text>
                      <text x="95" y="66" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">Room Init &amp; Rubrics</text>
                      <rect x="15" y="92" width="160" height="24" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="95" y="108" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">Session Token Generator</text>
                    </g>

                    {/* Node 2: Student Portal */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[1])} className="cursor-pointer" transform="translate(45, 300)">
                      <rect width="190" height="130" rx="12" fill="#0E172A" stroke={selectedNode.id === 'node-student-portal' ? '#38BDF8' : '#253247'} strokeWidth={selectedNode.id === 'node-student-portal' ? '3' : '1.5'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#10B981" fontSize="8" textAnchor="middle" fontFamily="monospace">PORTAL-B</text>
                      <text x="95" y="46" fill="#10B981" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">STUDENT WORKSTATION</text>
                      <text x="95" y="66" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">Code Editor + Markdown</text>
                      <rect x="15" y="92" width="160" height="24" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="95" y="108" fill="#10B981" fontSize="9" textAnchor="middle" fontFamily="monospace">Signed Code Payload</text>
                    </g>

                    {/* Node 3: Session Token Router */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[2])} className="cursor-pointer" transform="translate(285, 80)">
                      <rect width="190" height="130" rx="12" fill="#0E172A" stroke={selectedNode.id === 'node-session-router' ? '#38BDF8' : '#253247'} strokeWidth={selectedNode.id === 'node-session-router' ? '3' : '1.5'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#C084FC" fontSize="8" textAnchor="middle" fontFamily="monospace">ROUTER-2A</text>
                      <text x="95" y="46" fill="#C084FC" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TOKEN ROUTER</text>
                      <text x="95" y="66" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">HMAC-SHA256 Authority</text>
                      <rect x="15" y="92" width="160" height="24" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="95" y="108" fill="#C084FC" fontSize="9" textAnchor="middle" fontFamily="monospace">Zero Database Lock</text>
                    </g>

                    {/* Node 4: Ingestion Stream Buffer */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[3])} className="cursor-pointer" transform="translate(285, 300)">
                      <rect width="190" height="130" rx="12" fill="#0E172A" stroke={selectedNode.id === 'node-ingest-stream' ? '#38BDF8' : '#253247'} strokeWidth={selectedNode.id === 'node-ingest-stream' ? '3' : '1.5'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#F59E0B" fontSize="8" textAnchor="middle" fontFamily="monospace">BUFFER-2B</text>
                      <text x="95" y="46" fill="#F59E0B" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">INGESTION BUFFER</text>
                      <text x="95" y="66" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">25MB Multi-file Stream</text>
                      <rect x="15" y="92" width="160" height="24" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="95" y="108" fill="#F59E0B" fontSize="9" textAnchor="middle" fontFamily="monospace">UTF-8 Sanitizer</text>
                    </g>

                    {/* Node 5: Automated Evaluation Engine */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[4])} className="cursor-pointer" transform="translate(525, 180)">
                      <rect width="200" height="150" rx="14" fill="#091224" stroke={selectedNode.id === 'node-grading-core' ? '#38BDF8' : '#38BDF8'} strokeWidth={selectedNode.id === 'node-grading-core' ? '3.5' : '2'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#38BDF8" fontSize="8" textAnchor="middle" fontFamily="monospace">CORE-3A</text>
                      <text x="100" y="48" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RUBRIC EVALUATOR</text>
                      <text x="100" y="68" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">Deterministic AST Parser</text>
                      <text x="100" y="84" fill="#10B981" fontSize="8" textAnchor="middle" fontFamily="monospace">Multi-Criteria Score Matrix</text>
                      <rect x="20" y="105" width="160" height="26" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="100" y="122" fill="#10B981" fontSize="9" textAnchor="middle" fontFamily="monospace">Score: Accuracy + Style</text>
                    </g>

                    {/* Node 6: PDF Synthesis Engine */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[6])} className="cursor-pointer" transform="translate(775, 180)">
                      <rect width="200" height="150" rx="14" fill="#0E172A" stroke={selectedNode.id === 'node-pdf-engine' ? '#38BDF8' : '#10B981'} strokeWidth={selectedNode.id === 'node-pdf-engine' ? '3' : '2'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#10B981" fontSize="8" textAnchor="middle" fontFamily="monospace">SYNTH-4A</text>
                      <text x="100" y="48" fill="#10B981" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PDF CERTIFICATE</text>
                      <text x="100" y="68" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">Vector Report Synthesizer</text>
                      <text x="100" y="84" fill="#38BDF8" fontSize="8" textAnchor="middle" fontFamily="monospace">Institutional Verification</text>
                      <rect x="20" y="105" width="160" height="26" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="100" y="122" fill="#10B981" fontSize="9" textAnchor="middle" fontFamily="monospace">Verified PDF Output ✓</text>
                    </g>
                  </svg>
                )}

                {/* 3. 1QUIZ ADAPTIVE ENGINE (IRT 2PL) ARCHITECTURE */}
                {activeDiagram.id === 'diag-quiz-arch' && (
                  <svg
                    id="interactive-svg-diag-quiz-arch"
                    viewBox="0 0 1020 580"
                    className="w-full h-auto max-h-[560px] drop-shadow-2xl"
                  >
                    <rect width="1020" height="580" rx="16" fill="#070D1A" stroke="#1E293B" strokeWidth="1.5" />
                    
                    {/* Live Waveform / Signal Bus */}
                    <path d="M 240 280 H 380" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
                    <circle r="4" fill="#38BDF8">
                      <animateMotion path="M 240 280 H 380" dur="1.8s" repeatCount="indefinite" />
                    </circle>

                    <path d="M 570 170 H 680" fill="none" stroke="#C084FC" strokeWidth="2.5" />
                    <circle r="4" fill="#C084FC">
                      <animateMotion path="M 570 170 H 680" dur="2.0s" repeatCount="indefinite" />
                    </circle>

                    <path d="M 570 380 H 680" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                    <circle r="4" fill="#F59E0B">
                      <animateMotion path="M 570 380 H 680" dur="2.2s" repeatCount="indefinite" />
                    </circle>

                    <path d="M 480 230 V 310" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />

                    {/* Quiz UI Client */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[0])} className="cursor-pointer" transform="translate(50, 210)">
                      <rect width="190" height="140" rx="14" fill="#0E172A" stroke={selectedNode.id === 'node-quiz-ui' ? '#38BDF8' : '#253247'} strokeWidth={selectedNode.id === 'node-quiz-ui' ? '3' : '1.5'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#38BDF8" fontSize="8" textAnchor="middle" fontFamily="monospace">CLIENT-1</text>
                      <text x="95" y="48" fill="#38BDF8" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">60 FPS QUIZ UI</text>
                      <text x="95" y="68" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">Instant Click Response</text>
                      <text x="95" y="84" fill="#10B981" fontSize="8" textAnchor="middle" fontFamily="monospace">&lt;10ms Local Event Latency</text>
                      <rect x="15" y="100" width="160" height="24" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="95" y="116" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">Virtual DOM Optimized</text>
                    </g>

                    {/* IRT Engine (Center Top) */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[1])} className="cursor-pointer" transform="translate(380, 100)">
                      <rect width="190" height="140" rx="14" fill="#091224" stroke={selectedNode.id === 'node-irt-engine' ? '#38BDF8' : '#C084FC'} strokeWidth={selectedNode.id === 'node-irt-engine' ? '3.5' : '2'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#C084FC" fontSize="8" textAnchor="middle" fontFamily="monospace">AI-IRT</text>
                      <text x="95" y="48" fill="#C084FC" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">IRT 2PL ENGINE</text>
                      <text x="95" y="68" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">Item Response Theory</text>
                      <text x="95" y="84" fill="#C084FC" fontSize="8" textAnchor="middle" fontFamily="monospace">P(θ) = 1 / (1 + e^-a(θ-b))</text>
                      <rect x="15" y="100" width="160" height="24" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="95" y="116" fill="#C084FC" fontSize="9" textAnchor="middle" fontFamily="monospace">Live Theta: {quizTheta >= 0 ? `+${quizTheta}` : quizTheta}σ</text>
                    </g>

                    {/* Question Bank (Center Bottom) */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[2])} className="cursor-pointer" transform="translate(380, 310)">
                      <rect width="190" height="140" rx="14" fill="#0E172A" stroke={selectedNode.id === 'node-question-bank' ? '#38BDF8' : '#253247'} strokeWidth={selectedNode.id === 'node-question-bank' ? '3' : '1.5'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#10B981" fontSize="8" textAnchor="middle" fontFamily="monospace">DB-POOL</text>
                      <text x="95" y="48" fill="#10B981" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">QUESTION MATRIX</text>
                      <text x="95" y="68" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">Indexed Engineering Pool</text>
                      <text x="95" y="84" fill="#10B981" fontSize="8" textAnchor="middle" fontFamily="monospace">Difficulty Param b [-3, +3]</text>
                      <rect x="15" y="100" width="160" height="24" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="95" y="116" fill="#10B981" fontSize="9" textAnchor="middle" fontFamily="monospace">Bloom's Taxonomy Tags</text>
                    </g>

                    {/* Instant Scoring Multiplier (Right Top) */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[3])} className="cursor-pointer" transform="translate(680, 100)">
                      <rect width="190" height="140" rx="14" fill="#0E172A" stroke={selectedNode.id === 'node-scoring-tracker' ? '#38BDF8' : '#F59E0B'} strokeWidth={selectedNode.id === 'node-scoring-tracker' ? '3' : '1.5'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#F59E0B" fontSize="8" textAnchor="middle" fontFamily="monospace">MUX-3A</text>
                      <text x="95" y="48" fill="#F59E0B" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">STREAK MULTIPLEXER</text>
                      <text x="95" y="68" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">Time-Decay Point Curve</text>
                      <text x="95" y="84" fill="#F59E0B" fontSize="8" textAnchor="middle" fontFamily="monospace">Current Combo: {quizStreak}x</text>
                      <rect x="15" y="100" width="160" height="24" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="95" y="116" fill="#F59E0B" fontSize="9" textAnchor="middle" fontFamily="monospace">Multipliers: 1.5x / 2.0x / 3x</text>
                    </g>

                    {/* Radar Analytics Summary (Right Bottom) */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[4])} className="cursor-pointer" transform="translate(680, 310)">
                      <rect width="190" height="140" rx="14" fill="#0E172A" stroke={selectedNode.id === 'node-analytics-summary' ? '#38BDF8' : '#253247'} strokeWidth={selectedNode.id === 'node-analytics-summary' ? '3' : '1.5'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#38BDF8" fontSize="8" textAnchor="middle" fontFamily="monospace">RADAR-4</text>
                      <text x="95" y="48" fill="#38BDF8" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">COMPETENCY RADAR</text>
                      <text x="95" y="68" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">5-Axis Skill Spider</text>
                      <text x="95" y="84" fill="#38BDF8" fontSize="8" textAnchor="middle" fontFamily="monospace">Speed vs. Accuracy Curve</text>
                      <rect x="15" y="100" width="160" height="24" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="95" y="116" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">Exportable Skill Profile</text>
                    </g>
                  </svg>
                )}

                {/* 4. ROS 2 & DRONE DISTRIBUTED MIDDLEWARE TOPOLOGY */}
                {activeDiagram.id === 'diag-ros2-drone' && (
                  <svg
                    id="interactive-svg-diag-ros2-drone"
                    viewBox="0 0 1020 580"
                    className="w-full h-auto max-h-[560px] drop-shadow-2xl"
                  >
                    <rect width="1020" height="580" rx="16" fill="#070D1A" stroke="#1E293B" strokeWidth="1.5" />
                    
                    {/* DDS Bus Network Cable Representation */}
                    <rect x="360" y="50" width="220" height="480" rx="16" fill="#0A1224" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="470" y="80" fill="#C084FC" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ROS 2 HUMBLE DDS BUS</text>
                    <text x="470" y="98" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">Fast-DDS / CycloneDDS Middleware</text>

                    {/* Topics passing through bus */}
                    <g transform="translate(380, 120)">
                      <rect width="180" height="30" rx="6" fill="#111B2B" stroke="#253247" />
                      <text x="90" y="19" fill="#10B981" fontSize="9" textAnchor="middle" fontFamily="monospace">/fmu/out/vehicle_odometry (100Hz)</text>
                    </g>

                    <g transform="translate(380, 200)">
                      <rect width="180" height="30" rx="6" fill="#111B2B" stroke="#253247" />
                      <text x="90" y="19" fill="#F59E0B" fontSize="9" textAnchor="middle" fontFamily="monospace">/fmu/in/trajectory_setpoint (50Hz)</text>
                    </g>

                    <g transform="translate(380, 280)">
                      <rect width="180" height="30" rx="6" fill="#111B2B" stroke="#253247" />
                      <text x="90" y="19" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">/cmd_vel (Twist Teleop)</text>
                    </g>

                    <g transform="translate(380, 360)">
                      <rect width="180" height="30" rx="6" fill="#111B2B" stroke="#253247" />
                      <text x="90" y="19" fill="#C084FC" fontSize="9" textAnchor="middle" fontFamily="monospace">/telemetry/downlink (MAVLink v2)</text>
                    </g>

                    {/* Signal Paths */}
                    {/* Avionics -> PX4 FCU */}
                    <path d="M 230 180 H 290 V 270 H 360" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
                    <circle r="4" fill="#38BDF8">
                      <animateMotion path="M 230 180 H 290 V 270 H 360" dur="1.6s" repeatCount="indefinite" />
                    </circle>

                    {/* DDS -> Trajectory Planner */}
                    <path d="M 580 215 H 680" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                    <circle r="4" fill="#F59E0B">
                      <animateMotion path="M 580 215 H 680" dur="1.8s" repeatCount="indefinite" />
                    </circle>

                    {/* DDS -> PX4 Autopilot */}
                    <path d="M 580 135 H 680" fill="none" stroke="#10B981" strokeWidth="2.5" />
                    <circle r="4" fill="#10B981">
                      <animateMotion path="M 580 135 H 680" dur="2.0s" repeatCount="indefinite" />
                    </circle>

                    {/* DDS -> Ground Station */}
                    <path d="M 580 375 H 680" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
                    <circle r="4" fill="#38BDF8">
                      <animateMotion path="M 580 375 H 680" dur="2.2s" repeatCount="indefinite" />
                    </circle>

                    {/* NODES */}
                    {/* Avionics Sensor Suite (Left) */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[0])} className="cursor-pointer" transform="translate(50, 110)">
                      <rect width="180" height="140" rx="14" fill="#0E172A" stroke={selectedNode.id === 'node-sensor-suite' ? '#38BDF8' : '#253247'} strokeWidth={selectedNode.id === 'node-sensor-suite' ? '3' : '1.5'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#38BDF8" fontSize="8" textAnchor="middle" fontFamily="monospace">AVIONICS</text>
                      <text x="90" y="48" fill="#38BDF8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">9-DOF AVIONICS</text>
                      <text x="90" y="68" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">ICM-42688-P IMU (200Hz)</text>
                      <text x="90" y="84" fill="#38BDF8" fontSize="8" textAnchor="middle" fontFamily="monospace">Baro BMP388 + Flow Cam</text>
                      <rect x="15" y="100" width="150" height="24" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="90" y="116" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">SPI Bus 20MHz Synchronized</text>
                    </g>

                    {/* PX4 Autopilot FCU (Right Top) */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[1])} className="cursor-pointer" transform="translate(680, 80)">
                      <rect width="200" height="120" rx="14" fill="#0E172A" stroke={selectedNode.id === 'node-px4-fcu' ? '#38BDF8' : '#10B981'} strokeWidth={selectedNode.id === 'node-px4-fcu' ? '3' : '2'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#10B981" fontSize="8" textAnchor="middle" fontFamily="monospace">PX4-FMU</text>
                      <text x="100" y="44" fill="#10B981" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PX4 AUTOPILOT</text>
                      <text x="100" y="64" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">EKF2 Attitude Loop (400Hz)</text>
                      <rect x="15" y="82" width="170" height="24" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="100" y="98" fill="#10B981" fontSize="9" textAnchor="middle" fontFamily="monospace">DShot600 ESC Motor Mixers</text>
                    </g>

                    {/* Autonomous Trajectory Planner (Right Center) */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[3])} className="cursor-pointer" transform="translate(680, 220)">
                      <rect width="200" height="120" rx="14" fill="#0E172A" stroke={selectedNode.id === 'node-nav-core' ? '#38BDF8' : '#F59E0B'} strokeWidth={selectedNode.id === 'node-nav-core' ? '3' : '2'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#F59E0B" fontSize="8" textAnchor="middle" fontFamily="monospace">NAV-CORE</text>
                      <text x="100" y="44" fill="#F59E0B" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TRAJECTORY PLANNER</text>
                      <text x="100" y="64" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">Nav2 3D Cubic Splines</text>
                      <rect x="15" y="82" width="170" height="24" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="100" y="98" fill="#F59E0B" fontSize="9" textAnchor="middle" fontFamily="monospace">Collision Avoidance Vectors</text>
                    </g>

                    {/* Ground Telemetry UI (Right Bottom) */}
                    <g onClick={() => setSelectedNode(activeDiagram.nodes[4])} className="cursor-pointer" transform="translate(680, 360)">
                      <rect width="200" height="120" rx="14" fill="#0E172A" stroke={selectedNode.id === 'node-gcs-telemetry' ? '#38BDF8' : '#253247'} strokeWidth={selectedNode.id === 'node-gcs-telemetry' ? '3' : '1.5'} />
                      <rect x="10" y="8" width="46" height="16" rx="3" fill="#1E293B" />
                      <text x="33" y="19" fill="#38BDF8" fontSize="8" textAnchor="middle" fontFamily="monospace">GCS-HUD</text>
                      <text x="100" y="44" fill="#38BDF8" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">GROUND STATION</text>
                      <text x="100" y="64" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">MAVLink v2 / WebSockets</text>
                      <rect x="15" y="82" width="170" height="24" rx="4" fill="#111B2B" stroke="#253247" />
                      <text x="100" y="98" fill="#38BDF8" fontSize="9" textAnchor="middle" fontFamily="monospace">Attitude &amp; RTL Override</text>
                    </g>
                  </svg>
                )}

              </div>
            </div>
          )}

          {/* Pinout / Wire Matrix Viewport */}
          {activeTab === 'connections' && (
            <div className="p-4 sm:p-6 bg-[#091122]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  Verified Signal Connections &amp; Pinout Ledger:
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {activeDiagram.connections?.length || 0} Signal Pathways
                </span>
              </div>

              {activeDiagram.connections && activeDiagram.connections.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-[#253247] shadow-lg">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#111B2B] text-slate-300 border-b border-[#253247]">
                      <tr>
                        <th className="p-3">Component / Source</th>
                        <th className="p-3">Pin / Terminal</th>
                        <th className="p-3">Destination / Target</th>
                        <th className="p-3">Signal Type</th>
                        <th className="p-3">Operating Voltage</th>
                        <th className="p-3">Tolerances &amp; Passive Parts</th>
                        <th className="p-3">Current Draw</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#253247]/60 text-slate-200">
                      {activeDiagram.connections.map((conn, idx) => (
                        <tr key={idx} className="hover:bg-[#111B2B]/40 transition-colors">
                          <td className="p-3 font-bold text-white flex items-center gap-2">
                            <span 
                              className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                              style={{ backgroundColor: conn.wireColor }} 
                            />
                            <span>{conn.component}</span>
                          </td>
                          <td className="p-3 text-cyan-400">{conn.pin}</td>
                          <td className="p-3 text-emerald-400 font-semibold">{conn.target}</td>
                          <td className="p-3 text-slate-300">{conn.signal}</td>
                          <td className="p-3 text-purple-400">{conn.voltage}</td>
                          <td className="p-3 text-amber-400">{conn.tolerances}</td>
                          <td className="p-3 text-slate-400">{conn.currentDraw}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-xs font-mono text-slate-400">
                  Select Visual Blueprint tab to inspect component connections.
                </div>
              )}
            </div>
          )}

          {/* Rationale Viewport */}
          {activeTab === 'rationale' && (
            <div className="p-5 sm:p-8 bg-[#091122] space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    Engineering Architecture Rationale
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {activeDiagram.engineeringRationale}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0E172A] border border-[#1E293B] text-xs text-slate-300 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                  Design Specifications &amp; Safety Guardrails:
                </span>
                <p className="font-sans leading-relaxed">
                  {activeDiagram.description}
                </p>
              </div>
            </div>
          )}

          {/* Bottom Interactive Component Inspector Drawer */}
          <div className="p-4 sm:p-6 bg-[#080E1C] border-t border-[#253247] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Inspected Component:
                </span>
                {selectedNode.refDes && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                    {selectedNode.refDes}
                  </span>
                )}
                <span className="text-sm font-bold text-white font-sans">
                  {selectedNode.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {selectedNode.category}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{selectedNode.status}</span>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
              <div className="p-2.5 sm:p-3 rounded-lg bg-[#0E172A]/70 border border-[#1E293B]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  Component Role &amp; Function:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {selectedNode.role}
                </p>
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-[#0E172A]/70 border border-[#1E293B]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  Technical Hardware Specs:
                </span>
                <p className="text-xs text-cyan-300 font-mono leading-relaxed">
                  {selectedNode.specs}
                </p>
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-[#0E172A]/70 border border-[#1E293B]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  Pinout &amp; Voltage:
                </span>
                <p className="text-xs text-purple-300 font-mono leading-relaxed">
                  {selectedNode.pinoutOrEndpoint} &bull; {selectedNode.voltageOrProtocol}
                </p>
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-[#0E172A]/70 border border-[#1E293B]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  Tolerances &amp; Current:
                </span>
                <p className="text-xs text-amber-300 font-mono leading-relaxed">
                  {selectedNode.tolerances || 'Standard Industrial'} &bull; {selectedNode.currentDraw || '< 20mA'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
