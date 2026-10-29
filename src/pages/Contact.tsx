import ContactForm from '../components/ContactForm'
import { CallIcon, MailIcon, PinIcon, WhatsAppIcon } from '../components/Icons'
import Reveal from '../components/Reveal'
import SEO from '../components/SEO'
import { SITE, callLabel } from '../config/site'

export default function Contact() {
  return (
    <div className="hv ct">
      <SEO title="Contact Havelo. Start your software project" description="Talk to Havelo about your website, mobile app or custom software. Call, WhatsApp, email or send a project brief. We reply within one working day." path="/contact" />

      <section className="ct-main">
        <div className="hv-wrap">
          <Reveal>
            <div className="hv-head">
              <div>
                <span className="hv-eyebrow">Contact</span>
                <h1>Tell us what you're <span className="hv-grad">building.</span></h1>
              </div>
              <p>We reply within one working day. Prefer to talk? Call {SITE.phones.map((phone, index) => <span key={phone.label}>{index > 0 && ' or '}<a className="ct-inline" href={phone.href} aria-label={callLabel(phone.label)}>{phone.label}</a></span>)}, or WhatsApp us. We are in Colombo (GMT+5:30).</p>
            </div>
          </Reveal>

          <div className="ct-grid">
            <Reveal>
              <div className="ct-cards">
                <div className="ct-card">
                  <span className="hv-tile"><CallIcon /></span>
                  <span>
                    <small>Call us</small>
                    {SITE.phones.map(phone => <a key={phone.label} className="ct-card__num" href={phone.href} aria-label={callLabel(phone.label)}>{phone.label}</a>)}
                    <em>{SITE.hours}</em>
                  </span>
                </div>
                <a href={SITE.whatsapp} className="ct-card" target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp Havelo on ${SITE.whatsappLabel}`}>
                  <span className="hv-tile"><WhatsAppIcon /></span>
                  <span><small>WhatsApp</small><b>{SITE.whatsappLabel}</b><em>Fastest route to an answer</em></span>
                </a>
                <a href={`mailto:${SITE.email}`} className="ct-card">
                  <span className="hv-tile"><MailIcon /></span>
                  <span><small>Email</small><b>{SITE.email}</b><em>Briefs, decks, anything</em></span>
                </a>
                <div className="ct-card ct-card--static">
                  <span className="hv-tile"><PinIcon /></span>
                  <span><small>Studio</small><b>{SITE.location}</b><em>Open to clients anywhere</em></span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={90}><ContactForm /></Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
