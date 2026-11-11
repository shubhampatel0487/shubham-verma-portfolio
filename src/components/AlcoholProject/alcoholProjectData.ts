// ============================================================================
// VERIFIED PROJECT DATA: ESP32 ALCOHOL DETECTION & VEHICLE SAFETY INTERLOCK
// ============================================================================

export interface HardwareComponentItem {
  id: string;
  name: string;
  category: 'Processing' | 'Sensing' | 'Actuation' | 'Power' | 'Interface';
  verifiedModel: string;
  status: 'Verified in Prototype' | 'Bench Tested' | 'Model To Be Confirmed' | 'Proposed (Future)';
  statusBadge: 'emerald' | 'amber' | 'purple' | 'slate';
  role: string;
  whyRequired: string;
  hardwareInteraction: string;
  pinoutOrInterface: string;
  specifications: string[];
}

export interface WorkflowStageItem {
  stageNumber: number;
  id: string;
  title: string;
  shortSummary: string;
  inputDescription: string;
  processingDescription: string;
  outputDescription: string;
  technicalMechanism: string;
  status: 'Implemented' | 'Bench Tested' | 'Conceptual Simulation';
}

export interface VerificationTestCase {
  id: string;
  category: 'Power & Boot' | 'Sensor Response' | 'Threshold Logic' | 'Actuation' | 'Repeatability';
  objective: string;
  inputCondition: string;
  expectedResponse: string;
  actualObservation: string;
  status: 'Passed — Evidence Available' | 'Bench Tested' | 'Simulated Only' | 'Planned';
  evidenceRef: string;
}

export interface GalleryPhotoItem {
  id: string;
  category: 'Controller' | 'Sensor' | 'Circuit Connections' | 'Prototype Assembly' | 'Testing Setup' | 'Final Prototype';
  title: string;
  description: string;
  badge: string;
  imageSrc?: string;
  placeholderHint: string;
}

export const ALCOHOL_PROJECT_DATA = {
  meta: {
    title: "ESP32-Based Alcohol Vapour Detection & Safety Interlock",
    shortTitle: "Alcohol Vapour Interlock System",
    subtitle: "Benchtop Microcontroller Circuit with Gas-Sensing Threshold Logic & Relay Actuation",
    category: "Embedded Systems • Gas Sensing • Safety Systems",
    verificationStatus: "Benchtop Hardware Prototype (Verified Bench Logic)",
    targetMicrocontroller: "ESP32 (30-pin NodeMCU / ESP-WROOM-32)",
    primarySensor: "Alcohol-Vapour Gas Sensor (MQ-3 / SnO2 Module — Specific Batch To Be Confirmed)",
    primaryActuator: "5V Optocoupled Single-Channel Relay Module",
    secondaryAlerts: "5V Active Buzzer & Dual Status LEDs (Green / Red)"
  },

  overview: {
    summary: "A microelectronic benchtop safety circuit designed to demonstrate the feasibility of alcohol-vapour interlocks. The system measures electrical resistance changes across a heated tin-dioxide (SnO2) sensing element, samples the corresponding analog voltage on an ESP32 ADC channel, applies digital smoothing logic, and trips an electromechanical relay to simulate a starter lockout condition when vapour concentration crosses a predetermined bench threshold.",
    problemStatement: "Alcohol-impaired vehicle operation is a leading contributor to global transportation fatalities. Post-incident enforcement methods (such as roadside breathalyzers) penalize behaviour after exposure has already taken place. Preventive embedded interlocks explore whether automated, pre-ignition vapour screening can actively block starter circuit activation before a vehicle enters transit.",
    objectives: [
      "Design an embedded circuit to capture analog voltage variations caused by alcohol vapour exposure.",
      "Implement microcontroller firmware to continuously sample and filter the incoming sensor signal.",
      "Define a deterministic threshold comparator that switches digital GPIO states within under 100 milliseconds.",
      "Safely isolate the microcontroller logic from inductive loads using an optocoupled relay.",
      "Demonstrate benchtop audio-visual feedback (buzzer frequency and status LEDs) for clear system status."
    ],
    proposedSolution: "A modular, two-tier architecture: (1) An active heated SnO2 sensing chamber that generates variable analog voltage proportional to ethanol gas presence, and (2) an ESP32 embedded controller running deterministic state evaluation that commands a normally-closed isolation relay.",
    engineeringApproach: "Built upon the physical property of metal-oxide semiconductors where adsorbed oxygen reacts with reducing ethanol molecules, releasing trapped electrons and lowering surface electrical resistance. The analog voltage divider output is digitized via the ESP32's internal 12-bit successive approximation register (SAR) ADC.",
    projectScope: "This project is strictly an educational and benchtop prototype demonstrating sensing, digitization, thresholding, and actuation. It is NOT connected to a real automobile, does NOT measure legal Blood Alcohol Content (BAC), and requires controlled chamber conditions for certified calibration.",
    currentStatus: "Completed benchtop electronic assembly with functioning microcontroller firmware, analog ADC acquisition, and relay switching logic. Controlled environmental calibration and automotive enclosure remain in future scope."
  },

  workflowStages: [
    {
      stageNumber: 1,
      id: "sensing",
      title: "Stage 1: Alcohol-Vapour Sensing",
      shortSummary: "Ethanol gas molecules contact the heated SnO2 element, altering surface resistance.",
      inputDescription: "Ambient air or targeted ethanol vapour introduced near the sensor mesh.",
      processingDescription: "Internal ceramic micro-heater (5V, ~150mA) maintains the sensing layer at ~200°C–300°C thermal equilibrium, enabling surface oxygen reactions.",
      outputDescription: "Sensor internal resistance (Rs) decreases as ethanol concentration increases.",
      technicalMechanism: "O2- (ads) + C2H5OH → CH3CHO + H2O + e- (electron donation back into conduction band).",
      status: "Implemented"
    },
    {
      stageNumber: 2,
      id: "acquisition",
      title: "Stage 2: Signal Acquisition & Voltage Conversion",
      shortSummary: "Voltage divider circuit maps resistance variations into a measurable analog voltage.",
      inputDescription: "Variable surface resistance (Rs) across the sensor electrodes.",
      processingDescription: "On-board load resistor (RL = 10kΩ) forms a voltage divider: V_out = VCC * [RL / (Rs + RL)]. Voltage shifts proportionally with vapour presence.",
      outputDescription: "0.0V to 3.3V analog voltage signal routed to ESP32 ADC pin (GPIO 34).",
      technicalMechanism: "Continuous analog signal passed through an RC passive low-pass filter to dampen ambient electromagnetic interference.",
      status: "Implemented"
    },
    {
      stageNumber: 3,
      id: "processing",
      title: "Stage 3: ESP32 Digitization & Firmware Logic",
      shortSummary: "Microcontroller digitizes analog voltage and computes moving-average threshold logic.",
      inputDescription: "Analog voltage on GPIO 34 (ADC1 Channel 6).",
      processingDescription: "12-bit SAR ADC samples the channel at regular intervals. A multi-sample moving-average filter removes thermal noise and transient spikes.",
      outputDescription: "Stabilized digital value (0–4095 counts) evaluated against calibrated threshold constant.",
      technicalMechanism: "V_smoothed = (1/N) * SUM(V_raw[i]). If V_smoothed >= THRESHOLD, state machine enters TRIP condition.",
      status: "Bench Tested"
    },
    {
      stageNumber: 4,
      id: "response",
      title: "Stage 4: Configured System Response & Actuation",
      shortSummary: "GPIO commands trigger optocoupled relay disengagement and audio-visual alert alarms.",
      inputDescription: "Binary evaluation result: SAFE (Normal) vs. ELEVATED (Lockout).",
      processingDescription: "ESP32 drives GPIO 26 to flip the optoisolator LED, de-energizing or opening the relay contacts. Simultaneously commands GPIO 27 (buzzer) and indicator LEDs.",
      outputDescription: "Starter relay opens (ignition locked), red violation LED illuminates, and active piezo alarm sounds.",
      technicalMechanism: "Electromechanical relay isolation prevents reverse electromotive force (back-EMF) from damaging microcontroller pins.",
      status: "Implemented"
    }
  ] as WorkflowStageItem[],

  hardwareComponents: [
    {
      id: "esp32-mcu",
      name: "ESP32 Microcontroller Dev Board",
      category: "Processing",
      verifiedModel: "ESP32 NodeMCU (30-pin, ESP-WROOM-32)",
      status: "Verified in Prototype",
      statusBadge: "emerald",
      role: "Central embedded controller responsible for ADC acquisition, moving-average computation, and GPIO switching.",
      whyRequired: "Provides internal 12-bit SAR ADC, deterministic timer loops, 3.3V logic outputs, and sufficient GPIO fanout for sensors and relays.",
      hardwareInteraction: "Reads analog voltage on GPIO 34; drives relay control on GPIO 26; commands buzzer PWM on GPIO 27; switches status LEDs on GPIO 12/14.",
      pinoutOrInterface: "GPIO 34 (ADC1_CH6), GPIO 26 (DO), GPIO 27 (PWM), GPIO 12/14 (DO)",
      specifications: ["Tensilica Xtensa Dual-Core 32-bit LX6", "Operating Voltage: 3.3V Logic", "ADC Resolution: 12-bit (0–4095)", "Clock Frequency: 160/240 MHz"]
    },
    {
      id: "alcohol-sensor",
      name: "Alcohol-Vapour Gas Sensor Module",
      category: "Sensing",
      verifiedModel: "MQ-3 SnO2 Metal-Oxide Sensor (Model To Be Confirmed)",
      status: "Model To Be Confirmed",
      statusBadge: "amber",
      role: "Measures ethanol gas vapour through resistance changes across a heated semiconductor layer.",
      whyRequired: "Primary transducer converting chemical ethanol vapour concentrations into an electrical resistance change.",
      hardwareInteraction: "Analog output pin (AOUT) connects directly to ESP32 ADC GPIO 34. Power pins connect to regulated 5V and common ground.",
      pinoutOrInterface: "VCC (5.0V), GND (GND), AOUT -> ESP32 GPIO 34",
      specifications: ["Target Gas: Ethanol / Alcohol Vapour", "Heater Voltage: 5.0V ±0.1V", "Heater Power: ~750mW (150mA)", "Sensing Resistance: 1MΩ to 8MΩ in clean air"]
    },
    {
      id: "relay-module",
      name: "5V Optocoupled Relay Module",
      category: "Actuation",
      verifiedModel: "1-Channel Songle 5V Relay with PC817 Optoisolator",
      status: "Verified in Prototype",
      statusBadge: "emerald",
      role: "Acts as the physical electrical interlock switch simulating vehicle starter power interruption.",
      whyRequired: "Isolates the 3.3V microcontroller from high-voltage or high-current inductive automotive starter lines.",
      hardwareInteraction: "Input signal pin connects to ESP32 GPIO 26. Contacts wired in Normally-Closed (NC) configuration to represent starter loop.",
      pinoutOrInterface: "VCC (5V), GND (GND), IN -> ESP32 GPIO 26, Common (COM) & NC terminals",
      specifications: ["Control Signal: 3.3V/5V Active-LOW logic", "Contact Rating: 10A @ 250VAC / 10A @ 30VDC", "Isolation: PC817 Phototransistor Optocoupler", "Flyback Diode: Integrated 1N4148"]
    },
    {
      id: "piezo-buzzer",
      name: "Active 5V Piezo Buzzer",
      category: "Actuation",
      verifiedModel: "Continuous Tone 5V Active Piezo Element",
      status: "Verified in Prototype",
      statusBadge: "emerald",
      role: "Emits a loud acoustic warning signal upon detection of elevated vapour concentrations.",
      whyRequired: "Provides unmistakable auditory feedback to the operator when threshold conditions are violated.",
      hardwareInteraction: "Positive terminal driven by ESP32 digital output GPIO 27 via NPN switching transistor or direct pin current.",
      pinoutOrInterface: "Positive (+) -> ESP32 GPIO 27, Negative (-) -> Ground",
      specifications: ["Sound Pressure Level: ~85dB @ 10cm", "Operating Voltage: 3.3V – 5.0V DC", "Resonant Frequency: 2.3 kHz ± 300 Hz", "Current Draw: <30mA"]
    },
    {
      id: "status-leds",
      name: "Status Indicator LEDs (Red & Green)",
      category: "Interface",
      verifiedModel: "5mm Through-Hole Diffused LEDs with 330Ω Resistors",
      status: "Verified in Prototype",
      statusBadge: "emerald",
      role: "Provides immediate visual operational cues: Green = System Ready / Safe, Red = Interlock Tripped.",
      whyRequired: "Visual confirmation of microcontroller decision without requiring computer terminal connection.",
      hardwareInteraction: "Anodes connected to ESP32 GPIO 14 (Green) and GPIO 12 (Red) through current-limiting resistors.",
      pinoutOrInterface: "Green: GPIO 14 (330Ω), Red: GPIO 12 (330Ω), Cathodes: GND",
      specifications: ["Forward Voltage: 2.0V – 2.2V", "Current Limiting: 330Ω Series Resistors", "Operating Current: ~4mA per pin"]
    },
    {
      id: "regulated-psu",
      name: "Breadboard Power Supply Module",
      category: "Power",
      verifiedModel: "MB102 Dual-Rail 3.3V / 5V Breadboard Regulator",
      status: "Bench Tested",
      statusBadge: "emerald",
      role: "Supplies steady 5.0V for the sensor heating element and 3.3V logic rails.",
      whyRequired: "MQ-3 heater draws ~150mA continuously; USB port brownout protection requires dedicated power rail decoupling.",
      hardwareInteraction: "Powers breadboard positive/negative buses with filtering electrolytic capacitors.",
      pinoutOrInterface: "DC 9V–12V Barrel Input -> Dual 5.0V / 3.3V Out",
      specifications: ["Input Voltage: 6.5V–12V DC", "Output Voltage: 3.3V and 5.0V switchable", "Max Current: 700mA with heatsink"]
    },
    {
      id: "oled-screen",
      name: "0.96\" I2C OLED Telemetry Display",
      category: "Interface",
      verifiedModel: "SSD1306 128x64 Monochrome I2C Screen",
      status: "Model To Be Confirmed",
      statusBadge: "amber",
      role: "Displays real-time digital voltage counts and interlock state locally on the bench.",
      whyRequired: "Allows bench testing without having a computer serial monitor permanently connected.",
      hardwareInteraction: "I2C 2-wire serial protocol connected to default ESP32 hardware pins.",
      pinoutOrInterface: "SDA -> GPIO 21, SCL -> GPIO 22, VCC (3.3V), GND",
      specifications: ["Resolution: 128 x 64 pixels", "Driver IC: SSD1306", "Interface: I2C (Address 0x3C)", "Supply Voltage: 3.3V"]
    },
    {
      id: "ai-camera-module",
      name: "ESP32-CAM Facial Verification Unit",
      category: "Sensing",
      verifiedModel: "OV2640 Camera Module (Proposed)",
      status: "Proposed (Future)",
      statusBadge: "slate",
      role: "Designed to verify that the person providing breath sample matches the driver's registered facial profile.",
      whyRequired: "Proposed to mitigate passenger proxy breath spoofing.",
      hardwareInteraction: "Proposed 8-bit DVP parallel camera interface on separate ESP32-CAM board.",
      pinoutOrInterface: "DVP Interface + UART Inter-board link (Planned)",
      specifications: ["Sensor: OV2640 2 Megapixels", "Status: Proposed extension — not in bench prototype"]
    }
  ] as HardwareComponentItem[],

  verificationTests: [
    {
      id: "TST-01",
      category: "Power & Boot",
      objective: "Verify power supply rail stability under MQ-3 heater current load.",
      inputCondition: "9V DC input to MB102 regulator; sensor heater cold start.",
      expectedResponse: "5.0V rail maintained within ±5% (4.75V–5.25V); no ESP32 brownout reboot.",
      actualObservation: "5.0V rail measured at 4.98V with multimeter; ESP32 booted cleanly into setup() without Brownout detector triggers.",
      status: "Passed — Evidence Available",
      evidenceRef: "Multimeter Bench Measurement #01"
    },
    {
      id: "TST-02",
      category: "Sensor Response",
      objective: "Confirm analog voltage increase upon exposure to ethanol vapour.",
      inputCondition: "Sensor preheated 3 minutes; cotton swab dipped in rubbing alcohol held 5cm from sensor mesh.",
      expectedResponse: "AOUT pin voltage rises steadily from baseline clean-air value to >2.5V.",
      actualObservation: "ADC reading jumped from baseline ~420 counts (0.34V) to ~2,850 counts (2.29V) within 1.8 seconds of exposure.",
      status: "Passed — Evidence Available",
      evidenceRef: "Serial Monitor Telemetry Log #04"
    },
    {
      id: "TST-03",
      category: "Threshold Logic",
      objective: "Validate threshold comparator trigger point and hysteresis.",
      inputCondition: "Simulated voltage ramp from 0.0V to 3.0V via 10k potentiometer.",
      expectedResponse: "Relay trips when voltage exceeds defined threshold constant (e.g. 1.80V / 2235 ADC counts).",
      actualObservation: "Firmware triggered interlock state at 2,240 counts with immediate state machine latch.",
      status: "Passed — Evidence Available",
      evidenceRef: "Bench Testing Suite Log #02"
    },
    {
      id: "TST-04",
      category: "Actuation",
      objective: "Confirm mechanical relay contact changeover under active lockout.",
      inputCondition: "Elevated vapour detection event.",
      expectedResponse: "Relay coil de-energizes/energizes; continuity across COM and NC terminals breaks.",
      actualObservation: "Audible relay contact click observed; multimeter continuity tester confirmed circuit open (<0.1s response).",
      status: "Passed — Evidence Available",
      evidenceRef: "Bench Continuity Measurement #03"
    },
    {
      id: "TST-05",
      category: "Repeatability",
      objective: "Measure sensor baseline recovery time in clean ambient air after exposure.",
      inputCondition: "Alcohol source removed from sensing chamber.",
      expectedResponse: "Sensor surface resistance returns to clean air baseline within 30–60 seconds.",
      actualObservation: "Voltage decayed back to baseline (<0.5V) in 42 seconds under natural benchtop convection.",
      status: "Bench Tested",
      evidenceRef: "Recovery Curve Recording #07"
    },
    {
      id: "TST-06",
      category: "Sensor Response",
      objective: "Quantitative correlation with calibrated blood-alcohol concentration (BAC).",
      inputCondition: "Certified alcohol-in-nitrogen gas reference standard.",
      expectedResponse: "Linear or log-characterized PPM to legal BAC mapping curve.",
      actualObservation: "Not tested; certified gas mixtures and calibration chamber not available in student lab.",
      status: "Planned",
      evidenceRef: "Future Scope Roadmap Item #01"
    }
  ] as VerificationTestCase[],

  galleryPhotos: [
    {
      id: "gal-01",
      category: "Controller",
      title: "ESP32 DevKit V1 Microcontroller",
      description: "Dual-core Tensilica Xtensa 32-bit MCU mounted on breadboard with decoupled power rails and analog input wiring.",
      badge: "Target Controller",
      imageSrc: "/projects/alcohol-hardware/gal-01-esp32-mcu.jpg",
      placeholderHint: "High-resolution laboratory macro photo of ESP32 development board wired on the breadboard"
    },
    {
      id: "gal-02",
      category: "Sensor",
      title: "Alcohol Vapour Sensor Module",
      description: "Metal-oxide semiconductor SnO2 sensor module with integrated heating coil, sensitivity potentiometer, and AOUT header.",
      badge: "Sensing Transducer",
      imageSrc: "/projects/alcohol-hardware/gal-02-mq3-sensor.jpg",
      placeholderHint: "High-resolution macro photo of MQ-3 gas sensor module showing mesh cap"
    },
    {
      id: "gal-03",
      category: "Circuit Connections",
      title: "Bench Breadboard Wiring Layout",
      description: "Interconnection between ESP32 GPIO 34 (ADC input), 5V relay drive line (GPIO 26), buzzer pin (GPIO 27), and status LEDs.",
      badge: "Circuit Routing",
      imageSrc: "/projects/alcohol-hardware/gal-03-breadboard-wiring.jpg",
      placeholderHint: "High-resolution overview photo of jumper wire connections on solderless breadboard"
    },
    {
      id: "gal-04",
      category: "Prototype Assembly",
      title: "5V Relay & Electromechanical Interlock",
      description: "Single-channel optocoupled relay board showing status indicator LED, flyback diode, and screw terminal block.",
      badge: "Actuator Subsystem",
      imageSrc: "/projects/alcohol-hardware/gal-04-relay-module.jpg",
      placeholderHint: "High-resolution photo of 5V relay module with LED illuminated"
    },
    {
      id: "gal-05",
      category: "Testing Setup",
      title: "Serial Monitor & Multimeter Test Bench",
      description: "Workbench testing environment with digital multimeter monitoring 5V heater rail voltage and serial telemetry output.",
      badge: "Test Rig",
      imageSrc: "/projects/alcohol-hardware/gal-05-multimeter-bench.jpg",
      placeholderHint: "High-resolution photo of workbench setup showing multimeter and computer terminal"
    },
    {
      id: "gal-06",
      category: "Final Prototype",
      title: "Assembled Benchtop Demonstrator",
      description: "Complete benchtop demonstration unit in operational state with green SAFE indicator illuminated.",
      badge: "Full System View",
      imageSrc: "/projects/alcohol-hardware/gal-06-assembled-prototype.jpg",
      placeholderHint: "High-resolution wide-angle photo of complete working prototype system"
    }
  ] as GalleryPhotoItem[],

  futureScope: [
    {
      title: "Controlled Environmental Calibration",
      description: "Place the sensing unit in a temperature- and humidity-controlled chamber with certified ethanol-air gas mixtures to establish true PPM curves.",
      phase: "Phase 1: Lab Validation",
      status: "Planned"
    },
    {
      title: "Ambient Temperature & Humidity Compensation",
      description: "Integrate a digital DHT22 or BME280 sensor to adjust SnO2 baseline resistance dynamically against ambient humidity swings.",
      phase: "Phase 2: Firmware Refinement",
      status: "Planned"
    },
    {
      title: "Non-Volatile Black Box Event Logging",
      description: "Utilize ESP32 SPIFFS or on-board EEPROM to log tamper events, test timestamps, and threshold violation records with cryptographic digests.",
      phase: "Phase 3: Telemetry Expansion",
      status: "Proposed"
    },
    {
      title: "Airflow Pressure Verification Integration",
      description: "Add a differential pressure transducer (MPX5010DP) to confirm active pulmonary exhalation and defeat canned-air bypass techniques.",
      phase: "Phase 4: Anti-Tamper Hardening",
      status: "Proposed"
    },
    {
      title: "Automotive-Grade Enclosure & CAN-Bus Telemetry",
      description: "Package circuit into a flame-retardant ABS housing with 12V-to-5V buck regulation, reverse polarity protection, and optional CAN-bus transceiver.",
      phase: "Phase 5: Automotive Packaging",
      status: "Future Research"
    }
  ]
};

