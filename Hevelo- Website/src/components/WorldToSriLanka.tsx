import { useEffect, useRef, useState } from 'react'
import mapUrl from '../assets/location-world.svg'
import { SITE } from '../config/site'
import { CallIcon, MailIcon, WhatsAppIcon } from './Icons'
import '../havelo-location.css'

type Camera = { at: number; x: number; y: number; width: number }
const clamp = (value: number) => Math.min(1, Math.max(0, value))
const ease = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t) }

function cameraAt(progress: number, frames: Camera[]) {
  const index = frames.findIndex(frame => frame.at >= progress)
  if (index <= 0) return frames[0]
  const previous = frames[index - 1]
  const next = frames[index]
  const t = ease((progress - previous.at) / (next.at - previous.at))
  return {
    x: previous.x + (next.x - previous.x) * t,
    y: previous.y + (next.y - previous.y) * t,
    width: previous.width + (next.width - previous.width) * t,
  }
}

export default function WorldToSriLanka() {
  const [mapMarkup, setMapMarkup] = useState('')
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(mapUrl, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('Location map unavailable'); return response.text() })
      .then(setMapMarkup)
      .catch(error => { if (!controller.signal.aborted) console.error(error) })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const frame = frameRef.current
    const svg = mapRef.current?.querySelector('svg')
    const island = svg?.querySelector<SVGGraphicsElement>('#lk')
    const cards = cardsRef.current
    const sticky = section?.querySelector<HTMLElement>('.world-journey__sticky')
    if (!section || !frame || !svg || !island || !cards || !sticky) return

    svg.setAttribute('aria-hidden', 'true')
    svg.setAttribute('focusable', 'false')
    const lk = island.getBBox()
    const islandCenter = { x: lk.x + lk.width / 2, y: lk.y + lk.height / 2 }
    const pin = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    pin.setAttribute('class', 'world-journey__pin')
    pin.setAttribute('transform', `translate(${islandCenter.x} ${islandCenter.y})`)
    pin.innerHTML = '<circle class="world-journey__pin-ripple" r="1.35"/><path d="M0 1.05C.4.42.68.04.68-.38a.68.68 0 1 0-1.36 0c0 .42.28.8.68 1.43Z"/><circle class="world-journey__pin-core" cy="-.4" r=".21"/>'
    svg.append(pin)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let sectionTop = 0
    let travel = 1
    let aspect = 2
    let frames: Camera[] = []
    let active = true
    let frameId = 0

    const render = () => {
      frameId = 0
      const staticMode = motion.matches
      const progress = staticMode ? 1 : clamp((window.scrollY - sectionTop) / travel)
      const camera = cameraAt(progress, frames)
      const height = camera.width / aspect
      frame.style.transform = window.innerWidth <= 700 && !staticMode ? `translateY(${((1 - ease(progress)) * 52).toFixed(1)}px)` : ''
      svg.setAttribute('viewBox', `${(camera.x - camera.width / 2).toFixed(2)} ${(camera.y - height / 2).toFixed(2)} ${camera.width.toFixed(2)} ${height.toFixed(2)}`)
      svg.style.setProperty('--other-land-opacity', (1 - ease((progress - .79) / .15)).toFixed(3))
      pin.style.opacity = (staticMode ? 1 : ease((progress - .76) / .18)).toFixed(3)
      const reveal = staticMode ? 1 : ease((progress - .78) / .17)
      cards.style.opacity = reveal.toFixed(3)
      cards.style.transform = `translateY(${((1 - reveal) * 14).toFixed(1)}px)`
      cards.inert = reveal < .85
      section.dataset.final = String(progress >= .95)
      section.dataset.static = String(staticMode)
      section.dataset.progress = progress.toFixed(3)
    }

    const measure = () => {
      const sectionStyle = getComputedStyle(section)
      const paddingTop = parseFloat(sectionStyle.paddingTop)
      const paddingBottom = parseFloat(sectionStyle.paddingBottom)
      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0
      sectionTop = window.scrollY + section.getBoundingClientRect().top + paddingTop - stickyTop
      // Finish while the entire panel is pinned, leaving a short hold before normal page exit.
      travel = Math.max(1, (section.clientHeight - paddingTop - paddingBottom - sticky.offsetHeight) * .86)
      aspect = Math.max(.8, frame.clientWidth / Math.max(1, frame.clientHeight))
      const mobile = window.innerWidth <= 700
      const worldWidth = mobile ? Math.max(1440, 720 * aspect) : Math.max(1320, 690 * aspect)
      frames = [
        { at: 0, x: 720, y: 360, width: worldWidth },
        { at: .16, x: 720, y: 360, width: worldWidth },
        { at: .48, x: 1020, y: 220, width: 610 }, // Asia, projected from 75°E 35°N
        { at: .72, x: 1036, y: 280, width: 235 }, // India, projected from 79°E 20°N
        { at: 1, x: islandCenter.x, y: islandCenter.y + lk.height * .1, width: Math.max(lk.width * 3.5, lk.height * aspect * 1.7) },
      ]
      render()
    }

    const schedule = () => { if (active && !frameId) frameId = requestAnimationFrame(render) }
    const observer = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; if (active) { section.dataset.entered = 'true'; schedule() } }, { rootMargin: '20% 0px' })
    const resizeObserver = new ResizeObserver(measure)
    observer.observe(section)
    resizeObserver.observe(frame)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    motion.addEventListener('change', measure)
    measure()
    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      motion.removeEventListener('change', measure)
      pin.remove()
    }
  }, [mapMarkup])

  return (
    <section className="world-journey" id="our-home" ref={sectionRef} aria-labelledby="world-journey-title">
      <div className="world-journey__outer-spheres" aria-hidden="true"><span /><span /></div>
      <div className="world-journey__sticky">
        <div className="world-journey__feature">
          <header className="world-journey__heading">
            <span className="world-journey__eyebrow">Our home</span>
            <h2 id="world-journey-title">Proudly based in <em>Sri Lanka.</em></h2>
          </header>
          <div className="world-journey__map-frame" ref={frameRef} role="img" aria-label="Accurate world map zooming from the world through Asia and India to Sri Lanka">
            <div className="world-journey__map" ref={mapRef} dangerouslySetInnerHTML={{ __html: mapMarkup }} />
          </div>
          <div className="world-journey__contacts" ref={cardsRef}>
            <div className="world-journey__contact world-journey__contact--email">
              <span className="world-journey__contact-icon"><MailIcon /></span>
              <span className="world-journey__contact-label">Email us</span>
              <strong>Let's connect</strong>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
            <div className="world-journey__contact world-journey__contact--phone">
              <span className="world-journey__contact-icon"><CallIcon /></span>
              <span className="world-journey__contact-label">Call us</span>
              <strong>Let's talk</strong>
              <div className="world-journey__contact-actions">
                <a href={SITE.phoneHref}><CallIcon />{SITE.phone}</a>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp Havelo on ${SITE.whatsappLabel}`}><WhatsAppIcon />WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
