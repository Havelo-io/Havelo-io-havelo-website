import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon, BulbIcon, HandshakeIcon, RocketIcon, SettingsIcon, ShieldCheckIcon, TargetIcon, UsersIcon } from '../components/Icons'
import HeroModule from '../components/HeroModule'
import Reveal from '../components/Reveal'
import SEO from '../components/SEO'
import TeamSection from '../components/TeamSection'

const commitments = [
  ['2', ' weeks', 'Each sprint ends with a demo'],
  ['Fixed', '', 'Scope and price agreed upfront'],
  ['1', ':1', 'You talk to the people building it'],
]

const pills = [
  [RocketIcon, 'Innovative solutions'],
  [UsersIcon, 'Client focused'],
  [ShieldCheckIcon, 'Reliable support'],
] as const

const reasons = [
  [BulbIcon, 'User focused solutions', 'Clean, simple and effective digital experiences, designed for the person on the other side of the screen.'],
  [SettingsIcon, 'Modern and reliable technology', 'Current tools and sensible architecture. Fast on day one, easy to maintain later.'],
  [TargetIcon, 'Tailored to your goals', 'No templates. Scoped around your users, your constraints and your growth plan.'],
  [HandshakeIcon, 'Ongoing support', 'Monitoring, iteration and a real person to message after launch.'],
] as const

const steps = [
  ['Discover', 'We pressure test the idea and agree on what success looks like.', '1 to 2 weeks'],
  ['Design', 'Flows, wireframes and a clickable prototype before any code.', '2 to 3 weeks'],
  ['Build', 'Two week sprints, with a live link and a demo at the end of each.', '4 to 10 weeks'],
  ['Launch and support', 'Release, monitor, then iterate on what the data says.', 'Ongoing'],
]

function Head({ eyebrow, title, aside }: { eyebrow: string; title: string; aside: string }) {
  return (
    <div className="ab-head">
      <div><span className="ab-eyebrow">{eyebrow}</span><h2>{title}</h2></div>
      <p>{aside}</p>
    </div>
  )
}

export default function About() {
  // Organization structured data for search engines.
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Havelo',
      url: window.location.origin,
      email: 'havelo.lk@gmail.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Colombo', addressCountry: 'LK' },
    })
    document.head.appendChild(script)
    return () => { script.remove() }
  }, [])

  return (
    <div className="ab">
      <SEO title="About Havelo, software studio in Colombo" description="Havelo is a newly founded software studio in Colombo. Websites, mobile apps and custom software, built by a small team you talk to directly." path="/about" />

      {/* 2. Hero */}
      <section className="ab-hero">
        <div className="ab-hero__glow" aria-hidden="true" />
        <div className="ab-hero__grid" aria-hidden="true" />
        <div className="ab-wrap ab-hero__cols">
          <Reveal>
            <span className="ab-eyebrow">About Havelo</span>
            <h1>Where ideas are<br />brought <span className="ab-grad">to life</span>.</h1>
            <p className="ab-lead">A software studio in Colombo. We design and build websites, mobile apps and custom software for founders and teams.</p>
            <div className="ab-actions">
              <a className="ab-btn ab-btn--primary" href="#contact">Start a project <ArrowIcon /></a>
              <Link className="ab-btn ab-btn--ghost" to="/services">See our work</Link>
            </div>
            <p className="ab-status"><span className="ab-status__dot" aria-hidden="true" />Newly founded. Taking on our first client projects.</p>
          </Reveal>
          <Reveal delay={120}><HeroModule /></Reveal>
        </div>

        {/* 3. Commitment strip */}
        <div className="ab-wrap">
          <Reveal delay={80}>
            <div className="ab-strip">
              {commitments.map(([num, suffix, text]) => (
                <div className="ab-strip__cell" key={num}>
                  <strong>{num}<em>{suffix}</em></strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Our story */}
      <section className="ab-section">
        <div className="ab-wrap ab-story">
          <Reveal>
            <span className="ab-eyebrow">Our story</span>
            <h2>Small team.<br />Senior thinking.</h2>
            <a className="ab-location" href="https://www.google.com/maps/search/?api=1&query=Colombo%2C%20Sri%20Lanka" target="_blank" rel="noopener noreferrer" aria-label="Colombo, Sri Lanka. Open in Google Maps">
              <iframe className="ab-location__map" src="https://maps.google.com/maps?q=Colombo%2C%20Sri%20Lanka&z=12&output=embed" title="Map of Colombo, Sri Lanka" loading="lazy" tabIndex={-1} aria-hidden="true" referrerPolicy="no-referrer-when-downgrade" />
              <span className="ab-location__open">Open map <ArrowIcon /></span>
              <span className="ab-location__info">
                <strong>Colombo, Sri Lanka</strong>
                <span>Open to clients anywhere. GMT+5:30</span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={100}>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br><br>
            </br>
            <p>Havelo started with a frustration: good ideas kept dying between the whiteboard and the release. So we built a studio where the people who plan the work are the people who design, code and ship it.</p>
            <p>We are new, and we say so upfront. What early clients get is what a large studio cannot offer: senior attention from day one, and a short client list.</p>
            <ul className="ab-pills">
              {pills.map(([Icon, label]) => <li key={label}><Icon />{label}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 5. Why choose Havelo */}
      <section className="ab-section ab-section--tight-top">
        <div className="ab-wrap">
          <Reveal><Head eyebrow="Why choose Havelo" title="Four commitments we build on" aside="The standards we hold ourselves to on every project." /></Reveal>
          <div className="ab-reasons">
            {reasons.map(([Icon, title, text], index) => (
              <Reveal key={title} delay={index * 70}>
                <article className="ab-card">
                  <span className="ab-card__index">0{index + 1}</span>
                  <span className="ab-tile"><Icon /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. How we work */}
      <section className="ab-section ab-process">
        <div className="ab-wrap">
          <Reveal><Head eyebrow="How we work" title="A process you can plan around" aside="Fixed milestones and weekly demos. You always know what ships next." /></Reveal>
          <ol className="ab-steps">
            {steps.map(([title, text, time], index) => (
              <li key={title}>
                <Reveal delay={index * 80}>
                  <span className="ab-step__num">{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <small>{time}</small>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. A note from us */}
      <section className="ab-section">
        <div className="ab-wrap">
          <Reveal>
            <div className="ab-note">
              <span className="ab-note__quote" aria-hidden="true">&rdquo;</span>
              <span className="ab-eyebrow">A note from us</span>
              <blockquote>We won't hand you a wall of client logos. We're a new studio, so judge us on how we think and what the first project looks like in production.</blockquote>
              <div className="ab-note__by">
                <span className="ab-note__avatar" aria-hidden="true">H</span>
                <div><strong>Havelo founding team</strong><span>Colombo, Sri Lanka</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. The team */}
      <section className="ab-section ab-section--tight-top">
        <div className="ab-wrap">
          <Reveal><Head eyebrow="The team" title="Who you will be working with" aside="A growing team, driven by big ideas." /></Reveal>
          <TeamSection />
        </div>
      </section>

      {/* 9. CTA band */}
      <section className="ab-section ab-section--cta" id="contact">
        <div className="ab-wrap">
          <Reveal>
            <div className="ab-cta">
              <span className="ab-eyebrow">Let's build</span>
              <h2>Tell us what you're trying to ship</h2>
              <p>Send a short brief. You will get an honest reply within two working days.</p>
              <div className="ab-actions ab-actions--center">
                <a className="ab-btn ab-btn--primary" href="mailto:havelo.lk@gmail.com">havelo.lk@gmail.com</a>
                <Link className="ab-btn ab-btn--ghost" to="/contact">Book a call</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
