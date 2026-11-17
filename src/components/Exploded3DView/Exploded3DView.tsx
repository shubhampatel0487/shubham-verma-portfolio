import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Layers,
  Cpu,
  Shield,
  Sliders,
  Zap,
  CheckCircle2,
  Radio,
  Play,
  Pause,
  Sparkles,
} from 'lucide-react';

interface ComponentLayer {
  id: string;
  name: string;
  subsystem: 'Mechanical' | 'Sensing' | 'Processing' | 'Actuation' | 'Power';
  pinout: string;
  voltage: string;
  functionDescription: string;
  failSafeMode: string;
  meshIndex: number;
  yOffset: number; // Y position in 3D units when fully exploded
  color: number;
  accentColor: string;
  specs: { [key: string]: string };
}

const HARDWARE_COMPONENTS: ComponentLayer[] = [
  {
    id: 'case_top',
    name: 'Top Enclosure & Anti-Dilution Air Nozzle',
    subsystem: 'Mechanical',
    pinout: 'Aero-acoustic exhalation orifice with one-way membrane',
    voltage: 'Passive Mechanical Enclosure',
    functionDescription: 'Specially shaped fluidic hood preventing cabin HVAC wind or open-window air from diluting driver breath during the 3-second exhalation interval.',
    failSafeMode: 'Calibrated acoustic baffle requires minimum exhalation pressure, ensuring only deep alveolar lung breath reaches the sensor chamber.',
    meshIndex: 0,
    yOffset: 2.3,
    color: 0x334155,
    accentColor: '#94A3B8',
    specs: { Material: 'Flame-Retardant ABS-V0', Sealing: 'IP54 Splash Resistant', Intake: '12mm Alveolar Nozzle' },
  },
  {
    id: 'oled_display',
    name: '0.96" SSD1306 OLED Telemetry Micro-Panel',
    subsystem: 'Actuation',
    pinout: 'I2C Interface (SDA: GPIO21, SCL: GPIO22)',
    voltage: '3.3V DC (8mA active, AMS1117-regulated)',
    functionDescription: 'Monochrome 128x64 high-contrast display presenting live BAC readings, sensor thermal warmup countdown, and real-time ignition interlock status.',
    failSafeMode: 'Display frame buffer hangs or I2C bus stalls never block the independent FreeRTOS relay safety task running on CPU Core 1.',
    meshIndex: 1,
    yOffset: 1.55,
    color: 0x0284c7,
    accentColor: '#38BDF8',
    specs: { Resolution: '128 x 64 pixels', Protocol: 'I2C 400 kHz Fast-Mode', RefreshRate: '15 FPS Telemetry' },
  },
  {
    id: 'mq3_sensor',
    name: 'MQ-3 SnO2 Gas Sensor & Sampling Chamber',
    subsystem: 'Sensing',
    pinout: 'Analog Out: GPIO34 (ADC1_CH6), VCC: 5V, Heater: 5V, GND',
    voltage: '5.0V DC (Internal heater 150mA continuous)',
    functionDescription: 'Tin-dioxide (SnO2) electrochemical sensor. Alcohol vapor molecules lower surface electrical resistance, causing a steep, calibrated voltage rise.',
    failSafeMode: 'Broken heater filament or open circuit drops ADC signal to 0.00V baseline, triggering an instant failsafe lock on the vehicle starter.',
    meshIndex: 2,
    yOffset: 0.8,
    color: 0xd97706,
    accentColor: '#F59E0B',
    specs: { Sensitivity: '0.05 - 10 mg/L Alcohol', HeatingTime: '20s Pre-heat Stable', LoadResistor: '10 kΩ Precision RL' },
  },
  {
    id: 'esp32_mcu',
    name: 'ESP32 Dual-Core Xtensa LX6 Mainboard PCB',
    subsystem: 'Processing',
    pinout: 'Dual 240MHz Xtensa cores, 520KB SRAM, FreeRTOS tasks',
    voltage: '3.3V Logic Level (AMS1117-3.3 on-board regulator)',
    functionDescription: 'Dual-core computing brain: Core 0 handles Wi-Fi telemetry and secure MQTT cloud incident alerts; Core 1 executes deterministic 100 Hz ADC sampling and failsafe interlock logic.',
    failSafeMode: 'Dual Hardware Watchdog Timers (WDT) trigger an automatic system reset in <100ms if a firmware thread hangs.',
    meshIndex: 3,
    yOffset: 0.0,
    color: 0x059669,
    accentColor: '#10B981',
    specs: { CPU: 'Xtensa 32-bit Dual-Core 240MHz', ADC: '12-bit (0-4095 dynamic)', Flash: '4MB SPI Flash' },
  },
  {
    id: 'relay_module',
    name: '5V Opto-Isolated Automotive Ignition Cutoff Relay',
    subsystem: 'Actuation',
    pinout: 'Control: GPIO18, Normally-Closed (NC) Contacts in Series with Starter Solenoid',
    voltage: '5.0V DC Coil (70mA), 250VAC/10A Contacts',
    functionDescription: 'Electromechanical safety interlock switch wired directly into the vehicle starter relay circuit. De-energizes starter solenoid instantaneously when alcohol threshold is exceeded.',
    failSafeMode: 'Default NC configuration guarantees normal driving if power is cut; EL817 optoisolator prevents starter inductive back-EMF spikes from reaching the MCU.',
    meshIndex: 4,
    yOffset: -0.8,
    color: 0xdc2626,
    accentColor: '#EF4444',
    specs: { GalvanicIsolation: '5000 V_rms (EL817)', ContactRating: '10A @ 30VDC / 250VAC', SwitchingSpeed: '<10 ms Interlock' },
  },
  {
    id: 'power_buck',
    name: 'Automotive Isolated LM2596 DC-DC Buck Converter',
    subsystem: 'Power',
    pinout: 'Input: 12V/24V Car Battery, Output: 5.0V DC Regulated (2.5A)',
    voltage: 'VIN: 9V-35V DC, VOUT: 5.0V DC (Clamped)',
    functionDescription: 'Steps down noisy vehicle automotive alternator voltage (12V-14.4V) to a stable, noise-free 5V logic supply with Schottky flyback diode and LC ripple filter.',
    failSafeMode: 'Internal thermal shutdown and 3A cycle-by-cycle overcurrent protection prevent battery drain or thermal runaway during electrical shorts.',
    meshIndex: 5,
    yOffset: -1.55,
    color: 0x4f46e5,
    accentColor: '#818CF8',
    specs: { InputVoltage: '9V - 35V DC Automotive', SwitchingFreq: '150 kHz', Efficiency: 'Up to 92% Active' },
  },
  {
    id: 'case_bottom',
    name: 'Bottom Chassis & Anti-Vibration DIN Mount',
    subsystem: 'Mechanical',
    pinout: 'Automotive dashboard under-dash mounting bracket with ground lug',
    voltage: 'Passive Chassis Ground Shield',
    functionDescription: 'Impact-resistant bottom housing with rubber vibration-damping bushings, automotive wiring harness strain relief, and lockable security screws.',
    failSafeMode: 'Rugged mechanical interlock bracket prevents physical tampering or cable dislodgement during intense road vibrations.',
    meshIndex: 6,
    yOffset: -2.3,
    color: 0x1e293b,
    accentColor: '#64748B',
    specs: { Mounting: 'Standard Under-Dash DIN Rail', VibrationRating: 'Automotive Grade SAE J1455', CableGrommet: 'M16 Strain Relief' },
  },
];

type CameraPreset = 'isometric' | 'top' | 'side' | 'front';

export const Exploded3DView: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Interaction State
  const [explosionPercent, setExplosionPercent] = useState<number>(65);
  const [selectedCompId, setSelectedCompId] = useState<string>('mq3_sensor');
  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe' | 'xray'>('solid');
  const [isRotating, setIsRotating] = useState(true);
  const [isAutoCycling, setIsAutoCycling] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [activePreset, setActivePreset] = useState<CameraPreset>('isometric');
  const [hoveredCompName, setHoveredCompName] = useState<string | null>(null);

  // 3D Engine Refs
  const animFrameRef = useRef<number | null>(null);
  const explosionPercentRef = useRef<number>(65);
  const selectedCompIdRef = useRef<string>('mq3_sensor');
  const renderModeRef = useRef<'solid' | 'wireframe' | 'xray'>('solid');
  const isRotatingRef = useRef(true);
  const isAutoCyclingRef = useRef(false);

  const isDraggingRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const orbitAngleRef = useRef({ theta: Math.PI / 4, phi: Math.PI / 4.5, radius: 7.2 });
  const targetOrbitAngleRef = useRef({ theta: Math.PI / 4, phi: Math.PI / 4.5, radius: 7.2 });

  useEffect(() => {
    explosionPercentRef.current = explosionPercent;
  }, [explosionPercent]);

  useEffect(() => {
    selectedCompIdRef.current = selectedCompId;
  }, [selectedCompId]);

  useEffect(() => {
    renderModeRef.current = renderMode;
  }, [renderMode]);

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    isAutoCyclingRef.current = isAutoCycling;
  }, [isAutoCycling]);

  const selectedComp =
    HARDWARE_COMPONENTS.find((c) => c.id === selectedCompId) || HARDWARE_COMPONENTS[2];

  // Camera preset handler
  const setCameraPreset = (preset: CameraPreset) => {
    setActivePreset(preset);
    setIsRotating(false);
    switch (preset) {
      case 'isometric':
        targetOrbitAngleRef.current = { theta: Math.PI / 4, phi: Math.PI / 4.5, radius: 7.2 };
        break;
      case 'top':
        targetOrbitAngleRef.current = { theta: 0.01, phi: 0.06, radius: 7.8 };
        break;
      case 'side':
        targetOrbitAngleRef.current = { theta: Math.PI / 2, phi: Math.PI / 2.05, radius: 7.4 };
        break;
      case 'front':
        targetOrbitAngleRef.current = { theta: 0.01, phi: Math.PI / 2.3, radius: 7.0 };
        break;
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.045);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(5.2, 4.5, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. High-Tech Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0c1628, 2.8);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0x38bdf8, 6.5, 30, Math.PI / 3.5, 0.25, 1);
    keySpot.position.set(6, 11, 7);
    keySpot.castShadow = true;
    keySpot.shadow.bias = -0.0005;
    scene.add(keySpot);

    const purpleBacklight = new THREE.PointLight(0x8b5cf6, 4.5, 20);
    purpleBacklight.position.set(-6, -3, -5);
    scene.add(purpleBacklight);

    const emeraldFill = new THREE.PointLight(0x10b981, 2.5, 18);
    emeraldFill.position.set(5, -4, -3);
    scene.add(emeraldFill);

    const bottomGlow = new THREE.DirectionalLight(0x0ea5e9, 1.4);
    bottomGlow.position.set(0, -6, 0);
    scene.add(bottomGlow);

    // 3. Grid Floor & Central Alignment Axis
    const grid = new THREE.GridHelper(14, 28, 0x38bdf8, 0x1e293b);
    grid.position.y = -3.4;
    scene.add(grid);

    // Central Axis Guide Wire (Cyan laser line)
    const axisGeo = new THREE.CylinderGeometry(0.012, 0.012, 8.0, 8);
    const axisMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 });
    const axisLine = new THREE.Mesh(axisGeo, axisMat);
    scene.add(axisLine);

    // 4. Holographic Vertical Bus Guide Rails (4 Corner Lasers: Power, Ground, I2C, Signal)
    const busRailsGroup = new THREE.Group();
    const cornerPositions = [
      { x: -1.05, z: -0.75, color: 0xf59e0b }, // Rail 1: +5V VCC (Amber)
      { x: 1.05, z: -0.75, color: 0x38bdf8 },  // Rail 2: +3.3V Logic (Cyan)
      { x: -1.05, z: 0.75, color: 0x64748b },  // Rail 3: GND Chassis (Slate)
      { x: 1.05, z: 0.75, color: 0xa855f7 },   // Rail 4: I2C / ADC Bus (Purple)
    ];

    cornerPositions.forEach((pos) => {
      const railGeo = new THREE.CylinderGeometry(0.008, 0.008, 7.5, 6);
      const railMat = new THREE.MeshBasicMaterial({
        color: pos.color,
        transparent: true,
        opacity: 0.35,
      });
      const rail = new THREE.Mesh(railGeo, railMat);
      rail.position.set(pos.x, 0, pos.z);
      busRailsGroup.add(rail);

      // Add 2 glowing bus junction dots per rail
      [-1.5, 0.0, 1.5].forEach((yPos) => {
        const dotGeo = new THREE.SphereGeometry(0.035, 8, 8);
        const dotMat = new THREE.MeshBasicMaterial({ color: pos.color, transparent: true, opacity: 0.7 });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(pos.x, yPos, pos.z);
        busRailsGroup.add(dot);
      });
    });
    scene.add(busRailsGroup);

    // Holographic Vertical Scanning Ring
    const holoScanRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.02, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 })
    );
    holoScanRing.rotation.x = Math.PI / 2;
    scene.add(holoScanRing);

    // Luminous Signal Packets traveling along vertical rails
    const packetCount = 16;
    const packetGeo = new THREE.BufferGeometry();
    const packetPositions = new Float32Array(packetCount * 3);
    for (let i = 0; i < packetCount; i++) {
      const railIdx = i % 4;
      packetPositions[i * 3] = cornerPositions[railIdx].x;
      packetPositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      packetPositions[i * 3 + 2] = cornerPositions[railIdx].z;
    }
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
    const packetMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const packetParticles = new THREE.Points(packetGeo, packetMat);
    scene.add(packetParticles);

    // 5. Ambient Floating Cyber Particles
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 12;
      particlePos[i + 1] = (Math.random() - 0.5) * 8;
      particlePos[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // -----------------------------------------------------------------
    // 6. Construct Detailed 3D Hardware Component Meshes with Raycast IDs
    // -----------------------------------------------------------------
    const compGroups: THREE.Group[] = [];
    const interactiveMeshes: THREE.Mesh[] = [];

    const registerInteractiveMesh = (mesh: THREE.Mesh, compId: string) => {
      mesh.userData = { compId };
      interactiveMeshes.push(mesh);
    };

    // --- Mesh 0: Top Enclosure & Air Nozzle ---
    const topCaseGroup = new THREE.Group();
    topCaseGroup.userData = { compId: 'case_top' };
    const caseShell = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.25, 1.8),
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.25,
        metalness: 0.8,
        transparent: true,
        opacity: 0.9,
      })
    );
    const airNozzle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.32, 0.45, 24),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.85, roughness: 0.2 })
    );
    airNozzle.position.set(0, 0.3, 0);
    const cameraBezel = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.06, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 })
    );
    cameraBezel.position.set(0.7, 0.14, 0.3);
    topCaseGroup.add(caseShell, airNozzle, cameraBezel);
    registerInteractiveMesh(caseShell, 'case_top');
    registerInteractiveMesh(airNozzle, 'case_top');
    scene.add(topCaseGroup);
    compGroups.push(topCaseGroup);

    // --- Mesh 1: 0.96" SSD1306 OLED Display Panel ---
    const oledGroup = new THREE.Group();
    oledGroup.userData = { compId: 'oled_display' };
    const oledPcb = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.05, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.4, metalness: 0.6 })
    );
    const oledGlass = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.04, 0.75),
      new THREE.MeshStandardMaterial({ color: 0x001428, roughness: 0.1, metalness: 0.95 })
    );
    oledGlass.position.y = 0.045;
    const oledContent = new THREE.Mesh(
      new THREE.PlaneGeometry(0.95, 0.6),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    oledContent.rotation.x = -Math.PI / 2;
    oledContent.position.y = 0.07;
    const flexCable = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.015, 0.3),
      new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.8 })
    );
    flexCable.position.set(0, 0, 0.7);
    oledGroup.add(oledPcb, oledGlass, oledContent, flexCable);
    registerInteractiveMesh(oledPcb, 'oled_display');
    registerInteractiveMesh(oledGlass, 'oled_display');
    registerInteractiveMesh(oledContent, 'oled_display');
    scene.add(oledGroup);
    compGroups.push(oledGroup);

    // --- Mesh 2: MQ-3 Semiconductor Alcohol Gas Chamber ---
    const mq3Group = new THREE.Group();
    mq3Group.userData = { compId: 'mq3_sensor' };
    const mq3Base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.65, 0.65, 0.18, 32),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, metalness: 0.7 })
    );
    const mq3MeshCage = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 0.5, 32),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.9 })
    );
    mq3MeshCage.position.y = 0.32;
    const mq3Cap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.57, 0.57, 0.06, 32),
      new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.95 })
    );
    mq3Cap.position.y = 0.58;
    for (let p = 0; p < 6; p++) {
      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.22, 8),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 })
      );
      const angle = (p / 6) * Math.PI * 2;
      pin.position.set(Math.cos(angle) * 0.35, -0.18, Math.sin(angle) * 0.35);
      mq3Group.add(pin);
    }
    mq3Group.add(mq3Base, mq3MeshCage, mq3Cap);
    registerInteractiveMesh(mq3Base, 'mq3_sensor');
    registerInteractiveMesh(mq3MeshCage, 'mq3_sensor');
    registerInteractiveMesh(mq3Cap, 'mq3_sensor');
    scene.add(mq3Group);
    compGroups.push(mq3Group);

    // --- Mesh 3: ESP32-WROOM-32 Mainboard PCB ---
    const esp32Group = new THREE.Group();
    esp32Group.userData = { compId: 'esp32_mcu' };
    const mainPcb = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 0.06, 1.7),
      new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.35, metalness: 0.5 })
    );
    const rfShield = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.1, 0.9),
      new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.2, metalness: 0.95 })
    );
    rfShield.position.set(-0.55, 0.08, 0);
    const antTrace = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.015, 0.8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 })
    );
    antTrace.position.set(-1.05, 0.04, 0);
    const usbPort = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.12, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95 })
    );
    usbPort.position.set(-0.95, 0.08, 0.7);
    const amsLdo = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.08, 0.25),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.7 })
    );
    amsLdo.position.set(0.4, 0.07, -0.4);
    const pinRow1 = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 0.18, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x0f172a })
    );
    pinRow1.position.set(0, 0.1, 0.75);
    const pinRow2 = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 0.18, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x0f172a })
    );
    pinRow2.position.set(0, 0.1, -0.75);
    esp32Group.add(mainPcb, rfShield, antTrace, usbPort, amsLdo, pinRow1, pinRow2);
    registerInteractiveMesh(mainPcb, 'esp32_mcu');
    registerInteractiveMesh(rfShield, 'esp32_mcu');
    scene.add(esp32Group);
    compGroups.push(esp32Group);

    // --- Mesh 4: 5V Opto-Isolated Cutoff Relay ---
    const relayGroup = new THREE.Group();
    relayGroup.userData = { compId: 'relay_module' };
    const relayBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.55, 0.65),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.25, metalness: 0.7 })
    );
    relayBox.position.y = 0.28;
    const termBlock = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.35, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.4 })
    );
    termBlock.position.set(0, 0.18, 0.6);
    const optoIc = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.08, 0.18),
      new THREE.MeshStandardMaterial({ color: 0x0f172a })
    );
    optoIc.position.set(-0.35, 0.06, -0.2);
    const diode = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.2, 8),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 })
    );
    diode.rotation.z = Math.PI / 2;
    diode.position.set(0.25, 0.06, -0.2);
    relayGroup.add(relayBox, termBlock, optoIc, diode);
    registerInteractiveMesh(relayBox, 'relay_module');
    registerInteractiveMesh(termBlock, 'relay_module');
    scene.add(relayGroup);
    compGroups.push(relayGroup);

    // --- Mesh 5: LM2596 Automotive DC-DC Buck Converter ---
    const buckGroup = new THREE.Group();
    buckGroup.userData = { compId: 'power_buck' };
    const buckPcb = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.05, 1.1),
      new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.4 })
    );
    const inductor = new THREE.Mesh(
      new THREE.TorusGeometry(0.24, 0.1, 16, 24),
      new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.9, roughness: 0.3 })
    );
    inductor.rotation.x = Math.PI / 2;
    inductor.position.set(-0.35, 0.15, 0);
    const cap1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.35, 16),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 })
    );
    cap1.position.set(0.35, 0.18, -0.25);
    const cap2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.35, 16),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 })
    );
    cap2.position.set(0.35, 0.18, 0.25);
    buckGroup.add(buckPcb, inductor, cap1, cap2);
    registerInteractiveMesh(buckPcb, 'power_buck');
    scene.add(buckGroup);
    compGroups.push(buckGroup);

    // --- Mesh 6: Bottom Casing & DIN Rail Mount ---
    const bottomCaseGroup = new THREE.Group();
    bottomCaseGroup.userData = { compId: 'case_bottom' };
    const botShell = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.3, 1.9),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.85 })
    );
    const dinClip1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.1, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 })
    );
    dinClip1.position.set(-1.15, -0.15, 0);
    const dinClip2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.1, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 })
    );
    dinClip2.position.set(1.15, -0.15, 0);
    bottomCaseGroup.add(botShell, dinClip1, dinClip2);
    registerInteractiveMesh(botShell, 'case_bottom');
    scene.add(bottomCaseGroup);
    compGroups.push(bottomCaseGroup);

    // -------------------------------------------------------------
    // Raycasting & Mouse Interaction Setup
    // -------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const getRaycastHitCompId = (clientX: number, clientY: number): string | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseCoord.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, true);
      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && !obj.userData?.compId) {
          obj = obj.parent;
        }
        return obj?.userData?.compId || null;
      }
      return null;
    };

    // -------------------------------------------------------------
    // Mouse / Touch Dragging & Direct 3D Raycast Selection Controls
    // -------------------------------------------------------------
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      pointerStartRef.current = { x: e.clientX, y: e.clientY };
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const hitId = getRaycastHitCompId(e.clientX, e.clientY);
      if (hitId) {
        renderer.domElement.style.cursor = 'pointer';
        const hitComp = HARDWARE_COMPONENTS.find((c) => c.id === hitId);
        if (hitComp) setHoveredCompName(hitComp.name);
      } else {
        renderer.domElement.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
        setHoveredCompName(null);
      }

      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      targetOrbitAngleRef.current.theta -= dx * 0.008;
      targetOrbitAngleRef.current.phi = Math.max(
        0.05,
        Math.min(Math.PI / 2 - 0.05, targetOrbitAngleRef.current.phi + dy * 0.008)
      );
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const dist = Math.hypot(
          e.clientX - pointerStartRef.current.x,
          e.clientY - pointerStartRef.current.y
        );
        // If mouse moved less than 5px, treat as a single click
        if (dist < 6) {
          const hitId = getRaycastHitCompId(e.clientX, e.clientY);
          if (hitId) {
            setSelectedCompId(hitId);
          }
        }
      }
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        pointerStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouseRef.current.x;
      const dy = e.touches[0].clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      targetOrbitAngleRef.current.theta -= dx * 0.008;
      targetOrbitAngleRef.current.phi = Math.max(
        0.05,
        Math.min(Math.PI / 2 - 0.05, targetOrbitAngleRef.current.phi + dy * 0.008)
      );
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isDraggingRef.current && e.changedTouches.length === 1) {
        const dist = Math.hypot(
          e.changedTouches[0].clientX - pointerStartRef.current.x,
          e.changedTouches[0].clientY - pointerStartRef.current.y
        );
        if (dist < 8) {
          const hitId = getRaycastHitCompId(
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY
          );
          if (hitId) {
            setSelectedCompId(hitId);
          }
        }
      }
      isDraggingRef.current = false;
    };

    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // -------------------------------------------------------------
    // Animation Loop
    // -------------------------------------------------------------
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Auto-Animate Teardown Cycle (Sinusoidal breathing 0% <-> 100%)
      if (isAutoCyclingRef.current) {
        const cycleSpeed = 0.8;
        // Smooth sine wave mapped to 0 -> 100
        const calculatedPercent = Math.round(((Math.sin(time * cycleSpeed) + 1) / 2) * 100);
        explosionPercentRef.current = calculatedPercent;
        setExplosionPercent(calculatedPercent);
      }

      // Smooth Auto-Orbit when not dragging
      if (isRotatingRef.current && !isDraggingRef.current) {
        targetOrbitAngleRef.current.theta += 0.32 * delta;
      }

      // Lerp orbit angles towards target (gives smooth camera preset snapping)
      orbitAngleRef.current.theta = THREE.MathUtils.lerp(
        orbitAngleRef.current.theta,
        targetOrbitAngleRef.current.theta,
        0.1
      );
      orbitAngleRef.current.phi = THREE.MathUtils.lerp(
        orbitAngleRef.current.phi,
        targetOrbitAngleRef.current.phi,
        0.1
      );
      orbitAngleRef.current.radius = THREE.MathUtils.lerp(
        orbitAngleRef.current.radius,
        targetOrbitAngleRef.current.radius,
        0.1
      );

      // Explosion Interpolation:
      // When explosion = 0%: All layers stacked tightly at y = 0
      // When explosion = 100%: Each layer moves to its full yOffset
      const factor = explosionPercentRef.current / 100;

      HARDWARE_COMPONENTS.forEach((comp) => {
        const group = compGroups[comp.meshIndex];
        if (!group) return;

        // Target Y
        const targetY = comp.yOffset * factor;
        group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, 0.12);

        // Highlight selected component with gentle breath pulsation
        const isSelected = comp.id === selectedCompIdRef.current;
        if (isSelected) {
          const pulse = 1 + Math.sin(time * 5) * 0.035;
          group.scale.set(pulse, pulse, pulse);
        } else {
          group.scale.set(1, 1, 1);
        }

        // Apply Render Mode Material adjustments
        const rMode = renderModeRef.current;
        group.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (rMode === 'wireframe') {
              child.material.wireframe = true;
            } else if (rMode === 'xray') {
              child.material.wireframe = false;
              child.material.transparent = true;
              child.material.opacity = isSelected ? 0.95 : 0.35;
            } else {
              child.material.wireframe = false;
              child.material.transparent = isSelected ? false : comp.id === 'case_top';
              child.material.opacity = comp.id === 'case_top' ? 0.85 : 1.0;
            }
          }
        });
      });

      // Update bus rails opacity based on explosion factor
      busRailsGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.opacity = 0.15 + factor * 0.55;
        }
      });

      // Slowly rotate particle dust
      particles.rotation.y = time * 0.05;

      // Holographic scan ring animation
      holoScanRing.position.y = Math.sin(time * 1.6) * (2.2 * Math.max(0.4, factor));
      holoScanRing.rotation.z = time * 0.4;
      (holoScanRing.material as THREE.MeshBasicMaterial).opacity = 0.35 + Math.sin(time * 4) * 0.2;

      // Vertical signal packets animation along rails
      const pArr = packetGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < packetCount; i++) {
        pArr[i * 3 + 1] += 0.04;
        if (pArr[i * 3 + 1] > 3.2) {
          pArr[i * 3 + 1] = -3.2;
        }
      }
      packetGeo.attributes.position.needsUpdate = true;

      // Camera Orbit Position
      const { theta, phi, radius } = orbitAngleRef.current;
      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section id="exploded-view" className="py-24 relative z-10 bg-[#070A12] border-t border-[#253247]/60">
      {/* Ambient Radial Highlights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#38BDF8]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#EF4444]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111B2B] border border-[#38BDF8]/30 text-xs font-mono text-[#38BDF8]">
            <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>INTERACTIVE HARDWARE TEARDOWN</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Exploded 3D Project View
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            Full 3D physical teardown of Shubham&apos;s flagship <strong>ESP32 Alcohol Detection &amp; Vehicle Ignition Cutoff System</strong>. Drag the slider to assemble the automotive enclosure or expand individual electronics layers in 3D. Direct-click any component in the 3D viewport to inspect its pinout and failsafe logic.
          </p>
        </div>

        {/* Global Control Bar: Explosion Slider, Presets, Auto-Cycle, Render Mode */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1420] border-2 border-[#253247] flex flex-col lg:flex-row items-center justify-between gap-5 shadow-xl">
          
          {/* Explosion Slider with Live Indicator */}
          <div className="flex-1 w-full space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-white font-bold flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#38BDF8]" />
                Teardown Explosion Factor:
                <span className="text-[#38BDF8] font-mono font-bold bg-[#111B2B] px-2 py-0.5 rounded border border-cyan-500/30">
                  {explosionPercent}%
                </span>
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                {explosionPercent === 0
                  ? 'Fully Assembled Console (0mm gap)'
                  : explosionPercent === 100
                  ? 'Full Exploded Teardown (±23mm spacing)'
                  : 'Layered Spatial Separation'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-slate-400">Assembled (0%)</span>
              <input
                type="range"
                min="0"
                max="100"
                value={explosionPercent}
                onChange={(e) => {
                  setIsAutoCycling(false);
                  setExplosionPercent(Number(e.target.value));
                }}
                className="flex-1 h-2 bg-[#162338] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
              />
              <span className="text-[10px] font-mono text-[#38BDF8]">Exploded (100%)</span>
            </div>
          </div>

          {/* Controls: Auto-Cycle, Camera Presets, Render Mode & Orbit */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Auto Teardown Breathing Cycle Play/Pause */}
            <button
              onClick={() => {
                const nextState = !isAutoCycling;
                setIsAutoCycling(nextState);
                if (nextState) setIsRotating(true);
              }}
              className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                isAutoCycling
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400 animate-pulse'
                  : 'bg-[#111B2B] text-slate-300 border-[#253247] hover:border-slate-500'
              }`}
            >
              {isAutoCycling ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Teardown</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Auto-Animate Cycle</span>
                </>
              )}
            </button>

            {/* Camera Perspective Angle Presets */}
            <div className="flex items-center rounded-xl bg-[#111B2B] border border-[#253247] p-0.5 text-xs font-mono">
              <button
                onClick={() => setCameraPreset('isometric')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activePreset === 'isometric'
                    ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Isometric 45° CAD Angle"
              >
                📐 Iso
              </button>
              <button
                onClick={() => setCameraPreset('top')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activePreset === 'top'
                    ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Top-Down Z-Stack Blueprint"
              >
                ⬆️ Top
              </button>
              <button
                onClick={() => setCameraPreset('side')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activePreset === 'side'
                    ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Side Profile Elevation"
              >
                ➡️ Side
              </button>
              <button
                onClick={() => setCameraPreset('front')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activePreset === 'front'
                    ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Front Perspective"
              >
                👁️ Front
              </button>
            </div>

            {/* Render Mode Switcher */}
            <div className="flex items-center rounded-xl bg-[#111B2B] border border-[#253247] p-0.5 text-xs font-mono">
              {(['solid', 'wireframe', 'xray'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setRenderMode(m)}
                  className={`px-2 py-1 rounded-lg transition-all capitalize ${
                    renderMode === m
                      ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {m === 'solid' ? '💎 Solid' : m === 'wireframe' ? '📐 Wire' : '🔬 X-Ray'}
                </button>
              ))}
            </div>

            {/* Auto Orbit Toggle */}
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`px-2.5 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all ${
                isRotating
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  : 'bg-[#111B2B] text-slate-400 border-[#253247] hover:text-white'
              }`}
              title="Continuous 360° Turntable Rotation"
            >
              {isRotating ? '🔄 Orbit ON' : '⏸ Orbit OFF'}
            </button>
          </div>
        </div>

        {/* Plain-English Explainer Guide for Recruiters & Visitors */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0B1528] border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-3 shadow-lg">
          <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-white block font-mono text-[11px] uppercase tracking-wider text-cyan-400">
              Interactive Hardware Teardown Guide:
            </span>
            <p className="leading-relaxed">
              Yeh 3D CAD model Shubham ke <strong>Alcohol Detection &amp; Ignition Cutoff Hardware</strong> ka real physical architecture dikhata hai. Viewport ke andar kisi bhi component par <strong>direct click</strong> karein ya neeche di gayi strip se select karein. Corner glowing laser lines power (+5V, 3.3V, GND) aur I2C bus harness ko represent karti hain.
            </p>
          </div>
        </div>

        {/* Main Stage Grid: 3D Viewport (8 Cols) + Engineering Datasheet Panel (4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Real 3D Three.js Teardown Viewport (8 cols) */}
          <div className="lg:col-span-8 relative rounded-3xl bg-[#050811] border-2 border-[#253247] p-2 shadow-2xl overflow-hidden min-h-[520px] flex items-center justify-center select-none group">
            
            {/* Canvas Container */}
            <div ref={mountRef} className="w-full h-[520px] sm:h-[580px] cursor-grab active:cursor-grabbing">
              {!hasWebGL && (
                <div className="flex items-center justify-center h-full text-center p-6 text-slate-400 font-mono text-xs">
                  WebGL 3D acceleration is required to render the interactive hardware teardown.
                </div>
              )}
            </div>

            {/* Top HUD Status Banner */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-mono pointer-events-none">
              <div className="bg-[#0C1220]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#253247] text-white flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse" />
                <span className="text-[#38BDF8] font-bold">CAD TEARDOWN:</span>
                <span className="text-slate-200">7 Galvanic Layers</span>
              </div>

              <div className="bg-[#0C1220]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Opto-Isolated Failsafe Ready</span>
              </div>
            </div>

            {/* Interactive Raycast Hint & Hover Badge */}
            <div className="absolute top-16 left-4 z-20 pointer-events-none flex flex-col gap-1">
              <div className="text-[10px] font-mono text-slate-300 bg-black/60 px-3 py-1.5 rounded-xl backdrop-blur border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                <span>🖱️ Click directly on any 3D layer to inspect • Drag to orbit</span>
              </div>

              {hoveredCompName && (
                <div className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/40 backdrop-blur self-start animate-fade-in">
                  🎯 Hover: {hoveredCompName}
                </div>
              )}
            </div>

            {/* Corner Bus Legend Indicator */}
            <div className="absolute top-16 right-4 z-20 pointer-events-none hidden sm:flex flex-col gap-1 text-[9px] font-mono text-slate-400 bg-black/60 p-2 rounded-xl backdrop-blur border border-white/10">
              <span className="text-slate-300 font-bold mb-0.5">BUS RAILS:</span>
              <span className="text-amber-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> +5V VCC Power
              </span>
              <span className="text-cyan-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> +3.3V Logic Rail
              </span>
              <span className="text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Chassis GND
              </span>
              <span className="text-purple-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> I2C / ADC Bus
              </span>
            </div>

            {/* Bottom Quick Layer Selection Strip */}
            <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] font-mono scrollbar-thin">
              {HARDWARE_COMPONENTS.map((c) => {
                const isSel = c.id === selectedCompId;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCompId(c.id)}
                    className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all border cursor-pointer ${
                      isSel
                        ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow-lg scale-105 border-cyan-300 ring-2 ring-cyan-400/40'
                        : 'bg-[#0D1420]/90 text-slate-400 hover:text-white border-[#253247]'
                    }`}
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
                      style={{ backgroundColor: c.accentColor }}
                    />
                    {c.subsystem}: {c.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Component Engineering Datasheet Card (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#0D1420] border-2 border-[#253247] p-5 sm:p-6 shadow-2xl space-y-4">
            
            {/* Header: Subsystem + Voltage */}
            <div className="flex items-center justify-between gap-2 border-b border-[#253247] pb-3">
              <span
                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                style={{
                  backgroundColor: `${selectedComp.accentColor}20`,
                  color: selectedComp.accentColor,
                  border: `1px solid ${selectedComp.accentColor}40`,
                }}
              >
                {selectedComp.subsystem} Subsystem
              </span>

              <span className="text-[10px] font-mono text-slate-300 bg-[#111B2B] px-2 py-0.5 rounded border border-[#253247]">
                {selectedComp.voltage}
              </span>
            </div>

            {/* Component Name */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] font-sans">
                {selectedComp.name}
              </h3>
            </div>

            {/* Hardware Pinout & Wiring */}
            <div className="p-3.5 rounded-2xl bg-[#111B2B] border border-[#253247] space-y-1">
              <span className="text-[10px] font-mono text-[#38BDF8] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
                Signal Routing &amp; Electrical Pinout
              </span>
              <p className="text-xs font-mono text-[#F8FAFC] leading-relaxed">
                {selectedComp.pinout}
              </p>
            </div>

            {/* Technical Specifications Matrix */}
            <div className="p-3 rounded-2xl bg-[#090D16] border border-[#253247] space-y-1.5 text-xs font-mono">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                BENCH-VERIFIED HARDWARE SPECS:
              </span>
              {Object.entries(selectedComp.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between text-[11px] py-0.5 border-b border-white/5 last:border-0">
                  <span className="text-slate-400">{k}:</span>
                  <span className="text-emerald-400 font-bold">{v}</span>
                </div>
              ))}
            </div>

            {/* Functional Description */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Operational Role in Safety Interlock
              </span>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {selectedComp.functionDescription}
              </p>
            </div>

            {/* Fail-Safe Protection */}
            <div className="p-3 rounded-2xl bg-[#162338]/60 border border-emerald-500/30 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Automotive Failsafe &amp; Anti-Tamper
              </span>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {selectedComp.failSafeMode}
              </p>
            </div>

            {/* Direct Jump to Full Case Study */}
            <div className="pt-2">
              <a
                href="#projects"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#38BDF8] to-cyan-400 hover:from-cyan-400 hover:to-sky-300 text-[#070A12] font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-md shadow-[#38BDF8]/20"
              >
                <span>View Full Project Case Study</span>
                <CheckCircle2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
