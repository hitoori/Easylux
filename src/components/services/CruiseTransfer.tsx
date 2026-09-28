import { useState } from 'react'
import { cruiseRoutes, priceLabel } from './serviceData'
import type { RequestJourney } from './ServiceRoutes'
import { publicAsset } from '../../lib/publicAsset'
import './cruise-transfer.css'

export default function CruiseTransfer({ onRequest }: { onRequest: RequestJourney }) {
  const [routesOpen, setRoutesOpen] = useState(true)
  return <section id="service-cruise" className="ct-section" aria-labelledby="cruise-title">
    <div className="ct-shell">
      <div className="ct-intro">
        <div className="ct-copy">
          <p className="ct-eyebrow">CRUISE PORT TRANSFERS</p>
          <h2 id="cruise-title">From your door to the cruise terminal.</h2>
          <p className="ct-description">Private transfers between your hotel, airport or chosen address and the cruise terminals in Ravenna, Trieste and Fusina — for both embarkation and disembarkation.</p>
        </div>
      </div>
      <figure className="ct-cruise-photo">
        <img src={publicAsset('images/services/cruise/cruise-port-transfer-ship.jpg')} alt="Cruise ship docked at port at sunset" />
      </figure>
      <div className="ct-journey" role="group" aria-label="Cruise transfer details">
        <div className="ct-journey-detail"><span className="ct-route-label">FROM</span><span className="ct-route-place">Your hotel, airport or address</span></div>
        <div className="ct-journey-detail"><span className="ct-route-label">TERMINALS</span><span className="ct-route-place">Ravenna · Trieste · Fusina</span></div>
        <div className="ct-journey-detail"><span className="ct-route-label">JOURNEY</span><span className="ct-route-place">One way or return</span></div>
      </div>
      <div className="ct-prices">
        <div className="ct-prices-heading"><button type="button" className="ct-text-action" aria-expanded={routesOpen} aria-controls="cruise-route-prices" onClick={() => setRoutesOpen(current => !current)}>{routesOpen ? 'HIDE ROUTES' : 'VIEW ROUTES'} <span aria-hidden="true">{routesOpen ? '↑' : '↓'}</span></button></div>
        <div id="cruise-route-prices" hidden={!routesOpen}>
        <div className="sr-home-head" aria-hidden="true"><span>Route</span><span>Sedan</span><span>Van</span><span>Minibus 12</span><span>Action</span></div>
        <ul className="ct-routes">
          {cruiseRoutes.map(route => <li className="ct-route" key={route.id}>
            <div className="ct-route-heading"><h3>{route.from} <span aria-hidden="true">→</span> {route.to}</h3>
            <p className="ct-direction">Point-to-point private transfer</p></div>
            <dl className="ct-fares">
              <div><dt>Sedan</dt><dd>{priceLabel(route.sedan)}</dd></div>
              <div><dt>Van</dt><dd>{priceLabel(route.van)}</dd></div>
              <div><dt>Minibus 12</dt><dd>{priceLabel(route.minibus)}</dd></div>
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
