import { Link } from 'react-router-dom'
import { BulbIcon, FacebookIcon, HandshakeIcon, InstagramIcon, MailIcon, RocketIcon, SettingsIcon, ShieldCheckIcon, TargetIcon, UsersIcon } from './Icons'

// Social links. Update the Instagram href if HAVELO has its own Instagram profile link.
const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/share/1Ep56z7Mfr/?mibextid=wwXIfr', Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://www.facebook.com/share/1Ep56z7Mfr/?mibextid=wwXIfr', Icon: InstagramIcon },
]

const HIGHLIGHTS = [
  { Icon: RocketIcon, label: 'Innovative Solutions' },
  { Icon: UsersIcon, label: 'Client Focused' },
  { Icon: ShieldCheckIcon, label: 'Reliable Support' },
]

const REASONS = [
  { Icon: BulbIcon, title: 'User-Focused Solutions', text: 'Clean, simple and effective digital experiences.' },
  { Icon: SettingsIcon, title: 'Modern & Reliable Technology', text: 'Built with the latest tools and best practices.' },
  { Icon: TargetIcon, title: 'Tailored to Your Goals', text: 'Solutions designed around your specific needs.' },
  { Icon: HandshakeIcon, title: 'Ongoing Support', text: 'We’re with you beyond launch.' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand" aria-label="HAVELO home">
            <span className="brand-mark"><img src="/assets/havelo-mark.png" alt="" width="256" height="256" /></span>
            <span className="brand-name">HAVELO</span>
          </Link>
          <p className="footer-tagline">Where Ideas Are Brought To Life</p>
          <p className="footer-about">We build modern digital solutions that help individuals, startups, and businesses turn their ideas into real, impactful products.</p>
          <ul className="footer-highlights">
            {HIGHLIGHTS.map(({ Icon, label }) => (
              <li key={label}><span className="icon-box"><Icon /></span><span>{label}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Why choose HAVELO?</h2>
          <ul className="footer-reasons">
            {REASONS.map(({ Icon, title, text }) => (
              <li key={title}>
                <span className="icon-box"><Icon /></span>
                <span><strong>{title}</strong><small>{text}</small></span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Quick links</h2>
          <div className="footer-links">
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h2>Contact</h2>
          <div className="footer-links">
            <a href="mailto:havelo.lk@gmail.com"><MailIcon />havelo.lk@gmail.com</a>
          </div>
          <h2 className="footer-follow">Follow us</h2>
          <div className="footer-social" role="group" aria-label="Social media">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a key={label} className="icon-box social-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={`HAVELO on ${label}`} title={label}><Icon /></a>
            ))}
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 HAVELO. All Rights Reserved.</p>
        <p>Websites · Mobile Apps · Custom Software</p>
      </div>
    </footer>
  )
}
