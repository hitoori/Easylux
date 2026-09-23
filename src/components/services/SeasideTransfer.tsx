import { useState } from 'react'
import { coastalRoutes, priceLabel } from './serviceData'
import type { RequestJourney } from './ServiceRoutes'
import './seaside-transfer.css'

const featuredRoutes = [
  { ...coastalRoutes[0], to: 'Jesolo', minibusLabel: 'Minibus' },
  { id: 'marco-polo-bibione', from: 'Marco Polo', to: 'Bibione', pickup: 'Venice Marco Polo Airport (VCE)', destination: 'Bibione', airportMode: 'pickup' as const, sedan: 220, van: 250, minibus: 480, minibusLabel: 'Minibus' },
  { id: 'marco-polo-lignano-sabbiadoro', from: 'Marco Polo', to: 'Lignano Sabbiadoro', pickup: 'Venice Marco Polo Airport (VCE)', destination: 'Lignano Sabbiadoro', airportMode: 'pickup' as const, sedan: 220, van: 250, minibus: 480, minibusLabel: 'Minibus' },
]
const routes = [...featuredRoutes, ...coastalRoutes.filter(route => route.id !== featuredRoutes[0].id).map(route => ({ ...route, minibusLabel: 'Minibus' }))]
const fare = (amount: number | null) => amount === null ? '€—' : priceLabel(amount)

export default function SeasideTransfer({ onRequest }: { onRequest: RequestJourney }) {
  const [visibleCount, setVisibleCount] = useState(3)

  return <section id="service-coast" className="cs-section" aria-labelledby="coast-title">
    <div className="cs-shell">
      <div className="cs-intro">
        <div className="cs-copy">
          <h2 id="coast-title">The coast,<br /> without the connections.</h2>
          <p className="cs-description">Private, door-to-door transfers from Venice to Italy’s Adriatic seaside destinations.</p>
        </div>
        <div className="cs-visual"><div className="cs-panorama" aria-hidden="true" /><p className="cs-caption">Hotel, villa or marina — directly to the address you choose.</p></div>
      </div>
      <div id="coast-route-prices" className="cs-all-routes">
        <ol id="coast-route-list" className="cs-route-grid">
          {routes.slice(0, visibleCount).map((route, index) => <li className="cs-route" key={route.id}>
            <span className="cs-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <h3 className={`${route.from} ${route.to}`.length > 27 ? 'cs-long-route' : undefined}><span className="cs-origin">{route.from} <span className="cs-arrow">→</span></span> <span className="cs-destination">{route.to}</span></h3>
            <dl className="cs-fares"><div><dt>Sedan</dt><dd>{fare(route.sedan)}</dd></div><div><dt>Van</dt><dd>{fare(route.van)}</dd></div><div><dt>{route.minibusLabel}</dt><dd>{fare(route.minibus)}</dd></div></dl>
            <button type="button" className="cs-route-request" aria-label={`Request this route: ${route.from} to ${route.to}`} onClick={() => onRequest({ service: 'coast', pickup: route.pickup, destination: route.destination, airportPickup: route.airportMode === 'pickup' })}>REQUEST THIS ROUTE <span aria-hidden="true">→</span></button>
          </li>)}
        </ol>
        <div className="cs-footer"><p>One-way fares. Final price confirmed before booking.</p>
        {visibleCount < routes.length && <div className="cs-more-routes">
          <button type="button" className="cs-route-request" aria-controls="coast-route-list" onClick={() => setVisibleCount(current => Math.min(current + 3, routes.length))}>VIEW MORE SEASIDE ROUTES <span aria-hidden="true">↓</span></button>
        </div>}
        </div>
      </div>
    </div>
  </section>
}
