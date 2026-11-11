import type { ReactNode } from 'react'
import { CapIcon, CartIcon, CodeIcon, PenIcon, PhoneIcon, PosIcon, SettingsIcon, SparkIcon, TargetIcon } from '../components/Icons'

export type ServiceItem = {
  id: string
  number: string
  slug: string
  title: string
  description: string
  highlights: readonly [string, string, string]
  detail: string
  image: string
  imageAlt: string
  icon: ReactNode
}

export const servicesCatalog: readonly ServiceItem[] = [
  {
    id: 'svc-1', number: '01', slug: 'website', title: 'Website Development',
    description: 'Fast, responsive, and modern websites designed to represent your brand and drive results.',
    highlights: ['Business and corporate websites', 'Landing pages and web applications', 'Performance and SEO optimization'],
    detail: 'From first structure to launch, we shape accessible websites around clear business goals, maintainable content, and measurable user journeys.',
    image: '/assets/services/website.webp', imageAlt: 'Modern website interface displayed on a premium desktop monitor', icon: <CodeIcon />,
  },
  {
    id: 'svc-2', number: '02', slug: 'mobile', title: 'Mobile App Development',
    description: 'Intuitive, high-performance mobile applications built for modern users.',
    highlights: ['Android and iOS applications', 'Cross-platform development', 'Maintenance and improvements'],
    detail: 'We plan the product flow, build the application, connect the services behind it, and refine the experience across real devices.',
    image: '/assets/services/mobile.webp', imageAlt: 'Premium smartphone displaying a polished mobile application', icon: <PhoneIcon />,
  },
  {
    id: 'svc-4', number: '03', slug: 'software', title: 'Custom Software Development',
    description: 'Tailored software solutions that simplify operations and solve business challenges.',
    highlights: ['Business management systems', 'Workflow automation', 'Secure and scalable applications'],
    detail: 'Purpose-built platforms connect the processes your team already uses, reduce repetitive work, and create a reliable foundation for growth.',
    image: '/assets/services/software.webp', imageAlt: 'Team reviewing a modern business software dashboard', icon: <SparkIcon />,
  },
  {
    id: 'svc-3', number: '04', slug: 'design', title: 'UI/UX Design',
    description: 'Beautiful, accessible digital experiences shaped around real users.',
    highlights: ['Product and interface design', 'Wireframes and interactive prototypes', 'Design systems and usability'],
    detail: 'Research, information architecture, prototypes, and reusable design systems help us make complex products feel clear and natural.',
    image: '/assets/services/design.webp', imageAlt: 'Professional UI and UX design workspace with interface prototypes', icon: <PenIcon />,
  },
  {
    id: 'svc-7', number: '05', slug: 'social-marketing', title: 'Social Media Marketing',
    description: 'Creative, strategic marketing that helps businesses reach and engage their audiences.',
    highlights: ['Content strategy and creation', 'Campaign planning and management', 'Analytics and performance insights'],
    detail: 'We connect creative direction with campaign structure and clear reporting, so every channel supports a coherent business objective.',
    image: '/assets/services/generated/social-marketing.webp', imageAlt: 'Social media campaign analytics and content workspace', icon: <TargetIcon />,
  },
  {
    id: 'svc-8', number: '06', slug: 'pos', title: 'POS System',
    description: 'Modern point-of-sale solutions designed to make daily business operations easier.',
    highlights: ['Sales and inventory management', 'Reporting and business insights', 'Retail and restaurant workflows'],
    detail: 'Connected sales, stock, and reporting tools give staff a faster checkout experience and owners a clearer operational view.',
    image: '/assets/services/generated/pos-system.webp', imageAlt: 'Modern touchscreen POS terminal with receipt printer and card reader', icon: <PosIcon />,
  },
  {
    id: 'svc-6', number: '07', slug: 'academic', title: 'Academic Projects',
    description: 'Structured technical guidance for student projects and research prototypes.',
    highlights: ['Mini and final-year projects', 'Research and working prototypes', 'Web, mobile, and UI/UX guidance'],
    detail: 'We help students turn requirements into a clear plan, a working implementation, and an understandable technical outcome.',
    image: '/assets/services/academic.webp', imageAlt: 'Students collaborating on a software project in a modern workspace', icon: <CapIcon />,
  },
  {
    id: 'svc-10', number: '08', slug: 'ecommerce', title: 'E-commerce Solutions',
    description: 'High-performing online stores designed for a smooth shopping experience.',
    highlights: ['Online storefront development', 'Payment and order management', 'Product and customer management'],
    detail: 'We connect storefront experience, catalog operations, checkout, and order management into a dependable commerce platform.',
    image: '/assets/services/generated/ecommerce.webp', imageAlt: 'E-commerce storefront shown across a laptop and smartphone', icon: <CartIcon />,
  },
  {
    id: 'svc-5', number: '09', slug: 'support', title: 'Maintenance and Support',
    description: 'Reliable care that keeps your digital products secure, stable, and effective.',
    highlights: ['Updates and improvements', 'Monitoring and issue response', 'Ongoing technical support'],
    detail: 'After launch, we help protect performance, resolve issues, deliver improvements, and keep the product aligned with changing needs.',
    image: '/assets/services/support.webp', imageAlt: 'Technical specialist monitoring reliable digital systems', icon: <SettingsIcon />,
  },
]
