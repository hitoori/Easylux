import {
  ArrowRight,
  Boat,
} from '@phosphor-icons/react'

interface VeniceArrivalFeatureProps {
  onPlanJourney: () => void
}

export default function VeniceArrivalFeature({ onPlanJourney }: VeniceArrivalFeatureProps) {
  return (
    <section data-home-arrival className="water-route-section home-flow-section">
      <img
        src="/images/venice-water-taxi.jpg"
        alt=""
        aria-hidden="true"
        className="water-route-background"
      />
      <div className="water-route-background-shade" aria-hidden="true" />
      <img src="/images/water-taxi-route-map.png" alt="" aria-hidden="true" className="water-route-map" />

      <Boat size={38} weight="light" className="water-route-boat" aria-hidden="true" />
      <span className="water-route-label water-route-label-venice">Venice address</span>
      <span className="water-route-label water-route-label-roma">Piazzale Roma</span>
      <span className="water-route-label water-route-label-destination">Final destination</span>

      <div className="water-route-inner">
        <div className="water-route-copy">
          <p className="water-route-kicker">Venice Water Taxi</p>
          <h2>Venice by water,<br />connected by road.</h2>
          <p className="water-route-description">
            Your Water Taxi connects Venice’s historic centre with Piazzale Roma, where your private driver meets you. We coordinate both services, including journeys in the opposite direction. The day before, you receive the boarding point and boat number, with the location confirmed around canal access and tide conditions.
          </p>

          <div className="water-route-rates">
            <div>
              <p>Road transfer</p>
              <strong>from €70</strong>
            </div>
            <div>
              <p>Private water taxi</p>
              <strong className="water-route-gold-rate">€100–140 estimated</strong>
            </div>
          </div>

          <button type="button" onClick={onPlanJourney} className="water-route-cta">
            Plan your connection
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
