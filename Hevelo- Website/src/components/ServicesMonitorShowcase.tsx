import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon, CodeIcon, PenIcon, PhoneIcon, SettingsIcon, SparkIcon } from './Icons'

const services = [
  { title: 'Website Development', short: 'Modern, responsive, high-performing websites.', icon: CodeIcon },
  { title: 'Mobile App Development', short: 'Intuitive mobile experiences built for everyday use.', icon: PhoneIcon },
  { title: 'Custom Software Development', short: 'Tailored software built around your business needs.', icon: SparkIcon },
  { title: 'UI/UX Design', short: 'Thoughtful interfaces that make every interaction feel effortless.', icon: PenIcon },
  { title: 'Cloud & Automation', short: 'Connected systems and smarter workflows for growing businesses.', icon: SettingsIcon },
] as const

function LoadingPreview() {
  return <div className="monitor-intro"><div className="monitor-intro__aura" /><img src="/assets/havelo-mark.png" alt="" /><strong>HAVELO</strong><small>WHERE IDEAS ARE BROUGHT TO LIFE</small><div className="monitor-intro__bar"><i /></div><span>LOADING INNOVATION...</span></div>
}

function WebsitePreview() {
  return <div className="service-preview service-preview--website"><div className="mock-browser"><div className="mock-browser__bar"><i /><i /><i /><span>havelo.digital</span></div><div className="web-layout"><aside><b>H</b><i /><i /><i /><i /></aside><main><nav>HAVELO <span>Work&nbsp;&nbsp; Services&nbsp;&nbsp; Contact</span></nav><section><div><small>DIGITAL STUDIO</small><h4>Ideas into<br /><em>impact.</em></h4><p /><span className="mock-action">Start a project</span></div><div className="web-orb"><i /></div></section><footer><i /><i /><i /></footer></main></div></div><div className="mock-phone"><b>H</b><i /><i /><i /></div></div>
}

function MobilePreview() {
  return <div className="service-preview service-preview--mobile"><div className="mobile-aura" /><div className="app-phone app-phone--left"><span /><header>Overview <b>•••</b></header><div className="app-balance"><small>BALANCE</small><strong>$24,860</strong></div><div className="app-chart"><i /><i /><i /><i /><i /></div></div><div className="app-phone app-phone--center"><span /><div className="app-brand"><img src="/assets/havelo-mark.png" alt="" /><b>HAVELO</b><small>SMARTER BUSINESS</small></div><span className="mock-action">Continue</span></div><div className="app-phone app-phone--right"><span /><header>Activity <b>+</b></header><div className="app-ring"><i>74%</i></div><ul><li /><li /><li /></ul></div></div>
}

function SoftwarePreview() {
  return <div className="service-preview service-preview--software"><div className="dash-shell"><aside><b>H</b><i className="active" /><i /><i /><i /><i /></aside><main><header><div><small>BUSINESS OS</small><strong>Performance overview</strong></div><span>OCT 2026</span></header><div className="dash-stats"><article><small>REVENUE</small><b>$128.4K</b><em>+18.2%</em></article><article><small>ACTIVE USERS</small><b>8,429</b><em>+12.8%</em></article><article><small>EFFICIENCY</small><b>94.6%</b><em>+7.1%</em></article></div><div className="dash-grid"><article className="dash-chart"><b>Growth</b><div><i /><i /><i /><i /><i /><i /><i /></div></article><article className="dash-donut"><b>Projects</b><i><span>82%</span></i></article><article className="dash-table"><b>Recent workflow</b><p /><p /><p /></article></div></main></div></div>
}

function DesignPreview() {
  return <div className="service-preview service-preview--design"><div className="design-shell"><header><b>Prototype / Mobile banking</b><span>◐ &nbsp; Share</span></header><aside><strong>Layers</strong><i /><i /><i /><i /><small>COMPONENTS</small><i /><i /></aside><main><div className="design-phone design-phone--one"><span /><h5>Welcome back</h5><b>$12,450</b><p /><p /><div><i /><i /><i /></div></div><div className="design-phone design-phone--two"><span /><small>TRANSFER</small><h5>Send money</h5><div className="design-avatar-row"><i /><i /><i /><i /></div><p /><span className="mock-action">Continue</span></div></main><section><strong>Design</strong><small>FILL</small><i /><small>TYPE</small><p /><p /><small>COLORS</small><div><b /><b /><b /><b /></div></section></div></div>
}

function CloudPreview() {
  return <div className="service-preview service-preview--cloud"><div className="cloud-shell"><header><div><small>AUTOMATION CLOUD</small><strong>Connected workflows</strong></div><span>● ALL SYSTEMS OPERATIONAL</span></header><div className="cloud-flow"><svg viewBox="0 0 760 300" aria-hidden="true"><path d="M130 150C210 150 210 65 300 65M130 150c80 0 80 85 170 85M460 65c75 0 72 85 155 85M460 235c75 0 72-85 155-85" /><path className="pulse" d="M130 150C210 150 210 65 300 65" /></svg><div className="cloud-node cloud-node--start"><SettingsIcon /><b>Trigger</b><small>New customer</small></div><div className="cloud-node cloud-node--top"><i>API</i><b>CRM sync</b><small>Connected</small></div><div className="cloud-node cloud-node--bottom"><i>AI</i><b>Smart routing</b><small>Automated</small></div><div className="cloud-node cloud-node--end"><i>✓</i><b>Complete</b><small>1.2s average</small></div></div><footer><span><b>48.2K</b> tasks automated</span><span><b>99.98%</b> success rate</span><span><b>312h</b> saved this month</span></footer></div></div>
}

const previews = [WebsitePreview, MobilePreview, SoftwarePreview, DesignPreview, CloudPreview]

export default function ServicesMonitorShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const journeyRef = useRef<HTMLDivElement>(null)
  const monitorRef = useRef<HTMLDivElement>(null)
  const serviceRefs = useRef<(HTMLButtonElement | null)[]>([])
  const selectionLocked = useRef(false)
  const selectionTimer = useRef<number | undefined>(undefined)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    let frame = 0
    let visible = false
    const update = () => {
      frame = 0
      const journey = journeyRef.current
      const section = sectionRef.current
      if (!journey || !section) return
      if (window.innerWidth <= 800) {
        const buttons = serviceRefs.current.filter((button): button is HTMLButtonElement => Boolean(button))
        const monitor = monitorRef.current
        if (!buttons.length || !monitor) return
        const anchor = Math.min(innerHeight * .78, monitor.getBoundingClientRect().bottom + 22)
        const firstTop = buttons[0].getBoundingClientRect().top + scrollY
        const lastTop = buttons[buttons.length - 1].getBoundingClientRect().top + scrollY
        const progress = Math.max(0, Math.min(1, (scrollY + anchor - firstTop) / Math.max(lastTop - firstTop, 1)))
        section.style.setProperty('--services-progress', progress.toFixed(4))
        if (selectionLocked.current) return
        let next = -1
        buttons.forEach((button, index) => { if (button.getBoundingClientRect().top <= anchor) next = index })
        setActive(current => current === next ? current : next)
        return
      }
      const rect = journey.getBoundingClientRect()
      const top = Math.min(118, innerHeight * .15)
      const travel = Math.max(rect.height - innerHeight * .76, 1)
      const progress = Math.max(0, Math.min(1, (top - rect.top) / travel))
      section.style.setProperty('--services-progress', progress.toFixed(4))
      if (selectionLocked.current) return
      const next = progress < .075 ? -1 : Math.min(4, Math.floor((progress - .075) / .185))
      setActive(current => current === next ? current : next)
    }
    const request = () => { if (visible && !frame) frame = requestAnimationFrame(update) }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) request() }, { rootMargin: '20% 0px' })
    if (sectionRef.current) observer.observe(sectionRef.current)
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => { observer.disconnect(); window.removeEventListener('scroll', request); window.removeEventListener('resize', request); cancelAnimationFrame(frame); clearTimeout(selectionTimer.current) }
  }, [])

  const choose = (index: number) => {
    setActive(index)
    const journey = journeyRef.current
    if (!journey) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (window.innerWidth <= 800) {
      const button = serviceRefs.current[index]
      const monitor = monitorRef.current
      if (!button || !monitor) return
      const anchor = Math.min(innerHeight * .78, monitor.getBoundingClientRect().bottom + 22)
      selectionLocked.current = true
      clearTimeout(selectionTimer.current)
      selectionTimer.current = window.setTimeout(() => { selectionLocked.current = false }, reduced ? 80 : 700)
      scrollTo({ top: button.getBoundingClientRect().top + scrollY - anchor, behavior: reduced ? 'instant' : 'smooth' })
      return
    }
    const top = journey.getBoundingClientRect().top + scrollY
    const stickyTop = Math.min(118, innerHeight * .15)
    const travel = Math.max(journey.offsetHeight - innerHeight * .76, 1)
    const targetProgress = .075 + (index + .5) * .185
    selectionLocked.current = true
    clearTimeout(selectionTimer.current)
    selectionTimer.current = window.setTimeout(() => { selectionLocked.current = false }, reduced ? 80 : 900)
    scrollTo({ top: top + travel * targetProgress - stickyTop, behavior: reduced ? 'instant' : 'smooth' })
  }

  const ActivePreview = active < 0 ? LoadingPreview : previews[active]
  const screenLabel = active < 0 ? 'HAVELO loading screen preview' : `${services[active].title} concept preview`

  return (
    <section className="services-showcase" ref={sectionRef} aria-labelledby="services-showcase-title">
      <div className="services-showcase__ambient" aria-hidden="true" />
      <div className="container services-showcase__header">
        <span className="eyebrow"><span />OUR SERVICES</span>
        <h2 id="services-showcase-title">Digital Solutions<br /><em>Built</em> for What's Next.</h2>
        <p>From websites and mobile apps to custom software and scalable digital solutions, we create products designed to help businesses grow with confidence.</p>
        <small>One team. End-to-end capabilities. Real business impact.</small>
      </div>
      <div className="container services-showcase__journey" ref={journeyRef}>
        <div className="services-showcase__sticky">
          <div className="services-monitor" ref={monitorRef} aria-label={screenLabel} role="img">
            <div className="services-monitor__frame"><div className="services-monitor__camera" /><div className="services-monitor__screen" aria-live="polite"><div className="services-monitor__preview" key={active}><ActivePreview /></div><span className="services-monitor__sr">{screenLabel}</span></div><div className="services-monitor__reflection" /></div>
            <div className="services-monitor__neck" /><div className="services-monitor__base"><i /></div>
          </div>
          <div className="services-showcase__menu">
            <div className="services-showcase__line" aria-hidden="true"><i /></div>
            {services.map((service, index) => {
              const Icon = service.icon
              return <button type="button" key={service.title} ref={element => { serviceRefs.current[index] = element }} className={index === active ? 'is-active' : ''} onClick={() => choose(index)} aria-pressed={index === active}>
                <span className="services-showcase__number">{String(index + 1).padStart(2, '0')}</span><span className="services-showcase__icon"><Icon /></span><span className="services-showcase__label"><strong>{service.title}</strong><small>{service.short}</small></span><ArrowIcon className="services-showcase__arrow" />
              </button>
            })}
          </div>
        </div>
      </div>
      <div className="container services-showcase__cta"><Link className="button" to="/services">View All Services<ArrowIcon /></Link></div>
    </section>
  )
}
