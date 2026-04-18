// ─── Dark mode toggle ─────────────────────────────────────────────────────────
const htmlEl = document.documentElement
const darkBtn = document.getElementById('dark-mode-toggle')

if (localStorage.getItem('aiff-theme') === 'dark') {
  htmlEl.setAttribute('data-theme', 'dark')
  if (darkBtn) darkBtn.textContent = '☀'
}

if (darkBtn) {
  darkBtn.addEventListener('click', () => {
    const isDark = htmlEl.getAttribute('data-theme') === 'dark'
    if (isDark) {
      htmlEl.removeAttribute('data-theme')
      darkBtn.textContent = '🌙'
      localStorage.setItem('aiff-theme', 'light')
    } else {
      htmlEl.setAttribute('data-theme', 'dark')
      darkBtn.textContent = '☀'
      localStorage.setItem('aiff-theme', 'dark')
    }
  })
}

// ─── Rotating headline use cases ─────────────────────────────────────────────
const USE_CASES = [
  'Job Applications',
  'Visa Applications',
  'Bank Account Forms',
  'Insurance Claims',
  'Medical Intake Forms',
  'Tax Filing Forms',
  'Government Portals',
  'University Admissions',
]

const rotatingEl = document.getElementById('rotating-use-case')

if (rotatingEl) {
  let current = 0

  function rotateWord() {
    // Exit animation
    rotatingEl.classList.add('exit')

    setTimeout(() => {
      // Swap text while invisible
      current = (current + 1) % USE_CASES.length
      rotatingEl.textContent = USE_CASES[current]

      // Enter animation
      rotatingEl.classList.remove('exit')
      rotatingEl.classList.add('enter')

      // Force reflow so transition fires
      void rotatingEl.offsetWidth

      rotatingEl.classList.remove('enter')
    }, 300) // matches CSS transition duration
  }

  setInterval(rotateWord, 2500)
}

// ─── Scroll-fade (Intersection Observer) ──────────────────────────────────────
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        observer.unobserve(e.target)
      }
    })
  },
  { threshold: 0.12 }
)

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))

// ─── FAQ accordion keyboard support ──────────────────────────────────────────
document.querySelectorAll('summary').forEach(summary => {
  summary.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      summary.parentElement.toggleAttribute('open')
    }
  })
})

// ─── Smooth CTA tracking (optional: replace with real analytics later) ───────
document.querySelectorAll('a[data-cta]').forEach(link => {
  link.addEventListener('click', () => {
    const label = link.getAttribute('data-cta')
    // eslint-disable-next-line no-console
    console.log('[AIFF] CTA clicked:', label)
    // TODO: replace with real analytics call, e.g. plausible('CTA Click', { props: { label } })
  })
})
