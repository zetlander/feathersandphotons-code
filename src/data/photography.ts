export interface BirdPhoto {
  id: string
  title: string
  species: string
  scientificName: string
  category: 'raptors' | 'songbirds' | 'waterbirds' | 'hummingbirds' | 'forest'
  location: string
  date: string
  aspect: 'landscape' | 'portrait'
  featured: boolean
  rating: number
  imageUrl: string
  thumbUrl: string
  exif: {
    camera: string
    lens: string
    focalLength: string
    aperture: string
    shutterSpeed: string
    iso: string
    support: string
  }
  fieldNotes: string
  habitat: string
  wingspan: string
  tags: string[]
}

export interface DeepSkyImage {
  id: string
  title: string
  catalogId: string
  constellation: string
  distance: string
  category: 'nebulae' | 'galaxies' | 'clusters' | 'remnants'
  objectType: string
  apparentMagnitude: string
  aspect: 'landscape' | 'portrait'
  featured: boolean
  rating: number
  imageUrl: string
  thumbUrl: string
  astronomyExif: {
    telescope: string
    mount: string
    camera: string
    filters: string
    totalIntegration: string
    subExposures: string
    bortleClass: string
    processingSoftware: string
  }
  fieldNotes: string
  celestialCoordinates: string
  targetSeason: string
  tags: string[]
}

export interface ViewerFeedbackItem {
  id: string
  name: string
  location: string
  date: string
  category: 'General' | 'Birds' | 'Deep Sky' | 'Print Inquiry' | 'Technique'
  targetPhoto?: string
  rating: number
  message: string
  verified: boolean
}

export const birdPhotos: BirdPhoto[] = [
  {
    id: 'barn swallow',
    title: 'Open wide',
    species: 'barn swallow',
    scientificName: 'Alcedo atthis',
    category: 'waterbirds',
    location: 'River Test, Hampshire, UK',
    date: 'October 18, 2025',
    aspect: 'portrait',
    featured: true,
    rating: 5,
    imageUrl: '/photos/barnswallow.jpg',
    thumbUrl: '/photos/barnswallow.jpg',
    exif: {
      camera: 'Sony α1',
      lens: 'FE 600mm f/4 GM OSS + 1.4x Teleconverter',
      focalLength: '840mm',
      aperture: 'f/5.6',
      shutterSpeed: '1/4000s',
      iso: '1600',
      support: 'Gimbal head on Carbon Gitzo tripod in floating hide',
    },
    fieldNotes: 'Concealed in a low-profile floating hide from 5:30 AM. When this female perched on the overhanging mossy birch branch, early golden morning light pierced through river fog, illuminating the iridescent cyan dorsal plumage before she plunged.',
    habitat: 'Clear, slow-flowing chalk streams with overhanging perches',
    wingspan: '25 cm',
    tags: ['Barn Swallow', 'Chalk Stream', 'High Speed', 'River Wildlife', 'Iridescence'],
  },
  {
    id: 'Cormorant',
    title: 'Blasted!',
    species: 'Western Barn Owl',
    scientificName: 'Tyto alba',
    category: 'raptors',
    location: 'Norfolk Broads, England',
    date: 'September 24, 2025',
    aspect: 'landscape',
    featured: true,
    rating: 5,
    imageUrl: '/photos/cormorant.jpg',
    thumbUrl: '/photos/cormorant.jpg',
    exif: {
      camera: 'Sony α9 III',
      lens: 'FE 400mm f/2.8 GM OSS',
      focalLength: '400mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/1600s',
      iso: '3200',
      support: 'Handheld with active optical steady shot',
    },
    fieldNotes: 'During late civil twilight, the owl floated silently over the damp fenland reeds hunting voles. The serrated leading-edge primaries allow completely noiseless flight, giving her an ethereal presence against the dusk glow.',
    habitat: 'Rough grassland, marsh borders, and historic agricultural barn lands',
    wingspan: '85 - 93 cm',
    tags: ['Barn Owl', 'Raptor', 'Dusk', 'Silent Flight', 'Norfolk'],
  },
  {
    id: 'bald-eagle-alaska-stoop',
    title: 'Sovereign of Chilkat',
    species: 'Bald Eagle',
    scientificName: 'Haliaeetus leucocephalus',
    category: 'raptors',
    location: 'Chilkat Bald Eagle Preserve, Alaska',
    date: 'November 12, 2025',
    aspect: 'landscape',
    featured: true,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=1600&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=800&q=80',
    exif: {
      camera: 'Canon EOS R3',
      lens: 'RF 600mm f/4L IS USM',
      focalLength: '600mm',
      aperture: 'f/4.0',
      shutterSpeed: '1/3200s',
      iso: '1000',
      support: 'Monopod with heavy-duty tilt head',
    },
    fieldNotes: 'Sub-zero temperatures kept the open glacial river steaming. As chum salmon spawned, this mature eagle banked at 45 degrees, talons extended forward moments before skimming the glacial water.',
    habitat: 'Pristine riparian corridors, subpolar estuaries, and coastal old-growth forests',
    wingspan: '180 - 230 cm',
    tags: ['Bald Eagle', 'Alaska', 'Action', 'Snow', 'Raptors'],
  },
  {
    id: 'annas-hummingbird-emerald',
    title: 'Prismatic Hover',
    species: "Anna's Hummingbird",
    scientificName: 'Calypte anna',
    category: 'hummingbirds',
    location: 'Point Reyes National Seashore, California',
    date: 'March 30, 2025',
    aspect: 'portrait',
    featured: false,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1548858804-d55c7094b9aa?auto=format&fit=crop&w=1600&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1548858804-d55c7094b9aa?auto=format&fit=crop&w=800&q=80',
    exif: {
      camera: 'Nikon Z9',
      lens: 'NIKKOR Z 400mm f/2.8 TC VR S',
      focalLength: '560mm (internal 1.4x enabled)',
      aperture: 'f/4.0',
      shutterSpeed: '1/5000s',
      iso: '2000',
      support: 'Handheld with dual VR stabilization',
    },
    fieldNotes: 'Photographing hovering hummingbirds requires microsecond timing. As the male angled his gorget into direct sun rays, the microscopic barbule platelets flashed from velvety magenta to radiant emerald in a single flap.',
    habitat: 'Coastal scrub, chaparral, and coastal sage woodland gardens',
    wingspan: '12 cm',
    tags: ['Hummingbird', 'Macro Telephoto', 'Iridescence', 'High Shutter', 'California'],
  },
  {
    id: 'snowy-owl-arctic-drift',
    title: 'Gaze of the Tundra',
    species: 'Snowy Owl',
    scientificName: 'Bubo scandiacus',
    category: 'raptors',
    location: 'Plum Island, Massachusetts',
    date: 'January 14, 2026',
    aspect: 'landscape',
    featured: true,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1600&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    exif: {
      camera: 'Sony α1',
      lens: 'FE 600mm f/4 GM OSS',
      focalLength: '600mm',
      aperture: 'f/4.0',
      shutterSpeed: '1/2500s',
      iso: '400',
      support: 'Ground pod ground-level skim sled',
    },
    fieldNotes: 'Lying prone on frozen sea salt marsh in 18°F blizzard conditions. The owl remained motionless on a driftwood post, its piercing sulfur-yellow eyes tracking shore movements miles away.',
    habitat: 'Open windswept maritime dunes, arctic tundra, and coastal meadows',
    wingspan: '125 - 150 cm',
    tags: ['Snowy Owl', 'Winter Wildlife', 'Arctic', 'Plum Island', 'Eyes'],
  },
  {
    id: 'great-blue-heron-reflection',
    title: 'Still Waters Stalker',
    species: 'Great Blue Heron',
    scientificName: 'Ardea herodias',
    category: 'waterbirds',
    location: 'Everglades National Park, Florida',
    date: 'February 19, 2025',
    aspect: 'landscape',
    featured: false,
    rating: 4,
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1600&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80',
    exif: {
      camera: 'Canon EOS R5',
      lens: 'RF 100-500mm f/4.5-7.1L IS USM',
      focalLength: '450mm',
      aperture: 'f/6.3',
      shutterSpeed: '1/1250s',
      iso: '800',
      support: 'Canoe mount with fluid head',
    },
    fieldNotes: 'Paddled into a quiet cypress slough at sunrise. The heron stood like a sculpted bronze statue, mirrored perfectly across glass-calm blackwater before delivering a lightning-fast bill strike.',
    habitat: 'Freshwater swamps, cypress sloughs, mangrove lagoons, and shallow marshes',
    wingspan: '167 - 201 cm',
    tags: ['Heron', 'Everglades', 'Reflection', 'Cypress', 'Waterbirds'],
  },
  {
    id: 'atlantic-puffin-cliffside',
    title: 'Sentinel of the Hebrides',
    species: 'Atlantic Puffin',
    scientificName: 'Fratercula arctica',
    category: 'waterbirds',
    location: 'Treshnish Isles, Scotland',
    date: 'July 8, 2025',
    aspect: 'portrait',
    featured: false,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?auto=format&fit=crop&w=1600&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?auto=format&fit=crop&w=800&q=80',
    exif: {
      camera: 'Sony α9 III',
      lens: 'FE 70-200mm f/2.8 GM OSS II',
      focalLength: '185mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/2000s',
      iso: '400',
      support: 'Handheld prone on maritime turf edge',
    },
    fieldNotes: 'Sitting on cliff edge maritime thrift flowers while Atlantic squalls battered the basalt pillars. The puffin returned with a bill full of sand eels, resting inches away seemingly unfazed by human presence.',
    habitat: 'Subarctic ocean cliffs, grassy turf sea stacks, and offshore islands',
    wingspan: '47 - 63 cm',
    tags: ['Puffin', 'Hebrides', 'Scotland', 'Seabirds', 'Atlantic'],
  },
  {
    id: 'scarlet-macaw-rainforest',
    title: 'Canopy Flame',
    species: 'Scarlet Macaw',
    scientificName: 'Ara macao',
    category: 'forest',
    location: 'Osa Peninsula, Costa Rica',
    date: 'April 22, 2025',
    aspect: 'landscape',
    featured: false,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=1600&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80',
    exif: {
      camera: 'Sony α1',
      lens: 'FE 400mm f/2.8 GM OSS',
      focalLength: '400mm',
      aperture: 'f/3.2',
      shutterSpeed: '1/3200s',
      iso: '1250',
      support: 'Scaffold canopy tower mount',
    },
    fieldNotes: 'Positioned in an emergent strangler fig canopy tower 110 feet above the forest floor. A bonded pair flew directly beneath our platform, primaries glowing like pure pigment against the deep rainforest greens.',
    habitat: 'Humid lowland tropical rainforests and coastal almond groves',
    wingspan: '81 - 96 cm',
    tags: ['Macaw', 'Costa Rica', 'Rainforest', 'Tropical', 'Flight'],
  },
]

export const deepSkyPhotos: DeepSkyPhoto[] = [
  {
    id: 'm42-great-orion-nebula',
    title: 'The Great Orion Nebula',
    catalogId: 'Messier 42 / NGC 1976',
    constellation: 'Orion',
    distance: '1,344 light-years',
    category: 'nebulae',
    objectType: 'Diffuse Emission & Reflection Nebula',
    apparentMagnitude: '4.0 mag',
    aspect: 'landscape',
    featured: true,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    astronomyExif: {
      telescope: 'Askar FRA600 Quintuplet Petzval Astrograph (600mm f/5.6)',
      mount: 'ZWO AM5 Strain-Wave Harmonic Mount on TC40 Tripod',
      camera: 'ZWO ASI2600MM Pro Cooled Monochromatic (-10°C sensor)',
      filters: 'Chroma 3nm Narrowband (Hα: 52x300s, OIII: 44x300s, SII: 36x300s) + RGB stars (3x20x60s)',
      totalIntegration: '32.5 Hours total exposure over 7 clear nights',
      subExposures: '132 x 300s narrowband subs + 60 x 60s broadband RGB',
      bortleClass: 'Bortle 2 (Spruce Knob Dark Sky Observatory, WV)',
      processingSoftware: 'PixInsight 1.8.9 (BlurXTerminator, NoiseXTerminator, StarXTerminator, GHS) & Affinity Photo',
    },
    fieldNotes: 'Balancing the blistering core of the young Trapezium cluster with the faint wisps of the outer molecular hydrogen shroud required creating a 14-stop HDR dynamic range composition. The ionized oxygen-III teal core contrasts dramatically with the deep interstellar dust lanes.',
    celestialCoordinates: 'RA 05h 35m 17s | Dec -05° 23′ 28″',
    targetSeason: 'Late Autumn to Mid Winter',
    tags: ['Orion', 'M42', 'Narrowband', 'Deep Sky', 'Emission Nebula', 'Star Birth'],
  },
  {
    id: 'm31-andromeda-galaxy',
    title: 'The Andromeda Galaxy',
    catalogId: 'Messier 31 / NGC 224',
    constellation: 'Andromeda',
    distance: '2.537 million light-years',
    category: 'galaxies',
    objectType: 'Barred Spiral Galaxy',
    apparentMagnitude: '3.44 mag',
    aspect: 'landscape',
    featured: true,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    astronomyExif: {
      telescope: 'Takahashi FSQ-106EDX IV Quadruplet Apochromat (530mm f/5.0)',
      mount: 'Sky-Watcher EQ6-R Pro equatorial mount with belt drive',
      camera: 'QHY268M Cooled Back-Illuminated CMOS (-15°C)',
      filters: 'Baader CMOS-Optimized LRGB + 3.5nm H-alpha emission booster',
      totalIntegration: '41.2 Hours across autumn new-moon windows',
      subExposures: 'L: 90x180s, RGB: 3x45x180s, Hα: 40x600s',
      bortleClass: 'Bortle 2 (Cherry Springs State Park, PA)',
      processingSoftware: 'PixInsight (Multiscale Linear Transform, Narrowband Normalization, Curves, PixelMath)',
    },
    fieldNotes: 'Our nearest major galactic neighbor spans nearly six full moons across the night sky. In this integration, faint H-alpha star-forming nebulae embedded in the spiral arms stand out like rubies nestled within billion-year-old starlight.',
    celestialCoordinates: 'RA 00h 42m 44s | Dec +41° 16′ 09″',
    targetSeason: 'Autumn / Early Winter',
    tags: ['Andromeda', 'M31', 'Spiral Galaxy', 'Messier', 'Deep Space', 'Billion Stars'],
  },
  {
    id: 'ngc2237-rosette-nebula',
    title: 'The Celestial Rose',
    catalogId: 'NGC 2237 / Caldwell 49 (Rosette)',
    constellation: 'Monoceros',
    distance: '5,219 light-years',
    category: 'nebulae',
    objectType: 'Giant Molecular Cloud & H II Emission Region',
    apparentMagnitude: '9.0 mag',
    aspect: 'portrait',
    featured: true,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    astronomyExif: {
      telescope: 'William Optics Zenithstar 73 III with Flat73A Corrector (430mm f/5.9)',
      mount: 'iOptron CEM40 Center-Balanced Equatorial Mount',
      camera: 'ZWO ASI533MC Pro Cooled Color (-10°C)',
      filters: 'Optolong L-eXtreme Dual Narrowband (7nm Hα & OIII)',
      totalIntegration: '24.0 Hours total exposure',
      subExposures: '144 x 600s guided frames with ASIAIR Plus',
      bortleClass: 'Bortle 4 (High Desert Rural Backyard, NM)',
      processingSoftware: 'PixInsight (HOO Palette Extraction, Continuum Subtraction, DBE, SCNR)',
    },
    fieldNotes: 'The central open cluster NGC 2244 was born from this gas cloud; its intense stellar winds have carved out the central cavity, while ultraviolet radiation ionizes the surrounding hydrogen bloom 130 light-years in diameter.',
    celestialCoordinates: 'RA 06h 32m 04s | Dec +05° 02′ 54″',
    targetSeason: 'Winter',
    tags: ['Rosette', 'NGC2237', 'Narrowband', 'Monoceros', 'Hydrogen Alpha', 'HII'],
  },
  {
    id: 'm45-pleiades-cluster',
    title: 'The Seven Sisters',
    catalogId: 'Messier 45 / Melotte 22',
    constellation: 'Taurus',
    distance: '444 light-years',
    category: 'clusters',
    objectType: 'Open Star Cluster with Reflection Nebulosity',
    apparentMagnitude: '1.6 mag',
    aspect: 'landscape',
    featured: false,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1600&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=800&q=80',
    astronomyExif: {
      telescope: 'RedCat 51 II Petzval APO (250mm f/4.9)',
      mount: 'ZWO AM3 Strain Wave Mount with TC40',
      camera: 'Canon EOS Ra Full-Frame Astrophotography Body',
      filters: 'Broadband Lumicon Deep-Sky Light Pollution Reduction Filter',
      totalIntegration: '18.5 Hours broadband integration',
      subExposures: '222 x 300s at ISO 800',
      bortleClass: 'Bortle 2 (Joshua Tree National Park, CA)',
      processingSoftware: 'PixInsight (SPCC Spectrophotometric Color Calibration, StarNet v2, GHS stretch)',
    },
    fieldNotes: 'The whisper-thin blue filaments are not remnants of the stars formation, but rather an unrelated dust cloud through which the young hot B-type stars happen to be passing at 40 km per second.',
    celestialCoordinates: 'RA 03h 47m 24s | Dec +24° 07′ 00″',
    targetSeason: 'Late Autumn / Winter',
    tags: ['Pleiades', 'M45', 'Taurus', 'Reflection Nebula', 'Seven Sisters', 'Open Cluster'],
  },
  {
    id: 'ic434-horsehead-flame-nebula',
    title: 'The Stallion & The Flame',
    catalogId: 'IC 434 (Horsehead) & NGC 2024 (Flame)',
    constellation: 'Orion',
    distance: '1,375 light-years',
    category: 'nebulae',
    objectType: 'Dark Nebula Silhouette against Ionized Hydrogen',
    apparentMagnitude: '7.3 mag',
    aspect: 'landscape',
    featured: true,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    astronomyExif: {
      telescope: 'Sky-Watcher Esprit 100ED Super APO Triplet (550mm f/5.5)',
      mount: 'iOptron CEM70 with internal iGuider',
      camera: 'ZWO ASI2600MM Pro (-15°C)',
      filters: 'Antlia 3nm Golden Pro SHO + Chroma Luminance',
      totalIntegration: '36.8 Hours over 8 cold mountain sessions',
      subExposures: 'Hα: 50x300s, OIII: 40x300s, SII: 38x300s, L: 45x120s',
      bortleClass: 'Bortle 2 (Big Bend National Park, TX)',
      processingSoftware: 'PixInsight (Hubble Palette SHO with modified Foraxx palette scripts, HDRMultiscale)',
    },
    fieldNotes: 'Alnitak, the easternmost star of Orions Belt, produces immense glare that must be carefully managed. The dark dust pillar of Barnard 33 rises majestically like a cosmic chess knight out of deep reddish H-alpha emission.',
    celestialCoordinates: 'RA 05h 40m 59s | Dec -02° 27′ 30″',
    targetSeason: 'Winter',
    tags: ['Horsehead', 'Flame Nebula', 'IC434', 'Dark Nebula', 'Orion', 'Narrowband'],
  },
  {
    id: 'm51-whirlpool-galaxy',
    title: 'Cosmic Rendezvous',
    catalogId: 'Messier 51a / NGC 5194 (Whirlpool)',
    constellation: 'Canes Venatici',
    distance: '23.5 million light-years',
    category: 'galaxies',
    objectType: 'Interacting Grand-Design Spiral Galaxy',
    apparentMagnitude: '8.4 mag',
    aspect: 'portrait',
    featured: false,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1600&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
    astronomyExif: {
      telescope: 'Celestron EdgeHD 8" with 0.7x Focal Reducer (1422mm f/7.1)',
      mount: 'ZWO AM5 on carbon pier extension',
      camera: 'ZWO ASI2600MC Pro Color (-10°C)',
      filters: 'Baader Moon & Skyglow Broadband + 2" Dual-Band Hα booster',
      totalIntegration: '28.4 Hours',
      subExposures: '284 x 360s at Gain 100 with OAG off-axis guiding',
      bortleClass: 'Bortle 3 (Adirondack High Peaks, NY)',
      processingSoftware: 'PixInsight (BXT, NXT, SXT, Deconvolution, Generalized Hyperbolic Stretch)',
    },
    fieldNotes: 'Gravity in action: the smaller companion galaxy NGC 5195 is locked in a slow gravitational tidal dance, ripping out long tidal tails and triggering explosive star formation along the grand-design spiral arms.',
    celestialCoordinates: 'RA 13h 29m 52s | Dec +47° 11′ 43″',
    targetSeason: 'Spring',
    tags: ['Whirlpool', 'M51', 'Galaxies', 'Interacting', 'Canes Venatici', 'Deep Universe'],
  },
  {
    id: 'm27-dumbbell-nebula',
    title: 'Ghostly Remnant',
    catalogId: 'Messier 27 / NGC 6853',
    constellation: 'Vulpecula',
    distance: '1,360 light-years',
    category: 'remnants',
    objectType: 'Planetary Nebula (Dying Star Shell)',
    apparentMagnitude: '7.5 mag',
    aspect: 'portrait',
    featured: false,
    rating: 4,
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1600&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=800&q=80',
    astronomyExif: {
      telescope: 'Sky-Watcher Quattro 200P Imaging Newtonian (800mm f/4.0)',
      mount: 'Sky-Watcher EQ6-R Pro',
      camera: 'ZWO ASI294MM Pro Cooled Monochromatic (-10°C)',
      filters: 'Astronomik 6nm MaxFR OIII & Hα filters',
      totalIntegration: '21.0 Hours',
      subExposures: 'OIII: 60x600s, Hα: 66x600s',
      bortleClass: 'Bortle 3 (Shenandoah National Park, VA)',
      processingSoftware: 'PixInsight (Bicolor HOO processing with synthetic green channel, LocalHistogramEqualization)',
    },
    fieldNotes: 'The very first planetary nebula ever discovered, by Charles Messier in 1764. The faint outer outer halo of glowing oxygen gas extends far beyond the bright apple-core shape visible in standard amateur scopes.',
    celestialCoordinates: 'RA 19h 59m 36s | Dec +22° 43′ 16″',
    targetSeason: 'Summer / Early Autumn',
    tags: ['Dumbbell', 'M27', 'Planetary Nebula', 'Remnants', 'Vulpecula', 'Stellar Death'],
  },
  {
    id: 'ngc7000-north-america-nebula',
    title: 'The Cygnus Wall',
    catalogId: 'NGC 7000 / Caldwell 20',
    constellation: 'Cygnus',
    distance: '2,590 light-years',
    category: 'nebulae',
    objectType: 'Giant Emission Nebula & Ionized Cloud Ridge',
    apparentMagnitude: '4.0 mag',
    aspect: 'landscape',
    featured: false,
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?auto=format&fit=crop&w=1600&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?auto=format&fit=crop&w=800&q=80',
    astronomyExif: {
      telescope: 'Askar FRA400 Quintuplet Astrograph with F/3.9 Full-Frame Reducer (280mm f/3.9)',
      mount: 'ZWO AM5 with TC40 Carbon Fiber Tripod',
      camera: 'ZWO ASI2600MM Pro Mono (-10°C)',
      filters: 'Antlia 3nm Pro SHO narrowband set',
      totalIntegration: '30.5 Hours',
      subExposures: 'Hα: 45x300s, OIII: 42x300s, SII: 35x300s',
      bortleClass: 'Bortle 2 (Maine North Woods, ME)',
      processingSoftware: 'PixInsight (Hubble Palette modified with Selective Color correction & Unsharp Mask)',
    },
    fieldNotes: 'This high-resolution crop centers directly on the dramatic Cygnus Wall — a 20 light-year ridge of intense star formation where supersonic radiation from unseen massive stars sculpts cliffs of dense interstellar gas.',
    celestialCoordinates: 'RA 20h 59m 17s | Dec +44° 31′ 44″',
    targetSeason: 'Summer / Autumn',
    tags: ['Cygnus Wall', 'NGC7000', 'North America', 'Narrowband', 'Milky Way', 'Cosmic Cliffs'],
  },
]

export const initialFeedbackList: ViewerFeedbackItem[] = [
  {
    id: 'fb-1',
    name: 'Dr. Elena Rostova',
    location: 'Cambridge, MA',
    date: 'February 26, 2026',
    category: 'Deep Sky',
    targetPhoto: 'The Great Orion Nebula (M42)',
    rating: 5,
    message: 'The dynamic range preservation on M42 is masterclass work. Retaining Trapezium resolve while bringing out the whisper-soft outer OIII billows without blowing out the dust lanes is extraordinarily difficult. Phenomenal integration!',
    verified: true,
  },
  {
    id: 'fb-2',
    name: 'Marcus Thorne',
    location: 'Vancouver, BC',
    date: 'February 18, 2026',
    category: 'Birds',
    targetPhoto: 'Ghost of the Hedgerow (Western Barn Owl)',
    rating: 5,
    message: 'The twilight shot of the Barn Owl over Norfolk reeds captures the elusive mood of British fenlands better than almost anything I have seen. At 1/1600s with an f/2.8 prime in failing light, the feather separation is immaculate.',
    verified: true,
  },
  {
    id: 'fb-3',
    name: 'Clara Lindqvist',
    location: 'Stockholm, Sweden',
    date: 'February 04, 2026',
    category: 'Print Inquiry',
    targetPhoto: 'The Stallion & The Flame (Horsehead Nebula)',
    rating: 5,
    message: 'I am interested in acquiring an archival ChromaLuxe metal print of the Horsehead & Flame composite for our astronomy research facility lobby. Could you share details regarding maximum print dimensions and resolution?',
    verified: true,
  },
  {
    id: 'fb-4',
    name: 'Julian Vance',
    location: 'Austin, Texas',
    date: 'January 29, 2026',
    category: 'General',
    rating: 5,
    message: 'What a poetic pairing. High-speed daytime pursuit of fleeting wings contrasted against dozens of hours of patient photon gathering in the dead of night. The technical telemetry cards for both disciplines are so inspiring to fellow photographers.',
    verified: true,
  },
]
