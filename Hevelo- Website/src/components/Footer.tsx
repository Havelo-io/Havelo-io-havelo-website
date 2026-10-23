import { Link } from 'react-router-dom'
import { FacebookIcon, InstagramIcon, LinkedInIcon, MailIcon } from './Icons'

// Social links. Replace these hrefs with the real Havelo profile links.
const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/share/1Ep56z7Mfr/?mibextid=wwXIfr', Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://www.facebook.com/share/1Ep56z7Mfr/?mibextid=wwXIfr', Icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', Icon: LinkedInIcon },
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
            <Link to="/pricing">Pricing</Link>
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
            <a href="mailto:havelo.lk@gmail.com"><MailIcon />havelo.lk@gmail.com</a>
            <span>Colombo, Sri Lanka</span>
            <span>Monday to Friday, 9.00 to 18.00</span>
          </div>
          <Link className="ft-btn" to="/start-project">Start a project</Link>
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
