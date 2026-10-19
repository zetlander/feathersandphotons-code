# Feathers & Photons

Photographs and journal of K. H. Williamson: https://feathersandphotons.com

## Editing (no coding needed)

Go to **https://feathersandphotons.com/admin** and sign in with GitHub.

- **Journal**: write a new entry and click **Publish**.
- **Photo galleries**: open a gallery, then **Add photo** to upload, drag to reorder, or edit a caption.
- **Home page & About**: change the big photo, the About text or the gear lists.

Each save updates this repository, and Netlify rebuilds the site in about a minute.

## How it's put together

- `content/`: the words and photo lists (edited by the editor above)
  - `site.json`: home page photo and About
  - `galleries/*.json`: one file per gallery
  - `journal/*.md`: one file per journal entry
- `static/`: copied to the site as-is (photos, styles, the editor at `/admin`)
- `build.mjs`: turns the content into web pages (no packages to install)

Photos are resized for each screen by Netlify Image CDN, so large originals are fine.

Local preview: `npm run preview`, then open http://localhost:8080
