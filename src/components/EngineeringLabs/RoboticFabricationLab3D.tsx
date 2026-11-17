import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Play,
  Pause,
  CheckCircle2,
  Sparkles,
  Bot,
  Activity,
  Cpu,
  Video,
  Sliders,
  RotateCcw,
} from 'lucide-react';

interface BuildStep {
  id: number;
  name: string;
  desc: string;
  partName: string;
  partColor: string;
}

const BUILD_STEPS: BuildStep[] = [
  {
    id: 1,
    name: 'Stage 1: Titanium Sub-Chassis',
    desc: 'Picking lightweight aerospace-grade CNC titanium baseplate and clamping to fixture.',
    partName: 'Aerospace Baseplate',
    partColor: '#38BDF8',
  },
  {
    id: 2,
    name: 'Stage 2: Neural SoC Microprocessor',
    desc: 'Micro-precision pick-and-place of 16-Core AI compute unit onto zero-insertion socket.',
    partName: 'Neural SoC Wafer',
    partColor: '#F59E0B',
  },
  {
    id: 3,
    name: 'Stage 3: Solid-State Power Cell',
    desc: 'Inserting high-density 48V solid-state battery module with laser sintering weld.',
    partName: 'Quantum Power Cell',
    partColor: '#10B981',
  },
  {
    id: 4,
    name: 'Stage 4: Optical LiDAR Dome Casing',
    desc: 'Aligning hermetic glass-carbon protective shield with integrated optical SLAM sensors.',
    partName: 'Optical LiDAR Shield',
    partColor: '#8B5CF6',
  },
];

export const RoboticFabricationLab3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Simulation & State
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStepIdx, setCurrentStepIdx] = useState(0); // 0 to 4 (4 = complete)
  const [isAssembled, setIsAssembled] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [telemetryState, setTelemetryState] = useState('Positioning End-Effector');
  const [jointAngles, setJointAngles] = useState({ j1: 0, j2: 35, j3: -45, j4: 20 });
  const [gripperPwm, setGripperPwm] = useState(1500);
  const [cameraMode, setCameraMode] = useState<'ORBIT' | 'TOOLHEAD' | 'TOP_DOWN'>('ORBIT');
  const [controlMode, setControlMode] = useState<'AUTO' | 'MANUAL'>('AUTO');
  const [manualJoints, setManualJoints] = useState({ j1: 0, j2: 35, j3: -45, j4: 20, gripper: 0.08 });

  // Refs for 3D Engine
  const animFrameRef = useRef<number | null>(null);
  const isPlayingRef = useRef(true);
  const cameraModeRef = useRef<'ORBIT' | 'TOOLHEAD' | 'TOP_DOWN'>('ORBIT');
  const controlModeRef = useRef<'AUTO' | 'MANUAL'>('AUTO');
  const manualJointsRef = useRef({ j1: 0, j2: 35, j3: -45, j4: 20, gripper: 0.08 });
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const orbitAngleRef = useRef({ theta: Math.PI / 3.8, phi: Math.PI / 4.2, radius: 3.8 });

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    cameraModeRef.current = cameraMode;
  }, [cameraMode]);

  useEffect(() => {
    controlModeRef.current = controlMode;
  }, [controlMode]);

  useEffect(() => {
    manualJointsRef.current = manualJoints;
  }, [manualJoints]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // WebGL Check
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

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.012);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(3.2, 2.8, 3.8);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. High-Tech Factory Lighting
    const ambientLight = new THREE.AmbientLight(0x1e293b, 3.2);
    scene.add(ambientLight);

    const mainKey = new THREE.SpotLight(0xffffff, 6.0, 30, Math.PI / 3.2, 0.25, 1);
    mainKey.position.set(5, 10, 6);
    mainKey.castShadow = true;
    mainKey.shadow.bias = -0.0005;
    scene.add(mainKey);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 3.8);
    cyanRim.position.set(-6, 6, -4);
    scene.add(cyanRim);

    const violetFill = new THREE.PointLight(0x8b5cf6, 3.5, 15);
    violetFill.position.set(-5, 4, -3);
    scene.add(violetFill);

    const laserBeamLight = new THREE.PointLight(0x38bdf8, 0, 4);
    laserBeamLight.position.set(0, 0, 0);
    scene.add(laserBeamLight);

    // 3. Grid Floor & Pedestals
    const grid = new THREE.GridHelper(14, 28, 0x38bdf8, 0x1e293b);
    grid.position.y = 0;
    scene.add(grid);

    // Central Robot Base Pedestal
    const robotPedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.0, 1.2, 0.35, 32),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.8 })
    );
    robotPedestal.position.y = 0.175;
    robotPedestal.receiveShadow = true;
    scene.add(robotPedestal);

    // Pedestal Neon Ring
    const neonRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.02, 0.02, 16, 48),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    neonRing.rotation.x = Math.PI / 2;
    neonRing.position.y = 0.35;
    scene.add(neonRing);

    // Workstation Assembly Fixture (Left Side: -1.6, 0, 0.7)
    const assemblyPos = new THREE.Vector3(-1.6, 0.25, 0.7);
    const workstation = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.95, 0.5, 32),
      new THREE.MeshStandardMaterial({ color: 0x111b2b, roughness: 0.5, metalness: 0.7 })
    );
    workstation.position.copy(assemblyPos);
    workstation.receiveShadow = true;
    scene.add(workstation);

    // Workstation Target Alignment Reticle Ring
    const workRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.7, 0.02, 16, 48),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    workRing.rotation.x = Math.PI / 2;
    workRing.position.set(assemblyPos.x, assemblyPos.y + 0.26, assemblyPos.z);
    scene.add(workRing);

    // Parts Bin Feed Tray (Right Side: 1.6, 0, 0.7)
    const partsFeedPos = new THREE.Vector3(1.6, 0.25, 0.7);
    const feedTray = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.5, 1.1),
      new THREE.MeshStandardMaterial({ color: 0x111b2b, roughness: 0.5, metalness: 0.7 })
    );
    feedTray.position.copy(partsFeedPos);
    feedTray.receiveShadow = true;
    scene.add(feedTray);

    // -------------------------------------------------------------
    // 4. Build Articulated 6-Axis Industrial Robotic Arm
    // -------------------------------------------------------------
    const armRoot = new THREE.Group();
    scene.add(armRoot);

    const industrialWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9, // Crisp clean titanium white robot body
      roughness: 0.25,
      metalness: 0.35,
    });
    const jointAccentMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Vibrant cyber cyan servo casing
      roughness: 0.2,
      metalness: 0.75,
    });
    const linkAccentMat = new THREE.MeshStandardMaterial({
      color: 0x334155, // Matte graphite structural linkages
      roughness: 0.35,
      metalness: 0.8,
    });
    const jointGlowRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    // Joint 1: Base Turntable
    const baseGroup = new THREE.Group();
    baseGroup.position.y = 0.35;
    armRoot.add(baseGroup);

    const baseTurret = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.8, 0.4, 24), industrialWhiteMat);
    baseTurret.position.y = 0.2;
    baseTurret.castShadow = true;
    const baseGlowRing = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.015, 12, 32), jointGlowRingMat);
    baseGlowRing.rotation.x = Math.PI / 2;
    baseGlowRing.position.y = 0.38;
    baseGroup.add(baseTurret, baseGlowRing);

    // Joint 2: Shoulder Pitch
    const shoulderGroup = new THREE.Group();
    shoulderGroup.position.set(0, 0.4, 0);
    baseGroup.add(shoulderGroup);

    const shoulderJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.55, 20), jointAccentMat);
    shoulderJoint.rotation.z = Math.PI / 2;
    shoulderJoint.castShadow = true;
    shoulderGroup.add(shoulderJoint);

    const link1 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.4, 0.28), industrialWhiteMat);
    link1.position.set(0, 0.7, 0);
    link1.castShadow = true;
    const link1Stripe = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.2, 0.29), jointGlowRingMat);
    link1Stripe.position.set(0, 0.7, 0);
    shoulderGroup.add(link1, link1Stripe);

    // Joint 3: Elbow Pitch
    const elbowGroup = new THREE.Group();
    elbowGroup.position.set(0, 1.4, 0);
    shoulderGroup.add(elbowGroup);

    const elbowJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.48, 20), jointAccentMat);
    elbowJoint.rotation.z = Math.PI / 2;
    elbowJoint.castShadow = true;
    elbowGroup.add(elbowJoint);

    const link2 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.25, 0.22), industrialWhiteMat);
    link2.position.set(0, 0.625, 0);
    link2.castShadow = true;
    elbowGroup.add(link2);

    // Joint 4 & 5: Wrist Pitch & Roll
    const wristGroup = new THREE.Group();
    wristGroup.position.set(0, 1.25, 0);
    elbowGroup.add(wristGroup);

    const wristJoint = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), jointAccentMat);
    wristJoint.castShadow = true;
    wristGroup.add(wristJoint);

    // Gripper Tool Assembly with Pneumatic Fingers & Laser Head
    const gripperBase = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.12, 0.28), linkAccentMat);
    gripperBase.position.y = 0.12;
    wristGroup.add(gripperBase);

    // Laser Sintering Optical Head in Center
    const laserTip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.03, 0.1, 12),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    laserTip.position.y = 0.2;
    wristGroup.add(laserTip);

    // Gripper Fingers
    const fingerLeft = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.26, 0.08), jointAccentMat);
    fingerLeft.position.set(-0.09, 0.24, 0);
    wristGroup.add(fingerLeft);

    const fingerRight = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.26, 0.08), jointAccentMat);
    fingerRight.position.set(0.09, 0.24, 0);
    wristGroup.add(fingerRight);

    // Luminous Volumetric Laser Sintering Beam Mesh
    const laserBeamGeo = new THREE.CylinderGeometry(0.012, 0.035, 0.55, 16);
    const laserBeamMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const laserBeam = new THREE.Mesh(laserBeamGeo, laserBeamMat);
    laserBeam.position.y = 0.45;
    wristGroup.add(laserBeam);

    // Glowing Incandescent Melt Pool on fixture
    const meltPoolGeo = new THREE.CircleGeometry(0.18, 24);
    const meltPoolMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const meltPool = new THREE.Mesh(meltPoolGeo, meltPoolMat);
    meltPool.rotation.x = -Math.PI / 2;
    meltPool.position.set(assemblyPos.x, assemblyPos.y + 0.32, assemblyPos.z);
    scene.add(meltPool);

    // -------------------------------------------------------------
    // 5. The 4 Product Components Being Assembled
    // -------------------------------------------------------------
    // Part 1: Titanium Sub-Chassis Baseplate (Round octagonal slab)
    const part1Geo = new THREE.CylinderGeometry(0.48, 0.52, 0.08, 8);
    const part1Mat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.25,
      metalness: 0.9,
    });
    const part1 = new THREE.Mesh(part1Geo, part1Mat);
    part1.castShadow = true;
    scene.add(part1);

    // Part 2: Neural SoC Microprocessor (Golden core chip)
    const part2Geo = new THREE.BoxGeometry(0.36, 0.05, 0.36);
    const part2Mat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.2,
      metalness: 0.85,
    });
    const part2 = new THREE.Mesh(part2Geo, part2Mat);
    part2.castShadow = true;
    scene.add(part2);

    // Part 3: Dual Solid-State Energy Cells (Green cylinders)
    const part3Group = new THREE.Group();
    const cellMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0x064e3b,
    });
    const cell1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.28, 16), cellMat);
    cell1.position.set(-0.12, 0, 0);
    const cell2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.28, 16), cellMat);
    cell2.position.set(0.12, 0, 0);
    part3Group.add(cell1, cell2);
    scene.add(part3Group);

    // Part 4: Cyan Optical LiDAR Dome Protective Shield
    const part4Geo = new THREE.SphereGeometry(0.32, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const part4Mat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.82,
    });
    const part4 = new THREE.Mesh(part4Geo, part4Mat);
    part4.castShadow = true;
    scene.add(part4);

    // Quality Inspection Laser Sweep Ring
    const inspectRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.55, 0.015, 16, 48),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.8 })
    );
    inspectRing.rotation.x = Math.PI / 2;
    inspectRing.position.set(assemblyPos.x, assemblyPos.y + 0.3, assemblyPos.z);
    inspectRing.visible = false;
    scene.add(inspectRing);

    // Welding Sparks Particles System (60 energetic cascading particles)
    const sparkCount = 60;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    const sparkVel = new Float32Array(sparkCount * 3);

    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3] = assemblyPos.x;
      sparkPos[i * 3 + 1] = assemblyPos.y + 0.4;
      sparkPos[i * 3 + 2] = assemblyPos.z;

      sparkVel[i * 3] = (Math.random() - 0.5) * 0.08;
      sparkVel[i * 3 + 1] = 0.03 + Math.random() * 0.06;
      sparkVel[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0,
    });
    const sparkParticles = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkParticles);

    // -------------------------------------------------------------
    // Mouse / Touch Dragging to Orbit Camera in 3D
    // -------------------------------------------------------------
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      orbitAngleRef.current.theta -= dx * 0.008;
      orbitAngleRef.current.phi = Math.max(
        0.15,
        Math.min(Math.PI / 2 - 0.05, orbitAngleRef.current.phi + dy * 0.008)
      );
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouseRef.current.x;
      const dy = e.touches[0].clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      orbitAngleRef.current.theta -= dx * 0.008;
      orbitAngleRef.current.phi = Math.max(
        0.15,
        Math.min(Math.PI / 2 - 0.05, orbitAngleRef.current.phi + dy * 0.008)
      );
    };
    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Mouse wheel zoom
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitAngleRef.current.radius = Math.max(1.8, Math.min(6.5, orbitAngleRef.current.radius + e.deltaY * 0.003));
    };
    domElement.addEventListener('wheel', handleWheel, { passive: false });

    // -------------------------------------------------------------
    // Fabrication Timeline & Inverse Kinematics Loop
    // -------------------------------------------------------------
    // Total sequence: 4 steps * 6 seconds each = 24s + 6s inspection showcase = 30s loop
    let simTime = 0;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (isPlayingRef.current) {
        simTime += 0.016;
      }

      const cycleTime = simTime % 26; // 26 seconds total cycle

      // Which stage of assembly are we on?
      // Step 1: 0 to 5s
      // Step 2: 5 to 10s
      // Step 3: 10 to 15s
      // Step 4: 15 to 20s
      // Showcase & Inspection: 20s to 26s
      let stage = 0;
      let stageSubT = 0;

      if (cycleTime < 5) {
        stage = 1;
        stageSubT = cycleTime / 5;
      } else if (cycleTime < 10) {
        stage = 2;
        stageSubT = (cycleTime - 5) / 5;
      } else if (cycleTime < 15) {
        stage = 3;
        stageSubT = (cycleTime - 10) / 5;
      } else if (cycleTime < 20) {
        stage = 4;
        stageSubT = (cycleTime - 15) / 5;
      } else {
        stage = 5; // Complete / Inspection Showcase
        stageSubT = (cycleTime - 20) / 6;
      }

      // Update state for React UI throttled
      if (Math.floor(simTime * 60) % 6 === 0) {
        setCurrentStepIdx(Math.min(4, stage - 1));
        setIsAssembled(stage === 5);
      }

      let baseRot = 0;
      let shoulderRot = 0.2;
      let elbowRot = -0.4;
      let wristRot = 0.2;
      let fingerGrip = 0.09;
      let isSparksActive = false;

      // Base tray positions for uninstalled parts
      const trayPos1 = new THREE.Vector3(1.2, 0.55, 0.6);
      const trayPos2 = new THREE.Vector3(1.5, 0.55, 0.9);
      const trayPos3 = new THREE.Vector3(1.7, 0.62, 0.5);
      const trayPos4 = new THREE.Vector3(1.9, 0.65, 0.85);

      // Assembled stacking positions on fixture
      const assembledPos1 = new THREE.Vector3(assemblyPos.x, assemblyPos.y + 0.29, assemblyPos.z);
      const assembledPos2 = new THREE.Vector3(assemblyPos.x, assemblyPos.y + 0.36, assemblyPos.z);
      const assembledPos3 = new THREE.Vector3(assemblyPos.x, assemblyPos.y + 0.44, assemblyPos.z);
      const assembledPos4 = new THREE.Vector3(assemblyPos.x, assemblyPos.y + 0.50, assemblyPos.z);

      const gripperWorldPos = new THREE.Vector3();
      wristGroup.getWorldPosition(gripperWorldPos);

      // Execution of stages 1 to 4:
      // Sub-timeline inside each stage:
      // 0.0 - 0.25: Move to parts tray and reach down
      // 0.25 - 0.45: Clamp gripper and lift part
      // 0.45 - 0.75: Rotate arm across to workstation fixture
      // 0.75 - 0.95: Laser weld / seat part firmly (sparks activate!)
      // 0.95 - 1.00: Release and retract
      if (controlModeRef.current === 'MANUAL') {
        baseRot = (manualJointsRef.current.j1 * Math.PI) / 180;
        shoulderRot = (manualJointsRef.current.j2 * Math.PI) / 180;
        elbowRot = (manualJointsRef.current.j3 * Math.PI) / 180;
        wristRot = (manualJointsRef.current.j4 * Math.PI) / 180;
        fingerGrip = manualJointsRef.current.gripper;
        isSparksActive = false;
        inspectRing.visible = false;
        laserBeamMat.opacity = 0;
        meltPoolMat.opacity = 0;
        setTelemetryState('Manual 6-Axis Teaching Pendant Active');
      } else if (stage >= 1 && stage <= 4) {
        inspectRing.visible = false;
        sparkMat.opacity = 0;

        let activeTrayPos = trayPos1;
        let activeTargetPos = assembledPos1;
        let activeMesh: THREE.Object3D = part1;

        if (stage === 1) {
          activeTrayPos = trayPos1;
          activeTargetPos = assembledPos1;
          activeMesh = part1;
        } else if (stage === 2) {
          activeTrayPos = trayPos2;
          activeTargetPos = assembledPos2;
          activeMesh = part2;
        } else if (stage === 3) {
          activeTrayPos = trayPos3;
          activeTargetPos = assembledPos3;
          activeMesh = part3Group;
        } else {
          activeTrayPos = trayPos4;
          activeTargetPos = assembledPos4;
          activeMesh = part4;
        }

        if (stageSubT < 0.25) {
          // Approach Tray
          const p = stageSubT / 0.25;
          baseRot = THREE.MathUtils.lerp(0, 0.62, p);
          shoulderRot = THREE.MathUtils.lerp(0.2, 0.82, p);
          elbowRot = THREE.MathUtils.lerp(-0.4, -1.25, p);
          wristRot = THREE.MathUtils.lerp(0.2, 0.42, p);
          fingerGrip = 0.12;
          activeMesh.position.copy(activeTrayPos);
          setTelemetryState(`Approaching Part ${stage}: ${BUILD_STEPS[stage - 1].partName}`);
        } else if (stageSubT < 0.45) {
          // Grasp & Lift
          const p = (stageSubT - 0.25) / 0.2;
          baseRot = THREE.MathUtils.lerp(0.62, 0.2, p);
          shoulderRot = THREE.MathUtils.lerp(0.82, 0.35, p);
          elbowRot = THREE.MathUtils.lerp(-1.25, -0.65, p);
          wristRot = THREE.MathUtils.lerp(0.42, 0.3, p);
          fingerGrip = 0.06; // Clamped
          activeMesh.position.copy(gripperWorldPos);
          activeMesh.position.y -= 0.1;
          setTelemetryState(`Gripper Secured: Transferring to Assembly Platform`);
        } else if (stageSubT < 0.75) {
          // Transfer to Workstation Fixture
          const p = (stageSubT - 0.45) / 0.3;
          baseRot = THREE.MathUtils.lerp(0.2, -0.62, p);
          shoulderRot = THREE.MathUtils.lerp(0.35, 0.84, p);
          elbowRot = THREE.MathUtils.lerp(-0.65, -1.28, p);
          wristRot = THREE.MathUtils.lerp(0.3, 0.44, p);
          fingerGrip = 0.06;
          activeMesh.position.copy(gripperWorldPos);
          activeMesh.position.y -= 0.1;
          setTelemetryState(`Laser Sintering Alignment on Fixture`);
        } else if (stageSubT < 0.95) {
          // Laser Weld / Seat into place with sparks
          baseRot = -0.62;
          shoulderRot = 0.84;
          elbowRot = -1.28;
          wristRot = 0.44;
          fingerGrip = 0.08;
          activeMesh.position.copy(activeTargetPos);
          isSparksActive = true;
          laserBeamLight.intensity = 4;
          laserBeamLight.position.copy(activeTargetPos);
          setTelemetryState(`Laser Sintering & Precision Mechanical Lock`);
        } else {
          // Release and reset
          const p = (stageSubT - 0.95) / 0.05;
          baseRot = THREE.MathUtils.lerp(-0.62, 0, p);
          shoulderRot = THREE.MathUtils.lerp(0.84, 0.2, p);
          elbowRot = THREE.MathUtils.lerp(-1.28, -0.4, p);
          wristRot = THREE.MathUtils.lerp(0.44, 0.2, p);
          fingerGrip = 0.12;
          activeMesh.position.copy(activeTargetPos);
          laserBeamLight.intensity = 0;
        }

        // Manage parts that haven't been placed yet vs already placed
        if (stage < 1) part1.position.copy(trayPos1);
        if (stage > 1) part1.position.copy(assembledPos1);

        if (stage < 2) part2.position.copy(trayPos2);
        if (stage > 2) part2.position.copy(assembledPos2);

        if (stage < 3) part3Group.position.copy(trayPos3);
        if (stage > 3) part3Group.position.copy(assembledPos3);

        if (stage < 4) part4.position.copy(trayPos4);
        if (stage > 4) part4.position.copy(assembledPos4);
      } else {
        // STAGE 5: FABRICATION COMPLETE & QUALITY INSPECTION SHOWCASE
        baseRot = 0;
        shoulderRot = 0.2 + Math.sin(simTime * 2) * 0.02;
        elbowRot = -0.4 + Math.cos(simTime * 1.8) * 0.02;
        wristRot = 0.2;
        fingerGrip = 0.12;

        // All parts locked on workstation
        part1.position.copy(assembledPos1);
        part2.position.copy(assembledPos2);
        part3Group.position.copy(assembledPos3);
        part4.position.copy(assembledPos4);

        // Slow rotate completed artifact for 3D inspection showcase
        const rotY = (simTime - 20) * 0.8;
        part1.rotation.y = rotY;
        part2.rotation.y = rotY;
        part3Group.rotation.y = rotY;
        part4.rotation.y = rotY;

        // Inspection Laser Sweep Ring moving up and down
        inspectRing.visible = true;
        inspectRing.position.y = assemblyPos.y + 0.3 + Math.sin(simTime * 3) * 0.25;

        setTelemetryState('FABRICATION COMPLETE: 100% Quality Optical Pass');
      }

      // Spark Particles Emission
      if (isSparksActive) {
        sparkMat.opacity = 0.9;
        laserBeamMat.opacity = 0.85 + Math.sin(simTime * 30) * 0.15;
        meltPoolMat.opacity = 0.8 + Math.sin(simTime * 25) * 0.2;
        const sArr = sparkGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < sparkCount; i++) {
          sArr[i * 3] += sparkVel[i * 3];
          sArr[i * 3 + 1] += sparkVel[i * 3 + 1];
          sArr[i * 3 + 2] += sparkVel[i * 3 + 2];

          if (sArr[i * 3 + 1] > assemblyPos.y + 0.7 || Math.random() < 0.05) {
            sArr[i * 3] = assemblyPos.x + (Math.random() - 0.5) * 0.1;
            sArr[i * 3 + 1] = assemblyPos.y + 0.35;
            sArr[i * 3 + 2] = assemblyPos.z + (Math.random() - 0.5) * 0.1;
          }
        }
        sparkGeo.attributes.position.needsUpdate = true;
      } else {
        sparkMat.opacity = 0;
        laserBeamMat.opacity = 0;
        meltPoolMat.opacity = 0;
      }

      // Apply Rotations to Robotic Arm Hierarchy
      baseGroup.rotation.y = baseRot;
      shoulderGroup.rotation.z = shoulderRot;
      elbowGroup.rotation.z = elbowRot;
      wristGroup.rotation.z = wristRot;

      fingerLeft.position.x = -fingerGrip;
      fingerRight.position.x = fingerGrip;

      // Update telemetry state
      setJointAngles({
        j1: Math.round((baseRot * 180) / Math.PI),
        j2: Math.round((shoulderRot * 180) / Math.PI),
        j3: Math.round((elbowRot * 180) / Math.PI),
        j4: Math.round((wristRot * 180) / Math.PI),
      });
      setGripperPwm(Math.round(1000 + (fingerGrip / 0.12) * 1000));

      // Orbit Camera Update based on cameraMode
      if (cameraModeRef.current === 'TOOLHEAD') {
        const toolheadPos = new THREE.Vector3();
        wristGroup.getWorldPosition(toolheadPos);
        camera.position.set(toolheadPos.x + 1.2, toolheadPos.y + 0.6, toolheadPos.z + 1.2);
        camera.lookAt(toolheadPos.x, toolheadPos.y, toolheadPos.z);
      } else if (cameraModeRef.current === 'TOP_DOWN') {
        camera.position.set(0, 7.5, 0.01);
        camera.lookAt(0, 0, 0);
      } else {
        const { theta, phi, radius } = orbitAngleRef.current;
        camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
        camera.position.y = Math.max(0.6, radius * Math.cos(phi));
        camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
        camera.lookAt(0, 1.1, 0);
      }

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
      domElement.removeEventListener('wheel', handleWheel);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#253247]">
        <div>
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            LAB A // 6-AXIS ARTICULATED INDUSTRIAL ROBOTIC FABRICATION
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-sans mt-1">
            Real-Time Robotic Assembly &amp; Automated Fabrication Lab
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Live 3D kinematic manipulation where the robotic arm autonomously fabricates a cyber IoT edge compute device layer-by-layer using Denavit-Hartenberg inverse kinematics and laser sintering.
          </p>
        </div>

        {/* Play/Pause, Manual Mode & Status Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setControlMode(prev => prev === 'AUTO' ? 'MANUAL' : 'AUTO')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all ${
              controlMode === 'MANUAL'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-md ring-1 ring-purple-400'
                : 'bg-[#111B2B] text-slate-300 border-[#253247] hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>{controlMode === 'MANUAL' ? '🎛️ TEACHING MODE' : '🤖 AUTO FAB'}</span>
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={controlMode === 'MANUAL'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all ${
              controlMode === 'MANUAL'
                ? 'opacity-40 cursor-not-allowed bg-[#111B2B] text-slate-500 border-[#253247]'
                : isPlaying
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30 animate-pulse'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>RESUME</span>
              </>
            )}
          </button>

          <span
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border flex items-center gap-1.5 ${
              controlMode === 'MANUAL'
                ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                : isAssembled
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 animate-pulse'
                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
            }`}
          >
            {controlMode === 'MANUAL' ? 'MANUAL 6-AXIS' : isAssembled ? '✓ FABRICATION COMPLETE' : `STEP ${currentStepIdx + 1}/4`}
          </span>
        </div>
      </div>

      {/* Main Grid: Left 8 Cols (3D Canvas & Telemetry), Right 4 Cols (Assembly Progress & Finished Product Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Section: 3D Viewport (8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="relative h-[400px] sm:h-[480px] rounded-2xl bg-[#050811] border-2 border-[#253247] shadow-2xl overflow-hidden select-none">
            {/* Three.js Canvas Container */}
            <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing">
              {!hasWebGL && (
                <div className="flex items-center justify-center h-full text-center p-6 text-slate-400 font-mono text-xs">
                  WebGL 3D acceleration is required to render the robotic fabrication simulator.
                </div>
              )}
            </div>

            {/* Top HUD: Workstation Status Banner */}
            <div className="absolute top-3 left-2 right-2 sm:left-4 sm:right-4 z-20 flex flex-wrap items-center justify-between gap-1.5 text-[10px] sm:text-[11px] font-mono pointer-events-none">
              <div className="bg-[#0C1220]/85 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-[#253247] text-white flex items-center gap-1.5 sm:gap-2 max-w-[200px] sm:max-w-none truncate">
                <Bot className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                <span className="text-[#38BDF8] font-bold shrink-0">ROBOT:</span>
                <span className="text-slate-200 truncate">{telemetryState}</span>
              </div>

              <div className="bg-[#0C1220]/85 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-[#253247] text-emerald-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 animate-pulse shrink-0" />
                <span className="hidden xs:inline sm:inline">Trajectory Active</span>
              </div>
            </div>

            {/* Bottom HUD: Live Denavit-Hartenberg Joint Angles */}
            <div className="absolute bottom-3 left-2 right-2 sm:left-4 sm:right-4 z-20 flex flex-wrap items-center justify-between gap-2 bg-[#0C1220]/90 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[#253247] text-[11px] sm:text-xs font-mono pointer-events-none">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-slate-400 text-[9px] sm:text-[10px]">JOINTS:</span>
                <span className="text-cyan-300 font-bold">J1:{jointAngles.j1}°</span>
                <span className="text-cyan-300 font-bold">J2:{jointAngles.j2}°</span>
                <span className="text-cyan-300 font-bold">J3:{jointAngles.j3}°</span>
                <span className="text-cyan-300 font-bold">J4:{jointAngles.j4}°</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-300 text-[10px] sm:text-xs">
                <span className="text-slate-500 text-[9px] sm:text-[10px]">PWM:</span>
                <span className="text-emerald-400 font-bold">{gripperPwm} µs</span>
              </div>
            </div>

            {/* Camera View Mode Switcher */}
            <div className="absolute top-12 sm:top-14 right-2 sm:right-4 z-20 flex items-center gap-1 bg-[#0C1220]/90 backdrop-blur-md p-1 rounded-xl border border-[#253247] text-[10px] font-mono">
              <span className="text-slate-400 px-1.5 hidden sm:inline text-[9px] uppercase font-bold flex items-center gap-1">
                <Video className="w-3 h-3 text-cyan-400" />
                CAM:
              </span>
              <button
                onClick={() => setCameraMode('ORBIT')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  cameraMode === 'ORBIT'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#162338]'
                }`}
                title="Free 3D Orbit Camera"
              >
                Orbit
              </button>
              <button
                onClick={() => setCameraMode('TOOLHEAD')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  cameraMode === 'TOOLHEAD'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#162338]'
                }`}
                title="End-Effector Toolhead Close-Up"
              >
                Toolhead
              </button>
              <button
                onClick={() => setCameraMode('TOP_DOWN')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  cameraMode === 'TOP_DOWN'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-[#162338]'
                }`}
                title="Top-Down Engineering View"
              >
                Top
              </button>
            </div>

            {/* Orbit Hint */}
            <div className="absolute top-12 sm:top-14 left-2 sm:left-4 z-20 pointer-events-none text-[10px] font-mono text-slate-400 bg-black/50 px-2.5 py-1 rounded-xl backdrop-blur border border-[#253247]/60">
              🖱️ Drag / touch to orbit in 3D
            </div>
          </div>

          {/* Manual Teaching Pendant Sliders (Rendered when in Manual Mode) */}
          {controlMode === 'MANUAL' && (
            <div className="p-4 rounded-2xl bg-[#070A12] border-2 border-purple-500/40 space-y-3 font-mono text-xs animate-fadeIn shadow-xl shadow-purple-500/10">
              <div className="flex items-center justify-between border-b border-[#253247] pb-2">
                <span className="font-bold text-purple-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  6-Axis Denavit-Hartenberg Teaching Pendant
                </span>
                <button
                  onClick={() => setManualJoints({ j1: 0, j2: 35, j3: -45, j4: 20, gripper: 0.08 })}
                  className="px-2.5 py-1 rounded-lg bg-[#111B2B] text-slate-300 hover:text-white border border-[#253247] text-[10px] flex items-center gap-1 transition-all"
                >
                  <RotateCcw className="w-3 h-3 text-cyan-400" /> Reset Pose
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px]">
                <div className="p-2.5 rounded-xl bg-[#0E172A]/70 border border-[#1E293B]">
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>J1 (Base Turret):</span>
                    <span className="text-cyan-300 font-bold">{manualJoints.j1}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={manualJoints.j1}
                    onChange={(e) => setManualJoints(prev => ({ ...prev, j1: Number(e.target.value) }))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-[#0E172A]/70 border border-[#1E293B]">
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>J2 (Shoulder):</span>
                    <span className="text-cyan-300 font-bold">{manualJoints.j2}°</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="85"
                    value={manualJoints.j2}
                    onChange={(e) => setManualJoints(prev => ({ ...prev, j2: Number(e.target.value) }))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-[#0E172A]/70 border border-[#1E293B]">
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>J3 (Elbow Pitch):</span>
                    <span className="text-cyan-300 font-bold">{manualJoints.j3}°</span>
                  </div>
                  <input
                    type="range"
                    min="-90"
                    max="45"
                    value={manualJoints.j3}
                    onChange={(e) => setManualJoints(prev => ({ ...prev, j3: Number(e.target.value) }))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-[#0E172A]/70 border border-[#1E293B]">
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>J4 (Wrist Pitch):</span>
                    <span className="text-cyan-300 font-bold">{manualJoints.j4}°</span>
                  </div>
                  <input
                    type="range"
                    min="-90"
                    max="90"
                    value={manualJoints.j4}
                    onChange={(e) => setManualJoints(prev => ({ ...prev, j4: Number(e.target.value) }))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Step-by-Step Fabrication Stages + Finished Product Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-3.5">
          {/* Assembled Product Reveal Card */}
          <div
            className={`p-4 rounded-2xl border-2 transition-all duration-500 ${
              isAssembled
                ? 'bg-gradient-to-b from-[#0a192f] to-[#070A12] border-emerald-500/60 shadow-xl shadow-emerald-500/10'
                : 'bg-[#070A12] border-[#253247]'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#253247] pb-2">
              <div className="flex items-center gap-2">
                <Sparkles
                  className={`w-4 h-4 ${isAssembled ? 'text-emerald-400 animate-spin' : 'text-[#38BDF8]'}`}
                />
                <span className="font-bold text-white text-xs font-mono">
                  {isAssembled ? 'COMPLETED PRODUCT VERIFIED' : 'TARGET PRODUCT SPEC'}
                </span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  isAssembled
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isAssembled ? 'PASSED 100%' : 'IN PROGRESS'}
              </span>
            </div>

            <div className="pt-3 space-y-2 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] font-mono uppercase block">PRODUCT NAME</span>
                <h4 className="text-base font-bold text-white tracking-wide">
                  CYBER-CORE X1 // EDGE IOT AUTONOMOUS UNIT
                </h4>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Precision assembled by 6-Axis manipulator incorporating thermal-conductive titanium chassis, 16-Core AI SoC, 48V power cell, and optical LiDAR sensor dome.
              </p>

              {/* Components Checklist */}
              <div className="space-y-1.5 pt-1 text-[11px] font-mono">
                {BUILD_STEPS.map((s, idx) => {
                  const isDone = currentStepIdx > idx || isAssembled;
                  const isCurrent = currentStepIdx === idx && !isAssembled;
                  return (
                    <div
                      key={s.id}
                      className={`flex items-center justify-between p-1.5 rounded-lg border transition-all ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                          : isCurrent
                          ? 'bg-cyan-950/20 border-cyan-500/40 text-cyan-300 animate-pulse'
                          : 'bg-[#0D1525] border-[#253247] text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            isDone ? 'text-emerald-400' : isCurrent ? 'text-cyan-400' : 'text-slate-600'
                          }`}
                        />
                        <span>{s.partName}</span>
                      </div>
                      <span className="text-[10px]">
                        {isDone ? 'INSTALLED' : isCurrent ? 'ASSEMBLING...' : 'QUEUED'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Robotics Kinematics Technical Architecture Card */}
          <div className="p-4 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-2.5 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-[#253247] pb-2 text-white">
              <span className="font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
                KINEMATICS ARCHITECTURE
              </span>
              <span className="text-[10px] text-slate-400">DH Parameters</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Kinematic Solver:</span>
                <span className="text-cyan-300">KDL / MoveIt 2 Inverse IK</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Repeatability:</span>
                <span className="text-emerald-400">±0.02 mm Micro-Precision</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">End-Effector:</span>
                <span className="text-purple-300">Dual Gripper + Laser Tip</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Trajectory Sync:</span>
                <span className="text-amber-400">ROS 2 Humble / 500 Hz Joint States</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Linkage Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
          <strong className="text-[#38BDF8] block mb-1">Denavit-Hartenberg (DH) Linkages:</strong>
          <p className="text-[#94A3B8] text-[11px] leading-relaxed">
            Mathematical parameterization mapping reference frames across all 6 rotary joints to compute the exact 3D Cartesian coordinates of the end-effector.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
          <strong className="text-[#8B5CF6] block mb-1">Laser Sintering &amp; Micro-Alignment:</strong>
          <p className="text-[#94A3B8] text-[11px] leading-relaxed">
            Sub-millimeter optical alignment with localized sintering thermal pulse securing silicon wafers without thermal shock deformation.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
          <strong className="text-emerald-400 block mb-1">Automated Optical Inspection (AOI):</strong>
          <p className="text-[#94A3B8] text-[11px] leading-relaxed">
            Sweeping vertical laser rings perform 3D structured-light surface profilometry, certifying zero defect tolerances prior to final release.
          </p>
        </div>
      </div>
    </div>
  );
};
