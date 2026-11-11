export interface ProjectVideo {
  id: string;
  projectId: string;
  projectTitle: string;
  title: string;
  category: 'Introduction' | 'Hardware Demo' | 'Working Principle' | 'Architecture' | 'Features & Roadmap' | 'Live Simulation';
  duration: string;
  durationSeconds: number;
  thumbnail: string;
  videoUrl?: string;
  description: string;
  isSimulatedAnimation: boolean;
  simulationNotice?: string;
  captions: Array<{ time: number; text: string }>;
  keyTopics: string[];
}

export const projectVideos: ProjectVideo[] = [
  // ── 1. AI + IoT Alcohol Detection System (1080p Real MP4 Video) ──
  {
    id: "alc-vid-demo",
    projectId: "alcohol-detection",
    projectTitle: "AI + IoT Alcohol Detection System",
    title: "ESP32 Alcohol Detection & Safety Interlock (1080p Full Demo)",
    category: "Hardware Demo",
    duration: "0:24",
    durationSeconds: 24,
    thumbnail: "/projects/alcohol-detection.svg",
    videoUrl: "/videos/alcohol-detection-demo.mp4",
    description: "Deep 1080p engineering walkthrough: Dual-core FreeRTOS boot, MQ-3 heater calibration, differential airflow validation (>120 Pa), raw vs. filtered dual-trace oscilloscope, 1.20V legal threshold breach, optocoupled relay cutoff (GPIO 26), and 2.4kHz piezo alarm.",
    isSimulatedAnimation: true,
    simulationNotice: "Deterministic hardware, FreeRTOS telemetry & signal simulation rendered in 1080p 30fps MP4.",
    captions: [
      { time: 0, text: "Phase 1: ESP32 dual-core boot, Xtensa 240MHz & MQ-3 SnO2 heater pre-heat curve." },
      { time: 5, text: "Phase 2: Differential airflow sensor validates sustained human exhalation (145 Pa). Ignition PERMITTED." },
      { time: 10, text: "Phase 3: Alcohol vapor influx detected! 50-sample moving average digital filter running." },
      { time: 13, text: "Threshold exceeded (>0.05 mg/L BAC, 1.20V). Active-low GPIO 26 cutoff command dispatched." },
      { time: 17, text: "Phase 4: 5V Optocoupled Relay coil de-energizes! Starter solenoid circuit isolated. Piezo alarm active." },
      { time: 21, text: "Phase 5: Automotive safety lockout engaged. Telemetry packet serialized and logged." }
    ],
    keyTopics: ["ESP32 Xtensa Dual-Core", "MQ-3 Gas Curve", "Airflow Pressure", "5V Relay Cutoff", "Piezo Alarm", "50-Sample Moving Average"]
  },

  // ── 2. Digital Classroom Assignment Checker (1080p Real MP4 Video) ──
  {
    id: "asg-vid-demo",
    projectId: "assignment-checker",
    projectTitle: "Digital Classroom Platform",
    title: "Digital Classroom — Dual-Portal & Evaluation Engine (1080p Full Demo)",
    category: "Working Principle",
    duration: "0:24",
    durationSeconds: 24,
    thumbnail: "/projects/assignment-checker.svg",
    videoUrl: "/videos/assignment-checker-demo.mp4",
    description: "Full demonstration of Teacher Session creation, student Python code editor workspace, cryptographic SHA-256 token verification, 4-tier automated test suite execution, and official vector PDF transcript compilation.",
    isSimulatedAnimation: true,
    simulationNotice: "Platform workflow demonstration rendered in 1080p 30fps MP4.",
    captions: [
      { time: 0, text: "Phase 1: Instructor initializes session 'CSE-BTEUP-2026' and configures rubric criteria weights." },
      { time: 6, text: "Phase 2: Student workspace loads quicksort prompt and submits solution with SHA-256 digest." },
      { time: 12, text: "Phase 3: Automated evaluation engine executes 4 test cases with runtime and memory profiling." },
      { time: 18, text: "Phase 4: Final score computed (96/100 • Grade A+). Official vector PDF report compiled." }
    ],
    keyTopics: ["Teacher Session Generator", "Code Submission Workspace", "SHA-256 Verification", "Automated Rubrics", "PDF Generation", "Test Suite Profiling"]
  },

  // ── 3. 1QUIZ AI Platform (1080p Real MP4 Video) ──
  {
    id: "quiz-vid-demo",
    projectId: "onequiz",
    projectTitle: "1QUIZ — AI-Powered Learning Platform",
    title: "1QUIZ — Adaptive Quiz Engine & Gamification (1080p Full Demo)",
    category: "Working Principle",
    duration: "0:24",
    durationSeconds: 24,
    thumbnail: "/projects/quiz-game.svg",
    videoUrl: "/videos/onequiz-platform-demo.mp4",
    description: "Real-time technical quiz execution: Embedded systems protocol navigation, sub-10ms deterministic answer validation, +450 PTS streak combo multiplier, Item Response Theory (IRT) dynamic difficulty recalibration, and 5-axis competency radar chart.",
    isSimulatedAnimation: true,
    simulationNotice: "Quiz engine animation rendered in 1080p 30fps MP4.",
    captions: [
      { time: 0, text: "Phase 1: 1QUIZ Lobby countdown and embedded systems question bank query." },
      { time: 5, text: "Phase 2: Question navigation on I2C bus protocols. Sub-10ms option validation click." },
      { time: 11, text: "Phase 3: Correct answer verified! +450 PTS speed bonus and 3x streak multiplier applied." },
      { time: 17, text: "Phase 4: IRT theta recalibrated to +1.42 (Advanced). Multi-axis competency radar rendered." }
    ],
    keyTopics: ["IRT Dynamic Difficulty", "Instant Validation", "Streak Multiplier", "Radar Competency Analytics", "Multi-Model AI Router"]
  },

  // ── 4. Robotics & Drone Engineering (1080p Real MP4 Video) ──
  {
    id: "robotics-drone-demo",
    projectId: "robotics-drone",
    projectTitle: "Robotics & Drone Systems",
    title: "Robotics & Drone — 6-DOF Kinematics & PX4 SITL (1080p Full Demo)",
    category: "Live Simulation",
    duration: "0:28",
    durationSeconds: 28,
    thumbnail: "/projects/ros2-drone.svg",
    videoUrl: "/videos/robotics-drone-demo.mp4",
    description: "Multi-disciplinary robotics simulation: 6-DOF articulated robotic arm pick-and-place inverse kinematics trajectory, joint angle dials, PX4 SITL drone flight HUD with artificial horizon, and ROS 2 Humble DDS topics (/vehicle_odometry, /cmd_vel).",
    isSimulatedAnimation: true,
    simulationNotice: "Mathematical kinematics and PX4 telemetry simulation rendered in 1080p 30fps MP4.",
    captions: [
      { time: 0, text: "Phase 1: 6-DOF robotic manipulator forward and inverse kinematics trajectory." },
      { time: 7, text: "Phase 2: Gripper end-effector pick-and-place operation transferring component to PCB." },
      { time: 14, text: "Phase 3: Quadcopter PX4 SITL flight climb to 5.0m altitude with EKF2 attitude lock." },
      { time: 21, text: "Phase 4: ROS 2 Humble DDS topics (/vehicle_odometry, /cmd_vel) routing zero-copy commands." }
    ],
    keyTopics: ["6-DOF Inverse Kinematics", "Pick-and-Place Trajectory", "PX4 Autopilot SITL", "ROS 2 DDS Middleware", "Flight Telemetry HUD", "Fast-DDS Bus"]
  },

  // ── 5. Detailed Breakdown: Alcohol Detection Architecture ──
  {
    id: "alc-vid-02",
    projectId: "alcohol-detection",
    projectTitle: "AI + IoT Alcohol Detection System",
    title: "Hardware Working & Pinout Interfacing",
    category: "Hardware Demo",
    duration: "0:24",
    durationSeconds: 24,
    thumbnail: "/projects/alcohol-detection.svg",
    videoUrl: "/videos/alcohol-detection-demo.mp4",
    description: "Detailed breakdown of ESP32 GPIO mapping, MQ-3 analog voltage output calibration, optical relay interlock, buzzer alarms, and OLED telemetry.",
    isSimulatedAnimation: true,
    simulationNotice: "Hardware bench simulation with verified pin-level connections.",
    captions: [
      { time: 0, text: "Examining the hardware architecture and circuit interconnections." },
      { time: 6, text: "The ESP32 microcontroller processes analog inputs via its internal 12-bit ADC on GPIO 34." },
      { time: 12, text: "The MQ-3 tin-dioxide (SnO2) heating element reaches 40°C thermal equilibrium." },
      { time: 18, text: "The 5V relay module on GPIO 26 remains open until all safety checks evaluate to PERMITTED." }
    ],
    keyTopics: ["ESP32 GPIO 34 ADC", "MQ-3 SnO2 Heating Element", "Airflow Pressure Verification", "Optoisolated Relay"]
  },

  // ── 6. Detailed Breakdown: 1QUIZ Multi-Model AI Router ──
  {
    id: "quiz-vid-02",
    projectId: "onequiz",
    projectTitle: "1QUIZ — AI-Powered Learning Platform",
    title: "Multi-Model AI Question Generation & Routing",
    category: "Features & Roadmap",
    duration: "0:24",
    durationSeconds: 24,
    thumbnail: "/projects/quiz-game.svg",
    videoUrl: "/videos/onequiz-platform-demo.mp4",
    description: "Walkthrough of core/ai_service.py auto-routing across Groq (Llama 3), Gemini, and OpenAI with Deep Thinking mode.",
    isSimulatedAnimation: true,
    simulationNotice: "Based on verified core/ai_service.py codebase.",
    captions: [
      { time: 0, text: "Exploring the unified multi-provider AI service in 1QUIZ." },
      { time: 7, text: "The system supports Groq Llama 3 70B, Gemini 1.5 Pro, and OpenAI GPT-4o." },
      { time: 14, text: "System prompt enforces strict JSON schema output for zero-error database ingestion." },
      { time: 20, text: "Deep thinking mode breaks complex engineering topics into verifiable sub-components." }
    ],
    keyTopics: ["Multi-Model AI Router", "Deep Thinking Mode", "JSON MCQ Generator", "Fallback Tolerant Architecture"]
  }
];
