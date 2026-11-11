import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  X,
  UploadCloud,
  Camera
} from 'lucide-react';
import { ALCOHOL_PROJECT_DATA } from './alcoholProjectData';

export const AlcoholPhotoGallery: React.FC = () => {
  const photos = ALCOHOL_PROJECT_DATA.galleryPhotos;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const categories = [
    'All',
    'Controller',
    'Sensor',
    'Circuit Connections',
    'Prototype Assembly',
    'Testing Setup',
    'Final Prototype'
  ];

  const filteredPhotos = selectedCategory === 'All'
    ? photos
    : photos.filter(p => p.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActivePhotoIdx(index);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setActivePhotoIdx(null);
    setZoomLevel(1);
  };

  const nextPhoto = () => {
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((activePhotoIdx + 1) % filteredPhotos.length);
    setZoomLevel(1);
  };

  const prevPhoto = () => {
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((activePhotoIdx - 1 + filteredPhotos.length) % filteredPhotos.length);
    setZoomLevel(1);
  };

  return (
    <section id="alcohol-gallery" className="space-y-6">
      
      {/* Header & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#253247] pb-4">
        <div>
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider block">
            PHASE 08 // HARDWARE PHOTO &amp; BENCH EVIDENCE
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-sans text-[#F8FAFC]">
            Hardware Gallery &amp; Bench Documentation
          </h3>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1 bg-[#0C1220] p-1 rounded-xl border border-[#253247] text-xs font-mono">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-[#38BDF8] text-[#070A12] font-bold shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111B2B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Physical Evidence Banner */}
      <div className="p-3.5 rounded-xl bg-[#0B1528] border border-[#38BDF8]/30 flex items-center justify-between text-xs font-mono text-[#94A3B8] shadow-lg">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
          <span><strong className="text-white">Physical Bench Evidence Active:</strong> 6 High-resolution laboratory bench photographs documented across target microcontroller, SnO2 sensor, breadboard routing, 5V optocoupled relay, and fully assembled demonstrator unit. Tap any photo to inspect in high-res lightbox.</span>
        </div>
      </div>

      {/* Grid of Photo Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(index)}
            className="rounded-2xl bg-[#0C1220] border border-[#253247] hover:border-[#38BDF8]/50 overflow-hidden cursor-pointer transition-all group flex flex-col justify-between shadow-lg"
          >
            {/* Image / Placeholder Area */}
            <div className="relative aspect-video bg-[#080B12] border-b border-[#253247] flex items-center justify-center p-4 overflow-hidden">
              {photo.imageSrc ? (
                <img
                  src={photo.imageSrc}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                /* Polished Upload-Ready Placeholder */
                <div className="text-center space-y-2 p-4">
                  <div className="w-10 h-10 rounded-xl bg-[#111B2B] border border-[#253247] text-[#38BDF8] flex items-center justify-center mx-auto group-hover:scale-110 group-hover:border-[#38BDF8]/50 transition-all">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-[#64748B] block">
                    BENCH PHOTO PLACEHOLDER
                  </span>
                  <p className="text-[10px] font-mono text-[#94A3B8] max-w-[200px] mx-auto truncate">
                    {photo.placeholderHint}
                  </p>
                </div>
              )}

              {/* Category Pill */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#070A12]/90 backdrop-blur-md border border-[#253247] text-[10px] font-mono text-[#38BDF8]">
                {photo.badge}
              </div>

              {/* Hover Zoom Cue */}
              <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-[#070A12]/80 text-[#94A3B8] group-hover:text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            {/* Photo Metadata */}
            <div className="p-4 space-y-1">
              <span className="text-[10px] font-mono text-[#64748B] uppercase">
                {photo.category}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors font-sans">
                {photo.title}
              </h4>
              <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                {photo.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A12]/95 backdrop-blur-xl"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-[#0C1220] border-2 border-[#253247] overflow-hidden shadow-2xl text-[#F8FAFC]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Controls Bar */}
            <div className="flex items-center justify-between p-4 border-b border-[#253247] bg-[#070A12]">
              <div>
                <span className="text-[10px] font-mono text-[#38BDF8] uppercase">
                  {filteredPhotos[activePhotoIdx].category} &bull; Photo {activePhotoIdx + 1} of {filteredPhotos.length}
                </span>
                <h4 className="text-sm sm:text-base font-bold font-sans">
                  {filteredPhotos[activePhotoIdx].title}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="p-1.5 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247]"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
                  className="p-1.5 rounded-lg bg-[#111B2B] hover:bg-[#162338] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#253247]"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={closeLightbox}
                  className="p-1.5 rounded-lg bg-[#111B2B] hover:bg-red-500/20 text-[#94A3B8] hover:text-red-400 border border-[#253247]"
                  title="Close Lightbox"
                  aria-label="Close Lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lightbox Visual Stage */}
            <div className="relative aspect-video bg-[#070A12] flex items-center justify-center p-6 overflow-hidden">
              {filteredPhotos[activePhotoIdx].imageSrc ? (
                <img
                  src={filteredPhotos[activePhotoIdx].imageSrc}
                  alt={filteredPhotos[activePhotoIdx].title}
                  className="max-h-full object-contain transition-transform duration-200"
                  style={{ transform: `scale(${zoomLevel})` }}
                />
              ) : (
                <div className="text-center space-y-3 p-8 border border-dashed border-[#253247] rounded-2xl max-w-md">
                  <UploadCloud className="w-12 h-12 text-[#38BDF8] mx-auto animate-pulse" />
                  <h5 className="text-sm font-bold font-sans">
                    Bench Evidence Slot Ready
                  </h5>
                  <p className="text-xs font-mono text-[#94A3B8]">
                    {filteredPhotos[activePhotoIdx].placeholderHint}
                  </p>
                  <span className="inline-block text-[10px] font-mono px-3 py-1 rounded-full bg-[#111B2B] text-emerald-400 border border-emerald-500/30">
                    File binding: public/projects/alcohol-bench-{activePhotoIdx + 1}.jpg
                  </span>
                </div>
              )}

              {/* Prev / Next Arrows */}
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#070A12]/80 hover:bg-[#111B2B] text-[#F8FAFC] border border-[#253247] shadow-xl"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#070A12]/80 hover:bg-[#111B2B] text-[#F8FAFC] border border-[#253247] shadow-xl"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Description Footer */}
            <div className="p-4 bg-[#080B12] border-t border-[#253247] text-xs text-[#CBD5E1] font-sans">
              <p>{filteredPhotos[activePhotoIdx].description}</p>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
