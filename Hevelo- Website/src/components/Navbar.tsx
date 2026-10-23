import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons'

const links = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Services', '/services'],
  ['Pricing', '/pricing'],
  ['Contact', '/contact'],
]

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
  const [open, setOpen] = useState(false)

  // Follow the device theme automatically, including when it changes while the site is open.
  useEffect(() => {
    const query = matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const next = query.matches ? 'dark' : 'light'
      setTheme(next)
      document.documentElement.dataset.theme = next
    }
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [])

  // Close the mobile menu with Escape, and when the phone is rotated or resized to a wide layout.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    const wide = matchMedia('(min-width: 981px)')
    const onWide = () => { if (wide.matches) setOpen(false) }
    window.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => { window.removeEventListener('keydown', onKey); wide.removeEventListener('change', onWide) }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.dataset.theme = next
  }

  return (
    <header className="navbar-wrap">
      <nav className="navbar container" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="HAVELO home">
          <span className="brand-mark"><img src="/assets/havelo-mark.png" alt="" width="256" height="256" /></span>
          <span className="brand-name">HAVELO<small>Where ideas brought to life</small></span>
        </Link>
        <div id="mobile-navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
          <Link className="nav-menu-cta" to="/start-project" onClick={() => setOpen(false)}>Start a project</Link>
        </div>
        <div className="nav-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} title={theme === 'light' ? 'Dark mode' : 'Light mode'}>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <Link className="button button--small nav-cta" to="/start-project">Start a project</Link>
          <button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>
      {open && <button className="nav-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />}
    </header>
  )
}
