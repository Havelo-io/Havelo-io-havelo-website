import { useEffect, useRef, useState } from 'react'
import { ArrowIcon, CapIcon, CheckIcon, CodeIcon, PenIcon, PhoneIcon, SettingsIcon, SparkIcon } from '../components/Icons'
import Reveal from '../components/Reveal'
import SEO from '../components/SEO'
import ServicesPhone from '../components/ServicesPhone'
import { SITE } from '../config/site'

const services = [
  { icon: <CodeIcon />, number: '01', title: 'Website Development', text: 'Fast, accessible websites designed to convert and scale.', items: ['Business websites', 'Portfolio websites', 'Corporate websites', 'E-commerce websites'], service: 'website', image: '/assets/services/website.webp' },
  { icon: <PhoneIcon />, number: '02', title: 'Mobile App Development', text: 'Intuitive mobile experiences for customers and teams.', items: ['Android apps', 'iOS apps', 'Cross-platform apps'], service: 'mobile', image: '/assets/services/mobile.webp' },
  { icon: <PenIcon />, number: '03', title: 'UI/UX Design', text: 'Clear interfaces shaped around real user needs.', items: ['Wireframes', 'Prototypes'], service: 'design', image: '/assets/services/design.webp' },
  { icon: <SparkIcon />, number: '04', title: 'Custom Software Development', text: 'Purpose-built tools that fit the way your business works.', items: ['Business systems', 'Automation tools'], service: 'software', image: '/assets/services/software.webp' },
  { icon: <SettingsIcon />, number: '05', title: 'Maintenance and Support', text: 'Reliable care that keeps your digital products performing.', items: ['Updates', 'Monitoring', 'Technical support'], service: 'support', image: '/assets/services/support.webp' },
  { icon: <CapIcon />, number: '06', title: 'Academic Projects', text: 'Helping students with mini projects, semester projects, final-year projects, research prototypes, web and mobile app development, UI/UX design, and technical guidance.', items: ['Mini and semester projects', 'Final-year projects and research prototypes', 'Web and mobile app development', 'UI/UX design and technical guidance'], service: 'academic', image: '/assets/services/academic.webp' },
]

function serviceFromHash() {
  const match = window.location.hash.match(/^#svc-([1-6])$/)
  return match ? Number(match[1]) - 1 : 0
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(serviceFromHash)
  const [isInView, setIsInView] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const active = services[activeIndex]
  const isAutoPlaying = isInView && !isHovered && !isFocused && isPageVisible && !prefersReducedMotion

  useEffect(() => {
    const updateFromHash = () => {
      setActiveIndex(serviceFromHash())
    }
    window.addEventListener('hashchange', updateFromHash)
    return () => window.removeEventListener('hashchange', updateFromHash)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.35 })
    if (carouselRef.current) observer.observe(carouselRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateVisibility = () => setIsPageVisible(!document.hidden)
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches)
    document.addEventListener('visibilitychange', updateVisibility)
    motionPreference.addEventListener('change', updateMotionPreference)
    return () => {
      document.removeEventListener('visibilitychange', updateVisibility)
      motionPreference.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = window.setTimeout(() => {
      setActiveIndex(index => (index + 1) % services.length)
    }, 3000)
    return () => window.clearTimeout(timer)
  }, [activeIndex, isAutoPlaying])

  const show = (index: number) => setActiveIndex((index + services.length) % services.length)

  return (
    <div className="hv sv">
      <SEO title="Services, Havelo. Web, mobile, UI/UX and custom software" description="Website development, mobile apps, UI/UX design, custom software, support and academic projects from Havelo, a software studio in Colombo." path="/services" />

      {/* 2 and 3. Hero with the phone mock */}
      <section className="sv-hero">
        <div className="hv-wrap sv-hero__cols">
          <Reveal>
            <span className="hv-eyebrow">Our services</span>
            <h1>Digital solutions<br />designed to move<br /><span className="hv-grad">business forward.</span></h1>
            <p className="sv-lead">From customer facing experiences to internal platforms, we design and build technology that solves real problems.</p>
          </Reveal>
          <Reveal delay={120}><ServicesPhone /></Reveal>
        </div>
      </section>

      {/* 4. Services carousel */}
      <section className="sv-grid-section">
        <div
          className="hv-wrap sv-carousel"
          ref={carouselRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Havelo services"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={event => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocused(false)
          }}
        >
          <div className="sv-carousel__anchors" aria-hidden="true">
            {services.map((service, index) => <span id={`svc-${index + 1}`} key={service.service} />)}
          </div>
          <div
            className="sv-carousel__stage"
            tabIndex={0}
            aria-label="Service cards. Use left and right arrow keys to browse."
            onKeyDown={event => {
              if (event.target !== event.currentTarget) return
              if (event.key === 'ArrowLeft') { event.preventDefault(); show(activeIndex - 1) }
              if (event.key === 'ArrowRight') { event.preventDefault(); show(activeIndex + 1) }
            }}
            onTouchStart={event => { touchStartX.current = event.touches[0]?.clientX ?? null }}
            onTouchEnd={event => {
              if (touchStartX.current === null) return
              const distance = event.changedTouches[0].clientX - touchStartX.current
              if (Math.abs(distance) > 45) show(activeIndex + (distance < 0 ? 1 : -1))
              touchStartX.current = null
            }}
          >
            {services.map((service, index) => {
              const offset = (index - activeIndex + services.length) % services.length
              const position = offset === 0 ? 'center' : offset === 1 ? 'next' : offset === 2 ? 'far-next' : offset === services.length - 1 ? 'previous' : offset === services.length - 2 ? 'far-previous' : 'hidden'
              const isCenter = position === 'center'
              const isSide = position === 'previous' || position === 'next'
              return (
                <div className={`sv-carousel__slot sv-carousel__slot--${position}`} key={service.service}>
                  <div className={`sv-carousel__item sv-carousel__item--${position}`}>
                    <article className="sv-carousel__card" role={isCenter ? 'group' : undefined} aria-roledescription={isCenter ? 'slide' : undefined} aria-label={isCenter ? `${index + 1} of ${services.length}: ${service.title}` : undefined} aria-hidden={!isCenter}>
                      <img className="sv-carousel__image" src={service.image} alt="" loading={isCenter ? 'eager' : 'lazy'} />
                      <div className="sv-carousel__content">
                        <div className="sv-carousel__top"><span className="sv-carousel__icon">{service.icon}</span><span>{service.number} / 06</span></div>
                        <div className="sv-carousel__details">
                          <h2>{service.title}</h2>
                          <p>{service.text}</p>
                          <ul>{service.items.map(item => <li key={item}><CheckIcon />{item}</li>)}</ul>
                        </div>
                      </div>
                    </article>
                    <button type="button" className="sv-carousel__side-action" onClick={() => show(index)} aria-label={`Show ${service.title}`} tabIndex={isSide ? 0 : -1} aria-hidden={!isSide}>
                      <span>{service.title}</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="sv-carousel__controls">
            <button type="button" className="sv-carousel__arrow" onClick={() => show(activeIndex - 1)} aria-label="Previous service">←</button>
            <div className="sv-carousel__dots" aria-label="Choose a service">
              {services.map((service, index) => (
                <button type="button" key={service.service} className={index === activeIndex ? 'is-active' : ''} onClick={() => show(index)} aria-label={`Show ${service.title}`} aria-current={index === activeIndex ? 'true' : undefined} />
              ))}
            </div>
            <span className="sv-carousel__count" aria-live={isAutoPlaying ? 'off' : 'polite'}>{active.number} / 06 — {active.title}</span>
            <button type="button" className="sv-carousel__arrow" onClick={() => show(activeIndex + 1)} aria-label="Next service">→</button>
          </div>
        </div>
      </section>

      {/* 5. Built for you */}
      <section className="sv-band-section" id="contact">
        <div className="hv-wrap">
          <Reveal>
            <div className="sv-band">
              <span className="sv-band__ring sv-band__ring--a" aria-hidden="true" /><span className="sv-band__ring sv-band__ring--b" aria-hidden="true" />
              <div>
                <span className="hv-eyebrow">Built for you</span>
                <h2>Have something different in <span className="hv-grad">mind?</span></h2>
                <p>Tell us what you want to create. We will help shape the right approach.</p>
              </div>
              <a className="hv-btn hv-btn--primary" href={`mailto:${SITE.email}`}>Discuss your idea<ArrowIcon /></a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
