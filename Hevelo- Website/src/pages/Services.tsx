import { Link } from 'react-router-dom'
import { ArrowIcon, CapIcon, CheckIcon, CodeIcon, PenIcon, PhoneIcon, SettingsIcon, SparkIcon } from '../components/Icons'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SEO from '../components/SEO'

const services = [
  { icon: <CodeIcon />, number: '01', title: 'Website Development', text: 'Fast, accessible websites designed to convert and scale.', items: ['Business websites', 'Portfolio websites', 'Corporate websites', 'E-commerce websites'], service: 'website', cta: 'Discuss Your Website Project' },
  { icon: <PhoneIcon />, number: '02', title: 'Mobile App Development', text: 'Intuitive mobile experiences for customers and teams.', items: ['Android apps', 'iOS apps', 'Cross-platform apps'], service: 'mobile', cta: 'Discuss Your Mobile App' },
  { icon: <PenIcon />, number: '03', title: 'UI/UX Design', text: 'Clear interfaces shaped around real user needs.', items: ['Wireframes', 'Prototypes', 'User experience design'], service: 'design', cta: 'Discuss Your Design Project' },
  { icon: <SparkIcon />, number: '04', title: 'Custom Software Development', text: 'Purpose-built tools that fit the way your business works.', items: ['Business systems', 'Automation tools', 'Internal platforms'], service: 'software', cta: 'Discuss Your Software Project' },
  { icon: <SettingsIcon />, number: '05', title: 'Maintenance & Support', text: 'Reliable care that keeps your digital products performing.', items: ['Updates', 'Monitoring', 'Technical support'], service: 'support', cta: 'Discuss Your Support Needs' },
  { icon: <CapIcon />, number: '06', title: 'Academic Projects', text: 'Helping students with mini projects, semester projects, final-year projects, research prototypes, web and mobile app development, UI/UX design, and technical guidance.', items: ['Mini & semester projects', 'Final-year projects & research prototypes', 'Web & mobile app development', 'UI/UX design & technical guidance'], service: 'academic', cta: 'Discuss Your Academic Project' },
]

export default function Services() {
  return (
    <>
      <SEO title="Software Development Services | HAVELO" description="Explore HAVELO website development, mobile app development, UI/UX design, custom software, and ongoing technical support." path="/services" />
      <PageHero label="Our Services" title="Digital solutions designed to move business forward." text="From customer-facing experiences to internal platforms, we design and build technology that solves real problems." />
      <section className="section section--tight">
        <div className="container services-grid">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={(index % 2) * 90}>
              <article className={`service-card glass-card ${index === 0 ? 'service-card--featured' : ''}`}>
                <div className="service-top"><span className="icon-box">{service.icon}</span><span className="service-number">{service.number}</span></div>
                <h2>{service.title}</h2>
                <p>{service.text}</p>
                <ul>{service.items.map(item => <li key={item}><CheckIcon />{item}</li>)}</ul>
                <Link className="button button--secondary service-action" to={`/start-project?service=${service.service}`}>{service.cta}<ArrowIcon /></Link>
              </article>
            </Reveal>
          ))}
          <Reveal>
            <article className="service-contact">
              <div><span className="eyebrow"><span />Built for you</span><h2>Have something different in mind?</h2><p>Tell us what you want to create. We will help shape the right approach.</p></div>
              <Link className="button button--light" to="/contact">Discuss your idea<ArrowIcon /></Link>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  )
}
