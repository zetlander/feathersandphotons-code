// Builds the Feathers & Photons site into _site/.
// Content comes from content/ (edited through /admin),
// static files (photos, styles, the editor) are copied from static/.
//
//   node build.mjs          build for Cloudflare (resized copies of each photo made here, in _site/img/)
//   LOCAL=1 node build.mjs  build for a local preview (full-size photos)

import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.dirname(new URL(import.meta.url).pathname)
const OUT = path.join(ROOT, '_site')
const STATIC = path.join(ROOT, 'static')
const CONTENT = path.join(ROOT, 'content')
const LOCAL = !!process.env.LOCAL
const YEAR = new Date().getFullYear()

// ---------- helpers ----------

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const slugify = (s) =>
  String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const readJSON = (p) => JSON.parse(fs.readFileSync(p, 'utf8'))

function write(rel, html) {
  const file = path.join(OUT, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
}

// Image URL. A resized copy is made during the build: /photos/birds/heron.jpg at 1000px → /img/photos/birds/heron-1000.jpg
const resizes = new Map() // output file → { src, width }
function img(src, width) {
  if (!src) return ''
  const p = encodeURI(src.startsWith('/') ? src : '/' + src)
  if (LOCAL || !width) return p
  const clean = decodeURI(p)
  const out = `/img${clean.replace(/\.[^./]+$/, '')}-${width}.jpg`
  resizes.set(out, { src: clean, width })
  return encodeURI(out)
}
const srcset = (src, widths) => widths.map((w) => `${img(src, w)} ${w}w`).join(', ')

// Read pixel size from JPEG / PNG / WebP headers so pages don't jump while loading.
function imageSize(src) {
  try {
    const file = path.join(STATIC, decodeURI(src))
    const b = fs.readFileSync(file)
    if (b[0] === 0x89 && b.toString('ascii', 1, 4) === 'PNG') return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }
    if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
      const kind = b.toString('ascii', 12, 16)
      if (kind === 'VP8X') return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) }
      if (kind === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff }
      if (kind === 'VP8L') {
        const n = b.readUInt32LE(21)
        return { w: 1 + (n & 0x3fff), h: 1 + ((n >> 14) & 0x3fff) }
      }
    }
    if (b[0] === 0xff && b[1] === 0xd8) {
      let i = 2
      let orient = 1
      let size = null
      while (i < b.length) {
        if (b[i] !== 0xff) { i++; continue }
        const marker = b[i + 1]
        const len = b.readUInt16BE(i + 2)
        if (marker === 0xe1 && b.toString('ascii', i + 4, i + 8) === 'Exif') orient = exifOrientation(b, i + 10)
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
          size = { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) }
          break
        }
        i += 2 + len
      }
      if (size && orient >= 5) return { w: size.h, h: size.w }
      return size
    }
  } catch {}
  return null
}
function exifOrientation(b, t) {
  try {
    const le = b.toString('ascii', t, t + 2) === 'II'
    const u16 = (o) => (le ? b.readUInt16LE(o) : b.readUInt16BE(o))
    const u32 = (o) => (le ? b.readUInt32LE(o) : b.readUInt32BE(o))
    const ifd = t + u32(t + 4)
    const n = u16(ifd)
    for (let k = 0; k < n; k++) {
      const e = ifd + 2 + k * 12
      if (u16(e) === 0x0112) return u16(e + 8)
    }
  } catch {}
  return 1
}
const dims = (src) => {
  const s = imageSize(src)
  return s ? ` width="${s.w}" height="${s.h}"` : ''
}

// ---------- small Markdown converter (for journal entries) ----------

function inline(text) {
  let s = esc(text)
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>')
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, (m, alt, src) =>
    `<img src="${src.startsWith('/') ? img(src, 1600) : src}" alt="${alt}" loading="lazy">`)
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, (m, t, href) => {
    const ext = /^https?:/.test(href) && !href.includes('feathersandphotons.com')
    return `<a href="${href}"${ext ? ' rel="noopener" target="_blank"' : ''}>${t}</a>`
  })
  s = s.replace(/<(https?:\/\/[^>\s]+)>/g, '<a href="$1" rel="noopener" target="_blank">$1</a>')
  s = s.replace(/\*\*([^*]+)\*\*|__([^_]+)__/g, (m, a, b) => `<strong>${a || b}</strong>`)
  s = s.replace(/(^|[^*\w])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>')
  s = s.replace(/(^|[^_\w])_([^_\n]+)_(?![_\w])/g, '$1<em>$2</em>')
  s = s.replace(/~~([^~]+)~~/g, '<del>$1</del>')
  s = s.replace(/( {2,}|\\)\n/g, '<br>\n')
  s = s.replace(/\\([\\`*_{}\[\]()#+\-.!>])/g, '$1')
  return s
}

function markdown(md) {
  const lines = md.replace(/\r\n?/g, '\n').split('\n')
  const out = []
  let i = 0
  const isBlank = (l) => /^\s*$/.test(l)
  const listRe = /^\s*([-*+]|\d+[.)])\s+/
  while (i < lines.length) {
    const line = lines[i]
    if (isBlank(line)) { i++; continue }
    let m
    if ((m = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/))) {
      const lvl = Math.min(6, Math.max(2, m[1].length + 1)) // page already has the <h1>
      out.push(`<h${lvl}>${inline(m[2])}</h${lvl}>`); i++; continue
    }
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) { out.push('<hr>'); i++; continue }
    if (/^```/.test(line)) {
      const buf = []; i++
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++])
      i++
      out.push(`<pre><code>${esc(buf.join('\n'))}</code></pre>`); continue
    }
    if (/^\s*>/.test(line)) {
      const buf = []
      while (i < lines.length && /^\s*>/.test(lines[i])) buf.push(lines[i++].replace(/^\s*>\s?/, ''))
      out.push(`<blockquote>${markdown(buf.join('\n'))}</blockquote>`); continue
    }
    if (listRe.test(line)) {
      const ordered = /^\s*\d/.test(line)
      const items = []
      while (i < lines.length && (listRe.test(lines[i]) || (!isBlank(lines[i]) && /^\s{2,}/.test(lines[i])))) {
        if (listRe.test(lines[i])) items.push(lines[i].replace(listRe, ''))
        else items[items.length - 1] += '\n' + lines[i].trim()
        i++
        if (i < lines.length && isBlank(lines[i]) && i + 1 < lines.length && listRe.test(lines[i + 1])) i++
      }
      const tag = ordered ? 'ol' : 'ul'
      out.push(`<${tag}>${items.map((t) => `<li>${inline(t)}</li>`).join('')}</${tag}>`); continue
    }
    const buf = []
    while (i < lines.length && !isBlank(lines[i]) && !/^(#{1,6}\s|```|\s*>)/.test(lines[i]) && !listRe.test(lines[i])) buf.push(lines[i++])
    const para = buf.join('\n')
    if (/^!\[[^\]]*\]\([^)]+\)$/.test(para.trim())) out.push(`<figure>${inline(para.trim())}</figure>`)
    else out.push(`<p>${inline(para)}</p>`)
  }
  return out.join('\n')
}

// ---------- journal entries ----------

function parseEntry(raw) {
  raw = raw.replace(/^﻿/, '')
  let data = {}
  let body = raw
  const fm = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
  const head = fm ? fm[1].trim() : null
  if (fm) body = fm[2]
  if (head && head.startsWith('{')) data = JSON.parse(head)
  else if (head && head.startsWith('"')) data = JSON.parse('{' + head + '}')
  else if (head) {
    // simple "key: value" front matter, in case an entry is written by hand
    for (const l of head.split('\n')) {
      const mm = l.match(/^(\w+):\s*(.*)$/)
      if (mm) data[mm[1]] = mm[2].replace(/^(['"])(.*)\1$/, '$2')
    }
  } else if (raw.trimStart().startsWith('{')) {
    // JSON front matter with { } delimiters
    let depth = 0, inStr = false, end = -1
    const s = raw.trimStart()
    for (let k = 0; k < s.length; k++) {
      const c = s[k]
      if (inStr) { if (c === '\\') k++; else if (c === '"') inStr = false; continue }
      if (c === '"') inStr = true
      else if (c === '{') depth++
      else if (c === '}' && --depth === 0) { end = k; break }
    }
    data = JSON.parse(s.slice(0, end + 1))
    body = s.slice(end + 1)
  }
  if (data.body && !body.trim()) body = data.body
  return { data, body: body.trim() }
}

const fmtDate = (d) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
const shortDate = (d) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })

function firstWords(md, n = 40) {
  const text = md.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#+\s.*$/gm, '').replace(/[*_>`#~]/g, '').replace(/\s+/g, ' ').trim()
  const words = text.split(' ')
  return words.length > n ? words.slice(0, n).join(' ') + '…' : text
}

function loadJournal() {
  const dir = path.join(CONTENT, 'journal')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
    const { data, body } = parseEntry(fs.readFileSync(path.join(dir, f), 'utf8'))
    if (data.draft === true || data.draft === 'true') return null
    const date = new Date(data.date || fs.statSync(path.join(dir, f)).mtime)
    const slug = f.replace(/\.md$/, '')
    return {
      slug,
      url: `/journal/${slug}/`,
      title: data.title || slug,
      date,
      summary: data.summary || firstWords(body, 36),
      opening: firstWords(body, 60),
      html: markdown(body),
    }
  }).filter(Boolean).sort((a, b) => b.date - a.date)
}

// ---------- page shell ----------

function layout({ title, description, current, body, image }) {
  const nav = [
    ...galleries.map((g) => ({ href: g.url, label: g.title, key: g.slug })),
    { href: '/journal/', label: 'Journal', key: 'journal' },
    { href: '/#about', label: 'About', key: 'about' },
  ]
  const fullTitle = title ? `${title} · Feathers & Photons` : 'Feathers & Photons'
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description || 'Photographs of birds, the night sky, landscapes and people by K. H. Williamson.')}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:type" content="website">
${image ? `<meta property="og:image" content="https://feathersandphotons.com${esc(img(image, 1200))}">` : ''}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&family=IBM+Plex+Sans:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header wrap">
  <a class="brand" href="/">Feathers <span>&amp;</span> Photons</a>
  <nav aria-label="Main">
    ${nav.map((n) => `<a href="${n.href}"${n.key === current ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`).join('\n    ')}
  </nav>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer wrap">
  <span>© ${YEAR} K. H. Williamson · feathersandphotons.com</span>
  <span>All photographs © the author</span>
</footer>
</body>
</html>
`
}

// ---------- feedback email (below About) ----------
// The address is never written into the page: it is put together only when someone
// clicks, so robots that collect email addresses from websites don't find it.
function feedbackSection() {
  const email = (site.feedback_email || '').trim()
  const m = email.match(/^([^@\s]+)@([^@\s]+\.[^@\s]+)$/)
  if (!m) return ''
  return `

<section id="feedback" class="wrap section feedback" aria-labelledby="feedback-h">
  <h2 id="feedback-h" class="eyebrow">Feedback</h2>
  <p>Comments on a photo, or the site? I'd be glad to hear from you.</p>
  <a class="feedback-button" href="#feedback" data-u="${esc(m[1].split('').reverse().join(''))}" data-d="${esc(m[2].split('').reverse().join(''))}">Send feedback by email</a>
  <script>
  document.querySelector('.feedback-button').addEventListener('click', (e) => {
    e.preventDefault()
    const r = (x) => x.split('').reverse().join('')
    const b = e.currentTarget
    location.href = 'mailto:' + r(b.dataset.u) + '@' + r(b.dataset.d) + '?subject=' + encodeURIComponent('Feedback on Feathers & Photons')
  })
  </script>
</section>`
}

// ---------- load content ----------

const site = readJSON(path.join(CONTENT, 'site.json'))
const galleries = fs.readdirSync(path.join(CONTENT, 'galleries')).filter((f) => f.endsWith('.json')).map((f) => {
  const g = readJSON(path.join(CONTENT, 'galleries', f))
  const slug = f.replace(/\.json$/, '')
  const photos = (g.photos || []).filter((p) => p && p.image)
  return { ...g, slug, url: `/${slug}/`, photos }
}).sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
const journal = loadJournal()

// ---------- build ----------

fs.rmSync(OUT, { recursive: true, force: true })
fs.cpSync(STATIC, OUT, { recursive: true })

const plural = (n) => `${n} photo${n === 1 ? '' : 's'}`

// Home
{
  const f = site.featured || {}
  const a = site.about || {}
  const body = `
<section class="wrap hero">
  ${f.image ? `<div class="hero-frame"><img src="${img(f.image, 1600)}" srcset="${srcset(f.image, [800, 1200, 1600, 2400])}" sizes="(min-width: 1240px) 1192px, 100vw" alt="${esc(f.caption || '')}"${dims(f.image)} style="object-position:${esc(f.focus || 'center')}" fetchpriority="high"></div>` : ''}
  ${f.caption ? `<p class="caption">${esc(f.caption)}</p>` : ''}
</section>

<section class="wrap section" aria-labelledby="galleries-h">
  <h2 id="galleries-h" class="eyebrow eyebrow-lg">Galleries</h2>
  <div class="cards">
    ${galleries.map((g) => {
      const c = g.cover && g.cover.image ? g.cover : { image: g.photos[0]?.image, caption: g.photos[0]?.caption }
      return `<a class="card" href="${g.url}">
      <div class="card-frame">${c.image ? `<img src="${img(c.image, 800)}" srcset="${srcset(c.image, [400, 800, 1200])}" sizes="(min-width: 1240px) 280px, (min-width: 700px) 45vw, 100vw" alt="${esc(c.caption || g.title)}" loading="lazy" style="object-position:${esc(c.focus || 'center')}">` : ''}</div>
      ${c.caption ? `<p class="caption">${esc(c.caption)}</p>` : ''}
      <div class="card-title"><span>${esc(g.title)}</span><span class="count">${plural(g.photos.length)}</span></div>
    </a>`
    }).join('\n    ')}
  </div>
</section>

<section id="about" class="wrap section about" aria-labelledby="about-h">
  <h2 id="about-h" class="eyebrow">About</h2>
  <div class="about-row">
    ${a.portrait ? `<img class="portrait" src="${img(a.portrait, 400)}" alt="Portrait of ${esc(a.name || '')}" loading="lazy">` : ''}
    <div class="about-text">
      <p class="about-lead"><span class="about-name">${esc(a.name || '')}</span>${a.intro ? ` · ${esc(a.intro)}` : ''}</p>
      ${(a.gear || []).map((g) => `<p><span class="label">${esc(g.label)}</span> · ${esc(g.text)}</p>`).join('\n      ')}
    </div>
  </div>
</section>${feedbackSection()}`
  write('index.html', layout({ body, image: f.image }))
}

// Galleries
for (const g of galleries) {
  const small = g.thumbnail_size === 'small'
  const body = `
<section class="wrap page-head">
  <div>
    <a class="back" href="/">← All galleries</a>
    <h1>${esc(g.title)}</h1>
  </div>
  <p class="meta">${plural(g.photos.length)} · click any photo to view it larger</p>
</section>

<section class="wrap masonry${small ? ' masonry-small' : ''}" aria-label="${esc(g.title)} photographs" data-gallery>
  ${g.photos.map((p, i) => `<figure>
    <button type="button" data-full="${esc(img(p.image, 2400))}" data-caption="${esc(p.caption || '')}" data-index="${i}" aria-label="View larger: ${esc(p.caption || 'photo ' + (i + 1))}">
      <img src="${img(p.image, small ? 700 : 1000)}" srcset="${srcset(p.image, small ? [400, 700, 1000] : [600, 1000, 1400])}" sizes="${small ? '(min-width: 1240px) 380px, (min-width: 760px) 45vw, 100vw' : '(min-width: 1100px) 584px, 100vw'}" alt="${esc(p.caption || '')}"${dims(p.image)} loading="${i < 4 ? 'eager' : 'lazy'}">
    </button>
    ${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ''}
  </figure>`).join('\n  ')}
</section>

<div class="viewer" role="dialog" aria-modal="true" aria-label="Photo viewer" hidden>
  <button type="button" class="round viewer-close" aria-label="Close"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  <div class="viewer-stage"><img alt=""></div>
  <div class="viewer-bar">
    <button type="button" class="round viewer-prev" aria-label="Previous photo"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
    <p class="viewer-caption"><span class="viewer-text"></span> <span class="viewer-pos"></span></p>
    <button type="button" class="round viewer-next" aria-label="Next photo"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
  </div>
</div>
<script src="/assets/viewer.js" defer></script>`
  write(`${g.slug}/index.html`, layout({ title: g.title, current: g.slug, body, image: g.cover?.image || g.photos[0]?.image, description: `${g.title} — ${plural(g.photos.length)} by K. H. Williamson.` }))
}

// Journal list
{
  const [latest, ...rest] = journal
  const body = `
<div class="wrap-narrow journal">
  <h1>Journal</h1>
  ${latest ? `
  <article class="latest">
    <a href="${latest.url}">
      <p class="eyebrow">Latest · ${fmtDate(latest.date)}</p>
      <h2>${esc(latest.title)}</h2>
      <p class="opening">${esc(latest.opening)}</p>
      <span class="more">Keep reading →</span>
    </a>
  </article>` : `<p class="empty">Nothing here yet. The first entry is on its way.</p>`}
  ${rest.length ? `
  <section class="earlier" aria-label="Earlier entries">
    ${rest.map((p) => `<a href="${p.url}">
      <span class="date">${shortDate(p.date)}</span>
      <span class="entry"><span class="entry-title">${esc(p.title)}</span><span class="entry-summary">${esc(p.summary)}</span></span>
    </a>`).join('\n    ')}
  </section>` : ''}
</div>`
  write('journal/index.html', layout({ title: 'Journal', current: 'journal', body }))
}

// Journal entries
journal.forEach((p, i) => {
  const newer = journal[i - 1]
  const older = journal[i + 1]
  const body = `
<article class="wrap-narrow post">
  <a class="back" href="/journal/">← Journal</a>
  <p class="eyebrow">${fmtDate(p.date)}</p>
  <h1>${esc(p.title)}</h1>
  <div class="prose">
${p.html}
  </div>
  <nav class="post-nav" aria-label="More entries">
    ${older ? `<a href="${older.url}"><span class="label">Earlier</span>${esc(older.title)}</a>` : '<span></span>'}
    ${newer ? `<a class="newer" href="${newer.url}"><span class="label">Later</span>${esc(newer.title)}</a>` : ''}
  </nav>
</article>`
  write(`journal/${p.slug}/index.html`, layout({ title: p.title, current: 'journal', body, description: p.summary }))
})

// 404
write('404.html', layout({
  title: 'Not found',
  body: `<div class="wrap-narrow journal"><h1>Not found</h1><p class="empty">That page isn’t here. Try the <a href="/">galleries</a> or the <a href="/journal/">journal</a>.</p></div>`,
}))

// ---------- Cloudflare extras ----------
// Cloudflare reads _redirects and _headers from the site folder.

if (!LOCAL) {
  write('_redirects', [
    '# Old addresses from the previous site',
    '/deep-sky /astrophotography/ 301',
    '/feedback / 301',
    '/contact / 301',
    '/people/* / 301',
    '',
  ].join('\n'))
  write('_headers', [
    '/assets/*',
    '  Cache-Control: public, max-age=3600',
    '/img/*',
    '  Cache-Control: public, max-age=86400',
    '/admin/*',
    '  X-Robots-Tag: noindex',
    '',
  ].join('\n'))

  // Cloudflare can't host a single file over 25 MB. Visitors see the resized copies made below
  // (made from the originals in static/), so leave out any original that's too big to host.
  const LIMIT = 25 * 1024 * 1024
  const dropBig = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name)
      if (e.isDirectory()) dropBig(f)
      else if (fs.statSync(f).size > LIMIT) {
        fs.rmSync(f)
        console.warn(`Left out the full-size original (over 25 MB): ${path.relative(OUT, f)}`)
      }
    }
  }
  dropBig(OUT)

  // Make the resized copies of each photo.
  const { default: sharp } = await import('sharp')
  const jobs = [...resizes]
  let made = 0
  const worker = async () => {
    while (jobs.length) {
      const [out, { src, width }] = jobs.shift()
      const from = path.join(STATIC, src)
      const to = path.join(OUT, out)
      if (!fs.existsSync(from)) { console.warn(`Missing photo: ${src}`); continue }
      fs.mkdirSync(path.dirname(to), { recursive: true })
      await sharp(from).rotate().resize({ width, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(to)
      made++
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker))
  console.log(`Made ${made} resized photos`)
}

console.log(`Built ${galleries.length} galleries (${galleries.reduce((n, g) => n + g.photos.length, 0)} photos) and ${journal.length} journal entries into _site/`)
