import { useState } from 'react'
import { cruiseRoutes, priceLabel } from './serviceData'
import type { RequestJourney } from './ServiceRoutes'
import './cruise-transfer.css'

export default function CruiseTransfer({ onRequest }: { onRequest: RequestJourney }) {
  const [routesOpen, setRoutesOpen] = useState(true)
  return <section id="service-cruise" className="ct-section" aria-labelledby="cruise-title">
    <div className="ct-shell">
      <div className="ct-intro">
        <div className="ct-copy">
          <p className="ct-eyebrow">CRUISE PORT TRANSFERS</p>
          <h2 id="cruise-title">Private transfers to<br />your cruise terminal.</h2>
          <p className="ct-description">Travel between your hotel, airport or chosen address and the cruise terminals in Ravenna, Trieste or Fusina. Available for both embarkation and disembarkation.</p>
        </div>
        <div className="ct-journey" aria-label="Private transfers between your address and Ravenna, Trieste or Fusina cruise terminals">
          <div className="ct-stops" aria-hidden="true"><span>Your address</span><span>Ravenna</span><span>Trieste</span><span>Fusina</span><span>Cruise terminal</span></div>
          <p>ONE WAY OR BOTH DIRECTIONS</p>
        </div>
      </div>
      <div className="ct-prices">
        <div className="ct-prices-heading"><button type="button" className="ct-text-action" aria-expanded={routesOpen} aria-controls="cruise-route-prices" onClick={() => setRoutesOpen(current => !current)}>{routesOpen ? 'HIDE ROUTES' : 'VIEW ROUTES'} <span aria-hidden="true">{routesOpen ? '↑' : '↓'}</span></button></div>
        <div id="cruise-route-prices" hidden={!routesOpen}>
        <ul className="ct-routes">
          {cruiseRoutes.map(route => <li className="ct-route" key={route.id}>
            <div className="ct-route-heading"><h3>{route.to}</h3>
            <p className="ct-direction">Venice / chosen address <span aria-hidden="true">↔</span> terminal</p></div>
            <dl className="ct-fares">
              <div><dt>Sedan</dt><dd>{priceLabel(route.sedan)}</dd></div>
              <div><dt>Van</dt><dd>{priceLabel(route.van)}</dd></div>
              <div><dt>Minibus</dt><dd>{priceLabel(route.minibus)}</dd></div>
            </dl>
            <button type="button" className="ct-text-action ct-request" aria-label={`Request this route: ${route.from} to ${route.to}`} onClick={() => onRequest({ service: 'cruise', pickup: route.pickup, destination: route.destination })}>REQUEST THIS ROUTE <span aria-hidden="true">→</span></button>
          </li>)}
        </ul>
        <div className="ct-footer">
          <p className="ct-fare-note">One-way fares. Your final price is confirmed before booking.</p>
          <button type="button" className="ct-text-action" onClick={() => onRequest({ service: 'cruise' })}>Request a different route <span aria-hidden="true">→</span></button>
        </div>
        </div>
      </div>
    </div>
  </section>
}
