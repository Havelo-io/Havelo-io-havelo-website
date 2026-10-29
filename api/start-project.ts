import { saveInquiry } from './_lib/supabase'

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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const currencyCodes = ['LKR', 'USD', 'GBP', 'EUR', 'INR', 'AUD', 'CAD']

// Academic Projects service. Keep these lists in sync with src/config/startProject.ts.
const academicService = 'Academic Projects'
const academicStages = ['Idea', 'Planning', 'In Progress', 'Needs Improvement']
const academicDomains = ['Web', 'Mobile App', 'UI/UX', 'AI/ML', 'IoT', 'Other']
const academicSupport = ['Planning and Guidance', 'UI/UX Design', 'Development Support', 'Debugging and Testing', 'Documentation and Presentation']

function clean(value: unknown, max: number) {
  return String(value ?? '').trim().slice(0, max)
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, ' ')
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character] ?? character)
}

function row(label: string, value: string) {
  return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value || 'Not provided')}</p>`
}

function parseAcademic(value: unknown) {
  const source = value && typeof value === 'object' ? value as Record<string, unknown> : {}
  const support = Array.isArray(source.support) ? source.support.map(item => oneLine(clean(item, 60))) : []
  return {
    category: oneLine(clean(source.category, 80)),
    institution: oneLine(clean(source.institution, 120)),
    course: oneLine(clean(source.course, 120)),
    term: oneLine(clean(source.term, 60)),
    deadline: clean(source.deadline, 10),
    stage: oneLine(clean(source.stage, 40)),
    domain: oneLine(clean(source.domain, 40)),
    support: support.filter((item, index) => academicSupport.includes(item) && support.indexOf(item) === index),
  }
}

function validAcademic(academic: ReturnType<typeof parseAcademic>) {
  const deadline = new Date(`${academic.deadline}T00:00:00Z`)
  return (
    academic.category.length >= 2 && academic.institution.length >= 2 && academic.course.length >= 2 && academic.term.length >= 1 &&
    /^\d{4}-\d{2}-\d{2}$/.test(academic.deadline) && !Number.isNaN(deadline.getTime()) && deadline.toISOString().startsWith(academic.deadline) &&
    academicStages.includes(academic.stage) && academicDomains.includes(academic.domain) && academic.support.length > 0
  )
}

// Receives the Start Project form and emails it through Resend.
// Uses the same environment variables as api/contact.ts.
export default async function handler(request: RequestLike, response: ResponseLike) {
  response.setHeader('Content-Type', 'application/json')
  if (request.method !== 'POST') return response.status(405).json({ message: 'Method not allowed.' })

  let body: Record<string, unknown>
  try {
    body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body as Record<string, unknown>
  } catch {
    return response.status(400).json({ message: 'The request body is not valid JSON.' })
  }

  const inquiry = {
    service: oneLine(clean(body?.service, 80)),
    projectType: oneLine(clean(body?.projectType, 80)),
    description: clean(body?.description, 2000),
    region: oneLine(clean(body?.region, 60)),
    currency: clean(body?.currency, 3).toUpperCase(),
    currencyName: oneLine(clean(body?.currencyName, 40)),
    budget: oneLine(clean(body?.budget, 60)),
    timeline: oneLine(clean(body?.timeline, 60)),
    name: oneLine(clean(body?.name, 80)),
    email: clean(body?.email, 120).toLowerCase(),
    phone: oneLine(clean(body?.phone, 30)),
    company: oneLine(clean(body?.company, 120)),
    website: clean(body?.website, 200),
  }
  const isAcademic = inquiry.service === academicService
  const academic = isAcademic ? parseAcademic(body?.academic) : null

  if (inquiry.website) return response.status(200).json({ message: 'Thank you. Your inquiry has been sent successfully.' })
  if (
    inquiry.service.length < 2 || inquiry.projectType.length < 2 || inquiry.region.length < 2 ||
    !currencyCodes.includes(inquiry.currency) || inquiry.budget.length < 3 || inquiry.timeline.length < 3 ||
    inquiry.name.length < 2 || !emailPattern.test(inquiry.email) ||
    (isAcademic && (!academic || !validAcademic(academic) || inquiry.description.length < 10))
  ) {
    return response.status(400).json({ message: 'Please check the required fields and try again.' })
  }

  try {
    await saveInquiry({
      inquiry_type: 'project',
      full_name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone || null,
      company_name: inquiry.company || null,
      message: inquiry.description || '',
      service: inquiry.service,
      project_type: inquiry.projectType,
      region: inquiry.region,
      currency: inquiry.currency,
      currency_name: inquiry.currencyName,
      budget: inquiry.budget,
      timeline: inquiry.timeline,
      academic_details: academic,
      status: 'new',
    })
  } catch (error) {
    console.error('Project inquiry database save failed', error)
    return response.status(503).json({ message: 'We could not save your project inquiry right now. Please try again shortly.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) return response.status(200).json({ message: 'Your project inquiry was saved successfully. Email notifications are not configured yet.' })

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: inquiry.email,
        subject: `New HAVELO project inquiry: ${inquiry.service} (${inquiry.currency})`,
        html: [
          '<h1>New project inquiry</h1>',
          row('Service', inquiry.service),
          row('Project type', inquiry.projectType),
          row('Region', inquiry.region),
          row('Budget currency', `${inquiry.currency} — ${inquiry.currencyName}`),
          row('Estimated budget', `${inquiry.budget} (${inquiry.currency})`),
          row('Timeline', inquiry.timeline),
          row('Name', inquiry.name),
          row('Email', inquiry.email),
          row('Phone / WhatsApp', inquiry.phone),
          row('Company', inquiry.company),
          ...(academic ? [
            '<h2>Academic project details</h2>',
            row('Academic project category', academic.category),
            row('University / institution', academic.institution),
            row('Degree / course', academic.course),
            row('Academic year / semester', academic.term),
            row('Submission deadline', academic.deadline),
            row('Project stage', academic.stage),
            row('Project domain', academic.domain),
            row('Support required', academic.support.join(', ')),
          ] : []),
          `<p><strong>${academic ? 'Project description and expected deliverables' : 'Project description'}:</strong></p>`,
          `<p>${escapeHtml(inquiry.description || 'Not provided').replace(/\n/g, '<br>')}</p>`,
          `<p><em>The budget is a range chosen by the client in ${escapeHtml(inquiry.currency)}. It is not a quote and was not converted from another currency.</em></p>`,
        ].join(''),
      }),
    })

    if (!resendResponse.ok) throw new Error('Email provider rejected the request.')
    return response.status(200).json({ message: 'Thank you. Your inquiry has been sent successfully.' })
  } catch (error) {
    console.error('Start project delivery failed', error)
    return response.status(200).json({ message: 'Your project inquiry was saved successfully, but the email notification could not be sent.' })
  }
}
