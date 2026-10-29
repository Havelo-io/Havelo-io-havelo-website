# HAVELO Website

A production-ready five-page company website for HAVELO, built with React, TypeScript, Vite, and a Vercel serverless contact endpoint.

## Quick start on Windows

Do not open `index.html` directly. It is the Vite source entry and requires a local development server.

Double-click `START-HAVELO-WEBSITE.cmd`. It installs dependencies when needed, starts the local server, and opens the website in your browser automatically. Keep the command window open while viewing the site.

## Welcome intro animation

A branded splash (aurora glow, drawn H logo, letter-by-letter wordmark, loader, curtain lift) plays every time the site loads or refreshes (set `playOncePerSession: true` in `INTRO_CONFIG` to show it only once per browser session). Edit `src/components/IntroSplash.tsx` (`INTRO_CONFIG`) to change timings, and the `.intro-*` block at the end of `src/styles.css` for the look.

## Interaction animations

- **Scroll-drawn timeline:** the Home "Our Process" line draws as you scroll (`src/components/ProcessTimeline.tsx`).
- **Curtain page transitions:** internal links play a curtain wipe between pages (`src/components/PageTransition.tsx`). It is dark in dark mode and white in light mode.
- The spotlight cards, magnetic buttons and glow cursor were removed.
- Animations are skipped for visitors who prefer reduced motion.

## Team photos

The About page team section lives in `src/components/TeamSection.tsx`. Each member's photo is loaded from `public/assets/team/<slug>.webp` (`.jpg` and `.png` also work). Slugs: `mohamed`, `anonymous`, `umair`, `hussain`. Until a photo exists the card shows a profile icon. Use square, head-and-shoulders photos, around 480x480.

## Start Project page

The `/start-project` page is a four-step inquiry form (Service, Project, Budget, Contact). Services include **Academic Projects**: choosing it adds academic fields (category, institution, course, year or semester, deadline, stage, domain, support required, description and deliverables) to the Project step. The navbar "Start a project" button and the Home "Get Started" button open it.

- `src/pages/StartProject.tsx` is the page and form logic.
- `src/config/startProject.ts` holds every editable list: services, project types, regions, currencies, budget ranges, timelines and phone calling codes. To add a country, add one entry to `REGIONS` (and a currency to `CURRENCIES` if it is new).
- Budget ranges are fixed example ranges per currency, not confirmed prices and not converted with an exchange rate. The submitted inquiry includes the region, currency code and chosen range.
- `api/start-project.ts` validates the inquiry (including the `academic` object for Academic Projects) and emails every field through Resend. It uses the same `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` variables as the contact form. Set `VITE_START_PROJECT_ENDPOINT` to use another backend.
- The `/api` functions only run on Vercel (or with `vercel dev`). With plain `npm run dev` the form shows a delivery error, which is expected.

## Footer

The footer (`src/components/Footer.tsx`) has the brand block, "Why choose HAVELO?", quick links, contact email and Follow us icons. The Facebook and Instagram links are the `SOCIAL_LINKS` list at the top of that file. The Instagram entry currently uses the same URL as Facebook, so replace it when HAVELO has its own Instagram link.

## Pages

- Home
- About Us
- Services
- Pricing
- Contact

## Run locally

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` before testing real contact delivery.

## Production build

```bash
npm run build
npm run preview
```

The finished static frontend is written to `dist/`.

## Contact form setup

The form posts to `/api/contact`. The included Vercel serverless function validates the request, checks a hidden spam field, escapes user input, and sends the inquiry through the Resend API.

Set these environment variables in Vercel:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

`CONTACT_FROM_EMAIL` must use a sender domain verified in Resend. For another backend, set `VITE_CONTACT_ENDPOINT` to the new HTTPS endpoint. The endpoint should accept JSON and return a JSON object with a `message` field.

## Recommended deployment

1. Push this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Add the three server environment variables.
4. Deploy.

The included `vercel.json` keeps the five React routes working when opened directly.

## Design system

### Typography

- Primary: Manrope
- Fallbacks: Inter, system UI, Segoe UI, sans-serif
- Display weight: 700 or 800
- Body weight: 400 or 500

### Color palette

| Token | Hex | Use |
| --- | --- | --- |
| Cyan | `#15DCE0` | Primary action and accents |
| Aqua | `#55F3EE` | Highlights and gradients |
| Teal | `#079BAB` | Links and supporting accents |
| Deep | `#070B12` | Dark background |
| White | `#F4FFFF` | High contrast text |
| Mist | `#F5F8FA` | Light background |

### Layout

- Maximum content width: 1160px
- Section spacing: 110px desktop, 80px mobile
- Card radius: 20px to 28px
- Touch targets: minimum 40px
- Main breakpoints: 980px, 760px, 520px

### Icons

The project uses lightweight inline SVG icons with rounded strokes. Continue with Lucide-style outline icons if more are added. Keep the stroke width near 1.8 and avoid mixing filled icon styles.

## SEO titles and descriptions

| Page | Meta title | Meta description |
| --- | --- | --- |
| Home | HAVELO \| Digital Products Built for Growth | HAVELO designs and develops modern websites, mobile apps, and custom software solutions that help businesses grow. |
| About | About HAVELO \| Where Ideas Are Brought To Life | Meet HAVELO, a software development startup focused on turning ideas into thoughtful websites, mobile apps, and digital solutions. |
| Services | Software Development Services \| HAVELO | Explore HAVELO website development, mobile app development, UI/UX design, custom software, and ongoing technical support. |
| Pricing | Flexible Software Project Packages \| HAVELO | Choose a HAVELO project package for startups, growing teams, or enterprise needs. Contact us for clear custom pricing. |
| Contact | Contact HAVELO \| Start Your Software Project | Talk to HAVELO about your website, mobile app, custom software, or digital solution. Send us your project inquiry. |

## Asset notes

- `public/assets/havelo-logo.png` is the supplied HAVELO logo.
- `public/assets/havelo-hero.webp` is an original generated hero visual created and optimized for this website.
- The hero asset is loaded above the fold. All other visuals are CSS based to keep the site lightweight.

## Accessibility and performance

- Semantic landmarks and headings
- Keyboard-visible focus states
- Skip link
- Accessible mobile navigation and theme controls
- Reduced-motion support
- Persistent theme preference through local storage
- Responsive images and CSS-only supporting visuals
- No unnecessary runtime UI library


## Supabase inquiry backend setup

1. Open the existing HAVELO Supabase project and go to **SQL Editor**.
2. Run `supabase/migrations/20261029_inquiries.sql`. It creates/extends `public.inquiries` without deleting existing rows.
3. In local `.env.local` (project root beside `package.json`), set `SUPABASE_URL` and `SUPABASE_SECRET_KEY`. These are server-only variables; never prefix them with `VITE_`.
4. Add the same two variables to the Vercel project's Environment Variables for Preview and Production, then redeploy.
5. Keep `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` configured for email notifications. The inquiry is saved before email is attempted, so an email outage will not discard the submission.

The `api/_lib/supabase.ts` helper is server-only and writes through the Supabase REST API. Do not import it into `src/` browser code. The dashboard is not wired to read inquiries yet; that is a separate next step requiring authenticated admin access and row-level security policies.
