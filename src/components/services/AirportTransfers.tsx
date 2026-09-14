import { useState } from 'react'
import {
  AirplaneInFlight,
  AirplaneLanding,
  AirplaneTakeoff,
  ArrowRight,
  Info,
  MapPin,
  SuitcaseRolling,
  UserFocus,
} from '@phosphor-icons/react'
import type { RequestJourney } from './ServiceRoutes'
import './airport-transfers.css'
import './airport-concierge.css'

const journeys = [
  {
    label: 'From the airport', detail: 'An easy arrival', title: 'Airport Transfer', icon: AirplaneLanding,
    description: 'We monitor your flight, adjust pick-up if the arrival time changes and send clear meeting instructions before travel. Your driver waits at the agreed point and helps with luggage.',
    cta: 'Book Airport Transfer', meeting: 'A familiar face, even on your first visit.', note: 'Your meeting instructions are sent before travel.',
    features: [
      { title: 'Flight monitoring', copy: 'We track your flight in real time.', icon: AirplaneInFlight },
      { title: 'Meet & greet', copy: 'Your driver meets you at the airport.', icon: UserFocus },
      { title: 'Help with luggage', copy: 'A comfortable, stress-free transfer.', icon: SuitcaseRolling },
    ],
  },
  {
    label: 'To the airport', detail: 'A stress-free departure', title: 'Airport Drop-off', icon: AirplaneTakeoff,
    description: 'We plan collection around your departure time, terminal and traffic. Your chauffeur arrives at the agreed address, helps with luggage and takes you directly to the correct terminal.',
    cta: 'Book Airport Drop-off', meeting: 'The right time for a calm departure.', note: 'Your collection point and departure time are confirmed before travel.',
    features: [
      { title: 'Planned pick-up', copy: 'We agree the right collection time.', icon: AirplaneTakeoff },
      { title: 'Direct transfer', copy: 'From your address to the terminal.', icon: MapPin },
      { title: 'Help with luggage', copy: 'Assistance from pick-up to arrival.', icon: SuitcaseRolling },
    ],
  },
  {
    label: 'Address to address', detail: 'The next part of your trip', title: 'Address to Address Transfer', icon: MapPin,
    description: 'Travel privately between hotels, cities or accessible addresses. We confirm the route, pick-up time, meeting point and luggage requirements before travel.',
    cta: 'Book Private Transfer', meeting: 'A clear meeting point for every route.', note: 'Where access is restricted, we agree the nearest accessible pick-up point.',
    features: [
      { title: 'Private journey', copy: 'Hotel to hotel or city to city.', icon: UserFocus },
      { title: 'Flexible pick-up', copy: 'Your time and route are agreed.', icon: MapPin },
      { title: 'Space for luggage', copy: 'Tell us what you are travelling with.', icon: SuitcaseRolling },
    ],
  },
]

export default function AirportTransfers({ onMeetingPoint, onRequest }: { onMeetingPoint: () => void; onRequest: RequestJourney }) {
  const [selected, setSelected] = useState(0)
  const journey = journeys[selected]

  const selectJourney = (next: number) => {
    setSelected(next)
    window.requestAnimationFrame(() => document.getElementById(`ac-tab-${next}`)?.focus())
  }

  return <section id="service-airport" className="airport-transfers airport-concierge" aria-labelledby="airport-transfers-title">
    <div className="svc-shell ac-shell">
      <div className="ac-stage">
        <aside className="ac-sidebar">
          <p className="ac-sidebar-label">Airport &amp; city transfers</p>
          <div className="ac-choices" role="tablist" aria-label="Choose your transfer" aria-orientation="vertical">
            {journeys.map(({ label, detail, icon: Icon }, index) => <button
              key={label}
              type="button"
              role="tab"
              id={`ac-tab-${index}`}
              aria-controls="ac-journey"
              aria-selected={selected === index}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={event => {
                const next = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? (index + 1) % journeys.length : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? (index + journeys.length - 1) % journeys.length : event.key === 'Home' ? 0 : event.key === 'End' ? journeys.length - 1 : null
                if (next !== null) { event.preventDefault(); selectJourney(next) }
              }}
            >
              <Icon size={23} weight="thin" aria-hidden="true" />
              <span><strong>{label}</strong><small>{detail}</small></span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>)}
          </div>
          <p className="ac-private-note">Your vehicle.<br />Your journey.</p>
        </aside>

        <div className="ac-copy ac-fade" key={`copy-${selected}`} id="ac-journey" role="tabpanel" aria-labelledby={`ac-tab-${selected}`} tabIndex={0}>
          <div className="ac-index"><span>01</span><i /></div>
          <h2 id="airport-transfers-title" className={selected === 2 ? 'ac-long-title' : undefined}>{journey.title}</h2>
          <p>{journey.description}</p>
        </div>

        <div className="ac-visual ac-image-placeholder" role="img" aria-label="Reserved space for the Airport Transfer image" />

        <div className="ac-features ac-fade" key={`features-${selected}`} aria-label="Transfer features">
          {journey.features.map(({ title, copy, icon: Icon }) => <div key={title}>
            <Icon size={22} weight="thin" aria-hidden="true" />
            <strong>{title}</strong>
            <p>{copy}</p>
          </div>)}
        </div>

        <div className="ac-info-bar">
          <div className="ac-price">
            <span>From</span><strong>€70</strong>
            <p>Final price depends on your destination,<br />vehicle and any additional requests.</p>
          </div>
          <div className="ac-actions">
            <button className="sv-button" type="button" onClick={() => onRequest({ service: 'airport', airportPickup: selected === 0 })}>{journey.cta} <ArrowRight size={18} aria-hidden="true" /></button>
          </div>
          <div className="ac-meeting">
            <Info size={20} weight="thin" aria-hidden="true" />
            <div>
              <h4>{journey.meeting}</h4>
              <p className={selected === 0 ? undefined : 'ac-meeting-note-two-lines'}>
                {selected === 1
                  ? <>Your collection point and departure time are<br />confirmed before travel.</>
                  : selected === 2
                    ? <>Where access is restricted, we agree the nearest<br />accessible pick-up point.</>
                    : journey.note}
              </p>
            </div>
            {selected === 0 && <button type="button" onClick={onMeetingPoint}>View meeting point <ArrowRight size={15} aria-hidden="true" /></button>}
          </div>
        </div>
      </div>
    </div>
  </section>
}
