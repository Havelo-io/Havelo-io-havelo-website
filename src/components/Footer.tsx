import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { SITE, callLabel } from '../config/site'
import worldMap from '../assets/world-map.svg' // <-- your map file name

const INSTAGRAM_URL = 'https://www.instagram.com/' // <-- put your Havelo Instagram link here

const Svg = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)
const IFacebook = () => <Svg><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></Svg>
const IInstagram = () => (
  <Svg>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </Svg>
)
const IMail = () => <Svg><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></Svg>
const IPhone = () => <Svg><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></Svg>
const IPin = () => <Svg><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Svg>
const IClock = () => <Svg><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Svg>
const IArrowUR = () => <Svg><path d="M7 17 17 7" /><path d="M7 7h10v10" /></Svg>
const IArrowUp = () => <Svg><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></Svg>
const ICheck = () => <Svg><path d="M20 6 9 17l-5-5" /></Svg>

export default function Footer() {
  return (
    <footer className="hf">
      <img className="hf-map" src={worldMap} alt="" aria-hidden="true" />
      <div className="hf-shade" aria-hidden="true" />

      <div className="hf-wrap hf-grid">
        {/* Brand */}
        <div className="hf-brand">
          <Link to="/" className="hf-logo" aria-label="Havelo home">
            <img src="/assets/havelo-mark.png" alt="" width="256" height="256" />
            <span className="hf-logo-text">
              <strong>HAVELO</strong>
              <small>Where ideas brought to life</small>
            </span>
          </Link>

          <p className="hf-about">
            Websites, mobile apps and custom software, built by the people you talk to.
          </p>

          <div className="hf-status">
            <span className="hf-dot" />
            Open for new projects
          </div>

          <div className="hf-social" aria-label="Connect with HAVELO">
            <a
              href="https://www.facebook.com/share/1Ep56z7Mfr/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HAVELO on Facebook"
            >
              <IFacebook />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HAVELO on Instagram"
            >
              <IInstagram />
            </a>
          </div>
        </div>

        {/* Company */}
        <nav className="hf-col" aria-label="Company">
          <h2>Company</h2>
          <ul className="hf-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects">Our Work</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Services */}
        <nav className="hf-col" aria-label="Services">
          <h2>Services</h2>
          <ul className="hf-links">
            <li><Link to="/services#svc-1">Website Development</Link></li>
            <li><Link to="/services#svc-2">Mobile Apps</Link></li>
            <li><Link to="/services#svc-3">UI/UX Design</Link></li>
            <li><Link to="/services#svc-4">Custom Software</Link></li>
            <li><Link to="/services#svc-5">Maintenance</Link></li>
          </ul>
        </nav>

        {/* Who we help */}
        <nav className="hf-col" aria-label="Who we help">
          <h2>Who we help</h2>
          <ul className="hf-links">
            <li><Link to="/contact">Startups</Link></li>
            <li><Link to="/contact">Small businesses</Link></li>
            <li><Link to="/contact">Online stores</Link></li>
            <li><Link to="/contact">Agencies</Link></li>
            <li><Link to="/contact">Personal brands</Link></li>
          </ul>
        </nav>

        {/* Why Havelo */}
        <div className="hf-col">
          <h2>Why Havelo</h2>
          <ul className="hf-why">
            <li><span><ICheck /></span>Direct, friendly communication</li>
            <li><span><ICheck /></span>Clean, modern design</li>
            <li><span><ICheck /></span>Fast and responsive builds</li>
            <li><span><ICheck /></span>Support after launch</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="hf-col hf-contact">
          <h2>Contact</h2>
          <ul>
            {SITE.phones.map(phone => (
              <li key={phone.label}>
                <a className="hf-item" href={phone.href} aria-label={callLabel(phone.label)}>
                  <span className="hf-ico"><IPhone /></span>
                  <span>{phone.label}</span>
                </a>
              </li>
            ))}
            <li>
              <a className="hf-item" href={`mailto:${SITE.email}`}>
                <span className="hf-ico"><IMail /></span>
                <span>{SITE.email}</span>
              </a>
            </li>
            <li className="hf-item">
              <span className="hf-ico"><IPin /></span>
              <span>{SITE.location}</span>
            </li>
            <li className="hf-item">
              <span className="hf-ico"><IClock /></span>
              <span>{SITE.hours}</span>
            </li>
          </ul>
          <Link to="/contact" className="hf-btn">
            <span>Let's build together</span>
            <span className="hf-btn-arrow"><IArrowUR /></span>
          </Link>
        </div>
      </div>

      <div className="hf-wrap hf-bottom">
        <p>© 2026 Havelo. All rights reserved.</p>
        <p className="hf-bottom-tag">Websites · Mobile Apps · Custom Software</p>
        <button
          type="button"
          className="hf-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <IArrowUp />
        </button>
      </div>
    </footer>
  )
}