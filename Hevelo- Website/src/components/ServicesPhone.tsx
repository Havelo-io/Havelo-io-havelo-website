import { useCallback, useEffect, useRef, useState } from 'react'

const posts = [
  { n: '01', id: 'svc-1', title: 'Website Development', text: 'Fast, accessible websites designed to convert and scale. Business sites, portfolios, corporate pages and online stores.', time: '2m' },
  { n: '02', id: 'svc-2', title: 'Mobile App Development', text: 'Intuitive mobile experiences for customers and teams. Android, iOS and cross platform apps.', time: '14m' },
  { n: '03', id: 'svc-3', title: 'UI/UX Design', text: 'Clear interfaces shaped around real user needs. Wireframes and clickable prototypes.', time: '38m' },
  { n: '04', id: 'svc-4', title: 'Custom Software Development', text: 'Purpose built tools that fit the way your business works. Business systems and automation tools.', time: '1h' },
  { n: '05', id: 'svc-5', title: 'Maintenance and Support', text: 'Reliable care that keeps your digital products performing. Updates, monitoring and technical support.', time: '2h' },
  { n: '06', id: 'svc-6', title: 'Academic Projects', text: 'Mini and semester projects, final year projects, research prototypes, web and mobile apps, plus UI/UX guidance.', time: '3h' },
]

const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const Verified = () => <svg className="sv-verified" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.4 1.8 3-.2 1 2.8 2.5 1.7-.9 2.9.9 2.9-2.5 1.7-1 2.8-3-.2L12 22l-2.4-1.8-3 .2-1-2.8-2.5-1.7.9-2.9-.9-2.9 2.5-1.7 1-2.8 3 .2L12 2z" fill="#59F4EE" /><path d="m8.4 12.2 2.4 2.4 4.8-5" fill="none" stroke="#03181C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>

const Avatar = () => <span className="sv-avatar"><img src="/assets/havelo-mark.png" alt="" width="64" height="64" /></span>

const act = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, viewBox: '0 0 24 24', 'aria-hidden': true }

export default function ServicesPhone() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [hidden, setHidden] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const feed = useRef<HTMLDivElement>(null)

  const scrollTo = useCallback((index: number) => {
    const el = feed.current
    const post = el?.children[index] as HTMLElement | undefined
    if (!el || !post) return
    const top = Math.max(0, Math.min(post.offsetTop - 8, el.scrollHeight - el.clientHeight))
    el.scrollTo({ top, behavior: 'smooth' })
  }, [])

  // Keep the feed scrolled to the active post.
  useEffect(() => { if (!reduced) scrollTo(active) }, [active, scrollTo])

  // Stop when scrolled out of view, and when the tab is hidden.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 })
    observer.observe(el)
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [])

  // Highlight walks down the thread every 2.7s.
  useEffect(() => {
    if (reduced || paused || !visible || hidden) return
    const timer = window.setInterval(() => setActive(value => (value + 1) % posts.length), 2700)
    return () => window.clearInterval(timer)
  }, [paused, visible, hidden])

  return (
    <div className="sv-phone-wrap" ref={root}>
      <div
        className="sv-phone"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false) }}
      >
        <i className="sv-btn sv-btn--l1" aria-hidden="true" /><i className="sv-btn sv-btn--l2" aria-hidden="true" /><i className="sv-btn sv-btn--r" aria-hidden="true" />
        <div className="sv-screen">
          <span className="sv-island" aria-hidden="true" />
          <div className="sv-status" aria-hidden="true">
            <span>9:41</span>
            <span className="sv-status__icons">
              <svg viewBox="0 0 18 12" width="15" height="10"><path d="M1 9h2v2H1zM5 6.5h2V11H5zM9 4h2v7H9zM13 1h2v10h-2z" fill="currentColor" /></svg>
              <svg viewBox="0 0 24 18" width="14" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M2 6.5a15 15 0 0 1 20 0M5.5 10.5a10 10 0 0 1 13 0M9 14.5a5 5 0 0 1 6 0" /></svg>
              <svg viewBox="0 0 26 12" width="19" height="9" fill="none"><rect x=".5" y=".5" width="21" height="11" rx="3" stroke="currentColor" /><rect x="2.5" y="2.5" width="14" height="7" rx="1.5" fill="currentColor" /><path d="M23.5 4v4" stroke="currentColor" strokeLinecap="round" /></svg>
            </span>
          </div>

          <div className="sv-account">
            <Avatar />
            <div className="sv-account__name"><strong>Havelo<Verified /></strong><span>@havelo</span></div>
            <span className="sv-follow">Follow</span>
          </div>

          <div className="sv-feed" ref={feed}>
            {posts.map((post, index) => (
              <a
                key={post.id}
                href={`#${post.id}`}
                className={`sv-post${active === index ? ' is-active' : ''}`}
                style={{ animationDelay: `${200 + index * 110}ms` }}
                onClick={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <span className="sv-post__side"><Avatar />{index < posts.length - 1 && <i className="sv-post__line" aria-hidden="true" />}</span>
                <span className="sv-post__body">
                  <span className="sv-post__meta"><b>Havelo</b><Verified /><span>@havelo · {post.time}</span><em>{post.n}</em></span>
                  <span className="sv-post__title">{post.title}</span>
                  <span className="sv-post__text">{post.text}</span>
                  <span className="sv-post__actions" aria-hidden="true">
                    <svg {...act}><path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.2A8 8 0 1 1 21 12z" /></svg>
                    <svg {...act}><path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3" /></svg>
                    <svg {...act} className="sv-like"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" /></svg>
                    <svg {...act}><path d="M12 15V3M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" /></svg>
                  </span>
                </span>
              </a>
            ))}
          </div>
          <div className="sv-fade" aria-hidden="true" />

          <div className="sv-composer" aria-hidden="true">
            <Avatar />
            <span className="sv-composer__text">Post your idea<i className="sv-typing"><b /><b /><b /></i></span>
            <span className="sv-postbtn">Post</span>
          </div>
        </div>
        <span className="sv-glare" aria-hidden="true" />
      </div>
    </div>
  )
}
