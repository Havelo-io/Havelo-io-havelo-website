import { useEffect, useRef } from 'react'

const VISION = 'Every remarkable digital experience begins with a bold idea. HAVELO brings together creative vision, purposeful design, and modern technology to build websites, applications, and intelligent digital solutions that solve real challenges and move businesses forward.'
const WORDS = VISION.split(' ')

function RocketVisual() {
  return (
    <div className="vision-rocket-flight" aria-hidden="true">
      <div className="vision-rocket">
        <div className="vision-rocket__halo" />
        <div className="vision-rocket__orbit vision-rocket__orbit--one" />
        <div className="vision-rocket__orbit vision-rocket__orbit--two" />
        <svg viewBox="0 0 520 520" role="presentation" focusable="false">
          <defs>
            <linearGradient id="rocket-body-premium" x1=".12" y1=".08" x2=".9" y2=".92">
              <stop stopColor="#d9fffc" />
              <stop offset=".24" stopColor="#73fff5" />
              <stop offset=".58" stopColor="#16bfc5" />
              <stop offset="1" stopColor="#07506d" />
            </linearGradient>
            <linearGradient id="rocket-shadow-premium" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#0b8092" />
              <stop offset="1" stopColor="#031d36" />
            </linearGradient>
            <linearGradient id="rocket-fin-premium" x1="0" y1="0" x2=".8" y2="1">
              <stop stopColor="#2de5dd" />
              <stop offset=".55" stopColor="#07899c" />
              <stop offset="1" stopColor="#063450" />
            </linearGradient>
            <linearGradient id="rocket-exhaust-premium" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#70fff5" stopOpacity="0" />
              <stop offset=".34" stopColor="#70fff5" stopOpacity=".86" />
              <stop offset=".7" stopColor="#1acbd1" stopOpacity=".46" />
              <stop offset="1" stopColor="#087f9b" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="rocket-window-premium" cx="38%" cy="32%">
              <stop stopColor="#e2fffc" />
              <stop offset=".2" stopColor="#70fff5" />
              <stop offset=".55" stopColor="#14b7c4" />
              <stop offset="1" stopColor="#03243d" />
            </radialGradient>
          </defs>

          <g className="vision-rocket__craft" transform="rotate(34 268 254)">
            <g className="vision-rocket__body">
              <path d="M218 148c-8 59 3 132 40 202l2 4 2-4c37-70 48-143 40-202-25-16-59-16-84 0Z" fill="url(#rocket-body-premium)" stroke="#bafff8" strokeOpacity=".58" strokeWidth="2" />
              <path d="M260 143c23 0 34 3 42 6 8 59-3 132-40 201l-2 4Z" fill="url(#rocket-shadow-premium)" opacity=".42" />
              <path d="M231 170c4 54 12 93 29 130" fill="none" stroke="#e5fffd" strokeLinecap="round" strokeOpacity=".27" strokeWidth="5" />
            </g>
            <g className="vision-rocket__nose">
              <path d="M218 149c7-45 22-78 42-96 20 18 35 51 42 96-23-15-61-15-84 0Z" fill="url(#rocket-body-premium)" stroke="#c9fffb" strokeOpacity=".62" strokeWidth="2" />
              <path d="M260 54c13 13 25 35 32 64-14-7-29-8-32-8Z" fill="#f0fffd" opacity=".35" />
            </g>
            <g className="vision-rocket__fin vision-rocket__fin--left">
              <path d="M231 295c-37 18-57 57-58 104l74-43Z" fill="url(#rocket-fin-premium)" stroke="#50ebe4" strokeOpacity=".52" />
            </g>
            <g className="vision-rocket__fin vision-rocket__fin--right">
              <path d="M289 295c37 18 57 57 58 104l-74-43Z" fill="url(#rocket-fin-premium)" stroke="#50ebe4" strokeOpacity=".52" />
            </g>
            <g className="vision-rocket__window">
              <circle cx="260" cy="208" r="39" fill="#041927" stroke="#a9fff9" strokeWidth="5" />
              <circle cx="260" cy="208" r="29" fill="url(#rocket-window-premium)" />
              <circle cx="250" cy="197" r="7" fill="#effffd" opacity=".42" />
            </g>
            <g className="vision-rocket__engine">
              <path d="M240 347h40l-7 25h-26Z" fill="#05263b" stroke="#4de9e2" strokeOpacity=".58" />
              <ellipse cx="260" cy="372" rx="14" ry="5" fill="#9afff8" />
              <path className="vision-rocket__exhaust" d="m242 374 18 91 18-91c-12 8-24 8-36 0Z" fill="url(#rocket-exhaust-premium)" />
              <path className="vision-rocket__exhaust-core" d="m253 375 7 61 7-61Z" fill="#d8fffb" opacity=".86" />
            </g>
          </g>
        </svg>
        <i className="vision-particle vision-particle--one" />
        <i className="vision-particle vision-particle--two" />
        <i className="vision-particle vision-particle--three" />
        <i className="vision-particle vision-particle--four" />
        <i className="vision-particle vision-particle--five" />
      </div>
    </div>
  )
}

export default function VisionReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let inView = false
    const render = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const viewport = window.innerHeight
      const travel = Math.max(rect.height + viewport * .4, 1)
      const progress = Math.max(0, Math.min(1, (viewport * .9 - rect.top) / travel))
      section.style.setProperty('--vision-progress', (reducedMotion.matches ? 1 : progress).toFixed(4))
      wordRefs.current.forEach((word, index) => {
        if (!word) return
        const start = (index / WORDS.length) * .74
        const reveal = reducedMotion.matches ? 1 : Math.max(0, Math.min(1, (progress - start) / .18))
        word.style.setProperty('--word-reveal', reveal.toFixed(3))
      })
    }

    const requestRender = () => {
      if (inView && !frame) frame = window.requestAnimationFrame(render)
    }

    const handleMotionChange = () => {
      inView = true
      requestRender()
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      section.classList.toggle('is-in-view', inView)
      if (inView) requestRender()
    }, { rootMargin: '12% 0px', threshold: .12 })

    observer.observe(section)
    render()
    window.addEventListener('scroll', requestRender, { passive: true })
    window.addEventListener('resize', requestRender)
    reducedMotion.addEventListener('change', handleMotionChange)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', requestRender)
      window.removeEventListener('resize', requestRender)
      reducedMotion.removeEventListener('change', handleMotionChange)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="vision-reveal vision-reveal--flight vision-reveal--static-rocket" ref={sectionRef} aria-labelledby="vision-reveal-title">
      <div className="vision-reveal__ambient" aria-hidden="true" />
      <div className="container vision-reveal__story">
        <div className="vision-reveal__copy">
          <h2 id="vision-reveal-title">Where bold ideas become <em>digital reality.</em></h2>
          <p className="vision-reveal__accessible">{VISION}</p>
          <p className="vision-reveal__manifesto" aria-hidden="true">
            {WORDS.map((word, index) => (
              <span className={word.startsWith('HAVELO') ? 'vision-reveal__brand' : undefined} key={`${word}-${index}`} ref={element => { wordRefs.current[index] = element }}>{word}{index < WORDS.length - 1 ? ' ' : ''}</span>
            ))}
          </p>
        </div>
        <div className="vision-reveal__visual"><RocketVisual /></div>
      </div>
    </section>
  )
}
