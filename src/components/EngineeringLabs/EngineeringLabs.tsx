import React, { useState } from 'react';
import { Bot, Navigation, Terminal as TerminalIcon, Cpu, Brain } from 'lucide-react';
import { RoboticFabricationLab3D } from './RoboticFabricationLab3D';
import { CyberSecurityTerminal } from './CyberSecurityTerminal';
import { AutonomousDroneSimulator3D } from './AutonomousDroneSimulator3D';
import { EmbeddedHardwareLab } from './EmbeddedHardwareLab';

export const EngineeringLabs: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'robotics' | 'drone' | 'linux' | 'embedded' | 'ai'>('robotics');

  // Lab E: AI Training State
  const [epoch, setEpoch] = useState(42);
  const [loss, setLoss] = useState(0.0142);
  const [isTraining, setIsTraining] = useState(false);

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
          
          {/* LAB A: 6-AXIS ARTICULATED ROBOTIC FABRICATION */}
          {activeLab === 'robotics' && (
            <RoboticFabricationLab3D />
          )}

          {/* LAB B: PX4 SITL & GAZEBO 3D SIMULATION */}
          {activeLab === 'drone' && (
            <AutonomousDroneSimulator3D />
          )}

          {/* LAB C: KALI LINUX & ETHICAL CYBERSECURITY ENVIRONMENT */}
          {activeLab === 'linux' && (
            <CyberSecurityTerminal />
          )}

          {/* LAB D: EMBEDDED SYSTEMS & ESP32 HARDWARE SENSORS */}
          {activeLab === 'embedded' && (
            <EmbeddedHardwareLab />
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
