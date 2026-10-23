import { useEffect, useRef, useState, type CSSProperties } from 'react'

type ProcessStep = {
  number: string
  shortLabel: string
  label: string
  title: string
  description: string
  tags: string[]
  tone: 'strategy' | 'design' | 'build'
}

const steps: ProcessStep[] = [
  {
    number: '01',
    shortLabel: 'Strategy',
    label: 'Strategy',
    title: 'Strategy & Discovery',
    description: 'We start by understanding your goals, users, and market opportunities. Through research and collaboration, we define a clear strategy that sets the foundation for success.',
    tags: ['Market Research', 'User Insights', 'Product Strategy'],
    tone: 'strategy',
  },
  {
    number: '02',
    shortLabel: 'Design',
    label: 'Design',
    title: 'Design & Experience',
    description: 'We craft intuitive, beautiful, and consistent experiences that connect with your users and bring your brand to life across every touchpoint.',
    tags: ['UX/UI Design', 'Brand Identity', 'Prototyping'],
    tone: 'design',
  },
  {
    number: '03',
    shortLabel: 'Build',
    label: 'Build',
    title: 'Build & Launch',
    description: 'Our engineering team brings everything to life with clean, scalable code. We launch, measure, and iterate to ensure your product delivers real-world impact.',
    tags: ['Development', 'Testing & QA', 'Launch & Growth'],
    tone: 'build',
  },
]

function StrategyVisual() {
  return (
    <svg viewBox="0 0 500 360" role="presentation" focusable="false">
      <defs>
        <radialGradient id="strategy-core"><stop stopColor="#80fff7" /><stop offset="1" stopColor="#13bfc8" stopOpacity=".12" /></radialGradient>
        <linearGradient id="strategy-panel" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#163143" /><stop offset="1" stopColor="#07141d" /></linearGradient>
      </defs>
      <ellipse className="process-visual__orbit" cx="250" cy="180" rx="194" ry="106" />
      <ellipse className="process-visual__orbit process-visual__orbit--inner" cx="250" cy="180" rx="132" ry="76" />
      <path className="process-visual__link" d="M108 118 194 160M306 160l86-48M306 205l94 44M194 205l-86 45" />
      <g className="process-visual__panel" transform="translate(165 100)">
        <rect width="170" height="160" rx="24" fill="url(#strategy-panel)" />
        <rect x="18" y="18" width="56" height="7" rx="3.5" fill="#43e7df" opacity=".82" />
        <rect x="18" y="38" width="112" height="5" rx="2.5" fill="#8cb0bd" opacity=".28" />
        <circle cx="85" cy="89" r="34" fill="url(#strategy-core)" />
        <path d="M69 87c0-12 8-21 18-21s18 9 18 21c0 8-5 12-10 17v8H79v-8c-5-5-10-9-10-17Z" fill="none" stroke="#cafffb" strokeWidth="3" />
        <path d="M79 121h16" stroke="#43e7df" strokeWidth="3" strokeLinecap="round" />
        <rect x="18" y="137" width="42" height="7" rx="3.5" fill="#3adbd4" opacity=".52" />
        <rect x="68" y="137" width="84" height="7" rx="3.5" fill="#7699a7" opacity=".25" />
      </g>
      <g className="process-visual__label"><rect x="42" y="86" width="84" height="38" rx="19" /><text x="84" y="110">IDEAS</text></g>
      <g className="process-visual__label"><rect x="366" y="78" width="94" height="38" rx="19" /><text x="413" y="102">RESEARCH</text></g>
      <g className="process-visual__label"><rect x="350" y="242" width="104" height="38" rx="19" /><text x="402" y="266">STRATEGY</text></g>
      <circle className="process-visual__node" cx="108" cy="250" r="8" />
      <circle className="process-visual__node" cx="400" cy="249" r="8" />
    </svg>
  )
}

function DesignVisual() {
  return (
    <svg viewBox="0 0 500 360" role="presentation" focusable="false">
      <defs>
        <linearGradient id="design-screen" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f1ffff" stopOpacity=".98" /><stop offset="1" stopColor="#bff7f2" stopOpacity=".78" /></linearGradient>
        <filter id="design-shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#003d47" floodOpacity=".28" /></filter>
      </defs>
      <circle className="process-visual__design-ring" cx="257" cy="178" r="139" />
      <g filter="url(#design-shadow)" transform="translate(86 78) rotate(-7 140 100)">
        <rect width="282" height="202" rx="22" fill="#075e69" stroke="#74fff5" strokeOpacity=".62" />
        <circle cx="22" cy="20" r="4" fill="#67f5ed" /><circle cx="36" cy="20" r="4" fill="#67f5ed" opacity=".5" />
        <rect x="18" y="40" width="76" height="140" rx="13" fill="#064852" />
        <rect x="110" y="40" width="152" height="66" rx="13" fill="url(#design-screen)" />
        <rect x="110" y="120" width="70" height="60" rx="13" fill="#20d7d2" opacity=".74" />
        <rect x="192" y="120" width="70" height="60" rx="13" fill="#073f50" />
        <rect x="32" y="60" width="46" height="7" rx="3.5" fill="#76fff7" opacity=".78" />
        <rect x="32" y="79" width="32" height="5" rx="2.5" fill="#a8d9d9" opacity=".38" />
      </g>
      <g filter="url(#design-shadow)" transform="translate(310 42) rotate(7 50 100)">
        <rect width="100" height="206" rx="24" fill="#082f3d" stroke="#bafff9" strokeOpacity=".72" />
        <rect x="10" y="16" width="80" height="78" rx="16" fill="url(#design-screen)" />
        <rect x="10" y="106" width="80" height="34" rx="12" fill="#25d9d2" opacity=".76" />
        <rect x="10" y="151" width="52" height="8" rx="4" fill="#b9fffa" opacity=".62" />
        <rect x="10" y="169" width="70" height="6" rx="3" fill="#b9fffa" opacity=".25" />
      </g>
      <path className="process-visual__cursor" d="m319 236 18 44 9-18 19-8-46-18Z" />
      <g className="process-visual__chip" transform="translate(57 246)"><rect width="110" height="38" rx="19" /><circle cx="20" cy="19" r="6" /><text x="35" y="24">PROTOTYPE</text></g>
    </svg>
  )
}

function BuildVisual() {
  return (
    <svg viewBox="0 0 500 360" role="presentation" focusable="false">
      <defs>
        <linearGradient id="build-panel" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0b2c58" /><stop offset="1" stopColor="#041020" /></linearGradient>
        <linearGradient id="launch-beam" x1="0" y1="1" x2="0" y2="0"><stop stopColor="#27dcd9" stopOpacity="0" /><stop offset="1" stopColor="#77fff5" stopOpacity=".8" /></linearGradient>
      </defs>
      <g className="process-visual__code-panel" transform="translate(44 62)">
        <rect width="320" height="232" rx="25" fill="url(#build-panel)" stroke="#2ebfd6" strokeOpacity=".45" />
        <path d="M0 42h320" stroke="#4da8ca" strokeOpacity=".24" />
        <circle cx="21" cy="21" r="4" fill="#52eee7" /><circle cx="35" cy="21" r="4" fill="#52eee7" opacity=".5" /><circle cx="49" cy="21" r="4" fill="#52eee7" opacity=".25" />
        <g className="process-visual__code-lines">
          <rect x="24" y="65" width="52" height="7" rx="3.5" /><rect x="86" y="65" width="116" height="7" rx="3.5" />
          <rect x="42" y="89" width="88" height="7" rx="3.5" /><rect x="140" y="89" width="78" height="7" rx="3.5" />
          <rect x="42" y="113" width="46" height="7" rx="3.5" /><rect x="98" y="113" width="146" height="7" rx="3.5" />
          <rect x="24" y="137" width="74" height="7" rx="3.5" /><rect x="108" y="137" width="94" height="7" rx="3.5" />
        </g>
        <rect x="24" y="174" width="272" height="36" rx="11" fill="#071929" stroke="#3de1e0" strokeOpacity=".28" />
        <circle cx="44" cy="192" r="6" fill="#51f1df" /><rect x="59" y="188" width="84" height="7" rx="3.5" fill="#8deee8" opacity=".62" />
        <rect x="229" y="184" width="51" height="16" rx="8" fill="#1ccfc9" opacity=".7" />
      </g>
      <path className="process-visual__beam" d="M376 242 423 89l38 167Z" fill="url(#launch-beam)" />
      <g className="process-visual__rocket" transform="translate(374 62)">
        <path d="M42 92C18 72 23 37 58 7c15 34 8 67-16 85Z" fill="#d8fffb" />
        <path d="M42 92 22 111l5-31M42 92l22 13-4-31" fill="#26d9dc" />
        <circle cx="47" cy="48" r="10" fill="#086c93" stroke="#56eee9" strokeWidth="4" />
        <path d="m37 101 5 28 9-27" fill="#58fff2" opacity=".82" />
      </g>
      <g className="process-visual__status" transform="translate(300 275)"><rect width="152" height="40" rx="20" /><circle cx="22" cy="20" r="6" /><text x="38" y="25">READY TO LAUNCH</text></g>
    </svg>
  )
}

const visuals = {
  strategy: <StrategyVisual />,
  design: <DesignVisual />,
  build: <BuildVisual />,
}

export default function ProcessStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const activeRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let inView = false
    let cardTops: number[] = []

    const measureCards = () => {
      cardTops = cardRefs.current.map(card => card ? Number.parseFloat(window.getComputedStyle(card).top) : Number.NaN)
    }

    const update = () => {
      frame = 0
      const section = sectionRef.current
      const stage = stageRef.current
      if (!section || !stage) return

      const rect = stage.getBoundingClientRect()
      const stickyTop = Math.min(132, window.innerHeight * .16)
      const travel = Math.max(rect.height - window.innerHeight * .72, 1)
      const progress = Math.max(0, Math.min(1, (stickyTop - rect.top) / travel))
      section.style.setProperty('--process-progress', progress.toFixed(4))

      let nextActive = 0
      cardRefs.current.forEach((card, index) => {
        if (!card) return
        const cardTop = Number.isFinite(cardTops[index]) ? cardTops[index] : stickyTop
        if (card.getBoundingClientRect().top <= cardTop + 24) nextActive = index
      })
      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive
        setActiveIndex(nextActive)
      }

      if (!reducedMotion.matches) {
        cardRefs.current.forEach((card, index) => {
          if (!card) return
          const cardTop = Number.isFinite(cardTops[index]) ? cardTops[index] : stickyTop
          const local = Math.max(-1, Math.min(1, (cardTop - card.getBoundingClientRect().top) / Math.max(window.innerHeight * .45, 1)))
          card.style.setProperty('--art-shift', `${(local * 14).toFixed(2)}px`)
          card.style.setProperty('--glow-shift', `${(local * -9).toFixed(2)}px`)
        })
      }
    }

    const requestUpdate = () => {
      if (inView && !frame) frame = window.requestAnimationFrame(update)
    }

    const handleResize = () => {
      measureCards()
      requestUpdate()
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) requestUpdate()
    }, { rootMargin: '20% 0px' })

    measureCards()
    observer.observe(root)
    frame = window.requestAnimationFrame(update)
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', handleResize)
    reducedMotion.addEventListener('change', requestUpdate)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', handleResize)
      reducedMotion.removeEventListener('change', requestUpdate)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="process-stack" ref={sectionRef} aria-labelledby="process-stack-title">
      <div className="process-stack__atmosphere" aria-hidden="true" />
      <div className="container process-stack__inner">
        <header className="process-stack__heading">
          <span className="eyebrow"><span />OUR PROCESS</span>
          <h2 id="process-stack-title">From idea to <span>impact.</span></h2>
          <p>A clear, collaborative process designed to turn your vision into powerful digital experiences.</p>
        </header>

        <div className="process-stack__stage" ref={stageRef}>
          <nav className="process-stack__progress" aria-label="Process progress">
            <div className="process-stack__progress-line" aria-hidden="true"><i /></div>
            <ol>
              {steps.map((step, index) => (
                <li key={step.number} className={`${index === activeIndex ? 'is-active' : ''}${index < activeIndex ? ' is-complete' : ''}`} aria-current={index === activeIndex ? 'step' : undefined}>
                  <span className="process-stack__marker" aria-hidden="true">{step.number}</span>
                  <span>{step.shortLabel}</span>
                </li>
              ))}
            </ol>
          </nav>

          <div className="process-stack__cards">
            {steps.map((step, index) => (
              <article
                className={`process-card process-card--${step.tone}${index === activeIndex ? ' is-active' : ''}`}
                key={step.number}
                ref={element => { cardRefs.current[index] = element }}
                style={{ '--stack-index': index } as CSSProperties}
              >
                <div className="process-card__glow" aria-hidden="true" />
                <div className="process-card__content">
                  <span className="process-card__step">{step.number}<i />{step.label}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <ul aria-label={`${step.title} capabilities`}>
                    {step.tags.map(tag => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
                <div className="process-card__visual" aria-hidden="true">{visuals[step.tone]}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
