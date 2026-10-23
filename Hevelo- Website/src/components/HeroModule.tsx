import { useState } from 'react'
import { ClockIcon, RocketIcon, TargetIcon, UsersIcon } from './Icons'

const tabs = [
  { tab: 'Weekly demos', title: 'Weekly demos', text: 'Progress you can react to, not status emails', Icon: ClockIcon },
  { tab: 'Sprints', title: 'Build in sprints', text: 'Two week cycles, a live link after each', Icon: RocketIcon },
  { tab: 'Fixed scope', title: 'Fixed scope', text: 'Price and deliverables agreed before we start', Icon: TargetIcon },
  { tab: 'Direct', title: 'Direct with the builders', text: 'No account managers relaying messages', Icon: UsersIcon },
]

const LINE = 'M10 128 C58 120 92 124 132 102 S200 90 242 72 S322 50 362 40 S392 26 410 18'
const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function HeroModule() {
  const [active, setActive] = useState(0)
  const [run, setRun] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = (index: number) => {
    setActive(index)
    setRun(value => value + 1)
  }

  // The progress bar animation drives the 3.6s timer: when it ends, advance. Pausing the animation pauses the timer.
  const advance = () => go((active + 1) % tabs.length)

  return (
    <div className="ab-module-wrap">
      <div
        className="ab-module"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false) }}
      >
        <div className="ab-module__inner">
          <div className="ab-window-bar">
            <span className="ab-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="ab-window-label">Havelo / How we work</span>
            <span className="ab-live"><span className="ab-live__dot" aria-hidden="true" />live</span>
          </div>

          <div className="ab-chart">
            <svg viewBox="0 0 420 150" role="img" aria-label="Chart of steady progress rising over time">
              <defs>
                <linearGradient id="ab-stroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#2E7BA8" />
                  <stop offset=".55" stopColor="#10B4E8" />
                  <stop offset="1" stopColor="#59F4EE" />
                </linearGradient>
                <linearGradient id="ab-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#59F4EE" stopOpacity=".26" />
                  <stop offset="1" stopColor="#59F4EE" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g stroke="rgba(255,255,255,.05)" strokeWidth="1">
                <path d="M0 37.5H420M0 75H420M0 112.5H420" />
              </g>
              <path d={`${LINE} L410 150 L10 150 Z`} fill="url(#ab-area)" />
              <path id="ab-line" d={LINE} fill="none" stroke="url(#ab-stroke)" strokeWidth="2.4" strokeLinecap="round" />
              {reduced ? (
                <circle cx="410" cy="18" r="3.8" fill="#59F4EE" />
              ) : (
                <>
                  <circle cx="410" cy="18" r="2.6" fill="#59F4EE" opacity=".55" />
                  <circle r="9" fill="#59F4EE" opacity=".16">
                    <animateMotion dur="6.5s" repeatCount="indefinite"><mpath href="#ab-line" /></animateMotion>
                  </circle>
                  <circle r="3.8" fill="#59F4EE" style={{ filter: 'drop-shadow(0 0 5px #59F4EE)' }}>
                    <animateMotion dur="6.5s" repeatCount="indefinite"><mpath href="#ab-line" /></animateMotion>
                  </circle>
                </>
              )}
            </svg>
          </div>

          <div className="ab-tabs" role="tablist" aria-label="How we work">
            {tabs.map((item, index) => (
              <button
                key={item.tab}
                id={`ab-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls={`ab-panel-${index}`}
                className={`ab-tab${active === index ? ' is-on' : ''}`}
                onClick={() => go(index)}
              >
                <small>0{index + 1}</small>
                <span>{item.tab}</span>
              </button>
            ))}
          </div>

          <div className="ab-panels">
            {tabs.map(({ title, text, Icon }, index) => (
              <div
                key={title}
                id={`ab-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`ab-tab-${index}`}
                className={`ab-panel${active === index ? ' is-on' : ''}${paused ? ' is-paused' : ''}`}
              >
                <span className="ab-panel__icon"><Icon /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
                {active === index && !reduced && <span key={run} className="ab-prog" onAnimationEnd={advance} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
