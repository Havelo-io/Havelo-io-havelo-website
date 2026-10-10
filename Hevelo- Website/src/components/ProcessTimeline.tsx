import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Reveal from './Reveal'

export default function ProcessTimeline({ steps }: { steps: readonly (readonly string[])[] }) {
  const grid = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setProgress(1)
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const el = grid.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const next = (vh * 0.82 - rect.top) / Math.max(rect.height * 0.9, vh * 0.3)
      setProgress(Math.max(0, Math.min(1, next)))
    }
    const request = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      cancelAnimationFrame(frame)
    }
  }, [])

  const last = Math.max(steps.length - 1, 1)

  return (
    <div className="process-grid" ref={grid} style={{ '--p': progress } as CSSProperties}>
      <div className="process-track" aria-hidden="true"><i /></div>
      {steps.map(([number, title, text], index) => (
        <Reveal key={title} delay={index * 80}>
          <article className={`process-step${progress >= (index / last) * 0.96 && progress > 0 ? ' is-active' : ''}`}>
            <span className="step-number">{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
