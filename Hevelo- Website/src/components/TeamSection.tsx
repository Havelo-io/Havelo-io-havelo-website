import { useState } from 'react'
import { UserIcon } from './Icons'
import Reveal from './Reveal'

// Drop real photos into public/assets/team/<slug>.webp (or .jpg / .png) and they show up automatically.
const PHOTO_EXTENSIONS = ['webp', 'jpg', 'png']
const NO_PHOTO = ['mohamed']

// Order matters: the founder comes first and gets the lead card styling.
const team = [
  { slug: 'ahmadh', name: 'Ahmadh', roles: ['Co-Founder & Operations Head'], text: 'Leading the team and manages operations smoothly.' },
  { slug: 'mohamed', name: 'Mohamed Tharik', roles: ['Frontend & Mobile App Developer'], text: 'Builds fast, polished web and mobile interfaces that feel great on every screen.' },
  { slug: 'umair', name: 'Umair', roles: ['Developer', 'Business Analyst'], text: 'Builds reliable software and makes sure it solves what the client actually needs.' },
  { slug: 'hussain', name: 'Hussain', roles: ['Full Stack Developer'], text: 'Builds complete products across the front end, back end, and everything in between.' },
]

function Avatar({ slug, name }: { slug: string; name: string }) {
  const [attempt, setAttempt] = useState(NO_PHOTO.includes(slug) ? PHOTO_EXTENSIONS.length : 0)
  const hasPhoto = attempt < PHOTO_EXTENSIONS.length

  return (
    <div className={`ab-avatar${hasPhoto ? ' has-photo' : ''}`}>
      {hasPhoto
        ? <img src={`/assets/team/${slug}.${PHOTO_EXTENSIONS[attempt]}`} alt={`${name}, Havelo team`} width="480" height="480" loading="lazy" onError={() => setAttempt(attempt + 1)} />
        : <UserIcon />}
    </div>
  )
}

export default function TeamSection() {
  return (
    <div className="ab-team">
      {team.map((member, index) => (
        <Reveal key={member.slug} delay={index * 80}>
          <article className={`ab-member${member.lead ? ' is-lead' : ''}`}>
            <Avatar slug={member.slug} name={member.name} />
            <h3>{member.name}</h3>
            <div className="ab-chips">{member.roles.map(role => <span className="ab-chip" key={role}>{role}</span>)}</div>
            <p>{member.text}</p>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
