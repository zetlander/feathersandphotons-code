import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { birdPhotos, deepSkyPhotos, initialFeedbackList, BirdPhoto, DeepSkyPhoto } from '@/data/photography'
import { ImageLightbox } from '@/components/ImageLightbox'
import { 
  Feather, Telescope, Sparkles, MessageSquareText, 
  ArrowRight, Camera, Compass, Layers, ShieldCheck, 
  Clock, MapPin, Eye, Star 
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const [selectedPhoto, setSelectedPhoto] = useState<BirdPhoto | DeepSkyPhoto | null>(null)
  const [lightboxType, setLightboxType] = useState<'bird' | 'deepSky'>('bird')

  const featuredBirds = birdPhotos.filter((b) => b.featured)
  const featuredDeepSky = deepSkyPhotos.filter((d) => d.featured)

  const openBirdLightbox = (photo: BirdPhoto) => {
    setSelectedPhoto(photo)
    setLightboxType('bird')
  }

  const openDeepSkyLightbox = (photo: DeepSkyPhoto) => {
    setSelectedPhoto(photo)
    setLightboxType('deepSky')
  }

  return (
    <div className="relative overflow-hidden cosmic-gradient-bg">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Subtle decorative badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono-telemetry uppercase tracking-wider bg-slate-900/90 text-amber-300 border border-amber-500/30 shadow-sm">
            <Feather className="w-3.5 h-3.5" />
            1/5000s Birds in Flight
          </span>
          <span className="text-slate-600">&bull;</span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono-telemetry uppercase tracking-wider bg-slate-900/90 text-sky-300 border border-sky-500/30 shadow-sm">
            <Telescope className="w-3.5 h-3.5" />
            5+ Hr Deep Sky Integrations
          </span>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 tracking-tight leading-[1.1]">
            Birds <br />
            <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-sky-300 bg-clip-text text-transparent">
              &amp; Nebulae
            </span>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            A photographic archive spanning contrasting scales: freezing the motion of birds in flight by day, and unveiling diffuse nebulae by night.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/birds"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-semibold hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg shadow-amber-950/40 text-sm"
            >
              <Feather className="w-4 h-4" />
              <span>Explore Birds Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/deep-sky"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold hover:from-sky-500 hover:to-indigo-500 transition-all shadow-lg shadow-sky-950/40 text-sm"
            >
              <Telescope className="w-4 h-4" />
              <span>Explore Deep Sky Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/feedback"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 text-slate-200 hover:text-white hover:bg-slate-800 border border-slate-700/80 transition-all text-sm font-medium"
            >
              <MessageSquareText className="w-4 h-4 text-amber-400" />
              <span>Viewer Feedback</span>
            </Link>
          </div>
        </div>

        {/* Dual Realm Split Gateways (Interactive Portals) */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Birds Showcase Portal */}
          <div className="group relative rounded-3xl overflow-hidden border border-amber-500/20 bg-slate-900/60 p-8 shadow-2xl transition-all duration-300 hover:border-amber-400/50">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-2 text-xs font-mono-telemetry uppercase tracking-wider text-amber-300 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                    <Feather className="w-3.5 h-3.5" />
                    Birds in action
                  </span>
                  <span className="text-xs font-mono-telemetry text-slate-400">
                    8 Curated Specimens
                  </span>
                </div>

                <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-100 group-hover:text-amber-200 transition-colors">
                  Life of Birds
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mt-2">
                  High-speed telephoto studies capturing microscopic details
                </p>
              </div>

              {/* Mini Preview Collage */}
              <div className="grid grid-cols-2 gap-3 py-2">
                {birdPhotos.slice(0, 2).map((bird) => (
                  <div
                    key={bird.id}
                    onClick={() => openBirdLightbox(bird)}
                    className="relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer group/card border border-slate-800"
                  >
                    <img
                      src={bird.thumbUrl}
                      alt={bird.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
                      <span className="text-white text-xs font-serif-display font-semibold truncate">
                        {bird.title}
                      </span>
                      <span className="text-amber-300/90 text-[10px] font-mono-telemetry">
                        {bird.exif.shutterSpeed} &bull; {bird.exif.focalLength}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs font-mono-telemetry text-slate-400">
                  Gear: Nikon Z8 &bull; 400mm f/4.5 &bull; 1.4x Tele
                </div>
                <Link
                  to="/birds"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 group-hover:translate-x-1 transition-all"
                >
                  Enter Bird Gallery &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Deep Sky Showcase Portal */}
          <div className="group relative rounded-3xl overflow-hidden border border-sky-500/20 bg-slate-900/60 p-8 shadow-2xl transition-all duration-300 hover:border-sky-400/50">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-2 text-xs font-mono-telemetry uppercase tracking-wider text-sky-300 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30">
                    <Telescope className="w-3.5 h-3.5" />
                    Deep Space Realm
                  </span>
                  <span className="text-xs font-mono-telemetry text-slate-400">
                    8 Celestial Targets
                  </span>
                </div>

                <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-100 group-hover:text-sky-200 transition-colors">
                  Drama in Deep Space
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mt-2">
                  Narrowband astrophotography isolating ionized H-alpha, OIII, and SII emissions across thousands of light-years, captured over several hours.
                </p>
              </div>

              {/* Mini Preview Collage */}
              <div className="grid grid-cols-2 gap-3 py-2">
                {deepSkyPhotos.slice(0, 2).map((dso) => (
                  <div
                    key={dso.id}
                    onClick={() => openDeepSkyLightbox(dso)}
                    className="relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer group/card border border-slate-800"
                  >
                    <img
                      src={dso.thumbUrl}
                      alt={dso.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
                      <span className="text-white text-xs font-serif-display font-semibold truncate">
                        {dso.title}
                      </span>
                      <span className="text-sky-300 text-[10px] font-mono-telemetry">
                        {dso.astronomyExif.totalIntegration.split(' ')[0]} Integration
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs font-mono-telemetry text-slate-400">
                  Rig: Redcat 51 wifd &bull; QHY minicam8 mono
                </div>
                <Link
                  to="/deep-sky"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 hover:text-sky-200 group-hover:translate-x-1 transition-all"
                >
                  Enter Deep Sky Gallery &rarr;
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Curated Plates Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono-telemetry uppercase tracking-wider text-amber-400">
              Photographer Highlights
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-100 mt-1">
              Curated Masterworks
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Click any plate to inspect full-resolution optical telemetry, exposure parameters, and field logs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/birds"
              className="text-xs font-mono-telemetry px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 hover:bg-slate-800 transition-colors"
            >
              All 8 Birds &rarr;
            </Link>
            <Link
              to="/deep-sky"
              className="text-xs font-mono-telemetry px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-300 hover:bg-slate-800 transition-colors"
            >
              All 8 Deep Sky Objects &rarr;
            </Link>
          </div>
        </div>

        {/* 4 Birds + 4 Deep Sky Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Bird highlights */}
          {featuredBirds.slice(0, 4).map((bird) => (
            <div
              key={bird.id}
              onClick={() => openBirdLightbox(bird)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-800 hover:border-amber-400/50 transition-all duration-300 shadow-xl flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src={bird.imageUrl}
                  alt={bird.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 text-[10px] font-mono-telemetry px-2 py-0.5 rounded-full bg-slate-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                  Avian &bull; {bird.exif.shutterSpeed}
                </span>
                <span className="absolute bottom-2.5 right-2.5 p-1.5 rounded-md bg-slate-950/70 text-slate-300 group-hover:text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-display font-semibold text-slate-100 text-base group-hover:text-amber-200 transition-colors">
                    {bird.title}
                  </h3>
                  <p className="text-slate-400 text-xs italic font-serif-display mt-0.5">
                    {bird.species}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-telemetry text-slate-400">
                  <span>{bird.exif.focalLength}</span>
                  <span className="text-amber-400/90">{bird.exif.aperture}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Deep sky highlights */}
          {featuredDeepSky.slice(0, 4).map((dso) => (
            <div
              key={dso.id}
              onClick={() => openDeepSkyLightbox(dso)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-800 hover:border-sky-400/50 transition-all duration-300 shadow-xl flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src={dso.imageUrl}
                  alt={dso.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 text-[10px] font-mono-telemetry px-2 py-0.5 rounded-full bg-slate-950/80 text-sky-300 border border-sky-500/30 backdrop-blur-sm">
                  Astro &bull; {dso.astronomyExif.bortleClass.split(' ')[0]} {dso.astronomyExif.bortleClass.split(' ')[1]}
                </span>
                <span className="absolute bottom-2.5 right-2.5 p-1.5 rounded-md bg-slate-950/70 text-slate-300 group-hover:text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-display font-semibold text-slate-100 text-base group-hover:text-sky-200 transition-colors">
                    {dso.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-mono-telemetry mt-0.5">
                    {dso.catalogId.split('/')[0]} &bull; {dso.distance}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-telemetry text-slate-400">
                  <span className="text-sky-300">{dso.astronomyExif.totalIntegration.split(' ')[0]} Exp</span>
                  <span>{dso.constellation}</span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Photographer's Statement: The Philosophy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-mono-telemetry uppercase tracking-widest text-slate-400">
              The Dual Perspective
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-100">
              Why Combine Birds &amp; Deep Sky Objects?
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-sky-400 mx-auto rounded-full" />
            
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              "At first glance, avian photography and deep sky astrophotography seem like opposite disciplines. Wildlife photography is instinctual, kinetic, and conducted in fleeting fractions of a second under natural daylight. Astrophotography is meditative, mathematical, and conducted over dozens of cumulative dark hours tracking celestial rotation."
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              "Yet both demand absolute reverence for light and optical precision. Both require patience in the wild—whether waiting in a damp river reed hide at sunrise for a kingfisher plunge, or aligning harmonic mounts beneath a Bortle 4.5 sky. They are two vantage points of the same miracle: the speed of life on Earth, and the eternal stillness of deep space."
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 text-left">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <Camera className="w-5 h-5 text-amber-400 mb-2" />
                <div className="text-xs font-mono-telemetry text-slate-400 uppercase">Field Ethics</div>
                <div className="text-sm font-semibold text-slate-200 mt-1">Zero Wildlife Baiting</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <Layers className="w-5 h-5 text-sky-400 mb-2" />
                <div className="text-xs font-mono-telemetry text-slate-400 uppercase">Astrophotography</div>
                <div className="text-sm font-semibold text-slate-200 mt-1">True Narrowband SHO</div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <MessageSquareText className="w-5 h-5 text-rose-400 mb-2" />
                <div className="text-xs font-mono-telemetry text-slate-400 uppercase">Community</div>
                <div className="text-sm font-semibold text-slate-200 mt-1">Open Peer Critique</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Viewer Feedback Section Teaser */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900 mb-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
          <div>
            <span className="text-xs font-mono-telemetry uppercase tracking-wider text-amber-400">
              Community Dialogue
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-slate-100 mt-1">
              Viewer Feedback &amp; Peer Reviews
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Photographs become alive through viewer conversation. Read thoughts from fellow photographers, scientists, and art collectors, or share your own thoughts.
            </p>
          </div>

          <Link
            to="/feedback"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-slate-800 to-sky-500/20 border border-amber-500/40 text-amber-300 hover:text-white text-sm font-medium hover:border-amber-400 transition-all shadow-md shrink-0"
          >
            <MessageSquareText className="w-4 h-4" />
            <span>Leave Your Feedback or Critique &rarr;</span>
          </Link>
        </div>

        {/* Feedback Cards Carousel/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialFeedbackList.map((fb) => (
            <div
              key={fb.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: fb.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono-telemetry px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {fb.category}
                  </span>
                </div>

                {fb.targetPhoto && (
                  <div className="text-xs font-mono-telemetry text-slate-400 truncate">
                    Target: {fb.targetPhoto}
                  </div>
                )}

                <p className="text-slate-300 text-xs leading-relaxed italic">
                  "{fb.message}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-medium text-slate-200">{fb.name}</span>
                <span>{fb.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <ImageLightbox
          photo={selectedPhoto}
          type={lightboxType}
          allPhotos={lightboxType === 'bird' ? birdPhotos : deepSkyPhotos}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={(p) => setSelectedPhoto(p)}
        />
      )}

    </div>
  )
}
