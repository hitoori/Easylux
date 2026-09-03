import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Car, SuitcaseRolling, X } from '@phosphor-icons/react'
import type { Page } from '../types/navigation'
import { serviceOptions, type JourneyRequest, type JourneyService, type QuoteSelection } from '../components/services/serviceData'
import AirportTransfers from '../components/services/AirportTransfers'
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

export default function Services({ navigate: _navigate }: { navigate: (page: Page) => void }) {
  const [activeSection, setActiveSection] = useState<JourneyService | null>(null)
  const [meetingOpen, setMeetingOpen] = useState(false)
  const [selection, setSelection] = useState<QuoteSelection | null>(null)
  const modalReturnFocus = useRef<HTMLElement | null>(null)
  const serviceNavRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let frame = 0
    const updateActiveSection = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const menu = serviceNavRef.current
        if (!menu) return
        const headerHeight = window.matchMedia('(min-width: 1024px)').matches ? 76 : 72
        const menuRect = menu.getBoundingClientRect()
        if (menuRect.top > headerHeight + 1) {
          setActiveSection(null)
          return
        }
        const marker = menuRect.bottom + 2
        const current = serviceOptions.find(([id]) => {
          const section = document.getElementById('service-' + id)
          if (!section) return false
          const rect = section.getBoundingClientRect()
          return rect.top <= marker && rect.bottom > marker
        })
        setActiveSection(current?.[0] ?? null)
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
    if (!activeSection || !serviceNavRef.current) return
    const activeButton = serviceNavRef.current.querySelector<HTMLElement>('[aria-current="location"]')
    if (!activeButton) return
    const left = activeButton.offsetLeft - (serviceNavRef.current.clientWidth - activeButton.offsetWidth) / 2
    serviceNavRef.current.scrollTo({ left: Math.max(0, left), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }, [activeSection])

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
      if (event.key === 'Escape') setMeetingOpen(false)
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
  }, [meetingOpen])

  const scrollTo = (id: string) => {
    const section = document.getElementById('service-' + id)
    if (!section) return
    setActiveSection(id as JourneyService)
    const compactHeaderHeight = window.matchMedia('(min-width: 1024px)').matches ? 76 : 72
    const serviceMenuHeight = serviceNavRef.current?.offsetHeight ?? 64
    const top = section.getBoundingClientRect().top + window.scrollY - compactHeaderHeight - serviceMenuHeight
    window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }
  const requestJourney = (request: JourneyRequest) => setSelection(previous => ({ ...request, revision: (previous?.revision ?? 0) + 1 }))

  return <div className="services-new-page">
    <section className="services-masthead" aria-labelledby="services-title">
      <img className="services-masthead-photo" src="./images/services/hero/lake.webp" alt="" width={1816} height={866} fetchPriority="high" />
      <div className="services-masthead-shell">
        <div className="services-masthead-copy">
          <p className="services-masthead-eyebrow">Private transfers in Venice, Italy &amp; Europe</p>
          <h1 id="services-title"><span>Private transfers</span><span>in Venice, Italy</span><span>and across Europe.</span></h1>
          <p className="services-masthead-description">Choose an airport transfer, address-to-address journey, hourly chauffeur, Venice Water Taxi connection, Dolomites, seaside or cruise port transfer. Share your journey and receive one clear quote.</p>
          <div className="services-masthead-actions">
            <button type="button" className="services-masthead-primary" onClick={() => scrollTo('custom')}>Request your transfer quote <ArrowRight size={19} weight="light" aria-hidden="true" /></button>
            <button type="button" className="services-masthead-secondary" onClick={() => document.getElementById('italy-route-prices')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })}>Compare routes &amp; fares</button>
          </div>
        </div>
      </div>
    </section>
    <nav ref={serviceNavRef} className="services-masthead-nav" aria-label="Choose a service">
      {serviceOptions.map(([id, label]) => {
        if (id === 'custom') return null
        return <button type="button" key={id} aria-current={activeSection === id ? 'location' : undefined} onClick={(event) => { scrollTo(id); if (event.detail > 0) event.currentTarget.blur() }}><span>{label}</span></button>
      })}
    </nav>
    <AirportTransfers onMeetingPoint={() => setMeetingOpen(true)} onRequest={requestJourney} />
    <HourlySection onRequest={requestJourney} />
    <WaterTaxiSection onRequest={requestJourney} />
    <EuropeSection onRequest={requestJourney} />
    <MountainsSection onRequest={requestJourney} />
    <SeasideSection onRequest={requestJourney} />
    <CruiseSection onRequest={requestJourney} />
    <ServiceQuoteForm selection={selection} />
    {meetingOpen && <div className="svc-modal" role="dialog" aria-modal="true" aria-labelledby="meeting-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setMeetingOpen(false) }}><div className="svc-modal-panel">
      <button type="button" className="svc-modal-close" onClick={() => setMeetingOpen(false)} aria-label="Close meeting point guide"><X size={20} /></button>
      <div className="svc-meeting-visual" aria-hidden="true"><div className="svc-arrivals-sign">ARRIVALS</div><div className="svc-baggage-door"><SuitcaseRolling size={36} /><span>Baggage claim exit</span></div><div className="svc-meeting-path"><span /><ArrowRight size={28} /></div><div className="svc-change-point"><strong>CHANGE</strong><span>Currency exchange</span></div><div className="svc-driver-point"><Car size={28} /><span>Your driver meets you opposite</span></div></div>
      <div className="svc-modal-copy"><p className="svc-eyebrow">Airport meeting point</p><h2 id="meeting-title">Meet opposite Currency Exchange.</h2><p>After baggage claim, stay in Arrivals and look for the currency exchange marked <strong>Change</strong>. Your driver will meet you opposite this point with your name displayed.</p><p className="svc-price-note">Airport-specific instructions are confirmed before travel.</p></div>
    </div></div>}

  </div>
}
