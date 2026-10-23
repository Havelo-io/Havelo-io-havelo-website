import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import IntroSplash from './components/IntroSplash'
import PageTransition from './components/PageTransition'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import StartProject from './pages/StartProject'

const GLOW_ROUTES = ['/about', '/services', '/projects', '/contact']

function GlowBackground() {
  const { pathname } = useLocation()
  if (!GLOW_ROUTES.includes(pathname)) return null
  return (
    <div className="bg-canvas" aria-hidden="true">
      <span className="bg-blob a" /><span className="bg-blob b" /><span className="bg-blob c" />
      <span className="bg-ring r1" /><span className="bg-ring r2" />
      <span className="bg-dots d1" /><span className="bg-dots d2" />
    </div>
  )
}

function ScrollManager() {
  const { pathname, hash } = useLocation()

  // Scroll to the #anchor when the link has one (for example /services#svc-3), otherwise to the top.
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function App() {
  const { pathname } = useLocation()
  return (
    <div className={`site-shell${pathname === '/' ? ' site-shell--home' : ''}`}>
      <IntroSplash />
      <PageTransition />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollManager />
      <GlowBackground />
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/pricing" element={<Navigate to="/services" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/start-project" element={<StartProject />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
