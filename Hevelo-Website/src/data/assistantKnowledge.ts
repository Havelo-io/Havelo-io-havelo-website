import { publishedTechnologies } from '../components/technologyData'
import { SERVICES } from '../config/startProject'
import { SITE } from '../config/site'

export const assistantKnowledge = {
  company: {
    name: SITE.name,
    summary: 'HAVELO is a digital studio in Colombo, Sri Lanka. We design and build thoughtful websites, mobile apps, interfaces, and custom software.',
    motto: 'Where ideas are brought to life.',
    location: SITE.location,
    hours: SITE.hours,
  },
  services: SERVICES.map(({ id, title, text, projectTypes }) => ({ id, title, text, projectTypes })),
  technologies: publishedTechnologies.map(({ name, group }) => ({ name, group })),
  process: [
    { name: 'Discovery', detail: 'We begin by understanding the goals, audience, scope, and project requirements.' },
    { name: 'Design', detail: 'We shape clear flows, wireframes, and purposeful interfaces.' },
    { name: 'Build', detail: 'We develop the product in focused iterations and share progress along the way.' },
    { name: 'Launch and support', detail: 'We release, monitor, and support the product after launch.' },
  ],
  pricing: 'HAVELO does not publish fixed prices. Every project is scoped around its goals, features, timeline, and level of complexity before a tailored quote is prepared.',
  timelines: 'Timelines depend on scope and complexity. HAVELO confirms a realistic schedule after discovery; the project form offers urgent, 2–4 week, 1–3 month, and flexible preferences.',
  contact: {
    email: SITE.email,
    phone: SITE.phone,
    whatsapp: SITE.whatsapp,
    location: SITE.location,
    hours: SITE.hours,
  },
  routes: {
    about: '/about',
    services: '/services',
    projects: '/projects',
    contact: '/contact',
  },
} as const

export const technologySummary = Object.entries(
  assistantKnowledge.technologies.reduce<Record<string, string[]>>((groups, technology) => {
    ;(groups[technology.group] ??= []).push(technology.name)
    return groups
  }, {}),
).map(([group, names]) => `${group}: ${names.join(', ')}`).join('\n')
