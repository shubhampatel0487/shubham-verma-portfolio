import React from 'react';
import { AlcoholProjectHero } from './AlcoholProjectHero';
import { AlcoholProjectOverview } from './AlcoholProjectOverview';
import { AlcoholWorkflow } from './AlcoholWorkflow';
import { AlcoholHardwareExplorer } from './AlcoholHardwareExplorer';
import { AlcoholArchitecture } from './AlcoholArchitecture';
import { AlcoholPhotoGallery } from './AlcoholPhotoGallery';
import { AlcoholVideoPlayer } from './AlcoholVideoPlayer';
import { AlcoholDemoPanel } from './AlcoholDemoPanel';
import { AlcoholTestingSection } from './AlcoholTestingSection';
import { AlcoholCodeExplorer } from './AlcoholCodeExplorer';
import { AlcoholDocumentation } from './AlcoholDocumentation';
import { AlcoholFutureScope } from './AlcoholFutureScope';

export const AlcoholProjectShowcase: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    // If the section is a subcomponent, ensure it is visible or scroll to it
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadReport = () => {
    const reportContent = `================================================================================
TECHNICAL CASE STUDY REPORT: ESP32 ALCOHOL DETECTION & SAFETY INTERLOCK
Author: SHUBHAM VERMA (Diploma in Computer Science & Engineering 2023–2026)
Target Architecture: ESP32 NodeMCU 30-Pin Microcontroller
Primary Sensor: MQ-3 / SnO2 Semiconductor Alcohol-Vapour Module
Primary Actuator: 5V 1-Channel Optocoupled Relay Module (Songle)
================================================================================

1. EXECUTIVE SUMMARY
A microelectronic benchtop safety circuit designed to demonstrate the feasibility
of alcohol-vapour interlocks. The system measures electrical resistance changes
across a heated tin-dioxide (SnO2) sensing element, samples the corresponding
analog voltage on an ESP32 ADC channel (GPIO 34), applies digital smoothing logic,
and trips an electromechanical relay to simulate a starter lockout condition when
vapour concentration crosses a predetermined bench threshold.

2. PROBLEM STATEMENT & OBJECTIVES
Alcohol-impaired vehicle operation is a leading contributor to global transportation
fatalities. Standard post-incident enforcement (e.g. roadside checks) acts only after
danger has materialized. An embedded interlock explores whether pre-ignition
vapour screening can actively block starter circuit activation.

Key Objectives:
- Capture analog voltage variations caused by ethanol vapour exposure.
- Implement moving-average smoothing in ESP32 firmware to suppress thermal line noise.
- Deterministically trip an optocoupled relay within <100ms of threshold violation.
- Provide acoustic and visual cues via piezo buzzer and dual-color LEDs.

3. HARDWARE PINOUT & SYSTEM CONNECTIONS
- Sensor Analog Out (AOUT)  --> ESP32 GPIO 34 (ADC1 Channel 6, 12-bit SAR)
- Relay Drive Pin (IN)      --> ESP32 GPIO 26 (Active-LOW, Optoisolated)
- Piezo Buzzer Positive (+) --> ESP32 GPIO 27 (PWM Tone Generator)
- Green Status LED Anode    --> ESP32 GPIO 14 (via 330 Ohm resistor)
- Red Alert LED Anode       --> ESP32 GPIO 12 (via 330 Ohm resistor)
- Logic Supply Rails        --> 3.3V Logic, 5.0V Regulated Heater Supply (MB102)

4. PHYSICAL SENSING & SIGNAL CONDITIONING
Metal-oxide semiconductors (SnO2) exhibit surface conductivity dependent on the
partial pressure of ambient reducing gases. In clean air, adsorbed oxygen forms
surface O2- ions, trapping conduction band electrons and creating a high-resistance
potential barrier. When ethanol gas (C2H5OH) contacts the heated surface (~250°C),
it reacts with adsorbed oxygen:
    C2H5OH + 3O2-(ads) --> 2CO2 + 3H2O + 6e-
Donated electrons drop internal resistance Rs. The load resistor RL (10k) converts
this resistance into an analog voltage:
    V_out = VCC * [RL / (Rs + RL)]

5. VERIFICATION TEST SUITE SUMMARY
- TST-01: Power Supply Stability (9V -> 5V MB102 rail under 150mA heater load) --> PASSED (4.98V measured)
- TST-02: Sensor Response on Ethanol Swab Exposure --> PASSED (ADC jump from 420 to 2850 counts)
- TST-03: Comparator Trigger Point (Potentiometer ramp) --> PASSED (Relay tripped at 2240 counts)
- TST-04: Mechanical Relay Contact Changeover --> PASSED (Continuity broken, <85ms response)
- TST-05: Sensor Baseline Recovery Decay --> BENCH TESTED (38-45s recovery to clean air)
- TST-06: Certified PPM to Legal BAC Correlation --> PLANNED (Requires environmental chamber)

6. TECHNICAL SCOPE & HONESTY STATEMENT
- This prototype is strictly an educational benchtop hardware demonstration.
- It was NOT wired into a moving vehicle harness to prevent any risk to power steering or brakes.
- MQ-3 readings are relative illustrative voltages, not legal Blood Alcohol Concentration (BAC) measurements.
- AI facial verification and exhalation pressure sensors are proposed future extensions.

Generated directly from Shubham Verma's Verified Engineering Portfolio.
Date: ${new Date().toISOString().split('T')[0]}
================================================================================
`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ESP32_Alcohol_Detection_Technical_Report.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* 1. Premium Hero Section */}
      <AlcoholProjectHero
        onNavigateSection={scrollToSection}
        onDownloadReport={handleDownloadReport}
      />

      {/* 2. Structured Overview & Problem Statement */}
      <AlcoholProjectOverview />

      {/* 3. Interactive 4-Stage System Workflow */}
      <AlcoholWorkflow />

      {/* 4. Hardware Component Explorer (Clean 2D Technical Cards) */}
      <AlcoholHardwareExplorer />

      {/* 5. 2D Interactive System Architecture Diagram */}
      <AlcoholArchitecture />

      {/* 6. Hardware Photo Gallery (Categorized with Lightbox) */}
      <AlcoholPhotoGallery />

      {/* 7. Dedicated Video Player & Storyboard Section */}
      <AlcoholVideoPlayer />

      {/* 8. Working Demonstration (Dual Mode: Conceptual Demo vs. Actual Hardware Evidence) */}
      <AlcoholDemoPanel />

      {/* 9. Formal Testing & Verification Table */}
      <AlcoholTestingSection />

      {/* 10. Software & Firmware Code Explorer */}
      <AlcoholCodeExplorer />

      {/* 11. Technical Documentation & Artifact Hub */}
      <AlcoholDocumentation onDownloadReport={handleDownloadReport} />

      {/* 12. Future Scope & Research Roadmap */}
      <AlcoholFutureScope />

    </div>
  );
};
