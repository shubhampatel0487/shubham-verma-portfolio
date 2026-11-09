import React, { useState } from 'react';
import {
  ShieldAlert,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Cpu,
  Camera,
  Wind,
  Bell,
  Lock,
  Unlock,
  FileText,
  Award
} from 'lucide-react';

export const ThreeMainProjects: React.FC = () => {
  const [activeProjectTab, setActiveProjectTab] = useState<'alcohol' | 'assignment' | 'onequiz'>('alcohol');

  // -------------------------------------------------------------
  // PROJECT 1: ALCOHOL DETECTION 8-STAGE SIMULATION STATE
  // -------------------------------------------------------------
  const [alcoholStage, setAlcoholStage] = useState<number>(1);
  const [alcoholReading, setAlcoholReading] = useState<number>(0.012); // BAC mg/L
  const [driverVerified, setDriverVerified] = useState<boolean>(true);
  const [airflowVerified, setAirflowVerified] = useState<boolean>(true);
  const [ignitionState, setIgnitionState] = useState<'LOCKED' | 'PERMITTED'>('PERMITTED');
  const [alcoholActiveTab, setAlcoholActiveTab] = useState<'overview' | 'hardware' | 'workflow' | 'safety'>('workflow');

  const simulateNormalTest = () => {
    setAlcoholStage(1);
    setTimeout(() => {
      setAlcoholStage(2);
      setDriverVerified(true);
    }, 400);
    setTimeout(() => {
      setAlcoholStage(3);
    }, 800);
    setTimeout(() => {
      setAlcoholStage(4);
      setAirflowVerified(true);
    }, 1200);
    setTimeout(() => {
      setAlcoholStage(5);
      setAlcoholReading(0.015);
    }, 1600);
    setTimeout(() => {
      setAlcoholStage(6);
      setIgnitionState('PERMITTED');
    }, 2000);
    setTimeout(() => {
      setAlcoholStage(8);
    }, 2400);
  };

  const simulateAlertTest = () => {
    setAlcoholStage(1);
    setTimeout(() => {
      setAlcoholStage(2);
      setDriverVerified(true);
    }, 400);
    setTimeout(() => {
      setAlcoholStage(3);
    }, 800);
    setTimeout(() => {
      setAlcoholStage(4);
      setAirflowVerified(true);
    }, 1200);
    setTimeout(() => {
      setAlcoholStage(5);
      setAlcoholReading(0.088); // Exceeds threshold!
    }, 1600);
    setTimeout(() => {
      setAlcoholStage(7); // Alert condition!
      setIgnitionState('LOCKED');
    }, 2000);
    setTimeout(() => {
      setAlcoholStage(8);
    }, 2400);
  };

  const resetAlcoholSim = () => {
    setAlcoholStage(1);
    setAlcoholReading(0.012);
    setDriverVerified(true);
    setAirflowVerified(true);
    setIgnitionState('PERMITTED');
  };

  // -------------------------------------------------------------
  // PROJECT 2: DIGITAL CLASSROOM ASSIGNMENT CHECKER STATE
  // -------------------------------------------------------------
  const [classroomRole, setClassroomRole] = useState<'teacher' | 'student'>('teacher');
  const assignmentTitle = 'Data Structures — Binary Search Trees';
  const [studentSubmitted, setStudentSubmitted] = useState(false);
  const [teacherGraded, setTeacherGraded] = useState(false);
  const [studentScore, setStudentScore] = useState<number | null>(null);

  const simulateStudentSubmit = () => {
    setStudentSubmitted(true);
  };

  const simulateTeacherGrade = () => {
    setTeacherGraded(true);
    setStudentScore(94);
  };

  const resetClassroom = () => {
    setStudentSubmitted(false);
    setTeacherGraded(false);
    setStudentScore(null);
  };

  // -------------------------------------------------------------
  // PROJECT 3: 1QUIZ REAL PLAYABLE EXPERIENCE STATE
  // -------------------------------------------------------------
  const quizQuestions = [
    {
      q: "Which data structure is primarily used for breadth-first graph traversal in Python?",
      options: ["Stack (LIFO)", "Queue (FIFO)", "Binary Heap", "Hash Table"],
      correct: 1,
      explanation: "A FIFO Queue (e.g. collections.deque) is standard for BFS exploration."
    },
    {
      q: "In ROS 2, which underlying communication middleware protocol is utilized?",
      options: ["HTTP/2 REST", "Raw TCP Sockets", "DDS (Data Distribution Service)", "MQTT Broker"],
      correct: 2,
      explanation: "ROS 2 relies on OMG DDS standards for zero-copy, real-time node messaging."
    },
    {
      q: "What is the primary role of the physics constraint loss term (λ·L_phys) in a PINN?",
      options: [
        "To speed up GPU shader rendering",
        "To enforce differential equations and physical conservation laws",
        "To compress the dataset into fewer dimensions",
        "To eliminate the need for training epochs"
      ],
      correct: 1,
      explanation: "PINNs penalize neural predictions that violate governing differential equations."
    }
  ];

  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelectOption = (idx: number) => {
    if (showFeedback || quizFinished) return;
    setSelectedOption(idx);
    setShowFeedback(true);
    if (idx === quizQuestions[currentQIdx].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIdx + 1 < quizQuestions.length) {
      setCurrentQIdx(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQIdx(0);
    setSelectedOption(null);
    setQuizScore(0);
    setShowFeedback(false);
    setQuizFinished(false);
  };

  return (
    <section id="featured-showcase" className="py-24 relative z-10 border-t border-[#263244]/40 bg-[#080B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#141C2A] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            Core Engineering Innovations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Three Flagship Engineering Projects
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            In-depth architectural breakdowns and real interactive simulations for the three primary engineering platforms.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveProjectTab('alcohol')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeProjectTab === 'alcohol'
                ? 'bg-[#38BDF8] text-[#080B12] shadow-xl shadow-[#38BDF8]/20 scale-[1.02]'
                : 'bg-[#141C2A] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#263244]'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>01. AI + IoT Alcohol Detection System</span>
          </button>

          <button
            onClick={() => setActiveProjectTab('assignment')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeProjectTab === 'assignment'
                ? 'bg-purple-500 text-[#080B12] shadow-xl shadow-purple-500/20 scale-[1.02]'
                : 'bg-[#141C2A] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#263244]'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>02. Digital Classroom — Assignment Checker</span>
          </button>

          <button
            onClick={() => setActiveProjectTab('onequiz')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeProjectTab === 'onequiz'
                ? 'bg-emerald-500 text-[#080B12] shadow-xl shadow-emerald-500/20 scale-[1.02]'
                : 'bg-[#141C2A] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#263244]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>03. 1QUIZ — AI-Powered Learning Platform</span>
          </button>
        </div>

        {/* ============================================================= */}
        {/* PROJECT 01: AI + IoT BASED ALCOHOL DETECTION SYSTEM           */}
        {/* ============================================================= */}
        {activeProjectTab === 'alcohol' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#0E1420] border-2 border-[#263244] shadow-2xl space-y-8 animate-fadeIn">
            
            {/* Header Title & Status */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#263244]">
              <div>
                <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider">
                  PROJECT 01 // EMBEDDED SYSTEMS &bull; IOT &bull; VEHICLE SAFETY
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-sans mt-1">
                  AI + IoT Based Alcohol Detection System
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 font-mono">
                  Autonomous Vehicle Ignition Interlock with AI Driver Verification &amp; MQ-3 Breath Sampling
                </p>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  ● Implemented (Breadboard &amp; Simulated)
                </span>
                <span className="text-[10px] text-[#64748B] mt-1 font-mono">
                  Hardware: ESP32 + MQ-3 + Relay
                </span>
              </div>
            </div>

            {/* Interactive 8-Stage Architecture Simulator */}
            <div className="p-6 rounded-2xl bg-[#080B12] border-2 border-[#263244] space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#263244]">
                <div>
                  <span className="text-xs font-mono text-[#38BDF8] font-bold">
                    STAGE 0{alcoholStage} OF 08 // REAL-TIME SYSTEM WORKFLOW
                  </span>
                  <p className="text-sm font-semibold text-[#F8FAFC]">
                    {alcoholStage === 1 && "Stage 1: Power On & Component Self-Test"}
                    {alcoholStage === 2 && "Stage 2: AI Camera Driver Facial Verification"}
                    {alcoholStage === 3 && "Stage 3: Driver Breath Sample Acquisition"}
                    {alcoholStage === 4 && "Stage 4: Airflow & Anti-Bypass Validation"}
                    {alcoholStage === 5 && "Stage 5: MQ-3 Sensor Analog Processing"}
                    {alcoholStage === 6 && "Stage 6: Normal Reading Threshold Evaluation"}
                    {alcoholStage === 7 && "Stage 7: Alert Trigger & High-Decibel Buzzer"}
                    {alcoholStage === 8 && "Stage 8: Automotive Ignition Interlock State"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 ${
                    ignitionState === 'PERMITTED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                  }`}>
                    {ignitionState === 'PERMITTED' ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>IGNITION: {ignitionState}</span>
                  </span>
                </div>
              </div>

              {/* Hardware Blocks Display */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#141C2A] border border-[#263244] space-y-1">
                  <span className="text-[#64748B] text-[10px] flex items-center gap-1"><Cpu className="w-3 h-3 text-[#38BDF8]" /> ESP32 MCU</span>
                  <span className="text-emerald-400 font-bold">ACTIVE (240MHz)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#141C2A] border border-[#263244] space-y-1">
                  <span className="text-[#64748B] text-[10px] flex items-center gap-1"><Camera className="w-3 h-3 text-[#8B5CF6]" /> AI CAMERA</span>
                  <span className={driverVerified ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                    {driverVerified ? "VERIFIED DRIVER" : "VERIFYING..."}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#141C2A] border border-[#263244] space-y-1">
                  <span className="text-[#64748B] text-[10px] flex items-center gap-1"><Wind className="w-3 h-3 text-[#38BDF8]" /> AIRFLOW SENSOR</span>
                  <span className={airflowVerified ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                    {airflowVerified ? "EXHALATION OK" : "NO AIRFLOW"}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#141C2A] border border-[#263244] space-y-1">
                  <span className="text-[#64748B] text-[10px] flex items-center gap-1"><Wind className="w-3 h-3 text-[#38BDF8]" /> MQ-3 SENSOR</span>
                  <span className={alcoholReading > 0.05 ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
                    {alcoholReading.toFixed(3)} BAC mg/L
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#141C2A] border border-[#263244] space-y-1">
                  <span className="text-[#64748B] text-[10px] flex items-center gap-1"><Bell className="w-3 h-3 text-red-400" /> SAFETY RELAY</span>
                  <span className={ignitionState === 'PERMITTED' ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                    {ignitionState === 'PERMITTED' ? "CIRCUIT CLOSED" : "CUTOFF TRIGGERED"}
                  </span>
                </div>
              </div>

              {/* Interactive Demonstration Controls */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={simulateNormalTest}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#10B981] hover:bg-[#34d399] text-[#052e16] font-bold text-xs font-mono transition-colors shadow-md"
                >
                  Simulate Normal Test (Pass)
                </button>
                <button
                  onClick={simulateAlertTest}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono transition-colors shadow-md"
                >
                  Simulate Alcohol Spike (Alert)
                </button>
                <button
                  onClick={resetAlcoholSim}
                  className="py-2.5 px-4 rounded-xl bg-[#141C2A] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#263244] font-bold text-xs font-mono transition-colors"
                >
                  Reset Simulator
                </button>
              </div>

              <p className="text-[10px] font-mono text-[#64748B] text-center">
                * Note: Interactive portfolio demonstration using simulated sensor data. MQ-3 readings are not certified legal blood-alcohol measurements.
              </p>
            </div>

            {/* Technical Explanation Tabs */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-[#263244] pb-2 text-xs font-mono">
                {(['workflow', 'hardware', 'overview', 'safety'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setAlcoholActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg uppercase ${
                      alcoholActiveTab === tab ? 'bg-[#141C2A] text-[#38BDF8] border border-[#38BDF8]/40 font-bold' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {alcoholActiveTab === 'workflow' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#CBD5E1]">
                  <div className="p-3.5 rounded-xl bg-[#141C2A] border border-[#263244] space-y-1">
                    <strong className="text-[#38BDF8]">1. Driver Verification:</strong>
                    <p>AI camera confirms that the individual providing the breath sample is the actual registered driver in the driver seat, preventing passenger substitution.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#141C2A] border border-[#263244] space-y-1">
                    <strong className="text-[#8B5CF6]">2. Airflow Anti-Bypass:</strong>
                    <p>Pressure / thermistor airflow sensor detects active human pulmonary exhalation, thwarting canned air or hair dryer bypass attempts.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#141C2A] border border-[#263244] space-y-1">
                    <strong className="text-emerald-400">3. MQ-3 Analog Reading:</strong>
                    <p>Heating element changes resistance in presence of ethanol gas. The ESP32 ADC pin takes 50 samples with a moving-average noise filter.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#141C2A] border border-[#263244] space-y-1">
                    <strong className="text-red-400">4. Isolated Ignition Interlock:</strong>
                    <p>If reading &gt; 0.05 BAC, relay disengages starter solenoid. Never cuts ignition on an already moving vehicle for road safety.</p>
                  </div>
                </div>
              )}

              {alcoholActiveTab === 'hardware' && (
                <div className="p-4 rounded-xl bg-[#141C2A] border border-[#263244] text-xs space-y-2 text-[#CBD5E1]">
                  <p><strong>Microcontroller:</strong> ESP32 30-Pin NodeMCU (Dual Core Tensilica 240MHz)</p>
                  <p><strong>Gas Sensor:</strong> MQ-3 Semiconductor Alcohol Sensor (Analog A0 + Digital D0)</p>
                  <p><strong>Safety Switch:</strong> 5V 10A Optocoupler-Isolated Relay Module</p>
                  <p><strong>Audio/Visual Alerts:</strong> Active 5V Piezo Buzzer + Red/Green 5mm LEDs + 0.96" I2C OLED Display</p>
                </div>
              )}

              {alcoholActiveTab === 'safety' && (
                <div className="p-4 rounded-xl bg-[#141C2A] border border-[#263244] text-xs space-y-2 text-[#CBD5E1]">
                  <p><strong className="text-amber-400">Road Safety Mandate:</strong> The system is designed strictly as a pre-start interlock. Once the vehicle is moving, the relay cannot disrupt power to avoid power-steering or brake loss.</p>
                  <p><strong className="text-[#38BDF8]">Legal Accuracy Disclaimer:</strong> MQ-3 readings are indicative laboratory demonstrations and not certified evidentiary breathalyzers.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ============================================================= */}
        {/* PROJECT 02: DIGITAL CLASSROOM — ASSIGNMENT CHECKER           */}
        {/* ============================================================= */}
        {activeProjectTab === 'assignment' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#0E1420] border-2 border-[#263244] shadow-2xl space-y-8 animate-fadeIn">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#263244]">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                  PROJECT 02 // FULL-STACK WEB &bull; EDUCATION TECH &bull; AUTOMATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-sans mt-1">
                  Digital Classroom — Assignment Checker
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 font-mono">
                  Multi-Role Academic Portal for Timed Submissions, Automated Evaluation &amp; PDF Report Generation
                </p>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  ● Ongoing Development
                </span>
                <span className="text-[10px] text-[#64748B] mt-1 font-mono">
                  Stack: Python (Flask/Django) + SQLite + HTML/JS
                </span>
              </div>
            </div>

            {/* Dual Dashboard Interactive Simulator */}
            <div className="p-6 rounded-2xl bg-[#080B12] border-2 border-[#263244] space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#263244]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setClassroomRole('teacher')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                      classroomRole === 'teacher' ? 'bg-purple-600 text-white' : 'bg-[#141C2A] text-[#94A3B8]'
                    }`}
                  >
                    Teacher Dashboard View
                  </button>
                  <button
                    onClick={() => setClassroomRole('student')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                      classroomRole === 'student' ? 'bg-[#38BDF8] text-[#080B12]' : 'bg-[#141C2A] text-[#94A3B8]'
                    }`}
                  >
                    Student Dashboard View
                  </button>
                </div>

                <button
                  onClick={resetClassroom}
                  className="text-xs font-mono text-[#64748B] hover:text-[#F8FAFC] underline"
                >
                  Reset Demo
                </button>
              </div>

              {/* View Body */}
              {classroomRole === 'teacher' ? (
                <div className="space-y-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-[#141C2A] border border-[#263244] space-y-2">
                    <span className="text-[#38BDF8] font-bold">ASSIGNMENT MANAGEMENT:</span>
                    <p className="text-[#F8FAFC] text-sm font-semibold">{assignmentTitle}</p>
                    <div className="flex flex-wrap gap-4 text-[#94A3B8] text-[11px] pt-1">
                      <span>Questions: 5</span>
                      <span>Session: Active (Closes in 02:45:00)</span>
                      <span>Submissions: {studentSubmitted ? "1 / 1 Received" : "0 / 1 Pending"}</span>
                    </div>
                  </div>

                  {studentSubmitted && (
                    <div className="p-4 rounded-xl bg-[#0E1420] border border-purple-500/40 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-400 font-bold">STUDENT SUBMISSION #104 (SHUBHAM VERMA)</span>
                        <span className="text-emerald-400">● Submitted On Time</span>
                      </div>
                      <p className="text-[#94A3B8]">Code: BST insertion, in-order traversal, search complexity analysis.</p>

                      <div className="flex gap-2">
                        <button
                          onClick={simulateTeacherGrade}
                          className="py-1.5 px-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold"
                        >
                          Grade Submission (Assign Rubric Score)
                        </button>
                      </div>
                    </div>
                  )}

                  {teacherGraded && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-1">
                      <p className="font-bold">Evaluation Complete: Marks Awarded: {studentScore}/100</p>
                      <p className="text-xs text-[#CBD5E1]">Feedback: Clean tree recursion logic. Generated standardized PDF report.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-[#141C2A] border border-[#263244] space-y-2">
                    <span className="text-[#38BDF8] font-bold">STUDENT PORTAL — ACTIVE ASSIGNMENTS</span>
                    <p className="text-[#F8FAFC] text-sm font-semibold">{assignmentTitle}</p>
                    <p className="text-[#94A3B8]">Course: CSE 302 — Data Structures Lab</p>

                    {!studentSubmitted ? (
                      <button
                        onClick={simulateStudentSubmit}
                        className="mt-2 py-2 px-4 rounded-xl bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#080B12] font-bold"
                      >
                        Submit Solution Files (.py / .pdf)
                      </button>
                    ) : (
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        ✓ Solution Submitted. Awaiting Faculty Evaluation.
                      </div>
                    )}
                  </div>

                  {teacherGraded && (
                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 space-y-1">
                      <p className="font-bold">Your Score: {studentScore}/100 (Grade A+)</p>
                      <a
                        href="/documents/Original_Resume_Shubham_Verma.pdf"
                        download
                        className="inline-flex items-center gap-1.5 text-xs text-[#38BDF8] underline mt-1"
                      >
                        <FileText className="w-3.5 h-3.5" /> Download Generated Scorecard PDF
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Technical Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#141C2A] border border-[#263244]">
                <strong className="text-[#38BDF8]">Session Lock:</strong> Time-based deadline enforcement preventing post-cutoff submissions.
              </div>
              <div className="p-3.5 rounded-xl bg-[#141C2A] border border-[#263244]">
                <strong className="text-purple-400">Automated Evaluation:</strong> Code similarity and syntax test runner integration.
              </div>
              <div className="p-3.5 rounded-xl bg-[#141C2A] border border-[#263244]">
                <strong className="text-emerald-400">PDF Generator:</strong> Clean programmatic scorecard compilation for students and department records.
              </div>
            </div>

          </div>
        )}

        {/* ============================================================= */}
        {/* PROJECT 03: 1QUIZ — AI-POWERED LEARNING PLATFORM              */}
        {/* ============================================================= */}
        {activeProjectTab === 'onequiz' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#0E1420] border-2 border-[#263244] shadow-2xl space-y-8 animate-fadeIn">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#263244]">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  PROJECT 03 // PYTHON &bull; AI LEARNING &bull; PERFORMANCE ANALYTICS
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-sans mt-1">
                  1QUIZ — AI-Powered Quiz &amp; Learning Platform
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 font-mono">
                  Interactive Knowledge Assessment with Real-time Scoring, Adaptive Difficulty &amp; AI Question Generation Concept
                </p>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ● Playable Experience
                </span>
                <span className="text-[10px] text-[#64748B] mt-1 font-mono">
                  Historical Ref: /home/kali/Documents/QUIZ
                </span>
              </div>
            </div>

            {/* Real Playable Quiz Container */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#080B12] border-2 border-[#263244] space-y-6">
              
              {!quizFinished ? (
                <div className="space-y-5">
                  {/* Progress & Score HUD */}
                  <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-[#263244]">
                    <span className="text-[#38BDF8]">
                      QUESTION 0{currentQIdx + 1} OF 0{quizQuestions.length}
                    </span>
                    <span className="text-emerald-400 font-bold">
                      SCORE: {quizScore} / {quizQuestions.length}
                    </span>
                  </div>

                  {/* Question Prompt */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-purple-400 uppercase">Category: Computer Science &amp; Robotics</span>
                    <h4 className="text-base sm:text-lg font-bold text-[#F8FAFC] font-sans">
                      {quizQuestions[currentQIdx].q}
                    </h4>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {quizQuestions[currentQIdx].options.map((opt, idx) => {
                      let btnStyle = "bg-[#141C2A] text-[#CBD5E1] border-[#263244] hover:border-[#38BDF8]/50";
                      if (showFeedback) {
                        if (idx === quizQuestions[currentQIdx].correct) {
                          btnStyle = "bg-emerald-500/20 text-emerald-300 border-emerald-500 font-bold";
                        } else if (idx === selectedOption) {
                          btnStyle = "bg-red-500/20 text-red-300 border-red-500";
                        }
                      }
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          disabled={showFeedback}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-mono transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{String.fromCharCode(65 + idx)}) {opt}</span>
                          {showFeedback && idx === quizQuestions[currentQIdx].correct && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {showFeedback && (
                    <div className="p-4 rounded-xl bg-[#141C2A] border border-[#263244] space-y-2">
                      <p className="text-xs text-[#CBD5E1]">
                        <strong>Explanation:</strong> {quizQuestions[currentQIdx].explanation}
                      </p>
                      <button
                        onClick={handleNextQuestion}
                        className="py-2 px-4 rounded-xl bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#080B12] font-bold text-xs font-mono transition-colors"
                      >
                        {currentQIdx + 1 < quizQuestions.length ? "Proceed to Next Question →" : "View Final Performance Results →"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Quiz Complete Results Screen */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                    <Award className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#F8FAFC] font-sans">
                    Quiz Assessment Completed!
                  </h4>
                  <p className="text-sm font-mono text-[#CBD5E1]">
                    You scored <strong className="text-emerald-400">{quizScore} / {quizQuestions.length}</strong> (Accuracy: {Math.round((quizScore / quizQuestions.length) * 100)}%)
                  </p>
                  <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
                    Demonstrating automated answer validation, dynamic scoring arrays, and real-time student performance tracking.
                  </p>

                  <button
                    onClick={resetQuiz}
                    className="py-2.5 px-6 rounded-xl bg-[#38BDF8] text-[#080B12] font-bold text-xs font-mono hover:bg-[#7dd3fc] transition-colors"
                  >
                    Play Quiz Again
                  </button>
                </div>
              )}

            </div>

            {/* AI Learning Concepts (Visual Roadmap) */}
            <div className="pt-2 space-y-3">
              <span className="text-xs font-mono text-[#38BDF8] uppercase">
                AI Learning Concept Pipeline (Roadmap)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#141C2A] border border-[#263244] space-y-1">
                  <strong className="text-[#38BDF8]">1. AI Question Generation:</strong>
                  <p className="text-[#94A3B8]">Topic prompt &rarr; LLM / NLP model &rarr; Verified dynamic question bank.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#141C2A] border border-[#263244] space-y-1">
                  <strong className="text-purple-400">2. Adaptive Difficulty:</strong>
                  <p className="text-[#94A3B8]">Accuracy tallies dynamically tune question complexity for personalized mastery.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#141C2A] border border-[#263244] space-y-1">
                  <strong className="text-emerald-400">3. Knowledge Base:</strong>
                  <p className="text-[#94A3B8]">Persistent SQLite/PostgreSQL database storing categorized subject taxonomies.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
