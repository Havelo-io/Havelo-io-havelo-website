import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon, CallIcon } from '../components/Icons'
import Reveal from '../components/Reveal'
import SEO from '../components/SEO'
import { SITE, callLabel } from '../config/site'

const FILTERS = ['All', 'Web app', 'Mobile', 'Website'] as const
type Filter = typeof FILTERS[number]

// TODO: replace every entry below with a real project (name, outcome, stack, case study copy).
// These are sample projects so the page can be reviewed. Each card is tagged "Sample" on the page.
const projects = [
  { slug: 'ceylon-logistics-portal', type: 'Web app', name: 'Ceylon Logistics Portal', outcome: 'Real time shipment tracking for a Colombo freight forwarder.', stack: 'Next.js · Node · Postgres', detail: 'TODO: replace with the real case study. Scope, result and what the client does differently now.' },
  { slug: 'ayurveda-booking-app', type: 'Mobile', name: 'Ayurveda Booking App', outcome: 'Bookings, payments and reminders for a wellness chain.', stack: 'Flutter · Firebase', detail: 'TODO: replace with the real case study. Scope, result and what the client does differently now.' },
  { slug: 'harbour-coffee-roasters', type: 'Website', name: 'Harbour Coffee Roasters', outcome: 'Brand site and subscription storefront, launched in three sprints.', stack: 'Astro · Shopify', detail: 'TODO: replace with the real case study. Scope, result and what the client does differently now.' },
  { slug: 'clinic-appointment-dashboard', type: 'Web app', name: 'Clinic Appointment Dashboard', outcome: 'One screen for reception to manage doctors, slots and walk ins.', stack: 'React · Node · Postgres', detail: 'TODO: replace with the real case study. Scope, result and what the client does differently now.' },
  { slug: 'field-sales-companion', type: 'Mobile', name: 'Field Sales Companion', outcome: 'Offline first order capture for a distributor sales team.', stack: 'React Native · SQLite', detail: 'TODO: replace with the real case study. Scope, result and what the client does differently now.' },
  { slug: 'tea-estate-brand-site', type: 'Website', name: 'Tea Estate Brand Site', outcome: 'A fast, bilingual brand site with a simple editor for the team.', stack: 'Astro · Headless CMS', detail: 'TODO: replace with the real case study. Scope, result and what the client does differently now.' },
] as const

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const [open, setOpen] = useState<string | null>(null)
  const visible = projects.filter(project => filter === 'All' || project.type === filter)

  return (
    <div className="hv pj">
      <SEO title="Our work, Havelo. Websites, mobile apps and web apps" description="A look at the websites, mobile apps and web platforms Havelo designs and builds in Colombo, Sri Lanka. Sample projects while our first client work goes live." path="/projects" />

      {/* Hero */}
      <section className="pj-hero">
        <div className="hv-wrap">
          <Reveal>
            <span className="hv-eyebrow">Our work</span>
            <h1>Projects we've<br />brought <span className="hv-grad">to life.</span></h1>
            <p className="hv-lead">The kinds of websites, apps and platforms we design and build, from first sprint to launch.</p>
          </Reveal>
        </div>
      </section>

      {/* Filters and grid */}
      <section className="hv-sec pj-main" aria-labelledby="pj-grid-title">
        <div className="hv-wrap">
          <h2 id="pj-grid-title" className="pj-sr">All projects</h2>
          <div className="pj-filters" role="group" aria-label="Filter projects by type">
            {FILTERS.map(item => (
              <button key={item} type="button" className={`pj-chip${filter === item ? ' is-active' : ''}`} aria-pressed={filter === item} onClick={() => { setFilter(item); setOpen(null) }}>{item}</button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="pj-empty">No projects in this category yet. <button type="button" onClick={() => setFilter('All')}>Show all projects</button></p>
          ) : (
            <div className="pj-grid">
              {visible.map((project, index) => (
                <Reveal key={project.slug} delay={(index % 3) * 70}>
                  <article className="pj-card">
                    <div className="pj-thumb" aria-hidden="true"><div className="pj-win"><i /><i /><i /><i /><i /></div></div>
                    <div className="pj-body">
                      <div className="pj-tags"><span className="hv-tag hv-tag--cyan">{project.type}</span><span className="hv-tag">Sample</span></div>
                      <h3>{project.name}</h3>
                      <p>{project.outcome}</p>
                      {open === project.slug && <p className="pj-detail" id={`pj-${project.slug}`}>{project.detail}</p>}
                      <div className="pj-meta">
                        <span>{project.stack}</span>
                        <button type="button" aria-expanded={open === project.slug} aria-controls={`pj-${project.slug}`} onClick={() => setOpen(open === project.slug ? null : project.slug)}>Case study <span aria-hidden="true">→</span></button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="pj-cta-section">
        <div className="hv-wrap">
          <Reveal>
            <div className="pj-cta hv-ink">
              <span className="hv-eyebrow">Let's build</span>
              <h2>Have a project in <span className="hv-grad">mind?</span></h2>
              <p>Send a short brief. You will get an honest reply within two working days.</p>
              <div className="pj-cta__actions">
                <Link className="hv-btn hv-btn--primary" to="/start-project">Start a project<ArrowIcon /></Link>
                <a className="hv-btn hv-btn--ghost" href={SITE.phoneHref} aria-label={callLabel(SITE.phone)}><CallIcon />Call us</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
