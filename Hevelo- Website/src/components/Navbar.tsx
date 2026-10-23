import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { CloseIcon, MenuIcon } from './Icons'

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Our Work', '/projects'],
  ['Contact', '/contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Close the mobile menu with Escape, and when the phone is rotated or resized to a wide layout.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    const wide = matchMedia('(min-width: 981px)')
    const onWide = () => { if (wide.matches) setOpen(false) }
    window.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => { window.removeEventListener('keydown', onKey); wide.removeEventListener('change', onWide) }
  }, [])

  return (
    <header className="navbar-wrap">
      <nav className="navbar container" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="HAVELO home">
          <span className="brand-mark"><img src="/assets/havelo-mark.png" alt="" width="256" height="256" /></span>
          <span className="brand-name">HAVELO<small>Where ideas brought to life</small></span>
        </Link>
        <div id="mobile-navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
        </div>
        <div className="nav-actions">
          <button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>
      {open && <button className="nav-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />}
    </header>
  )
}
