import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Eye, ShieldAlert } from 'lucide-react';

export const HeroRoboticArm3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [statusText, setStatusText] = useState('Autonomous Pick & Place');
  const [hasWebGL, setHasWebGL] = useState(true);

  // References to keep between renders
  const animRef = useRef<number | null>(null);
  const isPlayingRef = useRef(true);
  const resetRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 420;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070a12, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(4.5, 3.8, 5.2);
    camera.lookAt(0, 1.4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Advanced Laboratory Lighting
    const ambientLight = new THREE.AmbientLight(0x0c1220, 2.5);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0x38bdf8, 5, 20, Math.PI / 4, 0.3, 1);
    mainSpot.position.set(4, 7, 3);
    mainSpot.castShadow = true;
    mainSpot.shadow.bias = -0.001;
    scene.add(mainSpot);

    const violetFill = new THREE.PointLight(0x8b5cf6, 4, 15);
    violetFill.position.set(-4, 3, -2);
    scene.add(violetFill);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 1.5);
    cyanRim.position.set(0, 5, -4);
    scene.add(cyanRim);

    // Grid Floor
    const grid = new THREE.GridHelper(10, 20, 0x38bdf8, 0x253247);
    grid.position.y = 0;
    scene.add(grid);

    // Pedestal Platform
    const pedestalGeo = new THREE.CylinderGeometry(1.4, 1.6, 0.3, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x111b2b,
      roughness: 0.3,
      metalness: 0.8,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = 0.15;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // Glowing Pedestal Ring
    const ringGeo = new THREE.TorusGeometry(1.42, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.3;
    scene.add(ring);

    // -------------------------------------------------------------
    // Build Realistic Articulated Robotic Arm Hierarchy
    // -------------------------------------------------------------
    const armGroup = new THREE.Group();
    scene.add(armGroup);

    // Materials
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.25,
      metalness: 0.9,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.3,
      metalness: 0.7,
    });
    const jointMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.4,
      metalness: 0.85,
    });
    const objectMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.2,
      metalness: 0.6,
      emissive: 0x064e3b,
    });

    // 1. Base Turntable (Joint 0: Yaw rotation)
    const baseGroup = new THREE.Group();
    baseGroup.position.y = 0.3;
    armGroup.add(baseGroup);

    const baseTurret = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 0.4, 24), metalMat);
    baseTurret.position.y = 0.2;
    baseTurret.castShadow = true;
    baseGroup.add(baseTurret);

    // 2. Shoulder Joint & Link 1 (Joint 1: Pitch)
    const shoulderGroup = new THREE.Group();
    shoulderGroup.position.set(0, 0.4, 0);
    baseGroup.add(shoulderGroup);

    const shoulderJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.6, 24), jointMat);
    shoulderJoint.rotation.z = Math.PI / 2;
    shoulderJoint.castShadow = true;
    shoulderGroup.add(shoulderJoint);

    const link1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.4, 0.3), accentMat);
    link1.position.set(0, 0.7, 0);
    link1.castShadow = true;
    shoulderGroup.add(link1);

    // 3. Elbow Joint & Link 2 (Joint 2: Pitch)
    const elbowGroup = new THREE.Group();
    elbowGroup.position.set(0, 1.4, 0);
    shoulderGroup.add(elbowGroup);

    const elbowJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.5, 24), jointMat);
    elbowJoint.rotation.z = Math.PI / 2;
    elbowJoint.castShadow = true;
    elbowGroup.add(elbowJoint);

    const link2 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.2, 0.24), metalMat);
    link2.position.set(0, 0.6, 0);
    link2.castShadow = true;
    elbowGroup.add(link2);

    // 4. Wrist Joint (Joint 3: Pitch & Roll)
    const wristGroup = new THREE.Group();
    wristGroup.position.set(0, 1.2, 0);
    elbowGroup.add(wristGroup);

    const wristJoint = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), jointMat);
    wristJoint.castShadow = true;
    wristGroup.add(wristJoint);

    // Gripper Base
    const gripperBase = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.15, 0.3), accentMat);
    gripperBase.position.y = 0.15;
    wristGroup.add(gripperBase);

    // Gripper Left & Right Fingers
    const fingerLeft = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.28, 0.1), jointMat);
    fingerLeft.position.set(-0.1, 0.3, 0);
    wristGroup.add(fingerLeft);

    const fingerRight = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.28, 0.1), jointMat);
    fingerRight.position.set(0.1, 0.3, 0);
    wristGroup.add(fingerRight);

    // Target Microcontroller Payload Object (Pick and Place)
    const payloadGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const payload = new THREE.Mesh(payloadGeo, objectMat);
    payload.castShadow = true;
    scene.add(payload);

    // Initial Pick & Drop Positions
    const pickPos = new THREE.Vector3(1.3, 0.1, 0.8);
    const dropPos = new THREE.Vector3(-1.3, 0.1, 0.8);
    payload.position.copy(pickPos);

    // Pick & Place Targets (Two small glowing pads)
    const pad1 = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.04, 16), new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true }));
    pad1.position.copy(pickPos);
    pad1.position.y = 0.02;
    scene.add(pad1);

    const pad2 = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.04, 16), new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true }));
    pad2.position.copy(dropPos);
    pad2.position.y = 0.02;
    scene.add(pad2);

    // -------------------------------------------------------------
    // Animation Kinematics Loop
    // -------------------------------------------------------------
    let time = 0;

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);

      if (isPlayingRef.current) {
        time += 0.015;
      }

      // 4-Phase Periodic Kinematics Loop (Duration: 12 seconds)
      const loopTime = time % 12;

      let baseRot = 0;
      let shoulderRot = 0.3;
      let elbowRot = -0.5;
      let wristRot = 0.2;
      let fingerGrip = 0.1; // Finger distance

      if (loopTime < 3) {
        // Phase 1: Reach down to Pick Pad (Green)
        setStatusText('Kinematic Trajectory: Approaching Object');
        const t = loopTime / 3;
        baseRot = THREE.MathUtils.lerp(0, 0.55, t);
        shoulderRot = THREE.MathUtils.lerp(0.2, 0.85, t);
        elbowRot = THREE.MathUtils.lerp(-0.4, -1.3, t);
        wristRot = THREE.MathUtils.lerp(0.2, 0.45, t);
        fingerGrip = THREE.MathUtils.lerp(0.12, 0.08, t);

        // Object on pad
        payload.position.copy(pickPos);
        payload.position.y = 0.1;
      } else if (loopTime < 6) {
        // Phase 2: Grasp and Lift
        setStatusText('Gripper Actuation: Object Secured & Lifting');
        const t = (loopTime - 3) / 3;
        baseRot = THREE.MathUtils.lerp(0.55, 0, t);
        shoulderRot = THREE.MathUtils.lerp(0.85, 0.3, t);
        elbowRot = THREE.MathUtils.lerp(-1.3, -0.6, t);
        wristRot = THREE.MathUtils.lerp(0.45, 0.3, t);
        fingerGrip = 0.07; // Clamped tight

        // Object attached to gripper tip
        const gripperWorldPos = new THREE.Vector3();
        wristGroup.getWorldPosition(gripperWorldPos);
        payload.position.copy(gripperWorldPos);
        payload.position.y -= 0.1;
      } else if (loopTime < 9) {
        // Phase 3: Rotate across to Drop Pad (Cyan)
        setStatusText('Rotational Transport: Transferring Payload');
        const t = (loopTime - 6) / 3;
        baseRot = THREE.MathUtils.lerp(0, -0.6, t);
        shoulderRot = THREE.MathUtils.lerp(0.3, 0.85, t);
        elbowRot = THREE.MathUtils.lerp(-0.6, -1.3, t);
        wristRot = THREE.MathUtils.lerp(0.3, 0.45, t);
        fingerGrip = 0.07;

        const gripperWorldPos = new THREE.Vector3();
        wristGroup.getWorldPosition(gripperWorldPos);
        payload.position.copy(gripperWorldPos);
        payload.position.y -= 0.1;
      } else {
        // Phase 4: Release and Return to Home
        setStatusText('Target Released: Returning to Home Position');
        const t = (loopTime - 9) / 3;
        baseRot = THREE.MathUtils.lerp(-0.6, 0, t);
        shoulderRot = THREE.MathUtils.lerp(0.85, 0.2, t);
        elbowRot = THREE.MathUtils.lerp(-1.3, -0.4, t);
        wristRot = THREE.MathUtils.lerp(0.45, 0.2, t);
        fingerGrip = THREE.MathUtils.lerp(0.07, 0.12, t);

        // Object resting at drop position
        payload.position.copy(dropPos);
        payload.position.y = 0.1;
      }

      // Apply rotations
      baseGroup.rotation.y = baseRot;
      shoulderGroup.rotation.z = shoulderRot;
      elbowGroup.rotation.z = elbowRot;
      wristGroup.rotation.z = wristRot;

      // Finger clamping
      fingerLeft.position.x = -fingerGrip;
      fingerRight.position.x = fingerGrip;

      // Gentle camera orbit
      const camAngle = time * 0.1;
      camera.position.x = Math.sin(camAngle) * 5.2 + 0.5;
      camera.position.z = Math.cos(camAngle) * 5.2;
      camera.lookAt(0, 1.4, 0);

      renderer.render(scene, camera);
    };

    animate();

    resetRef.current = () => {
      time = 0;
      payload.position.copy(pickPos);
      baseGroup.rotation.set(0, 0, 0);
      shoulderGroup.rotation.set(0, 0, 0);
      elbowGroup.rotation.set(0, 0, 0);
      wristGroup.rotation.set(0, 0, 0);
    };

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl bg-[#080B12] border-2 border-[#263244] shadow-2xl overflow-hidden flex flex-col justify-between group">
      
      {/* 3D WebGL Canvas or Static Fallback */}
      {hasWebGL ? (
        <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0E1420]">
          <ShieldAlert className="w-10 h-10 text-amber-400 mb-2" />
          <p className="text-sm font-semibold text-[#F8FAFC]">3D Hardware Acceleration Fallback</p>
          <p className="text-xs text-[#94A3B8] mt-1">WebGL is disabled. Displaying high-precision static schematic.</p>
          <img src="/projects/ros2-drone.svg" alt="Schematic" className="w-48 mt-4 opacity-80" />
        </div>
      )}

      {/* Top Telemetry Overlay */}
      <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#0E1420]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#263244] shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
          <span className="text-[11px] font-mono text-[#38BDF8] font-bold uppercase tracking-wider">
            3D ROBOTICS SIMULATOR
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 bg-[#0E1420]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#263244] text-[10px] font-mono text-[#94A3B8]">
          <Eye className="w-3 h-3 text-[#38BDF8]" />
          <span>Real-time Kinematics Loop</span>
        </div>
      </div>

      {/* Bottom Status & Control Bar */}
      <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-t from-[#080B12] via-[#080B12]/80 to-transparent pt-6">
        <div>
          <span className="text-[10px] font-mono text-[#64748B] uppercase block">Arm Telemetry</span>
          <p className="text-xs font-mono font-semibold text-[#F8FAFC]">
            {statusText}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-[#141C2A] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#38BDF8] border border-[#263244] transition-colors"
            title={isPlaying ? "Pause 3D Arm Animation" : "Play 3D Arm Animation"}
            aria-label={isPlaying ? "Pause 3D Arm Animation" : "Play 3D Arm Animation"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => resetRef.current?.()}
            className="p-2 rounded-xl bg-[#141C2A] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#38BDF8] border border-[#263244] transition-colors"
            title="Reset to Home Position"
            aria-label="Reset to Home Position"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

