// Fullscreen photo viewer for gallery pages: click a photo, use arrows / swipe, Esc to close.
(() => {
  const viewer = document.querySelector('.viewer')
  const buttons = [...document.querySelectorAll('[data-gallery] button[data-full]')]
  if (!viewer || !buttons.length) return

  const pic = viewer.querySelector('.viewer-stage img')
  const text = viewer.querySelector('.viewer-text')
  const pos = viewer.querySelector('.viewer-pos')
  const closeBtn = viewer.querySelector('.viewer-close')
  let index = -1
  let lastFocus = null

  const preload = (i) => { const b = buttons[(i + buttons.length) % buttons.length]; const im = new Image(); im.src = b.dataset.full }

  function show(i) {
    index = (i + buttons.length) % buttons.length
    const b = buttons[index]
    pic.classList.add('loading')
    pic.onload = () => pic.classList.remove('loading')
    pic.src = b.dataset.full
    pic.alt = b.dataset.caption || ''
    text.textContent = b.dataset.caption || ''
    pos.textContent = `· ${index + 1} of ${buttons.length}`
    preload(index + 1); preload(index - 1)
  }
  function open(i) {
    lastFocus = document.activeElement
    viewer.hidden = false
    document.documentElement.style.overflow = 'hidden'
    show(i)
    closeBtn.focus()
  }
  function close() {
    viewer.hidden = true
    document.documentElement.style.overflow = ''
    pic.removeAttribute('src')
    if (lastFocus) lastFocus.focus()
  }

  buttons.forEach((b, i) => b.addEventListener('click', () => open(i)))
  closeBtn.addEventListener('click', close)
  viewer.querySelector('.viewer-prev').addEventListener('click', () => show(index - 1))
  viewer.querySelector('.viewer-next').addEventListener('click', () => show(index + 1))
  viewer.addEventListener('click', (e) => { if (e.target === viewer || e.target.classList.contains('viewer-stage')) close() })

  document.addEventListener('keydown', (e) => {
    if (viewer.hidden) return
    if (e.key === 'Escape') close()
    else if (e.key === 'ArrowRight') show(index + 1)
    else if (e.key === 'ArrowLeft') show(index - 1)
    else if (e.key === 'Tab') {
      const f = [...viewer.querySelectorAll('button')]
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  })

  let x0 = null
  viewer.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX }, { passive: true })
  viewer.addEventListener('touchend', (e) => {
    if (x0 === null) return
    const dx = e.changedTouches[0].clientX - x0
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1))
    x0 = null
  })
})()
