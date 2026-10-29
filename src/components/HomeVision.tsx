import { useEffect, useRef, useState } from 'react'

const VISION = 'Every remarkable digital experience begins with a bold idea. HAVELO brings together creative vision, purposeful design, and modern technology to build websites, applications, and intelligent digital solutions that solve real challenges and move businesses forward.'

function RocketVisual() {
  return <div className="home-vision__orbit" aria-hidden="true">
    <svg viewBox="0 0 520 520" role="presentation" focusable="false"><defs>
      <linearGradient id="home-rocket-body" x1=".12" y1=".08" x2=".9" y2=".92"><stop stopColor="#f3fffd" /><stop offset=".2" stopColor="#79dfd5" /><stop offset=".46" stopColor="#17616b" /><stop offset=".75" stopColor="#0e1a28" /><stop offset="1" stopColor="#071623" /></linearGradient>
      <linearGradient id="home-rocket-shadow" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#123a48" /><stop offset="1" stopColor="#06121e" /></linearGradient>
      <linearGradient id="home-rocket-fin" x1="0" y1="0" x2=".8" y2="1"><stop stopColor="#c5fff2" /><stop offset=".35" stopColor="#16b7ac" /><stop offset="1" stopColor="#0e1a28" /></linearGradient>
      <linearGradient id="home-rocket-exhaust" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#70fff5" stopOpacity="0" /><stop offset=".4" stopColor="#35ddd1" stopOpacity=".58" /><stop offset="1" stopColor="#087f83" stopOpacity="0" /></linearGradient>
      <radialGradient id="home-rocket-window" cx="38%" cy="32%"><stop stopColor="#effffd" /><stop offset=".22" stopColor="#77efe6" /><stop offset=".58" stopColor="#0ba9ad" /><stop offset="1" stopColor="#052d3a" /></radialGradient>
    </defs><g className="home-vision__craft" transform="rotate(34 260 260)">
      <path d="M218 148c-8 59 3 132 40 202l2 4 2-4c37-70 48-143 40-202-25-16-59-16-84 0Z" fill="url(#home-rocket-body)" stroke="#d6fff7" strokeOpacity=".9" strokeWidth="2" /><path d="M260 143c23 0 34 3 42 6 8 59-3 132-40 201l-2 4Z" fill="url(#home-rocket-shadow)" opacity=".72" /><path d="M231 170c4 54 12 93 29 130" fill="none" stroke="#fff" strokeLinecap="round" strokeOpacity=".68" strokeWidth="5" />
      <path d="M218 149c7-45 22-78 42-96 20 18 35 51 42 96-23-15-61-15-84 0Z" fill="url(#home-rocket-body)" stroke="#c9fffb" strokeOpacity=".74" strokeWidth="2" /><path d="M260 54c13 13 25 35 32 64-14-7-29-8-32-8Z" fill="#fff" opacity=".42" />
      <path d="M231 295c-37 18-57 57-58 104l74-43Z" fill="url(#home-rocket-fin)" stroke="#50ebe4" strokeOpacity=".7" /><path d="M289 295c37 18 57 57 58 104l-74-43Z" fill="url(#home-rocket-fin)" stroke="#50ebe4" strokeOpacity=".7" />
      <circle cx="260" cy="208" r="39" fill="#052630" stroke="#9dfff7" strokeWidth="5" /><circle cx="260" cy="208" r="29" fill="url(#home-rocket-window)" /><circle cx="250" cy="197" r="7" fill="#fff" opacity=".5" />
      <path d="M240 347h40l-7 25h-26Z" fill="#063641" stroke="#4de9e2" strokeOpacity=".72" /><ellipse cx="260" cy="372" rx="14" ry="5" fill="#9afff8" /><path d="m242 374 18 73 18-73c-12 8-24 8-36 0Z" fill="url(#home-rocket-exhaust)" opacity=".42" />
    </g></svg>{Array.from({ length: 9 }, (_, index) => <b className={`home-vision__particle home-vision__particle--${index + 1}`} key={index} />)}
  </div>
}

export default function HomeVision() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === 'undefined') { queueMicrotask(() => setVisible(true)); return }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } }, { rootMargin: '0px', threshold: .08 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return <section className={`home-vision${visible ? ' is-visible' : ''}`} ref={sectionRef} aria-labelledby="home-vision-title"><div className="home-vision__decor" aria-hidden="true"><i /><span /></div><div className="container home-vision__layout">
    <div className="home-vision__copy"><span className="eyebrow"><span />OUR VISION</span><h2 id="home-vision-title">Where bold ideas become <em>digital reality.</em></h2><p>{VISION}</p></div>
    <div className="home-vision__visual"><RocketVisual /></div>
  </div></section>
}
