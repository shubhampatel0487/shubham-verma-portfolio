import {
  PersonalProfile,
  SkillItem,
  ProjectItem,
  ExperienceItem,
  EducationItem,
  IndustrialTrainingItem,
  DownloadDocumentItem,
  CertificationItem
} from '../types/portfolio';

export const personalProfile: PersonalProfile = {
  name: "Shubham Patel",
  alternateName: "Shubham Verma",
  primaryTitle: "Aspiring Robotics & AI Engineer",
  secondaryTitle: "Computer Science | Artificial Intelligence | Robotics | Embedded Systems | IoT",
  location: "Ambedkar Nagar, Uttar Pradesh - 224151, India",
  heroTagline: "Engineering Intelligence. Building the Future.",
  alternativeTagline: "Where Code Meets Machines, Intelligence Meets Reality.",
  bioIntroduction: "I am an enthusiastic and dedicated Computer Science student with a deep interest in Robotics, Artificial Intelligence, Embedded Systems, and Cybersecurity. I love exploring emerging technologies, integrating hardware with algorithmic software, and building innovative engineering solutions that enhance digital safety and real-world efficiency.",
  fullBio: {
    paragraph1: "My technological exploration began with core computer science and software development principles and quickly expanded into physical electronics, microcontrollers, and intelligent algorithmic models. I believe the future of engineering lies in cyber-physical systems that perceive, reason, and act with precision in the real world.",
    paragraph2: "Currently completing my Diploma in Computer Science & Engineering (2023–2026) at Chhatrapati Shahu Ji Maharaj Government Polytechnic, Ambedkar Nagar, I dedicate my technical time to hands-on experimentation. From AI-driven face recognition attendance systems and ESP32 alcohol-detection vehicle interlocks to physics-informed neural network (PINN) battery models and ROS 2 drone simulations, my focus is bridging theoretical computation with physical reality.",
    paragraph3: "Having completed an intensive 45-day Industrial Training program in Python programming from Techsima Pvt. Ltd., I treat software and hardware as a unified discipline. Whether designing RESTful Flask backends, calibrating MQ-3 gas sensors, or setting up ROS 2 DDS nodes, I focus on methodical inquiry, reproducible code, and continuous learning."
  },
  mission: "To design and build intelligent cyber-physical systems that integrate robust computer science principles, embedded electronics, and practical AI to solve tangible engineering challenges.",
  vision: "To evolve into a leading Robotics & AI engineer capable of architecting next-generation autonomous systems, intelligent aerial/ground robotics, and predictive digital twins.",
  engineeringPhilosophy: [
    "First Principles Thinking: Understand the physics and fundamental math before tuning software abstractions.",
    "Hardware-Software Synergy: True intelligence requires deep awareness of compute limits, sensor latency, and physical dynamics.",
    "Methodical Experimentation: Validate assumptions through reproducible tests, simulations, and measurable telemetry.",
    "Radical Transparency & Rigor: Honest assessment of system capabilities, avoiding hype in favor of genuine technical substance."
  ],
  avatar: {
    original: "/assets/profile/original-photo.jpg",
    thumbnail: "/assets/profile/profile-thumbnail.jpg",
    background: "/assets/profile/profile-background.png"
  },
  contact: {
    email: "shubhampatel0487@gmail.com",
    phone: "+91 6307510099",
    whatsappNumber: "+916307510099",
    whatsappUrl: "https://wa.me/916307510099",
    githubUsername: "shubhampatel0487",
    githubUrl: "https://github.com/shubhampatel0487",
    linkedinUrl: "https://www.linkedin.com/in/shubham-patel-234a61356",
    naukriUrl: "",
    freelancerUrl: "",
    locationCity: "Ambedkar Nagar, UP",
    locationCountry: "India"
  },
  resume: {
    originalFilename: "Original_Resume_Shubham_Verma.pdf",
    originalPath: "/documents/Original_Resume_Shubham_Verma.pdf",
    updatedFilename: "Updated_Resume_Shubham_Patel.pdf",
    updatedPath: "/documents/Updated_Resume_Shubham_Patel.pdf",
    lastUpdated: "2026"
  }
};

export const industrialTrainingData: IndustrialTrainingItem = {
  company: "Techsima Pvt. Ltd.",
  duration: "45 Days Industrial Training",
  role: "Python Programming & Practical Software Intern",
  focus: "Python programming, practical exercises, mini projects, and algorithmic problem-solving",
  description: "Completed an intensive 45-day industrial training program focused on core and advanced Python. Gained practical experience in structured problem-solving, modular code architecture, object-oriented concepts, and hands-on software development.",
  skillsAcquired: [
    "Python OOP and modular architecture",
    "Data structures, file handling, and algorithmic problem-solving",
    "Hands-on mini projects and software testing routines",
    "Code debugging and real-world implementation practices"
  ]
};

export const skillsData: SkillItem[] = [
  // Programming Languages
  { name: "Python", level: "Primary & Applied Competency", category: "programming", description: "Applied across AI modeling, OpenCV face recognition, data processing, backend APIs, and automation scripts." },
  { name: "C / C++", level: "Intermediate (Embedded & Core)", category: "programming", description: "Firmware programming for ESP32 and Arduino, low-level memory management, and hardware interfacing." },
  { name: "Java", level: "Academic & Object-Oriented", category: "programming", description: "Core Java programming, OOP paradigms, inheritance, interfaces, and collection frameworks." },
  { name: "JavaScript", level: "Working Web Knowledge", category: "programming", description: "ES6+ for interactive web interfaces, DOM manipulation, asynchronous fetch APIs, and client-side logic." },
  { name: "HTML5 & CSS3", level: "Solid Foundation", category: "programming", description: "Semantic markup, modern styling, responsive layouts, flexbox, grid, and accessibility standards." },

  // AI & Machine Learning
  { name: "OpenCV & Computer Vision", level: "Hands-on Project Experience", category: "ai_ml", description: "Real-time face detection, Haar cascades, facial feature extraction, and automated identity logging." },
  { name: "Machine Learning Fundamentals", level: "Practical Exploration", category: "ai_ml", description: "Supervised and unsupervised learning, classification, regression, feature scaling, and evaluation metrics." },
  { name: "Data Science & Basic Analytics", level: "Working Competency", category: "ai_ml", description: "Data wrangling, cleaning, exploratory visualization using Python libraries (NumPy, Pandas, Matplotlib)." },
  { name: "Physics-Informed Neural Networks (PINNs)", level: "Active Research Project", category: "ai_ml", description: "Embedding differential equations and physical laws into loss functions for battery lifecycle estimation." },

  // Embedded Systems & IoT
  { name: "ESP32", level: "Active Prototyping", category: "embedded", description: "Microcontroller architecture, Wi-Fi/Bluetooth stack, dual-core tasks, and automotive safety interlocks." },
  { name: "Arduino IDE & Platform", level: "Experienced Prototyping", category: "embedded", description: "Sensor polling, actuator drivers, PWM signal generation, serial telemetry, and breadboard circuit design." },
  { name: "Sensor Interfacing (MQ-3 Gas, IMU)", level: "Hands-on Integration", category: "embedded", description: "Analog/digital gas sensors, threshold calibration, 6-axis IMU sensors, and environmental monitoring." },
  { name: "Hardware & Circuit Prototyping", level: "Practical Lab Skills", category: "hardware", description: "Basic circuit building, breadboard prototyping, multimeter diagnostics, and hardware debugging." },

  // Robotics & Automation
  { name: "Robotics Fundamentals", level: "Academic & Prototyping", category: "robotics", description: "Kinematics, coordinate frames, actuator control, and closed-loop feedback loops." },
  { name: "ROS 2 (Robot Operating System)", level: "Learning & Simulation", category: "robotics", description: "Publishers, subscribers, DDS middleware architecture, topics, and robot state visualizers." },
  { name: "Drone Simulation (PX4 & Gazebo)", level: "Exploratory & Lab Setup", category: "robotics", description: "PX4 autopilot software-in-the-loop (SITL), quadcopter flight dynamics, and virtual test worlds." },

  // Backend & Databases
  { name: "Flask", level: "Project Implementation", category: "backend", description: "Lightweight microservices, RESTful routing, and database integrations for attendance systems." },
  { name: "Django & Django REST", level: "Practical Knowledge", category: "backend", description: "Model-View-Template architecture, ORM, authenticated endpoints, and administration portals." },
  { name: "MySQL & SQLite", level: "Working Relational DB", category: "backend", description: "Relational schema design, queries, table joins, data integrity, and local persistence." },

  // Operating Systems & Tools
  { name: "Linux & Terminal", level: "Comfortable Environment", category: "tools", description: "Command-line navigation, package managers, shell utilities, and Linux system administration." },
  { name: "Windows", level: "Daily Development OS", category: "tools", description: "Development environments, toolchain configuration, and general productivity software." },
  { name: "Git & GitHub", level: "Daily Workflow", category: "tools", description: "Version control, commits, branching, repository management, and collaboration." },
  { name: "MS Office & VS Code", level: "Productivity & IDE", category: "tools", description: "Technical documentation, spreadsheet analytics, and IDE debugging extensions." }
];

export const projectsData: ProjectItem[] = [
  {
    id: "ai-face-recognition-attendance",
    title: "AI-Based Face Recognition Attendance System",
    tagline: "Computer Vision Pipeline with OpenCV, Flask Backend & Automated SQLite Ingestion",
    category: "AI & Vision",
    status: "Completed",
    statusBadgeColor: "emerald",
    overview: "A functional real-time biometric attendance system built with OpenCV and Python. It automates student registration and facial identity detection from webcam feeds, updating timestamped records in a SQLite database with a clean responsive web dashboard.",
    problemStatement: "Manual attendance taking in institutional classrooms consumes valuable instructional time, is susceptible to proxy marking, and requires manual paperwork for attendance audits.",
    technologies: ["Python", "OpenCV", "Flask", "SQLite", "HTML5", "CSS3", "JavaScript"],
    keyFeatures: [
      "Real-time face detection and feature recognition from video streams.",
      "Automated student registration with photo dataset collection.",
      "Integrated Flask backend with persistent SQLite attendance logging.",
      "Responsive web interface displaying live status and attendance reports."
    ],
    architectureDetails: "Video frames captured via OpenCV are preprocessed (grayscale, cascade classifier detection, Haar feature matching). Matched identities trigger authenticated SQLite INSERT statements via Flask REST endpoints.",
    engineeringLearnings: [
      "Calibrating facial recognition confidence thresholds to eliminate false positives.",
      "Handling ambient lighting variations and video stream latency in Python.",
      "Designing responsive tabular views with HTML/CSS."
    ],
    image: "/projects/face-recognition.svg",
    githubUrl: "https://github.com/shubhampatel0487",
    liveUrl: undefined
  },
  {
    id: "digital-classroom-assignment-checker",
    title: "Digital Classroom — Assignment Checker",
    tagline: "Academic Portal for Assignment Submission, Grading & Automated PDF Reports",
    category: "Academic Systems",
    status: "In Progress",
    statusBadgeColor: "purple",
    overview: "A comprehensive web-based platform engineered to streamline faculty-student workflows. Features student submissions, rubric-based evaluation, session security, deadline enforcement, and automated PDF performance scorecard generation.",
    problemStatement: "Paper-based or email-scattered student assignments lead to lost files, grading delays, lack of submission receipts, and cumbersome manual record keeping for instructors.",
    technologies: ["Python", "Flask / Django", "SQLite", "HTML5", "CSS3", "JavaScript", "PDF Generation"],
    keyFeatures: [
      "Role-Based Dashboards: Separate views for students and faculty members.",
      "Deadline Enforcer: Automated time-based submission lock and late submission flagging.",
      "Grading & Evaluation: Teacher scoring rubric with inline feedback notes.",
      "PDF Performance Generator: Automated compilation of formatted student grade reports."
    ],
    architectureDetails: "Modular Python web application backed by SQLite relational storage. Incorporates server-side templating alongside client-side JavaScript for dynamic table filtering, combined with Python PDF generation modules.",
    engineeringLearnings: [
      "Enforcing strict role-based permission boundaries in web backends.",
      "Dynamic document layout algorithms for programmatic PDF generation.",
      "Safe multi-part file uploads and file sanitization routines."
    ],
    image: "/projects/assignment-checker.svg",
    githubUrl: "https://github.com/shubhampatel0487",
    liveUrl: undefined
  },
  {
    id: "esp32-alcohol-detection",
    title: "ESP32-Based Alcohol Detection Safety System",
    tagline: "Automotive Safety Interlock, MQ-3 Gas Sensor Interfacing & Ignition Control",
    category: "Embedded & IoT",
    status: "Completed",
    statusBadgeColor: "emerald",
    overview: "An embedded safety system designed to prevent drunk driving incidents. Interfaces an MQ-3 alcohol gas sensor with an ESP32 microcontroller to measure breath alcohol concentration before vehicle ignition, triggering threshold alarms and relay cutoffs.",
    problemStatement: "Drunk driving represents one of the foremost causes of vehicular fatalities worldwide. Preventing intoxicated drivers from starting the vehicle provides an active, preventive safety shield.",
    technologies: ["ESP32", "Arduino IDE", "MQ-3 Alcohol Sensor", "Embedded C/C++", "Relay Module", "Buzzer Alert", "Circuit Prototyping"],
    keyFeatures: [
      "Real-time analog breath alcohol sampling with calibrated sensitivity curve.",
      "Threshold-based automatic vehicle ignition cutoff via relay switch.",
      "Audio-visual alert mechanisms with high-decibel buzzer and warning LEDs.",
      "Low-power microcontroller firmware loop with instant sensor response time."
    ],
    architectureDetails: "Analog voltage from the MQ-3 heating coil is sampled by the ESP32 ADC pin. A digital moving-average filter smooths sensor fluctuations; if the reading crosses the safety limit, the relay GPIO disengages vehicle starter power.",
    engineeringLearnings: [
      "Preheating and stabilizing metal oxide semiconductor gas sensors (MQ-3).",
      "Designing relay driver circuits with flyback protection for high-current loads.",
      "Debouncing analog electrical noise in automotive electrical environments."
    ],
    image: "/projects/alcohol-detection.svg",
    githubUrl: "https://github.com/shubhampatel0487",
    liveUrl: undefined
  },
  {
    id: "python-quiz-game",
    title: "Python Quiz Game Application",
    tagline: "Interactive Terminal Quiz Application with Modular Scoring & Question Management",
    category: "Python Apps",
    status: "Completed",
    statusBadgeColor: "emerald",
    overview: "An interactive educational quiz application built in Python. Designed with structured question handling, instant answer validation, real-time score calculation, and formatted terminal outputs.",
    problemStatement: "Building strong computer science intuition requires mastering program control flow, data structure traversal, and user input validation from the ground up.",
    technologies: ["Python 3", "Modular Program Design", "File I/O", "Data Structures"],
    keyFeatures: [
      "Dynamic Question Bank: Extensible question data structures.",
      "Instant Answer Validation: Case-insensitive answer parsing with score tallies.",
      "Real-Time Statistics: End-of-quiz score breakdown and percentage metrics.",
      "Replayable Session Logic: Seamless menu loops allowing multiple gameplay sessions."
    ],
    architectureDetails: "Object-oriented Python script utilizing dictionary mappings for questions, options, and verified answers. Implements strict input sanitation and error handling.",
    engineeringLearnings: [
      "Writing modular, reusable Python functions and clean control structures.",
      "Handling invalid user keystrokes without program crashes.",
      "Formatting clean command-line interfaces."
    ],
    image: "/projects/quiz-game.svg",
    githubUrl: "https://github.com/shubhampatel0487",
    liveUrl: undefined
  },
  {
    id: "pinn-battery-digital-twin",
    title: "PINN Battery Digital Twin",
    tagline: "Physics-Informed Machine Learning for Battery Lifecycle & Performance Estimation",
    category: "AI & PINNs",
    status: "In Progress",
    statusBadgeColor: "purple",
    overview: "An AI-driven battery digital twin project exploring electrochemical state estimation, performance prediction, lifecycle forecasting, and physics-informed neural networks (PINNs). By embedding governing electrochemical equations directly into the neural loss function, the model achieves higher predictive accuracy even with sparse training datasets.",
    problemStatement: "Traditional battery management algorithms rely on empirical lookups or compute-intensive electrochemical simulations that either lack physical accuracy or are too slow for real-time edge microcontrollers.",
    technologies: ["Python", "Physics-Informed Neural Networks (PINNs)", "TensorFlow", "Streamlit", "Data Processing", "Mathematical Modeling"],
    keyFeatures: [
      "Hybrid Loss Formulation: Embeds physics laws directly into gradient descent updates.",
      "State-of-Charge (SoC) & State-of-Health (SoH) trajectory estimation under dynamic discharge cycles.",
      "Interactive Streamlit dashboard allowing engineers to visualize degradation curves and simulate temperature stresses.",
      "Dataset ingestion pipeline handling laboratory charge/discharge cycle logs."
    ],
    architectureDetails: "Combines domain physics (governing ODEs for diffusion and Butler-Volmer kinetics) with deep feedforward networks. Custom loss = L_data + λ * L_physics, enforcing conservation of energy and electrochemical boundaries.",
    engineeringLearnings: [
      "Balancing loss weights (λ) between purely empirical observations and differential equation residuals.",
      "Preprocessing noisy battery cycler datasets and handling non-linear degradation knee points.",
      "Deploying interactive data exploration frontends using Streamlit."
    ],
    image: "/projects/pinn-battery.svg",
    githubUrl: "https://github.com/shubhampatel0487",
    liveUrl: undefined
  },
  {
    id: "trustguard-anti-scam",
    title: "TrustGuard — Anti-Scam Super App",
    tagline: "Architectural Concept & Platform for Digital Safety, Fraud Detection & Community Trust",
    category: "Full Stack & Security",
    status: "Experimental",
    statusBadgeColor: "amber",
    overview: "A comprehensive digital security and anti-scam platform concept designed to help non-technical users identify suspicious communications, verify questionable payment requests, report malicious actors, and access curated community trust ratings.",
    problemStatement: "Digital fraud, phishing scams, and fraudulent payment QR codes have skyrocketed. Victims frequently lack an intuitive, real-time verification tool before sending funds or clicking unverified links.",
    technologies: ["Django REST Framework", "PostgreSQL", "Redis", "Celery", "Tailwind CSS", "WebSockets", "Python"],
    keyFeatures: [
      "Heuristic Scam Risk Engine: Evaluates message patterns, suspicious domain structures, and reported fraud numbers.",
      "Asynchronous Background Worker: Leverages Celery & Redis to process bulk reputation lookups without blocking client requests.",
      "Real-Time Incident Stream: WebSocket channels delivering live alerts on emerging regional scam trends.",
      "Secure Role-Based Verification: Moderator workflows to validate user-submitted evidence before publishing alerts."
    ],
    architectureDetails: "Decoupled architecture: Django REST Framework provides authenticated REST endpoints, Celery workers handle asynchronous background threat intelligence tasks, and Redis manages task caching.",
    engineeringLearnings: [
      "Structuring asynchronous worker queues to prevent long-running lookup timeouts.",
      "Designing relational schemas for tracking reputation metrics and report corroboration.",
      "Implementing responsive UI components with clear safety scoring indicators."
    ],
    image: "/projects/trustguard.svg",
    githubUrl: "https://github.com/shubhampatel0487",
    liveUrl: undefined
  },
  {
    id: "ros2-drone-simulation",
    title: "ROS 2 & Drone Simulation Environment",
    tagline: "Autonomous Aerial Robotics Exploration, Kinematics & Gazebo / RViz Simulation",
    category: "Robotics Simulation",
    status: "In Progress",
    statusBadgeColor: "purple",
    overview: "An ongoing technical exploration into modern robotics middleware and autonomous aerial navigation. Utilizes ROS 2 (Robot Operating System), PX4 Autopilot software-in-the-loop (SITL), Gazebo physics simulation, and RViz 3D telemetry visualization.",
    problemStatement: "Testing autonomous drone flight algorithms on physical hardware is high-risk and resource-intensive. High-fidelity software simulation provides an indispensable safe sandbox.",
    technologies: ["ROS 2", "PX4 Autopilot SITL", "Gazebo Physics Simulator", "RViz 2", "Docker", "Linux (Ubuntu / Kali)", "Python", "C++"],
    keyFeatures: [
      "ROS 2 Node Architecture: Publishing and subscribing to telemetry, odometry, and flight status topics.",
      "Software-in-the-Loop (SITL) Setup: Running virtual flight controller firmware connected to physics simulator.",
      "RViz Visualization: Real-time rendering of TF coordinate trees, point clouds, and target waypoints.",
      "Dockerized Workspace: Encapsulating complex robotics dependencies for reproducible development on Linux."
    ],
    architectureDetails: "Distributed ROS 2 nodes communicating via DDS (Data Distribution Service) transport. Gazebo computes aerodynamic and rigid body physics, streaming state vectors to PX4 SITL.",
    engineeringLearnings: [
      "Understanding coordinate transformation conventions (NED vs ENU) across aeronautics and robotics.",
      "Configuring ROS 2 QoS (Quality of Service) profiles for low-latency telemetry over lossy links.",
      "Managing Linux system dependencies and display passthrough within containerized environments."
    ],
    image: "/projects/ros2-drone.svg",
    githubUrl: "https://github.com/shubhampatel0487",
    liveUrl: undefined
  }
];

export const experienceTimeline: ExperienceItem[] = [
  {
    id: "exp-training",
    period: "2024 (45 Days)",
    title: "Industrial Training — Python Programming",
    roleType: "Industrial Training",
    focus: "Python Core, OOP, Data Structures & Project Development",
    description: "Completed 45 days of rigorous industrial training at Techsima Pvt. Ltd. Developed a strong foundation in Python programming through hands-on practice, coding exercises, mini projects, and problem-solving.",
    highlights: [
      "Completed hands-on Python programming modules covering OOP, recursion, and file manipulation.",
      "Engineered mini project applications solving computational logic problems.",
      "Practiced code optimization, debugging, and structured software development workflows."
    ],
    technologies: ["Python", "Object-Oriented Programming", "Algorithmic Logic", "Data Structures"]
  },
  {
    id: "exp-1",
    period: "2024 — Present",
    title: "Independent Robotics & AI Research",
    roleType: "Independent Research",
    focus: "Intelligent Systems, PINNs & Physics-Informed Modeling",
    description: "Conducting self-directed exploration at the intersection of machine learning and physical sciences. Exploring how physics equations can act as regularization constraints for neural networks predicting battery lifecycles and state estimation.",
    highlights: [
      "Formulated loss functions integrating physical boundary conditions for battery discharge modeling.",
      "Benchmarked neural predictions against conventional data-only ML approaches.",
      "Developed interactive visualization tools for monitoring training convergence and model behavior."
    ],
    technologies: ["Python", "TensorFlow", "PINNs", "NumPy", "Scientific Computing"]
  },
  {
    id: "exp-2",
    period: "2023 — Present",
    title: "Embedded Systems & Hardware Prototyping",
    roleType: "Hands-on Prototyping",
    focus: "ESP32, MQ-3 Gas Sensor, Circuit Building & IoT",
    description: "Designing and building benchtop electronic circuits, microcontroller test rigs, and automotive safety prototypes. Interfacing ESP32 with MQ-3 alcohol sensors, ultrasonic detectors, and relay interlocks.",
    highlights: [
      "Wrote modular embedded C/C++ firmware for sensor polling, threshold alarms, and relay switching.",
      "Engineered the ESP32-based Alcohol Detection Vehicle Safety Interlock system.",
      "Investigated signal filtering methods on analog sensor pins to prevent false alarms."
    ],
    technologies: ["ESP32", "Arduino IDE", "MQ-3 Sensor", "Relays", "Breadboard Prototyping", "C/C++"]
  },
  {
    id: "exp-3",
    period: "2023 — Present",
    title: "Academic & Systems Software Engineering",
    roleType: "Technical Project",
    focus: "Computer Vision Attendance, Assignment Platforms & Web Backends",
    description: "Developing practical software applications to automate institutional processes and strengthen computer vision capabilities. Built the AI Face Recognition Attendance System and Digital Classroom Assignment Checker.",
    highlights: [
      "Built OpenCV face detection and identity logging pipeline connected to SQLite database.",
      "Developed Flask backend services for real-time video verification and student registration.",
      "Engineered assignment submission workflows with automated PDF report generation."
    ],
    technologies: ["Python", "OpenCV", "Flask", "SQLite", "JavaScript", "HTML/CSS"]
  },
  {
    id: "exp-4",
    period: "2024 — Present",
    title: "Robotics Simulation & Modern Middleware Exploration",
    roleType: "Academic / Lab Work",
    focus: "ROS 2, Drone Dynamics & Autonomous Systems",
    description: "Engaging in structured study and simulation of modern robotics software stacks. Setting up ROS 2 workspaces, exploring PX4 drone flight dynamics, and visualizing transforms in RViz and Gazebo.",
    highlights: [
      "Configured containerized ROS 2 simulation environments on Linux workstations.",
      "Studied robot state publishers, coordinate transform trees (TF2), and pub/sub messaging topologies.",
      "Simulated quadcopter flight dynamics and waypoint navigation routines in virtual test worlds."
    ],
    technologies: ["ROS 2", "PX4", "Gazebo", "RViz", "Linux", "Docker"]
  }
];

export const educationData: EducationItem[] = [
  {
    period: "August 2023 — June 2026",
    degree: "Diploma in Computer Science & Engineering",
    institution: "Chhatrapati Shahu Ji Maharaj Government Polytechnic",
    location: "Ambedkar Nagar, Uttar Pradesh, India",
    status: "Ongoing (Completing 2026)",
    stream: "Computer Science & Engineering",
    highlights: [
      "Core coursework: Data Structures, Algorithms, Operating Systems, Database Management, Computer Architecture, and Microprocessors.",
      "Active participation in practical lab experiments, circuit building, and embedded programming workshops.",
      "Direct theoretical computer science application into physical robotics and AI prototypes."
    ]
  },
  {
    period: "April 2023 — May 2024",
    degree: "Class 12 (Intermediate)",
    institution: "Jhinaka Devi Patel Balika Inter College",
    location: "Ambedkar Nagar, Uttar Pradesh",
    score: "78.6%",
    stream: "Science Stream (PCM — Physics, Chemistry, Mathematics), UP Board",
    status: "Completed",
    highlights: [
      "Rigorous mathematical foundation: differential calculus, vector algebra, kinematics, and electromagnetism.",
      "Developed the mathematical rigor essential for machine learning loss curves and robotics coordinate kinematics.",
      "Passed with distinction: 78.6% marks."
    ]
  },
  {
    period: "April 2021 — May 2022",
    degree: "Class 10 (High School)",
    institution: "Ram Dev Janta Inter College",
    location: "Katehari, Ambedkar Nagar, Uttar Pradesh",
    score: "77.5%",
    status: "Completed",
    highlights: [
      "Foundational secondary education across Mathematics, Science, and Social Studies (UP Board).",
      "Early hands-on interest in electronics, computational logic, and software programming.",
      "Passed with high academic standing: 77.5% marks."
    ]
  }
];

export const downloadDocuments: DownloadDocumentItem[] = [
  {
    id: "doc-orig-resume",
    title: "Original Uploaded Resume (PDF)",
    category: "Resume",
    filename: "Original_Resume_Shubham_Verma.pdf",
    path: "/documents/Original_Resume_Shubham_Verma.pdf",
    fileSize: "7.8 KB",
    fileType: "PDF",
    description: "The exact, verified curriculum vitae from the original uploaded document (displays registered academic name Shubham Verma)."
  },
  {
    id: "doc-updated-resume",
    title: "Updated Engineering Resume (PDF)",
    category: "Resume",
    filename: "Updated_Resume_Shubham_Patel.pdf",
    path: "/documents/Updated_Resume_Shubham_Patel.pdf",
    fileSize: "7.8 KB",
    fileType: "PDF",
    description: "Modern professional resume tailored for Robotics, AI, and Embedded Systems engineering roles."
  },
  {
    id: "doc-contact-vcf",
    title: "Contact Card (vCard / VCF)",
    category: "Contact Card",
    filename: "Shubham_Patel_Contact.vcf",
    path: "/documents/Shubham_Patel_Contact.vcf",
    fileSize: "0.5 KB",
    fileType: "VCF",
    description: "One-click mobile address book import file with phone, WhatsApp, verified email, and social links."
  },
  {
    id: "doc-training-overview",
    title: "Techsima Industrial Training Overview",
    category: "Industrial Training",
    filename: "Original_Resume_Shubham_Verma.pdf",
    path: "/documents/Original_Resume_Shubham_Verma.pdf",
    fileSize: "7.8 KB",
    fileType: "PDF",
    description: "Documented 45-day practical Python programming industrial training syllabus & project overview."
  }
];

export const certificationsData: CertificationItem[] = [
  // Honest state: No fabricated certificates
];

export const interestsList = [
  { title: "Artificial Intelligence", desc: "Machine learning, neural networks, and mathematical optimization", icon: "Brain" },
  { title: "Robotics & Kinematics", desc: "Kinematic chains, trajectory planning, and actuator control", icon: "Bot" },
  { title: "Embedded Systems", desc: "Firmware, microcontrollers, and real-time execution", icon: "Cpu" },
  { title: "Drone Technology", desc: "Autonomous flight, PX4 SITL, and aerial sensor platforms", icon: "Navigation" },
  { title: "Computer Vision", desc: "Image analysis, object detection, and visual odometry (OpenCV)", icon: "Eye" },
  { title: "Physics-Informed ML (PINNs)", desc: "Constraining AI with physical differential equations", icon: "Atom" },
  { title: "Cybersecurity & Safety", desc: "System safety, interlock logic, and digital security fundamentals", icon: "Shield" },
  { title: "IoT & Telemetry", desc: "Distributed wireless nodes and live cloud telemetry", icon: "Wifi" }
];
