import Reveal from './Reveal'

export default function PageHero({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <section className="page-hero">
      <div className="orb orb--one" />
      <div className="container">
        <Reveal>
          <span className="eyebrow"><span />{label}</span>
          <h1>{title}</h1>
          <p>{text}</p>
        </Reveal>
      </div>
    </section>
  )
}
