# Complete Project Audit: ESP32 Alcohol Detection System

**Date:** 2026-11-10  
**Project:** ESP32 Alcohol Detection & Safety Interlock  
**Target Environment:** React 18, TypeScript, Tailwind CSS, Vite  
**Auditor:** Senior Frontend Architect & Embedded Systems Technical Communicator  

---

## 1. Existing Project Locations & References

The Alcohol Detection System is currently referenced across multiple sections of the portfolio:

| File Location | Role & Implementation Reality |
| :--- | :--- |
| `src/components/FeaturedShowcase/ThreeMainProjects.tsx` | Primary showcase tab with an 8-stage simulation loop, hardware blocks, and text tabs. |
| `src/components/Projects/Projects.tsx` | Project card mapped from `src/data/portfolioData.ts` under "Embedded & IoT". |
| `src/components/UI/ProjectModal.tsx` | Detail modal displaying overview, problem statement, key features, and architecture notes. |
| `src/components/DiagramViewer/DiagramViewer.tsx` | Circuit schematic table with pinouts (MQ-3 GPIO 34, Airflow GPIO 35, Relay GPIO 26, Buzzer GPIO 27, LEDs, OLED). |
| `src/data/portfolioData.ts` | Entry `esp32-alcohol-detection` with overview, technologies, features, and image link. |
| `src/data/projectCodeData.ts` | Synthetic Arduino sketch `esp32_alcohol_interlock.ino` and `mq3_calibration.cpp`. |
| `src/data/videoData.ts` | Video playlist metadata entries `alc-vid-01` to `alc-vid-04`. |
| `src/components/Exploded3DView/Exploded3DView.tsx` | Exploded layer hierarchy claiming ESP32-CAM driver facial verification, exhalation whistle, and OLED. |
| `src/components/CodePlayground/CodeExecutionPlayground.tsx` | JavaScript simulation of an exponential rolling filter on simulated 12-bit ADC values. |
| `public/projects/alcohol-detection.svg` | Vector schematic graphic showing MQ-3 sensor, ESP32 MCU node, and relay cutoff box. |

---

## 2. Technical Claims vs. Verification Reality

| Claimed Feature | Status Classification | Evidence & Technical Assessment | Action Required |
| :--- | :--- | :--- | :--- |
| **Alcohol-Vapour Sensing** | **A. Verified in Concept / Core Scope** | Central focus of the diploma project; based on semiconductor gas detection. | Retain as core prototype focus; clarify calibration status. |
| **Specific Sensor Model (MQ-3)** | **D. To Be Confirmed** | MQ-3 is the standard didactic SnO2 sensor module, but physical unit batch is unverified. | Mark as *"Alcohol-Vapour Sensor (MQ-3 / SnO2 Module — Model to be Confirmed)"*. |
| **ESP32 Microcontroller** | **A. Verified Target Architecture** | Dual-core Tensilica architecture referenced across codebase and curriculum training. | Retain as central processing unit; document GPIO pinout. |
| **Relay Ignition Cutoff** | **B. Present in Benchtop Logic** | Benchtop relay coil toggling is valid; full in-vehicle automotive starter harness splicing was never tested on a live road vehicle. | Retain as benchtop interlock logic; clarify road safety boundaries (bench demonstration only). |
| **Audio-Visual Alerts (Buzzer/LED)** | **A. Verified Hardware Concept** | Standard 5V active buzzer and status LEDs wired to digital GPIOs. | Retain as implemented alert mechanism. |
| **50-Sample Moving Average Filter** | **B. Software Simulation Only** | Algorithm exists in codebase (`projectCodeData.ts` & playground); running in simulation. | Retain as firmware processing algorithm with explicit simulation label. |
| **BAC Measurements (mg/L, % BAC)** | **B. Synthetic / Indicative Only** | Uncalibrated SnO2 semiconductor sensors cannot legalistically measure Blood Alcohol Concentration without blood/IR spectrometry. | **Must not claim legal BAC.** Clearly label as *Relative Sensor Voltage / Vapour Index (Illustrative Demonstration)*. |
| **AI Camera & Face Verification** | **C. Proposed / Future Scope** | ESP32-CAM facial recognition was a proposed concept, not deployed in the physical benchtop breadboard circuit. | Move completely to **Future Scope**; remove from active prototype claims. |
| **Airflow Anti-Bypass Sensor** | **C. Proposed / Future Scope** | Exhalation thermistor/pressure sensor was conceptually outlined to prevent bypass, not verified in hardware test records. | Move to **Future Scope / Proposed Extensions**. |
| **SSD1306 OLED Telemetry Screen** | **B. Present in Code / Benchtop Option** | Code includes I2C initialization; hardware setup may use Serial Monitor or OLED. | Mark OLED as optional benchtop telemetry display. |

---

## 3. Structural & User Experience Problems in Current Showcase

1. **Over-Complicated 8-Stage Simulator:**
   - The current simulator jumps through 8 stages (Boot → Face Camera → Breath Sample → Airflow Check → MQ-3 → Threshold → Buzzer → Ignition).
   - Because 2 of these stages (Camera and Airflow) are not physically implemented in the prototype, the simulation feels artificial.
2. **Conflating Synthetic Values with Legal Measurements:**
   - The UI displays `0.088 BAC mg/L` and claims legal thresholds, which damages credibility with experienced embedded systems engineers who know MQ-3 sensor physics (temperature drift, cross-sensitivity to humidity/smoke, non-linear logarithmic curve).
3. **No Hardware Photo Evidence or Documented Test Benches:**
   - No gallery exists for real prototype wiring, breadboard setups, or oscilloscope/serial captures.
4. **Action Buttons are Missing or Inactive:**
   - The project card lacks direct pathways to inspect technical architecture, interactive signal workflow, hardware components, and test logs.
5. **Lack of Clear Engineering Documentation:**
   - No downloadable project summary or interactive SVG export is provided.

---

## 4. Remediation Plan

* [x] **Modular Architecture:** Build dedicated components in `src/components/AlcoholProject/` so code is clean, testable, and reusable.
* [x] **Honest Claim Segmentation:** Separate implemented prototype functionality from Future Scope.
* [x] **Clean 4-Stage Interactive Workflow:**
  * Stage 1: Alcohol-Vapour Sensing
  * Stage 2: Signal Acquisition
  * Stage 3: ESP32 Processing
  * Stage 4: System Response
* [x] **Hardware Explorer:** 2D technical cards with verified pinouts, component roles, and implementation statuses.
* [x] **Interactive Architecture Diagram:** SVG-based directional flow with clickable nodes and SVG download.
* [x] **Photo Gallery & Lightbox:** Upload-ready categorized placeholders for actual bench evidence.
* [x] **Video Section:** Universal player supporting local MP4/external URL with graceful fallback.
* [x] **Dual-Mode Demonstration:** Strictly separated Synthetic Conceptual Demo vs. Actual Hardware Observations.
* [x] **Formal Testing Table:** Professional verification test suite with unambiguous pass/simulated statuses.
* [x] **Documentation & Download Hub:** Clean downloadable summary and SVG architecture export.
* [x] **Future Roadmap:** Calibrated chamber testing, temperature compensation, and wireless telemetry.

