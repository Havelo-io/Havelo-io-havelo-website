import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { CloseIcon, MenuIcon } from './Icons'

const links = [
  ['Home', '/'],
  ['About Us', '/about'],
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
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [focusedWithin, setFocusedWithin] = useState(false)
  const lastScrollY = useRef(0)
  const scrollDistance = useRef(0)
  const frame = useRef(0)

  // Hide on meaningful downward travel and reveal on meaningful upward travel.
  // The animation itself is CSS-only; React updates only when visibility changes.
  useEffect(() => {
    lastScrollY.current = Math.max(0, window.scrollY)
    scrollDistance.current = 0

    // A new history entry can arrive while the previous page was scrolled and
    // the navbar was hidden. Reveal it and establish a fresh scroll baseline.
    frame.current = window.requestAnimationFrame(() => {
      frame.current = 0
      lastScrollY.current = Math.max(0, window.scrollY)
      scrollDistance.current = 0
      setHidden(false)
    })

    const update = () => {
      frame.current = 0
      const currentY = Math.max(0, window.scrollY)
      const movement = currentY - lastScrollY.current

      if (currentY <= 80 || open) {
        scrollDistance.current = 0
        setHidden(false)
        lastScrollY.current = currentY
        return
      }

      if (movement === 0) return
      if ((movement > 0 && scrollDistance.current < 0) || (movement < 0 && scrollDistance.current > 0)) {
        scrollDistance.current = 0
      }
      scrollDistance.current += movement

      if (currentY > 80 && scrollDistance.current >= 6) {
        setHidden(true)
        scrollDistance.current = 0
      } else if (scrollDistance.current <= -6) {
        setHidden(false)
        scrollDistance.current = 0
      }
      lastScrollY.current = currentY
    }

    const onScroll = () => {
      if (!frame.current) frame.current = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame.current)
    }
  }, [location.key, open, focusedWithin])

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
    <header
      className={`navbar-wrap${hidden && !open ? ' is-hidden' : ''}`}
      onFocusCapture={event => {
        // Mouse-clicked links retain DOM focus after client-side navigation.
        // Only keyboard-visible focus should pin the navbar open.
        setFocusedWithin((event.target as HTMLElement).matches(':focus-visible'))
        setHidden(false)
      }}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusedWithin(false)
      }}
      onPointerDownCapture={() => setFocusedWithin(false)}
    >
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
            onClick={() => { setHidden(false); setOpen(value => !value) }}
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
