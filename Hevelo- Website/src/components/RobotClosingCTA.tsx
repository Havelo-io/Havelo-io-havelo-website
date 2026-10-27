import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import robotImage from '../assets/robot/havelo-cta-robot.png'
import { ArrowIcon, BulbIcon, TargetIcon, WhatsAppIcon } from './Icons'
import { SITE } from '../config/site'

const messages = [
  "Let's build something great together!",
  'Ready to take your business to the next level?',
  'Your next big idea starts here!',
]

const features = [
  { icon: <ChatIcon />, title: 'Discuss Your Idea', text: 'Share your requirements and explore possibilities.' },
  { icon: <BulbIcon />, title: 'Get Expert Advice', text: "We'll suggest the best approach for your goals." },
  { icon: <TargetIcon />, title: 'Move Forward', text: 'Turn your idea into a practical digital solution.' },
]

function ChatIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 14a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></svg>
}

function PaperPlane() {
  return <svg className="rc-paper-plane" viewBox="0 0 240 100" aria-hidden="true">
    <path className="rc-plane-path" d="M3 88C60 77 116 67 181 28" />
    <path className="rc-plane" d="m177 29 52-20-20 52-8-22-24-10Zm24 10 28-30" />
  </svg>
}

export default function RobotClosingCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const [messageIndex, setMessageIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setText(messages[0])
      return
    }
    if (!visible) return

    const message = messages[messageIndex]
    let delay = deleting ? 26 : 48
    if (!deleting && text === message) delay = 2000
    if (deleting && text.length === 0) delay = 320

    const timer = window.setTimeout(() => {
      if (!deleting && text === message) {
        setDeleting(true)
      } else if (deleting && text.length === 0) {
        setDeleting(false)
        setMessageIndex(index => (index + 1) % messages.length)
      } else if (deleting) {
        setText(value => value.slice(0, -1))
      } else {
        setText(message.slice(0, text.length + 1))
      }
    }, delay)

    return () => window.clearTimeout(timer)
  }, [deleting, messageIndex, reducedMotion, text, visible])

  return (
    <section className="robot-closing-cta" ref={sectionRef} aria-labelledby="robot-cta-title">
      <div className="rc-background" aria-hidden="true">
        <i className="rc-background__circle" />
        <i className="rc-background__dots rc-background__dots--left" />
        <i className="rc-background__dots rc-background__dots--right" />
        <PaperPlane />
      </div>

      <div className="container rc-layout">
        <div className="rc-visual" aria-label="HAVELO robot inviting you to start a conversation">
          <div className="rc-visual__glow" aria-hidden="true" />
          <div className="rc-visual__shape" aria-hidden="true" />
          <div className="rc-orbit rc-orbit--one" aria-hidden="true" />
          <div className="rc-orbit rc-orbit--two" aria-hidden="true" />
          <span className="rc-sphere rc-sphere--left" aria-hidden="true" />
          <span className="rc-sphere rc-sphere--right" aria-hidden="true" />
          <span className="rc-particle rc-particle--one" aria-hidden="true" />
          <span className="rc-particle rc-particle--two" aria-hidden="true" />
          <div className="rc-platform" aria-hidden="true"><i /><i /><i /></div>
          <img className="rc-robot" src={robotImage} alt="HAVELO robot pointing toward the next step" />
          <div className="rc-speech" aria-live="polite">
            <i className="rc-speech__marks" aria-hidden="true" />
            <span>{text}</span><b aria-hidden="true" />
          </div>
        </div>

        <div className="rc-content">
          <span className="rc-eyebrow"><i />Next step</span>
          <h2 id="robot-cta-title">Ready to bring your<br /><em>ideas to life?</em></h2>
          <p>Whether you have a clear plan or just a rough idea, we're here to help you turn it into a real solution. Let's discuss your goals and explore the best way forward.</p>

          <div className="rc-features">
            {features.map(feature => <div className="rc-feature" key={feature.title}>
              <span className="rc-feature__icon">{feature.icon}</span>
              <span><strong>{feature.title}</strong><small>{feature.text}</small></span>
            </div>)}
          </div>

          <div className="rc-actions">
            <Link className="rc-button rc-button--primary" to="/contact">Start a Conversation <span><ArrowIcon /></span></Link>
            <a className="rc-button rc-button--secondary" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}
