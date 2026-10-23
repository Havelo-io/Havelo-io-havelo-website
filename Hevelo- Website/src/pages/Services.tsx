import { Link } from 'react-router-dom'
import { ArrowIcon, CapIcon, CheckIcon, CodeIcon, PenIcon, PhoneIcon, SettingsIcon, SparkIcon } from '../components/Icons'
import Reveal from '../components/Reveal'
import SEO from '../components/SEO'
import ServicesPhone from '../components/ServicesPhone'
import { SITE } from '../config/site'

const services = [
  { icon: <CodeIcon />, number: '01', title: 'Website Development', text: 'Fast, accessible websites designed to convert and scale.', items: ['Business websites', 'Portfolio websites', 'Corporate websites', 'E-commerce websites'], service: 'website', cta: 'Discuss Your Website Project' },
  { icon: <PhoneIcon />, number: '02', title: 'Mobile App Development', text: 'Intuitive mobile experiences for customers and teams.', items: ['Android apps', 'iOS apps', 'Cross-platform apps'], service: 'mobile', cta: 'Discuss Your Mobile App' },
  { icon: <PenIcon />, number: '03', title: 'UI/UX Design', text: 'Clear interfaces shaped around real user needs.', items: ['Wireframes', 'Prototypes'], service: 'design', cta: 'Discuss Your Design Project' },
  { icon: <SparkIcon />, number: '04', title: 'Custom Software Development', text: 'Purpose-built tools that fit the way your business works.', items: ['Business systems', 'Automation tools'], service: 'software', cta: 'Discuss Your Software Project' },
  { icon: <SettingsIcon />, number: '05', title: 'Maintenance and Support', text: 'Reliable care that keeps your digital products performing.', items: ['Updates', 'Monitoring', 'Technical support'], service: 'support', cta: 'Discuss Your Support Needs' },
  { icon: <CapIcon />, number: '06', title: 'Academic Projects', text: 'Helping students with mini projects, semester projects, final-year projects, research prototypes, web and mobile app development, UI/UX design, and technical guidance.', items: ['Mini and semester projects', 'Final-year projects and research prototypes', 'Web and mobile app development', 'UI/UX design and technical guidance'], service: 'academic', cta: 'Discuss Your Academic Project' },
]

export default function Services() {
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

      {/* 4. Services grid */}
      <section className="sv-grid-section">
        <div className="hv-wrap sv-grid">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={(index % 2) * 90}>
              <article className="sv-card" id={`svc-${index + 1}`}>
                <div className="sv-card__top"><span className="sv-tile">{service.icon}</span><span className="sv-card__num">{service.number}</span></div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <ul>{service.items.map(item => <li key={item}><CheckIcon />{item}</li>)}</ul>
                <Link className="sv-card__cta" to={`/start-project?service=${service.service}`}>{service.cta}<ArrowIcon /></Link>
              </article>
            </Reveal>
          ))}
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
