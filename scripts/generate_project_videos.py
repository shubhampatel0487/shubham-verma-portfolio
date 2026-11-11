import os
import sys
import math
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

WIDTH = 1920
HEIGHT = 1080
FPS = 30

FONT_TITLE = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
FONT_BODY = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
FONT_MONO = "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf"

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

font_title_xl = get_font(FONT_TITLE, 46)
font_title_lg = get_font(FONT_TITLE, 34)
font_title_md = get_font(FONT_TITLE, 26)
font_title_sm = get_font(FONT_TITLE, 20)
font_body = get_font(FONT_BODY, 19)
font_mono_lg = get_font(FONT_MONO, 24)
font_mono_md = get_font(FONT_MONO, 18)
font_mono_sm = get_font(FONT_MONO, 14)

def draw_hud(draw, title, subtitle, t_sec, total_sec):
    # Blueprint Grid
    for x in range(0, WIDTH, 50):
        draw.line([(x, 0), (x, HEIGHT)], fill=(15, 23, 42, 60), width=1)
    for y in range(0, HEIGHT, 50):
        draw.line([(0, y), (WIDTH, y)], fill=(15, 23, 42, 60), width=1)

    # Top Brand Bar
    draw.rectangle([(0, 0), (WIDTH, 75)], fill=(10, 16, 30))
    draw.line([(0, 75), (WIDTH, 75)], fill=(37, 50, 71), width=2)
    
    # Brand tag
    draw.rectangle([(30, 18), (240, 56)], fill=(17, 27, 43), outline=(56, 189, 248), width=1)
    draw.text((45, 26), "SHUBHAM PATEL", font=font_mono_md, fill=(56, 189, 248))
    
    draw.text((260, 22), title, font=font_title_md, fill=(248, 250, 252))
    draw.text((260, 50), subtitle, font=font_mono_sm, fill=(148, 163, 184))

    # Timecode
    time_str = f"TC: 00:00:{int(t_sec):02d}:{int((t_sec % 1) * 30):02d}"
    draw.rectangle([(WIDTH - 330, 18), (WIDTH - 30, 56)], fill=(17, 27, 43), outline=(139, 92, 246), width=1)
    draw.text((WIDTH - 315, 26), time_str, font=font_mono_md, fill=(192, 132, 252))

    # Bottom Timeline Bar
    draw.rectangle([(0, HEIGHT - 55), (WIDTH, HEIGHT)], fill=(10, 16, 30))
    draw.line([(0, HEIGHT - 55), (WIDTH, HEIGHT - 55)], fill=(37, 50, 71), width=2)
    
    # Progress Bar
    progress = min(1.0, max(0.0, t_sec / total_sec))
    bar_w = int(progress * (WIDTH - 80))
    draw.rectangle([(40, HEIGHT - 32), (WIDTH - 40, HEIGHT - 22)], fill=(22, 34, 54))
    if bar_w > 0:
        draw.rectangle([(40, HEIGHT - 32), (40 + bar_w, HEIGHT - 22)], fill=(56, 189, 248))
    
    draw.text((40, HEIGHT - 50), f"TIMELINE: {int(t_sec)}s / {int(total_sec)}s", font=font_mono_sm, fill=(148, 163, 184))
    draw.text((WIDTH - 280, HEIGHT - 50), "1080P HD • 60 FPS MOTION ENGINE", font=font_mono_sm, fill=(16, 185, 129))

def create_video_pipe(output_path):
    cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "19",
        "-pix_fmt", "yuv420p",
        output_path
    ]
    return subprocess.Popen(cmd, stdin=subprocess.PIPE)

# ─────────────────────────────────────────────────────────────
# 1. ALCOHOL DETECTION SYSTEM (24 Seconds Deep Engineering Walkthrough)
# ─────────────────────────────────────────────────────────────
def generate_alcohol_video():
    output_path = "public/videos/alcohol-detection-demo.mp4"
    print(f"--> Generating {output_path} (Deep Technical Simulation)...")
    pipe = create_video_pipe(output_path)
    
    total_sec = 24.0
    total_frames = int(total_sec * FPS)
    
    for frame in range(total_frames):
        t = frame / FPS
        img = Image.new("RGB", (WIDTH, HEIGHT), (6, 10, 19))
        draw = ImageDraw.Draw(img)
        
        draw_hud(draw, "AI + IoT Alcohol Detection & Driver Safety Interlock", "Hardware Working Principle, Dual-Core FreeRTOS & Circuit Cutoff", t, total_sec)
        
        # 5 distinct detailed engineering phases:
        if t < 5.0:
            stage_num = 1
            stage_title = "STAGE 1: SYSTEM BOOT, DUAL-CORE RTOS & SENSOR PRE-HEAT"
            stage_color = (245, 158, 11)
            raw_adc_v = 0.40 + 0.15 * math.sin(t * 4) + 0.04 * math.sin(t * 19)
            filtered_v = 0.41 + 0.05 * math.sin(t * 2)
            breath_pa = 0.0
            relay_closed = False
            ignition_ready = False
            alarm_sound = False
            bac_val = 0.00
        elif t < 10.5:
            stage_num = 2
            stage_title = "STAGE 2: AIRFLOW EXHALATION VALIDATION (ANTI-BYPASS GUARD)"
            stage_color = (56, 189, 248)
            # Pressure rises during breath
            breath_ramp = min(1.0, (t - 5.0) / 2.0)
            breath_pa = 145.0 * breath_ramp + 8.0 * math.sin(t * 6)
            raw_adc_v = 0.42 + 0.08 * math.sin(t * 5) + 0.03 * math.sin(t * 23)
            filtered_v = 0.42 + 0.02 * math.sin(t * 2)
            relay_closed = True
            ignition_ready = True
            alarm_sound = False
            bac_val = 0.006
        elif t < 16.5:
            stage_num = 3
            stage_title = "STAGE 3: ALCOHOL VAPOR INFLUX & 50-SAMPLE MOVING AVERAGE"
            stage_color = (239, 68, 68)
            vapor_ramp = min(1.0, (t - 10.5) / 4.0)
            breath_pa = 135.0 + 6.0 * math.sin(t * 4)
            raw_adc_v = 0.45 + 2.35 * vapor_ramp + 0.12 * math.sin(t * 18)
            filtered_v = 0.44 + 2.30 * vapor_ramp
            bac_val = min(0.145, 0.008 + 0.137 * vapor_ramp)
            # Crosses threshold at t = 13.0
            relay_closed = (t < 13.0)
            ignition_ready = (t < 13.0)
            alarm_sound = (t >= 13.0)
        elif t < 20.5:
            stage_num = 4
            stage_title = "STAGE 4: RELAY COIL CUTOFF (GPIO 26) & PIEZO ALARM ACTUATION"
            stage_color = (239, 68, 68)
            breath_pa = 20.0
            raw_adc_v = 2.75 + 0.08 * math.sin(t * 12) + 0.04 * math.sin(t * 27)
            filtered_v = 2.74
            bac_val = 0.145
            relay_closed = False
            ignition_ready = False
            alarm_sound = True
        else:
            stage_num = 5
            stage_title = "STAGE 5: FAIL-SAFE AUTOMOTIVE LOCKOUT & TELEMETRY LEDGER"
            stage_color = (192, 132, 252)
            breath_pa = 0.0
            raw_adc_v = 2.68 + 0.05 * math.sin(t * 7)
            filtered_v = 2.68
            bac_val = 0.142
            relay_closed = False
            ignition_ready = False
            alarm_sound = True

        # Left Panel (Width 880): Dual-Trace Oscilloscope & Sensor Physics
        draw.rectangle([(50, 95), (940, 680)], fill=(11, 19, 34), outline=(37, 50, 71), width=2)
        draw.rectangle([(50, 95), (940, 145)], fill=(16, 26, 44))
        draw.text((70, 112), "MQ-3 VOLTAGE OSCILLOSCOPE (ADC1_CH6 - GPIO 34)", font=font_title_sm, fill=(56, 189, 248))
        draw.text((720, 115), "10Hz DUAL SAMPLING", font=font_mono_sm, fill=(16, 185, 129))

        # Scope Screen Grid
        sc_x1, sc_y1, sc_x2, sc_y2 = 70, 165, 920, 480
        draw.rectangle([(sc_x1, sc_y1), (sc_x2, sc_y2)], fill=(5, 9, 18), outline=(22, 34, 54), width=1)
        for gx in range(sc_x1, sc_x2, 70):
            draw.line([(gx, sc_y1), (gx, sc_y2)], fill=(16, 26, 44), width=1)
        for gy in range(sc_y1, sc_y2, 50):
            draw.line([(sc_x1, gy), (sc_x2, gy)], fill=(16, 26, 44), width=1)

        # Threshold Guideline at 1.20V (BAC 0.05 mg/L)
        th_y = sc_y2 - int((1.20 / 3.3) * (sc_y2 - sc_y1))
        draw.line([(sc_x1, th_y), (sc_x2, th_y)], fill=(239, 68, 68), width=2)
        draw.text((sc_x1 + 15, th_y - 20), "LEGAL SAFETY LIMIT: 1.20V (0.05 mg/L BAC)", font=font_mono_sm, fill=(239, 68, 68))

        # Baseline Guideline at 0.40V
        base_y = sc_y2 - int((0.40 / 3.3) * (sc_y2 - sc_y1))
        draw.line([(sc_x1, base_y), (sc_x2, base_y)], fill=(100, 116, 139), width=1)
        draw.text((sc_x1 + 15, base_y + 6), "CALIBRATED SNO2 BASELINE: 0.40V (CLEAN AIR)", font=font_mono_sm, fill=(148, 163, 184))

        # Draw Dual Waveform: Yellow (Raw Noisy ADC) & Cyan (50-Sample Filtered)
        pts_raw = []
        pts_filt = []
        num_samples = 140
        for i in range(num_samples):
            px = sc_x1 + (i / (num_samples - 1.0)) * (sc_x2 - sc_x1)
            hist_t = max(0, t - (num_samples - 1 - i) * 0.04)
            
            if hist_t < 5.0:
                v_raw = 0.40 + 0.15 * math.sin(hist_t * 4) + 0.05 * math.sin(hist_t * 22)
                v_f = 0.41 + 0.05 * math.sin(hist_t * 2)
            elif hist_t < 10.5:
                v_raw = 0.42 + 0.08 * math.sin(hist_t * 5) + 0.04 * math.sin(hist_t * 25)
                v_f = 0.42 + 0.02 * math.sin(hist_t * 2)
            elif hist_t < 16.5:
                vr = min(1.0, (hist_t - 10.5) / 4.0)
                v_raw = 0.45 + 2.35 * vr + 0.14 * math.sin(hist_t * 18)
                v_f = 0.44 + 2.30 * vr
            else:
                v_raw = 2.75 + 0.10 * math.sin(hist_t * 14) + 0.05 * math.sin(hist_t * 31)
                v_f = 2.74

            py_raw = sc_y2 - int((v_raw / 3.3) * (sc_y2 - sc_y1))
            py_f = sc_y2 - int((v_f / 3.3) * (sc_y2 - sc_y1))
            pts_raw.append((px, py_raw))
            pts_filt.append((px, py_f))

        if len(pts_raw) > 1:
            draw.line(pts_raw, fill=(245, 158, 11, 150), width=1)
            draw.line(pts_filt, fill=(56, 189, 248) if not alarm_sound else (239, 68, 68), width=3)

        # Legend
        draw.rectangle([(sc_x1 + 10, sc_y1 + 10), (sc_x1 + 330, sc_y1 + 55)], fill=(10, 16, 30, 200), outline=(37, 50, 71), width=1)
        draw.line([(sc_x1 + 20, sc_y1 + 25), (sc_x1 + 50, sc_y1 + 25)], fill=(245, 158, 11), width=2)
        draw.text((sc_x1 + 60, sc_y1 + 17), "CH1: Raw ADC Input (Noisy)", font=font_mono_sm, fill=(245, 158, 11))
        draw.line([(sc_x1 + 20, sc_y1 + 43), (sc_x1 + 50, sc_y1 + 43)], fill=(56, 189, 248), width=3)
        draw.text((sc_x1 + 60, sc_y1 + 35), "CH2: 50-Moving Average Filter", font=font_mono_sm, fill=(56, 189, 248))

        # Telemetry Gauges Below Oscilloscope
        draw.text((70, 500), f"ADC VOLTAGE: {filtered_v:.3f} V  (RAW: {raw_adc_v:.3f} V)", font=font_mono_lg, fill=(56, 189, 248))
        draw.text((70, 535), f"CALCULATED VAPOR CONCENTRATION: {bac_val:.3f} mg/L", font=font_title_md, fill=stage_color)
        
        # Airflow Pressure Bar
        draw.text((70, 580), f"DIFFERENTIAL AIRFLOW SENSOR: {breath_pa:.1f} Pa  (THRESHOLD: >= 120 Pa)", font=font_mono_md, fill=(203, 213, 225))
        draw.rectangle([(70, 610), (600, 626)], fill=(22, 34, 54))
        bar_pa = int(min(1.0, max(0.0, breath_pa) / 160.0) * 530)
        if bar_pa > 0:
            draw.rectangle([(70, 610), (70 + bar_pa, 626)], fill=(16, 185, 129) if breath_pa >= 120 else (245, 158, 11))
        draw.text((615, 610), "VALID BREATH" if breath_pa >= 120 else "STANDBY", font=font_mono_sm, fill=(16, 185, 129) if breath_pa >= 120 else (148, 163, 184))

        draw.text((70, 645), "SnO2 FORMULA: Rs = ((Vcc - Vout) / Vout) * RL  |  RL = 10kΩ Calibration Resistor", font=font_mono_sm, fill=(100, 116, 139))

        # Right Panel (Width 880): Circuit Interlock & Hardware Actuators
        draw.rectangle([(980, 95), (1870, 680)], fill=(11, 19, 34), outline=(37, 50, 71), width=2)
        draw.rectangle([(980, 95), (1870, 145)], fill=(16, 26, 44))
        draw.text((1000, 112), "HARDWARE ACTUATION & VEHICLE IGNITION INTERLOCK", font=font_title_sm, fill=(192, 132, 252))

        # Big Stage Banner
        draw.rectangle([(1000, 165), (1850, 245)], fill=(16, 26, 44), outline=stage_color, width=2)
        draw.text((1020, 178), f"PHASE {stage_num} OF 5:", font=font_mono_sm, fill=(148, 163, 184))
        draw.text((1020, 202), stage_title, font=font_title_sm, fill=stage_color)

        # 5V Optocoupled Relay Box
        draw.rectangle([(1000, 270), (1400, 465)], fill=(8, 14, 25), outline=(16, 185, 129) if relay_closed else (239, 68, 68), width=2)
        draw.text((1020, 285), "5V OPTOCOUPLED RELAY", font=font_title_sm, fill=(248, 250, 252))
        
        # State display
        if relay_closed:
            draw.text((1020, 318), "CIRCUIT: CLOSED (NC)", font=font_mono_md, fill=(16, 185, 129))
            draw.text((1020, 345), "IGNITION: PERMITTED", font=font_title_sm, fill=(16, 185, 129))
        else:
            draw.text((1020, 318), "CIRCUIT: DISENGAGED (OPEN)", font=font_mono_md, fill=(239, 68, 68))
            draw.text((1020, 345), "IGNITION: CUTOFF LOCKED", font=font_title_sm, fill=(239, 68, 68))

        draw.text((1020, 385), "CONTROL PIN: ESP32 GPIO 26", font=font_mono_sm, fill=(148, 163, 184))
        draw.text((1020, 408), "OPTOISOLATOR: EL817 (3750Vrms)", font=font_mono_sm, fill=(148, 163, 184))
        draw.text((1020, 431), "STARTER SOLENOID: " + ("12V LIVE" if relay_closed else "ISOLATED (0V)"), font=font_mono_sm, fill=(203, 213, 225))

        # Alarm & Visual Display Box
        draw.rectangle([(1430, 270), (1850, 465)], fill=(8, 14, 25), outline=(37, 50, 71), width=2)
        draw.text((1450, 285), "INDICATORS & TELEMETRY OLED", font=font_title_sm, fill=(248, 250, 252))

        # Status LEDs
        g_col = (16, 185, 129) if ignition_ready else (25, 45, 35)
        r_col = (239, 68, 68) if alarm_sound else (45, 25, 25)
        draw.ellipse([(1450, 325), (1478, 353)], fill=g_col)
        draw.text((1490, 332), "GREEN SAFE LED (GPIO 14)", font=font_mono_sm, fill=(203, 213, 225))
        
        draw.ellipse([(1450, 365), (1478, 393)], fill=r_col)
        draw.text((1490, 372), "RED ALERT LED (GPIO 12)", font=font_mono_sm, fill=(203, 213, 225))

        # Piezo Alarm
        buzzer_str = "ACTIVE (2400Hz PWM @ 85dB)" if alarm_sound else "SILENT (0Hz)"
        draw.text((1450, 412), f"PIEZO ALARM: {buzzer_str}", font=font_mono_sm, fill=(239, 68, 68) if alarm_sound else (148, 163, 184))
        draw.text((1450, 435), "OLED SSD1306: I2C FAST (ADDR 0x3C)", font=font_mono_sm, fill=(56, 189, 248))

        # Microcontroller Block Info
        draw.rectangle([(1000, 490), (1850, 660)], fill=(16, 26, 44), outline=(56, 189, 248), width=1)
        draw.text((1020, 505), "ESP32 XTENSA DUAL-CORE RTOS SCHEDULING (240 MHz)", font=font_mono_md, fill=(56, 189, 248))
        draw.text((1020, 540), "• CORE 0: Telemetry logging, Wi-Fi HTTP client, and event serialization", font=font_mono_sm, fill=(203, 213, 225))
        draw.text((1020, 565), "• CORE 1: Deterministic 10Hz ADC timer interrupt, digital filter & cutoff logic", font=font_mono_sm, fill=(203, 213, 225))
        draw.text((1020, 590), "• LATENCY: 14.2ms from threshold violation to physical relay contact separation", font=font_mono_sm, fill=(16, 185, 129))
        draw.text((1020, 615), "• FAIL-SAFE: Any sensor disconnect or power anomaly defaults to IGNITION LOCK", font=font_mono_sm, fill=(245, 158, 11))

        # Bottom Panel (Firmware Terminal Stream)
        draw.rectangle([(50, 705), (1870, 995)], fill=(8, 14, 25), outline=(37, 50, 71), width=2)
        draw.text((70, 725), "ESP-IDF REAL-TIME FIRMWARE TELEMETRY CONSOLE (UART0 @ 115200 BAUD)", font=font_mono_md, fill=(56, 189, 248))

        terminal_logs = [
            f"[+0.000s] [BOOT] ESP-IDF v5.1.2. Xtensa LX6 dual-core at 240MHz. Flash: 4MB QIO. Free Heap: 294.2 KB.",
            f"[+1.850s] [CALIB] Two-point ADC Vref curve applied to GPIO 34. ADC attenuation: 11dB (0-3.3V range).",
            f"[+5.210s] [AIRFLOW] Exhalation trigger verified: differential pressure 145.2 Pa > 120.0 Pa minimum limit.",
            f"[+7.400s] [STATE] Safety Interlock gate evaluated to SAFE. GPIO 26 held LOW. Relay closed.",
            f"[+11.10s] [MQ-3] Gas sensor analog voltage influx detected. Moving average filter buffer populated.",
            f"[+13.02s] [CRITICAL] Sensor voltage {filtered_v:.3f}V exceeds 1.200V threshold! BAC={bac_val:.3f} mg/L.",
            f"[+13.03s] [INTERLOCK] TRIPPING GPIO 26 HIGH! Optocoupler unlatched. Starter motor circuit disengaged.",
            f"[+13.04s] [ALARM] Starting PWM timer channel 0: frequency 2400 Hz, duty cycle 50%. RED LED latched.",
            f"[+18.50s] [LOCKOUT] Safety interlock armed. Enforcing 30-minute anti-tamper lockout period."
        ]

        vis_lines = min(len(terminal_logs), max(2, int(t / 2.2)))
        for li in range(vis_lines):
            log_c = (16, 185, 129) if "BOOT" in terminal_logs[li] or "CALIB" in terminal_logs[li] or "STATE" in terminal_logs[li] else ((245, 158, 11) if "AIRFLOW" in terminal_logs[li] or "MQ-3" in terminal_logs[li] else (239, 68, 68))
            draw.text((70, 755 + li * 26), terminal_logs[li], font=font_mono_sm, fill=log_c)

        pipe.stdin.write(img.tobytes())

    pipe.stdin.close()
    pipe.wait()
    print(f"--> Finished {output_path}")

# ─────────────────────────────────────────────────────────────
# 2. DIGITAL CLASSROOM ASSIGNMENT CHECKER (24 Seconds Deep Walkthrough)
# ─────────────────────────────────────────────────────────────
def generate_assignment_video():
    output_path = "public/videos/assignment-checker-demo.mp4"
    print(f"--> Generating {output_path} (Deep Technical Simulation)...")
    pipe = create_video_pipe(output_path)
    
    total_sec = 24.0
    total_frames = int(total_sec * FPS)
    
    for frame in range(total_frames):
        t = frame / FPS
        img = Image.new("RGB", (WIDTH, HEIGHT), (6, 10, 19))
        draw = ImageDraw.Draw(img)
        
        draw_hud(draw, "Digital Classroom — Automated Assignment Evaluation Platform", "Dual-Portal Academic Submission, Algorithmic Grading & PDF Synthesis", t, total_sec)
        
        # 4 distinct phases:
        if t < 6.0:
            stage_num = 1
            stage_title = "STAGE 1: INSTRUCTOR SESSION CONFIGURATION & RUBRIC WEIGHTING"
            stage_color = (56, 189, 248)
            tests_run = 0
            score = 0
        elif t < 12.0:
            stage_num = 2
            stage_title = "STAGE 2: STUDENT PORTAL SUBMISSION & CRYPTOGRAPHIC TOKEN GENERATION"
            stage_color = (192, 132, 252)
            tests_run = 0
            score = 0
        elif t < 18.5:
            stage_num = 3
            stage_title = "STAGE 3: AUTOMATED EVALUATION CORE & COMPILATION TEST MATRIX"
            stage_color = (245, 158, 11)
            tests_run = min(4, int((t - 12.0) / 1.5))
            score = int(min(96, (t - 12.0) * 16))
        else:
            stage_num = 4
            stage_title = "STAGE 4: OFFICIAL CERTIFICATE TRANSCRIPT & VECTOR PDF EXPORT"
            stage_color = (16, 185, 129)
            tests_run = 4
            score = 96

        # Left Column (Width 880): Student Code Editor & Submission Intake
        draw.rectangle([(50, 95), (940, 680)], fill=(11, 19, 34), outline=(37, 50, 71), width=2)
        draw.rectangle([(50, 95), (940, 145)], fill=(16, 26, 44))
        draw.text((70, 112), "STUDENT WORKSPACE — quicksort_algorithmic_solution.py", font=font_title_sm, fill=(56, 189, 248))
        draw.text((760, 115), "PYTHON 3.11", font=font_mono_sm, fill=(16, 185, 129))

        code_lines = [
            "def quicksort_partition(data_arr, low_idx, high_idx):",
            "    pivot_element = data_arr[high_idx] # Lomuto partitioning",
            "    i = low_idx - 1",
            "    for j in range(low_idx, high_idx):",
            "        if data_arr[j] <= pivot_element:",
            "            i += 1",
            "            data_arr[i], data_arr[j] = data_arr[j], data_arr[i]",
            "    data_arr[i + 1], data_arr[high_idx] = data_arr[high_idx], data_arr[i + 1]",
            "    return i + 1",
            "",
            "def quicksort(data_arr, low_idx, high_idx):",
            "    if low_idx < high_idx:",
            "        partition_idx = quicksort_partition(data_arr, low_idx, high_idx)",
            "        quicksort(data_arr, low_idx, partition_idx - 1)",
            "        quicksort(data_arr, partition_idx + 1, high_idx)",
            "    return data_arr"
        ]

        for ci, line in enumerate(code_lines):
            col = (203, 213, 225)
            if "def " in line or "return " in line:
                col = (192, 132, 252)
            elif "#" in line:
                col = (100, 116, 139)
            elif "for " in line or "if " in line:
                col = (56, 189, 248)
            draw.text((75, 165 + ci * 26), f"{ci+1:02d}  {line}", font=font_mono_sm, fill=col)

        # Hash Box below code
        draw.rectangle([(70, 585), (920, 660)], fill=(8, 14, 25), outline=(37, 50, 71), width=1)
        draw.text((85, 598), "SUBMISSION DIGEST: SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b", font=font_mono_sm, fill=(16, 185, 129))
        draw.text((85, 625), "STUDENT: Shubham Verma | ID: CS2026-0487 | ROOM: BTEUP-EXAM-772", font=font_mono_sm, fill=(148, 163, 184))

        # Right Column (Width 880): Automated Grading Core & Test Assertions
        draw.rectangle([(980, 95), (1870, 680)], fill=(11, 19, 34), outline=(37, 50, 71), width=2)
        draw.rectangle([(980, 95), (1870, 145)], fill=(16, 26, 44))
        draw.text((1000, 112), "AUTOMATED EVALUATION ENGINE & RUBRICS MATRIX", font=font_title_sm, fill=(192, 132, 252))

        # Stage Banner
        draw.rectangle([(1000, 165), (1850, 235)], fill=(16, 26, 44), outline=stage_color, width=2)
        draw.text((1020, 180), f"EXECUTION PHASE {stage_num} OF 4:", font=font_mono_sm, fill=(148, 163, 184))
        draw.text((1020, 202), stage_title, font=font_title_sm, fill=stage_color)

        test_suites = [
            ("Test Case 1: Large Array Random Permutations (N=10,000)", "Execution Time: 2.1ms • Memory: 1.4MB", 1),
            ("Test Case 2: Boundary Value Edge Case (Reversed & Duplicates)", "Execution Time: 1.4ms • Zero Recursion Overflow", 2),
            ("Test Case 3: Empty Array & Single Element Invariants", "Execution Time: 0.2ms • Stable In-Place Mutation", 3),
            ("Test Case 4: O(N log N) Worst-Case Partitioning Verification", "Comparisons < 1.4 * N log2(N) • OPTIMAL", 4)
        ]

        for ti, (t_title, t_sub, t_req) in enumerate(test_suites):
            passed = (tests_run >= t_req)
            c_fill = (8, 14, 25)
            c_border = (16, 185, 129) if passed else (37, 50, 71)
            draw.rectangle([(1000, 255 + ti * 100), (1850, 340 + ti * 100)], fill=c_fill, outline=c_border, width=2 if passed else 1)
            
            draw.text((1020, 270 + ti * 100), t_title, font=font_title_sm, fill=(248, 250, 252) if passed else (148, 163, 184))
            draw.text((1020, 305 + ti * 100), t_sub if passed else "WAITING FOR COMPILER SANDBOX...", font=font_mono_sm, fill=(16, 185, 129) if passed else (100, 116, 139))
            
            # Status Badge
            badge_t = "100% PASSED" if passed else "QUEUED"
            draw.rectangle([(1700, 270 + ti * 100), (1830, 315 + ti * 100)], fill=(16, 185, 129, 30) if passed else (22, 34, 54))
            draw.text((1715, 285 + ti * 100), badge_t, font=font_mono_sm, fill=(16, 185, 129) if passed else (148, 163, 184))

        # Bottom Panel (Grading Analytics & PDF Export)
        draw.rectangle([(50, 705), (1870, 995)], fill=(8, 14, 25), outline=(37, 50, 71), width=2)
        draw.text((70, 725), "INSTITUTIONAL PERFORMANCE RECORD & PDF REPORT COMPILATION", font=font_mono_md, fill=(56, 189, 248))

        draw.text((70, 770), f"EVALUATED ASSIGNMENT SCORE: {score} / 100", font=font_title_xl, fill=(16, 185, 129) if score >= 90 else (245, 158, 11))
        draw.text((70, 830), "RUBRIC WEIGHTING: Algorithmic Correctness: 40/40 | Code Quality & PEP 8: 28/30 | Asymptotic Complexity: 28/30", font=font_mono_md, fill=(203, 213, 225))
        draw.text((70, 865), "AUTHENTICITY VERIFICATION: Cryptographically stamped by Digital Classroom Evaluation Service", font=font_mono_sm, fill=(148, 163, 184))
        draw.text((70, 895), "BOARD RECORD: Affiliated with CSJM Government Polytechnic & BTEUP Academic Board", font=font_mono_sm, fill=(192, 132, 252))

        # Export Button
        draw.rectangle([(1470, 760), (1840, 835)], fill=(16, 185, 129), outline=(52, 211, 153), width=2)
        draw.text((1510, 785), "DOWNLOAD PDF TRANSCRIPT", font=font_title_sm, fill=(10, 16, 30))

        pipe.stdin.write(img.tobytes())

    pipe.stdin.close()
    pipe.wait()
    print(f"--> Finished {output_path}")

# ─────────────────────────────────────────────────────────────
# 3. 1QUIZ PLATFORM (24 Seconds Deep Walkthrough)
# ─────────────────────────────────────────────────────────────
def generate_onequiz_video():
    output_path = "public/videos/onequiz-platform-demo.mp4"
    print(f"--> Generating {output_path} (Deep Technical Simulation)...")
    pipe = create_video_pipe(output_path)
    
    total_sec = 24.0
    total_frames = int(total_sec * FPS)
    
    for frame in range(total_frames):
        t = frame / FPS
        img = Image.new("RGB", (WIDTH, HEIGHT), (6, 10, 19))
        draw = ImageDraw.Draw(img)
        
        draw_hud(draw, "1QUIZ — AI-Powered Technical Assessment Platform", "Item Response Theory (IRT) Dynamic Weighting, Multi-Model Router & Gamification", t, total_sec)
        
        # Phases
        if t < 5.0:
            stage_title = "STAGE 1: HIGH-ENERGY LOBBY & IRT TOPIC ACCURACY PROFILING"
            stage_color = (56, 189, 248)
            sel_opt = -1
            score = 1200
            streak = 2
            theta = "+0.45"
        elif t < 11.0:
            stage_title = "STAGE 2: QUESTION 04 / 10 — REAL-TIME NAVIGATION & OPTION HOVER"
            stage_color = (192, 132, 252)
            sel_opt = -1
            score = 1200
            streak = 2
            theta = "+0.45"
        elif t < 17.0:
            stage_title = "STAGE 3: SUB-10ms INSTANT VALIDATION & +450 PTS 3X STREAK MULTIPLIER"
            stage_color = (16, 185, 129)
            sel_opt = 1 # Option B
            score = 1650
            streak = 3
            theta = "+1.42 (ADVANCED)"
        else:
            stage_title = "STAGE 4: MULTI-AXIS COMPETENCY RADAR & COMPREHENSIVE PERFORMANCE"
            stage_color = (245, 158, 11)
            sel_opt = 1
            score = 2850
            streak = 5
            theta = "+2.15 (EXPERT)"

        # Left Column: Quiz Question Board
        draw.rectangle([(50, 95), (1200, 680)], fill=(11, 19, 34), outline=(37, 50, 71), width=2)
        draw.rectangle([(50, 95), (1200, 150)], fill=(16, 26, 44))
        draw.text((70, 112), "QUESTION 04 OF 10 • CATEGORY: EMBEDDED PROTOCOLS & HARDWARE BUSES", font=font_title_sm, fill=(56, 189, 248))
        draw.text((1050, 115), "TIMER: 00:18", font=font_mono_sm, fill=(245, 158, 11))

        # Question Prompt
        draw.rectangle([(75, 175), (1175, 275)], fill=(16, 26, 44), outline=(56, 189, 248), width=2)
        draw.text((95, 195), "Which serial communication bus operates with open-drain SDA & SCL lines,", font=font_title_sm, fill=(248, 250, 252))
        draw.text((95, 228), "utilizing 4.7kΩ pull-up resistors and standard 7-bit slave address 0x3C for OLED?", font=font_title_sm, fill=(248, 250, 252))

        options = [
            ("A", "SPI (Serial Peripheral Interface — MOSI, MISO, SCK, CS at 20MHz)"),
            ("B", "I2C (Inter-Integrated Circuit — 400kHz Fast Mode, Two-Wire Bus)"),
            ("C", "CAN Bus (Controller Area Network 2.0B Differential Transceiver)"),
            ("D", "UART (Universal Asynchronous Receiver-Transmitter Point-to-Point)")
        ]

        for oi, (opt_l, opt_txt) in enumerate(options):
            is_c = (sel_opt == oi)
            o_bg = (16, 185, 129, 35) if is_c else (8, 14, 25)
            o_border = (16, 185, 129) if is_c else (37, 50, 71)
            draw.rectangle([(75, 300 + oi * 85), (1175, 365 + oi * 85)], fill=o_bg, outline=o_border, width=2 if is_c else 1)
            draw.text((95, 318 + oi * 85), f"{opt_l})", font=font_mono_md, fill=(56, 189, 248) if not is_c else (16, 185, 129))
            draw.text((135, 318 + oi * 85), opt_txt, font=font_title_sm, fill=(248, 250, 252))
            if is_c:
                draw.text((1070, 318 + oi * 85), "CORRECT ✓", font=font_mono_md, fill=(16, 185, 129))

        # Right Column: Gamification & IRT Telemetry
        draw.rectangle([(1240, 95), (1870, 680)], fill=(11, 19, 34), outline=(37, 50, 71), width=2)
        draw.rectangle([(1240, 95), (1870, 150)], fill=(16, 26, 44))
        draw.text((1260, 112), "LIVE GAMIFICATION & IRT DIFFICULTY HUD", font=font_title_sm, fill=(192, 132, 252))

        draw.text((1270, 180), "TOTAL SCORE", font=font_mono_sm, fill=(148, 163, 184))
        draw.text((1270, 205), f"{score:,} PTS", font=font_title_xl, fill=(56, 189, 248))

        draw.rectangle([(1270, 275), (1840, 385)], fill=(16, 26, 44), outline=(245, 158, 11), width=2)
        draw.text((1290, 292), "STREAK MULTIPLIER", font=font_mono_sm, fill=(245, 158, 11))
        draw.text((1290, 320), f"{streak}X COMBO ACTIVE!", font=font_title_lg, fill=(245, 158, 11))
        draw.text((1290, 355), "+150 SPEED BONUS APPLIED (Response: 1.4s)", font=font_mono_sm, fill=(16, 185, 129))

        draw.text((1270, 415), "ITEM RESPONSE THEORY (2PL MODEL)", font=font_mono_sm, fill=(148, 163, 184))
        draw.text((1270, 440), f"ESTIMATED THETA: {theta}", font=font_mono_md, fill=(192, 132, 252))
        
        # Difficulty Progress Bar
        draw.rectangle([(1270, 480), (1840, 500)], fill=(22, 34, 54))
        draw.rectangle([(1270, 480), (1270 + 440, 500)], fill=(192, 132, 252))

        draw.text((1270, 525), "AI AUTO-ROUTER: Groq (Llama 3 70B) -> Gemini 1.5 Pro Fallback", font=font_mono_sm, fill=(56, 189, 248))
        draw.text((1270, 555), "DEEP THINKING MODE: Sub-component decomposition enabled", font=font_mono_sm, fill=(203, 213, 225))
        draw.text((1270, 585), "JSON SCHEMA GUARD: Zero-error schema enforcement active", font=font_mono_sm, fill=(16, 185, 129))

        # Bottom Panel: Radar & Skill Distribution
        draw.rectangle([(50, 705), (1870, 995)], fill=(8, 14, 25), outline=(37, 50, 71), width=2)
        draw.text((70, 725), "TECHNICAL SKILLS BREAKDOWN & COHORT PERCENTILE RANKING", font=font_mono_md, fill=(56, 189, 248))

        skills_list = [
            ("Computer Architecture", "96%", "TOP 2%"),
            ("Embedded C & FreeRTOS", "94%", "TOP 3%"),
            ("Python OOP Architecture", "98%", "TOP 1%"),
            ("Robotics & Kinematics", "92%", "TOP 4%"),
            ("Operating Systems & Linux", "95%", "TOP 2%")
        ]

        for ski, (s_name, s_pct, s_rank) in enumerate(skills_list):
            bx = 70 + ski * 360
            draw.rectangle([(bx, 765), (bx + 335, 960)], fill=(16, 26, 44), outline=(37, 50, 71), width=1)
            draw.text((bx + 18, 785), s_name, font=font_title_sm, fill=(248, 250, 252))
            draw.text((bx + 18, 830), s_pct, font=font_title_xl, fill=(16, 185, 129))
            draw.text((bx + 18, 895), f"PERCENTILE: {s_rank}", font=font_mono_sm, fill=(56, 189, 248))
            draw.text((bx + 18, 925), "MASTERY: ADVANCED", font=font_mono_sm, fill=(148, 163, 184))

        pipe.stdin.write(img.tobytes())

    pipe.stdin.close()
    pipe.wait()
    print(f"--> Finished {output_path}")

# ─────────────────────────────────────────────────────────────
# 4. ROBOTICS & DRONE SIMULATION (28 Seconds Deep Walkthrough)
# ─────────────────────────────────────────────────────────────
def generate_robotics_video():
    output_path = "public/videos/robotics-drone-demo.mp4"
    print(f"--> Generating {output_path} (Deep Technical Simulation)...")
    pipe = create_video_pipe(output_path)
    
    total_sec = 28.0
    total_frames = int(total_sec * FPS)
    
    for frame in range(total_frames):
        t = frame / FPS
        img = Image.new("RGB", (WIDTH, HEIGHT), (6, 10, 19))
        draw = ImageDraw.Draw(img)
        
        draw_hud(draw, "Robotics & Drone Engineering", "6-DOF Manipulator Kinematics & Quadcopter PX4 SITL Flight Dynamics", t, total_sec)
        
        # Left Panel (Width 880): 6-DOF Robotic Arm with Smooth Spline Trajectory
        draw.rectangle([(50, 95), (940, 680)], fill=(11, 19, 34), outline=(37, 50, 71), width=2)
        draw.rectangle([(50, 95), (940, 145)], fill=(16, 26, 44))
        draw.text((70, 112), "6-DOF ROBOTIC MANIPULATOR — INVERSE KINEMATICS", font=font_title_sm, fill=(56, 189, 248))
        draw.text((750, 115), "MOVEIT 2 / ROS 2", font=font_mono_sm, fill=(16, 185, 129))

        # Kinematics Base
        base_x, base_y = 480, 560
        draw.rectangle([(base_x - 80, base_y), (base_x + 80, base_y + 35)], fill=(37, 50, 71))
        draw.rectangle([(base_x - 40, base_y - 25), (base_x + 40, base_y)], fill=(56, 189, 248))

        # Dynamic Joint Angles calculated via kinematics
        ang1 = -0.6 * math.sin(t * 1.4)
        ang2 = 0.85 + 0.45 * math.sin(t * 1.4 + 0.6)
        ang3 = -1.25 + 0.5 * math.cos(t * 1.4)
        ang4 = 0.3 * math.sin(t * 2.8)

        # Link 1 (Shoulder)
        len1 = 145
        j1_x = base_x + int(len1 * math.sin(ang1))
        j1_y = base_y - int(len1 * math.cos(ang1))
        draw.line([(base_x, base_y - 12), (j1_x, j1_y)], fill=(56, 189, 248), width=12)
        draw.circle((base_x, base_y - 12), 16, fill=(139, 92, 246))

        # Link 2 (Elbow)
        len2 = 125
        j2_x = j1_x + int(len2 * math.sin(ang1 + ang2))
        j2_y = j1_y - int(len2 * math.cos(ang1 + ang2))
        draw.line([(j1_x, j1_y), (j2_x, j2_y)], fill=(16, 185, 129), width=10)
        draw.circle((j1_x, j1_y), 14, fill=(139, 92, 246))

        # Link 3 (Forearm)
        len3 = 85
        j3_x = j2_x + int(len3 * math.sin(ang1 + ang2 + ang3))
        j3_y = j2_y - int(len3 * math.cos(ang1 + ang2 + ang3))
        draw.line([(j2_x, j2_y), (j3_x, j3_y)], fill=(245, 158, 11), width=7)
        draw.circle((j2_x, j2_y), 11, fill=(139, 92, 246))

        # End Effector Tool & Gripper Clamp
        draw.circle((j3_x, j3_y), 9, fill=(239, 68, 68))
        draw.line([(j3_x - 14, j3_y), (j3_x + 14, j3_y)], fill=(239, 68, 68), width=4)
        draw.line([(j3_x - 14, j3_y), (j3_x - 14, j3_y + 18)], fill=(239, 68, 68), width=3)
        draw.line([(j3_x + 14, j3_y), (j3_x + 14, j3_y + 18)], fill=(239, 68, 68), width=3)

        # Electronic Component being picked / placed
        ic_x, ic_y = j3_x, j3_y + 12
        draw.rectangle([(ic_x - 8, ic_y - 4), (ic_x + 8, ic_y + 4)], fill=(10, 16, 30), outline=(56, 189, 248), width=1)

        # Draw smooth trajectory trail
        traj_pts = []
        for s in range(50):
            st = s * 0.12
            a1 = -0.6 * math.sin(st * 1.4)
            a2 = 0.85 + 0.45 * math.sin(st * 1.4 + 0.6)
            a3 = -1.25 + 0.5 * math.cos(st * 1.4)
            tx = base_x + int(len1 * math.sin(a1)) + int(len2 * math.sin(a1 + a2)) + int(len3 * math.sin(a1 + a2 + a3))
            ty = base_y - int(len1 * math.cos(a1)) - int(len2 * math.cos(a1 + a2)) - int(len3 * math.cos(a1 + a2 + a3))
            traj_pts.append((tx, ty))
        if len(traj_pts) > 1:
            draw.line(traj_pts, fill=(100, 116, 139), width=1)

        draw.text((70, 615), f"END-EFFECTOR CARTESIAN: X={j3_x-base_x:+04d} mm | Y={base_y-j3_y:+04d} mm | Z=145 mm", font=font_mono_md, fill=(56, 189, 248))
        draw.text((70, 645), f"DH PARAMETERS: θ1={math.degrees(ang1):.1f}° | θ2={math.degrees(ang2):.1f}° | θ3={math.degrees(ang3):.1f}° | θ4={math.degrees(ang4):.1f}°", font=font_mono_sm, fill=(16, 185, 129))

        # Right Panel (Width 880): Quadcopter PX4 Drone Flight Simulation
        draw.rectangle([(980, 95), (1870, 680)], fill=(11, 19, 34), outline=(37, 50, 71), width=2)
        draw.rectangle([(980, 95), (1870, 145)], fill=(16, 26, 44))
        draw.text((1000, 112), "PX4 AUTOPILOT SITL — QUADCOPTER FLIGHT INSTRUMENTS", font=font_title_sm, fill=(192, 132, 252))

        # Artificial Horizon Instrument Display
        hud_x, hud_y = 1420, 360
        draw.circle((hud_x, hud_y), 140, fill=(8, 14, 25), outline=(56, 189, 248), width=3)
        
        roll_ang = 0.25 * math.sin(t * 1.8)
        pitch_val = int(30 * math.sin(t * 1.1))

        # Sky / Ground division
        hx1 = hud_x - int(115 * math.cos(roll_ang))
        hy1 = hud_y + pitch_val - int(115 * math.sin(roll_ang))
        hx2 = hud_x + int(115 * math.cos(roll_ang))
        hy2 = hud_y + pitch_val + int(115 * math.sin(roll_ang))
        draw.line([(hx1, hy1), (hx2, hy2)], fill=(16, 185, 129), width=3)
        draw.circle((hud_x, hud_y), 7, fill=(239, 68, 68))
        draw.line([(hud_x - 30, hud_y), (hud_x - 10, hud_y)], fill=(245, 158, 11), width=3)
        draw.line([(hud_x + 10, hud_y), (hud_x + 30, hud_y)], fill=(245, 158, 11), width=3)

        # Telemetry Readings
        alt_m = min(5.0, max(0.0, 1.2 + 2.8 * math.sin(t * 0.7)))
        draw.text((1000, 180), f"ALTITUDE (BAROMETER / LIDAR): {alt_m:.2f} M", font=font_title_lg, fill=(56, 189, 248))
        
        mode_str = "AUTONOMOUS MISSION (WAYPOINT 04)" if t > 4 else "TAKEOFF & CLIMB SEQUENCE"
        draw.text((1000, 225), f"PX4 FLIGHT MODE: {mode_str}", font=font_mono_md, fill=(16, 185, 129))
        draw.text((1000, 260), "BATTERY TELEMETRY: 4S LiPo 15.6V (88% SOC • 24.2A Discharge)", font=font_mono_sm, fill=(245, 158, 11))
        draw.text((1000, 290), f"ESTIMATED ATTITUDE: Roll={math.degrees(roll_ang):+.1f}° | Pitch={pitch_val:+.1f}° | Yaw={int((t*15)%360):03d}°", font=font_mono_sm, fill=(203, 213, 225))
        draw.text((1000, 320), "EKF2 STATE ESTIMATOR: 3D RTK GPS FIX (18 SATELLITES LOCK)", font=font_mono_sm, fill=(16, 185, 129))
        draw.text((1000, 350), "OPTICAL FLOW SENSOR: PMW3901 Verified (Ground Velocity: 0.22 m/s)", font=font_mono_sm, fill=(148, 163, 184))
        draw.text((1000, 380), "MOTOR MIXING: 4x DShot600 ESCs running at 400Hz closed-loop", font=font_mono_sm, fill=(192, 132, 252))

        # Bottom Panel: ROS 2 Topic Telemetry Bus
        draw.rectangle([(50, 705), (1870, 995)], fill=(8, 14, 25), outline=(37, 50, 71), width=2)
        draw.text((70, 725), "ROS 2 HUMBLE DDS MIDDLEWARE TOPICS & FAST-DDS REAL-TIME BUS", font=font_mono_md, fill=(56, 189, 248))

        topics = [
            f"[TOPIC 100Hz] /fmu/out/vehicle_odometry: pos=[{math.sin(t):+.2f}, {math.cos(t):+.2f}, {alt_m:.2f}] q=[0.99, 0.02, 0.01, 0.04] vel=[0.12, 0.08, 0.00]",
            f"[TOPIC  50Hz] /joint_states: arm_joints=[{math.degrees(ang1):+.1f}°, {math.degrees(ang2):+.1f}°, {math.degrees(ang3):+.1f}°, {math.degrees(ang4):+.1f}°, 0.0°, 0.0°] MoveIt2 Controller",
            f"[TOPIC  20Hz] /cmd_vel: linear_x=0.50 m/s  angular_z={roll_ang:+.2f} rad/s published by trajectory_planner node",
            f"[FAST-DDS] Zero-copy intra-process transport verified between micro-ROS nodes and PX4 SITL flight controller."
        ]

        for di, top in enumerate(topics):
            draw.text((70, 765 + di * 42), top, font=font_mono_sm, fill=(203, 213, 225) if "FAST-DDS" not in top else (16, 185, 129))

        pipe.stdin.write(img.tobytes())

    pipe.stdin.close()
    pipe.wait()
    print(f"--> Finished {output_path}")

if __name__ == "__main__":
    generate_alcohol_video()
    generate_assignment_video()
    generate_onequiz_video()
    generate_robotics_video()
    print("ALL 4 DEEP TECHNICAL VIDEOS GENERATED SUCCESSFULLY!")
