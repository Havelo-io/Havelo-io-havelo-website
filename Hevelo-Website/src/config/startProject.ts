// Single source of truth for the Start Project form.
// Edit this file to change services, project types, regions, currencies or budget ranges.
// The budget ranges below are example ranges, NOT confirmed HAVELO prices.

export type ServiceId = 'website' | 'mobile' | 'design' | 'software' | 'support' | 'academic'
export type ServiceIcon = 'code' | 'phone' | 'pen' | 'spark' | 'settings' | 'cap'
export type CurrencyCode = 'LKR' | 'USD' | 'GBP' | 'EUR' | 'INR' | 'AUD' | 'CAD'
export type RegionId = 'lk' | 'us' | 'gb' | 'eu' | 'in' | 'au' | 'ca' | 'other'

export type Service = { id: ServiceId; title: string; text: string; icon: ServiceIcon; projectTypes: string[] }
export type Currency = { code: CurrencyCode; name: string; budgets: string[] }
export type Region = { id: RegionId; name: string; badge: string; currency: CurrencyCode; countries?: string[] }
export type CallingCode = { id: string; code: string; name: string }

// Academic Projects (student projects and assessments). The project types of this service are the
// academic categories, and the form asks for the extra details listed below.
export const ACADEMIC_SERVICE_ID: ServiceId = 'academic'
export const ACADEMIC_CATEGORIES = ['Mini Project', 'Semester Project', 'Final-Year Project', 'Research Project', 'Other']
export const ACADEMIC_STAGES = ['Idea', 'Planning', 'In Progress', 'Needs Improvement']
export const ACADEMIC_DOMAINS = ['Web', 'Mobile App', 'UI/UX', 'AI/ML', 'IoT', 'Other']
export const ACADEMIC_SUPPORT = ['Planning and Guidance', 'UI/UX Design', 'Development Support', 'Debugging and Testing', 'Documentation and Presentation']

export const SERVICES: Service[] = [
  { id: 'website', title: 'Website Development', text: 'Business sites, portfolios, online stores', icon: 'code', projectTypes: ['Business Website', 'Portfolio Website', 'E-commerce / Online Store', 'Landing Page', 'Other'] },
  { id: 'mobile', title: 'Mobile App Development', text: 'Android and iOS applications', icon: 'phone', projectTypes: ['Android App', 'iOS App', 'Android and iOS', 'Not Sure Yet'] },
  { id: 'design', title: 'UI/UX Design', text: 'Wireframes, prototypes, product design', icon: 'pen', projectTypes: ['Website Design', 'Mobile App Design', 'Dashboard Design', 'Complete Product Design', 'Other'] },
  { id: 'software', title: 'Custom Software Development', text: 'Systems built around your business', icon: 'spark', projectTypes: ['Business Management System', 'Admin Dashboard', 'Workflow Automation', 'Custom Business Software', 'Other'] },
  { id: 'support', title: 'Maintenance & Support', text: 'Updates, fixes, and monitoring', icon: 'settings', projectTypes: ['Bug Fixes', 'Website Maintenance', 'Performance Improvements', 'Feature Updates', 'Other'] },
  { id: 'academic', title: 'Academic Projects', text: 'Student projects and assessments', icon: 'cap', projectTypes: ACADEMIC_CATEGORIES },
]

export const NOT_SURE = 'Not sure yet'

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  LKR: { code: 'LKR', name: 'Sri Lankan Rupee', budgets: ['Under LKR 50,000', 'LKR 50,000–100,000', 'LKR 100,000–250,000', 'LKR 250,000–500,000', 'LKR 500,000+', NOT_SURE] },
  USD: { code: 'USD', name: 'US Dollar', budgets: ['Under $250', '$250–500', '$500–1,000', '$1,000–2,500', '$2,500+', NOT_SURE] },
  GBP: { code: 'GBP', name: 'British Pound', budgets: ['Under £250', '£250–500', '£500–1,000', '£1,000–2,500', '£2,500+', NOT_SURE] },
  EUR: { code: 'EUR', name: 'Euro', budgets: ['Under €250', '€250–500', '€500–1,000', '€1,000–2,500', '€2,500+', NOT_SURE] },
  INR: { code: 'INR', name: 'Indian Rupee', budgets: ['Under ₹10,000', '₹10,000–25,000', '₹25,000–50,000', '₹50,000–100,000', '₹100,000+', NOT_SURE] },
  AUD: { code: 'AUD', name: 'Australian Dollar', budgets: ['Under A$400', 'A$400–800', 'A$800–1,600', 'A$1,600–4,000', 'A$4,000+', NOT_SURE] },
  CAD: { code: 'CAD', name: 'Canadian Dollar', budgets: ['Under C$350', 'C$350–700', 'C$700–1,400', 'C$1,400–3,500', 'C$3,500+', NOT_SURE] },
}

export const DEFAULT_CURRENCY: CurrencyCode = 'USD'
export const OTHER_REGION_ID: RegionId = 'other'

const EUROZONE = ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'IE', 'PT', 'FI', 'GR', 'LU', 'SK', 'SI', 'EE', 'LV', 'LT', 'MT', 'CY', 'HR']

// `badge` is a short country code shown beside the name (flag emoji do not render on Windows browsers).
// `countries` is only used to suggest a region from the browser language.
export const REGIONS: Region[] = [
  { id: 'lk', name: 'Sri Lanka', badge: 'LK', currency: 'LKR', countries: ['LK'] },
  { id: 'us', name: 'United States', badge: 'US', currency: 'USD', countries: ['US'] },
  { id: 'gb', name: 'United Kingdom', badge: 'GB', currency: 'GBP', countries: ['GB'] },
  { id: 'eu', name: 'Eurozone', badge: 'EU', currency: 'EUR', countries: EUROZONE },
  { id: 'in', name: 'India', badge: 'IN', currency: 'INR', countries: ['IN'] },
  { id: 'au', name: 'Australia', badge: 'AU', currency: 'AUD', countries: ['AU'] },
  { id: 'ca', name: 'Canada', badge: 'CA', currency: 'CAD', countries: ['CA'] },
  { id: 'other', name: 'Other regions', badge: 'WW', currency: DEFAULT_CURRENCY },
]

export const TIMELINES = ['As soon as possible', 'Within 2–4 weeks', 'Within 1–3 months', 'My timeline is flexible']

export const CALLING_CODES: CallingCode[] = [
  { id: 'lk', code: '+94', name: 'Sri Lanka' },
  { id: 'us', code: '+1', name: 'United States' },
  { id: 'ca', code: '+1', name: 'Canada' },
  { id: 'gb', code: '+44', name: 'United Kingdom' },
  { id: 'in', code: '+91', name: 'India' },
  { id: 'au', code: '+61', name: 'Australia' },
  { id: 'nz', code: '+64', name: 'New Zealand' },
  { id: 'de', code: '+49', name: 'Germany' },
  { id: 'fr', code: '+33', name: 'France' },
  { id: 'it', code: '+39', name: 'Italy' },
  { id: 'es', code: '+34', name: 'Spain' },
  { id: 'nl', code: '+31', name: 'Netherlands' },
  { id: 'ae', code: '+971', name: 'UAE' },
  { id: 'sa', code: '+966', name: 'Saudi Arabia' },
  { id: 'qa', code: '+974', name: 'Qatar' },
  { id: 'sg', code: '+65', name: 'Singapore' },
  { id: 'my', code: '+60', name: 'Malaysia' },
  { id: 'pk', code: '+92', name: 'Pakistan' },
  { id: 'bd', code: '+880', name: 'Bangladesh' },
  { id: 'jp', code: '+81', name: 'Japan' },
  { id: 'cn', code: '+86', name: 'China' },
  { id: 'za', code: '+27', name: 'South Africa' },
  { id: 'ng', code: '+234', name: 'Nigeria' },
]

export const DEFAULT_CALLING_CODE_ID = 'lk'

export function getRegion(id: string): Region | undefined {
  return REGIONS.find(region => region.id === id)
}

export function getService(id: string): Service | undefined {
  return SERVICES.find(service => service.id === id)
}

/** Suggests a region from the browser language (for example "en-GB"). Never required, always changeable. */
export function suggestRegion(): RegionId | '' {
  if (typeof navigator === 'undefined') return ''
  const tags = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]
  for (const tag of tags) {
    const country = tag?.split('-')[1]?.toUpperCase()
    if (!country) continue
    const match = REGIONS.find(region => region.countries?.includes(country))
    if (match) return match.id
  }
  return ''
}

/** Suggests a phone calling code from the browser language. Falls back to Sri Lanka. */
export function suggestCallingCodeId(): string {
  if (typeof navigator === 'undefined') return DEFAULT_CALLING_CODE_ID
  const tags = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]
  for (const tag of tags) {
    const country = tag?.split('-')[1]?.toLowerCase()
    if (country && CALLING_CODES.some(item => item.id === country)) return country
  }
  return DEFAULT_CALLING_CODE_ID
}
