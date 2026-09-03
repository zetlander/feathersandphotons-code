# Astra & Wing | Avian & Deep Sky Photography

**Astra & Wing** is a fine art photography portfolio celebrating two contrasting perspectives of the natural universe: the microsecond aerodynamic flight of **Avian Wildlife**, and the deep-time photon integrations of **Deep Sky Astrophotography**.

The application is built with **TanStack Start**, **React 19**, **Tailwind CSS 4**, and deployed serverlessly with **Netlify Forms**.

---

## Features

- **Avian Wildlife Section (`/birds`)**:
  - High-speed telephoto captures of raptors, waterbirds, hummingbirds, and forest species.
  - Detailed camera and optics telemetry on every plate: shutter speed (up to 1/5000s), focal length, aperture, ISO, and ethical non-invasive hide notes.
  - Category filtering, dynamic search by species/scientific name, and shutter speed sorting.
- **Deep Sky Astrophotography Section (`/deep-sky`)**:
  - Narrowband (SHO: H-alpha, OIII, SII) and broadband (LRGB) deep-space images of emission nebulae, interacting spiral galaxies, and star clusters.
  - Astrophotography technical telemetry: telescope/astrograph, equatorial tracking mount, sensor temperature, filter bandpasses, sub-exposures, total integration time (up to 41+ hours), and Bortle dark sky class.
  - Category filtering, search by Messier/NGC/IC catalog, and sorting by integration hours or distance.
- **Interactive High-Resolution Lightbox**:
  - Fullscreen plate inspection with zoom toggle, full EXIF optical breakdown, field logs, and direct feedback routing.
- **Viewer Feedback & Guestbook Section (`/feedback`)**:
  - Interactive multi-category viewer feedback form powered by **Netlify Forms**.
  - Dropdown selector to preselect or tie critique to specific plates (or general portfolio).
  - 1-to-5 star rating system with qualitative feedback labels.
  - Built-in honeypot spam protection.
  - Live community guestbook displaying authentic peer critiques, inquiries, and reviews with instant optimistic updates.
- **Nocturnal Editorial Aesthetic**:
  - Obsidian and cosmic starlight color palette with amber avian accents and cyan nebular glow.
  - Typographic pairing of classical serif display fonts (`Cinzel`) with technical monospace telemetry (`JetBrains Mono`).

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | TanStack Start (Full-stack React SSR) |
| **Routing** | TanStack Router (File-based routing) |
| **UI & Styling** | Tailwind CSS v4, Lucide React, Radix UI primitives |
| **Forms & Ingestion** | Netlify Forms (Serverless static build detection & AJAX API) |
| **Language** | TypeScript (Strict mode) |
| **Build & Bundler** | Vite 7 |
| **Hosting Platform** | Netlify |

---

## Project Structure

```
├── public/
│   ├── feedback.html        # Static Netlify Forms skeleton for build-time detection
│   ├── contact.html         # Static Netlify Forms contact skeleton
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navigation.tsx   # Header navigation with active state & plate counters
│   │   ├── SiteFooter.tsx   # Editorial footer with telemetry & ethics statement
│   │   ├── ImageLightbox.tsx# Fullscreen modal with EXIF & astrophotography telemetry
│   │   └── ui/              # Radix UI primitives (Badge, Card, Checkbox, etc.)
│   ├── data/
│   │   └── photography.ts   # Curated bird & deep sky photo archive, EXIF & guestbook
│   ├── routes/
│   │   ├── __root.tsx       # Root layout, Google Fonts, and shell wrapper
│   │   ├── index.tsx        # Home page dual-realm hero & curated masterworks
│   │   ├── birds.tsx        # Avian Wildlife gallery with filtering & optics telemetry
│   │   ├── deep-sky.tsx     # Deep Sky astrophotography gallery with narrowband filters
│   │   ├── feedback.tsx     # Viewer feedback submission form & community guestbook
│   │   └── contact.tsx      # Direct print acquisition & licensing inquiries
│   ├── router.tsx           # Router instance setup with scroll restoration
│   └── styles.css           # Tailwind CSS v4 custom theme tokens & cosmic gradients
├── netlify.toml             # Netlify deployment configuration
└── package.json
```

---

## Running Locally

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Start Local Development Server**:
   ```bash
   pnpm dev
   ```
   Or using Netlify CLI with local feature emulation:
   ```bash
   netlify dev --port 8889
   ```

3. **Open in Browser**:
   Navigate to `http://localhost:3000` (or `http://localhost:8889` if running via Netlify Dev).
