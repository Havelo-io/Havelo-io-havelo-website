import { Fragment, useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowIcon, CapIcon, CheckIcon, CodeIcon, PenIcon, PhoneIcon, SettingsIcon, SparkIcon } from '../components/Icons'
import Reveal from '../components/Reveal'
import SEO from '../components/SEO'
import {
  ACADEMIC_CATEGORIES,
  ACADEMIC_DOMAINS,
  ACADEMIC_SERVICE_ID,
  ACADEMIC_STAGES,
  ACADEMIC_SUPPORT,
  CALLING_CODES,
  CURRENCIES,
  DEFAULT_CURRENCY,
  OTHER_REGION_ID,
  REGIONS,
  SERVICES,
  TIMELINES,
  getRegion,
  getService,
  suggestCallingCodeId,
  suggestRegion,
  type Currency,
  type CurrencyCode,
  type RegionId,
  type Service,
  type ServiceId,
} from '../config/startProject'

type FormState = {
  service: ServiceId | ''
  projectType: string
  description: string
  institution: string
  course: string
  term: string
  deadline: string
  stage: string
  domain: string
  support: string[]
  regionId: RegionId | ''
  otherCurrency: CurrencyCode
  budget: string
  timeline: string
  name: string
  email: string
  callingCodeId: string
  phone: string
  company: string
  website: string
}

type FieldName = 'service' | 'projectType' | 'description' | 'institution' | 'course' | 'term' | 'deadline' | 'stage' | 'domain' | 'support' | 'regionId' | 'budget' | 'timeline' | 'name' | 'email' | 'phone'
type Errors = Partial<Record<FieldName, string>>
type Status = { type: 'idle' | 'loading' | 'success' | 'error'; message: string }

const STEPS = [
  { label: 'Service', title: 'What service do you need?', help: 'Select one primary service.' },
  { label: 'Project', title: 'What type of project do you have in mind?', help: 'Choose the option that fits best.' },
  { label: 'Budget', title: 'Budget and timeline', help: 'Tell us where you are based and what you have in mind.' },
  { label: 'Contact', title: 'How can we reach you?', help: 'Share your details so our team can follow up about your project.' },
]
const LAST_STEP = STEPS.length - 1

const ICONS = { code: CodeIcon, phone: PhoneIcon, pen: PenIcon, spark: SparkIcon, settings: SettingsIcon, cap: CapIcon }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9\s\-().]+$/

function createInitialState(): FormState {
  return {
    service: '',
    projectType: '',
    description: '',
    institution: '',
    course: '',
    term: '',
    deadline: '',
    stage: '',
    domain: '',
    support: [],
    regionId: suggestRegion(),
    otherCurrency: DEFAULT_CURRENCY,
    budget: '',
    timeline: '',
    name: '',
    email: '',
    callingCodeId: suggestCallingCodeId(),
    phone: '',
    company: '',
    website: '',
  }
}

function currencyOf(form: FormState): Currency | undefined {
  const region = form.regionId ? getRegion(form.regionId) : undefined
  if (!region) return undefined
  return CURRENCIES[region.id === OTHER_REGION_ID ? form.otherCurrency : region.currency]
}

// Clears the budget only when it is not one of the options for the current currency.
function keepValidBudget(form: FormState): FormState {
  const currency = currencyOf(form)
  return currency && currency.budgets.includes(form.budget) ? form : { ...form, budget: '' }
}

function todayString() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function validate(step: number, form: FormState): Errors {
  const errors: Errors = {}
  if (step === 0 && !form.service) errors.service = 'Choose a service to continue.'
  if (step === 1 && form.service === ACADEMIC_SERVICE_ID) {
    if (!form.projectType) errors.projectType = 'Choose an academic project category.'
    if (form.institution.trim().length < 2) errors.institution = 'Enter your university or institution.'
    if (form.course.trim().length < 2) errors.course = 'Enter your degree or course.'
    if (form.term.trim().length < 1) errors.term = 'Enter your academic year or semester.'
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.deadline)) errors.deadline = 'Choose your submission deadline.'
    else if (form.deadline < todayString()) errors.deadline = 'The submission deadline cannot be in the past.'
    if (!form.stage) errors.stage = 'Choose your current project stage.'
    if (!form.domain) errors.domain = 'Choose your project domain.'
    if (form.support.length === 0) errors.support = 'Select at least one type of support.'
    if (form.description.trim().length < 10) errors.description = 'Describe your project and the deliverables you expect.'
  } else if (step === 1 && !form.projectType) errors.projectType = 'Choose a project type to continue.'
  if (step === 2) {
    if (!form.regionId) errors.regionId = 'Select your country or region.'
    if (!form.budget) errors.budget = 'Select a budget range.'
    if (!form.timeline) errors.timeline = 'Select when you would like to start.'
  }
  if (step === 3) {
    if (form.name.trim().length < 2) errors.name = 'Enter your full name.'
    if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Enter a valid email address.'
    const phone = form.phone.trim()
    if (phone) {
      const digits = phone.replace(/\D/g, '')
      if (!PHONE_PATTERN.test(phone) || digits.length < 6 || digits.length > 15) errors.phone = 'Enter a valid phone number, or leave it empty.'
    }
  }
  return errors
}

export default function StartProject() {
  const [searchParams] = useSearchParams()
  // Deep link from the Services page: /start-project?service=academic opens the wizard with that service selected.
  const presetService = getService(searchParams.get('service') || '')
  const [step, setStep] = useState(presetService ? 1 : 0)
  const [form, setForm] = useState<FormState>(() => ({ ...createInitialState(), service: presetService ? presetService.id : '' }))
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ type: 'idle', message: '' })
  const sending = useRef(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const previousStep = useRef(step)

  const service = form.service ? getService(form.service) : undefined
  const region = form.regionId ? getRegion(form.regionId) : undefined
  const currency = currencyOf(form)
  const isOtherRegion = form.regionId === OTHER_REGION_ID
  const isAcademic = form.service === ACADEMIC_SERVICE_ID
  const loading = status.type === 'loading'

  // Move focus to the new step title so keyboard and screen reader users land in the right place.
  useEffect(() => {
    if (previousStep.current === step) return
    previousStep.current = step
    heading.current?.focus()
  }, [step])

  useEffect(() => {
    if (status.type === 'success') heading.current?.focus()
  }, [status.type])

  function clearError(...names: FieldName[]) {
    setErrors(current => {
      if (!names.some(name => current[name])) return current
      const next = { ...current }
      names.forEach(name => delete next[name])
      return next
    })
  }

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(current => ({ ...current, [key]: value }))
    clearError(key as string as FieldName)
  }

  function chooseService(next: Service) {
    setForm(current => ({
      ...current,
      service: next.id,
      projectType: next.projectTypes.includes(current.projectType) ? current.projectType : '',
    }))
    clearError('service', 'projectType')
  }

  function toggleSupport(option: string) {
    setForm(current => ({ ...current, support: current.support.includes(option) ? current.support.filter(item => item !== option) : [...current.support, option] }))
    clearError('support')
  }

  function chooseRegion(regionId: RegionId | '') {
    setForm(current => keepValidBudget({ ...current, regionId }))
    clearError('regionId', 'budget')
  }

  function chooseOtherCurrency(code: CurrencyCode) {
    setForm(current => keepValidBudget({ ...current, otherCurrency: code }))
    clearError('budget')
  }

  function goNext() {
    const found = validate(step, form)
    setErrors(found)
    if (Object.keys(found).length === 0) setStep(current => current + 1)
  }

  function goBack() {
    setErrors({})
    setStatus({ type: 'idle', message: '' })
    setStep(current => Math.max(0, current - 1))
  }

  async function submit() {
    if (sending.current) return

    // Re-check every step so nothing incomplete is ever sent.
    for (let index = 0; index <= LAST_STEP; index += 1) {
      const found = validate(index, form)
      if (Object.keys(found).length > 0) {
        setErrors(found)
        setStep(index)
        return
      }
    }
    setErrors({})

    const chosenService = getService(form.service)
    const chosenRegion = getRegion(form.regionId)
    const chosenCurrency = currencyOf(form)
    if (!chosenService || !chosenRegion || !chosenCurrency) return

    const calling = CALLING_CODES.find(item => item.id === form.callingCodeId)
    const phone = form.phone.trim()
    const payload = {
      service: chosenService.title,
      projectType: form.projectType,
      description: form.description.trim(),
      academic: chosenService.id === ACADEMIC_SERVICE_ID ? {
        category: form.projectType,
        institution: form.institution.trim(),
        course: form.course.trim(),
        term: form.term.trim(),
        deadline: form.deadline,
        stage: form.stage,
        domain: form.domain,
        support: form.support,
      } : undefined,
      region: chosenRegion.name,
      currency: chosenCurrency.code,
      currencyName: chosenCurrency.name,
      budget: form.budget,
      timeline: form.timeline,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: phone ? `${calling?.code ?? ''} ${phone}`.trim() : '',
      company: form.company.trim(),
      website: form.website,
    }

    sending.current = true
    setStatus({ type: 'loading', message: '' })
    const endpoint = import.meta.env.VITE_START_PROJECT_ENDPOINT || '/api/start-project'

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => ({})) as { message?: string }
      if (!response.ok) throw new Error(result.message || 'We could not send your inquiry. Please try again.')
      setStatus({ type: 'success', message: result.message || '' })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Something went wrong. Please try again.' })
    } finally {
      sending.current = false
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step < LAST_STEP) goNext()
    else void submit()
  }

  function fieldError(name: FieldName) {
    return errors[name] ? <p className="sp-error" id={`sp-${name}-error`} role="alert">{errors[name]}</p> : null
  }

  const describedBy = (name: FieldName) => (errors[name] ? `sp-${name}-error` : undefined)

  return (
    <>
      <SEO title="Start Your Project | HAVELO" description="Tell HAVELO about your website, mobile app, design, or custom software project and choose your budget in your own currency." path="/start-project" />
      <section className="sp-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow"><span />Start a project</span>
            <h1>Let's build something <span className="gradient-text">great together.</span></h1>
            <p>Have a project in mind? Tell us a little about what you're looking for, and let's explore how we can bring your idea to life.</p>
            <small>A few quick questions to help us understand your project. No commitment required.</small>
          </Reveal>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          {status.type === 'success' ? (
            <div className="sp-card sp-success" role="status">
              <span className="sp-success-icon"><CheckIcon /></span>
              <h2 className="sp-title" ref={heading} tabIndex={-1}>Thank you for reaching out!</h2>
              <p>Your project inquiry has been received. We'll review your details and get in touch with you.</p>
              <Link className="button" to="/">Back to Home</Link>
            </div>
          ) : (
            <form className="sp-card" onSubmit={handleSubmit} noValidate>
              <ol className="sp-steps" aria-label="Progress">
                {STEPS.map((item, index) => (
                  <Fragment key={item.label}>
                    {index > 0 && <li className={`sp-line${index <= step ? ' is-done' : ''}`} aria-hidden="true" />}
                    <li className={`sp-step${index < step ? ' is-done' : ''}${index === step ? ' is-current' : ''}`} aria-current={index === step ? 'step' : undefined}>
                      <span className="sp-step-dot">{index < step ? <CheckIcon /> : index + 1}</span>
                      <span className="sp-step-label">{item.label}</span>
                    </li>
                  </Fragment>
                ))}
              </ol>

              <div className="sp-panel" key={step}>
                <h2 className="sp-title" id="sp-title" ref={heading} tabIndex={-1}>{STEPS[step].title}</h2>
                <p className="sp-help">{STEPS[step].help}</p>

                {step === 0 && (
                  <>
                    <div className="sp-services" role="group" aria-labelledby="sp-title">
                      {SERVICES.map(item => {
                        const Icon = ICONS[item.icon]
                        return (
                          <button key={item.id} type="button" className="sp-option" aria-pressed={form.service === item.id} onClick={() => chooseService(item)}>
                            <span className="icon-box"><Icon /></span>
                            <span className="sp-option-text"><strong>{item.title}</strong><small>{item.text}</small></span>
                            <span className="sp-check" aria-hidden="true"><CheckIcon /></span>
                          </button>
                        )
                      })}
                    </div>
                    {fieldError('service')}
                  </>
                )}

                {step === 1 && !isAcademic && (
                  <>
                    <div className="sp-chips" role="group" aria-labelledby="sp-title">
                      {(service?.projectTypes ?? []).map(type => (
                        <button key={type} type="button" className="sp-chip" aria-pressed={form.projectType === type} onClick={() => setField('projectType', type)}>{type}</button>
                      ))}
                    </div>
                    {fieldError('projectType')}
                    <div className="sp-group">
                      <label className="sp-label" htmlFor="sp-description">Tell us about your project <span>(optional)</span></label>
                      <textarea id="sp-description" className="sp-textarea" rows={4} maxLength={2000} value={form.description} onChange={event => setField('description', event.target.value)} placeholder="Briefly describe your idea, goals, or what you'd like us to build..." />
                    </div>
                  </>
                )}

                {step === 1 && isAcademic && (
                  <>
                    <div className="sp-group sp-group--first">
                      <div className="sp-label" id="sp-category-label">Academic project category</div>
                      <div className="sp-chips" role="group" aria-labelledby="sp-category-label">
                        {ACADEMIC_CATEGORIES.map(type => (
                          <button key={type} type="button" className="sp-chip" aria-pressed={form.projectType === type} onClick={() => setField('projectType', type)}>{type}</button>
                        ))}
                      </div>
                      {fieldError('projectType')}
                    </div>

                    <div className="sp-group">
                      <div className="sp-row">
                        <div className="sp-field">
                          <label className="sp-label" htmlFor="sp-institution">University or institution</label>
                          <input id="sp-institution" className="sp-input" type="text" autoComplete="organization" maxLength={120} required aria-required="true" aria-invalid={Boolean(errors.institution)} aria-describedby={describedBy('institution')} value={form.institution} onChange={event => setField('institution', event.target.value)} placeholder="Your university or institution" />
                          {fieldError('institution')}
                        </div>
                        <div className="sp-field">
                          <label className="sp-label" htmlFor="sp-course">Degree or course</label>
                          <input id="sp-course" className="sp-input" type="text" maxLength={120} required aria-required="true" aria-invalid={Boolean(errors.course)} aria-describedby={describedBy('course')} value={form.course} onChange={event => setField('course', event.target.value)} placeholder="For example, BSc Computer Science" />
                          {fieldError('course')}
                        </div>
                        <div className="sp-field">
                          <label className="sp-label" htmlFor="sp-term">Academic year or semester</label>
                          <input id="sp-term" className="sp-input" type="text" maxLength={60} required aria-required="true" aria-invalid={Boolean(errors.term)} aria-describedby={describedBy('term')} value={form.term} onChange={event => setField('term', event.target.value)} placeholder="For example, Year 3, Semester 1" />
                          {fieldError('term')}
                        </div>
                        <div className="sp-field">
                          <label className="sp-label" htmlFor="sp-deadline">Submission deadline</label>
                          <input id="sp-deadline" className="sp-input" type="date" min={todayString()} required aria-required="true" aria-invalid={Boolean(errors.deadline)} aria-describedby={describedBy('deadline')} value={form.deadline} onChange={event => setField('deadline', event.target.value)} />
                          {fieldError('deadline')}
                        </div>
                      </div>
                    </div>

                    <div className="sp-group">
                      <div className="sp-label" id="sp-stage-label">Project stage</div>
                      <div className="sp-chips" role="group" aria-labelledby="sp-stage-label">
                        {ACADEMIC_STAGES.map(option => (
                          <button key={option} type="button" className="sp-chip" aria-pressed={form.stage === option} onClick={() => setField('stage', option)}>{option}</button>
                        ))}
                      </div>
                      {fieldError('stage')}
                    </div>

                    <div className="sp-group">
                      <div className="sp-label" id="sp-domain-label">Project domain</div>
                      <div className="sp-chips" role="group" aria-labelledby="sp-domain-label">
                        {ACADEMIC_DOMAINS.map(option => (
                          <button key={option} type="button" className="sp-chip" aria-pressed={form.domain === option} onClick={() => setField('domain', option)}>{option}</button>
                        ))}
                      </div>
                      {fieldError('domain')}
                    </div>

                    <div className="sp-group">
                      <div className="sp-label" id="sp-support-label">Support required</div>
                      <p className="sp-hint sp-hint--tight">Select everything that applies.</p>
                      <div className="sp-chips" role="group" aria-labelledby="sp-support-label">
                        {ACADEMIC_SUPPORT.map(option => (
                          <button key={option} type="button" className="sp-chip" aria-pressed={form.support.includes(option)} onClick={() => toggleSupport(option)}>{option}</button>
                        ))}
                      </div>
                      {fieldError('support')}
                    </div>

                    <div className="sp-group">
                      <label className="sp-label" htmlFor="sp-description">Project description and expected deliverables</label>
                      <textarea id="sp-description" className="sp-textarea" rows={5} maxLength={2000} required aria-required="true" aria-invalid={Boolean(errors.description)} aria-describedby={describedBy('description')} value={form.description} onChange={event => setField('description', event.target.value)} placeholder="Describe your project idea, what you need to submit, and any requirements from your lecturer or institution..." />
                      {fieldError('description')}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="sp-group sp-group--first">
                      <label className="sp-label" htmlFor="sp-region">Which country or region are you based in?</label>
                      <div className="sp-region">
                        <span className="sp-badge" aria-hidden="true">{region?.badge ?? '--'}</span>
                        <select id="sp-region" className="sp-select" value={form.regionId} onChange={event => chooseRegion(event.target.value as RegionId | '')} aria-invalid={Boolean(errors.regionId)} aria-describedby={`sp-region-help${errors.regionId ? ' sp-regionId-error' : ''}`}>
                          <option value="">Select your region</option>
                          {REGIONS.map(item => <option key={item.id} value={item.id}>{item.name} — {item.id === OTHER_REGION_ID ? DEFAULT_CURRENCY : item.currency}</option>)}
                        </select>
                      </div>
                      <p className="sp-hint" id="sp-region-help">Choose your region to see budget options in the appropriate currency.</p>
                      {fieldError('regionId')}
                      {isOtherRegion && currency && (
                        <div className="sp-other">
                          <label className="sp-label" htmlFor="sp-currency">Currency for your budget</label>
                          <select id="sp-currency" className="sp-select sp-select--plain" value={form.otherCurrency} onChange={event => chooseOtherCurrency(event.target.value as CurrencyCode)}>
                            {Object.values(CURRENCIES).map(item => <option key={item.code} value={item.code}>{item.code} — {item.name}</option>)}
                          </select>
                          <p className="sp-hint">Your region is not listed yet, so budgets are shown in {currency.name} ({currency.code}).</p>
                        </div>
                      )}
                    </div>

                    <div className="sp-group">
                      <div className="sp-label" id="sp-budget-label">What's your estimated budget?</div>
                      <div aria-live="polite">
                        {currency && <span className="sp-pill">Estimated budget ({currency.code} — {currency.name})</span>}
                      </div>
                      {currency ? (
                        <>
                          <p className="sp-hint sp-hint--tight">Select the budget range that best fits your project.</p>
                          <div className="sp-chips" role="group" aria-labelledby="sp-budget-label">
                            {currency.budgets.map(option => (
                              <button key={option} type="button" className="sp-chip" aria-pressed={form.budget === option} onClick={() => setField('budget', option)}>{option}</button>
                            ))}
                          </div>
                        </>
                      ) : <p className="sp-hint">Choose your region above to see budget ranges in the right currency.</p>}
                      {fieldError('budget')}
                    </div>

                    <div className="sp-group">
                      <div className="sp-label" id="sp-timeline-label">When would you like to get started?</div>
                      <div className="sp-chips" role="group" aria-labelledby="sp-timeline-label">
                        {TIMELINES.map(option => (
                          <button key={option} type="button" className="sp-chip" aria-pressed={form.timeline === option} onClick={() => setField('timeline', option)}>{option}</button>
                        ))}
                      </div>
                      {fieldError('timeline')}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="sp-row">
                      <div className="sp-field">
                        <label className="sp-label" htmlFor="sp-name">Full Name</label>
                        <input id="sp-name" className="sp-input" name="name" type="text" autoComplete="name" maxLength={80} required aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('name')} value={form.name} onChange={event => setField('name', event.target.value)} placeholder="Your name" />
                        {fieldError('name')}
                      </div>
                      <div className="sp-field">
                        <label className="sp-label" htmlFor="sp-email">Email Address</label>
                        <input id="sp-email" className="sp-input" name="email" type="email" autoComplete="email" maxLength={120} required aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} value={form.email} onChange={event => setField('email', event.target.value)} placeholder="name@company.com" />
                        {fieldError('email')}
                      </div>
                      <div className="sp-field">
                        <label className="sp-label" htmlFor="sp-phone">Phone / WhatsApp <span>(optional)</span></label>
                        <div className="sp-phone">
                          <select className="sp-select sp-select--plain sp-select--code" aria-label="Country calling code" value={form.callingCodeId} onChange={event => setField('callingCodeId', event.target.value)}>
                            {CALLING_CODES.map(item => <option key={item.id} value={item.id}>{item.code} {item.name}</option>)}
                          </select>
                          <input id="sp-phone" className="sp-input" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" maxLength={20} aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy('phone')} value={form.phone} onChange={event => setField('phone', event.target.value)} placeholder="Phone number" />
                        </div>
                        {fieldError('phone')}
                      </div>
                      <div className="sp-field">
                        <label className="sp-label" htmlFor="sp-company">Company Name <span>(optional)</span></label>
                        <input id="sp-company" className="sp-input" name="company" type="text" autoComplete="organization" maxLength={120} value={form.company} onChange={event => setField('company', event.target.value)} placeholder="Your company" />
                      </div>
                    </div>
                    <label className="honeypot" aria-hidden="true">Company website<input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={event => setField('website', event.target.value)} /></label>
                    <p className="sp-privacy">We'll use your details to respond to your project inquiry.</p>
                  </>
                )}
              </div>

              {status.type === 'error' && <p className="form-status error sp-submit-error" role="alert">{status.message}</p>}

              <div className="sp-nav">
                {step > 0 ? <button type="button" className="button button--secondary" onClick={goBack} disabled={loading}>Back</button> : <span />}
                <button type="submit" className="button" disabled={loading}>
                  {step < LAST_STEP ? 'Continue' : loading ? 'Sending...' : 'Submit Project Inquiry'}
                  {!loading && <ArrowIcon />}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
