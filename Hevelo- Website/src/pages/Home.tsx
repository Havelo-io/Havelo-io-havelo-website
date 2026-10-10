import { Link } from 'react-router-dom'
import { ArrowIcon, CodeIcon, PhoneIcon, SparkIcon } from '../components/Icons'
import ProcessTimeline from '../components/ProcessTimeline'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import SEO from '../components/SEO'

const features = [
  { icon: <CodeIcon />, title: 'Web Development', text: 'Modern, scalable, responsive websites.' },
  { icon: <PhoneIcon />, title: 'Mobile App Development', text: 'Native and cross-platform mobile applications.' },
  { icon: <SparkIcon />, title: 'Custom Solutions', text: 'Tailored software designed around business needs.' },
]

const process = [
  ['01', 'Discover', 'We learn about your goals, users, and opportunities.'],
  ['02', 'Plan', 'We shape the strategy, scope, and experience.'],
  ['03', 'Build', 'We design, develop, and test with care.'],
  ['04', 'Launch', 'We release, support, and help you grow.'],
]

export default function Home() {
  return (
    <>
      <SEO title="HAVELO | Digital Products Built for Growth" description="HAVELO designs and develops modern websites, mobile apps, and custom software solutions that help businesses grow." path="/" />
      <section className="home-hero">
        <div className="hero-media" aria-hidden="true"><img src="/assets/havelo-hero.webp" alt="" width="1672" height="941" fetchPriority="high" /></div>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <Reveal>
            <span className="eyebrow"><span />HAVELO</span>
            <h1>Building Digital Experiences That <span className="gradient-text">Drive Growth</span></h1>
            <p>We design and develop modern websites, mobile applications, and digital solutions that help businesses grow faster.</p>
            <div className="hero-actions">
              <Link className="button" to="/start-project">Get Started<ArrowIcon /></Link>
              <Link className="button button--secondary" to="/services">View Services</Link>
            </div>
            <div className="hero-tags" aria-label="Our core services">
              <span>Website Development</span><span>Mobile Apps</span><span>Custom Software</span>
            </div>
          </Reveal>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span /></div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal><SectionHeading eyebrow="Why HAVELO" title="One team. Every digital touchpoint." text="Thoughtful strategy, strong design, and reliable engineering come together in every product we create." /></Reveal>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 90}>
                <article className="feature-card glass-card">
                  <span className="icon-box">{feature.icon}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                  <Link to="/services" aria-label={`Learn more about ${feature.title}`}>Explore service <ArrowIcon /></Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <Reveal><SectionHeading eyebrow="Our Process" title="Clear from idea to launch." text="A focused process keeps every project collaborative, efficient, and aligned with your goals." align="center" /></Reveal>
          <ProcessTimeline steps={process} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta-panel">
              <div className="cta-glow" />
              <div><span className="eyebrow"><span />Your next idea</span><h2>Let's Build Something Amazing Together</h2></div>
              <Link className="button button--light" to="/contact">Contact Us<ArrowIcon /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
