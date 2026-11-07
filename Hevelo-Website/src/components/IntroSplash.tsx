import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export const INTRO_CONFIG = {
  auroraDur: 1.4,
  drawDelay: 0.4,
  drawDur: 1.5,
  fillDelay: 1.6,
  popDelay: 1.7,
  wordDelay: 1.9,
  wordStagger: 0.09,
  tagDelay: 2.9,
  loaderStart: 0.3,
  loaderDur: 3.9,
  loaderFadeAt: 4.1,
  liftAt: 4.4,
  liftDur: 1,
  homeDelay: 5,
  homeDur: 2,
  reducedMotionMs: 1700,
  playOncePerSession: false,
}

const STORAGE_KEY = 'havelo-intro-seen'
const LETTERS = 'HAVELO'.split('')
const INTRO_COMPLETE_EVENT = 'havelo:intro-complete'

function shouldPlay() {
  if (!INTRO_CONFIG.playOncePerSession) return true
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== '1'
  } catch {
    return true
  }
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function markIntroComplete() {
  const root = document.documentElement
  if (root.hasAttribute('data-intro-complete')) return
  root.setAttribute('data-intro-complete', '')
  window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT))
}

export default function IntroSplash() {
  const [visible, setVisible] = useState(shouldPlay)
  const [leaving, setLeaving] = useState(false)
  const [reduced] = useState(prefersReducedMotion)
  const [playing] = useState(visible)
  const pctRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const frame = useRef(0)

  const unlock = () => {
    document.body.style.overflow = ''
  }

  const clearHome = () => {
    document.documentElement.removeAttribute('data-intro')
  }

  const finish = () => {
    if (INTRO_CONFIG.playOncePerSession) try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* storage unavailable */
    }
    unlock()
    markIntroComplete()
    setVisible(false)
  }

  const skip = () => {
    timers.current.forEach(window.clearTimeout)
    cancelAnimationFrame(frame.current)
    clearHome()
    setLeaving(true)
    timers.current = [window.setTimeout(finish, 450)]
  }

  useLayoutEffect(() => {
    if (!playing) return
    const root = document.documentElement
    const c = INTRO_CONFIG
    const vars: Record<string, number> = {
      '--i-aurora-dur': c.auroraDur,
      '--i-draw-delay': c.drawDelay,
      '--i-draw-dur': c.drawDur,
      '--i-fill-delay': c.fillDelay,
      '--i-pop-delay': c.popDelay,
      '--i-tag-delay': c.tagDelay,
      '--i-loader-start': c.loaderStart,
      '--i-loader-dur': c.loaderDur,
      '--i-loader-fade': c.loaderFadeAt,
      '--i-lift-at': c.liftAt,
      '--i-lift-dur': c.liftDur,
      '--i-home-delay': c.homeDelay,
    }
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, `${v}s`))
    if (!reduced) root.setAttribute('data-intro', 'play')
    document.body.style.overflow = 'hidden'
  }, [playing, reduced])

  useEffect(() => {
    if (!playing) {
      markIntroComplete()
      return
    }

    const c = INTRO_CONFIG
    const overlayMs = reduced ? c.reducedMotionMs : (c.liftAt + c.liftDur) * 1000 + 100
    const homeMs = (c.homeDelay + c.homeDur) * 1000 + 300
    timers.current = [window.setTimeout(finish, overlayMs), window.setTimeout(clearHome, homeMs)]

    if (!reduced) {
      const t0 = performance.now()
      const tick = (now: number) => {
        let k = (now - t0 - c.loaderStart * 1000) / (c.loaderDur * 1000)
        k = Math.max(0, Math.min(k, 1))
        const eased = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2
        if (pctRef.current) pctRef.current.textContent = `${Math.round(eased * 100)}%`
        if (k < 1) frame.current = requestAnimationFrame(tick)
      }
      frame.current = requestAnimationFrame(tick)
    }

    return () => {
      timers.current.forEach(window.clearTimeout)
      cancelAnimationFrame(frame.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  return (
    <div className={`intro-splash${leaving ? ' is-leaving' : ''}${reduced ? ' is-reduced' : ''}`} role="status" aria-label="Welcome to HAVELO">
      <div className="intro-panel">
        <div className="intro-blob intro-blob--a" />
        <div className="intro-blob intro-blob--b" />
        <svg className="intro-logo" viewBox="-2 -2 104 104" aria-hidden="true">
          <defs>
            <linearGradient id="havelo-intro-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#b8fff8" />
              <stop offset=".5" stopColor="#2fd3cc" />
              <stop offset="1" stopColor="#0b6f78" />
            </linearGradient>
          </defs>
          <path pathLength="1" d="M0 0 L28 24 L28 46 L0 38 Z" />
          <path pathLength="1" d="M0 48 L28 56 L28 90 Q28 100 18 100 L10 100 Q0 100 0 90 Z" />
          <path pathLength="1" d="M72 0 H88 Q100 0 100 14 V100 H72 Z" />
          <path pathLength="1" d="M0 40 C28 30 46 46 62 46 C84 48 94 38 100 34 V60 C90 72 70 76 55 64 C42 54 20 60 0 58 Z" />
        </svg>
        <div className="intro-word" aria-hidden="true">
          {LETTERS.map((letter, i) => (
            <span key={i}><i style={{ animationDelay: `${INTRO_CONFIG.wordDelay + i * INTRO_CONFIG.wordStagger}s` }}>{letter}</i></span>
          ))}
        </div>
        <div className="intro-tag">WHERE IDEAS ARE BROUGHT TO LIFE</div>
        <div className="intro-bar"><i /></div>
        <div className="intro-pct" ref={pctRef}>0%</div>
      </div>
      <div className="intro-edge" />
      <button type="button" className="intro-skip" onClick={skip}>Skip</button>
    </div>
  )
}
