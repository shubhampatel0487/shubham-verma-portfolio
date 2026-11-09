export interface ProjectVideo {
  id: string;
  projectId: string;
  projectTitle: string;
  title: string;
  category: 'Introduction' | 'Hardware Demo' | 'Working Principle' | 'Architecture' | 'Features & Roadmap';
  duration: string;
  durationSeconds: number;
  thumbnail: string;
  description: string;
  isSimulatedAnimation: boolean;
  simulationNotice?: string;
  captions: Array<{ time: number; text: string }>;
  keyTopics: string[];
}

export const projectVideos: ProjectVideo[] = [
  // ── 1. AI + IoT Alcohol Detection System ─────────────────────
  {
    id: "alc-vid-01",
    projectId: "alcohol-detection",
    projectTitle: "AI + IoT Alcohol Detection System",
    title: "1. Project Objective & Problem Statement",
    category: "Introduction",
    duration: "2:15",
    durationSeconds: 135,
    thumbnail: "/projects/alcohol-detection.svg",
    description: "Overview of drunk driving hazards, sensor response latency, and why intelligent multi-modal verification (Breath + Airflow + Driver Identity) is necessary.",
    isSimulatedAnimation: true,
    simulationNotice: "Concept visualization based on verified project documentation.",
    captions: [
      { time: 0, text: "Welcome to the AI + IoT Alcohol Detection & Driver Safety System overview." },
      { time: 6, text: "The primary objective: Prevent vehicle ignition before a driver under the influence can operate the vehicle." },
      { time: 14, text: "Standard breathalyzers fail due to lack of identity proof and passive airflow bypasses." },
      { time: 24, text: "Our multi-stage architecture integrates ESP32 microcontrollers, MQ-3 gas sensing, airflow verification, and facial biometric detection." },
      { time: 35, text: "When alcohol concentration exceeds threshold, an optoisolated relay triggers an immediate ignition cutoff." }
    ],
    keyTopics: ["Problem Statement", "Road Safety Statistics", "Multi-modal Verification", "Hardware Overview"]
  },
  {
    id: "alc-vid-02",
    projectId: "alcohol-detection",
    projectTitle: "AI + IoT Alcohol Detection System",
    title: "2. Hardware Working & Sensor Interfacing",
    category: "Hardware Demo",
    duration: "3:10",
    durationSeconds: 190,
    thumbnail: "/projects/alcohol-detection.svg",
    description: "Detailed breakdown of ESP32 GPIO mapping, MQ-3 analog voltage output calibration, optical relay interlock, buzzer alarms, and OLED telemetry.",
    isSimulatedAnimation: true,
    simulationNotice: "Hardware bench simulation with verified pin-level connections.",
    captions: [
      { time: 0, text: "Examining the hardware architecture and circuit interconnections." },
      { time: 5, text: "The ESP32 microcontroller processes analog inputs via its internal 12-bit ADC on GPIO 34." },
      { time: 15, text: "The MQ-3 tin-dioxide (SnO2) heating element reaches 40°C thermal equilibrium to sample vaporized ethanol." },
      { time: 26, text: "An airflow thermistor/pressure sensor verifies genuine pulmonary exhalation to thwart canned air spoofing." },
      { time: 38, text: "The 5V relay module on GPIO 26 remains open until all safety checks evaluate to PERMITTED." }
    ],
    keyTopics: ["ESP32 GPIO 34 ADC", "MQ-3 SnO2 Heating Element", "Airflow Pressure Verification", "Optoisolated Relay"]
  },
  {
    id: "alc-vid-03",
    projectId: "alcohol-detection",
    projectTitle: "AI + IoT Alcohol Detection System",
    title: "3. Complete 8-Stage Working Principle",
    category: "Working Principle",
    duration: "2:45",
    durationSeconds: 165,
    thumbnail: "/projects/alcohol-detection.svg",
    description: "Step-by-step walkthrough of the 8 sequential safety phases: Boot → Identity Verification → Airflow Detection → Gas Sampling → Threshold Comparison → Relay Decision → Telemetry Logging.",
    isSimulatedAnimation: true,
    simulationNotice: "Sequential state machine simulation.",
    captions: [
      { time: 0, text: "Phase 1: System boot and sensor pre-heat calibration." },
      { time: 8, text: "Phase 2: Camera verifies authorized driver in the driver seat." },
      { time: 16, text: "Phase 3 & 4: Active breath sample detected through calibrated exhalation tube." },
      { time: 25, text: "Phase 5 & 6: MQ-3 voltage compared against statutory blood alcohol concentration limit." },
      { time: 34, text: "Phase 7 & 8: If threshold exceeded, buzzer alerts sound and ignition remains locked." }
    ],
    keyTopics: ["8-Stage State Machine", "Facial Verification Gate", "Threshold Comparator", "Fail-Safe Default"]
  },
  {
    id: "alc-vid-04",
    projectId: "alcohol-detection",
    projectTitle: "AI + IoT Alcohol Detection System",
    title: "4. Technical Architecture & Communication Flow",
    category: "Architecture",
    duration: "2:30",
    durationSeconds: 150,
    thumbnail: "/projects/alcohol-detection.svg",
    description: "Edge computing architecture showing how microcontroller firmware connects to optional cloud logging and telemetry dashboards.",
    isSimulatedAnimation: true,
    simulationNotice: "System architecture & signal data-flow schematic.",
    captions: [
      { time: 0, text: "Analyzing the end-to-end signal and data flow architecture." },
      { time: 8, text: "Sensors deliver continuous analog/digital telemetry to the ESP32 dual-core Xtensa processor." },
      { time: 18, text: "Core 0 handles Wi-Fi/Bluetooth telemetry transport, while Core 1 executes real-time safety cutoff interrupts." },
      { time: 30, text: "All safety violation events are logged with timestamp and driver image digest." }
    ],
    keyTopics: ["Dual-Core Xtensa FreeRTOS", "Edge Decision Engine", "Event Logging", "Telemetry Protocol"]
  },

  // ── 2. Digital Classroom — Assignment Checker ────────────────
  {
    id: "asg-vid-01",
    projectId: "assignment-checker",
    projectTitle: "Digital Classroom Assignment Checker",
    title: "1. Project Overview & Workflow Architecture",
    category: "Introduction",
    duration: "2:05",
    durationSeconds: 125,
    thumbnail: "/projects/assignment-checker.svg",
    description: "How Digital Classroom simplifies automated submission windows, grading workflows, and PDF result delivery for polytechnic institutions.",
    isSimulatedAnimation: true,
    simulationNotice: "Full client-side sample workflow based on project design specifications.",
    captions: [
      { time: 0, text: "Digital Classroom Assignment Checker: Bridging the evaluation gap for academic coursework." },
      { time: 8, text: "Teachers schedule timed submission sessions with course IDs and maximum questions." },
      { time: 18, text: "Students receive instant upload confirmation and session countdown clocks." },
      { time: 28, text: "Automated rubrics and evaluation interfaces allow teachers to assign marks and generate verified PDF reports." }
    ],
    keyTopics: ["Role-Based Access", "Timed Exam Sessions", "Submission Tracking", "PDF Report Generator"]
  },
  {
    id: "asg-vid-02",
    projectId: "assignment-checker",
    projectTitle: "Digital Classroom Assignment Checker",
    title: "2. Dual Teacher & Student Interface Demonstration",
    category: "Working Principle",
    duration: "3:15",
    durationSeconds: 195,
    thumbnail: "/projects/assignment-checker.svg",
    description: "Live demonstration of teacher creating an assignment session, student submitting code/text solutions, teacher reviewing, and PDF generation.",
    isSimulatedAnimation: true,
    simulationNotice: "Demonstration using sample classroom dataset.",
    captions: [
      { time: 0, text: "Teacher creates 'Data Structures — Binary Search Trees' session." },
      { time: 10, text: "Session opens; student logs in and views active assignment requirements." },
      { time: 22, text: "Student submits response; system stamps hash and timestamp to prevent late tampering." },
      { time: 35, text: "Teacher grades assignment and system generates branded institutional PDF." }
    ],
    keyTopics: ["Live Submission Sandbox", "Teacher Evaluation Portal", "Cryptographic Timestamping", "PDF Compilation"]
  },

  // ── 3. 1QUIZ AI-Powered Quiz Platform ────────────────────────
  {
    id: "quiz-vid-01",
    projectId: "onequiz",
    projectTitle: "1QUIZ — AI-Powered Learning Platform",
    title: "1. Quiz Engine & IRT Adaptive Questioning",
    category: "Working Principle",
    duration: "2:50",
    durationSeconds: 170,
    thumbnail: "/projects/quiz-game.svg",
    description: "How 1QUIZ utilizes Item Response Theory (IRT) algorithms and real-time accuracy scoring to serve dynamically calibrated questions.",
    isSimulatedAnimation: true,
    simulationNotice: "Verified against actual cbt_app/core/adaptive_engine.py implementation.",
    captions: [
      { time: 0, text: "Welcome to the 1QUIZ adaptive testing and learning platform." },
      { time: 8, text: "The engine builds a per-topic accuracy profile for each student across Easy, Medium, and Hard tiers." },
      { time: 20, text: "Questions are dynamically selected using an Impact Score formula to target knowledge gaps." },
      { time: 32, text: "Instant feedback and detailed conceptual explanations follow each answer submission." }
    ],
    keyTopics: ["IRT Adaptive Algorithm", "Topic Accuracy Profiling", "Impact Score Calculation", "Real-Time Scoring"]
  },
  {
    id: "quiz-vid-02",
    projectId: "onequiz",
    projectTitle: "1QUIZ — AI-Powered Learning Platform",
    title: "2. Multi-Model AI Question Generation & Auto-Routing",
    category: "Features & Roadmap",
    duration: "2:40",
    durationSeconds: 160,
    thumbnail: "/projects/quiz-game.svg",
    description: "Walkthrough of core/ai_service.py auto-routing across Groq (Llama 3), Gemini, and OpenAI with Deep Thinking mode.",
    isSimulatedAnimation: true,
    simulationNotice: "Based on verified core/ai_service.py codebase.",
    captions: [
      { time: 0, text: "Exploring the unified multi-provider AI service in 1QUIZ." },
      { time: 7, text: "The system supports Groq Llama 3 70B, Gemini 1.5 Pro, and OpenAI GPT-4o with automatic fallback routing." },
      { time: 18, text: "System prompt enforces strict JSON schema output for zero-error database ingestion." },
      { time: 30, text: "Deep thinking mode breaks complex engineering topics into verifiable sub-components." }
    ],
    keyTopics: ["Multi-Model AI Router", "Deep Thinking Mode", "JSON MCQ Generator", "Fallback Tolerant Architecture"]
  },

  // ── 4. PINN Battery Digital Twin ─────────────────────────────
  {
    id: "pinn-vid-01",
    projectId: "battery-digital-twin",
    projectTitle: "PINN Battery Digital Twin",
    title: "1. Physics-Informed Neural Network (PINN) Formulation",
    category: "Architecture",
    duration: "3:30",
    durationSeconds: 210,
    thumbnail: "/projects/pinn-battery.svg",
    description: "How electro-chemical differential equations (Arrhenius kinetics, Fick diffusion, Butler-Volmer) are embedded into neural network loss gradients.",
    isSimulatedAnimation: true,
    simulationNotice: "Verified against BATest.AI/physics/pinn_loss.py and Attention-LSTM codebase.",
    captions: [
      { time: 0, text: "Introducing the Physics-Informed Neural Network (PINN) for battery degradation modeling." },
      { time: 9, text: "Standard deep learning models overfit on limited cycle data and violate thermodynamic laws." },
      { time: 20, text: "Our loss function integrates empirical MSE loss with physical conservation penalty terms." },
      { time: 34, text: "This yields accurate State-of-Health (SoH) and knee-point rollover predictions up to 5,000 cycles." }
    ],
    keyTopics: ["Physics Loss Formulation", "Arrhenius Degradation", "Attention-LSTM Hybrid", "Knee-Point Rollover"]
  },

  // ── 5. TrustGuard Anti-Scam Super App ────────────────────────
  {
    id: "trust-vid-01",
    projectId: "trustguard",
    projectTitle: "TrustGuard — Anti-Scam Super App",
    title: "1. Intent Classification & Behavioral Fraud Detection",
    category: "Introduction",
    duration: "2:20",
    durationSeconds: 140,
    thumbnail: "/projects/trustguard.svg",
    description: "Overview of NLP intent classification, behavioral trust scoring, and suspicious transaction detection pipelines.",
    isSimulatedAnimation: true,
    simulationNotice: "Verified against SECURE_AI_PROJECT/ml/ codebase.",
    captions: [
      { time: 0, text: "TrustGuard: Proactive scam and fraud prevention for digital communication." },
      { time: 8, text: "Incoming message vectors pass through local embeddings and intent classification pipelines." },
      { time: 18, text: "A multi-dimensional trust score flags urgent social engineering patterns and impersonation scams." },
      { time: 30, text: "Safe offline processing preserves user privacy while detecting fraudulent indicators." }
    ],
    keyTopics: ["Intent Classification", "Vector Embeddings", "Social Engineering Heuristics", "Privacy Preservation"]
  }
];
