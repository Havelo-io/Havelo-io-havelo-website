import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon, BulbIcon, CheckIcon, CodeIcon, HandshakeIcon, PhoneIcon, RocketIcon, ShieldCheckIcon, TargetIcon, UsersIcon, WhatsAppIcon } from '../components/Icons'
import Reveal from '../components/Reveal'
import SEO from '../components/SEO'
import ServicesLaptop from '../components/ServicesLaptop'
import { publishedTechnologies } from '../components/technologyData'
import { servicesCatalog } from '../data/servicesCatalog'
import { SITE } from '../config/site'

const businessStages = [
  { kind: 'launch', label: 'Launch pathway', number: '01', title: 'Start & Launch', text: 'For startups and new businesses looking to establish a confident digital presence.', keywords: ['Strategy', 'Brand presence', 'First product'] },
  { kind: 'growth', label: 'Growth pathway', number: '02', title: 'Grow & Scale', text: 'For growing teams that need better platforms, automation, and customer experiences.', keywords: ['Platforms', 'Automation', 'Integrations'] },
  { kind: 'protect', label: 'Optimization pathway', number: '03', title: 'Optimize & Protect', text: 'For established businesses improving efficiency, reliability, and security.', keywords: ['Performance', 'Support', 'Security'] },
] as const

const process = [
  { icon: <BulbIcon />, number: '01', title: 'Discover', text: 'Understand the business, audience, challenges, and project goals.' },
  { icon: <PenToolIcon />, number: '02', title: 'Design', text: 'Plan the experience, interface, and technical approach.' },
  { icon: <CodeIcon />, number: '03', title: 'Develop', text: 'Build, test, refine, and prepare the solution for launch.' },
  { icon: <RocketIcon />, number: '04', title: 'Launch & Support', text: 'Deploy the product and continue improving it as the business grows.' },
] as const

const values = [
  { icon: <TargetIcon />, number: '01', title: 'Thoughtful by Design', text: 'We consider the people, business needs, and long-term value behind every decision.' },
  { icon: <HandshakeIcon />, number: '02', title: 'Clear Collaboration', text: 'Transparent communication and a practical, collaborative working process.' },
  { icon: <LayersIcon />, number: '03', title: 'Built to Last', text: 'Maintainable and scalable solutions designed for reliability, usability, and future improvements.' },
  { icon: <UsersIcon />, number: '04', title: 'Support Beyond Launch', text: 'A dependable technical partner as your product and business evolve.' },
  { icon: <ShieldCheckIcon />, number: '05', title: 'Quality & Reliability', text: 'Thorough testing, security, and best practices for stable, high-performing solutions.' },
  { icon: <MetricsIcon />, number: '06', title: 'Real Business Impact', text: 'Solutions designed to improve efficiency, support growth, and deliver meaningful business results.' },
] as const

const heroBenefits = [
  { icon: <RocketIcon />, title: 'Business Growth', text: 'Solutions that create real impact.' },
  { icon: <UsersIcon />, title: 'Expert Team', text: 'Experienced and dedicated.' },
  { icon: <ShieldCheckIcon />, title: 'Secure & Reliable', text: 'Built with best practices.' },
  { icon: <MetricsIcon />, title: 'Measurable Results', text: 'Performance you can track.' },
] as const

const marqueeTechnologyIds = [
  'react', 'nextjs', 'typescript', 'javascript', 'html', 'css', 'vite', 'nodejs', 'php', 'laravel',
  'python', 'java', 'flutter', 'reactnative', 'swift', 'kotlin', 'postgresql', 'mongodb', 'sqlserver',
  'aws', 'docker', 'azure', 'googlecloud', 'git', 'github',
] as const

const technologyLogos = import.meta.glob('../assets/technology/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const technologies = marqueeTechnologyIds.flatMap(id => {
  const technology = publishedTechnologies.find(item => item.id === id)
  if (!technology) return []
  const logo = technologyLogos[`../assets/technology/${technology.logo}.svg`]
  return logo ? [{ ...technology, logoUrl: logo }] : []
})

const technologyTracks = [technologies.filter((_, index) => index % 2 === 0), technologies.filter((_, index) => index % 2 === 1)]

function useProcessSequence<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const activate = () => element.classList.add('is-sequenced')
    if (reducedMotion.matches) activate()
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        activate()
        observer.disconnect()
      }
    }, { threshold: .2, rootMargin: '0px 0px -8% 0px' })
    observer.observe(element)
    const handleMotionChange = () => {
      if (reducedMotion.matches) activate()
    }
    reducedMotion.addEventListener('change', handleMotionChange)
    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', handleMotionChange)
    }
  }, [])

  return ref
}

function useValuesTimeline<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      const rows = [...element.querySelectorAll<HTMLElement>('[data-value-step]')]
      if (!rows.length) return
      if (reducedMotion.matches) {
        element.style.setProperty('--sv-values-progress', '1')
        rows.forEach(row => row.classList.add('is-active', 'is-revealed'))
        return
      }
      const activationY = window.innerHeight * .62
      const centers = rows.map(row => {
        const rect = row.getBoundingClientRect()
        return rect.top + rect.height / 2
      })
      const distance = Math.max(1, centers.at(-1)! - centers[0])
      const progress = Math.min(1, Math.max(0, (activationY - centers[0]) / distance))
      element.style.setProperty('--sv-values-progress', progress.toFixed(4))
      rows.forEach((row, index) => {
        const active = activationY >= centers[index]
        row.classList.toggle('is-active', active)
        if (active) row.classList.add('is-revealed')
      })
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    reducedMotion.addEventListener('change', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      reducedMotion.removeEventListener('change', requestUpdate)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}

function StageArtwork({ kind }: { kind: typeof businessStages[number]['kind'] }) {
  if (kind === 'launch') {
    return <svg viewBox="0 0 260 150" fill="none" aria-hidden="true"><path className="sv-stage-art__muted" d="M22 125C63 88 98 120 125 86s57-40 112-54" /><path className="sv-stage-art__path" d="M31 119c39-29 68-6 94-35s57-38 103-49" /><circle cx="31" cy="119" r="6" /><circle cx="229" cy="34" r="5" /><path className="sv-stage-art__solid" d="m144 66 41-30c6-4 13-6 20-7-1 7-3 14-7 20l-30 41-24-24Z" /><path d="m152 76-19 6-12 19 25-3m12-12 6 19 19 12 3-25" /><circle cx="178" cy="55" r="8" /><path className="sv-stage-art__accent" d="M139 90c-10 3-18 11-21 21 10-2 19-10 22-20" /></svg>
  }
  if (kind === 'growth') {
    return <svg viewBox="0 0 260 150" fill="none" aria-hidden="true"><path className="sv-stage-art__muted" d="M24 122h214M44 121V99m41 22V78m42 43V91m42 30V58m42 63V32" /><path className="sv-stage-art__path" d="m42 101 42-25 43 14 42-35 43-24" /><path className="sv-stage-art__accent" d="m193 30 21-2-5 20" /><circle cx="42" cy="101" r="8" /><circle cx="85" cy="76" r="8" /><circle cx="127" cy="90" r="8" /><circle cx="169" cy="55" r="8" /><circle cx="212" cy="30" r="8" /><path className="sv-stage-art__solid" d="M67 122v-14h35v14m50 0V92h35v30" /></svg>
  }
  return <svg viewBox="0 0 260 150" fill="none" aria-hidden="true"><path className="sv-stage-art__muted" d="M27 75c34-48 72-58 104-44 41-21 82 3 104 45-19 43-59 61-104 45-43 18-82-5-104-46Z" /><circle cx="44" cy="76" r="6" /><circle cx="216" cy="76" r="6" /><path className="sv-stage-art__path" d="M44 76h38m96 0h38M76 46l27 18m54 24 28 18M77 107l28-20m52-22 28-19" /><path className="sv-stage-art__solid" d="M130 28c17 13 34 17 47 18v31c0 25-18 42-47 51-29-9-47-26-47-51V46c13-1 30-5 47-18Z" /><path className="sv-stage-art__accent" d="m109 77 14 14 29-31" /><circle cx="84" cy="76" r="7" /><circle cx="176" cy="76" r="7" /></svg>
}

function ProcessRing({ icon }: { icon: ReactNode }) {
  return <span className="sv-process__ring" aria-hidden="true"><svg viewBox="0 0 100 100"><circle className="sv-process__ring-track" cx="50" cy="50" r="43" /><circle className="sv-process__ring-progress" cx="50" cy="50" r="43" /></svg><i>{icon}</i></span>
}

function PenToolIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 19 7-7 3 3-7 7-3-3Z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z" /><path d="m2 2 7.6 7.6" /><circle cx="11" cy="11" r="2" /></svg>
}

function LayersIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></svg>
}

function MetricsIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20V10h4v10H4Zm6 0V4h4v16h-4Zm6 0v-7h4v7h-4Z" /></svg>
}

function TechnologyTrack({ items, reverse = false }: { items: typeof technologies; reverse?: boolean }) {
  const renderSet = (duplicate: boolean) => (
    <div className="sv-tech__set" aria-hidden={duplicate || undefined}>
      {items.map(technology => (
        <div className="sv-tech__tile" key={`${duplicate ? 'duplicate-' : ''}${technology.id}`} role={duplicate ? undefined : 'listitem'}>
          <img src={technology.logoUrl} alt="" width="36" height="36" loading="lazy" decoding="async" />
          <span>{technology.name}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className={`sv-tech__marquee${reverse ? ' is-reverse' : ''}`} tabIndex={0} aria-label="Published HAVELO technologies">
      <div className="sv-tech__track">{renderSet(false)}{renderSet(true)}</div>
    </div>
  )
}

export default function Services() {
  const processRef = useProcessSequence<HTMLDivElement>()
  const valuesRef = useValuesTimeline<HTMLDivElement>()

  return (
    <div className="hv sv">
      <SEO title="Services, Havelo. Digital products, platforms and support" description="Website development, mobile apps, UI/UX design, custom software, digital marketing, commerce, security and support from Havelo." path="/services" />

      <section className="sv-hero">
        <span className="sv-decor sv-decor--dots" aria-hidden="true" />
        <span className="sv-decor sv-decor--orb" aria-hidden="true" />
        <div className="hv-wrap sv-hero__inner">
          <div className="sv-hero__cols">
            <Reveal className="sv-hero__copy">
              <span className="hv-eyebrow">Our services</span>
              <h1><span>Digital solutions</span><span>designed to move</span><span className="hv-grad">business forward.</span></h1>
              <p className="sv-lead">From customer-facing experiences to internal platforms, we design and build technology that solves real problems.</p>
              <a className="sv-hero__cta" href="#services-heading">Explore Our Services <ArrowIcon /></a>
            </Reveal>
            <Reveal className="sv-hero__visual" delay={120}>
              <span className="sv-hero__halo" aria-hidden="true" />
              <div className="sv-hero__float sv-hero__float--code" aria-hidden="true"><CodeIcon /></div>
              <div className="sv-hero__float sv-hero__float--phone" aria-hidden="true"><PhoneIcon /></div>
              <div className="sv-hero__float sv-hero__float--layers" aria-hidden="true"><LayersIcon /></div>
              <div className="sv-hero__float sv-hero__float--rocket" aria-hidden="true"><RocketIcon /></div>
              <ServicesLaptop />
            </Reveal>
          </div>
          <Reveal className="sv-hero__benefits" delay={210}>
            {heroBenefits.map(benefit => <article key={benefit.title}><span>{benefit.icon}</span><div><strong>{benefit.title}</strong><small>{benefit.text}</small></div></article>)}
          </Reveal>
        </div>
      </section>

      <section className="sv-services" aria-labelledby="services-heading">
        <div className="hv-wrap">
          <Reveal className="sv-section-head">
            <div><span className="hv-eyebrow">What we offer</span><h2 id="services-heading">Our Core <span>Services</span></h2></div>
            <p>A complete range of digital services to turn your ideas into real, impactful solutions.</p>
          </Reveal>
          <div className="sv-service-grid">
            {servicesCatalog.map((service, index) => (
              <Reveal key={service.id} delay={(index % 3) * 70}>
                <article className="sv-service-card" id={service.id}>
                  <div className="sv-service-card__media">
                    <img src={service.image} alt={service.imageAlt} width="800" height="520" loading="lazy" decoding="async" />
                    <span className="sv-service-card__number">{service.number}</span>
                  </div>
                  <div className="sv-service-card__body">
                    <span className="sv-service-card__icon">{service.icon}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul>{service.highlights.map(item => <li key={item}><CheckIcon />{item}</li>)}</ul>
                    <details className="sv-service-card__more">
                      <summary>Learn More <ArrowIcon /></summary>
                      <p>{service.detail}</p>
                      <Link to="/contact">Discuss this service <ArrowIcon /></Link>
                    </details>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sv-stages" aria-labelledby="stages-heading">
        <div className="hv-wrap">
          <Reveal className="sv-centered-head"><span className="hv-eyebrow">Built for where you are</span><h2 id="stages-heading">Technology That Works for <span>Your Business</span></h2><p>Whether you're starting something new or improving what you already have, we build solutions around your goals.</p></Reveal>
          <div className="sv-stage-grid">
            {businessStages.map((stage, index) => (
              <Reveal key={stage.title} delay={index * 80}>
                <article className="sv-stage-card">
                  <header><span>{stage.label}</span><small>{stage.number}</small></header>
                  <div className="sv-stage-card__visual"><StageArtwork kind={stage.kind} /></div>
                  <h3>{stage.title}</h3><p>{stage.text}</p>
                  <ul>{stage.keywords.map(keyword => <li key={keyword}>{keyword}</li>)}</ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sv-process" aria-labelledby="process-heading">
        <div className="hv-wrap">
          <Reveal className="sv-process__head"><span className="hv-eyebrow">Our process</span><h2 id="process-heading">How We Bring <span>Ideas to Life</span></h2><p>A clear path from the first conversation to a dependable launch.</p></Reveal>
          <div className="sv-process__journey" ref={processRef}>
            <span className="sv-process__connector" aria-hidden="true" />
            <span className="sv-process__connector-node sv-process__connector-node--one" aria-hidden="true" />
            <span className="sv-process__connector-node sv-process__connector-node--two" aria-hidden="true" />
            <span className="sv-process__connector-node sv-process__connector-node--three" aria-hidden="true" />
            <span className="sv-process__traveler" aria-hidden="true" />
            <ol className="sv-process__line">
              {process.map(step => (
                <li key={step.title}>
                  <ProcessRing icon={step.icon} />
                  <div className="sv-progress-step"><small>{step.number}</small><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="sv-values" aria-labelledby="values-heading">
        <div className="hv-wrap sv-values__panel">
          <div className="sv-values__layout" ref={valuesRef}>
            <Reveal className="sv-values__intro"><span className="hv-eyebrow">Why Havelo</span><h2 id="values-heading">A partner for the <span>work that matters.</span></h2><p>Thoughtful decisions, dependable delivery, and a team that stays focused on the business outcome.</p><i aria-hidden="true" /><p className="sv-values__closing">We bring clarity to complex work and stay accountable from the first decision through every improvement after launch.</p></Reveal>
            <ol className="sv-values__list" aria-label="Why choose Havelo">
              {values.map(value => <li key={value.title} data-value-step><span className="sv-values__icon" aria-hidden="true">{value.icon}</span><span className="sv-values__number">{value.number}</span><div><h3>{value.title}</h3><p>{value.text}</p></div></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="sv-tech" aria-labelledby="tech-heading">
        <div className="hv-wrap">
          <Reveal className="sv-tech__head"><div><span className="hv-eyebrow">Technologies we work with</span><h2 id="tech-heading">Modern tools. <span>Practical choices.</span></h2></div></Reveal>
        </div>
        <div className="sv-tech__tracks">
          <TechnologyTrack items={technologyTracks[0]} />
          <TechnologyTrack items={technologyTracks[1]} reverse />
        </div>
      </section>

      <section className="sv-final-cta">
        <div className="hv-wrap">
          <Reveal>
            <div className="sv-final-cta__panel">
              <span className="sv-final-cta__shape" aria-hidden="true" />
              <div><span className="hv-eyebrow">Your next move</span><h2>Your Next Big Idea <span>Starts Here.</span></h2><p>Tell us what you're planning, and let's explore how the right technology can bring it to life.</p></div>
              <div className="sv-final-cta__actions"><Link className="hv-btn hv-btn--primary" to="/contact">Start a Project <ArrowIcon /></Link><a className="hv-btn hv-btn--ghost" href={SITE.whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon />Chat on WhatsApp</a></div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
