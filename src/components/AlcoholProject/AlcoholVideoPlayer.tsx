import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  FileText,
  Radio,
} from 'lucide-react';

interface Chapter {
  timeSec: number;
  timeLabel: string;
  title: string;
  desc: string;
  telemetryState: string;
}

const CHAPTERS: Chapter[] = [
  {
    timeSec: 0,
    timeLabel: '0:00',
    title: 'SnO2 Pre-Heat & Clean Air Baseline',
    desc: 'MQ-3 heated sensing chamber stabilizes at 350°C. Baseline ADC reads 0.66V (safe).',
    telemetryState: 'ADC: 824 | BAC: 0.00% | Relay: PASS',
  },
  {
    timeSec: 6,
    timeLabel: '0:06',
    title: 'Ethanol Vapor Adsorption & Analog Spike',
    desc: 'Alcohol vapor reduces surface resistance Rs, driving divider voltage from 0.66V to 2.45V.',
    telemetryState: 'ADC: 3040 | BAC: 0.06% | ELEVATED SPIKE',
  },
  {
    timeSec: 12,
    timeLabel: '0:12',
    title: 'FreeRTOS 50-Sample Moving Average Filter',
    desc: 'Xtensa Core 1 processes rolling average on ADC1_CH6, confirming safety breach in <15ms.',
    telemetryState: 'FreeRTOS Task_Safety: THRESHOLD EXCEEDED',
  },
  {
    timeSec: 18,
    timeLabel: '0:18',
    title: 'Opto-Isolated Relay Cutoff & Piezo Alarm',
    desc: 'GPIO 18 triggers EL817 optocoupler, breaking starter relay contacts & sounding alarm.',
    telemetryState: 'RELAY: TRIPPED (STARTER LOCKED) | BUZZER: 2.4kHz',
  },
];

export const AlcoholVideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(24);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showStoryboard, setShowStoryboard] = useState<boolean>(false);
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);

  // Synchronize playback time
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    setCurrentTime(cur);

    // Determine current active chapter
    let idx = 0;
    for (let i = CHAPTERS.length - 1; i >= 0; i--) {
      if (cur >= CHAPTERS[i].timeSec) {
        idx = i;
        break;
      }
    }
    setActiveChapterIdx(idx);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 24);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = Number(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.volume = volume || 0.8;
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const jumpToChapter = (timeSec: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = timeSec;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const activeChapter = CHAPTERS[activeChapterIdx] || CHAPTERS[0];

  return (
    <section id="alcohol-video" className="p-6 sm:p-8 rounded-3xl bg-[#0C1220] border-2 border-[#253247] space-y-6 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#253247] pb-4">
        <div>
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            PHASE 09 // HIGH-DEFINITION ENGINEERING DEMO VIDEO
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-[#F8FAFC] mt-0.5">
            Project Explainer &amp; Video Walkthrough
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Live technical demonstration showcasing dual-trace oscilloscope voltage transitions, 50-sample moving average filtering, and optocoupled relay starter cutoff.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStoryboard(!showStoryboard)}
            className="px-3 py-1.5 rounded-xl bg-[#111B2B] hover:bg-[#162338] text-xs font-mono text-[#CBD5E1] border border-[#253247] flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{showStoryboard ? 'Hide Storyboard' : 'View Storyboard'}</span>
          </button>
        </div>
      </div>

      {/* Main Video Viewport Player */}
      <div className="relative rounded-2xl bg-[#050811] border-2 border-[#253247] overflow-hidden shadow-2xl group">
        {/* HTML5 Native Video Tag */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src="/videos/alcohol-detection-demo.mp4"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            playsInline
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
          />

          {/* Centered Big Play Button when paused */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer transition-opacity z-20"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#38BDF8] text-[#070A12] flex items-center justify-center shadow-2xl shadow-[#38BDF8]/40 hover:scale-110 transition-transform">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
              </div>
            </div>
          )}

          {/* Top In-Video Telemetry HUD Overlay */}
          <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none text-xs font-mono">
            <div className="bg-[#0C1220]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#253247] text-white flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-slate-300">ESP32 LIVE HARDWARE BENCH</span>
            </div>

            <div className="bg-[#0C1220]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#253247] text-white flex items-center gap-2">
              <span className="text-[#38BDF8] font-bold">{activeChapter.title}</span>
            </div>
          </div>

          {/* Synchronized Subtitle / Live Hardware Telemetry Banner */}
          <div className="absolute bottom-16 left-4 right-4 z-20 pointer-events-none flex justify-center">
            <div className="bg-[#070A12]/90 backdrop-blur-md border border-cyan-500/40 px-4 py-2 rounded-xl text-center max-w-xl shadow-xl space-y-0.5">
              <span className="text-[10px] font-mono text-cyan-300 uppercase font-bold block">
                {activeChapter.telemetryState}
              </span>
              <p className="text-xs sm:text-sm font-sans font-bold text-white">
                {activeChapter.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Custom Video Control Toolbar */}
        <div className="p-3 sm:p-4 bg-[#0A0F1D] border-t border-[#253247] space-y-2 select-none relative z-30 font-mono text-xs">
          {/* Progress Slider */}
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-[11px] w-10 text-right">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 24}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-2 bg-[#162338] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
            />
            <span className="text-slate-400 text-[11px] w-10">{formatTime(duration)}</span>
          </div>

          {/* Bottom Control Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="p-2 rounded-xl bg-[#111B2B] hover:bg-[#1C283C] text-white border border-[#253247] transition-all"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              {/* Restart */}
              <button
                onClick={() => jumpToChapter(0)}
                className="p-2 rounded-xl bg-[#111B2B] hover:bg-[#1C283C] text-slate-300 hover:text-white border border-[#253247] transition-all"
                title="Restart Video"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Volume & Mute */}
              <div className="flex items-center gap-1.5 pl-1">
                <button
                  onClick={toggleMute}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1.5 bg-[#162338] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
                />
              </div>
            </div>

            {/* Speed & Fullscreen */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#111B2B] rounded-xl border border-[#253247] p-0.5 text-[11px]">
                {[1, 1.5, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => changeSpeed(spd)}
                    className={`px-2 py-1 rounded-lg transition-all ${
                      playbackSpeed === spd
                        ? 'bg-[#38BDF8] text-[#070A12] font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-[#111B2B] hover:bg-[#1C283C] text-slate-300 hover:text-white border border-[#253247] transition-all"
                title="Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Chapter Quick Jumps */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-[#94A3B8] uppercase block">
          VIDEO TIMELINE CHAPTERS (CLICK TO SCRUB):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 font-mono text-xs">
          {CHAPTERS.map((ch, idx) => {
            const isActive = activeChapterIdx === idx;
            return (
              <button
                key={ch.timeSec}
                onClick={() => jumpToChapter(ch.timeSec)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-[#111E33] border-2 border-[#38BDF8] text-white shadow-lg shadow-[#38BDF8]/15 scale-[1.01]'
                    : 'bg-[#0A0F1D] hover:bg-[#111B2B] border-[#253247] text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#111B2B] text-[#38BDF8] font-bold">
                    {ch.timeLabel}
                  </span>
                  {isActive && <span className="text-emerald-400 font-bold">● PLAYING</span>}
                </div>
                <h4 className="font-bold text-white truncate text-xs">{ch.title}</h4>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {ch.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Storyboard Script Drawer */}
      {showStoryboard && (
        <div className="p-5 rounded-2xl bg-[#080B12] border border-[#253247] space-y-3 font-mono text-xs animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#253247] pb-2 text-[#38BDF8]">
            <span className="font-bold flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#38BDF8]" />
              ENGINEERING SCRIPT &amp; PRESENTATION STORYBOARD
            </span>
            <span className="text-[10px] text-slate-400">Length: 24s 60fps HD</span>
          </div>

          <div className="space-y-2">
            {[
              {
                time: '0:00 - 0:06',
                topic: 'Sensor Initialization & Decoupling',
                script: 'MQ-3 heated sensor warm-up, baseline calibration, and 10kΩ voltage divider stabilization.',
              },
              {
                time: '0:06 - 0:12',
                topic: 'Ethanol Adsorption Dynamics',
                script: 'Exposing cotton-swab ethanol vapor; observing analog voltage rise from 0.66V to 2.45V on the oscilloscope trace.',
              },
              {
                time: '0:12 - 0:18',
                topic: 'Deterministic FreeRTOS Processing',
                script: '12-bit SAR ADC sampling at 100 Hz with 50-sample moving average filter eliminating electrical noise.',
              },
              {
                time: '0:18 - 0:24',
                topic: 'Starter Cutoff & Recovery',
                script: 'Opto-isolated relay contacts open in <10ms to physically disengage starter line; clean-air recovery cycle confirmed.',
              },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#0C1220] border border-[#253247] space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#38BDF8] font-bold">{s.time}</span>
                  <span className="text-white font-bold">{s.topic}</span>
                </div>
                <p className="text-[#94A3B8] text-[11px] leading-relaxed font-sans">{s.script}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
