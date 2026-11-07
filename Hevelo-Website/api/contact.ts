/// <reference types="node" />

type RequestLike = {
  method?: string
  body?: unknown
  headers: Record<string, string | string[] | undefined>
}

type ResponseLike = {
  status: (code: number) => ResponseLike
  json: (body: Record<string, unknown>) => void
  setHeader: (name: string, value: string) => void
}

type Inquiry = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  website?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value: unknown, max: number) {
  return String(value ?? '').trim().slice(0, max)
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character] ?? character)
}

export default async function handler(request: RequestLike, response: ResponseLike) {
  response.setHeader('Content-Type', 'application/json')
  if (request.method !== 'POST') return response.status(405).json({ message: 'Method not allowed.' })

  let body: Record<string, unknown>
  try {
    body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body as Record<string, unknown>
  } catch {
    return response.status(400).json({ message: 'The request body is not valid JSON.' })
  }
  const inquiry: Inquiry = {
    name: clean(body?.name, 80),
    email: clean(body?.email, 120).toLowerCase(),
    phone: clean(body?.phone, 30),
    subject: clean(body?.subject, 120),
    message: clean(body?.message, 3000),
    website: clean(body?.website, 200),
  }

  if (inquiry.website) return response.status(200).json({ message: 'Thank you. Your inquiry has been sent successfully.' })
  if (inquiry.name.length < 2 || !emailPattern.test(inquiry.email) || inquiry.subject.length < 3 || inquiry.message.length < 20) {
    return response.status(400).json({ message: 'Please check the required fields and try again.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) return response.status(503).json({ message: 'Email delivery is not configured yet. Please email havelo.lk@gmail.com.' })

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: inquiry.email,
        subject: `New HAVELO inquiry: ${inquiry.subject}`,
        html: `<h1>New website inquiry</h1><p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p><p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p><p><strong>Phone:</strong> ${escapeHtml(inquiry.phone || 'Not provided')}</p><p><strong>Subject:</strong> ${escapeHtml(inquiry.subject)}</p><p><strong>Message:</strong></p><p>${escapeHtml(inquiry.message).replace(/\n/g, '<br>')}</p>`,
      }),
    })

    if (!resendResponse.ok) throw new Error('Email provider rejected the request.')
    return response.status(200).json({ message: 'Thank you. Your inquiry has been sent successfully.' })
  } catch (error) {
    console.error('Contact form delivery failed', error)
    return response.status(500).json({ message: 'We could not send your inquiry. Please try again or email us directly.' })
  }
}
