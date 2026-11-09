import React, { useState } from 'react';
import { Layers, Cpu, Shield, Sliders, Eye, Zap, CheckCircle2 } from 'lucide-react';

interface ComponentLayer {
  id: string;
  name: string;
  subsystem: 'Processing' | 'Sensing' | 'Actuation' | 'Power' | 'Mechanical';
  pinout: string;
  voltage: string;
  functionDescription: string;
  failSafeMode: string;
  explodedOffset: number; // Y offset in pixels at 100% explosion
  iconColor: string;
}

const HARDWARE_COMPONENTS: ComponentLayer[] = [
  {
    id: 'case_top',
    name: 'Top Enclosure & Anti-Dilution Air Tube',
    subsystem: 'Mechanical',
    pinout: 'Chamber geometry with one-way exhalation valve',
    voltage: 'Passive',
    functionDescription: 'Prevents ambient cabin wind or side-drafts from diluting driver breath sample during the mandatory 3-second exhalation interval.',
    failSafeMode: 'Physical acoustic whistle confirms proper continuous exhalation pressure.',
    explodedOffset: -180,
    iconColor: '#94A3B8'
  },
  {
    id: 'camera_unit',
    name: 'ESP32-CAM Driver Verification Module',
    subsystem: 'Sensing',
    pinout: 'OV2640 Sensor via 8-bit DVP / GPIO0, GPIO4, GPIO16',
    voltage: '3.3V / 5.0V (310mA peak during flash)',
    functionDescription: 'Captures driver portrait during the breath test to prevent co-passenger proxy blowing; computes Eye Aspect Ratio (EAR) for drowsiness checks.',
    failSafeMode: 'If camera fails or driver face is obscured, system prompts for re-scan or triggers secondary PIN verification.',
    explodedOffset: -130,
    iconColor: '#8B5CF6'
  },
  {
    id: 'oled_display',
    name: '0.96" SSD1306 OLED Telemetry Screen',
    subsystem: 'Actuation',
    pinout: 'I2C Interface (SDA: GPIO21, SCL: GPIO22)',
    voltage: '3.3V DC (8mA)',
    functionDescription: 'Displays real-time Blood Alcohol Concentration (BAC) in mg/100mL, sensor heating countdown timer (20s), and vehicle lock state.',
    failSafeMode: 'Display freeze does not block safety relay lock loop.',
    explodedOffset: -80,
    iconColor: '#38BDF8'
  },
  {
    id: 'mq3_sensor',
    name: 'MQ-3 Semiconductor Alcohol Gas Chamber',
    subsystem: 'Sensing',
    pinout: 'Analog Out: GPIO34 (ADC1_CH6), VCC: 5V, GND',
    voltage: '5.0V DC ±0.1V (Internal heating element 150mA)',
    functionDescription: 'SnO2 resistive sensor. Ethanol gas reduces surface resistance, producing a linear voltage rise sampled by an internal moving-average ADC filter.',
    failSafeMode: 'Detects disconnected sensor (ADC = 0V) and triggers tamper lock.',
    explodedOffset: -30,
    iconColor: '#F59E0B'
  },
  {
    id: 'esp32_mcu',
    name: 'ESP32 Dual-Core Xtensa LX6 Mainboard',
    subsystem: 'Processing',
    pinout: 'Tensilica 240MHz, 520KB SRAM, FreeRTOS dual tasks',
    voltage: '3.3V Logic Level (LM1117-3.3 on-board regulator)',
    functionDescription: 'Core controller: Core 0 executes Wi-Fi telemetry and MQTT cloud alerts; Core 1 runs deterministic 50ms sensor sampling and ignition interlock state machine.',
    failSafeMode: 'Hardware Watchdog Timer (WDT) triggers instant safe-state reboot if task freezes.',
    explodedOffset: 20,
    iconColor: '#10B981'
  },
  {
    id: 'relay_module',
    name: '5V Opto-Isolated Ignition Cutoff Relay',
    subsystem: 'Actuation',
    pinout: 'Control: GPIO26, Normally Closed (NC) to Ignition Coil',
    voltage: '5.0V DC coil (70mA), 250VAC/10A contacts',
    functionDescription: 'Wired in series with vehicle starter ignition harness. When intoxication threshold (0.05% BAC) is exceeded, relay energizes to OPEN, physically immobilizing the engine.',
    failSafeMode: 'Default NC relay ensures engine can still be turned off manually; opto-isolation prevents back-EMF from vehicle starter spikes.',
    explodedOffset: 70,
    iconColor: '#EF4444'
  },
  {
    id: 'audio_buzzer',
    name: 'Active Piezo Alarm & Warning Indicators',
    subsystem: 'Actuation',
    pinout: 'Buzzer: GPIO25 (PWM DAC), LEDs: GPIO18, 19, 23',
    voltage: '5.0V DC (30mA)',
    functionDescription: 'Acoustic warning (85dB continuous pulsed alarm when intoxicated) alongside tricolor status LEDs (Green = Pass, Red = Lockout).',
    failSafeMode: 'Independent hardware transistor driver.',
    explodedOffset: 120,
    iconColor: '#EC4899'
  },
  {
    id: 'power_buck',
    name: 'Automotive Isolated LM2596 DC-DC Converter',
    subsystem: 'Power',
    pinout: 'Input: 12V/24V Car Battery, Output: 5V Regulated (2.5A)',
    voltage: 'VIN: 9V-35V DC, VOUT: 5.0V DC (Transient clamped)',
    functionDescription: 'Converts vehicle automotive battery rail into clean 5V logic supply with Schottky diode reverse-polarity protection and LC filter.',
    failSafeMode: 'Internal thermal shutdown and current limit protection (3A).',
    explodedOffset: 170,
    iconColor: '#6366F1'
  }
];

export const Exploded3DView: React.FC = () => {
  const [explosionPercent, setExplosionPercent] = useState<number>(65);
  const [selectedComponentId, setSelectedComponentId] = useState<string>('mq3_sensor');

  const selectedComp = HARDWARE_COMPONENTS.find((c) => c.id === selectedComponentId) || HARDWARE_COMPONENTS[3];

  return (
    <section id="exploded-view" className="py-24 relative z-10 bg-[#0A0E18] border-t border-[#253247]/60">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-10 w-96 h-96 rounded-full bg-[#38BDF8]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#EF4444]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111B2B] border border-[#38BDF8]/30 text-xs font-mono text-[#38BDF8]">
            <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>HARDWARE ARCHITECTURE INSPECTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Exploded 3D Project View
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Interactive physical teardown of Shubham's flagship <strong>AI + IoT Alcohol Detection with Vehicle Engine Lock</strong> hardware subsystem.
          </p>
        </div>

        {/* Explosion Factor Slider Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-[#0D1420] border border-[#253247] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sliders className="w-5 h-5 text-[#38BDF8]" />
            <div>
              <span className="text-xs font-mono font-bold text-[#F8FAFC] block">
                Teardown Explosion Factor: <span className="text-[#38BDF8]">{explosionPercent}%</span>
              </span>
              <span className="text-[11px] text-[#64748B]">
                Drag to assemble into the automotive case or expand individual modules
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-72">
            <span className="text-xs font-mono text-[#94A3B8]">Assembled</span>
            <input
              type="range"
              min="0"
              max="100"
              value={explosionPercent}
              onChange={(e) => setExplosionPercent(Number(e.target.value))}
              className="w-full h-2 bg-[#162338] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
            />
            <span className="text-xs font-mono text-[#38BDF8]">Exploded</span>
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 3D Exploded Visual Stage (7 cols) */}
          <div className="lg:col-span-7 relative rounded-3xl bg-[#070A12] border border-[#253247] p-8 shadow-2xl overflow-hidden min-h-[560px] flex items-center justify-center">
            
            {/* Fine Calibration Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#25324715_1px,transparent_1px),linear-gradient(to_bottom,#25324715_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Central Axis Alignment Guide Wire */}
            <div className="absolute top-10 bottom-10 left-1/2 w-px bg-gradient-to-b from-transparent via-[#38BDF8]/30 to-transparent pointer-events-none" />

            {/* Exploded Component Stack */}
            <div className="relative w-full max-w-md h-[460px] flex flex-col items-center justify-center">
              {HARDWARE_COMPONENTS.map((comp) => {
                const isSelected = comp.id === selectedComponentId;
                // Calculate actual dynamic translateY based on explosionPercent
                const translateY = (comp.explodedOffset * explosionPercent) / 100;

                return (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedComponentId(comp.id)}
                    style={{
                      transform: `translateY(${translateY}px) perspective(800px) rotateX(25deg)`,
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s',
                    }}
                    className={`absolute w-72 sm:w-80 cursor-pointer select-none rounded-xl p-3 border transition-all ${
                      isSelected
                        ? 'bg-[#111B2B] border-[#38BDF8] shadow-lg shadow-[#38BDF8]/20 z-30 scale-105'
                        : 'bg-[#0D1420]/90 border-[#253247] hover:border-[#38BDF8]/60 hover:bg-[#162338] z-10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: comp.iconColor }}
                        />
                        <span className="text-xs font-mono font-bold text-[#F8FAFC] truncate">
                          {comp.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#94A3B8] px-1.5 py-0.5 rounded bg-[#070A12] border border-[#253247]">
                        {comp.subsystem}
                      </span>
                    </div>

                    {/* Show pinout snippet if selected */}
                    {isSelected && (
                      <div className="mt-2 pt-2 border-t border-[#253247] flex items-center justify-between text-[10px] font-mono text-[#38BDF8]">
                        <span>{comp.voltage}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> Inspecting
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Overlay Status Pill */}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-[#94A3B8] bg-[#070A12]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#253247]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Opto-Isolated System Ready</span>
            </div>

            {/* Quick Teardown Mode Button */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setExplosionPercent(explosionPercent === 0 ? 80 : 0)}
                className="px-3 py-1.5 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-xs font-mono text-[#38BDF8] border border-[#253247] transition-colors"
              >
                {explosionPercent === 0 ? 'Explode Stack' : 'Assemble Enclosure'}
              </button>
            </div>

          </div>

          {/* Component Datasheet & Safety Details (5 cols) */}
          <div className="lg:col-span-5 space-y-5 rounded-3xl bg-[#0D1420] border border-[#253247] p-6 shadow-2xl">
            
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-[#253247] pb-4">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedComp.iconColor }}
                />
                <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">
                  {selectedComp.subsystem} Subsystem
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#111B2B] text-[#94A3B8] border border-[#253247]">
                {selectedComp.voltage}
              </span>
            </div>

            {/* Component Name */}
            <div>
              <h3 className="text-2xl font-bold text-[#F8FAFC] font-sans">
                {selectedComp.name}
              </h3>
            </div>

            {/* Hardware Pinout & Signal Mapping */}
            <div className="p-3.5 rounded-2xl bg-[#111B2B] border border-[#253247] space-y-1">
              <span className="text-[11px] font-mono text-[#38BDF8] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                Hardware Signal &amp; Pin Connection
              </span>
              <p className="text-xs font-mono text-[#F8FAFC]">
                {selectedComp.pinout}
              </p>
            </div>

            {/* Functional Description */}
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#94A3B8] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#38BDF8]" />
                Operational Role
              </span>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                {selectedComp.functionDescription}
              </p>
            </div>

            {/* Safety & Fail-Safe Mode */}
            <div className="p-3.5 rounded-2xl bg-[#162338]/60 border border-emerald-500/30 space-y-1">
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Automotive Fail-Safe Protection
              </span>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {selectedComp.failSafeMode}
              </p>
            </div>

            {/* Verification Checklist */}
            <div className="pt-2 flex flex-col gap-2 text-xs font-mono text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Opto-isolation prevents ignition starter flyback back-EMF</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>FreeRTOS watchdog timer resets controller in &lt;100ms</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
