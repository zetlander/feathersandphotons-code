# Feathers & Photons

Photographs and journal of K. H. Williamson: https://feathersandphotons.com

## Editing (no coding needed)

Go to **https://feathersandphotons.com/admin** and sign in with GitHub.

- **Journal**: write a new entry and click **Publish**.
- **Photo galleries**: open a gallery, then **Add photo** to upload, drag to reorder, or edit a caption.
- **Home page & About**: change the big photo, the About text or the gear lists.

Each save updates this repository, and the site rebuilds in a minute or two.

## How it's put together

- `content/`: the words and photo lists (edited by the editor above)
  - `site.json`: home page photo and About
  - `galleries/*.json`: one file per gallery
  - `journal/*.md`: one file per journal entry
- `static/`: copied to the site as-is (photos, styles, the editor at `/admin`)
- `build.mjs`: turns the content into web pages

Photos are resized for each screen during the build (into `_site/img/`), so large originals are fine.

## Hosting on Cloudflare

Cloudflare builds the site from this repository whenever `main` changes:
build command `npm install && npm run build`, deploy command `npx wrangler deploy`.
Settings are in `wrangler.jsonc`. Old-address redirects and cache headers are written by
`build.mjs` (`_redirects`, `_headers`).

The editor at `/admin` signs in with GitHub through the site itself: `worker/auth.js` handles
`/auth` and `/callback`, using the GitHub OAuth App "Feathers & Photons editor"
(callback URL `https://feathersandphotons.com/callback`). Its Client ID and Client Secret are
stored in Cloudflare as the secrets `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
(feathersandphotons → Settings → Variables and Secrets).

The feedback button below About uses `feedback_email` in `content/site.json`
(editable under **Home page & About**). It appears on the Cloudflare site only.

Local preview: `npm run preview`, then open http://localhost:8080
