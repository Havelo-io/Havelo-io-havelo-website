import { useEffect, useRef, useState } from 'react'
import { servicesCatalog } from '../data/servicesCatalog'

export default function ServicesLaptop() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [pageVisible, setPageVisible] = useState(!document.hidden)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const rootRef = useRef<HTMLDivElement>(null)
  const feedRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const resumeTimer = useRef(0)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotion = () => setReducedMotion(media.matches)
    const onVisibility = () => setPageVisible(!document.hidden)
    media.addEventListener('change', onMotion)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      media.removeEventListener('change', onMotion)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (paused || !visible || !pageVisible || reducedMotion) return
    const timer = window.setTimeout(() => setActive(current => (current + 1) % servicesCatalog.length), 3600)
    return () => window.clearTimeout(timer)
  }, [active, paused, visible, pageVisible, reducedMotion])

  useEffect(() => {
    const feed = feedRef.current
    const item = itemRefs.current[active]
    if (!feed || !item) return
    const top = Math.max(0, Math.min(item.offsetTop - (feed.clientHeight - item.offsetHeight) / 2, feed.scrollHeight - feed.clientHeight))
    feed.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' })
  }, [active, reducedMotion])

  useEffect(() => () => window.clearTimeout(resumeTimer.current), [])

  const select = (index: number) => {
    setPaused(true)
    window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => setPaused(false), 7000)
    setActive(index)
    const service = servicesCatalog[index]
    window.history.replaceState(null, '', `#${service.id}`)
    document.getElementById(service.id)?.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className="sv-laptop-wrap" ref={rootRef}>
      <div
        className="sv-laptop"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false) }}
      >
        <div className="sv-laptop__lid">
          <span className="sv-laptop__camera" aria-hidden="true" />
          <div className="sv-laptop__screen">
            <header className="sv-laptop__topbar">
              <span className="sv-laptop__mark"><img src="/assets/havelo-mark.png" alt="" />HAVELO</span>
              <span>Services workspace</span>
              <i aria-hidden="true" />
            </header>
            <div className="sv-laptop__workspace">
              <aside aria-hidden="true"><b>Overview</b><span>Services</span><span>Process</span><span>Contact</span></aside>
              <div className="sv-laptop__feed" ref={feedRef} aria-label="Choose a service">
                {servicesCatalog.map((service, index) => (
                  <button
                    ref={element => { itemRefs.current[index] = element }}
                    type="button"
                    key={service.id}
                    className={index === active ? 'is-active' : ''}
                    aria-current={index === active ? 'true' : undefined}
                    onClick={() => select(index)}
                  >
                    <span className="sv-laptop__feed-icon">{service.icon}</span>
                    <span><b>{service.title}</b><small>{service.description}</small></span>
                    <em>{service.number}</em>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="sv-laptop__deck"><span /><i /></div>
        <div className="sv-laptop__shadow" aria-hidden="true" />
      </div>
    </div>
  )
}
