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
    <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label>Full Name<input name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required placeholder="Your full name" /></label>
        <label>Email Address<input name="email" type="email" autoComplete="email" maxLength={120} required placeholder="you@company.com" /></label>
      </div>
      <div className="form-row">
        <label>Phone Number<input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="Your phone number" /></label>
        <label>Subject<input name="subject" type="text" minLength={3} maxLength={120} required placeholder="How can we help?" /></label>
      </div>
      <label>Message<textarea name="message" minLength={20} maxLength={3000} required rows={6} placeholder="Tell us about your project, goals, and timeline." /></label>
      <label className="honeypot" aria-hidden="true">Company website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-submit">
        <button className="button" type="submit" disabled={status.type === 'loading'}>
          {status.type === 'loading' ? 'Sending...' : 'Send inquiry'}{status.type !== 'loading' && <ArrowIcon />}
        </button>
        <p className={`form-status ${status.type}`} role="status" aria-live="polite">
          {status.type === 'success' && <CheckIcon />}{status.message}
        </p>
      </div>
    </form>
  )
}
