import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal as TerminalIcon,
  Shield,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  Lock,
  Wifi,
  Zap,
  Activity,
  Tv,
} from 'lucide-react';

interface TerminalLine {
  id: number;
  type: 'prompt' | 'cmd' | 'output' | 'system' | 'banner';
  text: string;
  color?: string;
  timestamp?: string;
}

interface Step {
  command: string;
  preDelayMs: number;
  typingDelayMs: number;
  outputs: Array<{
    text: string;
    color?: string;
    delayMs: number;
  }>;
  defcon: 'DEFCON 5' | 'DEFCON 4' | 'DEFCON 3' | 'DEFCON 2' | 'DEFCON 1';
  statusLabel: string;
  statusType: 'safe' | 'alert' | 'defending' | 'secured';
  threatTarget?: string;
  droppedIncrement?: number;
}

interface Scenario {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: any;
  steps: Step[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'nmap-recon',
    title: 'Port Recon & CVE Vulnerability Audit',
    badge: 'NMAP & VULN SCAN',
    description: 'Autonomous stealth SYN port enumeration and CVE signature matching across IoT network devices.',
    icon: Activity,
    steps: [
      {
        command: 'nmap -sS -sV -T4 -p 21,22,80,443,1883,8080 --script=vuln 192.168.1.105',
        preDelayMs: 400,
        typingDelayMs: 25,
        defcon: 'DEFCON 3',
        statusLabel: 'SCANNING TARGET INFRASTRUCTURE',
        statusType: 'alert',
        threatTarget: '192.168.1.105 (ESP32 IoT Node)',
        droppedIncrement: 0,
        outputs: [
          { text: 'Starting Nmap 7.94 ( https://nmap.org ) at 2024-11-10 18:24 UTC', color: 'text-slate-400', delayMs: 150 },
          { text: 'Initiating SYN Stealth Scan against 192.168.1.105 [6 ports]...', color: 'text-cyan-400', delayMs: 250 },
          { text: '[+] Discovered open port 22/tcp   [OpenSSH 8.9p1 Ubuntu-3ubuntu0.4 - Key Auth Only]', color: 'text-emerald-400', delayMs: 200 },
          { text: '[+] Discovered open port 80/tcp   [Nginx 1.18.0 - Embedded Web Dashboard]', color: 'text-emerald-400', delayMs: 200 },
          { text: '[!] Discovered open port 1883/tcp [Eclipse Mosquitto MQTT v2.0.14 - IoT Telemetry]', color: 'text-amber-400', delayMs: 220 },
          { text: '[+] Discovered open port 8080/tcp [Node.js Express Microservice API]', color: 'text-emerald-400', delayMs: 180 },
          { text: '----------------------------------------------------------------------', color: 'text-slate-600', delayMs: 100 },
          { text: '|-- [VULNERABILITY DETECTED]: CVE-2023-38606 (MQTT Unauthenticated Publish)', color: 'text-red-400 font-bold', delayMs: 250 },
          { text: '|   Severity Score: CVSS 7.8 [HIGH RISK] // Potential unauthenticated relay command injection', color: 'text-amber-300', delayMs: 200 },
          { text: '|   Impact Analysis: An adversary on the local subnet could forge alcohol safety overrides', color: 'text-slate-400', delayMs: 180 },
          { text: '|_  Remediation: Enforce mutual TLS 1.3 client certificates + strict topic ACLs', color: 'text-cyan-300', delayMs: 220 },
          { text: '[✓] Nmap scan complete: 4 open ports mapped. Zero zero-day exploits allowed.', color: 'text-emerald-400 font-bold', delayMs: 200 },
        ],
      },
    ],
  },
  {
    id: 'brute-force-defense',
    title: 'Active Intrusion & Firewall Countermeasures',
    badge: 'FAIL2BAN & NETFILTER',
    description: 'Real-time detection of distributed SSH brute-force attack followed by instant iptables kernel isolation.',
    icon: Shield,
    steps: [
      {
        command: 'tail -f /var/log/auth.log | grep --line-buffered -E "Failed password|ALERT"',
        preDelayMs: 400,
        typingDelayMs: 25,
        defcon: 'DEFCON 2',
        statusLabel: 'BRUTE FORCE ATTACK IN PROGRESS',
        statusType: 'alert',
        threatTarget: '185.220.101.5 (External Rogue IP)',
        droppedIncrement: 140,
        outputs: [
          { text: '[ALERT 18:24:01] Failed password for invalid user root from 185.220.101.5 port 49210 ssh2', color: 'text-red-400', delayMs: 160 },
          { text: '[ALERT 18:24:02] Failed password for invalid user admin from 185.220.101.5 port 49214 ssh2', color: 'text-red-400', delayMs: 160 },
          { text: '[ALERT 18:24:03] Failed password for user esp32 from 45.146.165.37 port 38102 ssh2', color: 'text-red-400', delayMs: 180 },
          { text: '[CRITICAL]: SSH Dictionary Flood detected! Threat threshold exceeded (42 attempts/sec).', color: 'text-red-400 font-bold animate-pulse', delayMs: 220 },
        ],
      },
      {
        command: 'sudo fail2ban-client set ssh-ddos banip 185.220.101.5 && sudo iptables -A INPUT -s 185.220.101.5,45.146.165.37 -j DROP',
        preDelayMs: 300,
        typingDelayMs: 22,
        defcon: 'DEFCON 5',
        statusLabel: 'THREAT QUARANTINED // ATTACK MITIGATED',
        statusType: 'secured',
        threatTarget: 'Banned IPs: 185.220.101.5, 45.146.165.37',
        droppedIncrement: 840,
        outputs: [
          { text: '[+] fail2ban: IP 185.220.101.5 added to jail [ssh-ddos] (Duration: 86400s)', color: 'text-cyan-400', delayMs: 150 },
          { text: '[+] iptables: Netfilter kernel rule inserted: DROP src=185.220.101.5 proto=tcp', color: 'text-cyan-400', delayMs: 160 },
          { text: '[+] iptables: Netfilter kernel rule inserted: DROP src=45.146.165.37 proto=tcp', color: 'text-cyan-400', delayMs: 160 },
          { text: '[*] Terminating active TCP half-open embryonic handshakes... [DONE]', color: 'text-slate-400', delayMs: 180 },
          { text: '======================================================================', color: 'text-slate-600', delayMs: 80 },
          { text: '[SHIELD ENGAGED]: 980 Malicious SYN Packets Dropped at Kernel Level.', color: 'text-emerald-400 font-bold', delayMs: 200 },
          { text: '[STATUS]: System Integrity 100%. Zero unauthorized sessions established.', color: 'text-emerald-300', delayMs: 180 },
        ],
      },
    ],
  },
  {
    id: 'firmware-crypto',
    title: 'ESP32 Firmware Extraction & Hash Verification',
    badge: 'BINWALK & SHA-256',
    description: 'Reverse engineering microcontroller binary flash images and cryptographic tamper validation.',
    icon: Lock,
    steps: [
      {
        command: 'esptool.py --chip esp32 --port /dev/ttyUSB0 read_flash 0x10000 0x40000 esp32_firmware_dump.bin',
        preDelayMs: 400,
        typingDelayMs: 22,
        defcon: 'DEFCON 4',
        statusLabel: 'READING ESP32 HARDWARE FLASH',
        statusType: 'safe',
        threatTarget: 'ESP32-D0WD-V3 (Xtensa 240MHz)',
        droppedIncrement: 0,
        outputs: [
          { text: 'esptool.py v4.7.0 -- Connecting to ESP32 on /dev/ttyUSB0 (Baud: 921600)...', color: 'text-slate-400', delayMs: 160 },
          { text: 'Chip ID: ESP32-D0WD-V3 (rev v3.1) | MAC: 40:22:D8:E9:FA:C0 | Features: Wi-Fi, BT, Dual-Core', color: 'text-cyan-400', delayMs: 200 },
          { text: 'Reading 262,144 bytes from 0x10000 [================================] 100% (2.1s)', color: 'text-emerald-400', delayMs: 250 },
          { text: '[+] Flash image dump verified: esp32_firmware_dump.bin (256 KB)', color: 'text-emerald-400 font-bold', delayMs: 180 },
        ],
      },
      {
        command: 'binwalk -B -E esp32_firmware_dump.bin && sha256sum esp32_firmware_dump.bin',
        preDelayMs: 300,
        typingDelayMs: 20,
        defcon: 'DEFCON 5',
        statusLabel: 'CRYPTOGRAPHIC SIGNATURE TAMPER-FREE',
        statusType: 'secured',
        threatTarget: 'SHA-256 Digest Verified',
        droppedIncrement: 0,
        outputs: [
          { text: 'DECIMAL       HEXADECIMAL     DESCRIPTION', color: 'text-slate-500 font-bold', delayMs: 80 },
          { text: '0             0x00000000      ESP32 2nd stage bootloader header (CRC: 0x93FA02)', color: 'text-slate-300', delayMs: 120 },
          { text: '32768         0x00008000      Partition Table (nvs, otadata, phy_init, factory)', color: 'text-slate-300', delayMs: 120 },
          { text: '65536         0x00010000      FreeRTOS v10.4.3 Application Image (Xtensa 32-bit ELF)', color: 'text-cyan-300', delayMs: 140 },
          { text: 'Shannon Entropy: 7.9892 bits/byte (High Cryptographic Packing / AES-256 Storage)', color: 'text-purple-400', delayMs: 160 },
          { text: '----------------------------------------------------------------------', color: 'text-slate-600', delayMs: 80 },
          { text: '3e87c0a969dfb489ef09825b4be01cfa444b0f9bd3e06f971dc3895e7c85be82  esp32_firmware_dump.bin', color: 'text-amber-400 font-mono text-[11px]', delayMs: 180 },
          { text: '[✓] HASH MATCH: Official Golden Build v2.4 (Zero malicious rootkit injections found)', color: 'text-emerald-400 font-bold', delayMs: 200 },
        ],
      },
    ],
  },
  {
    id: 'wifi-sniff',
    title: '802.11 Wi-Fi RF Sniffing & Handshake Analysis',
    badge: 'AIRODUMP & PACKETS',
    description: 'Promiscuous mode 802.11 frame capture and WPA2 4-Way cryptographic nonce validation.',
    icon: Wifi,
    steps: [
      {
        command: 'sudo airodump-ng wlan0mon --bssid 40:22:D8:E9:FA:C0 -c 6',
        preDelayMs: 400,
        typingDelayMs: 25,
        defcon: 'DEFCON 3',
        statusLabel: 'MONITORING 2.4GHz RF SPECTRUM',
        statusType: 'alert',
        threatTarget: 'BSSID: 40:22:D8:E9:FA:C0',
        droppedIncrement: 30,
        outputs: [
          { text: 'CH  6 ][ Elapsed: 6 s ][ 2024-11-10 18:24:45 ][ Interface: wlan0mon (Monitor Mode)', color: 'text-slate-400', delayMs: 150 },
          { text: 'BSSID              PWR  Beacons    #Data, #/s  CH   MB   ENC CIPHER  AUTH ESSID', color: 'text-cyan-400 font-bold', delayMs: 120 },
          { text: '40:22:D8:E9:FA:C0  -38      114       382   28   6  130   WPA2 CCMP   PSK  ESP32_SAFETY_NET', color: 'text-slate-200', delayMs: 160 },
          { text: ' ', color: 'text-slate-600', delayMs: 50 },
          { text: 'STATION            PWR   Rate    Lost    Frames  Probe     Security Event', color: 'text-cyan-400 font-bold', delayMs: 120 },
          { text: 'C4:D9:87:11:A2:3F  -42   54 -54      0       218  [AP]      [EAPOL Key 1/4 - ANonce Broadcast]', color: 'text-slate-300', delayMs: 140 },
          { text: 'C4:D9:87:11:A2:3F  -42   54 -54      0       219  [AP]      [EAPOL Key 2/4 - SNonce + MIC]', color: 'text-slate-300', delayMs: 140 },
          { text: 'C4:D9:87:11:A2:3F  -42   54 -54      0       220  [AP]      [EAPOL Key 3/4 - GTK Encryption]', color: 'text-slate-300', delayMs: 140 },
          { text: 'C4:D9:87:11:A2:3F  -42   54 -54      0       221  [AP]      [WPA2 4-WAY HANDSHAKE CAPTURED]', color: 'text-emerald-400 font-bold animate-pulse', delayMs: 200 },
          { text: '[+] Pairwise Transient Key (PTK) validated. Replay counter synchronized.', color: 'text-emerald-300', delayMs: 180 },
        ],
      },
    ],
  },
  {
    id: 'matrix-hud',
    title: 'Hollywood Matrix Cyber Defense HUD',
    badge: 'MATRIX DEFENSE STREAM',
    description: 'High-speed kernel memory inspection, live hex dump disassembler, and automated cyber shield.',
    icon: Zap,
    steps: [
      {
        command: 'cyber-hud --stream --live-telemetry --neural-firewall-active',
        preDelayMs: 300,
        typingDelayMs: 20,
        defcon: 'DEFCON 1',
        statusLabel: 'ENGAGING FULL SPECTRUM CYBER MATRIX',
        statusType: 'defending',
        threatTarget: 'Kernel Netfilter Ring 0',
        droppedIncrement: 620,
        outputs: [
          { text: '>> INITIALIZING HOLLYWOOD CYBERSECURITY KERNEL DEFENSE SUITE v4.1 <<', color: 'text-emerald-400 font-bold tracking-wider', delayMs: 120 },
          { text: '0x7FFF5FBFF8C0: 48 89 E5 48 83 EC 20 48 89 7D E8 48 89 75 F0 48  [NETFILTER_HOOK]', color: 'text-emerald-400/90 font-mono', delayMs: 90 },
          { text: '0x7FFF5FBFF8D0: 8B 45 E8 48 8B 40 18 48 89 45 F8 48 8B 45 F8 48  [ZERO-DAY_FILTER]', color: 'text-emerald-400/90 font-mono', delayMs: 90 },
          { text: '0x7FFF5FBFF8E0: 8B 40 08 48 89 45 FC B8 00 00 00 00 C9 C3 90 90  [MEMORY_INTEGRITY]', color: 'text-emerald-400/90 font-mono', delayMs: 90 },
          { text: '0x7FFF5FBFF8F0: 55 48 89 E5 48 83 EC 10 89 7D FC 83 7D FC 00 75  [BUFFER_OVERFLOW_GUARD]', color: 'text-cyan-400 font-mono', delayMs: 90 },
          { text: '>> DEPLOYING DEEP PACKET INSPECTION (DPI) CIPHER MESH <<', color: 'text-cyan-300 font-bold', delayMs: 150 },
          { text: '[FIREWALL RING-0]: Active Sockets: 4 | Malicious IP Drops: 1,840 | Enc: AES-256-GCM', color: 'text-amber-400', delayMs: 140 },
          { text: '[DEFENSE POSTURE: HARDENED] All security perimeters green. Tamper-evident logging active.', color: 'text-emerald-400 font-bold', delayMs: 160 },
        ],
      },
    ],
  },
];

export const CyberSecurityTerminal: React.FC = () => {
  // Scenario & execution state
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 2 | 4>(1);
  const [enableCrt, setEnableCrt] = useState(true);

  // Terminal lines & typing state
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    {
      id: 1,
      type: 'banner',
      text: '╔════════════════════════════════════════════════════════════════════════╗\n║  KALI LINUX 2024.3 (x86_64) // ETHICAL CYBER DEFENSE SIMULATOR         ║\n║  HOST: kali-robotics // KERNEL: 6.8.0-kali-amd64 // USER: shubham-lab  ║\n╚════════════════════════════════════════════════════════════════════════╝',
      color: 'text-cyan-400',
    },
    {
      id: 2,
      type: 'system',
      text: '[SYS-INIT] Defensive telemetry active. Auto-hack simulation engine loaded.',
      color: 'text-slate-400',
    },
  ]);

  const [currentTypingCmd, setCurrentTypingCmd] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Live Threat Telemetry
  const [defconLevel, setDefconLevel] = useState<'DEFCON 5' | 'DEFCON 4' | 'DEFCON 3' | 'DEFCON 2' | 'DEFCON 1'>('DEFCON 4');
  const [statusLabel, setStatusLabel] = useState('SYSTEM SECURE // MONITORING');
  const [statusType, setStatusType] = useState<'safe' | 'alert' | 'defending' | 'secured'>('safe');
  const [threatTarget, setThreatTarget] = useState('192.168.1.104 (Subnet Master)');
  const [droppedPackets, setDroppedPackets] = useState(1420);
  const [activeSockets, setActiveSockets] = useState(6);
  const [cpuUsage, setCpuUsage] = useState(18);

  // Interactive user manual command line
  const [manualInput, setManualInput] = useState('');

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const lineCounterRef = useRef(10);
  const isExecutingRef = useRef(false);

  // Auto-scroll terminal on updates
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalLines, currentTypingCmd]);

  // Jitter CPU & Packet counters slightly for Hollywood realism
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((prev) => {
        const next = Math.max(12, Math.min(88, prev + Math.floor(Math.random() * 7) - 3));
        return next;
      });
      if (statusType === 'alert' || statusType === 'defending') {
        setDroppedPackets((p) => p + Math.floor(Math.random() * 5) + 1);
        setActiveSockets((s) => Math.min(14, s + 1));
      } else {
        setActiveSockets((s) => Math.max(4, s - 1));
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [statusType]);

  // Main Auto-Typing & Execution Engine
  useEffect(() => {
    let isCancelled = false;

    if (!isPlaying) return;

    const runScenario = async () => {
      if (isExecutingRef.current) return;
      isExecutingRef.current = true;

      const scenario = SCENARIOS[activeScenarioIdx];

      for (let sIdx = 0; sIdx < scenario.steps.length; sIdx++) {
        if (isCancelled) break;
        const step = scenario.steps[sIdx];

        // 1. Pre-delay
        await new Promise((res) => setTimeout(res, step.preDelayMs / speedMultiplier));
        if (isCancelled) break;

        // 2. Type command character-by-character
        setIsTyping(true);
        setCurrentTypingCmd('');
        for (let c = 0; c <= step.command.length; c++) {
          if (isCancelled) break;
          setCurrentTypingCmd(step.command.slice(0, c));
          const jitter = Math.random() * 15;
          await new Promise((res) => setTimeout(res, (step.typingDelayMs + jitter) / speedMultiplier));
        }

        if (isCancelled) break;
        setIsTyping(false);

        // Pause after finishing typing command
        await new Promise((res) => setTimeout(res, 350 / speedMultiplier));
        if (isCancelled) break;

        // Push command to history
        const cmdId = ++lineCounterRef.current;
        setTerminalLines((prev) => [
          ...prev,
          {
            id: cmdId,
            type: 'cmd',
            text: step.command,
          },
        ]);
        setCurrentTypingCmd('');

        // Update telemetry
        setDefconLevel(step.defcon);
        setStatusLabel(step.statusLabel);
        setStatusType(step.statusType);
        if (step.threatTarget) setThreatTarget(step.threatTarget);
        if (typeof step.droppedIncrement === 'number') {
          const inc = step.droppedIncrement;
          setDroppedPackets((p) => p + inc);
        }

        // 3. Stream outputs sequentially
        for (const out of step.outputs) {
          if (isCancelled) break;
          await new Promise((res) => setTimeout(res, out.delayMs / speedMultiplier));
          if (isCancelled) break;

          const outId = ++lineCounterRef.current;
          setTerminalLines((prev) => [
            ...prev,
            {
              id: outId,
              type: 'output',
              text: out.text,
              color: out.color,
            },
          ]);
        }

        // Small delay between steps
        await new Promise((res) => setTimeout(res, 800 / speedMultiplier));
      }

      // Completed scenario: wait before cycling to next scenario
      if (!isCancelled) {
        await new Promise((res) => setTimeout(res, 3000 / speedMultiplier));
        if (!isCancelled && isPlaying) {
          // Add spacer
          setTerminalLines((prev) => [
            ...prev,
            {
              id: ++lineCounterRef.current,
              type: 'system',
              text: `[SCENARIO COMPLETE] Advancing to next ethical security vector...`,
              color: 'text-cyan-400 font-bold',
            },
          ]);
          setActiveScenarioIdx((prev) => (prev + 1) % SCENARIOS.length);
        }
      }

      isExecutingRef.current = false;
    };

    runScenario();

    return () => {
      isCancelled = true;
      isExecutingRef.current = false;
    };
  }, [activeScenarioIdx, isPlaying, speedMultiplier]);

  // Handle Scenario Pill Click
  const handleSelectScenario = (idx: number) => {
    setActiveScenarioIdx(idx);
    setIsPlaying(true);
    isExecutingRef.current = false;
    setCurrentTypingCmd('');
    setIsTyping(false);
  };

  // Restart / Reset
  const handleResetTerminal = () => {
    setCurrentTypingCmd('');
    setIsTyping(false);
    isExecutingRef.current = false;
    setTerminalLines([
      {
        id: ++lineCounterRef.current,
        type: 'banner',
        text: '╔════════════════════════════════════════════════════════════════════════╗\n║  TERMINAL BUFFER CLEARED // RESETTING DEFENSIVE COUNTERMEASURES         ║\n╚════════════════════════════════════════════════════════════════════════╝',
        color: 'text-cyan-400',
      },
      {
        id: ++lineCounterRef.current,
        type: 'system',
        text: `[READY] Restarting Scenario: ${SCENARIOS[activeScenarioIdx].title}`,
        color: 'text-slate-400',
      },
    ]);
    // Force re-trigger by toggling scenario
    const cur = activeScenarioIdx;
    setActiveScenarioIdx(-1);
    setTimeout(() => setActiveScenarioIdx(cur), 50);
  };

  // Command Executor for form submit and quick action pills
  const executeCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim();
    if (!cmd) return;

    // Pause auto-playback when user manually interacts
    setIsPlaying(false);

    const cmdLower = cmd.toLowerCase();
    const newLines: TerminalLine[] = [
      {
        id: ++lineCounterRef.current,
        type: 'cmd',
        text: cmd,
      },
    ];

    if (cmdLower === 'clear') {
      setTerminalLines([]);
      setManualInput('');
      return;
    } else if (cmdLower === 'help') {
      newLines.push({
        id: ++lineCounterRef.current,
        type: 'output',
        text: `AVAILABLE CYBER COMMANDS:\n  • auto        - Resume automated Hollywood movie simulation\n  • pause       - Pause current simulation\n  • scan        - Run Port & CVE Vulnerability scan\n  • defense     - Trigger Active Brute-Force Netfilter Quarantine\n  • firmware    - Dump and inspect ESP32 flash binary\n  • wifi        - Sniff 802.11 frames and capture 4-way handshake\n  • matrix      - Launch Matrix real-time kernel defense HUD\n  • status      - Print active DEFCON rating & socket stats\n  • whoami      - Display security clearance profile\n  • clear       - Flush terminal buffer`,
        color: 'text-cyan-300',
      });
    } else if (cmdLower === 'auto') {
      setIsPlaying(true);
      newLines.push({
        id: ++lineCounterRef.current,
        type: 'output',
        text: '[+] Resuming automated Hollywood cyber security simulation engine...',
        color: 'text-emerald-400',
      });
    } else if (cmdLower === 'pause') {
      setIsPlaying(false);
      newLines.push({
        id: ++lineCounterRef.current,
        type: 'output',
        text: '[*] Simulation paused. Interactive manual prompt active.',
        color: 'text-amber-400',
      });
    } else if (cmdLower === 'scan') {
      handleSelectScenario(0);
      setManualInput('');
      return;
    } else if (cmdLower === 'defense') {
      handleSelectScenario(1);
      setManualInput('');
      return;
    } else if (cmdLower === 'firmware') {
      handleSelectScenario(2);
      setManualInput('');
      return;
    } else if (cmdLower === 'wifi') {
      handleSelectScenario(3);
      setManualInput('');
      return;
    } else if (cmdLower === 'matrix') {
      handleSelectScenario(4);
      setManualInput('');
      return;
    } else if (cmdLower === 'whoami') {
      newLines.push({
        id: ++lineCounterRef.current,
        type: 'output',
        text: 'shubham-verma // Security Research Clearance: TIER-1 (Embedded & Linux Systems)',
        color: 'text-emerald-400 font-bold',
      });
    } else if (cmdLower === 'status') {
      newLines.push({
        id: ++lineCounterRef.current,
        type: 'output',
        text: `DEFCON STATUS: ${defconLevel} | THREAT: ${statusLabel}\nPACKETS DROPPED: ${droppedPackets} | ACTIVE SOCKETS: ${activeSockets} | CPU: ${cpuUsage}%`,
        color: 'text-amber-300 font-mono',
      });
    } else {
      newLines.push({
        id: ++lineCounterRef.current,
        type: 'output',
        text: `bash: ${cmd}: command executed in virtual security sandbox. Type 'help' for guidance or click [▶ AUTO PLAY].`,
        color: 'text-slate-400',
      });
    }

    setTerminalLines((prev) => [...prev, ...newLines]);
    setManualInput('');
  };

  // Manual CLI Handler
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(manualInput);
  };

  const currentScenario = SCENARIOS[activeScenarioIdx] || SCENARIOS[0];

  return (
    <div className="space-y-6">
      {/* Top Header & Context */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#253247]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              LAB C // LINUX &amp; ETHICAL CYBERSECURITY ENVIRONMENT
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              HOLLYWOOD HACK SIMULATOR
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] font-sans mt-1">
            Interactive Ethical Cyber Warfare &amp; Defense Lab
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Live auto-typing ethical cybersecurity simulation demonstrating real-world penetration auditing, CVE mitigation, firmware verification, and netfilter kernel defenses.
          </p>
        </div>

        {/* Global Controls: Play/Pause, Speed, CRT, Reset */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Play / Pause Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shadow-md ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 animate-pulse'
            }`}
            title={isPlaying ? 'Pause Auto-Typing' : 'Start Auto-Typing'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>AUTO PLAY</span>
              </>
            )}
          </button>

          {/* Speed Multiplier */}
          <div className="flex items-center rounded-xl bg-[#111B2B] border border-[#253247] p-0.5 text-xs font-mono">
            {([1, 2, 4] as const).map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeedMultiplier(spd)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  speedMultiplier === spd
                    ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* CRT Scanline Toggle */}
          <button
            onClick={() => setEnableCrt(!enableCrt)}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-mono border transition-all ${
              enableCrt
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                : 'bg-[#111B2B] text-[#94A3B8] border-[#253247] hover:text-white'
            }`}
            title="Toggle CRT Screen Scanlines"
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CRT SCAN</span>
          </button>

          {/* Reset / Replay */}
          <button
            onClick={handleResetTerminal}
            className="p-1.5 rounded-xl bg-[#111B2B] hover:bg-[#1E293B] text-[#94A3B8] hover:text-white border border-[#253247] transition-all"
            title="Reset & Replay Current Scenario"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scenario Selector Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono text-[#94A3B8] uppercase mr-1">SCENARIOS:</span>
        {SCENARIOS.map((sc, idx) => {
          const Icon = sc.icon;
          const isActive = activeScenarioIdx === idx;
          return (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(idx)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#38BDF8]/20 to-[#8B5CF6]/20 border-2 border-[#38BDF8] text-white font-bold shadow-lg shadow-[#38BDF8]/10'
                  : 'bg-[#0E1524] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#152033] border border-[#253247]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#38BDF8]' : 'text-slate-500'}`} />
              <span>{sc.badge}</span>
            </button>
          );
        })}
      </div>

      {/* Main Terminal + Telemetry HUD Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Terminal Window (Left 8 Cols) */}
        <div className="lg:col-span-8 space-y-2">
          <div className="relative rounded-2xl bg-[#050811] border-2 border-[#253247] shadow-2xl overflow-hidden font-mono text-xs">
            {/* Retro CRT Scanlines Overlay */}
            {enableCrt && (
              <div
                className="pointer-events-none absolute inset-0 z-20 opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0px, rgba(0, 0, 0, 0.45) 1px, transparent 1px, transparent 2px)',
                }}
              />
            )}

            {/* Glowing phosphor edge accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#38BDF8] via-emerald-400 to-[#8B5CF6] z-30" />

            {/* Window Titlebar */}
            <div className="px-4 py-2.5 bg-[#0A0F1D] border-b border-[#253247] flex items-center justify-between text-[#94A3B8] select-none z-30 relative">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block shadow-sm shadow-red-500/50" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm shadow-amber-500/50" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm shadow-emerald-500/50" />
                <span className="ml-2 font-bold text-[#F8FAFC] tracking-wide flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>kali@cyber-defense: ~/security_lab</span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="hidden sm:inline-block text-slate-500 font-mono">bash 5.2.21</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalBodyRef}
              className="p-5 space-y-2 min-h-[380px] max-h-[460px] overflow-y-auto scroll-smooth text-[#94A3B8] leading-relaxed relative z-10"
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              }}
            >
              {terminalLines.map((line) => {
                if (line.type === 'banner') {
                  return (
                    <pre
                      key={line.id}
                      className="text-cyan-400/90 font-bold text-[10px] sm:text-[11px] whitespace-pre-wrap leading-tight py-1 bg-cyan-950/20 rounded p-2 border border-cyan-800/30"
                    >
                      {line.text}
                    </pre>
                  );
                }
                if (line.type === 'cmd') {
                  return (
                    <div key={line.id} className="pt-2 text-white">
                      <span className="text-emerald-400 font-bold">kali@cyber-defense</span>
                      <span className="text-[#94A3B8]">:</span>
                      <span className="text-[#38BDF8]">~</span>
                      <span className="text-[#94A3B8]">$ </span>
                      <span className="text-white font-semibold">{line.text}</span>
                    </div>
                  );
                }
                if (line.type === 'system') {
                  return (
                    <div key={line.id} className={`text-[11px] italic ${line.color || 'text-slate-400'}`}>
                      {line.text}
                    </div>
                  );
                }
                // Output lines
                return (
                  <div
                    key={line.id}
                    className={`pl-2 whitespace-pre-wrap font-mono text-[11px] sm:text-xs leading-5 ${
                      line.color || 'text-slate-300'
                    }`}
                  >
                    {line.text}
                  </div>
                );
              })}

              {/* Live typing command row */}
              {isTyping && (
                <div className="pt-1 text-white">
                  <span className="text-emerald-400 font-bold">kali@cyber-defense</span>
                  <span className="text-[#94A3B8]">:</span>
                  <span className="text-[#38BDF8]">~</span>
                  <span className="text-[#94A3B8]">$ </span>
                  <span className="text-[#F8FAFC] font-semibold">{currentTypingCmd}</span>
                  <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
                </div>
              )}

              {/* Manual Input Form */}
              {!isTyping && (
                <form onSubmit={handleManualSubmit} className="flex items-center gap-2 pt-2 text-[#38BDF8]">
                  <span className="text-emerald-400 font-bold">kali@cyber-defense</span>
                  <span className="text-[#94A3B8]">:</span>
                  <span className="text-[#38BDF8]">~</span>
                  <span className="text-[#94A3B8]">$</span>
                  <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Type commands (e.g. scan, defense, firmware, wifi, matrix, help, auto)"
                    className="flex-1 bg-transparent text-white outline-none border-none p-0 focus:ring-0 text-xs font-mono placeholder:text-slate-600"
                  />
                  <span className="inline-block w-2 h-3.5 bg-emerald-400 animate-pulse" />
                </form>
              )}
            </div>

            {/* Bottom Status Ribbon */}
            <div className="px-4 py-2 bg-[#0A0F1D] border-t border-[#253247] flex flex-wrap items-center justify-between text-[11px] text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">ACTIVE VECTOR:</span>
                <span className="text-[#38BDF8] font-bold font-mono">{currentScenario.title}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span>Speed: {speedMultiplier}x</span>
                <span>•</span>
                <span className={isPlaying ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                  {isPlaying ? '▶ LIVE STREAMING' : '⏸ PAUSED'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry & Threat Radar HUD (Right 4 Cols) */}
        <div className="lg:col-span-4 space-y-3.5">
          {/* Real-Time DEFCON Threat Badge */}
          <div className="p-4 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">DEFCON POSTURE</span>
              <span
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold border flex items-center gap-1.5 ${
                  defconLevel === 'DEFCON 2' || defconLevel === 'DEFCON 1'
                    ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
                    : defconLevel === 'DEFCON 3'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{defconLevel}</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0D1525] border border-[#253247]">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">THREAT MONITOR</span>
              <span
                className={`text-xs font-bold font-mono mt-0.5 block ${
                  statusType === 'alert'
                    ? 'text-red-400'
                    : statusType === 'defending'
                    ? 'text-cyan-400'
                    : 'text-emerald-400'
                }`}
              >
                {statusLabel}
              </span>
              <span className="text-[10px] text-slate-400 font-mono mt-1 block truncate">
                Target: {threatTarget}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#0D1525] border border-[#253247]">
                <span className="text-[10px] text-slate-500 block">DROPPED PACKETS</span>
                <span className="text-base font-bold text-red-400">
                  {droppedPackets.toLocaleString()}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0D1525] border border-[#253247]">
                <span className="text-[10px] text-slate-500 block">ACTIVE SOCKETS</span>
                <span className="text-base font-bold text-cyan-400">{activeSockets} ESTAB</span>
              </div>
            </div>

            {/* CPU & Memory Gauges */}
            <div className="space-y-1.5 pt-1 text-[11px] font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Kernel Netfilter CPU:</span>
                <span className="text-white font-bold">{cpuUsage}%</span>
              </div>
              <div className="w-full h-2 bg-[#0D1525] rounded-full overflow-hidden border border-[#253247]">
                <div
                  className={`h-full transition-all duration-500 ${
                    cpuUsage > 60 ? 'bg-red-500' : 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                  }`}
                  style={{ width: `${cpuUsage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Hardened System Specifications Card */}
          <div className="p-4 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-2.5 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-400 border-b border-[#253247] pb-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-white text-[11px]">HARDENED DEFENSE POSTURE</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Target Kernel:</span>
                <span className="text-cyan-300">Linux 6.8 (x86_64)</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">SSH Security:</span>
                <span className="text-emerald-400">Ed25519 Keys Only</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Firewall Engine:</span>
                <span className="text-emerald-400">iptables + Fail2ban</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Firmware Auth:</span>
                <span className="text-emerald-400">SHA-256 Digest Pin</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">RF Interface:</span>
                <span className="text-purple-300">wlan0mon (Monitor)</span>
              </div>
            </div>
          </div>

          {/* Quick Command Pills for User */}
          <div className="p-3.5 rounded-2xl bg-[#070A12] border-2 border-[#253247] space-y-2">
            <span className="text-[10px] font-mono text-[#94A3B8] uppercase block">
              ONE-CLICK CYBER COMMANDS:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Port Scan', cmd: 'scan' },
                { label: 'Brute-Force Ban', cmd: 'defense' },
                { label: 'ESP32 Firmware', cmd: 'firmware' },
                { label: 'Wi-Fi Sniff', cmd: 'wifi' },
                { label: 'Matrix HUD', cmd: 'matrix' },
                { label: 'Resume Auto', cmd: 'auto' },
                { label: 'Clear', cmd: 'clear' },
              ].map((c) => (
                <button
                  key={c.cmd}
                  onClick={() => executeCommand(c.cmd)}
                  className="px-2 py-1 rounded bg-[#111B2B] hover:bg-[#1C283C] text-slate-300 hover:text-white border border-[#253247] text-[10px] font-mono transition-colors"
                >
                  ${c.cmd}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cyber Technical Notes Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
          <strong className="text-[#38BDF8] block mb-1">Ethical Vulnerability Assessment:</strong>
          <p className="text-[#94A3B8] text-[11px] leading-relaxed">
            Nmap stealth SYN scans and CVE signature matching detect unencrypted broker ports and protect IoT telemetry links prior to deployment.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
          <strong className="text-[#8B5CF6] block mb-1">Automated Kernel Netfilter:</strong>
          <p className="text-[#94A3B8] text-[11px] leading-relaxed">
            Fail2ban monitors system authentication daemons and dynamically drops malicious subnet packets directly at the Linux netfilter layer.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247]">
          <strong className="text-emerald-400 block mb-1">Microcontroller Firmware Auditing:</strong>
          <p className="text-[#94A3B8] text-[11px] leading-relaxed">
            Binwalk entropy curves and SHA-256 cryptographic signatures verify embedded ESP32 FreeRTOS binaries against physical tampering.
          </p>
        </div>
      </div>
    </div>
  );
};
