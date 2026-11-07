import { Link } from 'react-router-dom'
import { ArrowIcon, CheckIcon } from '../components/Icons'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SEO from '../components/SEO'

const plans = [
  { name: 'Starter', audience: 'Suitable for startups', description: 'A polished foundation for a new digital presence.', features: ['Basic website', 'Responsive design', 'Contact form', 'Basic SEO'] },
  { name: 'Professional', audience: 'Most Popular', description: 'A custom experience for growing businesses.', features: ['Advanced website', 'Custom UI/UX', 'SEO optimization', 'CMS integration', 'Analytics'], popular: true },
  { name: 'Enterprise', audience: 'For larger businesses', description: 'Flexible technology for complex goals and long-term scale.', features: ['Custom solutions', 'Mobile app integration', 'Advanced features', 'Priority support', 'Scalable architecture'] },
]

export default function Pricing() {
  return (
    <>
      <SEO title="Flexible Software Project Packages | HAVELO" description="Choose a HAVELO project package for startups, growing teams, or enterprise needs. Contact us for clear custom pricing." path="/pricing" />
      <PageHero label="Pricing" title="The right scope for where you are going." text="Every project is different. Choose a starting point, then we will tailor the scope to your goals." />
      <section className="section section--tight">
        <div className="container pricing-grid">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 80}>
              <article className={`pricing-card glass-card ${plan.popular ? 'pricing-card--popular' : ''}`}>
                {plan.popular && <span className="popular-badge">Most Popular</span>}
                <span className="plan-name">{plan.name}</span>
                <h2>{plan.audience}</h2>
                <p>{plan.description}</p>
                <div className="custom-price">Contact us <span>for custom pricing</span></div>
                <ul>{plan.features.map(feature => <li key={feature}><span className="check-dot"><CheckIcon /></span>{feature}</li>)}</ul>
                <Link className={`button ${plan.popular ? '' : 'button--secondary'}`} to={`/contact?package=${plan.name.toLowerCase()}`}>Choose {plan.name}<ArrowIcon /></Link>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="container pricing-note"><p>Need a tailored combination of services? <Link to="/contact">Let's plan it together.</Link></p></div>
      </section>
    </>
  )
}
