import React, { useState } from 'react';
import {
  Download,
  ArrowDown,
  Sparkles,
  Activity,
  Cpu,
} from 'lucide-react';

interface ArchitectureNode {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  signalType: string;
  voltage: string;
  hardwareRef: string;
  statusSafe: string;
  statusAlert: string;
  pinout: string;
  specs: { [key: string]: string };
}

export const AlcoholArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hardware' | 'firmware' | 'future'>('hardware');
  const [simulationState, setSimulationState] = useState<'safe' | 'alert'>('safe');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-3');

  const currentNodes: ArchitectureNode[] = [
    {
      id: 'node-1',
      stepNumber: '01',
      title: 'Alcohol-Vapour Sensing Stage',
      subtitle: 'Heated SnO2 Semiconductor Transducer',
      category: 'Input Transducer Subsystem',
      description:
        'The heated tin-dioxide (SnO2) sensing element absorbs airborne ethanol molecules. At operating temperature (350°C), alcohol vapors trigger a surface reduction reaction, releasing trapped electrons and significantly lowering the internal sensor resistance Rs.',
      signalType: 'Gas Concentration → Variable Resistance (Rs)',
      voltage: '5.0V DC Heater Supply (~150mA)',
      hardwareRef: 'MQ-3 Semiconductor Gas Module',
      statusSafe: 'Rs = 42 kΩ (Clean Air High Resistance)',
      statusAlert: 'Rs = 4.8 kΩ (Ethanol Vapor Resistance Drop)',
      pinout: 'Pins: VCC (5V), GND, AOUT (Analog), DOUT (Digital)',
      specs: {
        'Sensing Principle': 'SnO2 Surface Adsorption',
        'Heating Element': '5V Internal Heater (31Ω ±3Ω)',
        'Pre-Heat Duration': '20 Seconds Minimum',
      },
    },
    {
      id: 'node-2',
      stepNumber: '02',
      title: 'Signal Conditioning & Divider',
      subtitle: 'Passive Precision Voltage Divider & Decoupling',
      category: 'Signal Conditioning Circuit',
      description:
        'The sensor resistance Rs forms a half-bridge with a high-precision 10 kΩ load resistor (RL). The analog output voltage follows AOUT = VCC * RL / (Rs + RL). A parallel 0.1µF ceramic capacitor attenuates heater PWM ripple and high-frequency noise.',
      signalType: 'Variable Resistance → Analog Voltage (0.0V - 3.3V)',
      voltage: '3.3V Max Scaled Analog Output',
      hardwareRef: '10 kΩ Precision RL + 100nF Decoupling Capacitor',
      statusSafe: 'V_out = 0.66V DC (Baseline Clean Air)',
      statusAlert: 'V_out = 2.45V DC (High Voltage Surge)',
      pinout: 'Connected between MQ-3 AOUT and ESP32 GPIO 34',
      specs: {
        'Load Resistor RL': '10 kΩ ±1% Metal Film',
        'Noise Decoupling': '100nF (0.1µF) Ceramic Capacitor',
        'Output Impedance': '< 5 kΩ to ADC Input',
      },
    },
    {
      id: 'node-3',
      stepNumber: '03',
      title: 'ESP32 12-bit SAR ADC & Processing',
      subtitle: 'Dual-Core Xtensa LX6 Microcontroller',
      category: 'Embedded Microcontroller Core',
      description:
        'Digitizes analog voltage on GPIO 34 using ADC1 Channel 6 with eFuse calibration. Core 1 acquires samples deterministically at 100 Hz, applying an internal 50-sample moving average filter to compute a noise-free rolling average.',
      signalType: 'Continuous Voltage → 12-bit Raw ADC (0 - 4095)',
      voltage: '3.3V Operating Logic (AMS1117-3.3 Rail)',
      hardwareRef: 'ESP32-WROOM-32 DevKit V1 (Tensilica 240MHz)',
      statusSafe: 'ADC Count: 824 / 4095 (~0.00% BAC equivalent)',
      statusAlert: 'ADC Count: 3040 / 4095 (>0.05% BAC Exceeded)',
      pinout: 'Sampling Pin: GPIO 34 (ADC1_CH6, Input Only)',
      specs: {
        'ADC Architecture': '12-bit SAR (Successive Approximation)',
        'Clock Speed': '240 MHz Dual-Core Xtensa LX6',
        'Sampling Rate': '100 Hz Deterministic Timer Interrupt',
      },
    },
    {
      id: 'node-4',
      stepNumber: '04',
      title: 'Firmware Comparator & State Logic',
      subtitle: 'Moving Average Filter & Threshold Evaluator',
      category: 'FreeRTOS Firmware State Machine',
      description:
        'Firmware compares the moving average against the safety threshold (equivalent to 0.05% BAC / 50 PPM). If exceeded for 3 consecutive samples, the safety lock state machine transitions from PASS to LOCKED, dispatching an immediate event interrupt.',
      signalType: 'Software State Flag: STATE_PASS vs. STATE_LOCKOUT',
      voltage: 'FreeRTOS Task Event Flag',
      hardwareRef: 'FreeRTOS Task_SafetyRelayISR (Priority 4)',
      statusSafe: 'State: PASS (Ignition Continuity Maintained)',
      statusAlert: 'State: LOCKOUT (Hardware Safety Interlock Tripped)',
      pinout: 'Internal Register State Machine in FreeRTOS Task',
      specs: {
        'Filter Algorithm': '50-Sample Finite Moving Average (SMA)',
        'Decision Latency': '< 15 ms from Threshold Breach',
        'Watchdog Timer': 'Hardware WDT Enabled (100ms Timeout)',
      },
    },
    {
      id: 'node-5',
      stepNumber: '05',
      title: 'Opto-Isolated Cutoff & Alert System',
      subtitle: 'EL817 Optocoupler & 5V Automotive Relay',
      category: 'Actuation & Safety Barrier',
      description:
        'GPIO 18 drives an EL817 optical isolator (5,000 V_rms barrier) that energizes the 5V relay coil. The relay Normally-Closed (NC) contacts break starter circuit continuity, physically preventing engine ignition while activating the 2.4 kHz piezo buzzer and OLED warning.',
      signalType: 'GPIO Logic HIGH/LOW → Relay Contact Isolation',
      voltage: '5V Relay Coil / 3.3V Logic Drive',
      hardwareRef: 'Songle 5V Relay (10A 250VAC) + EL817 + 1N4007 Diode',
      statusSafe: 'Relay: De-Energized (NC Closed = Starter Active)',
      statusAlert: 'Relay: ENERGIZED (NC OPEN = Starter Cutoff!)',
      pinout: 'Relay Control: GPIO 18 | Piezo Buzzer: GPIO 25 (PWM)',
      specs: {
        'Galvanic Barrier': '5,000 V_rms Optical Isolation (EL817)',
        'Flyback Protection': '1N4007 Diode in Anti-Parallel',
        'Contact Switch Time': '< 8 ms Electromechanical Transition',
      },
    },
  ];

  const selectedNode =
    currentNodes.find((n) => n.id === selectedNodeId) || currentNodes[2];

  const handleDownloadSVG = () => {
    const svgElement = document.getElementById('alcohol-architecture-svg');
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ESP32_Alcohol_Detection_Architecture_${activeTab}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="alcohol-architecture" className="p-6 sm:p-8 rounded-3xl bg-[#0C1220] border-2 border-[#253247] space-y-6 shadow-2xl">
      {/* Top Header & Interactive Architecture Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#253247] pb-4">
        <div>
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            PHASE 07 // 2D SIGNAL FLOW &amp; ARCHITECTURAL SCHEMATIC
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-[#F8FAFC] mt-0.5">
            System Architecture &amp; Signal Dataflow
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Interactive multi-stage schematic illustrating chemical transduction, analog voltage scaling, FreeRTOS ADC processing, and optocoupled relay safety isolation.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-[#070A12] p-0.5 rounded-xl border border-[#253247] text-xs font-mono">
            {[
              { id: 'hardware', label: 'Hardware Signal Flow' },
              { id: 'firmware', label: 'Firmware Pipeline' },
              { id: 'future', label: 'Gen-2 Future Scope' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Download SVG Export */}
          <button
            onClick={handleDownloadSVG}
            className="p-2 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-[#38BDF8] border border-[#253247] transition-colors"
            title="Download Architecture Diagram as SVG"
            aria-label="Download Architecture Diagram"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Signal Simulation Control Ribbon */}
      {activeTab !== 'future' && (
        <div className="p-4 rounded-2xl bg-[#070A12] border-2 border-[#253247] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-slate-300">
              SIMULATE SIGNAL FLOW STATE:
            </span>
            <span
              className={`px-2.5 py-0.5 rounded font-bold border ${
                simulationState === 'safe'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
              }`}
            >
              {simulationState === 'safe'
                ? 'CLEAN AIR BASELINE (PASS)'
                : 'ALCOHOL SPIKE (INTERLOCK CUTOFF)'}
            </span>
          </div>

          {/* State Switcher Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSimulationState('safe')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                simulationState === 'safe'
                  ? 'bg-emerald-600 text-white font-bold border-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-[#111B2B] text-slate-400 border-[#253247] hover:text-white'
              }`}
            >
              🌱 Clean Air (Pass)
            </button>
            <button
              onClick={() => setSimulationState('alert')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                simulationState === 'alert'
                  ? 'bg-red-600 text-white font-bold border-red-400 shadow-md shadow-red-500/20'
                  : 'bg-[#111B2B] text-slate-400 border-[#253247] hover:text-white'
              }`}
            >
              🚨 Intoxicated Spike (Lock)
            </button>
          </div>
        </div>
      )}

      {/* MAIN VIEW: Hardware / Firmware Flow (Left 8 Cols) + Node Inspector (Right 4 Cols) */}
      {activeTab === 'hardware' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Signal Pipeline Flow Canvas (8 Cols) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="relative rounded-2xl bg-[#070A12] border-2 border-[#253247] p-5 shadow-2xl space-y-4">
              <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 border-b border-[#253247] pb-2">
                <span>SIGNAL DIRECTION: SENSOR ➔ CONDITIONING ➔ ESP32 ➔ RELAY</span>
                <span className="text-[#38BDF8]">Click any stage to inspect details</span>
              </div>

              {/* 5 Sequential Architecture Blocks */}
              <div className="space-y-3">
                {currentNodes.map((node, index) => {
                  const isSelected = selectedNodeId === node.id;
                  const isAlert = simulationState === 'alert';

                  return (
                    <React.Fragment key={node.id}>
                      {/* Architecture Block Card */}
                      <div
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer select-none ${
                          isSelected
                            ? 'bg-[#111D30] border-[#38BDF8] shadow-lg shadow-[#38BDF8]/20 ring-1 ring-[#38BDF8] scale-[1.01]'
                            : 'bg-[#0A0F1D] border-[#253247] hover:border-[#38BDF8]/60 hover:bg-[#0E1528]'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start sm:items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 border ${
                                isSelected
                                  ? 'bg-[#38BDF8] text-[#070A12] border-[#38BDF8]'
                                  : 'bg-[#111B2B] text-[#38BDF8] border-[#253247]'
                              }`}
                            >
                              {node.stepNumber}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-slate-400 uppercase">
                                  {node.category}
                                </span>
                                {isSelected && (
                                  <span className="text-[10px] font-mono text-[#38BDF8] font-bold">
                                    ● ACTIVE INSPECT
                                  </span>
                                )}
                              </div>
                              <h4 className="text-sm sm:text-base font-bold text-[#F8FAFC] font-sans">
                                {node.title}
                              </h4>
                              <p className="text-xs font-mono text-[#38BDF8]">
                                {node.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Live Simulation State Indicator */}
                          <div className="text-left sm:text-right font-mono text-xs space-y-0.5">
                            <span className="text-slate-400 text-[10px] block">
                              LIVE PROPAGATION:
                            </span>
                            <span
                              className={`font-bold block ${
                                isAlert ? 'text-red-400' : 'text-emerald-400'
                              }`}
                            >
                              {isAlert ? node.statusAlert : node.statusSafe}
                            </span>
                            <span className="text-slate-500 text-[10px] block">
                              {node.voltage}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Animated Connector Arrow between stages */}
                      {index < currentNodes.length - 1 && (
                        <div className="flex justify-center py-0.5">
                          <div
                            className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono transition-all ${
                              isAlert
                                ? 'bg-red-950/30 text-red-300 border-red-500/40 animate-pulse'
                                : 'bg-[#111B2B] text-slate-400 border-[#253247]'
                            }`}
                          >
                            <ArrowDown
                              className={`w-3.5 h-3.5 ${
                                isAlert ? 'text-red-400' : 'text-[#38BDF8]'
                              } animate-bounce`}
                            />
                            <span>
                              {index === 0
                                ? 'Rs Variable Resistance Divider'
                                : index === 1
                                ? 'Continuous 0-3.3V Analog Voltage'
                                : index === 2
                                ? 'Deterministic 12-bit ADC FIFO Queue'
                                : 'Optocoupled Low-Side Transistor Trigger'}
                            </span>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Node Inspector & Datasheet Card (4 Cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-[#070A12] border-2 border-[#253247] p-5 shadow-2xl space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-[#253247] pb-3">
              <span className="text-[10px] text-[#38BDF8] font-bold uppercase tracking-wider">
                STAGE {selectedNode.stepNumber} // TECHNICAL DATASHEET
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Verified Benchtop
              </span>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase block">
                {selectedNode.category}
              </span>
              <h4 className="text-base font-bold text-white font-sans mt-0.5">
                {selectedNode.title}
              </h4>
              <p className="text-xs text-[#38BDF8] mt-0.5">{selectedNode.subtitle}</p>
            </div>

            <p className="text-[#94A3B8] text-[11px] leading-relaxed font-sans">
              {selectedNode.description}
            </p>

            {/* Hardware Pinout Box */}
            <div className="p-3 rounded-xl bg-[#0D1525] border border-[#253247] space-y-1">
              <span className="text-slate-400 text-[10px] font-bold block flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
                HARDWARE WIRING &amp; PINOUT:
              </span>
              <span className="text-white text-[11px] font-bold block">
                {selectedNode.pinout}
              </span>
            </div>

            {/* Verified Specs Table */}
            <div className="p-3 rounded-xl bg-[#0D1525] border border-[#253247] space-y-1.5">
              <span className="text-slate-400 text-[10px] font-bold block">
                ELECTRICAL CHARACTERISTICS:
              </span>
              {Object.entries(selectedNode.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between py-0.5 text-[11px]">
                  <span className="text-slate-400">{key}:</span>
                  <span className="text-emerald-400 font-bold">{val}</span>
                </div>
              ))}
            </div>

            {/* Live Propagation State */}
            <div className="p-3 rounded-xl bg-[#111D30] border border-cyan-500/30 space-y-1">
              <span className="text-cyan-300 text-[10px] font-bold uppercase block flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-300" />
                SIMULATION BEHAVIOR:
              </span>
              <span className="text-slate-200 text-[11px] block">
                {simulationState === 'alert'
                  ? selectedNode.statusAlert
                  : selectedNode.statusSafe}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: Firmware Pipeline View */}
      {activeTab === 'firmware' && (
        <div className="p-6 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-5 font-mono text-xs">
          <div className="border-b border-[#253247] pb-3">
            <span className="text-[#38BDF8] font-bold text-sm block">
              FreeRTOS MULTI-TASKING FIRMWARE ARCHITECTURE (SMP DUAL-CORE)
            </span>
            <p className="text-slate-400 text-[11px] mt-1">
              How the ESP32 divides deterministic sensor sampling, moving average calculations, safety interrupts, and OLED telemetry across both 240MHz Xtensa cores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Core 0 */}
            <div className="p-4 rounded-xl bg-[#0D1525] border border-[#253247] space-y-3">
              <div className="flex justify-between items-center border-b border-[#253247] pb-2">
                <span className="font-bold text-cyan-400">XTENSA CORE 0: TELEMETRY &amp; I/O</span>
                <span className="text-[10px] text-slate-400">Priority: Normal</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-[#070A12] border border-[#253247]">
                  <strong className="text-white block">Task_OLED_Display (10 Hz)</strong>
                  <p className="text-slate-400 text-[10px]">
                    Draws BAC bar graphs, heating countdown, and status flags over 400 kHz I2C Fast-Mode.
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#070A12] border border-[#253247]">
                  <strong className="text-white block">Task_UART_Telemetry (115200 Baud)</strong>
                  <p className="text-slate-400 text-[10px]">
                    Streams structured CSV debugging packets for oscilloscope validation and Python logging.
                  </p>
                </div>
              </div>
            </div>

            {/* Core 1 */}
            <div className="p-4 rounded-xl bg-[#0D1525] border border-red-500/30 space-y-3">
              <div className="flex justify-between items-center border-b border-[#253247] pb-2">
                <span className="font-bold text-red-400">XTENSA CORE 1: REAL-TIME SAFETY LOOP</span>
                <span className="text-[10px] text-emerald-400">Priority: Real-Time High</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-[#070A12] border border-[#253247]">
                  <strong className="text-white block">Task_ADC_Sampler (100 Hz ISR Timer)</strong>
                  <p className="text-slate-400 text-[10px]">
                    Non-blocking 12-bit ADC sampling on GPIO 34. Pushes raw counts into a 50-sample circular buffer.
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#070A12] border border-[#253247]">
                  <strong className="text-white block">Task_SafetyInterlock_ISR (Immediate)</strong>
                  <p className="text-slate-400 text-[10px]">
                    Hardware interrupt tripper driving GPIO 18 LOW/HIGH to energize the optocoupled relay within &lt;10ms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: Future Architecture Tab */}
      {activeTab === 'future' && (
        <div className="p-6 rounded-2xl bg-[#070A12] border-2 border-purple-500/40 space-y-4">
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>GEN-2 PROPOSED EXPANSION (PLANNED HARDWARE ENHANCEMENTS)</span>
          </div>

          <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
            The following modules are planned additions for commercial vehicle deployment and are explicitly documented as future research scope:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-4 rounded-xl bg-[#111B2B] border border-purple-500/30 space-y-1">
              <span className="text-purple-400 font-bold block">1. Differential Airflow Sensor</span>
              <p className="text-[#94A3B8]">
                MPX5010DP pressure transducer to confirm genuine exhalation velocity and defeat compressed-air bypasses.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#111B2B] border border-purple-500/30 space-y-1">
              <span className="text-purple-400 font-bold block">2. ESP32-CAM Face Verification</span>
              <p className="text-[#94A3B8]">
                Secondary camera module computing Eye Aspect Ratio (EAR) and facial verification to prevent passenger proxy blowing.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#111B2B] border border-purple-500/30 space-y-1">
              <span className="text-purple-400 font-bold block">3. CAN-Bus J1939 ECU Gateway</span>
              <p className="text-[#94A3B8]">
                Direct optical CAN-bus transceiver sending digital immobilizer packets to the vehicle ECU, replacing relay wiring.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hidden SVG Export Template */}
      <div className="hidden">
        <svg id="alcohol-architecture-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 650" width="800" height="650">
          <rect width="800" height="650" fill="#080B12" />
          <text x="400" y="40" fill="#F8FAFC" fontFamily="sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">
            ESP32 Alcohol Detection System — Architecture Diagram
          </text>
          <text x="400" y="65" fill="#38BDF8" fontFamily="monospace" fontSize="11" textAnchor="middle">
            Verified Benchtop Hardware Pipeline (2D CAD Vector)
          </text>
          {currentNodes.map((n, i) => {
            const y = 90 + i * 105;
            return (
              <g key={n.id}>
                <rect x="150" y={y} width="500" height="70" rx="10" fill="#0E1420" stroke="#38BDF8" strokeWidth="1.5" />
                <text x="170" y={y + 26} fill="#38BDF8" fontFamily="monospace" fontSize="10">{n.category.toUpperCase()}</text>
                <text x="170" y={y + 48} fill="#F8FAFC" fontFamily="sans-serif" fontSize="14" fontWeight="bold">{n.title}</text>
                <text x="630" y={y + 40} fill="#10B981" fontFamily="monospace" fontSize="10" textAnchor="end">{n.voltage}</text>
                {i < currentNodes.length - 1 && (
                  <line x1="400" y1={y + 70} x2="400" y2={y + 105} stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 2" />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
};
