import { useEffect, useRef, useState } from 'react'
import { orbitTechnologies } from './technologyData'
import resendLogo from '../assets/resend.svg'

const ORBIT_DURATION_MS = orbitTechnologies.length * 2_000
const technologyLogos = import.meta.glob('../assets/technology/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

function TechnologyMark({ id }: { id: string }) {
  const source = id === 'resend' ? resendLogo : technologyLogos[`../assets/technology/${id}.svg`]
  return source ? <img src={source} alt="" /> : null
}

export default function TechnologiesShowcase() {
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const phaseRef = useRef(0)
  const selectedIdRef = useRef(orbitTechnologies[0].id)
  const [selectedId, setSelectedId] = useState(orbitTechnologies[0].id)
  const [inView, setInView] = useState(false)
  const [tabVisible, setTabVisible] = useState(!document.hidden)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const selected = orbitTechnologies.find(technology => technology.id === selectedId) ?? orbitTechnologies[0]
  const playing = inView && tabVisible && !reducedMotion

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onVisibilityChange = () => setTabVisible(!document.hidden)
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionChange = () => setReducedMotion(preference.matches)
    document.addEventListener('visibilitychange', onVisibilityChange)
    preference.addEventListener('change', onMotionChange)
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      preference.removeEventListener('change', onMotionChange)
    }
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const animation = detailRef.current?.animate(
      [{ opacity: .55, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 260, easing: 'ease-out' },
    )
    return () => animation?.cancel()
  }, [selectedId, reducedMotion])

  useEffect(() => {
    const stage = stageRef.current
    const track = trackRef.current
    if (!stage || !track) return
    const nodes = Array.from(track.querySelectorAll<HTMLElement>('.technology-tile-position'))
    const count = nodes.length
    let size = stage.clientWidth
    let frameId = 0
    let previousTime = 0
    let previousPaint = 0
    let pendingTime = 0

    const positionNodes = () => {
      const radius = size * .35
      let closestIndex = 0
      let closestDepth = -1
      nodes.forEach((node, index) => {
        const angle = phaseRef.current + index * Math.PI * 2 / count
        const cosine = Math.cos(angle)
        const depth = (cosine + 1) / 2
        const scale = .58 + depth * .5
        const x = cosine * radius
        const y = Math.sin(angle) * radius
        node.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`
        node.style.opacity = String(.62 + depth * .38)
        node.style.zIndex = String(Math.round(depth * 100))
        if (depth > closestDepth) { closestDepth = depth; closestIndex = index }
      })
      if (playing) {
        const featuredId = orbitTechnologies[closestIndex]?.id
        if (featuredId && featuredId !== selectedIdRef.current) {
          selectedIdRef.current = featuredId
          setSelectedId(featuredId)
        }
      }
    }

    const resizeObserver = new ResizeObserver(() => { size = stage.clientWidth; positionNodes() })
    resizeObserver.observe(stage)
    positionNodes()
    const animate = (now: number) => {
      if (!previousTime) previousTime = now
      const elapsed = Math.min(now - previousTime, 100)
      previousTime = now
      pendingTime += elapsed
      if (pendingTime > 0 && now - previousPaint >= 32) {
        phaseRef.current = (phaseRef.current + pendingTime * Math.PI * 2 / ORBIT_DURATION_MS) % (Math.PI * 2)
        positionNodes()
        pendingTime = 0
        previousPaint = now
      }
      frameId = requestAnimationFrame(animate)
    }
    if (playing && count > 1) frameId = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(frameId); resizeObserver.disconnect() }
  }, [playing])

  return (
    <section className="home-technologies" id="technologies" aria-labelledby="technologies-title">
      <div className="home-technologies__decor" aria-hidden="true"><i /><i /><span /></div>
      <div className="container home-technologies__layout">
        <div className="home-technologies__copy">
          <span className="eyebrow"><span />TECHNOLOGIES</span>
          <h2 id="technologies-title">The technology behind <em>bold ideas.</em></h2>
          <p>From modern web experiences and powerful backend systems to databases, cloud infrastructure, and mobile applications, we bring technologies together to build thoughtful digital solutions.</p>
        </div>
        <div className="home-technologies__universe">
          <div ref={stageRef} className="home-technologies__stage" data-orbit-playing={playing} aria-label="Technology orbit">
            <div className="home-technologies__orbit" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <div ref={detailRef} className="home-technologies__detail" aria-live="polite" aria-atomic="true">
              <small>{selected.group}</small>
              <h3 className={selected.name.length > 16 ? 'is-long' : undefined}>{selected.name}</h3>
              <p>{selected.detail}</p>
            </div>
            <div ref={trackRef} className="technology-orbit-track" aria-label="Select a technology">
              {orbitTechnologies.map((technology, index) => {
                return <span className="technology-tile-position" key={technology.id}>
                  <button
                    type="button"
                    className={`technology-tile technology-tile--${technology.id}${selectedId === technology.id ? ' is-selected' : ''}`}
                    aria-label={`Show ${technology.name}`}
                    aria-pressed={selectedId === technology.id}
                    onClick={() => {
                      phaseRef.current = (Math.PI * 2 - index * Math.PI * 2 / orbitTechnologies.length) % (Math.PI * 2)
                      selectedIdRef.current = technology.id
                      setSelectedId(technology.id)
                    }}
                  >
                    <span className={`technology-mark technology-mark--${technology.logo}`} aria-hidden="true"><TechnologyMark id={technology.logo} /></span>
                    <span className="technology-tile__name">{technology.name}</span>
                  </button>
                </span>
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
