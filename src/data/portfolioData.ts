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
  name: "SHUBHAM VERMA",
  alternateName: "Shubham Patel",
  primaryTitle: "Aspiring Robotics & AI Engineer",
  secondaryTitle: "Computer Science | Artificial Intelligence | Robotics | Embedded Systems | IoT",
  location: "Ambedkar Nagar, Uttar Pradesh - 224151, India",
  heroTagline: "Engineering Intelligence. Building the Future.",
  alternativeTagline: "Turning Ideas Into Intelligent Systems.",
  bioIntroduction: "I am an aspiring Robotics and AI Engineer with a background in Computer Science and Engineering. I am passionate about Artificial Intelligence, Robotics, Embedded Systems, IoT, Drone Technology and Software Development. I enjoy exploring emerging technologies and developing practical solutions that combine hardware, software and intelligent systems.",
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
    original: "/assets/profile/original-photo.png",
    thumbnail: "/assets/profile/original-photo.png",
    background: "/assets/profile/profile-background.png"
  },
  contact: {
    email: "shubhampatel0487@gmail.com",
    phone: "+91 6307510099",
    whatsappNumber: "+916307510099",
    whatsappUrl: "https://wa.me/916307510099",
    githubUsername: "shubhampatel0487",
    githubUrl: "https://github.com/shubhampatel0487",
    linkedinUrl: "https://www.linkedin.com/in/shubhampatel0487",
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
  // 1. Programming
  { name: "Python", level: "Primary & Applied", category: "programming", description: "Applied across AI modeling, computer vision, backend APIs, data pipelines, and automation scripts." },
  { name: "C / C++", level: "Intermediate", category: "programming", description: "Firmware programming for ESP32 and Arduino, memory management, and low-level hardware control." },
  { name: "Java", level: "Academic & OOP", category: "programming", description: "Core Java, object-oriented design paradigms, data structures, and collection frameworks." },
  { name: "JavaScript", level: "Working Competency", category: "programming", description: "Modern ES6+, DOM manipulation, asynchronous REST integrations, and interactive interfaces." },

  // 2. Artificial Intelligence
  { name: "Machine Learning Fundamentals", level: "Practical Exploration", category: "ai_ml", description: "Supervised and unsupervised learning, regression, classification, feature engineering, and evaluation." },
  { name: "AI Computer Vision & OpenCV", level: "Hands-on Project", category: "ai_ml", description: "Haar cascade face detection, facial feature extraction, and automated real-time recognition." },
  { name: "Data Processing & Analytics", level: "Applied Practice", category: "ai_ml", description: "Data wrangling, cleaning, and exploratory numerical analysis using NumPy, Pandas, and Matplotlib." },
  { name: "Model Training Experiments (PINNs)", level: "Active Research", category: "ai_ml", description: "Physics-Informed Neural Networks embedding differential equations into loss functions for battery lifecycle estimation." },

  // 3. Robotics
  { name: "Robotics Fundamentals", level: "Academic & Lab", category: "robotics", description: "Forward/inverse kinematics, DH parameters, coordinate transformations, and closed-loop control." },
  { name: "ROS 2 (Robot Operating System)", level: "Simulation & Learning", category: "robotics", description: "DDS middleware, publishers, subscribers, custom message topics, and robot state simulation." },
  { name: "Drone Technology (PX4 & Gazebo)", level: "Exploratory SITL", category: "robotics", description: "PX4 software-in-the-loop (SITL) flight control, quadcopter dynamics, and autonomous mission planning." },
  { name: "Intelligent Automation", level: "Applied Prototyping", category: "robotics", description: "Interfacing microcontrollers with safety cutoffs, automated sensors, and physical actuators." },

  // 4. Embedded Systems
  { name: "ESP32 & ESP8266", level: "Hands-on Prototyping", category: "embedded", description: "Dual-core architectures, Wi-Fi/BLE communication, FreeRTOS tasks, and automotive interlocks." },
  { name: "Arduino Microcontrollers", level: "Experienced Prototyping", category: "embedded", description: "PWM signal generation, ADC sampling, interrupts, serial debugging, and breadboard circuits." },
  { name: "Sensors & Actuators", level: "Hardware Integration", category: "embedded", description: "Analog MQ-3 alcohol sensors, IMU accelerometers, ultrasonic transducers, relays, and buzzers." },
  { name: "Circuit Design & Diagnostics", level: "Practical Lab Skills", category: "embedded", description: "Schematic review, breadboard prototyping, multimeter probing, and power regulation." },

  // 5. Web Development
  { name: "Flask & FastAPI", level: "Project Implementation", category: "web", description: "Lightweight Python microservices, REST endpoints, and local database CRUD operations." },
  { name: "Django & Django REST", level: "Practical Knowledge", category: "web", description: "Model-View-Template architecture, ORM querysets, admin dashboards, and authenticated APIs." },
  { name: "HTML5 & CSS3", level: "Solid Foundation", category: "web", description: "Semantic markup, modern styling, responsive layouts, Tailwind CSS, and accessibility standards." },
  { name: "Relational DBs (SQLite, MySQL)", level: "Working Relational DB", category: "web", description: "Schema normalization, SQL querying, foreign keys, transaction safety, and persistent records." },

  // 6. Tools
  { name: "Linux & Kali Linux", level: "Comfortable Workstation", category: "tools", description: "Command-line navigation, system administration, bash scripting, network inspection, and package management." },
  { name: "Git & GitHub", level: "Daily Workflow", category: "tools", description: "Version control, feature branching, merge workflows, repository hosting, and open-source tracking." },
  { name: "Docker Containerization", level: "Fundamentals", category: "tools", description: "Dockerfile creation, container isolation for development environments, and reproducible runtimes." },
  { name: "VS Code & Development Tooling", level: "Daily Workflow", category: "tools", description: "Extension ecosystems, linting, debugging configurations, and integrated terminal workflows." }
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
    title: "ESP32-Based Alcohol Vapour Detection & Safety Interlock",
    tagline: "Benchtop Microcontroller Circuit with Gas-Sensing Threshold Logic & Relay Actuation",
    category: "Embedded & IoT",
    status: "Completed",
    statusBadgeColor: "emerald",
    overview: "An embedded safety prototype designed to demonstrate alcohol vapour detection and starter lockout feasibility. Interfaces a heated SnO2 semiconductor sensor with an ESP32 microcontroller to sample vapour levels, applying moving-average filtering to trigger a 5V optocoupled relay and audio-visual alarms upon crossing bench thresholds.",
    problemStatement: "Alcohol-impaired vehicle operation is a leading cause of transit accidents. Exploring deterministic embedded interlocks investigates whether pre-ignition vapour screening can actively block starter circuit activation before a vehicle can be operated.",
    technologies: ["ESP32", "Arduino C++", "SnO2 Gas Sensor (MQ-3)", "5V Optocoupled Relay", "Piezo Buzzer", "Status LEDs", "Breadboard Prototyping"],
    keyFeatures: [
      "Real-time analog alcohol-vapour sampling via 12-bit ESP32 SAR ADC (GPIO 34).",
      "16-sample digital moving-average noise filter to suppress thermal line fluctuation.",
      "Deterministic threshold comparator actuating a 5V optocoupled relay (<100ms response).",
      "Audio-visual feedback via 2.4 kHz piezo buzzer and dual-color status LEDs (Green/Red).",
      "Strict benchtop safety boundary (demonstration only, not connected to moving vehicle)."
    ],
    architectureDetails: "Analog voltage from the sensor voltage divider is sampled on GPIO 34. A moving-average filter smooths the signal; when the reading exceeds the calibrated bench threshold (2235 ADC counts / ~1.8V), GPIO 26 de-energizes the normally-closed relay to simulate starter lockout.",
    engineeringLearnings: [
      "Thermal stabilization characteristics of metal-oxide semiconductor gas sensors.",
      "Decoupling 150mA continuous heater current from sensitive 3.3V microcontroller logic.",
      "Optocoupled galvanic isolation and flyback diode protection for inductive relay coils."
    ],
    image: "/projects/alcohol-detection.svg",
    githubUrl: "https://github.com/shubhampatel0487/ESP32-Alcohol-Detection-Safety",
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
  {
    id: "cert-techsima-python",
    title: "Industrial Training in Python Programming & Systems Development",
    issuer: "Techsima Technologies Pvt. Ltd.",
    date: "July 2024",
    status: "Completed",
    credentialUrl: "https://github.com/shubhampatel0487"
  },
  {
    id: "cert-diploma-cse",
    title: "Diploma in Computer Science & Engineering (3-Year Program)",
    issuer: "BTEUP • CSJM Government Polytechnic",
    date: "2023–2026",
    status: "In Progress",
    credentialUrl: undefined
  },
  {
    id: "cert-embedded-freertos",
    title: "Embedded Systems & Real-Time Firmware Architecture (ESP32 / FreeRTOS)",
    issuer: "Microcontroller Engineering Bench Suite",
    date: "2024–2025",
    status: "Completed",
    credentialUrl: "https://github.com/shubhampatel0487/ESP32-Alcohol-Detection-Safety"
  },
  {
    id: "cert-ros2-robotics",
    title: "Autonomous Robotics & Distributed Middleware Systems (ROS 2 Humble)",
    issuer: "Autonomous Systems Engineering Track",
    date: "2025–2026",
    status: "In Progress",
    credentialUrl: "https://github.com/shubhampatel0487"
  }
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
