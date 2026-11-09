import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Info
} from 'lucide-react';

interface DiagramItem {
  id: string;
  title: string;
  type: 'Circuit Schematic' | 'System Architecture' | 'Data Flow' | 'Database ER';
  image: string;
  project: string;
  description: string;
  connections?: Array<{ component: string; pin: string; target: string; signal: string; voltage: string }>;
}

export const DiagramViewer: React.FC = () => {
  const diagrams: DiagramItem[] = [
    {
      id: "diag-alc-circuit",
      title: "AI + IoT Alcohol Detection — Circuit Schematic & Pinout",
      type: "Circuit Schematic",
      image: "/projects/alcohol-detection.svg",
      project: "Alcohol Detection System",
      description: "Direct wiring layout between ESP32 microcontroller, MQ-3 alcohol sensor, airflow exhalation sensor, 5V optocoupled relay, buzzer, and status LEDs.",
      connections: [
        { component: "MQ-3 Analog Output", pin: "AOUT", target: "ESP32 GPIO 34 (ADC1_CH6)", signal: "Analog Voltage (0-3.3V)", voltage: "5V VCC / 3.3V Logic" },
        { component: "Airflow Pressure Sensor", pin: "VOUT", target: "ESP32 GPIO 35 (ADC1_CH7)", signal: "Analog Voltage (0-3.3V)", voltage: "3.3V VCC" },
        { component: "5V Safety Relay Module", pin: "IN", target: "ESP32 GPIO 26", signal: "Digital Active-LOW", voltage: "5V VCC / Optoisolated" },
        { component: "Piezo Buzzer Alarm", pin: "Positive (+)", target: "ESP32 GPIO 27", signal: "PWM Audio Frequency", voltage: "3.3V PWM" },
        { component: "Green Status LED", pin: "Anode (+)", target: "ESP32 GPIO 14 (via 330Ω)", signal: "Digital HIGH (Safe)", voltage: "3.3V" },
        { component: "Red Alert LED", pin: "Anode (+)", target: "ESP32 GPIO 12 (via 330Ω)", signal: "Digital HIGH (Cutoff)", voltage: "3.3V" },
        { component: "OLED Display (SSD1306)", pin: "SDA / SCL", target: "ESP32 GPIO 21 (SDA) / 22 (SCL)", signal: "I2C Protocol", voltage: "3.3V" }
      ]
    },
    {
      id: "diag-quiz-arch",
      title: "1QUIZ — Adaptive Quiz Engine Architecture",
      type: "System Architecture",
      image: "/projects/quiz-game.svg",
      project: "1QUIZ Platform",
      description: "Unified AI auto-routing pipeline connecting client-side test rooms to Item Response Theory (IRT) difficulty weighting, question database, and analytics."
    },
    {
      id: "diag-asg-flow",
      title: "Digital Classroom — Dual Workflow & Session Flowchart",
      type: "Data Flow",
      image: "/projects/assignment-checker.svg",
      project: "Assignment Checker",
      description: "Sequence flow: Teacher schedules submission session → Student delivers cryptographic answer hash → Teacher grades rubric → PDF report compiled."
    },
    {
      id: "diag-pinn-flow",
      title: "PINN Battery Digital Twin — Physics Loss Gradient Flow",
      type: "System Architecture",
      image: "/projects/pinn-battery.svg",
      project: "PINN Battery Twin",
      description: "Loss backpropagation diagram uniting empirical MSE loss with Arrhenius thermal penalty, SEI passivation resistance, and monotonic degradation bounds."
    }
  ];

  const [activeDiagram, setActiveDiagram] = useState<DiagramItem>(diagrams[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(2.5, z + 0.25));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.75, z - 0.25));
  const handleResetZoom = () => setZoomLevel(1);

  const handleDownloadSVG = () => {
    const a = document.createElement('a');
    a.href = activeDiagram.image;
    a.download = `${activeDiagram.id}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section id="diagrams" className="py-24 relative z-10 border-t border-[#253247]/60 bg-[#070A12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] px-3.5 py-1.5 rounded-full border border-[#253247] inline-flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
            Schematics &amp; Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
            Interactive Technical Diagrams &amp; Circuit Schematics
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Inspect verified hardware pinouts, signal voltage levels, and multi-tier system architectures with interactive zoom controls.
          </p>
        </div>

        {/* Diagram Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {diagrams.map((d) => (
            <button
              key={d.id}
              onClick={() => { setActiveDiagram(d); setZoomLevel(1); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                activeDiagram.id === d.id
                  ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow-md shadow-[#38BDF8]/20'
                  : 'bg-[#111B2B] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#162338] border border-[#253247]'
              }`}
            >
              {d.title.split('—')[0].trim()}
            </button>
          ))}
        </div>

        {/* Diagram Viewport & Details */}
        <div className="rounded-2xl bg-[#0C1220] border-2 border-[#253247] shadow-2xl overflow-hidden">
          
          {/* Viewport Top Bar */}
          <div className="px-5 py-3.5 bg-[#0C1220] border-b border-[#253247] flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-[#8B5CF6] uppercase block">
                {activeDiagram.type}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#F8FAFC] font-sans">
                {activeDiagram.title}
              </h3>
            </div>

            {/* Zoom & Action Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247] transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-[#38BDF8] px-2">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247] transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247] transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownloadSVG}
                className="px-3 py-2 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-xs font-mono text-[#38BDF8] border border-[#253247] flex items-center gap-1.5 transition-colors ml-2"
                title="Download SVG Schematic"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download SVG</span>
              </button>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="relative min-h-[380px] sm:min-h-[460px] bg-[#070A12] overflow-hidden flex items-center justify-center p-6">
            <div
              className="transition-transform duration-200 cursor-grab active:cursor-grabbing"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={activeDiagram.image}
                alt={activeDiagram.title}
                className="max-h-[380px] w-auto max-w-full drop-shadow-2xl"
              />
            </div>

            {/* Subtle Viewport Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#25324710_1px,transparent_1px),linear-gradient(to_bottom,#25324710_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          </div>

          {/* Description & Component Table */}
          <div className="p-6 bg-[#0C1220] border-t border-[#253247] space-y-4">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#38BDF8] font-bold flex items-center gap-2">
                <Info className="w-3.5 h-3.5" /> Architecture Details &amp; Engineering Rationale
              </h4>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 leading-relaxed">
                {activeDiagram.description}
              </p>
            </div>

            {/* Verified Hardware Connections Table (If available) */}
            {activeDiagram.connections && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-[#F8FAFC] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Hardware Pinout &amp; Signal Mapping:
                </span>
                <div className="overflow-x-auto rounded-xl border border-[#253247]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#111B2B] text-[#94A3B8] border-b border-[#253247]">
                      <tr>
                        <th className="p-2.5">Component</th>
                        <th className="p-2.5">Pin</th>
                        <th className="p-2.5">Microcontroller Pin</th>
                        <th className="p-2.5">Signal Type</th>
                        <th className="p-2.5">Voltage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#253247]/60 text-[#CBD5E1]">
                      {activeDiagram.connections.map((c, i) => (
                        <tr key={i} className="hover:bg-[#111B2B]/40">
                          <td className="p-2.5 font-bold text-[#F8FAFC]">{c.component}</td>
                          <td className="p-2.5 text-[#38BDF8]">{c.pin}</td>
                          <td className="p-2.5 text-emerald-400">{c.target}</td>
                          <td className="p-2.5">{c.signal}</td>
                          <td className="p-2.5 text-[#8B5CF6]">{c.voltage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
