import { useState } from 'react'
import { mountainRoutes, priceLabel } from './serviceData'
import type { RequestJourney } from './ServiceRoutes'
import './mountains-transfer.css'

export default function MountainsTransfer({ onRequest }: { onRequest: RequestJourney }) {
  const [routesOpen, setRoutesOpen] = useState(true)
  const [visibleCount, setVisibleCount] = useState(3)
  const requestRoute = (route: typeof mountainRoutes[number]) => onRequest({ service: 'mountains', pickup: route.pickup, destination: route.destination })

  return <section id="service-mountains" className="mt-section" aria-labelledby="mountains-title">
    <div className="mt-shell">
      <h2 id="mountains-title">From the city to the mountains.</h2>
      <div className="mt-panorama" aria-hidden="true" />
      <div className="mt-information">
        <p className="mt-description">Private, door-to-door transfers from Venice to the Dolomites and Italy’s most requested mountain destinations.</p>
        <button type="button" className="mt-request mt-disclosure" aria-expanded={routesOpen} aria-controls="dolomites-route-prices" onClick={() => { setRoutesOpen(current => !current); setVisibleCount(3) }}>{routesOpen ? 'HIDE ROUTES & PRICES' : 'VIEW ROUTES & PRICES'} <span aria-hidden="true">{routesOpen ? '↑' : '↓'}</span></button>
      </div>
      <div id="dolomites-route-prices" className="mt-all-routes" hidden={!routesOpen}>
        <table id="mountain-route-table" className="mt-table" aria-label="All mountain routes and prices">
          <thead><tr><th scope="col">Route</th><th scope="col">Sedan</th><th scope="col">Van</th><th scope="col">Minibus</th><th scope="col">Action</th></tr></thead>
          <tbody>{mountainRoutes.slice(0, visibleCount).map(route => <tr key={route.id}>
            <th scope="row">{route.from} <span className="mt-arrow">→</span> {route.to}</th>
            <td><span className="mt-mobile-label">Sedan</span>{priceLabel(route.sedan)}</td><td><span className="mt-mobile-label">Van</span>{priceLabel(route.van)}</td><td><span className="mt-mobile-label">Minibus</span>{priceLabel(route.minibus)}</td>
            <td className="mt-action"><button type="button" className="mt-request" aria-label={`Request this route: ${route.from} to ${route.to}`} onClick={() => requestRoute(route)}>REQUEST THIS ROUTE <span aria-hidden="true">→</span></button></td>
          </tr>)}</tbody>
        </table>
        {visibleCount < mountainRoutes.length && <div className="mt-more-routes"><button type="button" className="mt-request" aria-controls="mountain-route-table" onClick={() => setVisibleCount(current => Math.min(current + 3, mountainRoutes.length))}>SHOW MORE ROUTES <span aria-hidden="true">↓</span></button></div>}
      </div>
    </div>
  </section>
}
