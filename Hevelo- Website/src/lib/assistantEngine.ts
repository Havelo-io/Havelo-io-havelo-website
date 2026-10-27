import { assistantKnowledge, technologySummary } from '../data/assistantKnowledge'
import type { AssistantAction, AssistantContext, AssistantQuickReply, AssistantReply, ProjectDraft } from '../types/assistant'

const DEFAULT_QUICK_REPLIES: AssistantQuickReply[] = [
  { label: 'Services', value: 'What services do you offer?' },
  { label: 'Technologies', value: 'What technologies do you use?' },
  { label: 'Start a project', value: 'I want to start a project' },
  { label: 'Contact', value: 'How can I contact HAVELO?' },
]

export const initialAssistantContext = (): AssistantContext => ({ project: {}, projectStep: null, stepHistory: [] })

export const welcomeMessage = {
  text: "Hi! I’m HAVELO’s website assistant. I can explain our services, technologies, process, or help shape a project brief.",
  quickReplies: DEFAULT_QUICK_REPLIES,
}

const route = (label: string, href: string): AssistantAction => ({ label, href, kind: 'route' })
const external = (label: string, href: string): AssistantAction => ({ label, href, kind: 'external' })

function normalize(value: string) {
  return value.toLocaleLowerCase().normalize('NFKD').replace(/[’']/g, '').replace(/[^\p{L}\p{N}\s&/+.-]/gu, ' ').replace(/\s+/g, ' ').trim()
}

function editDistance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index)
  for (let i = 1; i <= a.length; i += 1) {
    let diagonal = row[0]
    row[0] = i
    for (let j = 1; j <= b.length; j += 1) {
      const previous = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1))
      diagonal = previous
    }
  }
  return row[b.length]
}

function wordMatch(input: string, keyword: string) {
  const cleanInput = normalize(input)
  const cleanKeyword = normalize(keyword)
  if (cleanInput.includes(cleanKeyword)) return true
  if (cleanKeyword.includes(' ')) return false
  return cleanInput.split(' ').some(word => word === cleanKeyword || (word.length >= 5 && cleanKeyword.length >= 5 && editDistance(word, cleanKeyword) <= 1))
}

function hasAny(input: string, words: string[]) {
  return words.some(word => wordMatch(input, word))
}

function copyContext(context: AssistantContext): AssistantContext {
  return { ...context, project: { ...context.project } }
}

const projectTypeOptions: AssistantQuickReply[] = [
  { label: 'Website', value: 'Website Development' },
  { label: 'Mobile app', value: 'Mobile App Development' },
  { label: 'UI/UX', value: 'UI/UX Design' },
  { label: 'Custom software', value: 'Custom Software Development' },
  { label: 'Support', value: 'Maintenance & Support' },
]

const websiteTypeOptions: AssistantQuickReply[] = [
  { label: 'Business Website', value: 'Business Website' },
  { label: 'E-commerce Store', value: 'E-commerce Store' },
  { label: 'Portfolio Website', value: 'Portfolio Website' },
  { label: 'Booking Website', value: 'Booking Website' },
  { label: 'Custom Web Application', value: 'Custom Web Application' },
  { label: 'Not Sure Yet', value: 'Not Sure Yet' },
]

const mobileTypeOptions: AssistantQuickReply[] = [
  { label: 'E-commerce App', value: 'E-commerce App' },
  { label: 'Booking App', value: 'Booking App' },
  { label: 'Business App', value: 'Business App' },
  { label: 'Educational App', value: 'Educational App' },
  { label: 'Custom App', value: 'Custom App' },
]

function detectProjectType(input: string) {
  if (hasAny(input, ['ecommerce', 'e-commerce', 'online store', 'website', 'site', 'landing page', 'portfolio', 'sell things online'])) return 'Website Development'
  if (hasAny(input, ['mobile app', 'android', 'ios'])) return 'Mobile App Development'
  if (hasAny(input, ['ui ux', 'ui/ux', 'prototype', 'wireframe', 'product design'])) return 'UI/UX Design'
  if (hasAny(input, ['custom software', 'business system', 'dashboard', 'automation', 'web app'])) return 'Custom Software Development'
  if (hasAny(input, ['maintenance', 'support', 'bug fix', 'update'])) return 'Maintenance & Support'
  return undefined
}

function projectSummary(draft: ProjectDraft) {
  return [
    `Project: ${draft.type ?? 'Not specified'}`,
    draft.subtype ? `Project type: ${draft.subtype}` : '',
    `Goal: ${draft.goal ?? 'Not specified'}`,
    draft.products ? `Products: ${draft.products}` : '',
    `Features: ${draft.features ?? 'Not specified'}`,
    draft.audience ? `Target users: ${draft.audience}` : '',
    draft.platform ? `Platform: ${draft.platform}` : '',
    draft.design ? `Design: ${draft.design}` : '',
    draft.business ? `Business: ${draft.business}` : '',
    draft.workflow ? `Current workflow: ${draft.workflow}` : '',
    `Timeline: ${draft.timeline ?? 'Flexible'}`,
    `Budget: ${draft.budget ?? 'To discuss'}`,
  ].filter(Boolean).join('\n')
}

function projectActions(draft: ProjectDraft): AssistantAction[] {
  const message = `Hi HAVELO, I would like to discuss a project.\n\n${projectSummary(draft)}`
  return [
    external('Send via WhatsApp', `${assistantKnowledge.contact.whatsapp}?text=${encodeURIComponent(message)}`),
    route('Contact HAVELO', assistantKnowledge.routes.contact),
  ]
}

function continueProject(input: string, context: AssistantContext): AssistantReply {
  const next = copyContext(context)
  const value = input.trim()
  const skip = hasAny(value, ['skip', 'not sure', 'flexible', 'discuss later', 'prefer to discuss'])

  const ask = (step: AssistantContext['projectStep'], text: string, quickReplies?: AssistantQuickReply[]): AssistantReply => {
    if (context.projectStep) next.stepHistory = [...context.stepHistory, context.projectStep]
    next.projectStep = step
    return { text, quickReplies, context: next }
  }

  if (hasAny(value, ['go back', 'previous question', 'back'])) {
    const previous = next.stepHistory.at(-1) ?? 'type'
    next.stepHistory = next.stepHistory.slice(0, -1)
    next.projectStep = previous
    const prompts: Partial<Record<NonNullable<AssistantContext['projectStep']>, string>> = {
      type: 'What kind of project would you like to discuss?', websiteType: 'What type of website are you planning?',
      products: 'What kind of products would you like to sell?', goal: 'What should the project help you achieve?',
      features: 'Which features are most important?', design: 'Do you already have a design or brand identity, or would you like help with design too?',
      mobileType: 'What kind of mobile app are you thinking about?', purpose: 'What is the main purpose of the app?',
      audience: 'Who will use it?', platform: 'Do you prefer Android, iOS, both, or are you not sure yet?',
      business: 'What kind of business do you run?', workflow: 'How does the current workflow work, and what problem should the software solve?',
      users: 'Who will use the software?', timeline: 'Do you have a preferred timeline?', budget: 'Would you like to share an approximate budget range?',
    }
    return { text: prompts[previous as NonNullable<typeof previous>] ?? 'Tell me what you would like to change.', context: next }
  }

  if (context.projectStep === 'type') {
    const type = detectProjectType(value)
    if (!type) return { text: 'What kind of project is it? Choose an option or describe it in your own words.', quickReplies: projectTypeOptions, context: next }
    next.project.type = type
    if (type === 'Website Development') return ask('websiteType', 'Absolutely! 😊 What type of website are you planning?', websiteTypeOptions)
    if (type === 'Mobile App Development') return ask('mobileType', 'Sure! What kind of mobile app are you thinking about?', mobileTypeOptions)
    if (type === 'Custom Software Development') return ask('business', 'Of course! What kind of business do you run, and what problem would you like the software to solve?')
    return ask('goal', `Great — ${type}. What should this project help you or your users achieve?`)
  }

  if (context.projectStep === 'websiteType') {
    next.project.subtype = value
    if (hasAny(value, ['ecommerce', 'e-commerce', 'online store', 'e-commerce store'])) return ask('products', 'Nice! What kind of products would you like to sell?')
    return ask('goal', 'Great choice. What is the main goal of the website, and who is it for?')
  }
  if (context.projectStep === 'products') {
    next.project.products = value
    return ask('features', 'That sounds great! Which features matter most — for example online payments, a shopping cart, product categories, or delivery management?')
  }
  if (context.projectStep === 'mobileType') {
    next.project.subtype = value
    return ask('purpose', 'What is the main purpose of the app?')
  }
  if (context.projectStep === 'purpose') {
    next.project.goal = value
    return ask('audience', 'Who are the main people who will use the app?')
  }
  if (context.projectStep === 'audience') {
    next.project.audience = value
    return ask('features', 'What are the most important features you would like it to include?')
  }
  if (context.projectStep === 'business') {
    next.project.business = value
    return ask('workflow', 'How does the current workflow work, and what problem should the software solve?')
  }
  if (context.projectStep === 'workflow') {
    next.project.workflow = value
    return ask('features', 'Which functions are essential for the first useful version?')
  }
  if (context.projectStep === 'goal') {
    next.project.goal = value
    return ask('features', 'What are the most important features or functions you have in mind?', [{ label: 'Not sure yet', value: 'Not sure yet' }])
  }
  if (context.projectStep === 'features') {
    next.project.features = value
    if (next.project.type === 'Website Development') return ask('design', 'Got it! Do you already have a design or brand identity, or would you like help with design too?', [
      { label: 'Need design too', value: 'I would like help with design too' }, { label: 'Already have a design', value: 'I already have a design' },
    ])
    if (next.project.type === 'Mobile App Development') return ask('platform', 'Do you prefer Android, iOS, both platforms, or are you not sure yet?', [
      { label: 'Android', value: 'Android' }, { label: 'iOS', value: 'iOS' }, { label: 'Both', value: 'Android and iOS' }, { label: 'Not sure', value: 'Not sure yet' },
    ])
    return ask('timeline', 'Do you have a preferred timeline? This is optional.', [
      { label: '2–4 weeks', value: 'Within 2–4 weeks' },
      { label: '1–3 months', value: 'Within 1–3 months' },
      { label: 'Flexible', value: 'My timeline is flexible' },
      { label: 'Skip', value: 'Skip timeline' },
    ])
  }
  if (context.projectStep === 'design') {
    next.project.design = value
    return ask('timeline', 'Perfect! Would you like me to prepare a short project summary for the HAVELO team? You can add a preferred timeline first, or skip it.', [
      { label: '2–4 weeks', value: 'Within 2–4 weeks' }, { label: '1–3 months', value: 'Within 1–3 months' },
      { label: 'Flexible', value: 'My timeline is flexible' }, { label: 'Skip', value: 'Skip timeline' },
    ])
  }
  if (context.projectStep === 'platform') {
    next.project.platform = value
    return ask('timeline', 'Thanks — that gives me a useful picture. Do you have a preferred timeline? You can skip this.', [
      { label: '2–4 weeks', value: 'Within 2–4 weeks' }, { label: '1–3 months', value: 'Within 1–3 months' },
      { label: 'Flexible', value: 'My timeline is flexible' }, { label: 'Skip', value: 'Skip timeline' },
    ])
  }
  if (context.projectStep === 'timeline') {
    if (!skip) next.project.timeline = value
    return ask('budget', 'Would you like to share an approximate budget or range? You can skip this.', [
      { label: 'I have a range', value: 'I have a budget range' },
      { label: 'Discuss later', value: 'Prefer to discuss later' },
      { label: 'Skip', value: 'Skip budget' },
    ])
  }
  if (context.projectStep === 'budget') {
    if (!skip) next.project.budget = value
    next.projectStep = 'review'
    return { text: `Here is your project brief:\n\n${projectSummary(next.project)}\n\nNothing is sent automatically. Choose an option when you are ready.`, actions: projectActions(next.project), quickReplies: [{ label: 'Start over', value: 'Reset project brief' }], context: next }
  }
  return { text: `Your current brief is:\n\n${projectSummary(next.project)}\n\nNothing is sent automatically.`, actions: projectActions(next.project), quickReplies: [{ label: 'Start over', value: 'Reset project brief' }], context: next }
}

type Intent = { id: string; keywords: string[]; reply: (context: AssistantContext) => Omit<AssistantReply, 'context'> }

function pick<T>(items: readonly T[]) {
  return items[Math.floor(Date.now() / 1000) % items.length]
}

function casualReply(input: string, context: AssistantContext): AssistantReply | null {
  const clean = normalize(input)
  const keep = copyContext(context)
  if (/^(hi+|hey+|hello|hey bro|yo|good morning|good afternoon|good evening|ayubowan|ආයුබෝවන්)[!. ]*$/.test(clean)) {
    return { text: pick([
      'Hey there! 👋 Welcome to HAVELO. How can I help you today?',
      'Hello! Welcome to HAVELO. Need help with a website, app, or digital solution?',
      'Hii! 😊 Looking to build something awesome, or just exploring what HAVELO does?',
    ]), quickReplies: DEFAULT_QUICK_REPLIES, context: keep }
  }
  if (hasAny(clean, ['how are you', 'how are u', 'how r u', 'hows it going', 'how is it going'])) {
    return { text: pick(["I’m doing great, thanks for asking! 😊 How can I help you today?", 'Doing well and ready to help! What would you like to know about HAVELO?']), quickReplies: DEFAULT_QUICK_REPLIES, context: keep }
  }
  if (/^(thanks|thank you|thankyou|thx|cheers)[!. ]*$/.test(clean)) {
    return { text: pick(["You’re welcome! Let me know if you need anything else.", 'Happy to help! I’m here if another question comes up.']), context: keep }
  }
  if (/^(bye|goodbye|see you|see ya|later)[!. ]*$/.test(clean)) {
    return { text: pick(['See you soon! Thanks for visiting HAVELO.', 'Goodbye! Come back whenever you want to explore another idea.']), context: keep }
  }
  if (/^(ok|okay|alright|sounds good)[!. ]*$/.test(clean)) {
    return { text: context.projectStep ? 'Great — answer the current question whenever you’re ready, or say “skip” or “go back”.' : 'Great! What would you like to explore next?', quickReplies: context.projectStep ? undefined : DEFAULT_QUICK_REPLIES, context: keep }
  }
  if (hasAny(clean, ['what can you do', 'help me', 'help'])) {
    return { text: 'I can explain HAVELO’s verified services and technologies, answer process or contact questions, and guide you through a short website, app, or software project brief.', quickReplies: DEFAULT_QUICK_REPLIES, context: keep }
  }
  return null
}

const intents: Intent[] = [
  { id: 'greeting', keywords: ['hello', 'hi', 'hii', 'hey', 'good morning', 'good afternoon', 'good evening', 'ayubowan', 'ආයුබෝවන්'], reply: () => ({ text: 'Hey there! 👋 Welcome to HAVELO. How can I help you today?', quickReplies: DEFAULT_QUICK_REPLIES }) },
  { id: 'services', keywords: ['services', 'what do you do', 'offer', 'capabilities'], reply: () => ({ text: `HAVELO offers ${assistantKnowledge.services.map(service => service.title).join(', ')}. Which area would you like to explore?`, actions: [route('View Services', assistantKnowledge.routes.services)], quickReplies: projectTypeOptions }) },
  { id: 'website', keywords: ['website', 'ecommerce', 'e-commerce', 'online store', 'landing page', 'portfolio website'], reply: () => ({ text: 'We create business websites, portfolios, landing pages, corporate sites, and e-commerce experiences. Each one is planned around your audience, content, goals, and required integrations.', actions: [route('Explore Website Development', '/services#svc-1'), route('Contact HAVELO', '/contact')] }) },
  { id: 'mobile', keywords: ['mobile app', 'android', 'ios', 'react native', 'flutter'], reply: () => ({ text: 'HAVELO designs and develops Android, iOS, and cross-platform mobile applications, from product flows and interfaces through development and support.', actions: [route('Explore Mobile Development', '/services#svc-2'), route('Contact HAVELO', '/contact')] }) },
  { id: 'design', keywords: ['ui ux', 'ui/ux', 'design', 'wireframe', 'prototype'], reply: () => ({ text: 'Our UI/UX work covers user flows, wireframes, prototypes, website design, mobile app design, dashboards, and complete product design.', actions: [route('Explore UI/UX Design', '/services#svc-3'), route('Contact HAVELO', '/contact')] }) },
  { id: 'software', keywords: ['custom software', 'web app', 'business system', 'dashboard', 'automation'], reply: () => ({ text: 'We build custom software around real business workflows, including management systems, admin dashboards, automation tools, and tailored web platforms.', actions: [route('Explore Custom Software', '/services#svc-4'), route('Contact HAVELO', '/contact')] }) },
  { id: 'support', keywords: ['maintenance', 'support', 'bug', 'monitoring', 'updates'], reply: () => ({ text: 'HAVELO provides updates, bug fixes, monitoring, performance improvements, feature updates, and ongoing technical support.', actions: [route('Explore Support', '/services#svc-5'), route('Contact HAVELO', '/contact')] }) },
  { id: 'academic', keywords: ['academic', 'student project', 'final year', 'semester project'], reply: () => ({ text: 'The website lists academic project support, but this assistant does not route to an academic-specific project form. Please contact the HAVELO team to discuss whether your request is suitable.', actions: [route('Contact HAVELO', '/contact'), external('WhatsApp', assistantKnowledge.contact.whatsapp)] }) },
  { id: 'technology', keywords: ['technology', 'technologies', 'tech stack', 'framework', 'language', 'database', 'cloud'], reply: () => ({ text: `These are the technologies currently published on the HAVELO website:\n\n${technologySummary}`, actions: [route('See the technology orbit', '/#technologies')] }) },
  { id: 'pricing', keywords: ['price', 'pricing', 'cost', 'budget', 'quote', 'how much'], reply: () => ({ text: assistantKnowledge.pricing, actions: [route('Contact for a quote', '/contact'), external('Ask on WhatsApp', assistantKnowledge.contact.whatsapp)] }) },
  { id: 'timeline', keywords: ['timeline', 'how long', 'delivery', 'deadline', 'duration'], reply: () => ({ text: assistantKnowledge.timelines, actions: [route('Contact HAVELO', '/contact')] }) },
  { id: 'process', keywords: ['process', 'how do you work', 'workflow', 'steps'], reply: () => ({ text: `Our process has four practical stages:\n\n${assistantKnowledge.process.map((stage, index) => `${index + 1}. ${stage.name} — ${stage.detail}`).join('\n')}`, actions: [route('About our approach', '/about')] }) },
  { id: 'portfolio', keywords: ['portfolio', 'projects', 'work', 'case study', 'examples'], reply: () => ({ text: 'The Projects page currently presents clearly labelled sample project types while HAVELO’s first client work goes live. We will not represent those samples as completed client projects.', actions: [route('View Projects', '/projects')] }) },
  { id: 'about', keywords: ['about', 'who are you', 'havelo', 'company', 'team'], reply: () => ({ text: `${assistantKnowledge.company.summary} Our motto is “${assistantKnowledge.company.motto}”`, actions: [route('About HAVELO', '/about')] }) },
  { id: 'contact', keywords: ['contact', 'email', 'phone', 'call', 'whatsapp', 'location', 'hours'], reply: () => ({ text: `You can reach HAVELO at ${assistantKnowledge.contact.email}, call ${assistantKnowledge.contact.phone}, or use WhatsApp. We are based in ${assistantKnowledge.contact.location}. Hours: ${assistantKnowledge.contact.hours}.`, actions: [external('WhatsApp', assistantKnowledge.contact.whatsapp), external('Email', `mailto:${assistantKnowledge.contact.email}`), route('Contact page', '/contact')] }) },
]

function scoreIntent(input: string, intent: Intent) {
  return intent.keywords.reduce((score, keyword) => score + (wordMatch(input, keyword) ? normalize(keyword).split(' ').length * 3 : 0), 0)
}

export function getAssistantReply(input: string, context: AssistantContext): AssistantReply {
  const clean = input.trim()
  if (!clean) return { text: 'Type a question or choose one of the options below.', quickReplies: DEFAULT_QUICK_REPLIES, context }

  const casual = casualReply(clean, context)
  if (casual) return casual

  if (hasAny(clean, ['reset project brief', 'start over'])) {
    const next = initialAssistantContext()
    next.projectStep = 'type'
    return { text: 'Let’s start a fresh project brief. What would you like to create?', quickReplies: projectTypeOptions, context: next }
  }
  if (context.projectStep) {
    if (hasAny(clean, ['how much', 'price', 'pricing', 'cost', 'quote'])) {
      return { text: `${assistantKnowledge.pricing} We can continue your current project brief when you’re ready.`, actions: [route('Request a quotation', '/contact')], quickReplies: [{ label: 'Continue discussing', value: 'Continue' }], context }
    }
    if (hasAny(clean, ['contact you', 'contact havelo', 'email you', 'whatsapp', 'phone number', 'call you'])) {
      return { text: `You can contact HAVELO by WhatsApp, email at ${assistantKnowledge.contact.email}, or phone on ${assistantKnowledge.contact.phone}. Your project discussion will remain here while you decide.`, actions: [external('WhatsApp', assistantKnowledge.contact.whatsapp), external('Email', `mailto:${assistantKnowledge.contact.email}`), route('Contact page', '/contact')], context }
    }
    if (/^continue( discussing)?[!. ]*$/.test(normalize(clean))) {
      return continueProject('go back', { ...context, stepHistory: [...context.stepHistory, context.projectStep] })
    }
    return continueProject(clean, context)
  }

  const projectSignal = hasAny(clean, ['start a project', 'need a', 'want a', 'want to build', 'build me', 'project idea', 'get a quote', 'build an app', 'build a site', 'sell things online'])
  if (projectSignal) {
    const next = copyContext(context)
    const type = detectProjectType(clean)
    if (type) {
      next.project = { type }
      if (type === 'Website Development') {
        next.projectStep = 'websiteType'
        return { text: 'Absolutely! 😊 What type of website are you planning?', quickReplies: websiteTypeOptions, context: next }
      }
      if (type === 'Mobile App Development') {
        next.projectStep = 'mobileType'
        return { text: 'Sure! What kind of mobile app are you thinking about?', quickReplies: mobileTypeOptions, context: next }
      }
      if (type === 'Custom Software Development') {
        next.projectStep = 'business'
        return { text: 'Of course! What kind of business do you run, and what problem would you like the software to solve?', context: next }
      }
      next.projectStep = 'goal'
      return { text: `Let’s shape your ${type.toLowerCase()} brief. What should the project help you or your users achieve?`, context: next }
    }
    next.project = {}
    next.projectStep = 'type'
    return { text: 'Let’s shape a short project brief. What would you like to create?', quickReplies: projectTypeOptions, context: next }
  }

  const ranked = intents.map(intent => ({ intent, score: scoreIntent(clean, intent) })).sort((a, b) => b.score - a.score)
  if (ranked[0]?.score) {
    const next = copyContext(context)
    next.lastIntent = ranked[0].intent.id
    return { ...ranked[0].intent.reply(next), context: next }
  }

  return {
    text: "I’m not certain I understood that. I can help with HAVELO’s services, technologies, process, pricing approach, contact details, or a new project brief.",
    quickReplies: DEFAULT_QUICK_REPLIES,
    actions: [route('Contact the team', '/contact')],
    context,
  }
}
