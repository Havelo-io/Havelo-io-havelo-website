import Reveal from './Reveal'

const steps = [
  { number: '01', title: 'Discovery', description: 'We start by understanding your goals, audience, and project requirements.', benefits: ['Clear project scope', 'Aligned expectations', 'Strategic foundation'], visual: 'discovery' },
  { number: '02', title: 'Design', description: 'We craft intuitive interfaces and engaging experiences that delight users.', benefits: ['User-centered approach', 'Modern, scalable design systems', 'Iterative refinement'], visual: 'design' },
  { number: '03', title: 'Build', description: 'We develop scalable digital products and solutions that bring your vision to life.', benefits: ['Clean, maintainable code', 'Scalable architecture', 'Ongoing support & optimization'], visual: 'build' },
] as const

function StepIcon({ type }: { type: typeof steps[number]['visual'] }) {
  if (type === 'discovery') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
  if (type === 'design') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 16.5 11.9-12a2.1 2.1 0 0 1 3 3L7 19.5 3 21Z" /><path d="m13.7 6.7 3.6 3.6M7 19.5 4.5 17" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 8 4.5v10L12 21l-8-4.5v-10Z" /><path d="m4.5 6.8 7.5 4.3 7.5-4.3M12 11.1V21" /></svg>
}

function DiscoveryVisual() {
  return <svg viewBox="0 0 360 230" role="presentation" focusable="false">
    <defs><linearGradient id="discovery-glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#efffff" /><stop offset="1" stopColor="#b9f3ef" /></linearGradient><linearGradient id="discovery-handle" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#22d9d2" /><stop offset="1" stopColor="#057f93" /></linearGradient></defs>
    <ellipse className="process-art__orbit" cx="180" cy="113" rx="145" ry="75" /><path className="process-art__arc" d="M38 138c44-80 145-112 247-62" />
    <g className="process-art__panel" transform="translate(62 43)"><rect width="172" height="124" rx="19" fill="url(#discovery-glass)" /><circle cx="19" cy="19" r="4" fill="#08b9bf" /><circle cx="32" cy="19" r="4" fill="#7ddedc" /><rect x="18" y="38" width="96" height="7" rx="3.5" fill="#0d7f8b" opacity=".24" /><rect x="18" y="54" width="67" height="6" rx="3" fill="#0d7f8b" opacity=".14" /><path d="M20 98c20-23 40-13 58-29 17-15 39-18 70-7" fill="none" stroke="#0bb9bb" strokeWidth="3" strokeLinecap="round" /><circle cx="78" cy="69" r="5" fill="#0bb9bb" /></g>
    <g className="process-art__lens" transform="translate(194 69) rotate(-8 55 57)"><circle cx="48" cy="48" r="43" fill="rgba(219,255,252,.72)" stroke="#08aeb3" strokeWidth="9" /><circle cx="48" cy="48" r="29" fill="none" stroke="#80eae4" strokeWidth="2" /><path d="m80 79 39 42" fill="none" stroke="url(#discovery-handle)" strokeWidth="16" strokeLinecap="round" /></g>
    <circle className="process-art__dot" cx="46" cy="77" r="4" /><circle className="process-art__dot" cx="297" cy="47" r="3" />
  </svg>
}

function DesignVisual() {
  return <svg viewBox="0 0 360 230" role="presentation" focusable="false">
    <defs><linearGradient id="design-card" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" /><stop offset="1" stopColor="#d8f8f5" /></linearGradient><filter id="design-shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#087d77" floodOpacity=".18" /></filter></defs>
    <circle className="process-art__ring" cx="180" cy="115" r="86" />
    <g filter="url(#design-shadow)" transform="translate(50 42) rotate(-5 112 75)"><rect width="224" height="150" rx="18" fill="url(#design-card)" stroke="#88deda" /><path d="M0 30h224" stroke="#a5ddda" /><circle cx="17" cy="15" r="4" fill="#0fb9bb" /><circle cx="30" cy="15" r="4" fill="#8bdedb" /><rect x="15" y="44" width="57" height="91" rx="11" fill="#e3f7f5" /><rect x="86" y="44" width="120" height="44" rx="11" fill="#13bfc2" opacity=".78" /><rect x="86" y="99" width="52" height="36" rx="9" fill="#a6e9e5" /><rect x="149" y="99" width="57" height="36" rx="9" fill="#0c4251" /><rect x="26" y="59" width="35" height="6" rx="3" fill="#0b9da3" opacity=".6" /></g>
    <g filter="url(#design-shadow)" transform="translate(244 56) rotate(7 34 68)"><rect width="68" height="136" rx="17" fill="#faffff" stroke="#71d7d3" /><rect x="8" y="18" width="52" height="46" rx="10" fill="#baf1ee" /><rect x="8" y="74" width="52" height="25" rx="8" fill="#12bec0" /><rect x="8" y="109" width="35" height="6" rx="3" fill="#6ca6a9" opacity=".6" /></g>
    <path className="process-art__cursor" d="m233 168 13 33 8-14 15-6-36-13Z" />
  </svg>
}

function BuildVisual() {
  return <svg viewBox="0 0 360 230" role="presentation" focusable="false">
    <defs><linearGradient id="build-layer-top" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f7ffff" /><stop offset=".52" stopColor="#bafaff" /><stop offset="1" stopColor="#67dbe9" /></linearGradient><linearGradient id="build-layer-side" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8ce7f1" /><stop offset="1" stopColor="#03a6cb" /></linearGradient><filter id="build-glow" x="-30%" y="-50%" width="160%" height="220%"><feDropShadow dx="0" dy="10" stdDeviation="11" floodColor="#00b3d3" floodOpacity=".24" /></filter></defs>
    <ellipse className="process-art__orbit" cx="182" cy="124" rx="139" ry="78" /><path className="process-art__arc" d="M49 155c80 74 204 56 268-22" />
    <g filter="url(#build-glow)"><path d="m183 136 103 44-103 45L80 180Z" fill="#75dce9" stroke="#17c4d5" /><path d="m80 180 103 45v13L80 193Z" fill="#36bfd1" /><path d="m183 225 103-45v13l-103 45Z" fill="#0695b5" />
      <path d="m183 107 103 44-103 45L80 151Z" fill="#bbfaff" stroke="#1acbdd" /><path d="m80 151 103 45v14L80 165Z" fill="#64dce8" /><path d="m183 196 103-45v14l-103 45Z" fill="url(#build-layer-side)" />
      <path d="m183 54 103 44-103 45L80 98Z" fill="url(#build-layer-top)" stroke="#53d5e5" strokeWidth="2" /><path d="m80 98 103 45v17L80 115Z" fill="#93eaf1" /><path d="m183 143 103-45v17l-103 45Z" fill="#27bed4" /><path d="m183 77 58 25-58 25-58-25Z" fill="#d8ffff" stroke="#20bacc" /><path d="m147 100 72 0" stroke="#43ced8" strokeWidth="4" strokeLinecap="round" opacity=".5" /></g>
    <circle className="process-art__dot" cx="52" cy="57" r="4" /><circle className="process-art__dot" cx="317" cy="179" r="3" />
  </svg>
}

const visuals = { discovery: <DiscoveryVisual />, design: <DesignVisual />, build: <BuildVisual /> }

export default function ProcessGrid() {
  return <section className="home-process" id="process" aria-labelledby="home-process-title"><div className="home-process__decor" aria-hidden="true"><i /><i /><span /></div><div className="container home-process__inner">
    <Reveal><header className="home-process__heading"><span className="eyebrow"><span />OUR PROCESS</span><h2 id="home-process-title">From idea to <em>impact.</em></h2><p>A clear, collaborative process designed to turn your vision into powerful digital experiences.</p></header></Reveal>
    <div className="home-process__grid">{steps.map((step, index) => <Reveal key={step.number} delay={index * 90}><article className={`home-process-card home-process-card--${step.visual}`}><span className="home-process-card__number">{step.number}</span><span className="home-process-card__icon"><StepIcon type={step.visual} /></span><div className="home-process-card__visual" aria-hidden="true">{visuals[step.visual]}</div><div className="home-process-card__body"><h3>{step.title}</h3><p>{step.description}</p><ul aria-label={`${step.title} benefits`}>{step.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul></div></article></Reveal>)}</div>
  </div></section>
}
