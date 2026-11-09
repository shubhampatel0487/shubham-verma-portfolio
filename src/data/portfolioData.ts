import { PersonalProfile, SkillItem, ProjectItem, ExperienceItem, EducationItem, CertificationItem } from '../types/portfolio';

export const personalProfile: PersonalProfile = {
  name: "Shubham Patel",
  primaryTitle: "Aspiring Robotics & AI Engineer",
  secondaryTitle: "Computer Science | Artificial Intelligence | Robotics | Embedded Systems | IoT",
  location: "Ambedkar Nagar, Uttar Pradesh, India",
  heroTagline: "Engineering Intelligence. Building the Future.",
  alternativeTagline: "Where Code Meets Machines, Intelligence Meets Reality.",
  bioIntroduction: "I am an aspiring Robotics and AI Engineer with a background in Computer Science and Engineering. I am interested in developing intelligent systems by integrating software, hardware, artificial intelligence, embedded systems, robotics, and automation. I enjoy experimenting with emerging technologies, solving practical engineering problems, and building innovative projects.",
  fullBio: {
    paragraph1: "My journey in technology began with core computer science principles and quickly expanded toward the physical frontier where software interacts directly with electronic sensors, actuators, and intelligent algorithmic models. I believe the future of automation lies in systems that perceive, reason, and act with high fidelity in real-world environments.",
    paragraph2: "Currently completing my Diploma in Computer Science & Engineering (2023–2026) at Chhatrapati Shahu Ji Maharaj Government Polytechnic, Ambedkar Nagar, I dedicate my technical time to hands-on experimentation. From physics-informed neural network (PINN) battery modeling and ROS 2 drone simulations to embedded firmware on microcontrollers, my focus is bridging the gap between theoretical computation and physical robotics.",
    paragraph3: "Rather than treating software and hardware as isolated silos, I approach engineering as an integrated discipline. Whether drafting RESTful architectures, analyzing sensor streams, or optimizing mathematical models, I focus on methodical inquiry, robust code, and continuous learning."
  },
  mission: "To design and build intelligent cyber-physical systems that integrate robust computer science principles, embedded electronics, and practical AI to solve tangible engineering challenges.",
  vision: "To evolve into a leading Robotics & AI engineer capable of architecting next-generation autonomous systems, intelligent aerial/ground robotics, and predictive digital twins.",
  engineeringPhilosophy: [
    "First Principles Thinking: Understand the physics and fundamental math before tuning software abstractions.",
    "Hardware-Software Synergy: True intelligence requires deep awareness of compute limits, sensor latency, and physical dynamics.",
    "Methodical Experimentation: Validate assumptions through reproducible tests, simulations, and measurable telemetry.",
    "Radical Transparency & Rigor: Honest assessment of system capabilities, avoiding hype in favor of genuine technical substance."
  ],
  contact: {
    email: "shubhampatel.eng@gmail.com", // Configurable placeholder for Shubham
    githubUsername: "shubhampatel-dev", // Configurable
    githubUrl: "https://github.com/shubhampatel", // Configurable
    linkedinUrl: "https://linkedin.com/in/shubham-patel-robotics", // Configurable
    locationCity: "Ambedkar Nagar, UP",
    locationCountry: "India"
  },
  resume: {
    filename: "Shubham_Patel_Resume.pdf",
    path: "/resume/Shubham_Patel_Resume.pdf",
    lastUpdated: "2026"
  }
};

export const skillsData: SkillItem[] = [
  // Programming
  { name: "Python", level: "Proficient & Primary Language", category: "programming", description: "Used across AI modeling, data processing, backend services, and automation scripts." },
  { name: "C / C++", level: "Intermediate (Embedded & Core)", category: "programming", description: "Fundamental programming for microcontroller firmware, memory management, and performance-critical routines." },
  { name: "JavaScript", level: "Working Knowledge", category: "programming", description: "Modern ES6+ for interactive frontend applications, DOM manipulation, and dynamic client experiences." },
  { name: "HTML5 & CSS3", level: "Solid Foundation", category: "programming", description: "Semantic markup, modern styling, responsive flexbox/grid layouts, and accessibility standards." },

  // AI & Machine Learning
  { name: "Machine Learning Fundamentals", level: "Practical Knowledge", category: "ai_ml", description: "Supervised and unsupervised algorithms, regression, classification, feature engineering, and validation metrics." },
  { name: "Data Processing & Analysis", level: "Working Competency", category: "ai_ml", description: "Data wrangling, cleaning, normalization, exploratory analysis using Python libraries." },
  { name: "Model Training & Experimentation", level: "Hands-on Practice", category: "ai_ml", description: "Dataset structuring, loss curve analysis, hyperparameter exploration, and model evaluation." },
  { name: "Physics-Informed Neural Networks (PINNs)", level: "Active Research & Project", category: "ai_ml", description: "Applying differential equations and physical laws as constraints in neural network loss functions (Battery Digital Twin)." },
  { name: "AI-Based Prediction Systems", level: "Applied Exploration", category: "ai_ml", description: "Building inference pipelines and predictive analytics for real-world sensor and operational data." },

  // Robotics & Automation
  { name: "Robotics Fundamentals", level: "Academic & Hands-on", category: "robotics", description: "Kinematics, coordinate transformations, sensor fusion basics, motor control, and closed-loop feedback." },
  { name: "ROS 2 (Robot Operating System)", level: "Learning & Simulation", category: "robotics", description: "Nodes, topics, publishers, subscribers, services, URDF models, and middleware architecture." },
  { name: "Drone Technology & Simulation", level: "Exploratory & Lab", category: "robotics", description: "PX4 autopilot concepts, quadcopter dynamics, flight control fundamentals, and virtual test environments." },
  { name: "Industrial & Process Automation", level: "Practical Concepts", category: "robotics", description: "Sequential logic, sensor-actuator loops, relay switching, and automated diagnostic workflows." },

  // Embedded Systems & IoT
  { name: "Arduino Platform", level: "Experienced Prototyping", category: "embedded", description: "Interfacing analog/digital sensors, actuator drivers, PWM signal generation, and serial telemetry." },
  { name: "ESP32", level: "Active Prototyping", category: "embedded", description: "Dual-core microcontroller programming, Wi-Fi/Bluetooth stack utilization, and RTOS fundamentals." },
  { name: "ESP8266", level: "Hands-on Experience", category: "embedded", description: "Low-cost wireless telemetry nodes, HTTP/MQTT endpoints, and remote sensor logging." },
  { name: "Microcontrollers & Architecture", level: "Core Understanding", category: "embedded", description: "GPIO, ADC/DAC, UART, I2C, SPI communication protocols, interrupt service routines." },
  { name: "Sensors & Actuators", level: "Hands-on Integration", category: "embedded", description: "Ultrasonic, temperature/humidity (DHT), IMU (MPU6050), IR, servo motors, stepper drivers." },
  { name: "Internet of Things (IoT)", level: "Applied Systems", category: "embedded", description: "Sensor-to-cloud architectures, live dashboard telemetry, and remote triggering." },

  // Backend & Development
  { name: "Django & Django REST Framework", level: "Practical Knowledge", category: "backend", description: "Model-View-Template pattern, ORM, authentication, RESTful APIs, serializers, and admin dashboards." },
  { name: "Flask", level: "Working Knowledge", category: "backend", description: "Lightweight microservices, quick API endpoints, and web server utility scripting." },
  { name: "FastAPI", level: "Exploring & Integrating", category: "backend", description: "High-performance asynchronous Python API architecture with automatic OpenAPI documentation." },
  { name: "REST APIs & WebSockets", level: "Functional Implementation", category: "backend", description: "Designing structured JSON API endpoints and duplex communication for real-time alerts." },
  { name: "SQLite & PostgreSQL", level: "Working Competency", category: "backend", description: "Relational schema design, queries, relational integrity, migrations, and indexing." },

  // Tools & Platforms
  { name: "Git & GitHub", level: "Daily Workflow", category: "tools", description: "Version control, branching, committing, pull requests, repository management, and collaboration." },
  { name: "Linux & Terminal", level: "Comfortable Environment", category: "tools", description: "Shell scripting, process monitoring, package management, permissions, and headless system configuration." },
  { name: "Kali Linux", level: "Lab & Security Learning", category: "tools", description: "Network diagnostics, system auditing, security utilities, and vulnerability exploration." },
  { name: "Docker", level: "Working Familiarity", category: "tools", description: "Containerized environments for isolated robotics simulators, dependencies, and reproducible builds." },
  { name: "VS Code", level: "Primary Development IDE", category: "tools", description: "Extensions, remote SSH, debugging configurations, linters, and multi-language development." }
];

export const projectsData: ProjectItem[] = [
  {
    id: "pinn-battery-digital-twin",
    title: "PINN Battery Digital Twin",
    tagline: "Physics-Informed Machine Learning for Battery Lifecycle & Performance Estimation",
    category: "AI & PINNs",
    status: "In Progress",
    statusBadgeColor: "purple",
    overview: "An AI-driven battery digital twin project exploring electrochemical state estimation, performance prediction, lifecycle forecasting, and physics-informed neural networks (PINNs). By embedding governing electrochemical equations directly into the neural loss function, the model achieves higher predictive accuracy even with sparse training datasets.",
    problemStatement: "Traditional battery management algorithms rely on empirical lookups or compute-intensive electrochemical simulations that either lack physical accuracy or are too slow for real-time edge microcontrollers. Pure black-box machine learning models frequently hallucinate non-physical states during unseen operating temperatures or discharge rates.",
    technologies: ["Python", "Physics-Informed Neural Networks (PINNs)", "TensorFlow", "Streamlit", "Data Processing", "Excel / CSV Analytics", "Mathematical Modeling"],
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
    githubUrl: undefined, // Honest placeholder: configurable in settings
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
    problemStatement: "Digital fraud, phishing scams, and fraudulent payment QR codes have skyrocketed in developing digital economies. Victims frequently lack an intuitive, real-time verification tool before sending funds or clicking unverified links.",
    technologies: ["Django REST Framework", "PostgreSQL", "Redis", "Celery", "Tailwind CSS", "WebSockets", "Python"],
    keyFeatures: [
      "Heuristic Scam Risk Engine: Evaluates message patterns, suspicious domain structures, and reported fraud numbers.",
      "Asynchronous Background Worker: Leverages Celery & Redis to process bulk reputation lookups without blocking client requests.",
      "Real-Time Incident Stream: WebSocket channels delivering live alerts on emerging regional scam trends.",
      "Secure Role-Based Verification: Moderator workflows to validate user-submitted evidence before publishing alerts."
    ],
    architectureDetails: "Decoupled architecture: Django REST Framework provides authenticated REST endpoints, Celery workers handle asynchronous background threat intelligence tasks, and Redis manages task caching and WebSocket pub/sub channels.",
    engineeringLearnings: [
      "Structuring asynchronous worker queues to prevent long-running lookup timeouts.",
      "Designing relational schemas for tracking reputation metrics and report corroboration.",
      "Implementing responsive UI components with clear safety scoring indicators."
    ],
    image: "/projects/trustguard.svg",
    githubUrl: undefined,
    liveUrl: undefined
  },
  {
    id: "assignment-checker",
    title: "Assignment Checker & Evaluation Platform",
    tagline: "Academic Workflow Automation, Grading Management & Automated Report Generation",
    category: "Web Systems",
    status: "Completed",
    statusBadgeColor: "emerald",
    overview: "A dedicated web-based assignment management and evaluation platform engineered to streamline teacher-student workflows, track submissions, manage secure sessions, compute marks, and generate standardized PDF performance reports.",
    problemStatement: "Manual collection of student programming and written assignments in educational institutions creates grading bottlenecks, lost files, inconsistent tracking, and time-consuming manual report generation for instructors.",
    technologies: ["Python", "Django", "Flask", "SQLite", "HTML5", "CSS3", "JavaScript", "PDF Generation Engines"],
    keyFeatures: [
      "Dual Role Workflows: Distinct role-based dashboards for educators (assignment creation, deadline setting, rubric grading) and students (submission, feedback review).",
      "Automated PDF Report Generator: Programmatically compiles student scorecards, grading notes, and course statistics.",
      "Submission Archive & Tracking: Timestamped logs with status indicators for on-time vs late submissions.",
      "Session Security: Authentication routines and CSRF protection safeguarding academic data."
    ],
    architectureDetails: "Modular Python web application backed by SQLite relational storage. Incorporates server-side templating alongside client-side JavaScript for dynamic table filtering, combined with Python PDF generation modules.",
    engineeringLearnings: [
      "Designing intuitive role-based permission boundaries between faculty and learners.",
      "Dynamic document generation with automated page layout and tabular formatting in PDF output.",
      "Managing file uploads safely with filename sanitization and type validation."
    ],
    image: "/projects/assignment-checker.svg",
    githubUrl: undefined,
    liveUrl: undefined
  },
  {
    id: "robotics-iot-experiments",
    title: "Robotics & IoT Embedded Experiments",
    tagline: "Hands-on Microcontroller Prototyping, Sensor Fusion & Telemetry Testbeds",
    category: "Embedded & IoT",
    status: "Experimental",
    statusBadgeColor: "blue",
    overview: "A continuous series of practical hardware-level experiments focused on interfacing microcontrollers (Arduino, ESP32, ESP8266) with diverse sensors, servo/stepper actuators, and wireless communication channels for remote telemetry and automated closed-loop control.",
    problemStatement: "Bridging the gap between software algorithms and physical dynamics requires hands-on familiarity with electrical noise, analog-to-digital signal drift, microcontroller clock cycles, and real-time execution constraints.",
    technologies: ["Arduino UNO / Nano", "ESP32", "ESP8266", "Ultrasonic & Infrared Sensors", "MPU6050 Accelerometer / Gyro", "Embedded C/C++", "Python", "MQTT / HTTP Protocols"],
    keyFeatures: [
      "Multi-Sensor Telemetry Nodes: Streaming real-time environmental metrics over Wi-Fi via ESP32/ESP8266.",
      "Actuator PID Tuning: Experimenting with smooth motor positioning and obstacle avoidance logic.",
      "Hardware Interrupt Handling: Reading high-frequency encoder pulses for velocity estimation.",
      "Serial Python Telemetry Bridge: Custom Python scripts capturing serial streams for desktop visualization and logging."
    ],
    architectureDetails: "Bare-metal and framework C/C++ code executing on microcontrollers, transmitting serialized sensor payloads over UART serial and 802.11 Wi-Fi networks to desktop visualization daemons.",
    engineeringLearnings: [
      "Debouncing physical inputs and filtering noisy sensor data using moving average and complementary filters.",
      "Understanding power delivery constraints, logic level shifting (3.3V vs 5V), and brownout prevention on ESP chips.",
      "Diagnosing communication bus failures on I2C and SPI buses."
    ],
    image: "/projects/robotics-iot.svg",
    githubUrl: undefined,
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
    problemStatement: "Testing autonomous drone flight algorithms on physical hardware is high-risk and resource-intensive. High-fidelity software simulation provides an indispensable safe sandbox for validating navigation nodes, coordinate frames, and fail-safes.",
    technologies: ["ROS 2", "PX4 Autopilot SITL", "Gazebo Physics Simulator", "RViz 2", "Docker", "Linux (Ubuntu / Kali)", "Python", "C++"],
    keyFeatures: [
      "ROS 2 Node Architecture: Publishing and subscribing to telemetry, odometry, and flight status topics.",
      "Software-in-the-Loop (SITL) Setup: Running virtual flight controller firmware connected to physics simulator.",
      "RViz Visualization: Real-time rendering of TF coordinate trees, point clouds, and target waypoints.",
      "Dockerized Workspace: Encapsulating complex robotics dependencies for reproducible development on Linux."
    ],
    architectureDetails: "Distributed ROS 2 nodes communicating via DDS (Data Distribution Service) transport. Gazebo computes aerodynamic and rigid body physics, streaming state vectors to PX4 SITL, which in turn exposes standard MAVROS / micro-XRCE-DDS bridge endpoints to custom Python control scripts.",
    engineeringLearnings: [
      "Understanding coordinate transformation conventions (NED vs ENU) across aeronautics and robotics.",
      "Configuring ROS 2 QoS (Quality of Service) profiles for low-latency telemetry over lossy links.",
      "Managing Linux system dependencies and display passthrough within containerized environments."
    ],
    image: "/projects/ros2-drone.svg",
    githubUrl: undefined,
    liveUrl: undefined
  }
];

export const experienceTimeline: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2024 — Present",
    title: "Independent Robotics & AI Research",
    roleType: "Independent Research",
    focus: "Intelligent Systems, PINNs & Physics-Informed Modeling",
    description: "Conducting self-directed exploration at the intersection of machine learning and physical sciences. Exploring how physics equations can act as regularization constraints for neural networks predicting battery lifecycles, battery state estimation, and dynamical systems.",
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
    focus: "Microcontrollers, Sensor Fusion & IoT Telemetry",
    description: "Designing and building benchtop electronic circuits, microcontroller test rigs, and sensor telemetry arrays. Experimenting with Arduino, ESP32, and ESP8266 to understand signal acquisition, communication buses, and actuator control.",
    highlights: [
      "Wrote modular embedded C/C++ firmware for sensor polling, PWM motor control, and Wi-Fi streaming.",
      "Engineered multi-point sensor logging nodes transmitting telemetry over local network protocols.",
      "Investigated signal filtering methods (moving average, basic sensor fusion) on noisy analog inputs."
    ],
    technologies: ["Arduino", "ESP32", "ESP8266", "Embedded C++", "I2C/SPI", "Sensors"]
  },
  {
    id: "exp-3",
    period: "2023 — Present",
    title: "Academic & Systems Software Engineering",
    roleType: "Technical Project",
    focus: "Full-Stack Development, Academic Tools & Web Architecture",
    description: "Developing practical software applications to automate institutional processes and strengthen systems engineering capability. Architecting solutions like the Assignment Checker evaluation platform and anti-scam platform architectures.",
    highlights: [
      "Built multi-role authenticated web applications with Django and SQLite/PostgreSQL databases.",
      "Automated document creation pipelines compiling student metrics directly into formatted PDF records.",
      "Implemented RESTful endpoints and explored asynchronous background task execution."
    ],
    technologies: ["Python", "Django", "Flask", "SQLite", "PostgreSQL", "JavaScript", "HTML/CSS"]
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
    period: "2023 — 2026",
    degree: "Diploma in Computer Science & Engineering",
    institution: "Chhatrapati Shahu Ji Maharaj Government Polytechnic",
    location: "Ambedkar Nagar, Uttar Pradesh, India",
    status: "Ongoing (Completing 2026)",
    stream: "Computer Science & Engineering",
    highlights: [
      "Comprehensive curriculum spanning Data Structures, Algorithms, Database Management, Operating Systems, Computer Architecture, and Microprocessors.",
      "Active participation in practical lab sessions, software development workshops, and technical seminars.",
      "Applying core theoretical CS knowledge directly to embedded systems and AI experimentation."
    ]
  },
  {
    period: "2023",
    degree: "Class 12 (Intermediate)",
    institution: "Jhinka Devi Patel Balika Inter College",
    location: "Patel Nagar, Ambedkar Nagar, Uttar Pradesh",
    score: "78.6%",
    stream: "Science Stream (Physics, Chemistry, Mathematics — PCM)",
    status: "Completed",
    highlights: [
      "Strong foundation in differential calculus, vector algebra, kinematics, electromagnetism, and classical physics.",
      "Developed the mathematical rigor essential for machine learning models and robotics kinematic calculations.",
      "Graduated with distinction: 78.6% marks."
    ]
  },
  {
    period: "2022",
    degree: "Class 10 (High School)",
    institution: "Ram Dev Janta Inter College",
    location: "Katehari, Ambedkar Nagar, Uttar Pradesh",
    score: "77.5%",
    status: "Completed",
    highlights: [
      "Foundational secondary education across Mathematics, Science, and Social Studies.",
      "First ignited interest in computational logic and electronic circuits.",
      "Graduated with high academic standing: 77.5% marks."
    ]
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
  { title: "Computer Vision", desc: "Image analysis, object detection, and visual odometry", icon: "Eye" },
  { title: "Physics-Informed ML (PINNs)", desc: "Constraining AI with physical differential equations", icon: "Atom" },
  { title: "IoT & Telemetry", desc: "Distributed wireless nodes and live cloud telemetry", icon: "Wifi" },
  { title: "Automation & Mechatronics", desc: "Cyber-physical integration and intelligent hardware-software loops", icon: "Cog" }
];
