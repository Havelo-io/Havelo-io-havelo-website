import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const EASE = 'cubic-bezier(.77, 0, .18, 1)'
const COVER_MS = 480
const HOLD_MS = 260
const LIFT_MS = 520

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms))

export default function PageTransition() {
  const navigate = useNavigate()
  const curtain = useRef<HTMLDivElement>(null)
  const edge = useRef<HTMLDivElement>(null)
  const busy = useRef(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const run = async (to: string) => {
      const panel = curtain.current
      const line = edge.current
      if (!panel || !line) {
        navigate(to)
        return
      }
      busy.current = true
      try {
        const cover = panel.animate(
          [{ clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0 0 0 0)' }],
          { duration: COVER_MS, easing: EASE, fill: 'forwards' },
        )
        line.animate(
          [
            { top: '100%', opacity: 1, transform: 'translateY(0)' },
            { top: '0%', opacity: 0, transform: 'translateY(0)' },
          ],
          { duration: COVER_MS, easing: EASE },
        )
        await cover.finished

        navigate(to)
        await wait(HOLD_MS)

        const lift = panel.animate(
          [{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 100% 0)' }],
          { duration: LIFT_MS, easing: EASE, fill: 'forwards' },
        )
        line.animate(
          [
            { top: '100%', opacity: 1, transform: 'translateY(-100%)' },
            { top: '0%', opacity: 0, transform: 'translateY(-100%)' },
          ],
          { duration: LIFT_MS, easing: EASE },
        )
        await lift.finished
        cover.cancel()
        lift.cancel()
      } finally {
        busy.current = false
      }
    }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (document.documentElement.hasAttribute('data-intro') || document.querySelector('.intro-splash')) return
      const anchor = (event.target as Element | null)?.closest('a')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname) return
      event.preventDefault()
      if (busy.current) return
      void run(url.pathname + url.search + url.hash)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [navigate])

  return (
    <>
      <div ref={curtain} className="page-curtain" aria-hidden="true">
        <div className="page-curtain-glow" />
        <span>HAVELO</span>
      </div>
      <div ref={edge} className="page-curtain-edge" aria-hidden="true" />
    </>
  )
}
