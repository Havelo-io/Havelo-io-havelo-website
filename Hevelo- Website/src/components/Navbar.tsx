import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { CloseIcon, MenuIcon } from './Icons'

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Our Work', '/projects'],
  ['Contact', '/contact'],
]

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Close the mobile menu with Escape, and when the screen becomes wide.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    const wide = matchMedia('(min-width: 981px)')
    const onWide = () => { if (wide.matches) setOpen(false) }
    window.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => { window.removeEventListener('keydown', onKey); wide.removeEventListener('change', onWide) }
  }, [])

  // Stop the page behind from scrolling while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="navbar-wrap">
      <nav className="navbar container" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="HAVELO home">
          <span className="brand-mark"><img src="/assets/havelo-mark.png" alt="" width="256" height="256" /></span>
          <span className="brand-name">HAVELO<small>Where ideas brought to life</small></span>
        </Link>

        <div id="mobile-navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map(([label, path], i) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              style={{ '--i': i } as CSSProperties}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <span className="nav-label">{label}</span>
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="nav-menu-cta"
            style={{ '--i': links.length } as CSSProperties}
            onClick={() => setOpen(false)}
          >
            <PhoneIcon /> Let's talk
          </Link>
        </div>

        <div className="nav-actions">
          <Link to="/contact" className="button button--small nav-cta">
            <PhoneIcon /> Let's talk
          </Link>
          <button
            className={`icon-button menu-button ${open ? 'is-open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>
      {open && <button className="nav-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />}
    </header>
  )
}