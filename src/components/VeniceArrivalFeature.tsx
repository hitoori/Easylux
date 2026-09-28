import {
  ArrowRight,
  Boat,
} from '@phosphor-icons/react'
import { publicAsset } from '../lib/publicAsset'

interface VeniceArrivalFeatureProps {
  onPlanJourney: () => void
}

export default function VeniceArrivalFeature({ onPlanJourney }: VeniceArrivalFeatureProps) {
  return (
    <section data-home-arrival className="water-route-section home-flow-section">
      <img
        src={publicAsset('images/home/water-taxi/venice-water-taxi.jpg')}
        alt=""
        aria-hidden="true"
        className="water-route-background"
      />
      <div className="water-route-background-shade" aria-hidden="true" />

      <div className="water-route-inner">
        <div className="water-route-copy">
          <p className="water-route-kicker">Venice Water Taxi</p>
          <h2>Venice by water,<br />connected by road.</h2>
          <div className="water-route-description">
            <p>Travel between Venice’s historic centre and Piazzale Roma with one coordinated service. We arrange your Water Taxi and private chauffeur, including journeys in the opposite direction.</p>
            <p>The day before, you’ll receive the confirmed boarding point and boat number.</p>
          </div>

          <div className="water-route-rates">
            <div>
              <p>Private car</p>
              <strong>from €70</strong>
            </div>
            <div>
              <p>Water taxi</p>
              <strong className="water-route-gold-rate">€100–140 <span>estimated</span></strong>
            </div>
          </div>

          <button type="button" onClick={onPlanJourney} className="water-route-cta">
            Plan your connection
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="water-route-visual">
        <img src={publicAsset('images/home/water-taxi/route-map.png')} alt="" aria-hidden="true" className="water-route-map" />
        <Boat size={38} weight="light" className="water-route-boat" aria-hidden="true" />
        <span className="water-route-label water-route-label-venice">Venice address</span>
        <span className="water-route-label water-route-label-roma">Piazzale Roma</span>
        <span className="water-route-label water-route-label-destination">Final destination</span>
      </div>
    </section>
  )
}
