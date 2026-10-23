import { useState } from 'react'

const technologies = [
  { id: 'react', name: 'React', category: 'UI FRAMEWORK', detail: 'Reusable components bring consistent, responsive interfaces to life.' },
  { id: 'typescript', name: 'TypeScript', category: 'LANGUAGE', detail: 'Typed JavaScript makes complex interfaces easier to develop and maintain.' },
  { id: 'vite', name: 'Vite', category: 'BUILD TOOL', detail: 'Fast feedback during development, with optimized builds for the web.' },
] as const

export default function TechnologiesShowcase() {
  const [selectedId, setSelectedId] = useState<(typeof technologies)[number]['id']>('react')
  const selected = technologies.find(technology => technology.id === selectedId) ?? technologies[0]

  return (
    <section className="home-technologies" id="technologies" aria-labelledby="technologies-title">
      <div className="home-technologies__decor" aria-hidden="true"><i /><i /><span /></div>
      <div className="container home-technologies__layout">
        <div className="home-technologies__copy">
          <span className="eyebrow"><span />TECHNOLOGIES</span>
          <h2 id="technologies-title">Built with tools we <em>trust.</em></h2>
          <p>A modern web foundation, from expressive interfaces to dependable code. Explore the technologies behind our website.</p>
          <div className="home-technologies__categories" role="group" aria-label="Technology categories">
            {technologies.map(technology => (
              <button key={technology.id} type="button" aria-pressed={selectedId === technology.id} onClick={() => setSelectedId(technology.id)}>
                <span>{technology.category === 'UI FRAMEWORK' ? 'Framework' : technology.category === 'BUILD TOOL' ? 'Tooling' : 'Language'}</span>
                <small>{technology.name}</small>
              </button>
            ))}
          </div>
          <p className="home-technologies__description" aria-live="polite"><strong>{selected.name}.</strong> {selected.detail}</p>
        </div>
        <div className="home-technologies__stage" aria-label="Technology details">
          <div className="home-technologies__orbit" aria-hidden="true" />
          <div className="technology-orbit-track">
          {technologies.map(technology => (
            <div key={technology.id} className={`technology-orbit-slot technology-orbit-slot--${technology.id}`}>
            <button
              type="button"
              className={`technology-tile technology-tile--${technology.id}${selectedId === technology.id ? ' is-selected' : ''}`}
              aria-label={`Show ${technology.name}`}
              aria-pressed={selectedId === technology.id}
              onClick={() => setSelectedId(technology.id)}
            >
              <span className={`technology-tile__mark technology-tile__mark--${technology.id}`} aria-hidden="true">
                {technology.id === 'react' ? <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="24" cy="24" rx="22" ry="8" /><ellipse cx="24" cy="24" rx="22" ry="8" transform="rotate(60 24 24)" /><ellipse cx="24" cy="24" rx="22" ry="8" transform="rotate(120 24 24)" /><circle cx="24" cy="24" r="4" fill="currentColor" stroke="none" /></svg> : technology.id === 'vite' ? <svg viewBox="0 0 48 48"><path d="M4 7 24 44 44 7 25 12Z" fill="#7658de" /><path d="m27 2-14 23h10l-2 17L36 17H25Z" fill="#f3cc38" /></svg> : 'TS'}
              </span>
              <span className="technology-tile__name">{technology.name}</span>
            </button>
            </div>
          ))}
          </div>
          <div className="home-technologies__detail" aria-live="polite" aria-atomic="true">
            <span>{selected.category}</span>
            <h3>{selected.name}</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
