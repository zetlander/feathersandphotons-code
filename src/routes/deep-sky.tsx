import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { deepSkyPhotos, DeepSkyPhoto } from '@/data/photography'
import { ImageLightbox } from '@/components/ImageLightbox'
import { 
  Telescope, Search, Filter, Layers, Eye, 
  MessageSquareText, Sparkles, ArrowUpDown, Clock, 
  Compass, Radio, Moon 
} from 'lucide-react'

export const Route = createFileRoute('/deep-sky')({
  component: DeepSkyPage,
})

function DeepSkyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<'default' | 'integration' | 'distance' | 'rating'>('default')
  const [selectedPhoto, setSelectedPhoto] = useState<DeepSkyPhoto | null>(null)

  const categories = [
    { id: 'all', label: 'All Cosmic Targets', count: deepSkyPhotos.length },
    { id: 'nebulae', label: 'Emission & Dark Nebulae', count: deepSkyPhotos.filter(d => d.category === 'nebulae').length },
    { id: 'galaxies', label: 'Galaxies', count: deepSkyPhotos.filter(d => d.category === 'galaxies').length },
    { id: 'clusters', label: 'Star Clusters', count: deepSkyPhotos.filter(d => d.category === 'clusters').length },
    { id: 'remnants', label: 'Planetary Remnants', count: deepSkyPhotos.filter(d => d.category === 'remnants').length },
  ]

  const filteredPhotos = useMemo(() => {
    return deepSkyPhotos
      .filter((photo) => {
        const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory
        const matchesSearch = 
          photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.catalogId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.constellation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.objectType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'integration') {
          const getHours = (str: string) => {
            const match = str.match(/([\d.]+) Hours/i)
            return match ? parseFloat(match[1]) : 0
          }
          return getHours(b.astronomyExif.totalIntegration) - getHours(a.astronomyExif.totalIntegration)
        }
        if (sortBy === 'distance') {
          const getDist = (str: string) => {
            if (str.includes('million')) {
              return parseFloat(str) * 1000000
            }
            return parseFloat(str.replace(/,/g, ''))
          }
          return getDist(b.distance) - getDist(a.distance)
        }
        return 0
      })
  }, [selectedCategory, searchQuery, sortBy])

  return (
    <div className="min-h-screen cosmic-gradient-bg py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="border-b border-slate-800/80 pb-8 mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-telemetry uppercase tracking-wider bg-sky-500/10 text-sky-300 border border-sky-500/30">
            <Telescope className="w-3.5 h-3.5" />
            Deep Sky Astrophotography
          </span>
          <span className="text-slate-500">&bull;</span>
          <span className="text-xs font-mono-telemetry text-slate-400">
            Narrowband Emission &amp; Broadband LRGB Imaging
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-extrabold text-slate-100">
              Deep Sky Cosmos &amp; Deep Time
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              Collecting ancient photons across thousands to millions of light-years. Captured using cooled monochrome sensors, strain-wave harmonic tracking mounts, and 3nm ionized hydrogen, oxygen, and sulfur narrowband filters.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-telemetry text-slate-400 bg-slate-900/80 border border-slate-800 p-3 rounded-xl shrink-0">
            <Radio className="w-4 h-4 text-sky-400" />
            <span>Setup: Askar FRA600 / RedCat 51 &bull; ZWO AM5 &bull; Bortle 2-4 Reserves</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-8">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-telemetry ${
                  isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by catalog (M42, NGC, IC), constellation, or nebula..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sky-400/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400 font-mono-telemetry flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-400/60"
            >
              <option value="default">Curated Order</option>
              <option value="integration">Longest Exposure Time</option>
              <option value="distance">Furthest Distance</option>
              <option value="rating">Viewer Rating</option>
            </select>
          </div>
        </div>

      </div>

      {/* Grid of Deep Sky Photos */}
      {filteredPhotos.length === 0 ? (
        <div className="py-20 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
          <Telescope className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="font-serif-display text-lg text-slate-300">No celestial targets found</h3>
          <p className="text-slate-500 text-xs mt-1">Try resetting your search query or choosing another target category.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery('') }}
            className="mt-4 px-4 py-2 rounded-lg bg-sky-500/20 text-sky-300 text-xs border border-sky-500/40 hover:bg-sky-500/30 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((dso) => (
            <article
              key={dso.id}
              className="group rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-800/90 hover:border-sky-400/50 transition-all duration-300 shadow-xl flex flex-col"
            >
              {/* Photo Frame */}
              <div 
                className="relative aspect-[4/3] overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => setSelectedPhoto(dso)}
              >
                <img
                  src={dso.imageUrl}
                  alt={dso.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Telemetry Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono-telemetry px-2.5 py-1 rounded-full bg-slate-950/85 text-sky-300 border border-sky-500/40 backdrop-blur-md shadow-md">
                    {dso.astronomyExif.totalIntegration.split(' ')[0]} Exp &bull; {dso.astronomyExif.bortleClass.split(' ')[0]} {dso.astronomyExif.bortleClass.split(' ')[1]}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 pointer-events-none">
                  <span className="text-white text-xs font-mono-telemetry flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    Inspect Optical Stack &amp; Filters
                  </span>
                  <span className="text-sky-300 text-xs font-mono-telemetry">
                    {dso.distance}
                  </span>
                </div>
              </div>

              {/* Photo Info Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 
                        onClick={() => setSelectedPhoto(dso)}
                        className="font-serif-display text-xl font-bold text-slate-100 group-hover:text-sky-200 transition-colors cursor-pointer"
                      >
                        {dso.title}
                      </h2>
                      <p className="text-sky-400 font-mono-telemetry text-xs mt-0.5">
                        {dso.catalogId} &bull; {dso.constellation}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs line-clamp-2 mt-3 leading-relaxed">
                    {dso.fieldNotes}
                  </p>
                </div>

                {/* Telemetry Matrix */}
                <div className="space-y-3 pt-3 border-t border-slate-800/80">
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-telemetry">
                    <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/70">
                      <span className="text-slate-500 block text-[9px] uppercase">Total Integration</span>
                      <span className="text-sky-300 font-semibold">{dso.astronomyExif.totalIntegration.split(' ')[0]} Hours</span>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/70">
                      <span className="text-slate-500 block text-[9px] uppercase">Dark Sky Class</span>
                      <span className="text-slate-200">{dso.astronomyExif.bortleClass.split('(')[0].trim()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1 text-[11px] truncate max-w-[200px]">
                      <Compass className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{dso.objectType}</span>
                    </div>
                    <span className="text-[10px] font-mono-telemetry text-slate-500">
                      {dso.distance}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPhoto(dso)}
                    className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    <span>View Telemetry</span>
                  </button>
                  <Link
                    to="/feedback"
                    search={{ photo: dso.title }}
                    className="py-2 px-3 rounded-lg border border-slate-700/80 hover:border-sky-400/60 text-slate-300 hover:text-sky-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    title="Give feedback or critique on this celestial plate"
                  >
                    <MessageSquareText className="w-3.5 h-3.5" />
                    <span>Feedback</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <ImageLightbox
          photo={selectedPhoto}
          type="deepSky"
          allPhotos={filteredPhotos}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={(p) => setSelectedPhoto(p as DeepSkyPhoto)}
        />
      )}

    </div>
  )
}
