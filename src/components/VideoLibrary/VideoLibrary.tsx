import React, { useState, useRef, useEffect } from 'react';
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
  CheckCircle2,
  Sparkles,
  Subtitles
} from 'lucide-react';
import { projectVideos, ProjectVideo } from '../../data/videoData';

export const VideoLibrary: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<ProjectVideo>(projectVideos[0]);
  
  // Custom Video Player Controls State
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(activeVideo.durationSeconds || 16);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [currentCaption, setCurrentCaption] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const projects = [
    { id: 'all', label: 'All Project Videos' },
    { id: 'alcohol-detection', label: 'Alcohol Detection' },
    { id: 'assignment-checker', label: 'Assignment Checker' },
    { id: 'onequiz', label: '1QUIZ Platform' },
    { id: 'robotics-drone', label: 'Robotics & Drone' }
  ];

  const filteredVideos = selectedFilter === 'all'
    ? projectVideos
    : projectVideos.filter(v => v.projectId === selectedFilter);

  // Sync state with HTML5 Video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
      setIsLoading(false);
    };

    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, [activeVideo]);

  // Update caption based on currentTime
  useEffect(() => {
    if (!showCaptions || !activeVideo.captions || activeVideo.captions.length === 0) {
      setCurrentCaption('');
      return;
    }
    const matched = [...activeVideo.captions]
      .reverse()
      .find((c) => currentTime >= c.time);
    setCurrentCaption(matched ? matched.text : activeVideo.captions[0].text);
  }, [currentTime, activeVideo, showCaptions]);

  // Play / Pause toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleSelectVideo = (video: ProjectVideo) => {
    setActiveVideo(video);
    setCurrentTime(0);
    setIsLoading(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }, 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  const handleSpeedChange = (spd: number) => {
    setPlaybackSpeed(spd);
    if (videoRef.current) {
      videoRef.current.playbackRate = spd;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = (newVol === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      videoRef.current.muted = nextMuted;
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleFullscreen = () => {
    const container = playerContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="video-library" className="py-20 sm:py-28 relative z-10 border-t border-[#253247]/60 bg-[#070D18]/95 overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest text-[#38BDF8] uppercase bg-[#111B2B] border border-[#38BDF8]/30 shadow-sm shadow-[#38BDF8]/10">
            <Film className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>07 // High-Definition Technical Demos</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
            Project Video Library &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC]">Technical Walkthroughs</span>
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            Watch verified 1080p high-definition hardware interlock demonstrations, software execution screens, and autonomous robotics simulations with full playback controls.
          </p>
        </div>

        {/* Project Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedFilter(p.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedFilter === p.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25 scale-[1.02]'
                  : 'bg-[#111B2B] text-slate-300 hover:text-white hover:bg-[#162338] border border-[#253247]'
              }`}
            >
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        {/* Main Cinema Grid: Left Video Player, Right Playlist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-12">
          
          {/* Main Video Player Screen (Column 8) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div
              ref={playerContainerRef}
              id="project-video-player-container"
              className="relative aspect-video rounded-2xl sm:rounded-3xl bg-[#050912] border-2 border-[#253247] overflow-hidden shadow-2xl flex flex-col justify-between group"
            >
              {/* Native HTML5 Video Element */}
              {activeVideo.videoUrl ? (
                <video
                  ref={videoRef}
                  src={activeVideo.videoUrl}
                  poster={activeVideo.thumbnail}
                  playsInline
                  onClick={togglePlay}
                  className="w-full h-full object-cover cursor-pointer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#0B132B]">
                  <img src={activeVideo.thumbnail} alt={activeVideo.title} className="w-1/2 object-contain opacity-60" />
                </div>
              )}

              {/* Top Video HUD Badges */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 z-20 pointer-events-none">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#070D18]/85 backdrop-blur-md border border-[#253247] text-[10px] sm:text-xs font-mono text-cyan-400 font-bold">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span>{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#070D18]/85 backdrop-blur-md border border-[#253247] text-[10px] sm:text-xs font-mono text-purple-400 font-semibold hidden sm:inline">
                  {activeVideo.projectTitle}
                </span>
              </div>

              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 z-20 pointer-events-none">
                <span className="px-2.5 py-1 rounded-lg bg-[#070D18]/85 backdrop-blur-md border border-cyan-500/30 text-[10px] sm:text-xs font-mono text-cyan-400 font-bold">
                  1080P HD • 30 FPS
                </span>
              </div>

              {/* Center Play Button Overlay when Paused */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-cyan-500/50 transform hover:scale-110 transition-transform z-20"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                </button>
              )}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 pointer-events-none">
                  <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* Dynamic Closed Captions Banner */}
              {showCaptions && currentCaption && (
                <div className="relative z-20 px-3 py-2 sm:px-4 sm:py-2.5 mx-3 sm:mx-6 mb-2 rounded-xl bg-[#070D18]/90 backdrop-blur-md border border-cyan-500/30 text-center text-xs sm:text-sm text-white font-sans shadow-lg">
                  <span className="text-cyan-400 font-bold font-mono mr-2">[CC]</span>
                  <span>{currentCaption}</span>
                </div>
              )}

              {/* Video Player Controls Bar */}
              <div className="relative z-20 p-2.5 sm:p-4 bg-[#070D18]/95 backdrop-blur-md border-t border-[#253247] space-y-2">
                
                {/* Timeline Scrubber */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-[10px] sm:text-xs font-mono text-slate-400 w-10 sm:w-12 text-right">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 16}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1.5 sm:h-2 bg-[#253247] rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <span className="text-[10px] sm:text-xs font-mono text-slate-400 w-10 sm:w-12">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Control Buttons Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  
                  {/* Left Controls: Play, Restart, Volume, Speed */}
                  <div className="flex items-center gap-1.5 sm:gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 sm:p-2 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-white border border-[#253247] transition-colors"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      onClick={handleRestart}
                      className="p-1.5 sm:p-2 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-slate-300 hover:text-white border border-[#253247] transition-colors"
                      title="Restart Video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Volume & Mute */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={toggleMute}
                        className="p-1.5 sm:p-2 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-slate-300 hover:text-white border border-[#253247] transition-colors"
                        title={isMuted ? "Unmute" : "Mute"}
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
                        className="w-12 sm:w-20 h-1 bg-[#253247] rounded appearance-none cursor-pointer accent-cyan-400 hidden sm:inline"
                        title="Volume Slider"
                      />
                    </div>

                    {/* Speed Selector */}
                    <div className="flex items-center gap-0.5 sm:gap-1 bg-[#111B2B] p-0.5 sm:p-1 rounded-lg border border-[#253247]">
                      {[1, 1.25, 1.5].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => handleSpeedChange(spd)}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                            playbackSpeed === spd ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Controls: Captions Toggle & Fullscreen */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={() => setShowCaptions(!showCaptions)}
                      className={`px-2 py-1 rounded-lg text-[10px] sm:text-xs font-mono border flex items-center gap-1 transition-colors ${
                        showCaptions 
                          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' 
                          : 'bg-[#111B2B] text-slate-400 border-[#253247]'
                      }`}
                      title="Toggle Captions"
                    >
                      <Subtitles className="w-3.5 h-3.5" />
                      <span>CC</span>
                    </button>

                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 sm:p-2 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-slate-300 hover:text-white border border-[#253247] transition-colors"
                      title="Toggle Fullscreen"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* Video Metadata & Engineering Rationale Card */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#0C1425] border border-[#253247] space-y-3.5 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base sm:text-xl font-bold text-white font-sans">
                  {activeVideo.title}
                </h3>
                <span className="text-xs font-mono text-cyan-400 px-2.5 py-1 rounded bg-[#111B2B] border border-[#253247]">
                  {activeVideo.projectTitle}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {activeVideo.description}
              </p>

              {/* Topics Breakdown Chips */}
              <div className="pt-2 border-t border-[#253247]/60 space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Demonstrated Engineering Topics:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {activeVideo.keyTopics.map((topic, i) => (
                    <span 
                      key={i} 
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#111D30] text-slate-200 border border-[#253752] flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      <span>{topic}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Transparency Notice */}
              <div className="p-3 rounded-xl bg-[#070D18] border border-[#253247] text-xs font-mono text-slate-400 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-amber-300">Engineering Transparency:</strong> {activeVideo.simulationNotice || "Demonstration rendered using 1080p 30fps physics & signal simulation based on verified project documentation."}
                </span>
              </div>
            </div>

          </div>

          {/* Playlist Column (Column 4) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-3.5 rounded-xl bg-[#0C1425] border border-[#253247] flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Film className="w-4 h-4 text-cyan-400" />
                <span>Featured Demos ({filteredVideos.length})</span>
              </h4>
              <span className="text-[10px] font-mono text-cyan-400 bg-[#111B2B] px-2 py-0.5 rounded border border-[#253247]">
                1080p Available
              </span>
            </div>

            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1 scrollbar-none">
              {filteredVideos.map((video) => {
                const isSelected = activeVideo.id === video.id;
                return (
                  <div
                    key={video.id}
                    onClick={() => handleSelectVideo(video)}
                    className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                      isSelected
                        ? 'bg-[#111D30] border-cyan-400 shadow-lg shadow-cyan-500/10'
                        : 'bg-[#0C1425] border-[#253247] hover:border-cyan-500/40 hover:bg-[#111B2B]'
                    }`}
                  >
                    {/* Thumbnail box */}
                    <div className="relative w-24 h-16 rounded-lg bg-[#070A12] border border-[#253247] flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img src={video.thumbnail} alt={video.title} className="w-12 h-12 object-contain" />
                      
                      {/* Play overlay or Duration */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-cyan-950/70 flex items-center justify-center">
                          <Play className="w-5 h-5 text-cyan-400 fill-current animate-pulse" />
                        </div>
                      )}
                      
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 px-1 rounded text-slate-300">
                        {video.duration}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className={`text-xs font-bold line-clamp-2 leading-snug ${isSelected ? 'text-cyan-400' : 'text-white'}`}>
                        {video.title}
                      </p>
                      <p className="text-[10px] font-mono text-slate-400 truncate">
                        {video.projectTitle}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className="inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#111B2B] text-purple-400 border border-[#253247]">
                          {video.category}
                        </span>
                        {video.videoUrl && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                            <Sparkles className="w-2.5 h-2.5" />
                            1080p MP4
                          </span>
                        )}
                      </div>
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
