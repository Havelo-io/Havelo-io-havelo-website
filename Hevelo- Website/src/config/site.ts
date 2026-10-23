// Single source of truth for studio contact details. Import from here, never hardcode these strings.
const phones = [
  { label: '+94 784652345', href: 'tel:+94784652345', whatsapp: 'https://wa.me/94784652345' },
  { label: '+94 759623723', href: 'tel:+94759623723', whatsapp: 'https://wa.me/94759623723' },
] as const

export const SITE = {
  name: 'Havelo',
  email: 'havelo.lk@gmail.com',
  phones,
  // Primary number, used for single call and WhatsApp buttons.
  phone: phones[0].label,
  phoneHref: phones[0].href,
  whatsapp: 'https://wa.me/94764409226',
  whatsappLabel: '+94 764409226',
  hours: 'Mon–Fri, 9:00–18:00 (GMT+5:30)',
  location: 'Colombo, Sri Lanka',
} as const

export const callLabel = (label: string) => `Call Havelo on ${label}`
