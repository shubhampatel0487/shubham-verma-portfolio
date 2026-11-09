import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Info,
  Film,
  CheckCircle2
} from 'lucide-react';
import { projectVideos, ProjectVideo } from '../../data/videoData';

export const VideoLibrary: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<ProjectVideo>(projectVideos[0]);
  
  // Custom Video Player Controls State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentCaption, setCurrentCaption] = useState<string>('');

  const projects = [
    { id: 'all', label: 'All Project Videos' },
    { id: 'alcohol-detection', label: 'Alcohol Detection' },
    { id: 'onequiz', label: '1QUIZ Platform' },
    { id: 'assignment-checker', label: 'Assignment Checker' },
    { id: 'battery-digital-twin', label: 'PINN Battery' },
    { id: 'trustguard', label: 'TrustGuard' }
  ];

  const filteredVideos = selectedFilter === 'all'
    ? projectVideos
    : projectVideos.filter(v => v.projectId === selectedFilter);

  // Playback timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= activeVideo.durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, activeVideo.durationSeconds]);

  // Update caption based on currentTime
  useEffect(() => {
    if (!activeVideo.captions || activeVideo.captions.length === 0) {
      setCurrentCaption('');
      return;
    }
    const matched = [...activeVideo.captions]
      .reverse()
      .find((c) => currentTime >= c.time);
    setCurrentCaption(matched ? matched.text : activeVideo.captions[0].text);
  }, [currentTime, activeVideo]);

  const handleSelectVideo = (video: ProjectVideo) => {
    setActiveVideo(video);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleFullscreen = () => {
    const el = document.getElementById('project-video-player-container');
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <section id="video-library" className="py-24 relative z-10 border-t border-[#253247]/60 bg-[#070A12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] px-3.5 py-1.5 rounded-full border border-[#253247] inline-flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-[#38BDF8]" />
            Multimedia Exhibition
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
            Project Video Library &amp; Technical Walkthroughs
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Watch interactive technical breakdowns, hardware interfacing principles, and software demonstrations for each engineering system.
          </p>
        </div>

        {/* Project Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedFilter(p.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                selectedFilter === p.id
                  ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow-md shadow-[#38BDF8]/20'
                  : 'bg-[#111B2B] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#162338] border border-[#253247]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Main Cinema Grid: Left Video Player, Right Playlist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Main Video Player Screen (Column 8) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div
              id="project-video-player-container"
              className="relative aspect-video rounded-2xl bg-[#0C1220] border-2 border-[#253247] overflow-hidden shadow-2xl flex flex-col justify-between group"
            >
              {/* Animated Canvas Simulation Background */}
              <div className="absolute inset-0 bg-[#070A12] flex items-center justify-center">
                {/* Visual Graphic Schematic */}
                <img
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  className="w-3/5 max-h-56 object-contain opacity-70 group-hover:opacity-90 transition-opacity"
                />

                {/* Animated Pulsing Radar / Scan Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf80a_1px,transparent_1px),linear-gradient(to_bottom,#38bdf80a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                {/* Simulated Telemetry HUD Overlays */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#070A12]/80 backdrop-blur-md border border-[#253247] text-[11px] font-mono text-[#38BDF8]">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span>{isPlaying ? 'ACTIVE REPLAY' : 'PAUSED'}</span>
                  <span className="text-[#64748B]">|</span>
                  <span className="text-[#94A3B8]">{activeVideo.projectTitle}</span>
                </div>

                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-[#070A12]/80 backdrop-blur-md border border-[#253247] text-[10px] font-mono text-[#8B5CF6]">
                  {activeVideo.category.toUpperCase()}
                </div>

                {/* Play/Pause Center Overlay on Hover */}
                {!isPlaying && (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#070A12] flex items-center justify-center shadow-2xl shadow-[#38BDF8]/50 transform hover:scale-110 transition-transform z-20"
                    aria-label="Play video"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                )}
              </div>

              {/* Dynamic Closed Captions Box */}
              <div className="relative z-10 px-4 py-3 mx-4 mb-2 rounded-xl bg-[#070A12]/90 backdrop-blur-md border border-[#253247] text-center text-xs sm:text-sm text-[#F8FAFC] font-sans shadow-lg">
                <span className="text-[#38BDF8] font-bold font-mono mr-2">CC</span>
                {currentCaption || activeVideo.description}
              </div>

              {/* Player Controls Bar */}
              <div className="relative z-10 p-3 sm:p-4 bg-[#070A12]/95 backdrop-blur-md border-t border-[#253247] space-y-2">
                
                {/* Timeline Scrubber */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-[#94A3B8] w-10 text-right">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={activeVideo.durationSeconds}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1.5 bg-[#253247] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
                  />
                  <span className="text-[10px] font-mono text-[#94A3B8] w-10">
                    {activeVideo.duration}
                  </span>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-[#F8FAFC] border border-[#253247] transition-colors"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      onClick={() => { setCurrentTime(0); setIsPlaying(true); }}
                      className="p-1.5 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247] transition-colors"
                      title="Restart Video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247] transition-colors"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    {/* Speed Selector */}
                    <div className="flex items-center gap-1 bg-[#111B2B] p-1 rounded-lg border border-[#253247]">
                      {[1, 1.25, 1.5, 2].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-1.5 py-0.5 rounded text-[10px] ${
                            playbackSpeed === spd ? 'bg-[#38BDF8] text-[#070A12] font-bold' : 'text-[#94A3B8]'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-[#111B2B] border border-emerald-500/30">
                      1080p HD SIM
                    </span>
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247] transition-colors"
                      title="Toggle Fullscreen"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Video Metadata & Honest Status Note */}
            <div className="p-5 rounded-2xl bg-[#111B2B] border border-[#253247] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-[#F8FAFC] font-sans">
                  {activeVideo.title}
                </h3>
                <span className="text-xs font-mono text-[#38BDF8] px-2.5 py-1 rounded bg-[#0C1220] border border-[#253247]">
                  {activeVideo.projectTitle}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {activeVideo.description}
              </p>

              {/* Topics Breakdown */}
              <div className="pt-2 border-t border-[#253247]/60 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-[#64748B]">Topics Covered:</span>
                {activeVideo.keyTopics.map((topic, i) => (
                  <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0C1220] text-[#CBD5E1] border border-[#253247] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#38BDF8]" />
                    {topic}
                  </span>
                ))}
              </div>

              {/* Transparency Notice */}
              <div className="p-3 rounded-xl bg-[#070A12] border border-[#253247] text-xs font-mono text-[#94A3B8] flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Integrity Note:</strong> {activeVideo.simulationNotice || "This is a concept animation based on real engineering documentation."}
                </span>
              </div>
            </div>

          </div>

          {/* Playlist Column (Column 4) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-3.5 rounded-xl bg-[#111B2B] border border-[#253247] flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
                <Film className="w-4 h-4 text-[#38BDF8]" />
                Video Library ({filteredVideos.length})
              </h4>
              <span className="text-[10px] font-mono text-[#64748B]">Click to stream</span>
            </div>

            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {filteredVideos.map((video) => {
                const isSelected = activeVideo.id === video.id;
                return (
                  <div
                    key={video.id}
                    onClick={() => handleSelectVideo(video)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                      isSelected
                        ? 'bg-[#162338] border-[#38BDF8] shadow-lg'
                        : 'bg-[#111B2B] border-[#253247] hover:border-[#38BDF8]/40 hover:bg-[#162338]'
                    }`}
                  >
                    <div className="relative w-20 h-16 rounded-lg bg-[#070A12] border border-[#253247] flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img src={video.thumbnail} alt={video.title} className="w-12 h-12 object-contain" />
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-[#070A12]/90 px-1 rounded text-[#94A3B8]">
                        {video.duration}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <p className={`text-xs font-bold line-clamp-2 ${isSelected ? 'text-[#38BDF8]' : 'text-[#F8FAFC]'}`}>
                        {video.title}
                      </p>
                      <p className="text-[10px] font-mono text-[#64748B] truncate">
                        {video.projectTitle}
                      </p>
                      <span className="inline-block text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#070A12] text-[#8B5CF6] border border-[#253247]">
                        {video.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
