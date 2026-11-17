import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Navigation,
  Compass,
  Radio,
  ShieldCheck,
  Zap,
} from 'lucide-react';

type FlightMode = 'DISARMED' | 'TAKEOFF' | 'HOVER' | 'WAYPOINT' | 'ORBIT' | 'FORWARD' | 'LAND';
type CameraView = 'CHASE' | 'FPV' | 'TOP_DOWN';

export const AutonomousDroneSimulator3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Flight State
  const [flightMode, setFlightMode] = useState<FlightMode>('HOVER');
  const [cameraView, setCameraView] = useState<CameraView>('CHASE');
  const [altitude, setAltitude] = useState(3.5);
  const [groundSpeed, setGroundSpeed] = useState(0.0);
  const [batteryPct, setBatteryPct] = useState(96);
  const [headingDeg, setHeadingDeg] = useState(45);
  const [pitchDeg, setPitchDeg] = useState(0);
  const [rollDeg, setRollDeg] = useState(0);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isArmed, setIsArmed] = useState(true);

  // Coordinates
  const [coords, setCoords] = useState({ x: 0.0, y: 3.5, z: 0.0 });
  const [escPwm, setEscPwm] = useState([1420, 1420, 1418, 1422]);

  // Animation & Physics Refs
  const animFrameRef = useRef<number | null>(null);
  const flightModeRef = useRef<FlightMode>('HOVER');
  const cameraViewRef = useRef<CameraView>('CHASE');
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const orbitAngleRef = useRef({ theta: Math.PI / 4, phi: Math.PI / 5, radius: 5.2 });

  useEffect(() => {
    flightModeRef.current = flightMode;
  }, [flightMode]);

  useEffect(() => {
    cameraViewRef.current = cameraView;
  }, [cameraView]);

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

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 420;

    // 1. Scene & Environment
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.045);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(3.8, 3.2, 4.2);
    camera.lookAt(0, 1.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Aerospace Engineering Hangar)
    const ambientLight = new THREE.AmbientLight(0x0a1428, 2.8);
    scene.add(ambientLight);

    const keySun = new THREE.DirectionalLight(0x38bdf8, 3.2);
    keySun.position.set(5, 12, 6);
    keySun.castShadow = true;
    keySun.shadow.mapSize.width = 1024;
    keySun.shadow.mapSize.height = 1024;
    keySun.shadow.bias = -0.0005;
    scene.add(keySun);

    const purpleFill = new THREE.PointLight(0x8b5cf6, 3.5, 20);
    purpleFill.position.set(-6, 4, -4);
    scene.add(purpleFill);

    const bottomGlow = new THREE.DirectionalLight(0x0ea5e9, 1.2);
    bottomGlow.position.set(0, -5, 0);
    scene.add(bottomGlow);

    // 3. Ground Helipad & Gazebo Simulation Grid
    const grid = new THREE.GridHelper(16, 32, 0x38bdf8, 0x1e293b);
    grid.position.y = 0;
    scene.add(grid);

    // Helipad Concrete Platform
    const padGeo = new THREE.CylinderGeometry(2.2, 2.4, 0.1, 48);
    const padMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.6,
      metalness: 0.5,
    });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.y = 0.05;
    pad.receiveShadow = true;
    scene.add(pad);

    // Helipad Glowing Neon Ring
    const heliPadRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.025, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    heliPadRing.rotation.x = Math.PI / 2;
    heliPadRing.position.y = 0.11;
    scene.add(heliPadRing);

    // Helipad Center "H" Symbol
    const hGroup = new THREE.Group();
    const hMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const bar1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.01, 1.2), hMat);
    bar1.position.x = -0.4;
    const bar2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.01, 1.2), hMat);
    bar2.position.x = 0.4;
    const crossBar = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.01, 0.14), hMat);
    hGroup.add(bar1, bar2, crossBar);
    hGroup.position.y = 0.11;
    scene.add(hGroup);

    // 4. Waypoint Survey Markers (SITL Mission Path)
    const waypoints = [
      new THREE.Vector3(-2.8, 3.2, -2.8),
      new THREE.Vector3(2.8, 3.6, -2.4),
      new THREE.Vector3(2.8, 3.2, 2.8),
      new THREE.Vector3(-2.4, 3.8, 2.6),
    ];

    const wpGroup = new THREE.Group();
    waypoints.forEach((wp) => {
      // Waypoint Marker Pillar
      const wpRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.35, 0.02, 16, 32),
        new THREE.MeshBasicMaterial({ color: 0x10b981 })
      );
      wpRing.rotation.x = Math.PI / 2;
      wpRing.position.copy(wp);

      const beaconLine = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.01, wp.y, 8),
        new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.35 })
      );
      beaconLine.position.set(wp.x, wp.y / 2, wp.z);

      wpGroup.add(wpRing, beaconLine);
    });
    scene.add(wpGroup);

    // Flight Path Spline Trajectory Ribbon
    const curve = new THREE.CatmullRomCurve3([...waypoints, waypoints[0]], true);
    const pathPoints = curve.getPoints(80);
    const pathGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const pathMat = new THREE.LineDashedMaterial({
      color: 0x38bdf8,
      dashSize: 0.25,
      gapSize: 0.15,
      transparent: true,
      opacity: 0.7,
    });
    const trajectoryLine = new THREE.Line(pathGeo, pathMat);
    trajectoryLine.computeLineDistances();
    scene.add(trajectoryLine);

    // -------------------------------------------------------------------------
    // 5. Build High-Fidelity 3D Quadcopter Hierarchy (PX4 Aerodynamic Airframe)
    // -------------------------------------------------------------------------
    const droneGroup = new THREE.Group();
    droneGroup.position.set(0, 3.5, 0);
    scene.add(droneGroup);

    // Materials
    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.2,
      metalness: 0.9,
    });
    const armMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.8,
    });
    const motorMat = new THREE.MeshStandardMaterial({
      color: 0xb45309, // Anodized Copper/Bronze motor bell
      roughness: 0.25,
      metalness: 0.9,
    });
    const propMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.3,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85,
    });
    const propBlurMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });

    // Central Avionics Fuselage (Upper & Lower Carbon Plates)
    const upperPlate = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.04, 0.7), carbonMat);
    upperPlate.position.y = 0.08;
    upperPlate.castShadow = true;

    const lowerPlate = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.04, 0.7), carbonMat);
    lowerPlate.position.y = -0.08;
    lowerPlate.castShadow = true;

    // Battery Bay (4S LiPo with yellow warning label styling)
    const battery = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.14, 0.55),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 })
    );
    battery.position.y = 0;
    battery.castShadow = true;

    // Pixhawk 6X Autopilot Enclosure
    const pixhawk = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.06, 0.36),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.9 })
    );
    pixhawk.position.y = 0.13;
    pixhawk.castShadow = true;

    // Pixhawk RGB Multi-Color Status Beacon LED
    const pixhawkLed = new THREE.Mesh(
      new THREE.SphereGeometry(0.03, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    pixhawkLed.position.set(0, 0.17, -0.05);

    // RTK GNSS Antenna Mast
    const mastPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.28, 12),
      carbonMat
    );
    mastPole.position.set(0, 0.24, -0.22);
    const mastPuck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.035, 24),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })
    );
    mastPuck.position.set(0, 0.38, -0.22);

    // 2-Axis Stabilized Gimbal & Optical Camera
    const gimbalArm = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.1, 12), carbonMat);
    gimbalArm.position.set(0, -0.14, 0.24);
    const cameraHousing = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 })
    );
    cameraHousing.position.set(0, -0.2, 0.28);
    const cameraLens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.04, 16),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.95, roughness: 0.1 })
    );
    cameraLens.rotation.x = Math.PI / 2;
    cameraLens.position.set(0, -0.2, 0.35);

    droneGroup.add(
      upperPlate,
      lowerPlate,
      battery,
      pixhawk,
      pixhawkLed,
      mastPole,
      mastPuck,
      gimbalArm,
      cameraHousing,
      cameraLens
    );

    // 4 Diagonal Tubular Carbon Fiber Arms + Motors + Propellers
    const armConfigs = [
      { name: 'FL', angle: Math.PI / 4, dir: 1, ledColor: 0x10b981 }, // Front-Left: CW (Green LED)
      { name: 'FR', angle: -Math.PI / 4, dir: -1, ledColor: 0xef4444 }, // Front-Right: CCW (Red LED)
      { name: 'RL', angle: (3 * Math.PI) / 4, dir: -1, ledColor: 0xf8fafc }, // Rear-Left: CCW (White Strobe)
      { name: 'RR', angle: -(3 * Math.PI) / 4, dir: 1, ledColor: 0xf8fafc }, // Rear-Right: CW (White Strobe)
    ];

    const propAssemblies: Array<{
      bladeGroup: THREE.Group;
      blurDisc: THREE.Mesh;
      dir: number;
    }> = [];

    const armLength = 0.95;

    armConfigs.forEach((cfg) => {
      const armGroup = new THREE.Group();
      armGroup.rotation.y = cfg.angle;

      // Carbon Arm Tube
      const armTube = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, armLength, 16),
        armMat
      );
      armTube.rotation.z = Math.PI / 2;
      armTube.position.x = armLength / 2;
      armTube.castShadow = true;
      armGroup.add(armTube);

      // Motor Mount & Brushless Outrunner
      const motorBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065, 0.065, 0.05, 18),
        carbonMat
      );
      motorBase.position.set(armLength, 0.02, 0);
      const motorBell = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.06, 18),
        motorMat
      );
      motorBell.position.set(armLength, 0.07, 0);
      motorBell.castShadow = true;

      // Nav LED on arm tip
      const navLed = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 12, 12),
        new THREE.MeshBasicMaterial({ color: cfg.ledColor })
      );
      navLed.position.set(armLength, -0.04, 0);

      // Landing Skid Strut
      const skidLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.28, 12),
        carbonMat
      );
      skidLeg.position.set(armLength * 0.7, -0.16, 0);
      skidLeg.rotation.z = -0.2;

      armGroup.add(motorBase, motorBell, navLed, skidLeg);

      // Propeller Assembly
      const bladeGroup = new THREE.Group();
      bladeGroup.position.set(armLength, 0.11, 0);

      // 2 Propeller Blades
      const blade1 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.008, 0.045), propMat);
      blade1.position.x = 0.25;
      blade1.rotation.y = cfg.dir * 0.15;
      const blade2 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.008, 0.045), propMat);
      blade2.position.x = -0.25;
      blade2.rotation.y = -cfg.dir * 0.15;
      const propNut = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.03, 12), carbonMat);
      propNut.position.y = 0.01;

      bladeGroup.add(blade1, blade2, propNut);
      armGroup.add(bladeGroup);

      // Propeller High-Speed Motion Blur Disc
      const blurDisc = new THREE.Mesh(new THREE.CircleGeometry(0.54, 32), propBlurMat);
      blurDisc.rotation.x = -Math.PI / 2;
      blurDisc.position.set(armLength, 0.11, 0);
      blurDisc.visible = true;
      armGroup.add(blurDisc);

      propAssemblies.push({ bladeGroup, blurDisc, dir: cfg.dir });
      droneGroup.add(armGroup);
    });

    // Landing Gear Horizontal Skids
    const leftSkid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, 0.9, 12),
      carbonMat
    );
    leftSkid.rotation.x = Math.PI / 2;
    leftSkid.position.set(-0.45, -0.28, 0);

    const rightSkid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, 0.9, 12),
      carbonMat
    );
    rightSkid.rotation.x = Math.PI / 2;
    rightSkid.position.set(0.45, -0.28, 0);
    droneGroup.add(leftSkid, rightSkid);

    // Dynamic Propeller Downwash Dust Particles
    const particleCount = 60;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(particleCount * 3);
    const dustVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 2;
      dustPositions[i * 3 + 1] = Math.random() * 0.4;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 2;

      dustVelocities[i * 3] = (Math.random() - 0.5) * 0.04;
      dustVelocities[i * 3 + 1] = 0.02 + Math.random() * 0.03;
      dustVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // -------------------------------------------------------------
    // Mouse Dragging to Orbit Camera in 3D
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

    // Touch support for mobile devices
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

    // -------------------------------------------------------------
    // Flight Animation Loop (PX4 SITL Physics Simulation)
    // -------------------------------------------------------------
    let clock = new THREE.Clock();
    let currentWpIdx = 0;
    let targetPos = new THREE.Vector3(0, 3.5, 0);
    let targetRot = new THREE.Euler(0, 0, 0);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      const curMode = flightModeRef.current;

      // Propeller Rotation & Blur Visibility
      const isSpinning = curMode !== 'DISARMED';
      const propSpeed = isSpinning ? (curMode === 'TAKEOFF' || curMode === 'FORWARD' ? 45 : 32) : 0;

      propAssemblies.forEach((p) => {
        p.bladeGroup.rotation.y += p.dir * propSpeed * delta;
        p.blurDisc.visible = isSpinning;
      });

      // Update Pixhawk LED Color
      if (curMode === 'DISARMED') {
        pixhawkLed.material = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      } else if (curMode === 'WAYPOINT' || curMode === 'ORBIT') {
        pixhawkLed.material = new THREE.MeshBasicMaterial({ color: 0x8b5cf6 });
      } else {
        pixhawkLed.material = new THREE.MeshBasicMaterial({
          color: Math.sin(time * 6) > 0 ? 0x10b981 : 0x052e16,
        });
      }

      // Physics State Machine
      if (curMode === 'DISARMED') {
        targetPos.set(0, 0.35, 0);
        targetRot.set(0, 0, 0);
      } else if (curMode === 'TAKEOFF') {
        targetPos.set(0, 3.5, 0);
        targetRot.set(0.04, 0, 0);
      } else if (curMode === 'HOVER') {
        // Natural aerodynamic hover micro-bobbing
        const hoverBobY = 3.5 + Math.sin(time * 2.2) * 0.08;
        targetPos.set(Math.sin(time * 0.8) * 0.15, hoverBobY, Math.cos(time * 0.7) * 0.15);
        targetRot.set(Math.sin(time * 1.5) * 0.03, time * 0.1, Math.cos(time * 1.7) * 0.03);
      } else if (curMode === 'WAYPOINT') {
        // Waypoint navigation
        const wp = waypoints[currentWpIdx];
        targetPos.copy(wp);
        // Bank into direction of travel
        const nextWp = waypoints[(currentWpIdx + 1) % waypoints.length];
        const dir = new THREE.Vector3().subVectors(nextWp, wp).normalize();
        const heading = Math.atan2(dir.x, dir.z);
        targetRot.set(0.12, heading, -0.08);

        // Check proximity to advance waypoint
        if (droneGroup.position.distanceTo(wp) < 0.4) {
          currentWpIdx = (currentWpIdx + 1) % waypoints.length;
        }
      } else if (curMode === 'ORBIT') {
        // 360° Point of Interest Orbit Recon
        const radius = 2.8;
        const orbitSpeed = 0.65;
        const x = Math.sin(time * orbitSpeed) * radius;
        const z = Math.cos(time * orbitSpeed) * radius;
        targetPos.set(x, 3.4 + Math.sin(time * 1.2) * 0.1, z);
        // Inward banking
        targetRot.set(0.05, time * orbitSpeed + Math.PI / 2, -0.18);
      } else if (curMode === 'FORWARD') {
        // High-Speed Forward Acceleration
        targetPos.set(0, 3.2, Math.sin(time * 1.8) * 2.4);
        targetRot.set(0.28, 0, 0); // 16° pitch forward
      } else if (curMode === 'LAND') {
        targetPos.set(0, 0.35, 0);
        targetRot.set(0, 0, 0);
      }

      // Smooth Position and Rotation LERP (PX4 PID Attitude Controller)
      const lerpFactor = curMode === 'TAKEOFF' || curMode === 'LAND' ? 1.4 * delta : 2.2 * delta;
      droneGroup.position.lerp(targetPos, Math.min(1, lerpFactor));
      droneGroup.rotation.x = THREE.MathUtils.lerp(droneGroup.rotation.x, targetRot.x, Math.min(1, 3.5 * delta));
      droneGroup.rotation.y = THREE.MathUtils.lerp(droneGroup.rotation.y, targetRot.y, Math.min(1, 3.5 * delta));
      droneGroup.rotation.z = THREE.MathUtils.lerp(droneGroup.rotation.z, targetRot.z, Math.min(1, 3.5 * delta));

      // Dust Downwash Animation on ground
      if (isSpinning) {
        const pPositions = dustGeo.attributes.position.array as Float32Array;
        const heightAboveGround = Math.max(0.1, droneGroup.position.y);
        const intensity = Math.max(0, 1 - heightAboveGround / 5);

        for (let i = 0; i < particleCount; i++) {
          pPositions[i * 3] += dustVelocities[i * 3] * (1 + intensity * 2);
          pPositions[i * 3 + 1] += dustVelocities[i * 3 + 1];
          pPositions[i * 3 + 2] += dustVelocities[i * 3 + 2] * (1 + intensity * 2);

          if (pPositions[i * 3 + 1] > 0.4 || Math.abs(pPositions[i * 3]) > 2.5) {
            pPositions[i * 3] = droneGroup.position.x + (Math.random() - 0.5) * 0.8;
            pPositions[i * 3 + 1] = 0.05;
            pPositions[i * 3 + 2] = droneGroup.position.z + (Math.random() - 0.5) * 0.8;
          }
        }
        dustGeo.attributes.position.needsUpdate = true;
        dustMat.opacity = intensity * 0.6;
      } else {
        dustMat.opacity = 0;
      }

      // Camera Positioning based on View Mode
      if (cameraViewRef.current === 'CHASE') {
        const { theta, phi, radius } = orbitAngleRef.current;
        const cx = droneGroup.position.x + radius * Math.sin(phi) * Math.sin(theta);
        const cy = droneGroup.position.y + radius * Math.cos(phi);
        const cz = droneGroup.position.z + radius * Math.sin(phi) * Math.cos(theta);

        camera.position.set(cx, Math.max(0.6, cy), cz);
        camera.lookAt(droneGroup.position.x, droneGroup.position.y + 0.2, droneGroup.position.z);
      } else if (cameraViewRef.current === 'FPV') {
        // Cockpit FPV Perspective
        const forward = new THREE.Vector3(0, -0.05, 0.6).applyEuler(droneGroup.rotation);
        camera.position.copy(droneGroup.position).add(forward);
        const lookTarget = new THREE.Vector3(0, -0.1, 5).applyEuler(droneGroup.rotation);
        camera.lookAt(droneGroup.position.clone().add(lookTarget));
      } else if (cameraViewRef.current === 'TOP_DOWN') {
        camera.position.set(0, 8.5, 0.01);
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);

      // Periodically update UI telemetry state (throttled)
      if (Math.floor(time * 10) % 2 === 0) {
        setAltitude(Number(droneGroup.position.y.toFixed(1)));
        setPitchDeg(Number(((-droneGroup.rotation.x * 180) / Math.PI).toFixed(1)));
        setRollDeg(Number(((-droneGroup.rotation.z * 180) / Math.PI).toFixed(1)));
        setHeadingDeg(
          Math.round(((droneGroup.rotation.y * 180) / Math.PI + 360) % 360)
        );
        const speed =
          curMode === 'FORWARD' ? 8.4 : curMode === 'WAYPOINT' ? 4.2 : curMode === 'ORBIT' ? 3.6 : 0.0;
        setGroundSpeed(speed);
        setCoords({
          x: Number(droneGroup.position.x.toFixed(2)),
          y: Number(droneGroup.position.y.toFixed(2)),
          z: Number(droneGroup.position.z.toFixed(2)),
        });

        // ESC PWM Modulation
        if (isSpinning) {
          const basePwm = curMode === 'TAKEOFF' || curMode === 'FORWARD' ? 1580 : 1420;
          setEscPwm([
            basePwm + Math.floor(Math.sin(time * 8) * 15),
            basePwm - Math.floor(Math.sin(time * 8) * 15),
            basePwm + Math.floor(Math.cos(time * 7) * 12),
            basePwm - Math.floor(Math.cos(time * 7) * 12),
          ]);
        } else {
          setEscPwm([1000, 1000, 1000, 1000]);
        }
      }
    };

    animate();

    // Resize Handler
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

  // Action Dispatcher
  const handleAction = (mode: FlightMode) => {
    setFlightMode(mode);
    setIsArmed(mode !== 'DISARMED');
    if (mode === 'DISARMED') {
      setGroundSpeed(0);
    } else {
      setBatteryPct((b) => Math.max(12, b - 1));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#253247]">
        <div>
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            LAB B // PX4 AUTOPILOT &amp; GAZEBO PHYSICS SIMULATOR
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-sans mt-1">
            Autonomous Aerial Quadcopter Flight Lab
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Real-time 3D flight dynamics running PX4 Autopilot PID attitude control, ROS 2 micro-XRCE-DDS odometry topics, and autonomous waypoint trajectory navigation.
          </p>
        </div>

        {/* View Mode & Armed Status */}
        <div className="flex items-center gap-2">
          {/* Camera View Selector */}
          <div className="flex items-center rounded-xl bg-[#111B2B] border border-[#253247] p-0.5 text-xs font-mono">
            {(['CHASE', 'FPV', 'TOP_DOWN'] as CameraView[]).map((v) => (
              <button
                key={v}
                onClick={() => setCameraView(v)}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  cameraView === v
                    ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {v === 'CHASE' ? '🛰️ 3D CHASE' : v === 'FPV' ? '📷 FPV GIMBAL' : '🗺️ MAP'}
              </button>
            ))}
          </div>

          {/* Armed Badge */}
          <span
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border flex items-center gap-1.5 ${
              isArmed
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-red-500/20 text-red-400 border-red-500/40'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isArmed ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
            {isArmed ? 'ARMED // PX4 ACTIVE' : 'DISARMED'}
          </span>
        </div>
      </div>

      {/* Main 3D Viewport & HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 3D Simulation Canvas with Live HUD Overlay (Left 8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="relative h-[380px] sm:h-[480px] rounded-2xl bg-[#050811] border-2 border-[#253247] shadow-2xl overflow-hidden select-none">
            {/* Three.js Canvas Container */}
            <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing">
              {!hasWebGL && (
                <div className="flex items-center justify-center h-full text-center p-6 text-slate-400 font-mono text-xs">
                  WebGL 3D acceleration is required to render the PX4 SITL physics engine.
                </div>
              )}
            </div>

            {/* Top HUD Heading Bar */}
            <div className="absolute top-3 left-2 right-2 sm:left-4 sm:right-4 z-20 flex flex-wrap items-center justify-between gap-1.5 text-[10px] sm:text-[11px] font-mono pointer-events-none">
              {/* Heading Tape */}
              <div className="bg-[#0C1220]/85 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-[#253247] text-white flex items-center gap-1.5 sm:gap-2">
                <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="text-[#38BDF8] font-bold">HDG:</span>
                <span>{headingDeg.toString().padStart(3, '0')}°</span>
                <span className="text-slate-400 text-[9px] sm:text-[10px]">
                  {headingDeg >= 315 || headingDeg < 45
                    ? 'N'
                    : headingDeg >= 45 && headingDeg < 135
                    ? 'E'
                    : headingDeg >= 135 && headingDeg < 225
                    ? 'S'
                    : 'W'}
                </span>
              </div>

              {/* Navigation Status */}
              <div className="bg-[#0C1220]/85 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-[#253247] text-emerald-400 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px]">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>GPS: 18 SATS (RTK)</span>
              </div>
            </div>

            {/* Fighter-Jet HUD Artificial Horizon & Pitch Ladder */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
              <div
                className="w-48 h-48 border border-cyan-400/20 rounded-full flex items-center justify-center relative transition-transform duration-100"
                style={{
                  transform: `rotate(${rollDeg}deg)`,
                }}
              >
                {/* Artificial Horizon Center Wings */}
                <div className="w-36 h-[2px] bg-gradient-to-r from-transparent via-[#38BDF8]/70 to-transparent relative">
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-cyan-400/80"
                    style={{ transform: `translateY(${-pitchDeg * 2}px)` }}
                  />
                  <div
                    className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-cyan-400/80"
                    style={{ transform: `translateY(${-pitchDeg * 2}px)` }}
                  />
                </div>

                {/* Center Crosshair Aim */}
                <div className="absolute w-2 h-2 rounded-full border border-emerald-400 bg-emerald-400/30" />
              </div>
            </div>

            {/* Left HUD: Altitude Tape */}
            <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none bg-[#0C1220]/85 backdrop-blur-md px-2 sm:px-2.5 py-2 sm:py-3 rounded-xl border border-[#253247] text-[11px] sm:text-xs font-mono space-y-0.5 sm:space-y-1">
              <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase block">ALTITUDE</span>
              <div className="text-sm sm:text-lg font-bold text-white flex items-baseline gap-1">
                <span>{altitude.toFixed(1)}</span>
                <span className="text-[10px] sm:text-xs text-[#38BDF8]">m</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-400">
                LiDAR: {Math.max(0, altitude - 0.2).toFixed(1)}m
              </div>
            </div>

            {/* Right HUD: Groundspeed Tape */}
            <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none bg-[#0C1220]/85 backdrop-blur-md px-2 sm:px-2.5 py-2 sm:py-3 rounded-xl border border-[#253247] text-[11px] sm:text-xs font-mono space-y-0.5 sm:space-y-1 text-right">
              <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase block">SPEED</span>
              <div className="text-sm sm:text-lg font-bold text-white flex items-baseline justify-end gap-1">
                <span>{groundSpeed.toFixed(1)}</span>
                <span className="text-[10px] sm:text-xs text-[#38BDF8]">m/s</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-400">
                {(groundSpeed * 1.944).toFixed(1)} kts
              </div>
            </div>

            {/* Bottom HUD: Live Telemetry Tape */}
            <div className="absolute bottom-3 left-2 right-2 sm:left-4 sm:right-4 z-20 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 bg-[#0C1220]/90 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[#253247] text-[11px] sm:text-xs font-mono pointer-events-none">
              <div>
                <span className="text-slate-500 text-[10px] block">PX4 FLIGHT MODE</span>
                <span className="text-[#38BDF8] font-bold uppercase">{flightMode}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">4S LIPO BATTERY</span>
                <span className="text-emerald-400 font-bold">16.2V ({batteryPct}%)</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">ODOMETRY (X, Y, Z)</span>
                <span className="text-slate-200">
                  [{coords.x}, {coords.y}, {coords.z}]
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">micro-XRCE-DDS</span>
                <span className="text-[#8B5CF6] font-bold">100 Hz (2.4ms)</span>
              </div>
            </div>

            {/* Drag to rotate hint */}
            <div className="absolute top-14 left-4 z-20 pointer-events-none text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-1 rounded backdrop-blur">
              🖱️ Drag mouse to orbit in 3D
            </div>
          </div>

          {/* Interactive Autonomous Flight Control Panel */}
          <div className="p-4 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#94A3B8] uppercase font-bold flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#38BDF8]" />
                AUTONOMOUS FLIGHT MISSION COMMANDS
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                SITL Controller Ready
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => handleAction('TAKEOFF')}
                className={`py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all ${
                  flightMode === 'TAKEOFF'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-[#111B2B] hover:bg-[#1E293B] text-emerald-400 border border-emerald-500/30'
                }`}
              >
                🚀 Auto Takeoff
              </button>

              <button
                onClick={() => handleAction('HOVER')}
                className={`py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all ${
                  flightMode === 'HOVER'
                    ? 'bg-[#38BDF8] text-slate-950 shadow-lg shadow-[#38BDF8]/20'
                    : 'bg-[#111B2B] hover:bg-[#1E293B] text-[#38BDF8] border border-[#38BDF8]/30'
                }`}
              >
                ⚓ Position Hold
              </button>

              <button
                onClick={() => handleAction('WAYPOINT')}
                className={`py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all ${
                  flightMode === 'WAYPOINT'
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-[#111B2B] hover:bg-[#1E293B] text-purple-300 border border-purple-500/30'
                }`}
              >
                📍 Waypoint Survey
              </button>

              <button
                onClick={() => handleAction('ORBIT')}
                className={`py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all ${
                  flightMode === 'ORBIT'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-[#111B2B] hover:bg-[#1E293B] text-amber-300 border border-amber-500/30'
                }`}
              >
                🔄 360° Orbit Recon
              </button>

              <button
                onClick={() => handleAction('LAND')}
                className={`py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all ${
                  flightMode === 'LAND'
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                    : 'bg-[#111B2B] hover:bg-[#1E293B] text-red-400 border border-red-500/30'
                }`}
              >
                🏠 RTL &amp; Touchdown
              </button>
            </div>
          </div>
        </div>

        {/* ROS 2 Telemetry & Avionics Diagnostics (Right 4 Cols) */}
        <div className="lg:col-span-4 space-y-3.5">
          {/* Motor ESC Outputs Card */}
          <div className="p-4 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-[#253247] pb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                4-MOTOR ESC PWM SIGNALS
              </span>
              <span className="text-[10px] text-slate-400">DShot600 Protocol</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {[
                { name: 'M1 (Front-L CW)', pwm: escPwm[0] },
                { name: 'M2 (Front-R CCW)', pwm: escPwm[1] },
                { name: 'M3 (Rear-L CCW)', pwm: escPwm[2] },
                { name: 'M4 (Rear-R CW)', pwm: escPwm[3] },
              ].map((m, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-[#0D1525] border border-[#253247]">
                  <span className="text-slate-400 text-[10px] block">{m.name}</span>
                  <div className="flex justify-between items-baseline mt-1">
                    <span className="text-emerald-400 font-bold">{m.pwm} µs</span>
                    <span className="text-[10px] text-slate-500">
                      {Math.round(((m.pwm - 1000) / 1000) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ROS 2 DDS Active Topics */}
          <div className="p-4 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-2.5 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-[#253247] pb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#38BDF8]" />
                ROS 2 uORB TOPICS
              </span>
              <span className="text-[10px] text-emerald-400">micro-XRCE-DDS</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="p-2 rounded-lg bg-[#0D1525] border border-[#253247]/70">
                <span className="text-[#38BDF8] block">/fmu/out/vehicle_odometry</span>
                <span className="text-slate-400 text-[10px]">
                  pos: [{coords.x}, {coords.y}, {coords.z}] vel: {groundSpeed.toFixed(1)} m/s
                </span>
              </div>

              <div className="p-2 rounded-lg bg-[#0D1525] border border-[#253247]/70">
                <span className="text-[#8B5CF6] block">/fmu/in/trajectory_setpoint</span>
                <span className="text-slate-400 text-[10px]">
                  target NED: [{coords.x}, {coords.y}, {coords.z}]
                </span>
              </div>

              <div className="p-2 rounded-lg bg-[#0D1525] border border-[#253247]/70">
                <span className="text-emerald-400 block">/sensors/imu</span>
                <span className="text-slate-400 text-[10px]">
                  pitch: {pitchDeg}° roll: {rollDeg}° yaw: {headingDeg}°
                </span>
              </div>
            </div>
          </div>

          {/* Engineering SITL Technology Notes */}
          <div className="p-4 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-2 text-xs">
            <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider block">
              PX4 &amp; GAZEBO SIMULATION ARCHITECTURE
            </span>
            <p className="text-[#94A3B8] text-[11px] leading-relaxed">
              Software-in-the-loop (SITL) compiles the identical C++ PX4 flight controller stack running on physical Pixhawk hardware and connects it to Gazebo Garden physics engines via lockstep clock synchronization.
            </p>

            <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Collision-Free Motion Planning with MoveIt 2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hardware & Systems Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
          <strong className="text-[#38BDF8] block mb-1">Brushless Outrunners &amp; ESCs:</strong>
          <p className="text-[#94A3B8] text-[11px] leading-relaxed">
            3-phase brushless motors modulated via DShot600 digital ESC protocol at 600 kHz, delivering sub-millisecond attitude correction torques.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
          <strong className="text-[#8B5CF6] block mb-1">Companion Computer &amp; ROS 2:</strong>
          <p className="text-[#94A3B8] text-[11px] leading-relaxed">
            Offboard companion computer streaming 4K optical gimbal frames and SLAM point-clouds for autonomous GPS-denied indoor navigation.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
          <strong className="text-emerald-400 block mb-1">Fail-Safe Geofencing &amp; RTL:</strong>
          <p className="text-[#94A3B8] text-[11px] leading-relaxed">
            Autonomous return-to-launch (RTL) trigger on low LiPo voltage (&lt;14.2V), loss of RC telemetry, or GPS dilution of precision (HDOP &gt; 2.0).
          </p>
        </div>
      </div>
    </div>
  );
};
