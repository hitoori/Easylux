import ClientStories from './ClientStories'
import JourneyRequest from './JourneyRequest'

interface HomeClosingSectionsProps {
  onPlanJourney: () => void
}

const bookingSteps = [
  ['01', 'Share your journey', 'Tell us your route, date, passengers and any stops or special requests.'],
  ['02', 'Confirm the details', 'We check availability and send your personalised quote. Your journey is secured once everything is agreed.'],
  ['03', 'Meet your chauffeur', 'Your chauffeur will be waiting at the agreed meeting point, ready for your journey.'],
]

export default function HomeClosingSections({ onPlanJourney }: HomeClosingSectionsProps) {
  return (
    <div className="home-closing">
      <section className="h2-process booking-process" aria-labelledby="booking-process-title">
        <div className="booking-process-intro">
          <p className="h2-kicker">Process</p>
          <h2 id="booking-process-title">How booking works.</h2>
          <p className="booking-process-description">Tell us where you’re going. We’ll take care of the details.</p>
        </div>
        <ol className="booking-process-steps">
          {bookingSteps.map(([number, title, copy]) => (
            <li key={number}>
              <span className="booking-process-number" aria-hidden="true">{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
        <button type="button" className="booking-process-start" onClick={onPlanJourney}>
          Start your request <span aria-hidden="true">→</span>
        </button>
      </section>

      <ClientStories />

      <JourneyRequest />

    </div>
  )
}
