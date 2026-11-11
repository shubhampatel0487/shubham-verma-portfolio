import React, { useState, useEffect, useRef } from 'react';
import {
  Cpu,
  Zap,
  Activity,
  Sliders,
  Terminal,
  Flame,
  Radio,
  Power,
} from 'lucide-react';

interface PinInfo {
  pin: string;
  name: string;
  type: 'ADC' | 'GPIO' | 'I2C' | 'POWER';
  voltage: string;
  connectedTo: string;
  role: string;
  freertosRole: string;
}

const PIN_CONFIGS: PinInfo[] = [
  {
    pin: 'GPIO 34',
    name: 'ADC1_CH6',
    type: 'ADC',
    voltage: '0.0 - 3.3V',
    connectedTo: 'MQ-3 Gas Sensor (AOUT pin)',
    role: '12-bit Analog-to-Digital voltage sampling (0 - 4095 raw count).',
    freertosRole: 'Sampled by Task_SensorRead at 100 Hz timer interrupt.',
  },
  {
    pin: 'GPIO 18',
    name: 'VSPI_CLK / RELAY_CTRL',
    type: 'GPIO',
    voltage: '3.3V Logic',
    connectedTo: 'EL817 Optocoupler & Relay Coil',
    role: 'Active-LOW / HIGH trigger driving galvanic isolation relay cutoff.',
    freertosRole: 'Immediate hardware interrupt state toggle upon threshold breach.',
  },
  {
    pin: 'GPIO 21',
    name: 'I2C_SDA',
    type: 'I2C',
    voltage: '3.3V Open-Drain',
    connectedTo: 'SSD1306 0.96" OLED Display (SDA)',
    role: 'I2C Serial Data line with 4.7kΩ external pull-up resistor.',
    freertosRole: '400 kHz Fast-Mode telemetry updates via Task_OLED.',
  },
  {
    pin: 'GPIO 22',
    name: 'I2C_SCL',
    type: 'I2C',
    voltage: '3.3V Open-Drain',
    connectedTo: 'SSD1306 0.96" OLED Display (SCL)',
    role: 'I2C Serial Clock synchronization line.',
    freertosRole: 'Synchronous clock signal for frame buffer transfers.',
  },
  {
    pin: 'GPIO 25',
    name: 'DAC1 / BUZZER_PWM',
    type: 'GPIO',
    voltage: '3.3V PWM',
    connectedTo: 'Piezo Alarm Transducer',
    role: 'LEDC PWM 2.4 kHz audible frequency alarm modulation.',
    freertosRole: 'Duty cycle scaled proportionally to alcohol concentration.',
  },
  {
    pin: '3V3 / GND',
    name: 'POWER_RAILS',
    type: 'POWER',
    voltage: '3.30V DC Regulated',
    connectedTo: 'AMS1117-3.3 LDO Regulator',
    role: 'Low-noise decoupled power supply rail with 10µF tantalum caps.',
    freertosRole: 'Stable reference plane minimizing ADC measurement jitter.',
  },
];

export const EmbeddedHardwareLab: React.FC = () => {
  // Sensor & Physical Simulation State
  const [gasPpm, setGasPpm] = useState(18); // Safe baseline = 18 PPM
  const [isBrokenSensor, setIsBrokenSensor] = useState(false);
  const [selectedPin, setSelectedPin] = useState<PinInfo>(PIN_CONFIGS[0]);

  // Scope Controls
  const [timeDiv, setTimeDiv] = useState<10 | 50 | 100>(50);
  const [isScopeFrozen, setIsScopeFrozen] = useState(false);

  // Serial Monitor Log Stream
  const [serialLogs, setSerialLogs] = useState<string[]>([
    '[BOOT] ESP32-D0WD-V3 (Xtensa dual-core 240MHz) Initializing FreeRTOS v10.4.3',
    '[ADC1] Calibrated eFuse Vref: 1100 mV | 12-bit Resolution (0-4095 counts)',
    '[I2C] SSD1306 OLED initialized at 0x3C (400 kHz Fast-Mode)',
    '[RELAY] Safety Interlock GPIO18 initialized: NORMAL_CLOSED (Ignition Enabled)',
    '[SYSTEM] Sensor pre-heat cycle complete. Entering stable monitoring loop.',
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const serialBoxRef = useRef<HTMLDivElement | null>(null);

  // Derived physics values
  // Threshold is 50 PPM (~0.05% BAC equivalent)
  const isThresholdExceeded = gasPpm > 50 || isBrokenSensor;
  const rawAdc = isBrokenSensor ? 0 : Math.min(4095, Math.round((gasPpm / 200) * 3200 + 450));
  const adcVoltage = Number(((rawAdc / 4095) * 3.3).toFixed(2));
  const relayState = isThresholdExceeded ? 'TRIPPED (IGNITION CUTOFF)' : 'PASS (IGNITION ENABLED)';

  // Auto-scroll serial monitor
  useEffect(() => {
    if (serialBoxRef.current) {
      serialBoxRef.current.scrollTop = serialBoxRef.current.scrollHeight;
    }
  }, [serialLogs]);

  // Periodic Telemetry Streaming in Serial Monitor
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toTimeString().split(' ')[0];
      const noise = (Math.random() - 0.5) * 2;
      const currentPpm = isBrokenSensor ? 0 : Math.max(5, Math.round(gasPpm + noise));

      let logMsg = '';
      if (isBrokenSensor) {
        logMsg = `[${now}][ALERT] ADC1_CH6 Voltage 0.00V! SENSOR_DISCONNECT_FAILSAFE TRIPPED. RELAY CUTOFF.`;
      } else if (currentPpm > 50) {
        logMsg = `[${now}][CRITICAL] MQ-3: ${currentPpm} PPM (V: ${adcVoltage}V) > 50 PPM THRESHOLD! RELAY CUTOFF ACTIVATED. BUZZER: 2.4kHz`;
      } else {
        logMsg = `[${now}][TELEMETRY] MQ-3: ${currentPpm} PPM | ADC: ${rawAdc} (${adcVoltage}V) | Status: NOMINAL | FreeHeap: 284,410 B`;
      }

      setSerialLogs((prev) => [...prev.slice(-30), logMsg]);
    }, 1500);

    return () => clearInterval(interval);
  }, [gasPpm, isBrokenSensor, rawAdc, adcVoltage]);

  // Oscilloscope Waveform Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let offset = 0;

    const render = () => {
      if (!isScopeFrozen) {
        offset += timeDiv === 10 ? 4 : timeDiv === 50 ? 2 : 1;
      }

      const w = canvas.width;
      const h = canvas.height;

      // Dark oscilloscope CRT phosphor grid background
      ctx.fillStyle = '#060B14';
      ctx.fillRect(0, 0, w, h);

      // Grid Lines
      ctx.strokeStyle = '#142136';
      ctx.lineWidth = 1;
      const gridSize = 28;

      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center Reference Axes
      ctx.strokeStyle = '#223552';
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();

      // Channel 1: Analog Sensor Signal (ADC Voltage Waveform - Cyan/Yellow Trace)
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const baseAdcHeight = isBrokenSensor ? h - 20 : h - (rawAdc / 4095) * (h * 0.7) - 30;

      for (let x = 0; x < w; x++) {
        // High-frequency sensor noise + 50-sample moving average waveform
        const noise = Math.sin((x + offset) * 0.15) * 4 + Math.cos((x + offset) * 0.05) * 2;
        const y = baseAdcHeight + (isBrokenSensor ? 0 : noise);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Channel 2: Digital Relay Cutoff Pulse Line (Crimson / Emerald Trace)
      ctx.strokeStyle = isThresholdExceeded ? '#EF4444' : '#10B981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const relayY = isThresholdExceeded ? h * 0.25 : h * 0.85;

      for (let x = 0; x < w; x++) {
        if (x === 0) ctx.moveTo(x, relayY);
        else ctx.lineTo(x, relayY);
      }
      ctx.stroke();

      // Channel Labels Overlay on Canvas
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillStyle = '#38BDF8';
      ctx.fillText(`CH1: ADC1_CH6 (MQ-3) = ${adcVoltage}V`, 10, 20);

      ctx.fillStyle = isThresholdExceeded ? '#EF4444' : '#10B981';
      ctx.fillText(
        `CH2: RELAY GPIO18 = ${isThresholdExceeded ? 'HIGH (CUTOFF ACTIVE)' : 'LOW (PASS)'}`,
        10,
        36
      );

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [gasPpm, isBrokenSensor, rawAdc, adcVoltage, isThresholdExceeded, timeDiv, isScopeFrozen]);

  // Preset Handlers
  const handlePreset = (type: 'clean' | 'warning' | 'spike' | 'broken') => {
    setIsBrokenSensor(false);
    if (type === 'clean') {
      setGasPpm(18);
    } else if (type === 'warning') {
      setGasPpm(42);
    } else if (type === 'spike') {
      setGasPpm(160);
    } else if (type === 'broken') {
      setIsBrokenSensor(true);
      setGasPpm(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#253247]">
        <div>
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            LAB D // ESP32 EMBEDDED FIRMWARE &amp; HARDWARE SENSORS
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-sans mt-1">
            Interactive ESP32 Circuit &amp; Firmware Prototyping Lab
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Real-time interactive hardware instrumentation featuring a dual-channel oscilloscope, FreeRTOS multi-tasking monitor, OLED emulator, and ESP32 GPIO pinout explorer.
          </p>
        </div>

        {/* Live Safety Status Badge */}
        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border flex items-center gap-2 shadow-lg ${
              isThresholdExceeded
                ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{relayState}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left 8 Cols (Oscilloscope + OLED + Controls), Right 4 Cols (FreeRTOS & Pinout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Section (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Dual-Channel Virtual Oscilloscope */}
          <div className="rounded-2xl bg-[#050811] border-2 border-[#253247] shadow-2xl overflow-hidden font-mono text-xs">
            {/* Scope Titlebar */}
            <div className="px-4 py-2.5 bg-[#0C1220] border-b border-[#253247] flex flex-wrap items-center justify-between gap-2 text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#38BDF8]" />
                <span className="font-bold text-white text-xs">
                  VIRTUAL DUAL-TRACE OSCILLOSCOPE (RIGOL DS1054Z EMULATOR)
                </span>
              </div>

              {/* Scope Controls */}
              <div className="flex items-center gap-2 text-[10px]">
                <div className="flex items-center bg-[#111B2B] rounded-lg border border-[#253247] p-0.5">
                  {([10, 50, 100] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeDiv(t)}
                      className={`px-2 py-0.5 rounded transition-all ${
                        timeDiv === t ? 'bg-[#38BDF8] text-[#070A12] font-bold' : 'text-[#94A3B8]'
                      }`}
                    >
                      {t}ms/div
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsScopeFrozen(!isScopeFrozen)}
                  className={`px-2.5 py-1 rounded-lg border font-bold transition-all ${
                    isScopeFrozen
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-[#111B2B] text-slate-300 border-[#253247] hover:text-white'
                  }`}
                >
                  {isScopeFrozen ? 'FREEZE [ON]' : 'RUN LIVE'}
                </button>
              </div>
            </div>

            {/* Scope Canvas Viewport */}
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={700}
                height={260}
                className="w-full h-[220px] sm:h-[260px] block"
              />

              {/* On-screen Scope Readouts */}
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono pointer-events-none text-slate-400 bg-[#050811]/75 backdrop-blur px-2.5 py-1 rounded border border-[#253247]/60">
                <span>Sampling: 100kS/s</span>
                <span>V_pp: 0.28V</span>
                <span>Moving Avg Filter: 50-Samples</span>
                <span className="text-emerald-400 font-bold">Trigger: Edge Auto</span>
              </div>
            </div>
          </div>

          {/* Interactive Hardware Fault Injection & Gas Concentration Slider */}
          <div className="p-5 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#38BDF8] uppercase font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#38BDF8]" />
                HARDWARE STRESS TEST &amp; FAULT INJECTION CONTROLS
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Live Physical Simulation
              </span>
            </div>

            {/* Gas Concentration Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Alcohol / Gas Vapor Concentration:
                </span>
                <span
                  className={`font-bold ${
                    gasPpm > 50 ? 'text-red-400 animate-pulse' : 'text-emerald-400'
                  }`}
                >
                  {gasPpm} PPM {gasPpm > 50 ? '(THRESHOLD EXCEEDED: CUTOFF!)' : '(SAFE RANGE)'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="250"
                value={gasPpm}
                disabled={isBrokenSensor}
                onChange={(e) => setGasPpm(Number(e.target.value))}
                className="w-full h-2 bg-[#111B2B] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0 PPM (Clean Air)</span>
                <span className="text-amber-400 font-bold">50 PPM Threshold</span>
                <span>250 PPM (Severe Exposure)</span>
              </div>
            </div>

            {/* Quick Scenario Injection Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
              <button
                onClick={() => handlePreset('clean')}
                className="py-2 px-2.5 rounded-xl bg-[#111B2B] hover:bg-[#1E293B] text-emerald-400 border border-emerald-500/30 font-bold transition-all"
              >
                🌱 Clean Air (18 PPM)
              </button>
              <button
                onClick={() => handlePreset('warning')}
                className="py-2 px-2.5 rounded-xl bg-[#111B2B] hover:bg-[#1E293B] text-amber-300 border border-amber-500/30 font-bold transition-all"
              >
                ⚠️ Near Limit (42 PPM)
              </button>
              <button
                onClick={() => handlePreset('spike')}
                className="py-2 px-2.5 rounded-xl bg-red-600/80 hover:bg-red-500 text-white font-bold transition-all shadow-md shadow-red-600/20"
              >
                🚨 Alcohol Spike (160 PPM)
              </button>
              <button
                onClick={() => handlePreset('broken')}
                className="py-2 px-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-bold transition-all"
              >
                ⚡ Broken Wire Fault
              </button>
            </div>
          </div>

          {/* Micro SSD1306 OLED Display Emulator */}
          <div className="p-4 rounded-2xl bg-[#070A12] border-2 border-[#253247] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#38BDF8]" />
                PHYSICAL SSD1306 0.96" OLED MICRO-DISPLAY
              </span>
              <p className="text-[11px] text-[#94A3B8] max-w-sm">
                Driven via I2C Fast-Mode (400 kHz) displaying live sensor Moving Average, Battery Voltage, and Ignition Lock Status.
              </p>
            </div>

            {/* Retro 128x64 OLED Screen Simulation */}
            <div className="w-56 h-28 bg-[#001428] rounded-xl border-4 border-slate-800 p-2.5 font-mono text-cyan-300 shadow-xl flex flex-col justify-between select-none relative overflow-hidden">
              {/* Scanline CRT texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 2px)',
                }}
              />

              {/* OLED Top Bar */}
              <div className="flex justify-between items-center text-[10px] border-b border-cyan-400/30 pb-0.5">
                <span className="font-bold">ESP32 SAFETY OS</span>
                <span>BAT: 3.3V [||||]</span>
              </div>

              {/* Big Center Readout */}
              <div className="text-center py-1">
                <span className="text-xl font-bold tracking-tight text-white block">
                  {isBrokenSensor ? 'ERR: NO SENSOR' : `${gasPpm} PPM`}
                </span>
                <span className="text-[10px] text-cyan-400 block">
                  {isBrokenSensor
                    ? 'ADC: 0.00V DISCONNECTED'
                    : `RAW: ${rawAdc} | V: ${adcVoltage}V`}
                </span>
              </div>

              {/* OLED Bottom Status */}
              <div
                className={`text-[10px] font-bold text-center py-0.5 rounded ${
                  isThresholdExceeded
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-cyan-500/20 text-cyan-300'
                }`}
              >
                {isThresholdExceeded ? '⚠️ IGNITION LOCKED' : '✓ SYSTEM READY / PASS'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (4 Cols): FreeRTOS Task Manager + Pinout Explorer */}
        <div className="lg:col-span-4 space-y-4">
          {/* FreeRTOS Multi-Tasking Monitor */}
          <div className="p-4 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#253247] pb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
                FreeRTOS TASK SCHEDULER
              </span>
              <span className="text-[10px] text-emerald-400">SMP Core 0 &amp; 1</span>
            </div>

            <div className="space-y-2 text-[11px]">
              {[
                { name: 'Task_SensorRead', core: 'Core 0', prio: 3, freq: '100 Hz', state: 'RUNNING' },
                { name: 'Task_MovingAvgFilter', core: 'Core 0', prio: 2, freq: '50 Hz', state: 'READY' },
                {
                  name: 'Task_RelaySafetyISR',
                  core: 'Core 1',
                  prio: 4,
                  freq: 'Event-Driven',
                  state: isThresholdExceeded ? 'RUNNING (TRIGGERED)' : 'BLOCKED',
                },
                { name: 'Task_OLED_Telemetry', core: 'Core 1', prio: 1, freq: '10 Hz', state: 'READY' },
              ].map((t) => (
                <div key={t.name} className="p-2 rounded-xl bg-[#0D1525] border border-[#253247]/70">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200">{t.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        t.state.includes('TRIGGERED')
                          ? 'bg-red-500/20 text-red-400'
                          : t.state === 'RUNNING'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {t.state}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>{t.core} (Prio: {t.prio})</span>
                    <span>Rate: {t.freq}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive ESP32 GPIO Pinout Inspector */}
          <div className="p-4 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#253247] pb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                ESP32 GPIO PINOUT INSPECTOR
              </span>
              <span className="text-[10px] text-slate-400">Click Pin to Inspect</span>
            </div>

            {/* Pin Selection Pills */}
            <div className="flex flex-wrap gap-1.5">
              {PIN_CONFIGS.map((p) => {
                const isSel = selectedPin.pin === p.pin;
                return (
                  <button
                    key={p.pin}
                    onClick={() => setSelectedPin(p)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      isSel
                        ? 'bg-[#38BDF8] text-[#070A12] shadow'
                        : 'bg-[#111B2B] text-slate-300 hover:text-white border border-[#253247]'
                    }`}
                  >
                    {p.pin}
                  </button>
                );
              })}
            </div>

            {/* Selected Pin Details Card */}
            <div className="p-3 rounded-xl bg-[#0D1525] border border-[#253247] space-y-1.5 text-[11px]">
              <div className="flex justify-between font-bold text-white">
                <span className="text-[#38BDF8]">{selectedPin.pin}</span>
                <span className="text-emerald-400">{selectedPin.voltage}</span>
              </div>
              <div className="text-slate-300">
                <strong className="text-slate-400">Wiring:</strong> {selectedPin.connectedTo}
              </div>
              <div className="text-slate-400 text-[10px] leading-relaxed">
                {selectedPin.role}
              </div>
              <div className="text-purple-300 text-[10px] pt-0.5 border-t border-[#253247]">
                ⚡ {selectedPin.freertosRole}
              </div>
            </div>
          </div>

          {/* Live UART Serial Output Monitor */}
          <div className="p-4 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#253247] pb-1.5 text-[#94A3B8]">
              <span className="font-bold text-white flex items-center gap-1.5 text-[11px]">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                UART0 SERIAL LOGS (115200 BAUD)
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div
              ref={serialBoxRef}
              className="p-2.5 rounded-xl bg-[#050811] border border-[#253247] h-36 overflow-y-auto space-y-1 text-[10px] leading-4 text-slate-300"
            >
              {serialLogs.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.includes('CRITICAL') || log.includes('ALERT')
                      ? 'text-red-400 font-bold'
                      : log.includes('BOOT')
                      ? 'text-[#38BDF8]'
                      : 'text-slate-400'
                  }
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Circuit Standards & Protection Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
          <strong className="text-[#38BDF8] block mb-1">Galvanic Isolation (EL817):</strong>
          <p className="text-[#94A3B8] text-[11px] leading-relaxed">
            Optical coupler guarantees 5,000 V_rms isolation between the sensitive 3.3V ESP32 microcontroller and the 12V high-current automotive relay coil.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
          <strong className="text-[#8B5CF6] block mb-1">Flyback Diode (1N4007):</strong>
          <p className="text-[#94A3B8] text-[11px] leading-relaxed">
            Connected in reverse parallel across the relay inductive coil to clamp back-EMF voltage spikes from damaging the switching transistor during turn-off.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
          <strong className="text-emerald-400 block mb-1">50-Sample Moving Average Filter:</strong>
          <p className="text-[#94A3B8] text-[11px] leading-relaxed">
            Attenuates thermal white noise and transient heater voltage fluctuations on ADC1_CH6, ensuring zero false-positive ignition cutoffs.
          </p>
        </div>
      </div>
    </div>
  );
};
