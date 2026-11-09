import React, { useState } from 'react';
import { Bot, Navigation, Terminal as TerminalIcon, Cpu, Brain } from 'lucide-react';
import { HeroRoboticArm3D } from '../Hero/HeroRoboticArm3D';

export const EngineeringLabs: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'robotics' | 'drone' | 'linux' | 'embedded' | 'ai'>('robotics');

  // Lab B: Drone State
  const [droneState, setDroneState] = useState<'landed' | 'taking_off' | 'hovering' | 'forward' | 'landing'>('hovering');
  const [droneAltitude, setDroneAltitude] = useState(2.4);
  const [droneBattery, setDroneBattery] = useState(98);

  // Lab C: Linux Terminal State
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState<Array<{ cmd: string; out: string }>>([
    { cmd: 'whoami', out: 'shubham-verma' },
    { cmd: 'uname -a', out: 'Linux kali-robotics 6.8.0-kali-amd64 #1 SMP PREEMPT Debian' },
    { cmd: 'python3 --version', out: 'Python 3.12.3 (ROS 2 Humble / TensorFlow / OpenCV enabled)' },
  ]);

  // Lab D: Embedded ESP32 State
  const [sensorAlcoholPPM, setSensorAlcoholPPM] = useState(18); // Safe < 50
  const [isRelayTripped, setIsRelayTripped] = useState(false);

  // Lab E: AI Training State
  const [epoch, setEpoch] = useState(42);
  const [loss, setLoss] = useState(0.0142);
  const [isTraining, setIsTraining] = useState(false);

  const handleDroneAction = (action: 'takeoff' | 'hover' | 'forward' | 'land') => {
    setDroneBattery((b) => Math.max(15, b - 1));
    if (action === 'takeoff') {
      setDroneState('taking_off');
      setDroneAltitude(3.2);
      setTimeout(() => setDroneState('hovering'), 1000);
    } else if (action === 'hover') {
      setDroneState('hovering');
      setDroneAltitude(2.5);
    } else if (action === 'forward') {
      setDroneState('forward');
    } else if (action === 'land') {
      setDroneState('landing');
      setTimeout(() => {
        setDroneState('landed');
        setDroneAltitude(0);
      }, 1000);
    }
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    let out = '';
    switch (cmd) {
      case 'pwd': out = '/home/shubham/engineering_workspace'; break;
      case 'ls': out = 'alcohol_safety/  assignment_checker/  onequiz/  pinn_battery/  ros2_ws/  esp32_firmware/'; break;
      case 'whoami': out = 'shubham-verma (Aspiring Robotics & AI Engineer)'; break;
      case 'uname -a': out = 'Linux kali-robotics 6.8.0-kali-amd64 #1 SMP PREEMPT'; break;
      case 'python3 --version': out = 'Python 3.12.3 (OpenCV 4.9, PyTorch, TensorFlow)'; break;
      case 'git --version': out = 'git version 2.45.1'; break;
      case 'ip addr': out = 'inet 192.168.1.104/24 brd 192.168.1.255 scope global wlan0 (DDS Mesh active)'; break;
      case 'clear': setCliHistory([]); setCliInput(''); return;
      case 'help': out = 'Supported commands: pwd, ls, whoami, uname -a, python3 --version, git --version, ip addr, clear'; break;
      default: out = `bash: command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setCliHistory(prev => [...prev, { cmd: cliInput, out }]);
    setCliInput('');
  };

  const simulateAlcoholSpike = () => {
    setSensorAlcoholPPM(145);
    setIsRelayTripped(true);
  };

  const resetAlcoholSensor = () => {
    setSensorAlcoholPPM(18);
    setIsRelayTripped(false);
  };

  const triggerAITraining = () => {
    setIsTraining(true);
    let curEpoch = epoch;
    let curLoss = loss;
    const interval = setInterval(() => {
      curEpoch += 5;
      curLoss = Math.max(0.002, curLoss * 0.88);
      setEpoch(curEpoch);
      setLoss(Number(curLoss.toFixed(4)));
      if (curEpoch >= 100) {
        clearInterval(interval);
        setIsTraining(false);
      }
    }, 250);
  };

  return (
    <section id="engineering-lab" className="py-24 relative z-10 border-t border-[#253247]/40 bg-[#0A0E18]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] px-3.5 py-1 rounded-full border border-[#38BDF8]/20">
            Interactive Engineering World
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]">
            Explore My Engineering Laboratory
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Interactive simulation environments demonstrating Robotics, Drone Technology, Linux environments, Embedded systems, and AI workflows.
          </p>
        </div>

        {/* Lab Navigation Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'robotics', label: 'Lab A: Robotics Arm', icon: Bot },
            { id: 'drone', label: 'Lab B: Drone Flight (PX4)', icon: Navigation },
            { id: 'linux', label: 'Lab C: Kali / Linux OS', icon: TerminalIcon },
            { id: 'embedded', label: 'Lab D: Embedded ESP32', icon: Cpu },
            { id: 'ai', label: 'Lab E: AI & Machine Learning', icon: Brain },
          ].map((lab) => {
            const Icon = lab.icon;
            const isActive = activeLab === lab.id;
            return (
              <button
                key={lab.id}
                onClick={() => setActiveLab(lab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#38BDF8] text-[#070A12] shadow-lg shadow-[#38BDF8]/25 scale-[1.02]'
                    : 'bg-[#111B2B] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] border border-[#253247]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{lab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Lab Environment Showcase */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0C1220] border-2 border-[#253247] shadow-2xl">
          
          {/* LAB A: ROBOTICS */}
          {activeLab === 'robotics' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <HeroRoboticArm3D />
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div>
                  <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider">LAB A // 6-AXIS ARTICULATED MANIPULATION</span>
                  <h3 className="text-2xl font-bold text-[#F8FAFC] mt-1 font-sans">
                    Articulated Industrial Robotics
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                    Robotics integrates multi-joint forward &amp; inverse kinematics, servo PWM actuation, closed-loop feedback encoders, and computer-vision object alignment.
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#111B2B] border border-[#253247] space-y-1">
                    <span className="text-[#38BDF8] font-bold font-mono">1. Kinematic Linkages</span>
                    <p className="text-[#CBD5E1]">Denavit-Hartenberg (DH) parameters define joint coordinates, rotation matrices, and end-effector reach.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#111B2B] border border-[#253247] space-y-1">
                    <span className="text-[#8B5CF6] font-bold font-mono">2. Gripper Actuation</span>
                    <p className="text-[#CBD5E1]">Proportional current sensing ensures secure grasp without crushing delicate components.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#111B2B] border border-[#253247] space-y-1">
                    <span className="text-emerald-400 font-bold font-mono">3. ROS 2 Motion Planning</span>
                    <p className="text-[#CBD5E1]">MoveIt 2 collision avoidance planning for obstacle-free path trajectory execution.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#070A12] border border-[#253247] text-[11px] font-mono text-[#64748B]">
                  Notice: Real-time simulation demonstrating kinematic pick-and-place logic.
                </div>
              </div>
            </div>
          )}

          {/* LAB B: DRONE TECHNOLOGY */}
          {activeLab === 'drone' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                
                {/* Simulated Drone Viewport */}
                <div className="relative h-[340px] sm:h-[400px] rounded-2xl bg-[#070A12] border border-[#253247] overflow-hidden flex flex-col justify-between p-4">
                  {/* Sky grid */}
                  <div className="absolute inset-0 cyber-grid-bg opacity-30" />
                  
                  {/* Drone Model Vector */}
                  <div className="relative z-10 flex-1 flex items-center justify-center">
                    <div 
                      className={`transition-all duration-700 transform ${
                        droneState === 'taking_off' ? '-translate-y-12 scale-105' :
                        droneState === 'hovering' ? 'translate-y-0 animate-float' :
                        droneState === 'forward' ? 'translate-x-8 -translate-y-4 rotate-6' :
                        'translate-y-16 scale-90'
                      }`}
                    >
                      <img src="/projects/ros2-drone.svg" alt="Quadcopter Drone" className="w-64 sm:w-80" />
                    </div>
                  </div>

                  {/* Telemetry HUD */}
                  <div className="relative z-10 flex items-center justify-between bg-[#0C1220]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#253247] text-xs font-mono">
                    <div>
                      <span className="text-[#64748B] text-[10px] block">FLIGHT MODE</span>
                      <span className="text-[#38BDF8] font-bold uppercase">{droneState}</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] text-[10px] block">ALTITUDE (SITL)</span>
                      <span className="text-[#F8FAFC] font-bold">{droneAltitude.toFixed(1)} m</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] text-[10px] block">BATTERY</span>
                      <span className="text-emerald-400 font-bold">{droneBattery}%</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] text-[10px] block">QOS TOPIC</span>
                      <span className="text-[#8B5CF6]">/px4/odometry</span>
                    </div>
                  </div>
                </div>

                {/* Drone Control Panel */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleDroneAction('takeoff')}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono transition-colors"
                  >
                    Takeoff (3.2m)
                  </button>
                  <button
                    onClick={() => handleDroneAction('hover')}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#111B2B] hover:bg-[#1E293B] text-[#38BDF8] border border-[#253247] font-bold text-xs font-mono transition-colors"
                  >
                    Hover Mode
                  </button>
                  <button
                    onClick={() => handleDroneAction('forward')}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#111B2B] hover:bg-[#1E293B] text-[#F8FAFC] border border-[#253247] font-bold text-xs font-mono transition-colors"
                  >
                    Forward Kinematics
                  </button>
                  <button
                    onClick={() => handleDroneAction('land')}
                    className="flex-1 py-2 px-3 rounded-xl bg-red-600/80 hover:bg-red-500 text-white font-bold text-xs font-mono transition-colors"
                  >
                    Land Autopilot
                  </button>
                </div>
              </div>

              {/* Drone Technology Explanations */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider">LAB B // PX4 SITL &amp; GAZEBO SIMULATION</span>
                <h3 className="text-2xl font-bold text-[#F8FAFC] font-sans">
                  Autonomous Aerial Flight Systems
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Software-in-the-loop (SITL) simulations bridge flight controller firmware (PX4/ArduPilot) with Gazebo physics, ensuring safe navigation algorithm testing prior to physical hardware flights.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#111B2B] border border-[#253247]">
                    <strong className="text-[#38BDF8]">Brushless Motors &amp; ESCs:</strong> Electronic speed controllers modulate 3-phase PWM signals to maintain attitude balance.
                  </div>
                  <div className="p-3 rounded-xl bg-[#111B2B] border border-[#253247]">
                    <strong className="text-[#8B5CF6]">ROS 2 &amp; micro-XRCE-DDS:</strong> Real-time telemetry transport streaming IMU, GPS, and optical flow data to autonomous planners.
                  </div>
                  <div className="p-3 rounded-xl bg-[#111B2B] border border-[#253247]">
                    <strong className="text-emerald-400">Simulation Status:</strong> Virtual SITL environment. Not claiming physical commercial aircraft operation.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB C: KALI LINUX & LINUX ENVIRONMENT */}
          {activeLab === 'linux' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#253247]">
                <div>
                  <span className="text-xs font-mono text-[#38BDF8] uppercase">LAB C // LINUX &amp; ETHICAL CYBERSECURITY ENVIRONMENT</span>
                  <h3 className="text-2xl font-bold text-[#F8FAFC] font-sans">Interactive Linux Terminal Simulator</h3>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#111B2B] text-emerald-400 border border-emerald-500/30 w-fit">
                  Safe Sandbox Mode
                </span>
              </div>

              {/* Terminal Window */}
              <div className="rounded-2xl bg-[#070A12] border-2 border-[#253247] shadow-2xl overflow-hidden font-mono text-xs">
                {/* Titlebar */}
                <div className="px-4 py-2 bg-[#0C1220] border-b border-[#253247] flex items-center justify-between text-[#94A3B8]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 font-bold text-[#F8FAFC]">shubham@kali-core: ~/engineering_workspace</span>
                  </div>
                  <span className="text-[10px]">bash 5.2.21</span>
                </div>

                {/* Terminal Content */}
                <div className="p-5 space-y-3 min-h-[260px] max-h-[380px] overflow-y-auto">
                  {cliHistory.map((h, i) => (
                    <div key={i} className="space-y-1">
                      <div className="text-[#38BDF8]">
                        <span className="text-emerald-400">shubham@kali</span>:<span className="text-[#38BDF8]">~</span>$ <span className="text-white font-semibold">{h.cmd}</span>
                      </div>
                      <div className="text-[#94A3B8] pl-3 whitespace-pre-wrap">{h.out}</div>
                    </div>
                  ))}

                  {/* Input line */}
                  <form onSubmit={handleCliSubmit} className="flex items-center gap-2 text-[#38BDF8] pt-1">
                    <span className="text-emerald-400">shubham@kali</span>:<span className="text-[#38BDF8]">~</span>$
                    <input
                      type="text"
                      value={cliInput}
                      onChange={(e) => setCliInput(e.target.value)}
                      placeholder="Try: ls, whoami, python3 --version, ip addr, pwd, clear"
                      className="flex-1 bg-transparent text-white outline-none border-none p-0 focus:ring-0 text-xs font-mono"
                    />
                  </form>
                </div>
              </div>

              {/* Quick Linux Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
                  <strong className="text-[#38BDF8]">Linux Administration:</strong> Shell scripting, systemd service daemons, and package management on Ubuntu &amp; Kali Linux.
                </div>
                <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
                  <strong className="text-[#8B5CF6]">Network Diagnostics:</strong> IP socket routing, ping diagnostics, and Wi-Fi interface configuration for IoT nodes.
                </div>
                <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
                  <strong className="text-emerald-400">Security Fundamentals:</strong> Ethical cybersecurity exploration, permissions auditing, and secure SSH tunnels.
                </div>
              </div>
            </div>
          )}

          {/* LAB D: EMBEDDED SYSTEMS */}
          {activeLab === 'embedded' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="p-6 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#38BDF8] font-bold">ESP32 SENSOR TELEMETRY INTERFACE</span>
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
                      isRelayTripped ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {isRelayTripped ? 'RELAY: SAFETY CUTOFF' : 'RELAY: PASS / ACTIVE'}
                    </span>
                  </div>

                  {/* Live Sensor Gauge */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#94A3B8]">MQ-3 Gas Sensor Value:</span>
                      <span className={sensorAlcoholPPM > 50 ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                        {sensorAlcoholPPM} PPM {sensorAlcoholPPM > 50 ? '(THRESHOLD EXCEEDED)' : '(SAFE)'}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-[#111B2B] rounded-full overflow-hidden border border-[#253247]">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          sensorAlcoholPPM > 50 ? 'bg-red-500' : 'bg-[#38BDF8]'
                        }`}
                        style={{ width: `${Math.min(100, (sensorAlcoholPPM / 150) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Interactive Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={simulateAlcoholSpike}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs font-mono transition-colors shadow-md"
                    >
                      Simulate Gas / Alcohol Spike
                    </button>
                    <button
                      onClick={resetAlcoholSensor}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#111B2B] hover:bg-[#1E293B] text-[#38BDF8] border border-[#253247] font-bold text-xs font-mono transition-colors"
                    >
                      Reset Clean Air Baseline
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider">LAB D // ESP32 &amp; HARDWARE SENSORS</span>
                <h3 className="text-2xl font-bold text-[#F8FAFC] font-sans">Embedded Firmware &amp; Circuit Prototyping</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Direct microcontroller programming with Arduino IDE and Embedded C/C++. Interfacing analog sensor arrays, ADC voltage sampling, and optical isolation relays.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#111B2B] border border-[#253247]">
                    <strong className="text-[#38BDF8]">GPIO &amp; Interrupts:</strong> Hardware interrupt handling for encoder wheels and emergency stop lines.
                  </div>
                  <div className="p-3 rounded-xl bg-[#111B2B] border border-[#253247]">
                    <strong className="text-emerald-400">Breadboard Debugging:</strong> Signal noise attenuation with bypass capacitors and multimeter voltage checks.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB E: AI & MACHINE LEARNING */}
          {activeLab === 'ai' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="p-6 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#38BDF8] font-bold">PHYSICS-INFORMED NEURAL TRAINING (PINN)</span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-purple-500/20 text-purple-400 border border-purple-500/40">
                      Loss: L_data + λ·L_physics
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-[#111B2B] border border-[#253247]">
                      <span className="text-[#94A3B8] block text-[10px]">CURRENT EPOCH</span>
                      <span className="text-xl font-bold text-[#F8FAFC]">{epoch} / 100</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#111B2B] border border-[#253247]">
                      <span className="text-[#94A3B8] block text-[10px]">CONVERGENCE LOSS</span>
                      <span className="text-xl font-bold text-emerald-400">{loss}</span>
                    </div>
                  </div>

                  <button
                    onClick={triggerAITraining}
                    disabled={isTraining || epoch >= 100}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] text-[#070A12] font-bold text-xs font-mono hover:opacity-95 transition-opacity disabled:opacity-50"
                  >
                    {isTraining ? 'Training PINN Model in Browser...' : epoch >= 100 ? 'Convergence Achieved (Loss < 0.005)' : 'Simulate Gradient Descent Optimization'}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider">LAB E // PHYSICS-INFORMED AI (PINNS)</span>
                <h3 className="text-2xl font-bold text-[#F8FAFC] font-sans">AI &amp; Neural Differential Modeling</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Moving beyond pure black-box deep learning by embedding electrochemical conservation laws into neural network loss gradients for accurate battery lifecycle predictions.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#111B2B] border border-[#253247]">
                    <strong className="text-[#38BDF8]">OpenCV Computer Vision:</strong> Real-time biometric face detection using Haar classifiers and Flask backends.
                  </div>
                  <div className="p-3 rounded-xl bg-[#111B2B] border border-[#253247]">
                    <strong className="text-purple-400">Battery Digital Twin:</strong> Predicting State-of-Health (SoH) trajectory under non-linear degradation.
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
