// The published set follows the website owner's requested orbit inventory.
// Candidate entries remain editorial inventory and are not displayed.
export type TechnologyGroup = 'Frontend' | 'Backend' | 'Databases' | 'Cloud & DevOps' | 'Mobile'

export type PublishedTechnology = {
  id: string
  name: string
  group: TechnologyGroup
  detail: string
  logo: string
  status: 'published'
  showInOrbit?: boolean
}

export const publishedTechnologies: PublishedTechnology[] = [
  { id: 'react', name: 'React', group: 'Frontend', logo: 'react', status: 'published', detail: 'A JavaScript library for building responsive, component-based interfaces.' },
  { id: 'router', name: 'React Router', group: 'Frontend', logo: 'reactrouter', status: 'published', showInOrbit: false, detail: 'Client-side navigation that keeps the website fast and connected.' },
  { id: 'javascript', name: 'JavaScript', group: 'Frontend', logo: 'javascript', status: 'published', detail: 'The language behind interactive experiences across the web.' },
  { id: 'typescript', name: 'TypeScript', group: 'Frontend', logo: 'typescript', status: 'published', detail: 'Typed code that makes the interface easier to maintain.' },
  { id: 'html', name: 'HTML5', group: 'Frontend', logo: 'html5', status: 'published', detail: 'Semantic page structure for accessible, dependable content.' },
  { id: 'css', name: 'CSS3', group: 'Frontend', logo: 'css3', status: 'published', detail: 'Responsive layouts, visual details, and adaptive styling.' },
  { id: 'vite', name: 'Vite', group: 'Frontend', logo: 'vite', status: 'published', detail: 'Fast development feedback and optimized production builds.' },
  { id: 'functions', name: 'Vercel Functions', group: 'Backend', logo: 'vercel', status: 'published', showInOrbit: false, detail: 'Serverless endpoints power the website’s project and contact forms.' },
  { id: 'resend', name: 'Resend API', group: 'Backend', logo: 'resend', status: 'published', showInOrbit: false, detail: 'An email API integrated with the site’s inquiry endpoints.' },
  { id: 'vercel', name: 'Vercel', group: 'Cloud & DevOps', logo: 'vercel', status: 'published', showInOrbit: false, detail: 'Deployment configuration for the website and its API routes.' },
  { id: 'git', name: 'Git', group: 'Cloud & DevOps', logo: 'git', status: 'published', detail: 'Version control for dependable iteration and releases.' },
  { id: 'github', name: 'GitHub', group: 'Cloud & DevOps', logo: 'github', status: 'published', detail: 'Collaboration and source hosting for the website codebase.' },
  { id: 'mongodb', name: 'MongoDB', group: 'Databases', logo: 'mongodb', status: 'published', detail: 'A document database for flexible data models.' },
  { id: 'sqlserver', name: 'Microsoft SQL Server', group: 'Databases', logo: 'microsoftsqlserver', status: 'published', detail: 'A relational database platform from Microsoft.' },
  { id: 'swift', name: 'Swift', group: 'Mobile', logo: 'swift', status: 'published', detail: 'A language for Apple platform applications.' },
  { id: 'flutter', name: 'Flutter', group: 'Mobile', logo: 'flutter', status: 'published', detail: 'A toolkit for cross-platform application interfaces.' },
  { id: 'php', name: 'PHP', group: 'Backend', logo: 'php', status: 'published', detail: 'A scripting language for web backends.' },
  { id: 'java', name: 'Java', group: 'Backend', logo: 'java', status: 'published', detail: 'A language and platform for application development.' },
  { id: 'ruby', name: 'Ruby', group: 'Backend', logo: 'ruby', status: 'published', detail: 'A dynamic programming language for applications.' },
  { id: 'laravel', name: 'Laravel', group: 'Backend', logo: 'laravel', status: 'published', detail: 'A PHP framework for web applications.' },
  { id: 'oracle', name: 'Oracle Database', group: 'Databases', logo: 'oracle', status: 'published', detail: 'An enterprise relational database system.' },
  { id: 'aws', name: 'AWS', group: 'Cloud & DevOps', logo: 'amazonwebservices', status: 'published', detail: 'A cloud platform for infrastructure and services.' },
  { id: 'docker', name: 'Docker', group: 'Cloud & DevOps', logo: 'docker', status: 'published', detail: 'Containers for packaging and deploying applications.' },
  { id: 'kotlin', name: 'Kotlin', group: 'Mobile', logo: 'kotlin', status: 'published', detail: 'A language used for Android and other applications.' },
  { id: 'reactnative', name: 'React Native', group: 'Mobile', logo: 'reactnative', status: 'published', detail: 'A React-based framework for native mobile apps.' },
  { id: 'azure', name: 'Microsoft Azure', group: 'Cloud & DevOps', logo: 'azure', status: 'published', detail: 'A Microsoft cloud computing platform.' },
  { id: 'gradle', name: 'Gradle', group: 'Cloud & DevOps', logo: 'gradle', status: 'published', detail: 'Build automation for software projects.' },
  { id: 'python', name: 'Python', group: 'Backend', logo: 'python', status: 'published', detail: 'A general-purpose language for software and services.' },
  { id: 'googlecloud', name: 'Google Cloud Platform', group: 'Cloud & DevOps', logo: 'googlecloud', status: 'published', detail: 'A cloud platform for services and infrastructure.' },
  { id: 'postgresql', name: 'PostgreSQL', group: 'Databases', logo: 'postgresql', status: 'published', detail: 'An open-source relational database system.' },
  { id: 'nextjs', name: 'Next.js', group: 'Frontend', logo: 'nextjs', status: 'published', detail: 'A React framework for full-stack web applications.' },
  { id: 'nodejs', name: 'Node.js', group: 'Backend', logo: 'nodejs', status: 'published', detail: 'A JavaScript runtime for server applications.' },
]

// Keep the full catalog while limiting the visual ring to distinct, requested logos.
export const orbitTechnologies = publishedTechnologies.filter(technology => technology.showInOrbit !== false)

export type CandidateTechnology = {
  id: string
  name: string
  group: TechnologyGroup
  detail: string
  logoReference: string
  status: 'candidate'
}

const candidate = (id: string, name: string, group: TechnologyGroup, logoReference: string, detail: string): CandidateTechnology =>
  ({ id, name, group, logoReference, detail, status: 'candidate' })

// Logo references identify brand artwork for editorial review; no candidate SVG is loaded publicly.
// To publish an item, verify HAVELO's use of it, add a vetted local SVG and move it above.
export const candidateTechnologies: CandidateTechnology[] = [
  candidate('vuejs', 'Vue.js', 'Frontend', 'simpleicons:vuedotjs', 'A progressive framework for web interfaces.'),
  candidate('angular', 'Angular', 'Frontend', 'simpleicons:angular', 'A framework for structured web applications.'),
  candidate('tailwind', 'Tailwind CSS', 'Frontend', 'simpleicons:tailwindcss', 'Utility classes for responsive interface styling.'),
  candidate('express', 'Express.js', 'Backend', 'simpleicons:express', 'A lightweight web framework for Node.js.'),
  candidate('spring', 'Spring Boot', 'Backend', 'simpleicons:springboot', 'A framework for Java services and applications.'),
  candidate('django', 'Django', 'Backend', 'simpleicons:django', 'A Python framework for server-side applications.'),
  candidate('fastapi', 'FastAPI', 'Backend', 'simpleicons:fastapi', 'A Python framework for typed web APIs.'),
  candidate('go', 'Go', 'Backend', 'simpleicons:go', 'A compiled language for efficient services.'),
  candidate('mysql', 'MySQL', 'Databases', 'simpleicons:mysql', 'An open-source relational database.'),
  candidate('firebase', 'Firebase', 'Databases', 'simpleicons:firebase', 'A platform with hosted data and app services.'),
  candidate('redis', 'Redis', 'Databases', 'simpleicons:redis', 'An in-memory data store and cache.'),
  candidate('sqlite', 'SQLite', 'Databases', 'simpleicons:sqlite', 'A compact embedded relational database.'),
  candidate('supabase', 'Supabase', 'Databases', 'simpleicons:supabase', 'A hosted Postgres development platform.'),
  candidate('kubernetes', 'Kubernetes', 'Cloud & DevOps', 'simpleicons:kubernetes', 'An orchestrator for containerized services.'),
  candidate('netlify', 'Netlify', 'Cloud & DevOps', 'simpleicons:netlify', 'A platform for deploying web experiences.'),
  candidate('nginx', 'Nginx', 'Cloud & DevOps', 'simpleicons:nginx', 'A web server and reverse proxy.'),
  candidate('android', 'Android', 'Mobile', 'simpleicons:android', 'An operating system and platform for mobile apps.'),
  candidate('dart', 'Dart', 'Mobile', 'simpleicons:dart', 'A language commonly used with Flutter.'),
  candidate('expo', 'Expo', 'Mobile', 'simpleicons:expo', 'Tools and services for React Native development.'),
]

export const technologyCatalog: readonly (PublishedTechnology | CandidateTechnology)[] = [
  ...publishedTechnologies,
  ...candidateTechnologies,
]
