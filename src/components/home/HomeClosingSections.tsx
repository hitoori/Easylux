import { ArrowRight, CaretRight, RadioButton } from '@phosphor-icons/react'
import ClientStories from './ClientStories'
import JourneyRequest from './JourneyRequest'

interface HomeClosingSectionsProps {
  onPlanJourney: () => void
}

const bookingSteps = [
  ['01', 'Tell us your plans', 'Share your route, date, passengers and luggage. Add your flight number for an airport pick-up and any stops or waiting you need.'],
  ['02', 'Agree your transfer', 'We check availability and send a personalised quote. Your booking is confirmed once the price and journey details are agreed with you.'],
  ['03', 'Meet your chauffeur', 'For airport arrivals, we monitor your flight and meet you after baggage claim with your name on a tablet. Other pick-ups use your agreed meeting point.'],
]

export default function HomeClosingSections({ onPlanJourney }: HomeClosingSectionsProps) {
  return (
    <div className="home-closing">
      <section className="h2-process booking-process" aria-labelledby="booking-process-title">
        <div className="booking-process-intro">
          <p className="h2-kicker">Process</p>
          <h2 id="booking-process-title">How booking<br /> works.</h2>
          <p className="booking-process-description">Your request starts the conversation. We agree the route, price and pick-up details with you before you travel.</p>
          <button type="button" className="booking-process-start" onClick={onPlanJourney}>
            Start your request <ArrowRight size={22} weight="light" aria-hidden="true" />
          </button>
        </div>
        <ol className="booking-process-steps">
          {bookingSteps.map(([number, title, copy], index) => (
            <li key={number}>
              <span className="booking-process-number" aria-hidden="true">{number}</span>
              <div className="booking-process-track" aria-hidden="true">
                <RadioButton className="booking-process-node" size={52} weight="fill" />
                {index < bookingSteps.length - 1 && <CaretRight className="booking-process-direction" size={18} weight="light" />}
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <ClientStories />

      <JourneyRequest />

    </div>
  )
}
