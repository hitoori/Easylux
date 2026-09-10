import { useState } from 'react'
import { AirplaneLanding, AirplaneTakeoff, ArrowRight, MapPin } from '@phosphor-icons/react'
import type { RequestJourney } from './ServiceRoutes'
import './airport-transfers.css'
import './airport-concierge.css'

const journeys = [
  { label: 'From the airport', detail: 'An easy arrival', icon: AirplaneLanding, from: 'Airport arrivals', to: 'Your hotel or address', title: 'Your driver meets you in Arrivals.', description: 'After baggage claim, look for your name. Continue to your destination in a private vehicle, with help for your luggage.', prepare: 'Share your flight number', preparation: 'We follow the live arrival time. Your quote confirms the included waiting time and any additional charge.', meeting: 'A familiar face, even on your first visit.', note: 'Your meeting instructions are sent before travel.' },
  { label: 'To the airport', detail: 'A considered departure', icon: AirplaneTakeoff, from: 'Your hotel or address', to: 'Airport departures', title: 'Leave with your pick-up arranged.', description: 'Meet your chauffeur at the agreed address and travel directly to your departure terminal, with help for your luggage.', prepare: 'Share your departure details', preparation: 'Send your airport, flight number and departure time so your collection time can be agreed.', meeting: 'The right terminal. A clear meeting time.', note: 'Your collection point and terminal are confirmed before travel.' },
  { label: 'Address to address', detail: 'The next part of your trip', icon: MapPin, from: 'Your pick-up address', to: 'Your next destination', title: 'One address to the next. Privately.', description: 'Connect your hotel, station or another accessible address with a private chauffeur. Your route follows your plans.', prepare: 'Share both addresses', preparation: 'Add your date, preferred time and luggage. Tell us about access restrictions so the meeting point can be confirmed.', meeting: 'Your route, with the details agreed.', note: 'Where vehicle access is restricted, we agree the nearest accessible pick-up point.' },
]

export default function AirportTransfers({ onMeetingPoint, onRequest }: { onMeetingPoint: () => void; onRequest: RequestJourney }) {
  const [selected, setSelected] = useState(0)
  const journey = journeys[selected]
  return <section id="service-airport" className="airport-transfers airport-concierge" aria-labelledby="airport-transfers-title">
    <div className="svc-shell ac-shell">
      <header className="ac-heading">
        <div><p className="svc-eyebrow">Airport &amp; city transfers</p><h2 id="airport-transfers-title">Arrive at ease.<br />Leave in good hands.</h2></div>
        <p className="ac-intro">A private chauffeur for the connections that make your trip flow. From the airport to your hotel, or from one address to the next.</p>
      </header>
      <div className="ac-experience">
        <div className="ac-choices" role="tablist" aria-label="Choose your transfer" aria-orientation="vertical">
          {journeys.map(({ label, detail, icon: Icon }, index) => <button key={label} type="button" role="tab" id={`ac-tab-${index}`} aria-controls="ac-journey" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => {
            const next = event.key === 'ArrowDown' ? (index + 1) % journeys.length : event.key === 'ArrowUp' ? (index + journeys.length - 1) % journeys.length : event.key === 'Home' ? 0 : event.key === 'End' ? journeys.length - 1 : null
            if (next !== null) { event.preventDefault(); setSelected(next); document.getElementById(`ac-tab-${next}`)?.focus() }
          }}><Icon size={26} weight="thin" aria-hidden="true" /><span><strong>{label}</strong><small>{detail}</small></span><ArrowRight size={19} aria-hidden="true" /></button>)}
          <p className="ac-private-note">Your vehicle.<br />Your journey.</p>
        </div>
        <div className="ac-journey" id="ac-journey" role="tabpanel" aria-labelledby={`ac-tab-${selected}`} tabIndex={0}>
          <div className="ac-route" aria-label={`${journey.from} to ${journey.to}`}><div><span>Pick-up</span><strong>{journey.from}</strong></div><ArrowRight size={32} weight="thin" aria-hidden="true" /><div><span>Destination</span><strong>{journey.to}</strong></div></div>
          <div className="ac-details"><div className="ac-main-copy"><h3>{journey.title}</h3><p>{journey.description}</p></div><div className="ac-preparation"><span className="ac-small-label">Before you travel</span><h4>{journey.prepare}</h4><p>{journey.preparation}</p></div></div>
          <div className="ac-meeting"><MapPin size={21} weight="thin" aria-hidden="true" /><div><h4>{journey.meeting}</h4><p>{journey.note}</p></div>{selected === 0 && <button type="button" onClick={onMeetingPoint}>View meeting point <ArrowRight size={17} aria-hidden="true" /></button>}</div>
          <div className="ac-action"><p>Vehicle and price agreed before you confirm.</p><button className="sv-button" type="button" onClick={() => onRequest({ service: 'airport', airportPickup: selected === 0 })}>Get a transfer quote <ArrowRight size={19} aria-hidden="true" /></button></div>
        </div>
      </div>
    </div>
  </section>
}
