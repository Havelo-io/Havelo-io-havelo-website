import { Link } from 'react-router-dom'
import { CallIcon, FacebookIcon, InstagramIcon, MailIcon } from './Icons'
import { SITE, callLabel } from '../config/site'

// Social links. Replace these hrefs with the real Havelo profile links.
const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/share/1Ep56z7Mfr/?mibextid=wwXIfr', Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://www.facebook.com/share/1Ep56z7Mfr/?mibextid=wwXIfr', Icon: InstagramIcon },
]

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-wrap ft-grid">
        <div className="ft-brand">
          <Link to="/" className="brand" aria-label="Havelo home">
            <span className="brand-mark"><img src="/assets/havelo-mark.png" alt="" width="256" height="256" /></span>
            <span className="brand-name">HAVELO</span>
          </Link>
          <p className="ft-tagline">Where ideas are brought to life.</p>
          <p className="ft-about">Websites, mobile apps and custom software, built by the people you talk to.</p>
          <div className="ft-social" role="group" aria-label="Social media">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Havelo on ${label}`} title={label}><Icon /></a>
            ))}
          </div>
        </div>
        <nav aria-label="Quick links">
          <h2>Quick links</h2>
          <div className="ft-links">
            <Link to="/">Home</Link>
            <Link to="/about">About us</Link>
            <Link to="/services">Services</Link>
            <Link to="/projects">Our Work</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>
        <nav aria-label="Services">
          <h2>Services</h2>
          <div className="ft-links">
            <Link to="/services#svc-1">Website Development</Link>
            <Link to="/services#svc-2">Mobile Apps</Link>
            <Link to="/services#svc-3">UI/UX Design</Link>
            <Link to="/services#svc-4">Custom Software</Link>
            <Link to="/services#svc-5">Maintenance</Link>
          </div>
        </nav>
        <div>
          <h2>Contact</h2>
          <div className="ft-links">
            {SITE.phones.map(phone => <a key={phone.label} href={phone.href} aria-label={callLabel(phone.label)}><CallIcon />{phone.label}</a>)}
            <a href={`mailto:${SITE.email}`}><MailIcon />{SITE.email}</a>
            <span>{SITE.location}</span>
            <span>{SITE.hours}</span>
          </div>
        </div>
      </div>
      <div className="ft-wrap ft-bottom">
        <p>© 2026 Havelo. All rights reserved.</p>
        <ul>
          <li>Websites</li>
          <li>Mobile Apps</li>
          <li>Custom Software</li>
        </ul>
      </div>
    </footer>
  )
}
