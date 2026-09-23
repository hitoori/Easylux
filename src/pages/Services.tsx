import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import type { Page } from '../types/navigation'
import { serviceOptions, type JourneyRequest, type JourneyService, type QuoteSelection } from '../components/services/serviceData'
import { HourlySection, WaterTaxiSection, EuropeSection, MountainsSection, SeasideSection, CruiseSection } from '../components/services/SelectedServiceSections'
import ServiceQuoteForm from '../components/services/ServiceQuoteForm'
import './services.css'
import './services-selected.css'
import './services-hourly.css'
import './services-water-taxi.css'
import './services-europe.css'
import './services-mountains.css'
import './services-seaside.css'
import './services-hero.css'
import './services-unified.css'
import './services-refinements.css'
import './services-experience.css'
import './services-hourly-editorial.css'
import './services-water-taxi-editorial.css'
import './services-europe-editorial.css'
import './services-mountains-editorial.css'
import './services-final-polish.css'
import '../components/services/hourly-mockup.css'
import './services-spacing.css'
import './services-route-style.css'
import AirportTransfers from '../components/services/AirportTransfers'
import PricingGuide from '../components/services/PricingGuide'
import FloatingServiceNav from '../components/services/FloatingServiceNav'

export default function Services({ navigate: _navigate }: { navigate: (page: Page) => void }) {
  const [activeSection, setActiveSection] = useState<JourneyService | null>(null)
  const [floatingVisible, setFloatingVisible] = useState(false)
  const serviceNavRef = useRef<HTMLElement | null>(null)
  const selectedScroll = useRef(false)
  const previousScroll = useRef(0)
  const [meetingOpen, setMeetingOpen] = useState(false)
  const [meetingClosing, setMeetingClosing] = useState(false)
  const [selection, setSelection] = useState<QuoteSelection | null>(null)
  const modalReturnFocus = useRef<HTMLElement | null>(null)
  const openMeetingPoint = useCallback(() => { setMeetingClosing(false); setMeetingOpen(true) }, [])
  const closeMeetingPoint = useCallback(() => setMeetingClosing(true), [])

  useEffect(() => {
    let frame = 0
    const updateActiveSection = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const headerHeight = window.matchMedia('(min-width: 1024px)').matches ? 76 : 72
        const passedMenu = (serviceNavRef.current?.getBoundingClientRect().bottom ?? Infinity) <= headerHeight
        if (passedMenu || window.scrollY < previousScroll.current - 1) selectedScroll.current = false
        setFloatingVisible(passedMenu || selectedScroll.current)
        previousScroll.current = window.scrollY
        const marker = Math.max(100, window.innerHeight * .3)
        const sections = serviceOptions.filter(([id]) => id !== 'custom')
        let current = sections[0]?.[0] ?? null
        for (const [id] of sections) {
          const section = document.getElementById('service-' + id)
          if (section && section.getBoundingClientRect().top <= marker) current = id
        }
        setActiveSection(current)
      })
    }
    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  useEffect(() => {
    const items = document.querySelectorAll('[data-svc-reveal]')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.05 })
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!meetingOpen) return
    modalReturnFocus.current = document.activeElement as HTMLElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const modal = document.querySelector<HTMLElement>('.svc-modal')
    modal?.querySelector<HTMLButtonElement>('button')?.focus()
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMeetingPoint()
      if (event.key === 'Tab') {
        const controls = modal?.querySelectorAll<HTMLElement>('button, a, input, [tabindex="0"]')
        if (!controls?.length) return
        const first = controls[0], last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', close)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', close); modalReturnFocus.current?.focus() }
  }, [closeMeetingPoint, meetingOpen])

  const scrollTo = (id: string) => {
    const section = document.getElementById('service-' + id)
    if (!section) return
    setActiveSection(id as JourneyService)
    const compactHeaderHeight = window.matchMedia('(min-width: 1024px)').matches ? 76 : 72
    const top = section.getBoundingClientRect().top + window.scrollY - compactHeaderHeight
    window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }
  const requestJourney = (request: JourneyRequest) => setSelection(previous => ({ ...request, revision: (previous?.revision ?? 0) + 1 }))

  return <div className="services-new-page services-experience">
    <section className="services-masthead" aria-labelledby="services-title">
      <img className="services-masthead-photo" src="./images/services/unsplash/venice-hero.jpg" alt="" width={2400} height={1601} fetchPriority="high" />
      <div className="services-masthead-shell">
        <div className="services-masthead-copy">
          <p className="services-masthead-eyebrow">Services &amp; prices</p>
          <h1 id="services-title"><span>Your journey.</span><span><em>A private driver.</em></span></h1>
          <p className="services-masthead-description">Private transfers from Venice to destinations across Italy and Europe, with your vehicle, route and price agreed before you travel.</p>
          <div className="services-masthead-actions">
            <button type="button" className="services-masthead-primary" onClick={() => scrollTo('custom')}>Get a transfer quote <ArrowRight size={19} weight="light" aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </section>
    <nav ref={serviceNavRef} className="services-masthead-nav services-top-navigation" aria-label="Choose a service">
      {serviceOptions.filter(([id]) => id !== 'custom').map(([id, label]) =>
        <button key={id} type="button" aria-current={activeSection === id ? 'location' : undefined}
          onClick={() => { selectedScroll.current = true; setFloatingVisible(true); scrollTo(id) }}>
          <span>{label}</span>
        </button>)}
    </nav>
    {floatingVisible && <FloatingServiceNav activeSection={activeSection} onSelect={scrollTo} />}
    <AirportTransfers onMeetingPoint={openMeetingPoint} onRequest={requestJourney} />
    <HourlySection onRequest={requestJourney} />
    <WaterTaxiSection onRequest={requestJourney} />
    <EuropeSection onRequest={requestJourney} />
    <MountainsSection onRequest={requestJourney} />
    <SeasideSection onRequest={requestJourney} />
    <CruiseSection onRequest={requestJourney} />
    <PricingGuide />
    <ServiceQuoteForm selection={selection} />
    {meetingOpen && <div
      className={`svc-modal${meetingClosing ? ' is-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="meeting-title"
      aria-describedby="meeting-description"
      onMouseDown={(event) => { if (event.target === event.currentTarget) closeMeetingPoint() }}
      onAnimationEnd={(event) => { if (event.target === event.currentTarget && meetingClosing) setMeetingOpen(false) }}
    ><div className="svc-modal-panel svc-meeting-modal-panel">
      <button type="button" className="svc-modal-close" onClick={closeMeetingPoint} aria-label="Close meeting point guide"><span aria-hidden="true">×</span></button>
      <div className="svc-meeting-modal-copy">
        <p className="svc-eyebrow">Meeting point</p>
        <h2 id="meeting-title">Where to meet your chauffeur</h2>
        <p id="meeting-description">After collecting your luggage, follow the Arrivals signs. Your chauffeur will wait nearby holding a tablet with your name.</p>
      </div>
      <div className="svc-meeting-gallery">
        <figure>
          <div className="svc-meeting-photo"><img src="/images/services/airport/venice-airport-arrivals.jpeg" alt="Arrivals exit at Venice Marco Polo Airport" /></div>
          <figcaption><span>01</span><strong>Exit through Arrivals</strong></figcaption>
        </figure>
        <figure>
          <div className="svc-meeting-photo"><img src="/images/services/airport/venice-airport-change.jpeg" alt="Currency exchange counter marked Change inside Venice Marco Polo Airport" /></div>
          <figcaption><span>02</span><strong>Nearby reference point</strong><small>Look for the CHANGE office.</small></figcaption>
        </figure>
      </div>
    </div></div>}

  </div>
}
