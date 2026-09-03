import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { BirdPhoto, DeepSkyPhoto } from '@/data/photography'
import { 
  X, ChevronLeft, ChevronRight, MessageSquareText, 
  Camera, Telescope, MapPin, Calendar, Clock, 
  Layers, Compass, Info, Maximize2, Minimize2, Sparkles 
} from 'lucide-react'

interface ImageLightboxProps {
  photo: BirdPhoto | DeepSkyPhoto | null
  type: 'bird' | 'deepSky'
  allPhotos: (BirdPhoto | DeepSkyPhoto)[]
  onClose: () => void
  onNavigate: (photo: BirdPhoto | DeepSkyPhoto) => void
}

export function ImageLightbox({
  photo,
  type,
  allPhotos,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'story'>('details')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [photo, allPhotos])

  if (!photo) return null

  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id)
  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(allPhotos[currentIndex - 1])
      setIsZoomed(false)
    }
  }
  const handleNext = () => {
    if (currentIndex < allPhotos.length - 1) {
      onNavigate(allPhotos[currentIndex + 1])
      setIsZoomed(false)
    }
  }

  const isBird = type === 'bird'
  const bird = isBird ? (photo as BirdPhoto) : null
  const dso = !isBird ? (photo as DeepSkyPhoto) : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all animate-in fade-in duration-200">
      
      {/* Top Action Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 px-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className={`text-xs px-2.5 py-1 rounded-full font-mono-telemetry uppercase tracking-wider ${
            isBird 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
              : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
          }`}>
            {isBird ? 'Avian Specimen' : 'Celestial Object'}
          </span>
          <span className="text-slate-400 text-xs font-mono-telemetry">
            Plate {currentIndex + 1} of {allPhotos.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-lg bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700/60"
            title={isZoomed ? 'Reset zoom' : 'Fit/Expand'}
          >
            {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-700/60"
            title="Close viewer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Prev / Next Chevrons */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/70 hover:bg-slate-800 text-slate-200 border border-slate-700/60 hover:scale-105 transition-all shadow-xl"
          title="Previous plate (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentIndex < allPhotos.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/70 hover:bg-slate-800 text-slate-200 border border-slate-700/60 hover:scale-105 transition-all shadow-xl"
          title="Next plate (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Content Area */}
      <div className="w-full h-full flex flex-col lg:flex-row pt-16 pb-6 px-4 lg:px-12 gap-6 overflow-y-auto lg:overflow-hidden">
        
        {/* Left: Image Container */}
        <div className="flex-1 flex items-center justify-center relative min-h-[50vh] lg:min-h-full">
          <div className={`relative max-w-full max-h-full transition-all duration-300 ${
            isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
          }`} onClick={() => setIsZoomed(!isZoomed)}>
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="max-h-[82vh] w-auto max-w-full object-contain rounded-lg shadow-2xl shadow-black/80 border border-slate-800"
            />
          </div>
        </div>

        {/* Right: Telemetry & Story Sidebar */}
        <div className="w-full lg:w-[420px] bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-2xl backdrop-blur-md overflow-y-auto max-h-[85vh]">
          
          {/* Header Title */}
          <div className="border-b border-slate-800 pb-4 mb-4">
            <h3 className="font-serif-display text-2xl font-bold text-slate-100">
              {photo.title}
            </h3>
            {bird && (
              <p className="text-amber-400/90 font-serif-display italic text-sm mt-0.5">
                {bird.species} <span className="text-slate-400 font-mono-telemetry text-xs not-italic">({bird.scientificName})</span>
              </p>
            )}
            {dso && (
              <p className="text-sky-400 font-mono-telemetry text-xs mt-0.5">
                {dso.catalogId} &bull; {dso.constellation} &bull; {dso.distance}
              </p>
            )}
          </div>

          {/* Tab Selector */}
          <div className="flex rounded-lg bg-slate-950 p-1 mb-4 border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-1.5 rounded-md transition-all ${
                activeTab === 'details'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Telemetry &amp; Optics
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`flex-1 py-1.5 rounded-md transition-all ${
                activeTab === 'story'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Field Log &amp; Story
            </button>
          </div>

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-4 text-xs flex-1">
              {bird && (
                <div className="space-y-2.5">
                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 space-y-1.5">
                    <span className="text-[10px] uppercase font-mono-telemetry text-amber-400 tracking-wider">
                      Optical Rig
                    </span>
                    <div className="text-slate-200 font-medium">{bird.exif.camera}</div>
                    <div className="text-slate-400">{bird.exif.lens}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-mono-telemetry">Focal Length</span>
                      <p className="text-slate-200 font-mono-telemetry font-medium">{bird.exif.focalLength}</p>
                    </div>
                    <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-mono-telemetry">Aperture</span>
                      <p className="text-slate-200 font-mono-telemetry font-medium">{bird.exif.aperture}</p>
                    </div>
                    <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-mono-telemetry">Shutter Speed</span>
                      <p className="text-slate-200 font-mono-telemetry font-medium">{bird.exif.shutterSpeed}</p>
                    </div>
                    <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-mono-telemetry">ISO Sensitivity</span>
                      <p className="text-slate-200 font-mono-telemetry font-medium">ISO {bird.exif.iso}</p>
                    </div>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-mono-telemetry text-slate-400 tracking-wider">
                      Location &amp; Sighting
                    </span>
                    <div className="text-slate-200 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{bird.location}</span>
                    </div>
                    <div className="text-slate-400 text-[11px] pl-5">{bird.habitat}</div>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-mono-telemetry">Support / Hide</span>
                    <p className="text-slate-300 mt-0.5">{bird.exif.support}</p>
                  </div>
                </div>
              )}

              {dso && (
                <div className="space-y-2.5">
                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-mono-telemetry text-sky-400 tracking-wider">
                      Astrograph &amp; Mount
                    </span>
                    <div className="text-slate-200 font-medium">{dso.astronomyExif.telescope}</div>
                    <div className="text-slate-400">{dso.astronomyExif.mount}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-mono-telemetry">Total Integration</span>
                      <p className="text-slate-200 font-mono-telemetry font-semibold text-sky-300">
                        {dso.astronomyExif.totalIntegration}
                      </p>
                    </div>
                    <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 font-mono-telemetry">Sky Darkness</span>
                      <p className="text-slate-200 font-mono-telemetry font-medium">{dso.astronomyExif.bortleClass}</p>
                    </div>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-mono-telemetry text-slate-400 tracking-wider">
                      Cooled Sensor &amp; Filters
                    </span>
                    <div className="text-slate-200">{dso.astronomyExif.camera}</div>
                    <div className="text-slate-400 text-[11px]">{dso.astronomyExif.filters}</div>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono-telemetry">Stacking / Post-Processing</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{dso.astronomyExif.processingSoftware}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Story Tab */}
          {activeTab === 'story' && (
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed flex-1">
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-mono-telemetry tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Photographer Field Notes
                </span>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{photo.fieldNotes}"
                </p>
              </div>

              {bird && (
                <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/60 space-y-1">
                  <div className="text-slate-400 text-[11px]">Recorded Date: {bird.date}</div>
                  <div className="text-slate-400 text-[11px]">Estimated Wingspan: {bird.wingspan}</div>
                </div>
              )}

              {dso && (
                <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/60 space-y-1">
                  <div className="text-slate-400 text-[11px]">Target Window: {dso.targetSeason}</div>
                  <div className="text-slate-400 text-[11px]">Celestial Coordinates: {dso.celestialCoordinates}</div>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 pt-2">
                {photo.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono-telemetry"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Feedback Direct Action */}
          <div className="pt-4 mt-4 border-t border-slate-800 space-y-2">
            <Link
              to="/feedback"
              search={{ photo: photo.title }}
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-slate-800 to-sky-500/20 hover:from-amber-500/30 hover:to-sky-500/30 border border-slate-700 text-slate-100 text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-md group"
            >
              <MessageSquareText className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Give Feedback or Critique on This Plate</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
