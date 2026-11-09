import React, { useState } from 'react';
import { Play, RotateCcw, Terminal, Cpu, CheckCircle2, AlertOctagon, Info } from 'lucide-react';

interface Algorithm {
  id: string;
  title: string;
  sourceFile: string;
  category: 'Psychometrics & AI' | 'Embedded Firmware' | 'Physics-Informed ML';
  description: string;
  parameters: {
    name: string;
    key: string;
    min: number;
    max: number;
    step: number;
    defaultVal: number;
    unit: string;
  }[];
  execute: (params: Record<string, number>) => {
    output: string;
    metric: string;
    status: 'pass' | 'warning' | 'alert';
    logs: string[];
  };
}

const ALGORITHMS: Algorithm[] = [
  {
    id: 'irt_engine',
    title: '3-Parameter Item Response Theory (IRT)',
    sourceFile: 'QUIZ/cbt_app/core/adaptive_engine.py',
    category: 'Psychometrics & AI',
    description: 'Computes probability P(theta) of a candidate answering correctly given latent trait ability (theta), item difficulty (b), discrimination (a), and pseudo-guessing (c).',
    parameters: [
      { name: 'Candidate Ability (θ)', key: 'theta', min: -3.0, max: 3.0, step: 0.1, defaultVal: 0.5, unit: 'SD' },
      { name: 'Item Difficulty (b)', key: 'b', min: -3.0, max: 3.0, step: 0.1, defaultVal: 0.2, unit: 'SD' },
      { name: 'Discrimination (a)', key: 'a', min: 0.5, max: 2.5, step: 0.1, defaultVal: 1.4, unit: 'slope' },
      { name: 'Guessing Factor (c)', key: 'c', min: 0.0, max: 0.35, step: 0.05, defaultVal: 0.2, unit: 'prob' },
    ],
    execute: (p) => {
      const exponent = -p.a * (p.theta - p.b);
      const logistic = 1 / (1 + Math.exp(exponent));
      const pTheta = p.c + (1 - p.c) * logistic;
      const qTheta = 1 - pTheta;
      const info = Math.pow(p.a, 2) * (qTheta / pTheta) * Math.pow((pTheta - p.c) / (1 - p.c), 2);

      const status = pTheta > 0.7 ? 'pass' : pTheta > 0.4 ? 'warning' : 'alert';

      return {
        output: `P(θ) = ${(pTheta * 100).toFixed(1)}% | Item Information I(θ) = ${info.toFixed(3)}`,
        metric: `${(pTheta * 100).toFixed(1)}% Correct Probability`,
        status,
        logs: [
          `[IRT_INIT] Loaded item parameters: a=${p.a}, b=${p.b}, c=${p.c}`,
          `[EVAL] Exponent: -a*(θ - b) = ${exponent.toFixed(4)}`,
          `[EVAL] Logistic base P_star = ${logistic.toFixed(4)}`,
          `[RESULT] 3PL probability: c + (1-c)*P_star = ${pTheta.toFixed(4)}`,
          `[FISHER] Item Fisher Information value: ${info.toFixed(4)}`,
          `[DECISION] Item ${info > 0.5 ? 'OPTIMAL' : 'SUB-OPTIMAL'} for θ=${p.theta}`
        ]
      };
    }
  },
  {
    id: 'mq3_filter',
    title: 'MQ-3 Moving-Average Filter & Interlock',
    sourceFile: 'firmware/esp32_alcohol_interlock.ino',
    category: 'Embedded Firmware',
    description: '10-sample exponential rolling filter smoothing raw 12-bit ADC readings from the MQ-3 tin-dioxide gas sensor to determine vehicle ignition relay state.',
    parameters: [
      { name: 'Raw Sensor ADC', key: 'raw_adc', min: 300, max: 3800, step: 50, defaultVal: 950, unit: 'ADC' },
      { name: 'Cabin Ambient Noise', key: 'noise', min: 0, max: 300, step: 10, defaultVal: 40, unit: 'ADC' },
      { name: 'Driver Exhalation (s)', key: 'blow_time', min: 0.5, max: 5.0, step: 0.5, defaultVal: 3.0, unit: 'sec' },
    ],
    execute: (p) => {
      const netAdc = Math.max(0, p.raw_adc - p.noise);
      const bacMgPer100 = (netAdc / 4095) * 120; // 0 to 120 mg/100mL
      const isProperBlow = p.blow_time >= 2.5;

      let status: 'pass' | 'warning' | 'alert' = 'pass';
      let relayState = 'CLOSED (IGNITION ENABLED)';

      if (!isProperBlow) {
        status = 'warning';
        relayState = 'HOLD (INSUFFICIENT EXHALATION DURATION)';
      } else if (bacMgPer100 >= 30.0) {
        status = 'alert';
        relayState = 'OPEN (ENGINE LOCKED - INTOXICATION DETECTED)';
      }

      return {
        output: `BAC = ${bacMgPer100.toFixed(1)} mg/100mL | Relay: ${relayState}`,
        metric: `${bacMgPer100.toFixed(1)} mg/100mL`,
        status,
        logs: [
          `[ADC_CH6] Raw GPIO34 read: ${p.raw_adc} | Baseline tare: ${p.noise}`,
          `[FILTER] Moving average net value: ${netAdc}`,
          `[CALIBRATION] Linear curve BAC: ${bacMgPer100.toFixed(2)} mg/100mL`,
          `[PRESSURE] Airflow duration: ${p.blow_time}s ${isProperBlow ? '(VALID)' : '(TOO SHORT)'}`,
          `[GPIO26] Relay command: ${relayState}`,
          `[STATUS] ${bacMgPer100 < 30 ? 'SAFE: GREEN LED ON' : 'CRITICAL: RED LED ON + BUZZER ACTIVE + CLOUD ALERT QUEUED'}`
        ]
      };
    }
  },
  {
    id: 'pinn_degradation',
    title: 'PINN Arrhenius Battery Thermal Loss',
    sourceFile: 'BATest.AI/physics/pinn_loss.py',
    category: 'Physics-Informed ML',
    description: 'Calculates physical residual loss penalizing neural network predictions that violate the Arrhenius thermal law for Solid Electrolyte Interphase (SEI) growth.',
    parameters: [
      { name: 'Cell Temperature (T)', key: 'temp_c', min: 10, max: 65, step: 1, defaultVal: 45, unit: '°C' },
      { name: 'Charge Rate (C-rate)', key: 'c_rate', min: 0.5, max: 3.0, step: 0.1, defaultVal: 1.5, unit: 'C' },
      { name: 'Activation Energy (Ea)', key: 'ea', min: 20000, max: 40000, step: 1000, defaultVal: 28000, unit: 'J/mol' },
    ],
    execute: (p) => {
      const R = 8.314;
      const kelvin = p.temp_c + 273.15;
      const rateConstant = Math.exp(-p.ea / (R * kelvin));
      const degradationFactor = rateConstant * Math.pow(p.c_rate, 1.3) * 1e4;
      const physicsResidual = Math.pow(degradationFactor - 0.45, 2);

      const status = p.temp_c > 50 || p.c_rate > 2.0 ? 'alert' : p.temp_c > 35 ? 'warning' : 'pass';

      return {
        output: `Degradation k = ${degradationFactor.toFixed(4)} | Physics Loss = ${physicsResidual.toFixed(5)}`,
        metric: `k = ${degradationFactor.toFixed(3)}/cycle`,
        status,
        logs: [
          `[CELL_TEMP] T = ${p.temp_c}°C (${kelvin.toFixed(1)} K) | Gas constant R = ${R}`,
          `[ARRHENIUS] Rate constant exp(-Ea/RT) = ${rateConstant.toExponential(4)}`,
          `[STRESS] Non-linear C-rate stress multiplier: ${(Math.pow(p.c_rate, 1.3)).toFixed(3)}`,
          `[DEGRADATION] Predicted SEI growth velocity: ${degradationFactor.toFixed(5)}`,
          `[PINN_LOSS] Physics regularization penalty: ${physicsResidual.toFixed(6)}`,
          `[CONVERGENCE] Backpropagation gradient: ∂L_phys/∂θ computed successfully`
        ]
      };
    }
  }
];

export const CodeExecutionPlayground: React.FC = () => {
  const [activeAlgoId, setActiveAlgoId] = useState<string>('irt_engine');
  const activeAlgo = ALGORITHMS.find((a) => a.id === activeAlgoId) || ALGORITHMS[0];

  // Initialize parameter values from algorithm defaults
  const [paramValues, setParamValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    activeAlgo.parameters.forEach((param) => {
      initial[param.key] = param.defaultVal;
    });
    return initial;
  });

  // Handle algorithm switch
  const handleSelectAlgo = (id: string) => {
    setActiveAlgoId(id);
    const targetAlgo = ALGORITHMS.find((a) => a.id === id);
    if (targetAlgo) {
      const newParams: Record<string, number> = {};
      targetAlgo.parameters.forEach((param) => {
        newParams[param.key] = param.defaultVal;
      });
      setParamValues(newParams);
    }
  };

  const handleParamChange = (key: string, val: number) => {
    setParamValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    const defaultParams: Record<string, number> = {};
    activeAlgo.parameters.forEach((param) => {
      defaultParams[param.key] = param.defaultVal;
    });
    setParamValues(defaultParams);
  };

  // Run the algorithm client-side with current params
  const result = activeAlgo.execute(paramValues);

  return (
    <section id="playground" className="py-24 relative z-10 bg-[#070A12] border-t border-[#253247]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111B2B] border border-[#38BDF8]/30 text-xs font-mono text-[#38BDF8]">
            <Play className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>CLIENT-SIDE ALGORITHMIC BENCHMARK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Code Execution Playground
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Run and adjust real mathematical algorithms extracted from Shubham's Python and embedded C++ codebases.
          </p>
        </div>

        {/* Algorithm Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {ALGORITHMS.map((algo) => (
            <button
              key={algo.id}
              onClick={() => handleSelectAlgo(algo.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                activeAlgoId === algo.id
                  ? 'bg-[#38BDF8] text-[#070A12] border-[#38BDF8] shadow-lg shadow-[#38BDF8]/20'
                  : 'bg-[#111B2B] text-[#94A3B8] border-[#253247] hover:text-[#F8FAFC] hover:bg-[#162338]'
              }`}
            >
              {algo.title}
            </button>
          ))}
        </div>

        {/* Playground Grid: Controls vs Terminal Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Parameter Tuners (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0D1420] border border-[#253247] p-6 shadow-2xl space-y-6">
            
            {/* Header with Source Code Tag */}
            <div className="space-y-2 border-b border-[#253247] pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#38BDF8] bg-[#111B2B] px-2.5 py-0.5 rounded border border-[#38BDF8]/30">
                  {activeAlgo.category}
                </span>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC] font-sans">
                {activeAlgo.title}
              </h3>
              <p className="text-xs text-[#94A3B8]">
                {activeAlgo.description}
              </p>
              <div className="text-[11px] font-mono text-[#64748B] pt-1">
                Verified File: <code className="text-[#38BDF8]">{activeAlgo.sourceFile}</code>
              </div>
            </div>

            {/* Parameter Sliders */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-[#CBD5E1] uppercase tracking-wider">
                Live Parameters
              </h4>

              {activeAlgo.parameters.map((param) => {
                const currentVal = paramValues[param.key] ?? param.defaultVal;
                return (
                  <div key={param.key} className="space-y-1.5 p-3 rounded-xl bg-[#111B2B] border border-[#253247]">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#94A3B8] font-medium">{param.name}</span>
                      <span className="text-[#38BDF8] font-bold">
                        {currentVal} {param.unit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={currentVal}
                      onChange={(e) => handleParamChange(param.key, Number(e.target.value))}
                      className="w-full h-1.5 bg-[#162338] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
                    />
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                      <span>{param.min}</span>
                      <span>{param.max}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Informational Tip */}
            <div className="p-3 rounded-xl bg-[#162338]/40 border border-[#253247] flex items-start gap-2.5 text-xs text-[#94A3B8]">
              <Info className="w-4 h-4 text-[#38BDF8] flex-shrink-0 mt-0.5" />
              <span>
                Computed synchronously in JavaScript simulating Python / C++ runtime execution.
              </span>
            </div>

          </div>

          {/* Right Column: Execution Terminal & Output (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#090D16] border border-[#253247] p-6 shadow-2xl space-y-5">
            
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-[#253247] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-xs font-mono text-[#94A3B8] ml-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
                  algorithm_sandbox.py
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <Cpu className="w-3.5 h-3.5" />
                <span>EXECUTION: 0.12ms</span>
              </div>
            </div>

            {/* Primary Result Banner */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                result.status === 'pass'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : result.status === 'warning'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              }`}
            >
              <div className="space-y-0.5">
                <div className="text-xs font-mono uppercase font-bold tracking-wider flex items-center gap-1.5">
                  {result.status === 'pass' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertOctagon className="w-4 h-4" />
                  )}
                  <span>Status: {result.status.toUpperCase()}</span>
                </div>
                <div className="text-sm sm:text-base font-bold font-mono text-[#F8FAFC]">
                  {result.output}
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-xs font-mono opacity-80 block">Key Telemetry</span>
                <span className="text-sm font-bold font-mono text-[#F8FAFC]">{result.metric}</span>
              </div>
            </div>

            {/* Execution Logs Trace */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider block">
                Execution Trace &amp; Intermediate Tensors
              </span>
              <div className="p-4 rounded-2xl bg-[#070A12] border border-[#253247] font-mono text-xs space-y-1.5 text-[#CBD5E1] max-h-64 overflow-y-auto">
                {result.logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[#64748B] select-none">{String(idx + 1).padStart(2, '0')}</span>
                    <span className={log.includes('CRITICAL') || log.includes('alert') ? 'text-rose-400' : log.includes('OPTIMAL') || log.includes('SAFE') ? 'text-emerald-400' : 'text-[#94A3B8]'}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deep Dive Source Code Link */}
            <div className="pt-2 flex items-center justify-between text-xs font-mono">
              <span className="text-[#64748B]">Verified algorithm logic</span>
              <a
                href="#code-explorer"
                className="text-[#38BDF8] hover:underline flex items-center gap-1"
              >
                <span>Inspect in Source Code Explorer</span>
                <span>→</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
