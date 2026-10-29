import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon, CodeIcon, PenIcon, PhoneIcon, SettingsIcon, SparkIcon } from './Icons'
import websiteImage from '../assets/services-showcase/service-website.webp'
import mobileImage from '../assets/services-showcase/service-mobile.webp'
import softwareImage from '../assets/services-showcase/service-software.webp'
import designImage from '../assets/services-showcase/service-uiux.webp'
import cloudImage from '../assets/services-showcase/service-cloud.webp'

const services = [
  { title: 'Website Development', short: 'Modern, responsive, high-performing websites.', icon: CodeIcon, image: websiteImage, href: '/services#svc-1' },
  { title: 'Mobile App Development', short: 'Intuitive mobile experiences built for everyday use.', icon: PhoneIcon, image: mobileImage, href: '/services#svc-2' },
  { title: 'Custom Software Development', short: 'Tailored software built around your business needs.', icon: SparkIcon, image: softwareImage, href: '/services#svc-4' },
  { title: 'UI/UX Design', short: 'Thoughtful interfaces that make every interaction feel effortless.', icon: PenIcon, image: designImage, href: '/services#svc-3' },
  { title: 'Cloud & Automation', short: 'Connected systems and smarter workflows for growing businesses.', icon: SettingsIcon, image: cloudImage, href: '/services' },
] as const

export default function ServicesMonitorShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const journeyRef = useRef<HTMLDivElement>(null)
  const monitorRef = useRef<HTMLDivElement>(null)
  const selectionLocked = useRef(false)
  const selectionTimer = useRef<number | undefined>(undefined)
  const [active, setActive] = useState(0)
  const [monitorEntered, setMonitorEntered] = useState(false)

  useEffect(() => {
    services.forEach(service => {
      const image = new Image()
      image.src = service.image
      void image.decode?.().catch(() => undefined)
    })
  }, [])

  useEffect(() => {
    const monitor = monitorRef.current
    if (!monitor) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setMonitorEntered(true)
      observer.disconnect()
    }, { threshold: .22 })
    observer.observe(monitor)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const cards = Array.from(section.querySelectorAll<HTMLElement>('.services-showcase__card'))
    let frame = 0
    let visible = false
    const update = () => {
      frame = 0
      if (!visible || window.innerWidth > 800) return
      const focusLine = window.innerHeight * .72
      const candidate = cards
        .map((card, index) => ({ index, rect: card.getBoundingClientRect() }))
        .filter(({ rect }) => rect.bottom > window.innerHeight * .45 && rect.top < window.innerHeight)
        .sort((a, b) => Math.abs((a.rect.top + a.rect.bottom) / 2 - focusLine) - Math.abs((b.rect.top + b.rect.bottom) / 2 - focusLine))[0]
      if (candidate) setActive(current => current === candidate.index ? current : candidate.index)
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) request()
    }, { rootMargin: '15% 0px' })
    observer.observe(section)
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    let frame = 0
    let visible = false
    const update = () => {
      frame = 0
      const journey = journeyRef.current
      const section = sectionRef.current
      if (!journey || !section || window.innerWidth <= 800) return
      const rect = journey.getBoundingClientRect()
      const stickyTop = Math.min(96, innerHeight * .13)
      const travel = Math.max(rect.height - innerHeight * .78, 1)
      const progress = Math.max(0, Math.min(1, (stickyTop - rect.top) / travel))
      section.style.setProperty('--services-progress', progress.toFixed(4))
      if (selectionLocked.current) return
      const next = Math.min(services.length - 1, Math.floor(progress * services.length))
      setActive(current => current === next ? current : next)
    }
    const request = () => { if (visible && !frame) frame = requestAnimationFrame(update) }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) request() }, { rootMargin: '20% 0px' })
    if (sectionRef.current) observer.observe(sectionRef.current)
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      cancelAnimationFrame(frame)
      clearTimeout(selectionTimer.current)
    }
  }, [])

  const choose = (index: number) => {
    setActive(index)
    if (window.innerWidth <= 800) return
    const journey = journeyRef.current
    if (!journey) return
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = journey.getBoundingClientRect().top + scrollY
    const stickyTop = Math.min(96, innerHeight * .13)
    const travel = Math.max(journey.offsetHeight - innerHeight * .78, 1)
    const targetProgress = (index + .5) / services.length
    selectionLocked.current = true
    clearTimeout(selectionTimer.current)
    selectionTimer.current = window.setTimeout(() => { selectionLocked.current = false }, reducedMotion ? 80 : 850)
    scrollTo({ top: top + travel * targetProgress - stickyTop, behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  return (
    <section className="services-showcase" ref={sectionRef} aria-labelledby="services-showcase-title">
      <div className="services-showcase__ambient" aria-hidden="true">
        <i /><i /><i />
        <span className="services-showcase__dots" />
        <span className="services-showcase__code">&lt;/&gt;</span>
      </div>
      <div className="container services-showcase__header">
        <span className="eyebrow"><span />OUR SERVICES</span>
        <h2 id="services-showcase-title">Digital Solutions<br />Built for <em>What's Next.</em></h2>
        <p>From websites and mobile apps to custom software and scalable digital solutions, we create products designed to help businesses grow with confidence.</p>
      </div>

      <div className="container services-showcase__journey" ref={journeyRef}>
        <div className="services-showcase__sticky">
          <div ref={monitorRef} className={`services-monitor${monitorEntered ? ' is-entered' : ''}`} role="group" aria-label={`${services[active].title} preview`}>
            <div className="services-monitor__orbit" aria-hidden="true" />
            <div className="services-monitor__frame">
              <div className="services-monitor__camera" />
              <div className="services-monitor__screen" aria-live="polite">
                {services.map((service, index) => <img
                  className={`services-monitor__image${index === active ? ' is-active' : ''}`}
                  key={service.title}
                  src={service.image}
                  alt={`${service.title} digital solution preview`}
                  aria-hidden={index !== active}
                />)}
              </div>
              <div className="services-monitor__reflection" />
            </div>
            <div className="services-monitor__neck" /><div className="services-monitor__base"><i /></div>
            <div className="services-monitor__floor" aria-hidden="true" />
          </div>

          <div className="services-showcase__menu" aria-label="Choose a service preview">
            {services.map((service, index) => {
              const Icon = service.icon
              const selected = index === active
              return <article className={`services-showcase__card${selected ? ' is-active' : ''}`} key={service.title}>
                <button type="button" className="services-showcase__select" onClick={() => choose(index)} aria-pressed={selected}>
                  <span className="services-showcase__number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="services-showcase__icon"><Icon /></span>
                  <span className="services-showcase__label"><strong>{service.title}</strong><small>{service.short}</small></span>
                </button>
                <Link className="services-showcase__explore" to={service.href} aria-label={`Explore ${service.title}`}><ArrowIcon /></Link>
              </article>
            })}
          </div>
        </div>
      </div>

      <div className="container services-showcase__cta"><Link className="button" to="/services">View All Services<span><ArrowIcon /></span></Link></div>
    </section>
  )
}
