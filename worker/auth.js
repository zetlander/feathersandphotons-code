// GitHub sign-in for the editor at /admin.
// The editor (Decap CMS) opens /auth in a pop-up; this sends you to GitHub to approve,
// GitHub returns to /callback, and the pop-up hands the editor a GitHub token.
// Everything else on the site is served straight from the built files (see wrangler.jsonc).
//
// Needs two secrets, set in Cloudflare under the feathersandphotons application:
// Settings → Variables and Secrets → GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET
// (from the GitHub OAuth App "Feathers & Photons editor").

// Pages allowed to receive the sign-in token.
const ALLOWED_ORIGINS = [
  'https://feathersandphotons.com',
  'https://www.feathersandphotons.com',
]
const isAllowed = (origin) =>
  ALLOWED_ORIGINS.includes(origin) ||
  /^https:\/\/feathersandphotons\.[a-z0-9-]+\.workers\.dev$/.test(origin)

const SCOPES = ['repo', 'public_repo']

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname === '/auth') return start(url, env)
    if (url.pathname === '/callback') return finish(request, url, env)
    return new Response('Not found', { status: 404 })
  },
}

function start(url, env) {
  if (!env.GITHUB_CLIENT_ID) return page('Sign-in isn’t set up yet: GITHUB_CLIENT_ID is missing in Cloudflare.')
  const scope = SCOPES.includes(url.searchParams.get('scope')) ? url.searchParams.get('scope') : 'repo'
  const state = crypto.randomUUID()
  const gh = new URL('https://github.com/login/oauth/authorize')
  gh.searchParams.set('client_id', env.GITHUB_CLIENT_ID)
  gh.searchParams.set('redirect_uri', `${url.origin}/callback`)
  gh.searchParams.set('scope', scope)
  gh.searchParams.set('state', state)
  return new Response(null, {
    status: 302,
    headers: {
      Location: gh.toString(),
      'Set-Cookie': `cms_state=${state}; Path=/callback; Max-Age=600; HttpOnly; Secure; SameSite=Lax`,
    },
  })
}

async function finish(request, url, env) {
  const cookie = request.headers.get('Cookie') || ''
  const saved = /(?:^|;\s*)cms_state=([^;]+)/.exec(cookie)?.[1]
  const state = url.searchParams.get('state')
  const code = url.searchParams.get('code')
  if (!code || !state || state !== saved) return result('error', { message: 'Sign-in expired or was interrupted. Close this window and try again.' })
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) return result('error', { message: 'Sign-in isn’t set up yet: the GitHub secrets are missing in Cloudflare.' })

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'User-Agent': 'feathersandphotons-editor' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/callback`,
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!data.access_token) return result('error', { message: data.error_description || 'GitHub didn’t return a sign-in token.' })
  return result('success', { token: data.access_token, provider: 'github' })
}

// The pop-up page: tells the editor it's ready, then sends the result only to an allowed page.
function result(status, content) {
  const message = JSON.stringify(`authorization:github:${status}:${JSON.stringify(content)}`)
  const allowed = JSON.stringify(ALLOWED_ORIGINS)
  const html = `<!doctype html><meta charset="utf-8"><title>Signing in…</title>
<p style="font-family:system-ui;padding:1rem">${status === 'success' ? 'Signed in. You can close this window.' : escapeHtml(content.message)}</p>
<script>
(function () {
  var allowed = ${allowed};
  function ok(o) { return allowed.indexOf(o) !== -1 || /^https:\\/\\/feathersandphotons\\.[a-z0-9-]+\\.workers\\.dev$/.test(o) }
  function receive(e) {
    if (!ok(e.origin)) return;
    window.removeEventListener('message', receive);
    window.opener.postMessage(${message}, e.origin);
    ${status === 'success' ? 'setTimeout(function () { window.close() }, 500);' : ''}
  }
  if (!window.opener) return;
  window.addEventListener('message', receive);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>`
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Set-Cookie': 'cms_state=; Path=/callback; Max-Age=0; HttpOnly; Secure; SameSite=Lax',
    },
  })
}

function page(text) {
  return new Response(`<!doctype html><meta charset="utf-8"><p style="font-family:system-ui;padding:1rem">${escapeHtml(text)}</p>`, {
    status: 500,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
