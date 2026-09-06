export interface BirdPhoto {
  id: string
  title: string
  species: string
  scientificName: string
  category: 'raptors' | 'swallows' | 'herons' | 'terns' |'pelicans '|'cormorants'
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
  category: 'nebulae' | 'galaxies' | 'clusters' 
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
    scientificName: 'Hirundo rustica',
    category: 'swallows',
    location: 'Bird walk, Doran Beach, Sonoma County',
    date: 'October 18, 2025',
    aspect: 'portrait',
    featured: true,
    rating: 5,
    imageUrl: '/photos/barnswallow.jpg',
    thumbUrl: '/photos/barnswallow-thumb.jpg',
    exif: {
      camera: 'Nikon Z8',
      lens: 'Nikon Z 400mm f/4.5, 1.4x Teleconverter',
      focalLength: '560mm',
      aperture: 'f/6.3',
      shutterSpeed: '1/5000s',
      iso: '1600',
      support: 'Handheld with active optical steady shot',


    },
    fieldNotes: 'none',
    habitat: 'trees near stream',
    wingspan: '25 cm',
    tags: ['Barn Swallow', 'Chalk Stream', 'High Speed', 'River Wildlife', 'Iridescence'],
  },
  {
    id: 'Cormorant',
    title: 'Blasted!',
    species: 'Cormorant',
    scientificName: 'Phalacrocoracidae',
    category: 'water birds',
    location: 'Bodega Head, Sonoma County',
    date: 'September 24, 2025',
    aspect: 'landscape',
    featured: true,
    rating: 5,
    imageUrl: '/photos/cormorant.jpg',
    thumbUrl: '/photos/cormorant-thumb.jpg',
    exif: {
      camera: 'Nikon Z8',
      lens: 'Nikon Z 400mm f/4.5, 1.4x Teleconverter',
      focalLength: '560mm',
      aperture: 'f/6.3',
      shutterSpeed: '1/5000s',
      iso: '1600',
      support: 'Handheld with active optical steady shot',


    },
    fieldNotes: 'none',
    habitat: 'trees near stream',
    wingspan: '25 cm',
    tags: ['Barn Swallow', 'Chalk Stream', 'High Speed', 'River Wildlife', 'Iridescence'],
  },

  {
    id: 'green heron',
    title: 'bad hair day',
    species: 'green heron',
    scientificName: 'Butorides virenscens',
    category: 'herons',
    location: 'Petaluma',
    date: 'November 12, 2025',
    aspect: 'landscape',
    featured: true,
    rating: 5,
    imageUrl: '/photos/greenheron.jpg',
    thumbUrl: '/photos/greenheron-thumb.jpg',
    exif: {
      camera:  'Nikon Z8',
      lens: 'Nikon Z 400mm f/4.5, 1.4x Teleconverter',
      focalLength: '560mm',
      aperture: 'f/6.3',
      shutterSpeed: '1/5000s',
      iso: '1600',
      support: 'Handheld with active optical steady shot',

    },
    fieldNotes: 'none.',
    habitat: 'Riparian corridors, estuaries',
    wingspan: '180 - 230 cm',
    tags: ['heron', 'Doran', 'Action' ],
  },
  {
    id: 'Red Shouldered Hawk',
    title: 'Hawkeye',
    species: "Red Shouldered Hawk",
    scientificName: 'Buteo Lineatus',
    category: 'raptors',
    location: 'Shollenberger Park, Petaluma, California',
    date: 'March 30, 2025',
    aspect: 'portrait',
    featured: false,
    rating: 5,
    imageUrl: '/photos/redtailedhawk.jpg',
    thumbUrl: '/photos/redtailedhawk-thumb.jpg',
    exif: {
      camera:  'Nikon Z8',
      lens: 'Nikon Z 400mm f/4.5, 1.4x Teleconverter',
      focalLength: '560mm',
      aperture: 'f/6.3',
      shutterSpeed: '1/5000s',
      iso: '1600',
      support: 'Handheld with active optical steady shot',

    },
    fieldNotes: 'none',
    habitat: 'Coastal scrub, chaparral, and coastal sage woodland gardens',
    wingspan: '12 cm',
    tags: ['Raptor', 'Macro Telephoto', 'Iridescence', 'High Shutter', 'California'],
  },
  {
    id: 'snowy egret',
    title: 'Very Excited',
    species: 'Snowy Egret',
    scientificName: 'Ergetta thula',
    category: 'herons',
    location: 'Bird walk, Doran Beach Park',
    date: 'January 14, 2026',
    aspect: 'landscape',
    featured: true,
    rating: 5,
    imageUrl: '/photos/snowyegret.jpg',
    thumbUrl: '/photos/snowyegret-thumb.jpg',
    exif: {
      camera:  'Nikon Z8',
      lens: 'Nikon Z 400mm f/4.5, 1.4x Teleconverter',
      focalLength: '560mm',
      aperture: 'f/6.3',
      shutterSpeed: '1/5000s',
      iso: '1600',
      support: 'Handheld with active optical steady shot',

    },
    fieldNotes: 'none',
    habitat: 'Open windswept maritime dunes, arctic tundra, and coastal meadows',
    wingspan: '125 - 150 cm',
    tags: ['Snowy Owl', 'Winter Wildlife', 'Arctic', 'Plum Island', 'Eyes'],
  },
  {
    id: 'Caspian Tern',
    title: 'Ready to pounce',
    species: 'Caspian Tern',
    scientificName: 'Hydroprogne caspia',
    category: 'terns',
    location: 'Doran beach',
    date: 'February 19, 2025',
    aspect: 'landscape',
    featured: false,
    rating: 4,
    imageUrl: '/photos/tern.jpg',
    thumbUrl: '/photos/tern-thumb.jpg',
    exif: {
      camera:  'Nikon Z8',
      lens: 'Nikon Z 400mm f/4.5, 1.4x Teleconverter',
      focalLength: '560mm',
      aperture: 'f/6.3',
      shutterSpeed: '1/5000s',
      iso: '1600',
      support: 'Handheld with active optical steady shot',

    },
    fieldNotes: 'none.',
    habitat: 'Freshwater swamps, cypress sloughs, mangrove lagoons, and shallow marshes',
    wingspan: '167 - 201 cm',
    tags: ['tern', 'Everglades', 'Reflection', 'Cypress', 'Waterbirds'],
  },
  {
    id: 'Puffin',
    title: 'Puffin',
    species: 'Atlantic Puffin',
    scientificName: 'Fratercula arctica',
    category: 'waterbirds',
    location: 'Shetland Isles, Scotland',
    date: 'July 8, 2012',
    aspect: 'portrait',
    featured: false,
    rating: 5,
    imageUrl: '/photos/puffin.jpg',
    thumbUrl: '/photos/puffin-thumb.jpg',
    exif: {
      camera:  'Nikon d610',
      lens: 'Tamron SP150-600mm F5-6.3 Di VC',
      focalLength: '600',
      aperture: 'f/6.3',
      shutterSpeed: '1/100s',
      iso: '400',
      support: 'Handheld with active optical steady shot',

    },
    fieldNotes: 'Sitting on cliff edge maritime thrift flowers ',
    habitat: 'Subarctic ocean cliffs, grassy turf sea stacks, and offshore islands',
    wingspan: '47 - 63 cm',
    tags: ['Puffin', 'Shetland', 'Scotland', 'Seabirds', 'Atlantic'],
  },
  {
    id: 'Brown Pelican',
    title: 'Pelican diving',
    species: 'Brown Pelican',
    scientificName: 'Pelecanus occidentalis',
    category: 'pelicans',
    location: 'Doran beach',
    date: 'April 22, 2025',
    aspect: 'landscape',
    featured: false,
    rating: 5,
    imageUrl: '/photos/pelican-diving.jpg',
    thumbUrl: '/photos/pelican-diving-thumb.jpg',
    exif: {
      camera:  'Nikon Z8',
      lens: 'Nikon Z 400mm f/4.5, 1.4x Teleconverter',
      focalLength: '560mm',
      aperture: 'f/6.3',
      shutterSpeed: '1/5000s',
      iso: '1600',
      support: 'Handheld with active optical steady shot',

    },
    fieldNotes: 'none',
    habitat: 'Humid lowland tropical rainforests and coastal almond groves',
    wingspan: '81 - 96 cm',
    tags: ['pelican', 'Costa Rica', 'Rainforest', 'Tropical', 'Flight'],
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
    imageUrl: '/photos/m42.jpg',
    thumbUrl: '/photos/m42-thumb.jpg',
    astronomyExif: {
      telescope: 'Redcat 51 wifd telescope. 51mm f/4.9 250mm focal length Petzval APO refractor',
      mount: 'Star Adventurer GTi equatorial mount',
      camera: 'QHY minicam8 mono (-20°C sensor)',
      filters: 'LRGB and  Ha, Oiii, Sii 3nm',
      totalIntegration: '6 Hours total exposure over 1 clear nights',
      subExposures: '132 x 300s narrowband subs + 60 x 60s broadband RGB',
      bortleClass: 'Bortle 4.5 ',
      processingSoftware: 'PixInsight 1.9.4 (BlurXTerminator, NoiseXTerminator, StarXTerminator, GHS) & Adobe Lightroom',
    },
    fieldNotes: 'none',
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
    imageUrl: '/photos/m31.jpg',
    thumbUrl: '/photos/m31-thumb.jpg',

    astronomyExif: {
      telescope: 'Redcat 51 wifd telescope. 51mm f/4.9 250mm focal length Petzval APO refractor',
      mount: 'Star Adventurer GTi equatorial mount',
      camera: 'QHY minicam8 mono (-20°C sensor)',
      filters: 'LRGB and  Ha, Oiii, Sii 3nm',
      totalIntegration: '6 Hours total exposure over 1 clear nights',
      subExposures: '132 x 300s narrowband subs + 60 x 60s broadband RGB',
      bortleClass: 'Bortle 4.5 ',
      processingSoftware: 'PixInsight 1.9.4 (BlurXTerminator, NoiseXTerminator, StarXTerminator, GHS) & Adobe Lightroom',
    },
    fieldNotes: 'none',
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
    imageUrl: '/photos/ngc2237.jpg',
    thumbUrl: '/photos/ngc2237-thumb.jpg',
    astronomyExif: {
      telescope: 'Redcat 51 wifd telescope. 51mm f/4.9 250mm focal length Petzval APO refractor',
      mount: 'Star Adventurer GTi equatorial mount',
      camera: 'QHY minicam8 mono (-20°C sensor)',
      filters: 'LRGB and  Ha, Oiii, Sii 3nm',
      totalIntegration: '6 Hours total exposure over 1 clear nights',
      subExposures: '132 x 300s narrowband subs + 60 x 60s broadband RGB',
      bortleClass: 'Bortle 4.5 ',
      processingSoftware: 'PixInsight 1.9.4 (BlurXTerminator, NoiseXTerminator, StarXTerminator, GHS) & Adobe Lightroom',
    },
    fieldNotes: 'none',
    celestialCoordinates: 'RA 06h 32m 04s | Dec +05° 02′ 54″',
    targetSeason: 'Winter',
    tags: ['Rosette', 'NGC2237', 'Narrowband', 'Monoceros', 'Hydrogen Alpha', 'HII'],
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
    imageUrl: '/photos/horsehead.jpg',
    thumbUrl: '/photos/horsehead-thumb.jpg',

    astronomyExif: {
 telescope: 'Redcat 51 wifd telescope. 51mm f/4.9 250mm focal length Petzval APO refractor',
      mount: 'Star Adventurer GTi equatorial mount',
      camera: 'QHY minicam8 mono (-20°C sensor)',
      filters: 'LRGB and  Ha, Oiii, Sii 3nm',
      totalIntegration: '6 Hours total exposure over 1 clear nights',
      subExposures: '132 x 300s narrowband subs + 60 x 60s broadband RGB',
      bortleClass: 'Bortle 4.5 ',
      processingSoftware: 'PixInsight 1.9.4 (BlurXTerminator, NoiseXTerminator, StarXTerminator, GHS) & Adobe Lightroom',
    },
    fieldNotes: 'none',
    celestialCoordinates: 'RA 05h 40m 59s | Dec -02° 27′ 30″',
    targetSeason: 'Winter',
    tags: ['Horsehead', 'Flame Nebula', 'IC434', 'Dark Nebula', 'Orion', 'Narrowband'],
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
    imageUrl: '/photos/NGC7000.jpg',
    thumbUrl: '/photos/NGC7000-thumb.jpg',

    astronomyExif: {
    telescope: 'Redcat 51 wifd telescope. 51mm f/4.9 250mm focal length Petzval APO refractor',
      mount: 'Star Adventurer GTi equatorial mount',
      camera: 'QHY minicam8 mono (-20°C sensor)',
      filters: 'LRGB and  Ha, Oiii, Sii 3nm',
      totalIntegration: '6 Hours total exposure over 1 clear nights',
      subExposures: '132 x 300s narrowband subs + 60 x 60s broadband RGB',
      bortleClass: 'Bortle 4.5 ',
      processingSoftware: 'PixInsight 1.9.4 (BlurXTerminator, NoiseXTerminator, StarXTerminator, GHS) & Adobe Lightroom',
    },
    fieldNotes: 'none',
    celestialCoordinates: 'RA 20h 59m 17s | Dec +44° 31′ 44″',
    targetSeason: 'Summer / Autumn',
    tags: ['Cygnus Wall', 'NGC7000', 'North America', 'Narrowband', 'Milky Way', 'Cosmic Cliffs'],
  },
]

export const initialFeedbackList: ViewerFeedbackItem[] = [
  {
    id: 'fb-1',
    name: 'Elena Rostova(test only)',
    location: 'Cambridge, MA',
    date: 'February 26, 2026',
    category: 'Deep Sky',
    targetPhoto: 'The Great Orion Nebula (M42)',
    rating: 5,
    message: 'The dynamic range preservation on M42 is masterclass work. Retaining Trapezium resolve while bringing out the whisper-soft outer OIII billows without blowing out the dust lanes is extraordinarily difficult. Phenomenal integration!',
    verified: true,
  },
  
]

