import ContactForm from '../components/ContactForm'
import { ClockIcon, MailIcon } from '../components/Icons'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SEO from '../components/SEO'

const details = [
  { icon: <MailIcon />, label: 'Email', value: 'havelo.lk@gmail.com', href: 'mailto:havelo.lk@gmail.com' },
  { icon: <ClockIcon />, label: 'Business Hours', value: 'Monday to Friday\n9:00 AM - 6:00 PM' },
]

export default function Contact() {
  return (
    <>
      <SEO title="Contact HAVELO | Start Your Software Project" description="Talk to HAVELO about your website, mobile app, custom software, or digital solution. Send us your project inquiry." path="/contact" />
      <PageHero label="Contact Us" title="Tell us what you want to bring to life." text="Share your idea, challenge, or next goal. We will get back to you with a clear way forward." />
      <section className="section section--tight">
        <div className="container contact-layout">
          <Reveal>
            <div className="contact-sidebar">
              <span className="eyebrow"><span />Start a conversation</span>
              <h2>We would love to hear from you.</h2>
              <p>Whether you have a clear brief or an early idea, send us a message and we will help you find the next step.</p>
              <div className="contact-details">
                {details.map(detail => (
                  <div className="contact-detail" key={detail.label}>
                    <span className="icon-box">{detail.icon}</span>
                    <div><small>{detail.label}</small>{detail.href ? <a href={detail.href}>{detail.value}</a> : <span>{detail.value}</span>}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={90}><ContactForm /></Reveal>
        </div>
      </section>
    </>
  )
}
