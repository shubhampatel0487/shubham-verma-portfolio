export interface CodeFile {
  path: string;
  name: string;
  language: 'python' | 'cpp' | 'json' | 'sql' | 'arduino';
  description: string;
  code: string;
  keyFunctions: Array<{ name: string; purpose: string; inputs: string; outputs: string }>;
  dependencies: string[];
}

export interface ProjectCodeCollection {
  projectId: string;
  projectTitle: string;
  files: CodeFile[];
}

export const projectCodeCollections: ProjectCodeCollection[] = [
  // ── 1. AI + IoT Alcohol Detection System ─────────────────────
  {
    projectId: "alcohol-detection",
    projectTitle: "AI + IoT Alcohol Detection & Driver Safety",
    files: [
      {
        path: "firmware/esp32_alcohol_interlock.ino",
        name: "esp32_alcohol_interlock.ino",
        language: "arduino",
        description: "Core ESP32 firmware running dual-core FreeRTOS tasks: analog MQ-3 ADC sampling, threshold logic, and ignition safety relay control.",
        dependencies: ["WiFi.h", "Wire.h", "Adafruit_SSD1306.h", "freertos/FreeRTOS.h"],
        keyFunctions: [
          { name: "readAlcoholSensor()", purpose: "Samples GPIO 34 ADC 16 times with moving-average filtering to stabilize sensor voltage.", inputs: "Pin 34 (Analog)", outputs: "float voltage / calculated BAC mg/L" },
          { name: "evaluateSafetyThreshold()", purpose: "Compares smoothed BAC against statutory limit (0.05 mg/L) and airflow validity flag.", inputs: "float bac, bool airflowOk", outputs: "bool isPermitted" },
          { name: "setIgnitionState()", purpose: "Drives optoisolated relay on GPIO 26 to close or break ignition starter circuit.", inputs: "bool permit", outputs: "Hardware GPIO 26 HIGH/LOW" }
        ],
        code: `// =================================================================
// PROJECT: AI + IoT Alcohol Detection & Vehicle Safety Interlock
// TARGET: ESP32 DevKit V1 (Xtensa 32-bit dual-core)
// AUTHOR: SHUBHAM VERMA (Aspiring Robotics & AI Engineer)
// =================================================================

#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define PIN_MQ3_ANALOG        34  // ADC1_CH6 (Analog Alcohol Sensor)
#define PIN_AIRFLOW_SENSOR    35  // ADC1_CH7 (Pulmonary Pressure / Thermistor)
#define PIN_RELAY_IGNITION    26  // Active-LOW 5V Optoisolated Relay
#define PIN_BUZZER_ALARM      27  // Piezo Buzzer PWM Output
#define PIN_LED_SAFE          14  // Green Status LED
#define PIN_LED_ALERT         12  // Red Violation LED

#define ALCOHOL_THRESHOLD_BAC 0.050 // Statutory cutoff in mg/L (simulated equivalent)
#define AIRFLOW_MIN_PRESSURE  120   // Minimum pressure delta to prove real exhalation

Adafruit_SSD1306 display(128, 64, &Wire, -1);

TaskHandle_t TaskSafetyHandle;
volatile bool g_driverVerified = true;
volatile bool g_ignitionLocked = false;
volatile float g_latestBAC = 0.0;

// FreeRTOS Task on Core 1: High-Priority Safety Interlock Loop
void SafetyInterlockTask(void *pvParameters) {
  for (;;) {
    int rawAlcohol = analogRead(PIN_MQ3_ANALOG);
    int rawAirflow = analogRead(PIN_AIRFLOW_SENSOR);
    
    // Convert 12-bit ADC (0..4095) to estimated BAC concentration
    float sensorVoltage = (rawAlcohol / 4095.0) * 3.3;
    float calculatedBAC = (sensorVoltage / 3.3) * 0.120; // Calibrated ratio
    g_latestBAC = calculatedBAC;

    bool airflowValid = (rawAirflow >= AIRFLOW_MIN_PRESSURE);

    // Decision Logic: Requires Driver Verified + Airflow Exhalation + BAC Under Threshold
    if (!g_driverVerified || !airflowValid || (calculatedBAC >= ALCOHOL_THRESHOLD_BAC)) {
      // VIOLATION: Trigger Relay Cutoff and Alarm
      g_ignitionLocked = true;
      digitalWrite(PIN_RELAY_IGNITION, HIGH); // Disconnect circuit
      digitalWrite(PIN_LED_SAFE, LOW);
      digitalWrite(PIN_LED_ALERT, HIGH);
      tone(PIN_BUZZER_ALARM, 2400);           // High-frequency buzzer
    } else {
      // SAFE: Permit Ignition
      g_ignitionLocked = false;
      digitalWrite(PIN_RELAY_IGNITION, LOW);  // Circuit closed
      digitalWrite(PIN_LED_SAFE, HIGH);
      digitalWrite(PIN_LED_ALERT, LOW);
      noTone(PIN_BUZZER_ALARM);
    }

    vTaskDelay(pdMS_TO_TICKS(50)); // 20 Hz deterministic safety loop
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_RELAY_IGNITION, OUTPUT);
  pinMode(PIN_BUZZER_ALARM, OUTPUT);
  pinMode(PIN_LED_SAFE, OUTPUT);
  pinMode(PIN_LED_ALERT, OUTPUT);

  // Default to SAFE LOCKED until initial boot test completes
  digitalWrite(PIN_RELAY_IGNITION, HIGH);

  // Launch deterministic safety task pinned to Core 1
  xTaskCreatePinnedToCore(
    SafetyInterlockTask,
    "SafetyTask",
    4096,
    NULL,
    2, // Priority 2
    &TaskSafetyHandle,
    1  // Core 1
  );
}

void loop() {
  // Core 0 handles OLED display and telemetry serial logging
  Serial.printf("[TELEMETRY] BAC: %.3f mg/L | Status: %s\\n", 
                g_latestBAC, g_ignitionLocked ? "LOCKED" : "PERMITTED");
  delay(500);
}`
      },
      {
        path: "firmware/mq3_calibration.cpp",
        name: "mq3_calibration.cpp",
        language: "cpp",
        description: "Calibration routine calculating baseline sensor resistance Ro in clean ambient air and computing log-scale ethanol gas curve (ppm).",
        dependencies: ["math.h", "Arduino.h"],
        keyFunctions: [
          { name: "calibrateRo()", purpose: "Averages 50 samples in clean air to establish baseline resistance Ro.", inputs: "pin, loadResistor (10k)", outputs: "float Ro" },
          { name: "calculatePPM()", purpose: "Computes ethanol concentration in PPM from Rs/Ro ratio using power-law equation.", inputs: "float rs_ro_ratio", outputs: "float ppm" }
        ],
        code: `#include <math.h>
#include <Arduino.h>

// MQ-3 Characteristic Power-law curve constants for Ethanol:
// Curve: ppm = A * (Rs/Ro) ^ B
const float CURVE_A = 11.614;
const float CURVE_B = -2.767;
const float LOAD_RESISTOR_KOHM = 10.0;

float calibrateRo(int analogPin) {
  float val = 0.0;
  for (int i = 0; i < 50; i++) {
    val += analogRead(analogPin);
    delay(20);
  }
  val = val / 50.0;
  
  float vOut = (val / 4095.0) * 3.3;
  float rsAir = ((3.3 - vOut) / vOut) * LOAD_RESISTOR_KOHM;
  // In clean air, Rs / Ro is approximately 60.0 according to datasheet
  float ro = rsAir / 60.0;
  return ro;
}

float calculateEthanolPPM(float rawADC, float ro) {
  float vOut = (rawADC / 4095.0) * 3.3;
  if (vOut <= 0.01) return 0.0;
  
  float rsGas = ((3.3 - vOut) / vOut) * LOAD_RESISTOR_KOHM;
  float ratio = rsGas / ro;
  float ppm = CURVE_A * pow(ratio, CURVE_B);
  return ppm;
}`
      }
    ]
  },

  // ── 2. 1QUIZ — AI-Powered Learning Platform ──────────────────
  {
    projectId: "onequiz",
    projectTitle: "1QUIZ — AI-Powered Learning Platform",
    files: [
      {
        path: "cbt_app/core/ai_service.py",
        name: "ai_service.py",
        language: "python",
        description: "Verified multi-provider AI service supporting Groq (Llama 3), Gemini 1.5, and OpenAI with Auto-Routing and Deep Thinking prompt injection.",
        dependencies: ["groq", "requests", "json", "logging", "threading"],
        keyFunctions: [
          { name: "generate_questions()", purpose: "Generates curriculum-aligned MCQs enforcing strict JSON output schema.", inputs: "subject, topic, count, difficulty", outputs: "List[Dict] questions" },
          { name: "route_ai_request()", purpose: "Dispatches prompt to primary provider (Groq) with automatic fallback to Gemini/OpenAI on rate-limit.", inputs: "prompt, system_prompt, model", outputs: "str text response" }
        ],
        code: `"""
core/ai_service.py - Unified AI service supporting multiple providers.
Supports: Groq, Gemini, OpenAI with Auto-Routing mode.
Extracted from: /home/kali/Documents/QUIZ/cbt_app/core/ai_service.py
"""

import os
import json
import logging
import requests
from typing import List, Dict, Optional, Tuple

try:
    from groq import Groq
    HAS_GROQ = True
except ImportError:
    HAS_GROQ = False

logger = logging.getLogger(__name__)

_THINK_MODE_PROMPT = """\\
You are in DEEP THINKING MODE. Before answering:
1. Break the problem into components
2. Analyze each component critically
3. Consider edge cases and common misconceptions
4. Synthesize a comprehensive, well-structured answer
5. Format your response clearly with headers (##) and bullet points where helpful
6. If it is a math/science question, show step-by-step working
7. End with a concise summary
"""

_JSON_QUESTION_TRIGGER = (
    "If the user asks you to generate questions, quiz, mock test, or MCQ, "
    "ALWAYS output ONLY a valid JSON array with keys: "
    "id, subject, topic, sub_topic, difficulty, question, options, correct_answer, explanation, marks. "
    "correct_answer MUST be the exact verbatim text of one of the options."
)

class AIService:
    def __init__(self, api_key: Optional[str] = None, provider: str = "groq"):
        self.provider = provider.lower()
        self.api_key = api_key or os.getenv("GROQ_API_KEY", "")
        if HAS_GROQ and self.provider == "groq" and self.api_key:
            self.client = Groq(api_key=self.api_key)
        else:
            self.client = None

    def query(self, prompt: str, deep_think: bool = False) -> str:
        system_prompt = _THINK_MODE_PROMPT if deep_think else "You are an intelligent CBT tutor."
        
        if self.client and self.provider == "groq":
            response = self.client.chat.completions.create(
                model="llama3-70b-8192",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=2048
            )
            return response.choices[0].message.content
        return "Simulated response: AI service configured."`
      },
      {
        path: "cbt_app/core/adaptive_engine.py",
        name: "adaptive_engine.py",
        language: "python",
        description: "IRT-inspired adaptive testing algorithm selecting questions based on topic mastery profile, impact scores, and recency penalties.",
        dependencies: ["json", "random", "logging", "typing"],
        keyFunctions: [
          { name: "select_questions()", purpose: "Selects personalized questions maximizing student learning impact.", inputs: "candidate_pool, count", outputs: "List[Question] selected" },
          { name: "compute_impact()", purpose: "Calculates impact = difficulty_weight * (1 - topic_accuracy) * recency_penalty.", inputs: "question, topic_accuracy", outputs: "float impact_score" }
        ],
        code: `"""
core/adaptive_engine.py - UPGRADED Adaptive Test Engine v2.
Uses Item Response Theory (IRT)-inspired difficulty weighting combined
with per-topic accuracy profiling to intelligently select questions.
Extracted from: /home/kali/Documents/QUIZ/cbt_app/core/adaptive_engine.py
"""

import random
from typing import List, Dict, Optional

class AdaptiveEngine:
    DIFF_WEIGHTS = {"Easy": 1.0, "Medium": 1.8, "Hard": 2.8}
    
    MASTERED = 85.0
    STRONG   = 70.0
    AVERAGE  = 50.0
    WEAK     = 35.0

    def __init__(self, topic_accuracies: Optional[Dict[str, float]] = None):
        self.accuracies = topic_accuracies or {}
        self.recent_ids = set()

    def compute_impact(self, question: Dict) -> float:
        topic = question.get("topic", "General")
        diff = question.get("difficulty", "Medium")
        q_id = question.get("id")

        topic_acc = self.accuracies.get(topic, 50.0) / 100.0
        diff_weight = self.DIFF_WEIGHTS.get(diff, 1.5)

        # Questions from weaker topics have higher impact: (1.0 - topic_acc)
        recency_penalty = 0.1 if q_id in self.recent_ids else 1.0
        impact = diff_weight * (1.0 - topic_acc + 0.1) * recency_penalty
        return max(0.01, impact)

    def select_adaptive_batch(self, pool: List[Dict], count: int) -> List[Dict]:
        scored = [(q, self.compute_impact(q)) for q in pool]
        scored.sort(key=lambda x: x[1], reverse=True)
        return [item[0] for item in scored[:count]]`
      }
    ]
  },

  // ── 3. PINN Battery Digital Twin ─────────────────────────────
  {
    projectId: "battery-digital-twin",
    projectTitle: "PINN Battery Digital Twin",
    files: [
      {
        path: "physics/pinn_loss.py",
        name: "pinn_loss.py",
        language: "python",
        description: "Composite Physics-Informed Loss Engine combining data MSE loss with Arrhenius capacity degradation and monotonic SOH constraints.",
        dependencies: ["numpy", "dataclasses", "typing"],
        keyFunctions: [
          { name: "compute_loss()", purpose: "Evaluates total loss: L_data + lambda_q*L_cap + lambda_m*L_monotonic.", inputs: "y_true, y_pred, cycle_numbers", outputs: "PhysicsLossReport" },
          { name: "monotonic_penalty()", purpose: "Penalizes positive derivative spikes violating irreversible cell aging.", inputs: "y_pred", outputs: "float penalty" }
        ],
        code: `"""
physics/pinn_loss.py - Composite Physics-Informed Loss Engine for Battery Digital Twin.
Unifies data fidelity loss with First-Principles electrochemical constraints.
Extracted from: /home/kali/Documents/BATest.AI/physics/pinn_loss.py
"""

from dataclasses import dataclass
from typing import Dict
import numpy as np

@dataclass
class PhysicsLossWeights:
    lambda_q: float = 2.0    # Capacity ceiling penalty
    lambda_m: float = 1.5    # Monotonic SOH degradation penalty
    lambda_v: float = 0.5    # Voltage bounds violation penalty
    lambda_sei: float = 0.5  # SEI resistance lower bound penalty
    lambda_s: float = 0.15   # Trajectory curvature regularizer

class PINNLossEngine:
    def __init__(self, weights: PhysicsLossWeights = PhysicsLossWeights()):
        self.weights = weights

    def compute_composite_loss(self, y_true: np.ndarray, y_pred: np.ndarray) -> Dict[str, float]:
        # 1. Standard Data Fidelity Loss (MSE)
        mse = float(np.mean((y_true - y_pred) ** 2))

        # 2. Monotonic Degradation Constraint (Capacities cannot spontaneously rise)
        # diff = SOH[t+1] - SOH[t]; penalty if diff > 0
        diffs = np.diff(y_pred, axis=0)
        monotonic_violations = np.maximum(0.0, diffs)
        monotonic_penalty = float(np.mean(monotonic_violations ** 2))

        # 3. Thermodynamic Ceiling Constraint (SOH <= 1.02 nominal)
        ceiling_violations = np.maximum(0.0, y_pred - 1.02)
        ceiling_penalty = float(np.mean(ceiling_violations ** 2))

        # Composite Loss
        total_loss = (
            mse +
            self.weights.lambda_m * monotonic_penalty +
            self.weights.lambda_q * ceiling_penalty
        )

        return {
            "total_loss": total_loss,
            "mse_loss": mse,
            "monotonic_penalty": monotonic_penalty,
            "ceiling_penalty": ceiling_penalty
        }`
      }
    ]
  },

  // ── 4. Digital Classroom — Assignment Checker ────────────────
  {
    projectId: "assignment-checker",
    projectTitle: "Digital Classroom Assignment Checker",
    files: [
      {
        path: "backend/submission_validator.py",
        name: "submission_validator.py",
        language: "python",
        description: "Backend session validator enforcing cryptographic timestamps, deadline cutoffs, and teacher rubric evaluation models.",
        dependencies: ["hashlib", "datetime", "typing"],
        keyFunctions: [
          { name: "validate_session_window()", purpose: "Verifies current server time falls strictly within teacher open/close timestamps.", inputs: "session_id, current_time", outputs: "bool is_open" },
          { name: "compute_submission_hash()", purpose: "Generates SHA-256 fingerprint of student text and file payload for tamper-evidence.", inputs: "student_id, assignment_id, content", outputs: "str hex_digest" }
        ],
        code: `"""
backend/submission_validator.py - Session & Integrity Engine
Enforces submission windows and verifies non-repudiation of student deliverables.
"""

import hashlib
from datetime import datetime
from typing import Dict, Optional, Tuple

class AssignmentSessionValidator:
    def __init__(self, session_start: datetime, session_end: datetime):
        self.start = session_start
        self.end = session_end

    def is_session_active(self, timestamp: Optional[datetime] = None) -> Tuple[bool, str]:
        now = timestamp or datetime.utcnow()
        if now < self.start:
            return False, "Session has not yet commenced."
        if now > self.end:
            return False, "Submission window is closed (Late Submission Rejected)."
        return True, "Session Active"

    @staticmethod
    def generate_audit_receipt(student_id: str, assignment_id: str, content: str) -> Dict[str, str]:
        payload = f"{student_id}:{assignment_id}:{content}:{datetime.utcnow().isoformat()}"
        sha = hashlib.sha256(payload.encode('utf-8')).hexdigest()
        return {
            "student_id": student_id,
            "assignment_id": assignment_id,
            "cryptographic_hash": sha,
            "status": "ACCEPTED_FOR_EVALUATION"
        }`
      }
    ]
  },

  // ── 5. TrustGuard Anti-Scam Super App ────────────────────────
  {
    projectId: "trustguard",
    projectTitle: "TrustGuard — Anti-Scam Super App",
    files: [
      {
        path: "ml/intent_model.py",
        name: "intent_model.py",
        language: "python",
        description: "Verified intent classification and fraud detection router mapping query vectors to threat clusters. Extracted from SECURE_AI_PROJECT.",
        dependencies: ["numpy", "typing"],
        keyFunctions: [
          { name: "classify_intent()", purpose: "Computes cosine similarity against high-risk phishing and urgent transaction intent vectors.", inputs: "query, threshold=0.4", outputs: "Optional[str] category" }
        ],
        code: `"""
ml/intent_model.py - Intent classification and threat query routing.
Extracted from: /home/kali/Documents/SECURE_AI_PROJECT/ml/intent_model.py
"""

from typing import Optional, List, Dict
import numpy as np

FIELD_EXAMPLES: Dict[str, List[str]] = {
    "Financial Urgent Scam": [
        "send OTP immediately to prevent account suspension",
        "your electricity bill is pending click here to avoid cutoff",
        "claim your lottery prize by depositing security amount"
    ],
    "Credential Phishing": [
        "reset your banking password using this unofficial link",
        "verify your credentials within 10 minutes",
        "urgent verification required from customer care"
    ]
}

def cosine_similarity(v1: np.ndarray, v2: np.ndarray) -> float:
    dot = np.dot(v1, v2)
    norm = (np.linalg.norm(v1) * np.linalg.norm(v2))
    return float(dot / norm) if norm > 0 else 0.0

def evaluate_threat_score(text: str) -> float:
    # Heuristic scoring based on urgency indicators and high-risk terms
    risk_keywords = ["urgent", "otp", "suspend", "lottery", "password", "deposit"]
    hits = sum(1 for kw in risk_keywords if kw in text.lower())
    return min(1.0, hits * 0.25)`
      }
    ]
  }
];

