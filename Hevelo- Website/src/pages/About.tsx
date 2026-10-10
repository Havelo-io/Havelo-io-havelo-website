import { ArrowIcon, CheckIcon, ShieldIcon, SparkIcon } from '../components/Icons'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import SEO from '../components/SEO'
import TeamSection from '../components/TeamSection'
import { Link } from 'react-router-dom'

const values = [
  ['Innovation', 'We explore better ways to turn ambitious ideas into useful products.'],
  ['Quality', 'We care about every detail, from first sketch to final release.'],
  ['Transparency', 'We communicate clearly and keep decisions easy to understand.'],
  ['Reliability', 'We build dependable solutions and stand behind our work.'],
]

export default function About() {
  return (
    <>
      <SEO title="About HAVELO | Where Ideas Are Brought To Life" description="Meet HAVELO, a software development startup focused on turning ideas into thoughtful websites, mobile apps, and digital solutions." path="/about" />
      <PageHero label="About HAVELO" title="Technology shaped around real business goals." text="We are a focused software development team that turns bold ideas into clear, reliable, and engaging digital products." />
      <section className="section section--tight">
        <div className="container about-intro">
          <Reveal><SectionHeading eyebrow="Who We Are" title="A practical partner for ambitious teams." text="HAVELO brings design and engineering together under one roof. We listen first, solve the right problems, and build digital experiences that are made to grow with your business." /></Reveal>
          <Reveal delay={100}>
            <div className="about-signal glass-card">
              <div className="signal-icon"><SparkIcon /></div>
              <strong>Ideas into impact</strong>
              <p>From early concept to launch, our work stays connected to your users and your goals.</p>
              <Link to="/contact">Work with us <ArrowIcon /></Link>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section section--muted">
        <div className="container split-cards">
          <Reveal>
            <article className="statement-card glass-card"><span className="icon-box"><CheckIcon /></span><span className="card-label">Our Mission</span><h2>To transform ideas into impactful digital experiences.</h2></article>
          </Reveal>
          <Reveal delay={100}>
            <article className="statement-card statement-card--accent"><span className="icon-box"><ShieldIcon /></span><span className="card-label">Our Vision</span><h2>To become a trusted technology partner for businesses worldwide.</h2></article>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Reveal><SectionHeading eyebrow="Core Values" title="How we show up." text="Simple principles guide our decisions, our craft, and every client relationship." align="center" /></Reveal>
          <div className="values-grid">
            {values.map(([title, text], index) => <Reveal key={title} delay={index * 70}><article className="value-card"><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section section--muted">
        <div className="container">
          <Reveal><SectionHeading eyebrow="Our Team" title="The people behind HAVELO." text="A small, focused team that designs, builds, and secures digital products around your goals." align="center" /></Reveal>
          <TeamSection />
        </div>
      </section>
    </>
  )
}
