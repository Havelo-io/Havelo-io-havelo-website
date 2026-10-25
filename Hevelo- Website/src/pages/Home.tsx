import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon } from '../components/Icons'
import ProcessGrid from '../components/ProcessGrid'
import Reveal from '../components/Reveal'
import SEO from '../components/SEO'
import ServicesMonitorShowcase from '../components/ServicesMonitorShowcase'
import HomeVision from '../components/HomeVision'
import TechnologiesShowcase from '../components/TechnologiesShowcase'
import WorldToSriLanka from '../components/WorldToSriLanka'

const marqueeServices = [
  'Web Development',
  'Mobile App Development',
  'Custom Software',
  'UI/UX Design',
  'AI & Automation',
  'Cloud Solutions',
  'CRM Solutions',
  'ERP Solutions',
  'POS Solutions',
]

const HERO_DESCRIPTION = 'We bring ambitious ideas to life through beautifully crafted websites, powerful applications, and smart digital solutions built to help businesses grow.'
const INTRO_COMPLETE_EVENT = 'havelo:intro-complete'

function HeroDescription() {
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [introComplete, setIntroComplete] = useState(() => document.documentElement.hasAttribute('data-intro-complete'))
  const [alreadyTyped] = useState(() => document.documentElement.hasAttribute('data-hero-description-typed'))
  const [visibleCharacters, setVisibleCharacters] = useState(() => alreadyTyped ? HERO_DESCRIPTION.length : 0)

  useEffect(() => {
    const handleIntroComplete = () => setIntroComplete(true)
    window.addEventListener(INTRO_COMPLETE_EVENT, handleIntroComplete)
    if (document.documentElement.hasAttribute('data-intro-complete')) queueMicrotask(handleIntroComplete)
    return () => window.removeEventListener(INTRO_COMPLETE_EVENT, handleIntroComplete)
  }, [])

  useEffect(() => {
    if (!introComplete || alreadyTyped) return

    if (reducedMotion) {
      queueMicrotask(() => setVisibleCharacters(HERO_DESCRIPTION.length))
      document.documentElement.setAttribute('data-hero-description-typed', '')
      return
    }

    let nextCharacter = 0
    const timer = window.setInterval(() => {
      nextCharacter += 1
      setVisibleCharacters(nextCharacter)
      if (nextCharacter >= HERO_DESCRIPTION.length) {
        window.clearInterval(timer)
        document.documentElement.setAttribute('data-hero-description-typed', '')
      }
    }, 22)

    return () => window.clearInterval(timer)
  }, [alreadyTyped, introComplete, reducedMotion])

  const typing = introComplete && visibleCharacters < HERO_DESCRIPTION.length && !reducedMotion

  return (
    <p className="hero-description">
      <span className="hero-description__full">{HERO_DESCRIPTION}</span>
      <span className="hero-description__typed" aria-hidden="true">{HERO_DESCRIPTION.slice(0, visibleCharacters)}</span>
      {typing && <span className="hero-description__cursor" aria-hidden="true" />}
    </p>
  )
}

export default function Home() {
  return (
    <>
      <SEO title="HAVELO | Digital Products Built for Growth" description="HAVELO designs and develops modern websites, mobile apps, and custom software solutions that help businesses grow." path="/" />
      <section className="home-hero">
        <div className="hero-waves" aria-hidden="true">
          <div className="hero-aurora hero-aurora--left" />
          <div className="hero-aurora hero-aurora--right" />
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" focusable="false">
            <defs>
              <linearGradient id="hero-wave-deep" x1="0" y1="0" x2="1" y2=".72">
                <stop offset="0" stopColor="#061f54" stopOpacity=".05" />
                <stop offset=".36" stopColor="#075486" stopOpacity=".3" />
                <stop offset=".68" stopColor="#0b7f9c" stopOpacity=".24" />
                <stop offset="1" stopColor="#061733" stopOpacity=".04" />
              </linearGradient>
              <linearGradient id="hero-wave-teal" x1="0" y1="0" x2="1" y2=".4">
                <stop offset="0" stopColor="#086c8f" stopOpacity=".04" />
                <stop offset=".32" stopColor="#0ca4b4" stopOpacity=".24" />
                <stop offset=".58" stopColor="#26dfd9" stopOpacity=".38" />
                <stop offset="1" stopColor="#075c82" stopOpacity=".06" />
              </linearGradient>
              <linearGradient id="hero-wave-cyan" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#0b68b6" stopOpacity=".08" />
                <stop offset=".42" stopColor="#3ce8e2" stopOpacity=".62" />
                <stop offset=".64" stopColor="#7dfff3" stopOpacity=".72" />
                <stop offset="1" stopColor="#1189c4" stopOpacity=".08" />
              </linearGradient>
              <filter id="hero-wave-blur" x="-20%" y="-30%" width="140%" height="160%">
                <feGaussianBlur stdDeviation="14" />
              </filter>
              <filter id="hero-wave-soften" x="-15%" y="-20%" width="130%" height="140%">
                <feGaussianBlur stdDeviation="3" />
              </filter>
              <filter id="hero-wave-glow" x="-20%" y="-40%" width="140%" height="180%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <linearGradient id="hero-wave-side-left" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#0873ba" stopOpacity=".04" />
                <stop offset=".52" stopColor="#19d7d7" stopOpacity=".3" />
                <stop offset="1" stopColor="#0a779f" stopOpacity=".04" />
              </linearGradient>
              <linearGradient id="hero-wave-side-right" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#125fae" stopOpacity=".04" />
                <stop offset=".55" stopColor="#11bfc8" stopOpacity=".25" />
                <stop offset="1" stopColor="#075f88" stopOpacity=".03" />
              </linearGradient>
              <linearGradient id="hero-code-mask-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="black" />
                <stop offset=".1" stopColor="white" />
                <stop offset=".9" stopColor="white" />
                <stop offset="1" stopColor="black" />
              </linearGradient>
              <mask id="hero-code-edge-fade" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900">
                <rect width="1600" height="900" fill="url(#hero-code-mask-gradient)" />
              </mask>
              <mask id="hero-code-ribbon-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900">
                <g mask="url(#hero-code-edge-fade)" fill="white">
                  <path d="M-180 650 C 130 544 344 718 630 700 C 936 680 1160 548 1780 640 L1780 980 L-180 980 Z" />
                  <path d="M-220 696 C 90 594 338 830 700 772 C 1042 718 1298 598 1780 682 L1780 980 L-220 980 Z" />
                  <path d="M-180 754 C 160 644 400 716 680 806 C 992 906 1248 760 1780 724 L1780 980 L-180 980 Z" />
                </g>
              </mask>
              <path id="hero-code-path-back" d="M-90 710 C 214 620 408 754 684 738 C 994 720 1220 622 1690 672" />
              <path id="hero-code-path-middle" d="M-110 760 C 190 690 402 844 722 794 C 1038 746 1290 670 1695 710" />
              <path id="hero-code-path-front" d="M-90 816 C 220 724 434 774 710 846 C 1012 926 1270 808 1692 774" />
            </defs>

            <g className="hero-side-layer hero-side-layer--left">
              <path className="hero-wave-haze" d="M-210 368 C 26 372 110 466 254 594 C 352 682 444 738 574 792 C 434 774 314 728 198 650 C 44 548 -84 500 -238 516 Z" fill="url(#hero-wave-side-left)" filter="url(#hero-wave-blur)" />
              <path className="hero-wave-surface" d="M-188 390 C 38 394 128 486 270 610 C 364 692 454 744 562 782 C 430 758 320 714 212 642 C 62 540 -64 498 -220 508 Z" fill="url(#hero-wave-side-left)" filter="url(#hero-wave-soften)" />
              <path className="hero-wave-edge hero-wave-edge--side" d="M-178 402 C 50 410 138 496 282 620 C 374 698 462 742 552 772" fill="none" stroke="#38e6df" strokeOpacity=".2" strokeWidth="2" filter="url(#hero-wave-glow)" />
            </g>

            <g className="hero-side-layer hero-side-layer--right">
              <path className="hero-wave-haze" d="M1834 366 C 1600 378 1510 470 1386 600 C 1306 686 1232 744 1112 794 C 1262 772 1388 716 1492 628 C 1614 524 1714 480 1852 478 Z" fill="url(#hero-wave-side-right)" filter="url(#hero-wave-blur)" />
              <path className="hero-wave-surface" d="M1812 388 C 1596 400 1518 486 1396 612 C 1318 694 1244 744 1132 784 C 1270 760 1388 706 1482 624 C 1600 524 1698 486 1836 486 Z" fill="url(#hero-wave-side-right)" filter="url(#hero-wave-soften)" />
              <path className="hero-wave-edge hero-wave-edge--side" d="M1794 406 C 1594 420 1520 498 1406 620 C 1330 700 1256 742 1152 774" fill="none" stroke="#259ed0" strokeOpacity=".19" strokeWidth="2" filter="url(#hero-wave-glow)" />
            </g>

            <g className="hero-wave-layer hero-wave-layer--back">
              <path className="hero-wave-haze" d="M-210 628 C 112 502 340 742 638 714 C 956 684 1172 514 1810 616 L1810 980 L-210 980 Z" fill="url(#hero-wave-deep)" filter="url(#hero-wave-blur)" />
              <path className="hero-wave-surface" d="M-180 650 C 130 544 344 718 630 700 C 936 680 1160 548 1780 640 L1780 980 L-180 980 Z" fill="url(#hero-wave-deep)" filter="url(#hero-wave-soften)" />
              <path className="hero-wave-edge hero-wave-edge--deep" d="M-170 658 C 138 550 348 710 636 694 C 944 678 1170 554 1770 646" fill="none" stroke="#198ec5" strokeOpacity=".2" strokeWidth="2.2" />
              <path className="hero-wave-trace hero-wave-trace--deep" d="M-140 704 C 154 610 386 750 680 730 C 1000 708 1234 610 1748 674" />
              <path className="hero-wave-trace hero-wave-trace--deep hero-wave-trace--faint" d="M-162 742 C 152 650 394 786 704 760 C 1018 734 1276 632 1762 696" />
              <use className="hero-code-guide" href="#hero-code-path-back" />
              <g className="hero-code-streams" mask="url(#hero-code-ribbon-mask)">
                <text className="hero-code-flow"><textPath href="#hero-code-path-back" startOffset="12%">{'React   •   Next.js'}</textPath></text>
              </g>
            </g>

            <g className="hero-wave-layer hero-wave-layer--middle">
              <path className="hero-wave-haze" d="M-250 674 C 78 552 326 862 710 792 C 1050 730 1296 566 1810 658 L1810 980 L-250 980 Z" fill="url(#hero-wave-teal)" filter="url(#hero-wave-blur)" />
              <path className="hero-wave-surface" d="M-220 696 C 90 594 338 830 700 772 C 1042 718 1298 598 1780 682 L1780 980 L-220 980 Z" fill="url(#hero-wave-teal)" filter="url(#hero-wave-soften)" />
              <path className="hero-wave-edge hero-wave-edge--teal" d="M-202 702 C 106 604 344 820 706 764 C 1048 712 1300 606 1768 688" fill="none" stroke="#31dcd9" strokeOpacity=".28" strokeWidth="2" filter="url(#hero-wave-glow)" />
              <path className="hero-wave-trace hero-wave-trace--teal" d="M-154 754 C 146 676 382 838 730 790 C 1054 746 1312 656 1736 714" />
              <path className="hero-wave-trace hero-wave-trace--teal hero-wave-trace--faint" d="M-144 802 C 172 716 416 850 752 818 C 1072 788 1332 690 1756 738" />
              <use className="hero-code-guide" href="#hero-code-path-middle" />
              <g className="hero-code-streams" mask="url(#hero-code-ribbon-mask)">
                <text className="hero-code-flow"><textPath href="#hero-code-path-middle" startOffset="42%">{'TypeScript   •   async/await'}</textPath></text>
              </g>
            </g>

            <g className="hero-wave-layer hero-wave-layer--front">
              <path className="hero-wave-haze" d="M-210 734 C 142 604 398 692 692 792 C 1010 900 1254 724 1810 694 L1810 980 L-210 980 Z" fill="url(#hero-wave-deep)" filter="url(#hero-wave-blur)" />
              <path className="hero-wave-surface" d="M-180 754 C 160 644 400 716 680 806 C 992 906 1248 760 1780 724 L1780 980 L-180 980 Z" fill="url(#hero-wave-deep)" filter="url(#hero-wave-soften)" />
              <path className="hero-wave-edge hero-wave-edge--cyan" d="M-176 748 C 164 636 404 708 684 798 C 998 898 1254 752 1774 718" fill="none" stroke="url(#hero-wave-cyan)" strokeWidth="2.6" filter="url(#hero-wave-glow)" />
              <path className="hero-wave-trace hero-wave-trace--deep" d="M-130 842 C 214 752 456 854 768 860 C 1104 866 1354 778 1742 792" />
              <use className="hero-code-guide" href="#hero-code-path-front" />
              <g className="hero-code-streams" mask="url(#hero-code-ribbon-mask)">
                <text className="hero-code-flow"><textPath href="#hero-code-path-front" startOffset="70%">{'Node.js   •   <Component />'}</textPath></text>
              </g>
            </g>
          </svg>
        </div>
        <div className="hero-contrast" aria-hidden="true" />
        <div className="container hero-content">
          <Reveal>
            <span className="eyebrow hero-badge"><span />WHERE IDEAS ARE BROUGHT TO LIFE</span>
            <h1>
              <span className="hero-title-line">We Build Digital</span>{' '}
              <span className="hero-title-line"><span className="gradient-text">Experiences</span> That Matter.</span>
            </h1>
            <HeroDescription />
            <div className="hero-actions">
              <Link className="button" to="/start-project">Start a Project<ArrowIcon /></Link>
              <Link className="button button--secondary" to="/services">Explore Services</Link>
            </div>
          </Reveal>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span /></div>
      </section>

      <div className="service-marquee" role="region" aria-label="HAVELO services">
        <div className="service-marquee__track">
          <div className="service-marquee__group">
            {marqueeServices.map(service => <span className="service-marquee__item" key={service}><i />{service}</span>)}
          </div>
          <div className="service-marquee__group" aria-hidden="true">
            {marqueeServices.map(service => <span className="service-marquee__item" key={service}><i />{service}</span>)}
          </div>
        </div>
      </div>

      <ProcessGrid />

      <HomeVision />

      <ServicesMonitorShowcase />

      <TechnologiesShowcase />

      <WorldToSriLanka />

      <section className="section home-final-cta">
        <div className="container">
          <Reveal>
            <div className="cta-panel">
              <div className="home-final-cta__copy">
                <span className="eyebrow"><span />Built for you</span>
                <h2>Have something different in <em>mind?</em></h2>
                <p>Tell us what you want to create. We will help shape the right approach.</p>
              </div>
              <Link className="button button--light" to="/contact">Discuss your idea<ArrowIcon /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
