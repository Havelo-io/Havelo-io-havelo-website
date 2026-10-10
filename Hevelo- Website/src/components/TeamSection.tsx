import { useState } from 'react'
import { UserIcon } from './Icons'
import Reveal from './Reveal'

const PHOTO_EXTENSIONS = ['webp', 'jpg', 'png']
const NO_PHOTO = ['mohamed']

const team = [
  { slug: 'mohamed', name: 'Mohamed Tharik', roles: ['Frontend & Mobile App Developer'], text: 'Builds fast, polished web and mobile interfaces that feel great on every screen.' },
  { slug: 'ahmadh', name: 'Ahmadh', roles: ['Co-Founder & Operations Head'], text: 'Leading the team and manages operations smoothly.' },
  { slug: 'umair', name: 'Umair', roles: ['Developer', 'Business Analyst'], text: 'Builds reliable software and makes sure it solves what the client actually needs.' },
  { slug: 'hussain', name: 'Hussain', roles: ['Full Stack Developer'], text: 'Builds complete products across the front end, back end, and everything in between.' },
]

function Avatar({ slug, name }: { slug: string; name: string }) {
  const [attempt, setAttempt] = useState(NO_PHOTO.includes(slug) ? PHOTO_EXTENSIONS.length : 0)
  const hasPhoto = attempt < PHOTO_EXTENSIONS.length

  return (
    <div className={`team-avatar${hasPhoto ? ' has-photo' : ''}`}>
      {hasPhoto
        ? <img src={`/assets/team/${slug}.${PHOTO_EXTENSIONS[attempt]}`} alt={`${name}, HAVELO team`} width="480" height="480" loading="lazy" onError={() => setAttempt(attempt + 1)} />
        : <UserIcon />}
    </div>
  )
}

export default function TeamSection() {
  return (
    <div className="team-grid">
      {team.map((member, index) => (
        <Reveal key={member.slug} delay={index * 80}>
          <article className="team-card glass-card">
            <Avatar slug={member.slug} name={member.name} />
            <h3>{member.name}</h3>
            <div className="team-roles">{member.roles.map(role => <span className="team-role" key={role}>{role}</span>)}</div>
            <p>{member.text}</p>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
