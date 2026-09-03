# AGENTS.md

This document provides an overview of the Astra & Wing project structure for developers and AI agents working on this codebase.

## Project Overview

**Astra & Wing** is a fine-art photography portfolio showcasing both Avian Wildlife (birds) and Deep Sky Objects (astrophotography) in dedicated, independently filterable sections, paired with an interactive viewer feedback and critique system powered by Netlify Forms.

Built with **TanStack Start**, **React 19**, **Tailwind CSS 4**, and deployed on Netlify.

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (SSR + hydration) |
| Routing | TanStack Router (file-based routing in `src/routes/`) |
| Build Tool | Vite 7 with `@netlify/vite-plugin-tanstack-start` |
| Styling | Tailwind CSS 4 with custom theme tokens |
| Icons | Lucide React |
| Serverless Forms | Netlify Forms (with `public/feedback.html` static skeleton) |
| Language | TypeScript 5.9 (strict mode) |

---

## Directory Structure

```
├── public/
│   ├── feedback.html        # Build-time Netlify Forms detection skeleton for feedback
│   ├── contact.html         # Build-time Netlify Forms detection skeleton for contact
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navigation.tsx   # Header bar with active route highlighting & plate counts
│   │   ├── SiteFooter.tsx   # Global footer with telemetry summary & ethics
│   │   ├── ImageLightbox.tsx# Fullscreen modal displaying telemetry & field logs
│   │   └── ui/              # Radix UI primitives (Badge, Card, Checkbox, etc.)
│   ├── data/
│   │   └── photography.ts   # Strongly typed data models for BirdPhoto, DeepSkyPhoto & feedback
│   ├── routes/
│   │   ├── __root.tsx       # Root layout wrapping all pages with Navigation and SiteFooter
│   │   ├── index.tsx        # Home page dual-realm hero, curated masterworks & philosophy
│   │   ├── birds.tsx        # Avian Wildlife gallery (filtering, search, shutter sort, telemetry)
│   │   ├── deep-sky.tsx     # Deep Sky gallery (narrowband filters, integration sort, telemetry)
│   │   ├── feedback.tsx     # Viewer feedback form (Netlify Forms) & live community guestbook
│   │   └── contact.tsx      # Direct print acquisitions & gallery inquiries
│   ├── router.tsx           # Router configuration with scrollRestoration: true
│   └── styles.css           # Tailwind CSS imports & color variables
├── .netlify/
│   └── features/
│       └── netlify-forms    # Netlify Forms activation marker
├── netlify.toml             # Netlify deployment configuration
├── package.json
└── README.md
```

---

## Key Architectural Decisions & Conventions

### 1. Separate Photographic Domains
- **Birds Section (`/birds`)**:
  - Focuses on high-speed avian wildlife photography (1/1200s to 1/5000s shutter speeds, long super-telephoto lenses, natural perches, zero baiting).
  - Cards show species common name, scientific name, camera, lens, focal length, aperture, shutter speed, and location.
- **Deep Sky Section (`/deep-sky`)**:
  - Focuses on patient long-exposure astrophotography (multi-hour integration, harmonic equatorial tracking, cooled sensors, narrowband 3nm SHO / broadband LRGB filters).
  - Cards show catalog designation (Messier, NGC, IC), constellation, light-year distance, total integration time, Bortle sky darkness class, and optical rig.

### 2. Netlify Forms in SSR Apps (Critical)
Because TanStack Start is an SSR framework, requests to `/` or any SSR catch-all route bypass Netlify's CDN form detection.
- A static HTML skeleton must reside in `public/` (e.g. `public/feedback.html`).
- The React form submits via AJAX `fetch('/feedback.html', ...)` using `Content-Type: application/x-www-form-urlencoded`.
- The form payload must include hidden field `form-name="feedback"` matching the `name` attribute in `public/feedback.html`.
- Honeypot spam filtering is implemented via the `bot-field` input.
- The activation marker at `.netlify/features/netlify-forms` must remain present.

### 3. Image Lightbox & Telemetry Inspector
- Clicking any photograph in the overview, avian gallery, or deep sky gallery opens `ImageLightbox`.
- Supports keyboard navigation (Escape to close, Left/Right arrow keys to cycle through images).
- Includes an interactive zoom toggle and two informational tabs:
  1. *Telemetry & Optics*: Comprehensive hardware and exposure data.
  2. *Field Log & Story*: Backstory of the capture and ecological / astrophysical context.
- Offers a direct link to the Feedback page pre-populating the target photograph in the feedback selector (`/feedback?photo=...`).

### 4. Styling Conventions
- Nocturnal luxury dark aesthetic: background `oklch(0.12 0.015 260)` (deep midnight slate).
- Font pairings: `Cinzel` (serif display for dramatic titles) + `Plus Jakarta Sans` (body) + `JetBrains Mono` (technical telemetry specs).
- Amber accents for terrestrial avian wildlife (`#f59e0b` / `text-amber-400`); Cyan / Starlight accents for deep space astrophotography (`#38bdf8` / `text-sky-400`).
