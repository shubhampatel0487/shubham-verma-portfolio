import React, { useState } from 'react';
import {
  Copy,
  Check
} from 'lucide-react';

export const AlcoholCodeExplorer: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeFile, setActiveFile] = useState<'firmware' | 'calibration'>('firmware');

  const firmwareCode = `// =================================================================
// TARGET: ESP32 DevKit V1 (Xtensa 32-bit dual-core)
// SUBSYSTEM: Benchtop Alcohol Vapour Sensing & Relay Interlock
// =================================================================

#include <Arduino.h>

#define PIN_ANALOG_SENSOR   34  // ADC1_CH6 (Analog Sensor Input)
#define PIN_RELAY_CONTROL   26  // Active-LOW 5V Optoisolated Relay
#define PIN_BUZZER_ALARM    27  // Piezo Buzzer PWM Drive
#define PIN_LED_SAFE        14  // Green Status Indicator (Safe)
#define PIN_LED_ALERT       12  // Red Status Indicator (Tripped)

// Empirical threshold in 12-bit ADC counts (0..4095)
// ~1.80V corresponds to ~2235 counts on a 3.3V full-scale reference
const int VAPOUR_THRESHOLD_ADC = 2235;

// Digital Moving-Average Smoothing Filter (N = 16)
int readSmoothedSensor(int pin) {
  long sum = 0;
  for (int i = 0; i < 16; i++) {
    sum += analogRead(pin);
    delayMicroseconds(250);
  }
  return (int)(sum / 16);
}

void setup() {
  Serial.begin(115200);
  
  pinMode(PIN_RELAY_CONTROL, OUTPUT);
  pinMode(PIN_BUZZER_ALARM, OUTPUT);
  pinMode(PIN_LED_SAFE, OUTPUT);
  pinMode(PIN_LED_ALERT, OUTPUT);

  // Default to SAFE LOCKED during initial 3-second sensor boot
  digitalWrite(PIN_RELAY_CONTROL, HIGH);
  digitalWrite(PIN_LED_SAFE, LOW);
  digitalWrite(PIN_LED_ALERT, HIGH);
  delay(3000);
}

void loop() {
  int rawADC = readSmoothedSensor(PIN_ANALOG_SENSOR);
  float voltage = (rawADC / 4095.0) * 3.3;

  // Evaluate against bench threshold
  if (rawADC >= VAPOUR_THRESHOLD_ADC) {
    // LOCKOUT CONDITION: Disconnect starter circuit, trigger alerts
    digitalWrite(PIN_RELAY_CONTROL, HIGH); // De-energize NC relay contacts
    digitalWrite(PIN_LED_SAFE, LOW);
    digitalWrite(PIN_LED_ALERT, HIGH);
    tone(PIN_BUZZER_ALARM, 2400);          // 2.4 kHz piezo tone
    
    Serial.printf("[ALERT] Vapour Spike! ADC: %d (%.2fV) -> INTERLOCK LOCKED\\n", rawADC, voltage);
  } else {
    // NORMAL CONDITION: Permit starter circuit
    digitalWrite(PIN_RELAY_CONTROL, LOW);  // Energize / close relay path
    digitalWrite(PIN_LED_SAFE, HIGH);
    digitalWrite(PIN_LED_ALERT, LOW);
    noTone(PIN_BUZZER_ALARM);
    
    Serial.printf("[NORMAL] Clean Air. ADC: %d (%.2fV) -> PERMITTED\\n", rawADC, voltage);
  }

  delay(100); // 10 Hz sampling rate
}`;

  const calibrationCode = `// =================================================================
// MQ-3 RESISTANCE CHARACTERIZATION ROUTINE (BENCH REFERENCE)
// =================================================================

#include <Arduino.h>
#include <math.h>

const float LOAD_RESISTOR_KOHM = 10.0; // 10k load resistor on PCB

// Measure baseline resistance Ro in clean ambient air
float calculateBaselineRo(int analogPin) {
  long adcSum = 0;
  for (int i = 0; i < 50; i++) {
    adcSum += analogRead(analogPin);
    delay(20);
  }
  float avgADC = (float)adcSum / 50.0;
  float sensorVoltage = (avgADC / 4095.0) * 3.3;
  
  // Calculate sensor surface resistance Rs in clean air
  float rs_air = ((3.3 - sensorVoltage) / sensorVoltage) * LOAD_RESISTOR_KOHM;
  
  // For MQ-3, typical Rs/Ro ratio in clean air is approximately 60.0
  float ro = rs_air / 60.0;
  return ro;
}`;

  const currentCode = activeFile === 'firmware' ? firmwareCode : calibrationCode;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="alcohol-code" className="p-6 sm:p-8 rounded-3xl bg-[#0C1220] border border-[#253247] space-y-6">
      
      {/* Header & File Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#253247] pb-4">
        <div>
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider block">
            PHASE 12 // SOFTWARE &amp; FIRMWARE ARCHITECTURE
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-sans text-[#F8FAFC]">
            Embedded C++ Firmware Structure
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* File Tab Switcher */}
          <div className="flex items-center bg-[#070A12] p-1 rounded-xl border border-[#253247] text-xs font-mono">
            <button
              onClick={() => setActiveFile('firmware')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeFile === 'firmware'
                  ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              esp32_interlock.ino
            </button>
            <button
              onClick={() => setActiveFile('calibration')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeFile === 'calibration'
                  ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              mq3_baseline.cpp
            </button>
          </div>

          <button
            onClick={handleCopyCode}
            className="p-2 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247] transition-colors"
            title="Copy Code"
            aria-label="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Structured Code Explanation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-[#080B12] border border-[#253247] space-y-1">
          <span className="text-[#64748B] block text-[10px]">1. KEY FUNCTION</span>
          <span className="text-[#38BDF8] font-bold">readSmoothedSensor()</span>
          <p className="text-[#CBD5E1] text-[11px]">16-sample moving average filter running over 4ms to cancel electromagnetic line noise.</p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#080B12] border border-[#253247] space-y-1">
          <span className="text-[#64748B] block text-[10px]">2. LOGIC COMPARATOR</span>
          <span className="text-emerald-400 font-bold">VAPOUR_THRESHOLD_ADC</span>
          <p className="text-[#CBD5E1] text-[11px]">Direct comparison with 2235 counts (~1.8V); executes in under 1 millisecond.</p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#080B12] border border-[#253247] space-y-1">
          <span className="text-[#64748B] block text-[10px]">3. FAIL-SAFE ACTUATION</span>
          <span className="text-amber-400 font-bold">GPIO 26 (Active-LOW)</span>
          <p className="text-[#CBD5E1] text-[11px]">De-energizes relay coil to guarantee open circuit if power or microcontroller drops.</p>
        </div>
      </div>

      {/* Code Editor Preview Window */}
      <div className="rounded-2xl bg-[#070A12] border border-[#253247] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2 bg-[#0C1220] border-b border-[#253247] text-xs font-mono text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 font-bold text-[#F8FAFC]">
              {activeFile === 'firmware' ? 'firmware/esp32_interlock.ino' : 'firmware/mq3_baseline.cpp'}
            </span>
          </div>
          <span className="text-[11px] text-[#64748B]">Arduino C++ / ESP32</span>
        </div>

        <pre className="p-4 sm:p-6 overflow-x-auto text-xs font-mono text-[#CBD5E1] leading-relaxed max-h-96">
          <code>{currentCode}</code>
        </pre>
      </div>

      {/* Public Repository Notice */}
      <div className="p-3.5 rounded-xl bg-[#080B12] border border-[#253247] text-xs font-mono text-[#94A3B8] flex items-center justify-between">
        <span>Curated for technical interview review and portfolio exhibition.</span>
        <span className="text-[#38BDF8] font-bold">Target: ESP-IDF / Arduino Framework</span>
      </div>

    </section>
  );
};
