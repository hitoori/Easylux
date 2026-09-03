import { useState } from 'react'
import { AirplaneLanding, AirplaneTakeoff, ArrowRight, Car, Clock, IdentificationCard, MapPin, type Icon } from '@phosphor-icons/react'
import { ServiceTabs, type RequestJourney } from './ServiceRoutes'
import './airport-transfers.css'

type Step = { icon: Icon; title: string; text: string }
const arrivalSteps: Step[] = [
  { icon: AirplaneLanding, title: 'Share your flight', text: 'Your flight number lets us follow the live arrival time.' },
  { icon: IdentificationCard, title: 'Meet in Arrivals', text: 'After baggage claim, find your driver holding your name.' },
  { icon: Car, title: 'Travel to your address', text: 'Continue privately to your destination with luggage assistance.' },
]
const departureSteps: Step[] = [
  { icon: AirplaneTakeoff, title: 'Share your departure', text: 'Send the airport, flight number, departure time and pick-up address.' },
  { icon: Clock, title: 'Confirm your pick-up', text: 'Your collection time and accessible meeting point are agreed in advance.' },
  { icon: Car, title: 'Arrive at the terminal', text: 'Travel directly to the correct terminal with luggage assistance.' },
]
const addressSteps: Step[] = [
  { icon: MapPin, title: 'Share both addresses', text: 'Add your travel date and preferred pick-up time.' },
  { icon: Clock, title: 'Confirm vehicle access', text: 'Meet at the address or the nearest point the vehicle can reach.' },
  { icon: Car, title: 'Travel door to door', text: 'Continue directly to your destination with luggage assistance.' },
]

const stepVariants = [arrivalSteps, departureSteps, addressSteps]
const meetingTitles = ['Your Arrivals meeting point', 'Your airport drop-off', 'Your pick-up point']
const meetingDescriptions = [
  'See where to find your driver after baggage claim.',
  'Your terminal and collection time are confirmed from your flight details.',
  'Share any access restrictions so the closest meeting point can be confirmed.',
]

// Inactive copy reserves its natural space, but is hidden visually and from assistive technology.
function StableText({ texts, selected }: { texts: string[]; selected: number }) {
  return <span className="airport-stable-text">{texts.map((text, index) => <span key={text} aria-hidden={index !== selected} className={index === selected ? 'is-current' : undefined}>{text}</span>)}</span>
}

function TransferSteps({ selected }: { selected: number }) {
  return <ol className="airport-steps">
    {stepVariants[selected].map(({ icon: StepIcon }, index) => <li key={index}>
      <div className="airport-step-marker" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span></div>
      <StepIcon className="airport-step-icon" size={58} weight="thin" aria-hidden="true" />
      <h3><StableText texts={stepVariants.map(steps => steps[index].title)} selected={selected} /></h3>
      <p><StableText texts={stepVariants.map(steps => steps[index].text)} selected={selected} /></p>
    </li>)}
  </ol>
}

export default function AirportTransfers({ onMeetingPoint, onRequest }: { onMeetingPoint: () => void; onRequest: RequestJourney }) {
  const [service, setService] = useState(0)
  const [direction, setDirection] = useState(0)
  const arriving = service === 0 && direction === 0
  const selected = service === 1 ? 2 : direction
  const process = <div className="airport-process-layout">
    <div>
      <TransferSteps selected={selected} />
      <p className="airport-waiting-note">Your quote confirms the included waiting time and any additional waiting charge.</p>
    </div>
    <aside className="airport-meeting">
      <h3><StableText texts={meetingTitles} selected={selected} /></h3>
      <p><StableText texts={meetingDescriptions} selected={selected} /></p>
      <button type="button" className={`sv-button${arriving ? '' : ' airport-reserved-control'}`} disabled={!arriving} aria-hidden={!arriving} onClick={onMeetingPoint}>See Arrivals meeting point <ArrowRight size={21} aria-hidden="true" /></button>
      <p className="airport-meeting-note">Final meeting instructions are sent before travel.</p>
    </aside>
  </div>

  return <section id="service-airport" className="airport-transfers" aria-labelledby="airport-transfers-title">
    <div className="svc-shell airport-content">
      <p className="svc-eyebrow">Venice airport &amp; private transfers</p>
      <h2 id="airport-transfers-title">Choose your pick-up. Travel directly.</h2>
      <p className="airport-intro">Book an airport transfer or an address-to-address journey. Flight details, meeting point, luggage and timing are confirmed before travel.</p>
      <div className="airport-family-tabs"><ServiceTabs id="private-transfer" labels={['Airport transfers', 'Address-to-address']} selected={service} onChange={setService} ariaLabel="Private transfer type" /></div>
      <div className={`airport-direction-tabs${service === 1 ? ' airport-reserved-control' : ''}`} aria-hidden={service === 1} inert={service === 1}><ServiceTabs id="airport-direction" labels={['From the airport', 'To the airport']} selected={direction} onChange={setDirection} ariaLabel="Airport transfer direction" /></div>
      <div id="private-transfer-panel-0" role="tabpanel" aria-labelledby="private-transfer-tab-0" hidden={service !== 0}>
        {[0, 1].map(index => <div key={index} id={`airport-direction-panel-${index}`} role="tabpanel" aria-labelledby={`airport-direction-tab-${index}`} hidden={direction !== index}>{direction === index && service === 0 && process}</div>)}
      </div>
      <div id="private-transfer-panel-1" role="tabpanel" aria-labelledby="private-transfer-tab-1" hidden={service !== 1}>{service === 1 && process}</div>
      <button type="button" className="sv-text-link airport-request" onClick={() => onRequest({ service: 'airport', airportPickup: arriving })}>Request a transfer quote <ArrowRight size={18} aria-hidden="true" /></button>
    </div>
  </section>
}
