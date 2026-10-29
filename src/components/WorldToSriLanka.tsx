import { useEffect, useRef, useState } from 'react'
import mapUrl from '../assets/location-world.svg'
import { SITE } from '../config/site'
import { ArrowIcon, CallIcon, MailIcon, WhatsAppIcon } from './Icons'
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
    width: Math.exp(Math.log(previous.width) + Math.log(next.width / previous.width) * t),
  }
}

export default function WorldToSriLanka() {
  const [mapMarkup, setMapMarkup] = useState('')
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLElement>(null)
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
    const sticky = stickyRef.current
    const heading = headingRef.current
    const frame = frameRef.current
    const svg = mapRef.current?.querySelector('svg')
    const island = svg?.querySelector<SVGGraphicsElement>('#lk')
    const cards = cardsRef.current
    if (!section || !sticky || !heading || !frame || !svg || !island || !cards) return

    svg.setAttribute('aria-hidden', 'true')
    svg.setAttribute('focusable', 'false')
    const lk = island.getBBox()
    const islandCenter = { x: lk.x + lk.width / 2, y: lk.y + lk.height / 2 }
    const ns = 'http://www.w3.org/2000/svg'
    const defs = document.createElementNS(ns, 'defs')
    defs.innerHTML = `
      <linearGradient id="havelo-land-tone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#146778"/><stop offset=".5" stop-color="#0d485b"/><stop offset="1" stop-color="#082f43"/></linearGradient>
      <linearGradient id="havelo-island-tone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#61e3df"/><stop offset=".5" stop-color="#1cb7b7"/><stop offset="1" stop-color="#0d8897"/></linearGradient>
      <clipPath id="havelo-land-clip"/>
      <pattern id="havelo-land-dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".65" fill="#72e8e8"/><circle cx="6" cy="5" r=".35" fill="#34d7e8"/></pattern>`
    svg.prepend(defs)
    const land = svg.querySelector('#havelo-world-land')
    const countries = Array.from(land?.querySelectorAll<SVGPathElement>('path') ?? [])
    for (const country of countries) {
      if (country.getBBox().y > 590) country.classList.add('world-journey__polar-land')
    }
    const clip = document.createElementNS(ns, 'path')
    clip.setAttribute('d', countries.filter(path => !path.classList.contains('world-journey__polar-land')).map(path => path.getAttribute('d') ?? '').join(' '))
    defs.querySelector('#havelo-land-clip')?.append(clip)
    // One lightweight texture and five decorative routes share the map's geographic projection.
    const network = document.createElementNS(ns, 'g')
    network.setAttribute('class', 'world-journey__network')
    network.innerHTML = '<rect width="1440" height="620" fill="url(#havelo-land-dots)" clip-path="url(#havelo-land-clip)" opacity=".46"/>'
    const locations = [[-100, 39], [12, 50], [-50, -15], [105, 35], [138, 36]]
    for (const [longitude, latitude] of locations) {
      const x = (longitude + 180) * 4
      const y = (90 - latitude) * 4
      const arc = document.createElementNS(ns, 'path')
      arc.setAttribute('d', `M${x} ${y} Q${(x + islandCenter.x) / 2} ${Math.min(y, islandCenter.y) - 78} ${islandCenter.x} ${islandCenter.y}`)
      arc.setAttribute('class', 'world-journey__route')
      network.append(arc)
      const node = document.createElementNS(ns, 'g')
      node.setAttribute('class', 'world-journey__node')
      node.setAttribute('transform', `translate(${x} ${y})`)
      node.innerHTML = '<circle r="6" fill="#34d7e8" opacity=".12"/><circle r="2.2" fill="#a5ffff"/>'
      network.append(node)
    }
    const destination = document.createElementNS(ns, 'g')
    destination.setAttribute('transform', `translate(${islandCenter.x} ${islandCenter.y})`)
    destination.innerHTML = '<circle r="25" fill="none" stroke="#34d7e8" stroke-width=".6" opacity=".4"/><circle r="43" fill="none" stroke="#34d7e8" stroke-width=".5" opacity=".15"/><circle r="6" fill="#34d7e8" opacity=".2"/><circle r="2.5" fill="#b9ffff"/>'
    network.append(destination)
    svg.append(network)
    const pin = document.createElementNS(ns, 'g')
    pin.setAttribute('class', 'world-journey__pin')
    pin.setAttribute('transform', `translate(${islandCenter.x} ${islandCenter.y})`)
    pin.innerHTML = '<circle class="world-journey__pin-ripple" r="1.2"/><circle class="world-journey__pin-ring" r="1.8"/><path d="M0 1.05C.4.42.68.04.68-.38a.68.68 0 1 0-1.36 0c0 .42.28.8.68 1.43Z"/><circle class="world-journey__pin-core" cy="-.4" r=".21"/>'
    svg.append(pin)

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let sectionTop = 0
    let travel = 1
    let mapWidth = 1
    let initialMapHeight = 1
    let finalMapHeight = 1
    let mobile = false
    let frames: Camera[] = []
    let active = true
    let frameId = 0

    const render = () => {
      frameId = 0
      const progress = motion.matches ? 1 : clamp((window.scrollY - sectionTop) / travel)
      const intro = 1 - ease((progress - .08) / .18)
      const reveal = Math.max(intro, ease((progress - .81) / .16))
      const expansion = mobile ? reveal : 1
      const mapHeight = initialMapHeight + (finalMapHeight - initialMapHeight) * expansion
      frame.style.height = `${mapHeight.toFixed(1)}px`
      const camera = cameraAt(progress, frames)
      const height = camera.width * mapHeight / mapWidth
      svg.setAttribute('viewBox', `${(camera.x - camera.width / 2).toFixed(2)} ${(camera.y - height / 2).toFixed(2)} ${camera.width.toFixed(2)} ${height.toFixed(2)}`)
      svg.style.setProperty('--other-land-opacity', (1 - ease((progress - .76) / .19)).toFixed(3))
      network.style.opacity = (1 - ease((progress - .25) / .43)).toFixed(3)
      pin.style.opacity = ease((progress - .76) / .18).toFixed(3)
      cards.style.opacity = reveal.toFixed(3)
      cards.style.transform = `translateY(${((1 - reveal) * 10).toFixed(1)}px)`
      cards.inert = reveal < .85
      section.dataset.final = String(progress >= .97)
      section.dataset.static = String(motion.matches)
      section.dataset.progress = progress.toFixed(3)
    }

    const measure = () => {
      mobile = window.innerWidth <= 700
      const sectionStyle = getComputedStyle(section)
      const paddingTop = parseFloat(sectionStyle.paddingTop)
      const paddingBottom = parseFloat(sectionStyle.paddingBottom)
      const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0
      sectionTop = window.scrollY + section.getBoundingClientRect().top + paddingTop - stickyTop
      // Finish before the sticky panel releases, so the final view retains its white top margin.
      travel = Math.max(1, (section.clientHeight - paddingTop - paddingBottom - sticky.offsetHeight) * .86)
      const mapTop = heading.offsetTop + heading.offsetHeight + (mobile ? 12 : 16)
      frame.style.top = `${mapTop}px`
      mapWidth = frame.clientWidth
      const finalFeatureHeight = sticky.clientHeight
      finalMapHeight = Math.max(80, finalFeatureHeight - mapTop - (mobile ? cards.offsetHeight + 32 : 20))
      // Keep the panel equal to its sticky footprint and expand the map while the cards fade out.
      initialMapHeight = mobile ? finalFeatureHeight - mapTop - 18 : finalMapHeight
      const initialAspect = mapWidth / initialMapHeight
      const finalAspect = mapWidth / finalMapHeight
      const worldWidth = Math.max(1440, 540 * (mobile ? finalAspect : initialAspect))
      frames = [
        { at: 0, x: 720, y: 304, width: worldWidth },
        { at: .12, x: 720, y: 304, width: worldWidth },
        { at: .47, x: mobile ? 1080 : 1040, y: 235, width: mobile ? 520 : 640 },
        { at: .71, x: 1036, y: 292, width: mobile ? 180 : 225 },
        { at: 1, x: islandCenter.x, y: islandCenter.y + lk.height * .04, width: Math.max(lk.width * (mobile ? 2.7 : 3.4), lk.height * finalAspect * (mobile ? 1.2 : 1.55)) },
      ]
      render()
    }

    const schedule = () => { if (active && !frameId) frameId = requestAnimationFrame(render) }
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting
      section.dataset.active = String(active)
      if (active) { section.dataset.entered = 'true'; schedule() }
    }, { rootMargin: '20% 0px' })
    const resizeObserver = new ResizeObserver(measure)
    observer.observe(section)
    resizeObserver.observe(sticky)
    resizeObserver.observe(heading)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)
    motion.addEventListener('change', measure)
    measure()
    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
      motion.removeEventListener('change', measure)
      pin.remove()
      network.remove()
      defs.remove()
    }
  }, [mapMarkup])

  return (
    <section className="world-journey" id="our-home" ref={sectionRef} aria-labelledby="world-journey-title">
      <div className="world-journey__sticky" ref={stickyRef}>
        <div className="world-journey__atmosphere" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="world-journey__feature">
          <header className="world-journey__heading" ref={headingRef}>
            <span className="world-journey__eyebrow">Our home</span>
            <h2 id="world-journey-title">Rooted in Sri Lanka.<br /><em>Built for bigger ideas.</em></h2>
            <p>From Sri Lanka, we bring creative thinking, thoughtful design, and modern technology together to build digital experiences that make a difference.</p>
          </header>
          <div className="world-journey__map-frame" ref={frameRef} role="img" aria-label="World map zooming through Asia to Sri Lanka, with a country-level location marker">
            <div className="world-journey__map" ref={mapRef} dangerouslySetInnerHTML={{ __html: mapMarkup }} />
          </div>
          <div className="world-journey__contacts" ref={cardsRef} inert>
            <a className="world-journey__contact world-journey__contact--email" href={`mailto:${SITE.email}`}>
              <span className="world-journey__contact-icon"><MailIcon /></span>
              <span className="world-journey__contact-copy"><span className="world-journey__contact-label">Email us</span><strong>Let's connect</strong><span className="world-journey__contact-detail">{SITE.email}</span></span>
              <span className="world-journey__contact-arrow"><ArrowIcon /></span>
            </a>
            <div className="world-journey__contact world-journey__contact--phone">
              <a className="world-journey__call" href={SITE.phoneHref}>
                <span className="world-journey__contact-icon"><CallIcon /></span>
                <span className="world-journey__contact-copy"><span className="world-journey__contact-label">Call us</span><strong>Let's talk</strong><span className="world-journey__contact-detail">{SITE.phone}</span></span>
                <span className="world-journey__contact-arrow"><ArrowIcon /></span>
              </a>
              <a className="world-journey__whatsapp" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp Havelo on ${SITE.whatsappLabel}`}>
                <WhatsAppIcon /><span>WhatsApp <small>Chat with us</small></span><span aria-hidden="true">›</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
