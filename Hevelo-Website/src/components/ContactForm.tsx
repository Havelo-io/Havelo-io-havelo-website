import { useState, type FormEvent } from 'react'
import { ArrowIcon, CheckIcon } from './Icons'

type FormStatus = { type: 'idle' | 'loading' | 'success' | 'error'; message: string }

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setStatus({ type: 'loading', message: 'Sending your inquiry...' })

    const data = Object.fromEntries(new FormData(form).entries())
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact'

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json().catch(() => ({})) as { message?: string }
      if (!response.ok) throw new Error(result.message || 'We could not send your inquiry. Please try again.')
      form.reset()
      setStatus({ type: 'success', message: result.message || 'Thank you. Your inquiry has been sent successfully.' })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Something went wrong. Please try again.' })
    }
  }

  return (
    <form className="ct-form hv-ink" onSubmit={handleSubmit} noValidate>
      <h2>Start a project</h2>
      <p className="ct-form__intro">Two sentences is enough. We will take it from there.</p>
      <div className="ct-row">
        <div className="ct-field"><label htmlFor="cf-name">Name</label><input id="cf-name" name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required placeholder="Your name" /></div>
        <div className="ct-field"><label htmlFor="cf-email">Email</label><input id="cf-email" name="email" type="email" autoComplete="email" maxLength={120} required placeholder="you@company.com" /></div>
      </div>
      <div className="ct-row">
        <div className="ct-field"><label htmlFor="cf-phone">Phone</label><input id="cf-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="Optional" /></div>
        <div className="ct-field"><label htmlFor="cf-subject">Subject</label><input id="cf-subject" name="subject" type="text" minLength={3} maxLength={120} required placeholder="How can we help?" /></div>
      </div>
      <div className="ct-field"><label htmlFor="cf-message">What do you need?</label><textarea id="cf-message" name="message" minLength={20} maxLength={3000} required rows={5} placeholder="Website, app, or something else. Tell us about your goals and timeline." /></div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="cf-website">Company website</label><input id="cf-website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <button className="hv-btn hv-btn--primary ct-submit" type="submit" disabled={status.type === 'loading'}>
        {status.type === 'loading' ? 'Sending...' : 'Send enquiry'}{status.type !== 'loading' && <ArrowIcon />}
      </button>
      <p className={`ct-status ${status.type}`} role="status" aria-live="polite">
        {status.type === 'success' && <CheckIcon />}{status.message}
      </p>
      <div className="ct-hours"><span>Reply within 1 working day</span><span>Mon–Fri</span></div>
    </form>
  )
}
