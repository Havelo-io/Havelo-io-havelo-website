import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon, CodeIcon, PenIcon, PhoneIcon, SettingsIcon, SparkIcon } from './Icons'

const VIDEO_SRC = '/assets/Developers_working_in_modern_office_20261027003206.mp4'

const highlights = [
  { icon: <CodeIcon />, title: 'Website Development', text: 'Fast, accessible websites built to grow.' },
  { icon: <PhoneIcon />, title: 'Mobile App Development', text: 'Intuitive experiences for Android and iOS.' },
  { icon: <PenIcon />, title: 'UI/UX Design', text: 'Clear interfaces shaped around real users.' },
  { icon: <SparkIcon />, title: 'Custom Software', text: 'Purpose-built tools for business workflows.' },
  { icon: <CartIcon />, title: 'E-commerce Solutions', text: 'Online stores designed to convert and scale.' },
  { icon: <SettingsIcon />, title: 'Ongoing Support', text: 'Updates, monitoring, and dependable care.' },
]

function CartIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /><path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20.3 8H6" /></svg>
}

function PlayIcon({ pause = false }: { pause?: boolean }) {
  return pause
    ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg>
    : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6Z" /></svg>
}

function VolumeIcon({ muted }: { muted: boolean }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6.5 9H3v6h3.5l4.5 4Z" /><path d={muted ? 'm16 9 5 6M21 9l-5 6' : 'M15 9.5a4 4 0 0 1 0 5M18 7a7 7 0 0 1 0 10'} /></svg>
}

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return ''
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`
}

export default function WhoWeAreVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const manuallyPaused = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [duration, setDuration] = useState('')

  const togglePlayback = async () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      manuallyPaused.current = false
      try { await video.play() } catch { setPlaying(false) }
    } else {
      manuallyPaused.current = true
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      manuallyPaused.current = true
      video.pause()
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= .45 && !manuallyPaused.current) {
        void video.play().catch(() => setPlaying(false))
      } else if (!entry.isIntersecting || entry.intersectionRatio < .2) {
        video.pause()
      }
    }, { threshold: [.2, .45] })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hw-section" aria-labelledby="hw-title">
      <div className="hw-decor" aria-hidden="true"><i /><i /><i /></div>
      <div className="container hw-panel">
        <div className="hw-panel__glow" aria-hidden="true" />
        <div className="hw-video-frame">
          <div className="hw-video-card">
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="HAVELO team working in a modern office"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onVolumeChange={event => setMuted(event.currentTarget.muted)}
              onLoadedMetadata={event => setDuration(formatDuration(event.currentTarget.duration))}
            />
            {!playing && <button type="button" className="hw-video-play" onClick={togglePlayback} aria-label="Play team video"><PlayIcon /></button>}
            <div className="hw-video-caption">
              <button type="button" className="hw-video-control" onClick={togglePlayback} aria-label={playing ? 'Pause team video' : 'Play team video'}><PlayIcon pause={playing} /></button>
              <span>A glimpse into our team, our process, and the technology that powers HAVELO.</span>
              <button type="button" className="hw-video-control" onClick={toggleMute} aria-label={muted ? 'Unmute team video' : 'Mute team video'}><VolumeIcon muted={muted} /></button>
              {duration && <time>{duration}</time>}
            </div>
          </div>
        </div>

        <div className="hw-content">
          <span className="hw-eyebrow"><i />Who we are</span>
          <h2 id="hw-title">A team that turns<br /><em>ideas into impact.</em></h2>
          <p className="hw-intro">We are a Sri Lankan team of designers, developers, and problem-solvers building modern digital experiences for businesses around the world.</p>
          <div className="hw-highlights">
            {highlights.map(item => <div className="hw-highlight" key={item.title}>
              <span className="hw-highlight__icon">{item.icon}</span>
              <span><strong>{item.title}</strong><small>{item.text}</small></span>
            </div>)}
          </div>
          <Link className="hw-cta" to="/projects">Discover our work <span><ArrowIcon /></span></Link>
        </div>
      </div>
    </section>
  )
}
