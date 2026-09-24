import { useEffect, useState } from 'react'
import { ArrowRight, Briefcase, Buildings, CarProfile, ForkKnife, ShoppingBag } from '@phosphor-icons/react'
import { italyRoutes, priceLabel } from './serviceData'
import { ServiceTabs, type RequestJourney } from './ServiceRoutes'
import './water-taxi-map.css'
import './europe-transfer.css'

const crossBorderRoutes = [
  { id: 'italy-austria', from: 'Italy', to: 'Austria', pickup: 'Italy', destination: 'Austria', sedan: 850, van: 980, minibus: 1700 },
  { id: 'italy-slovenia', from: 'Italy', to: 'Slovenia', pickup: 'Italy', destination: 'Slovenia', sedan: 720, van: 840, minibus: 1450 },
  { id: 'italy-croatia', from: 'Italy', to: 'Croatia', pickup: 'Italy', destination: 'Croatia', sedan: 980, van: 1150, minibus: 1950 },
  { id: 'italy-france', from: 'Italy', to: 'France', pickup: 'Italy', destination: 'France', sedan: 1250, van: 1450, minibus: 2400 },
]

export function HourlySection({ onRequest }: { onRequest: RequestJourney }) {
  return <section id="service-hourly" className="sv-section sv-hourly sv-hourly-mockup" aria-labelledby="hourly-title">
    <div className="svc-shell hourly-mockup-shell">
      <div className="hourly-mockup-visual">
        <div className="hourly-mockup-frame" role="img" aria-label="Reserved space for the Chauffeur by the Hour image" />
        <h2 id="hourly-title">Several stops.<br />One chauffeur.</h2>
      </div>

      <div className="hourly-mockup-content">
        <p className="hourly-mockup-description">Book a private chauffeur for a few hours or the entire day. Share your stops, and your driver remains available throughout your itinerary.</p>

        <div className="hourly-mockup-route-wrap">
          <div className="hourly-mockup-route-scroll">
            <div className="hourly-mockup-route" aria-label="Hotel, meeting, lunch, shopping">
              <div><Buildings size={21} weight="thin" aria-hidden="true" /><span>Hotel</span></div>
              <i aria-hidden="true"><ArrowRight size={15} weight="light" /></i>
              <div><Briefcase size={21} weight="thin" aria-hidden="true" /><span>Meeting</span></div>
              <i className="hourly-route-turn" aria-hidden="true"><ArrowRight size={15} weight="light" /><svg className="hourly-route-turn-line" viewBox="0 0 300 40" preserveAspectRatio="none"><path d="M299 0 V16 H1 V38 M-3 32 L1 38 L5 32" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" /></svg></i>
              <div><ForkKnife size={21} weight="thin" aria-hidden="true" /><span>Lunch</span></div>
              <i aria-hidden="true"><ArrowRight size={15} weight="light" /></i>
              <div><ShoppingBag size={21} weight="thin" aria-hidden="true" /><span>Shopping</span></div>
            </div>
          </div>
          <div className="hourly-mockup-details">
            <strong>Minimum booking: 2 hours</strong>
            <p>Price based on time, route and requested stops.</p>
          </div>
        </div>

        <button type="button" className="hourly-mockup-cta" onClick={() => onRequest({ service: 'hourly' })}>Request an hourly quote <ArrowRight size={18} weight="light" aria-hidden="true" /></button>
      </div>
    </div>
  </section>
}

const waterTaxiJourneys = [
  {
    route: 'Route to Venice',
    image: './images/services/water-taxi/arriving-wide-map.png',
    mobileImage: './images/services/water-taxi/arriving-mobile-map-v2.jpg',
    alt: 'Venice transfer map showing Marco Polo Airport, Piazzale Roma and the hotel or nearest landing, connected by private car and water taxi.',
    title: <>One journey.<br /><span>By road and water.</span></>,
    description: 'We monitor your flight and meet you in Arrivals with your name displayed. Your chauffeur assists with luggage and drives you privately to Piazzale Roma, where your Water Taxi continues the journey.',
    note: 'Direct hotel access depends on the canal and landing. Otherwise, the boat stops at the nearest accessible landing.',
    summary: 'Private vehicle and Water Taxi coordinated as one transfer.',
    mobileSummary: 'Your boat number and meeting point are confirmed before travel.',
  },
  {
    route: 'Route from Venice',
    image: './images/services/water-taxi/leaving-wide-map.png',
    mobileImage: './images/services/water-taxi/leaving-mobile-map-v2.jpg',
    alt: 'Departure map from a Venice hotel or nearest landing by private water taxi to Piazzale Roma, then by private car to Marco Polo Airport.',
    title: <>One journey.<br /><span>By road and water.</span></>,
    description: 'The evening before departure, we send you the boat number and exact meeting point. Your private water taxi takes you to Piazzale Roma, where your chauffeur continues the journey to Marco Polo Airport.',
    note: 'Your exact meeting point depends on the hotel and the nearest accessible landing. We confirm all collection details before departure.',
    summary: 'Private water taxi and road transfer coordinated as one continuous journey.',
    mobileSummary: 'Your Water Taxi pick-up point is confirmed before travel, with your driver waiting at Piazzale Roma.',
  },
] as const

export function WaterTaxiSection({ onRequest }: { onRequest: RequestJourney }) {
  const [direction, setDirection] = useState(0)
  const journey = waterTaxiJourneys[direction]
  const changeDirection = (next: number) => {
    if (next === direction) return
    setDirection(next)
  }

  return <section id="service-water-taxi" className="wt-map-section" aria-labelledby="water-title">
    <div className="svc-shell wt-shell">
      <div className={`wt-hero ${direction === 0 ? 'wt-arriving' : 'wt-leaving'}`}>
        <div className="wt-visual-column">
          <div className="wt-hero-maps">
            {waterTaxiJourneys.map((item, index) => <div key={item.route} className={`wt-map-frame wt-map-layer${direction === index ? ' is-active' : ''}`} role="tabpanel" id={`water-panel-${index}`} aria-labelledby={`water-tab-${index}`} aria-hidden={direction !== index} inert={direction !== index} tabIndex={direction === index ? 0 : -1}>
              <picture>
                <source media="(max-width: 820px)" srcSet={item.mobileImage} />
                <img src={item.image} alt={item.alt} width={1983} height={793} loading="eager" decoding="async" />
              </picture>
            </div>)}
          </div>

        </div>
        <div className="wt-hero-copy">
          <header className="wt-heading">
            <h2 id="water-title">{journey.title}</h2>
            <div className="wt-description-slot">
              {waterTaxiJourneys.map((item, index) => <p key={item.route} className={`wt-description${direction === index ? ' is-active' : ''}`} aria-hidden={direction !== index}>{item.description}</p>)}
            </div>
            <p className="wt-description-mobile">We coordinate your private vehicle and Water Taxi as one journey through Piazzale Roma.</p>
          </header>

          <ServiceTabs id="water" labels={['Arriving in Venice', 'Leaving Venice']} mobileLabels={['Arriving', 'Leaving']} selected={direction} onChange={changeDirection} />
          <div className="wt-access-notes">
            {waterTaxiJourneys.map((item, index) => <p key={item.route} className={`wt-access-note${direction === index ? ' is-active' : ''}`} aria-hidden={direction !== index}>{item.note}</p>)}
          </div>
        </div>
          <footer className="wt-booking">
            <div className="wt-summary">
              {waterTaxiJourneys.map((item, index) => <p key={item.route} className={`wt-summary-text${direction === index ? ' is-active' : ''}`} aria-hidden={direction !== index}>{item.summary}</p>)}
              {waterTaxiJourneys.map((item, index) => <p key={`${item.route}-mobile`} className={`wt-summary-text wt-summary-text-mobile${direction === index ? ' is-active' : ''}`} aria-hidden={direction !== index}>{item.mobileSummary}</p>)}
            </div>
            <div className="wt-price-block">
              <div className="wt-fare"><span>Road transfer</span><strong>€80</strong></div>
              <div className="wt-fare"><span>Private water taxi</span><strong>€100–140</strong></div>
            </div>
            <button type="button" className="wt-cta" onClick={() => onRequest({ service: 'water-taxi', airportPickup: direction === 0 })}>REQUEST A WATER TAXI CONNECTION<ArrowRight size={18} weight="light" aria-hidden="true" /></button>
          </footer>
      </div>
    </div>
  </section>
}

function EuropeRouteTable({ routes, region, onRequest }: { routes: typeof italyRoutes; region: string; onRequest: RequestJourney }) {
  const [showAll, setShowAll] = useState(false)
  return <>
    <table className="et-table sr-home-table" id={`et-${region}-routes`} aria-label={`${region} routes and prices`}>
      <thead><tr><th scope="col">Route</th><th scope="col">Sedan</th><th scope="col">Van</th><th scope="col">Minibus 12</th><th scope="col">Action</th></tr></thead>
      <tbody>{(showAll ? routes : routes.slice(0, 3)).map(route => <tr key={route.id}>
        <th scope="row"><span className="sr-route-copy"><span className="sr-route-title">{route.from} <span className="et-arrow">→</span> {route.to}</span><span className="sr-route-note">Point-to-point private transfer</span></span></th>
        <td><span className="et-mobile-label">Sedan</span>{priceLabel(route.sedan)}</td>
        <td><span className="et-mobile-label">Van</span>{priceLabel(route.van)}</td>
        <td><span className="et-mobile-label">Minibus 12</span>{priceLabel(route.minibus)}</td>
        <td className="et-action"><button type="button" className="et-button" aria-label={`Request this route: ${route.from} to ${route.to}`} onClick={() => onRequest({ service: 'europe', pickup: route.pickup, destination: route.destination })}>REQUEST THIS ROUTE <span aria-hidden="true">→</span></button></td>
      </tr>)}</tbody>
    </table>
    <p className="et-fare-note">{region === 'Italy' ? 'Indicative one-way fares from Venice. Your final quote confirms the route, vehicle, availability and any extras.' : 'Indicative fares from Italy. Your final quote confirms the route, vehicle, availability and any extras.'}</p>
    <div className="et-footer">
      <button type="button" className="et-link" onClick={() => onRequest({ service: 'europe' })}>Request a different destination <span aria-hidden="true">→</span></button>
      {routes.length > 3 && <button type="button" className="et-button" aria-expanded={showAll} aria-controls={`et-${region}-routes`} onClick={() => setShowAll(current => !current)}>{showAll ? 'SHOW FEWER ROUTES' : `VIEW ALL ${region.toUpperCase()} ROUTES`} <span aria-hidden="true">{showAll ? '↑' : '↓'}</span></button>}
    </div>
  </>
}

export function EuropeSection({ onRequest, fareRequest = 0 }: { onRequest: RequestJourney; fareRequest?: number }) {
  const [region, setRegion] = useState(0)
  const [routesOpen, setRoutesOpen] = useState(false)

  useEffect(() => {
    if (!fareRequest) return
    setRoutesOpen(true)
    const frame = window.requestAnimationFrame(() => {
      document.getElementById('italy-route-prices')?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [fareRequest])

  return <section id="service-europe" className="et-section" aria-labelledby="europe-title">
    <div className="et-intro">
      <div className="et-photo"><img src="./images/services/unsplash/slovenia-bled.jpg" alt="Lake Bled in Slovenia" loading="lazy" /></div>
      <div className="et-copy">
        <h2 id="europe-title">Your destination<br /><span>doesn’t stop at the border.</span></h2>
        <p className="et-description">Private, door-to-door journeys across Italy and into neighbouring Europe — planned around your route, timing and stops.</p>
        <p className="et-countries"><span>ITALY · AUSTRIA · SLOVENIA</span><span>CROATIA · FRANCE</span></p>
        <div className="et-line" aria-hidden="true" />
        <p className="et-statement">One chauffeur. One private vehicle. Your itinerary.</p>
        <button type="button" className="et-button et-disclosure" aria-expanded={routesOpen} aria-controls="italy-route-prices" onClick={() => setRoutesOpen(current => !current)}>{routesOpen ? 'HIDE ROUTES & PRICES' : 'VIEW ROUTES & PRICES'} <span aria-hidden="true">{routesOpen ? '↑' : '↓'}</span></button>
      </div>
    </div>
    <div id="italy-route-prices" className="et-panel" hidden={!routesOpen}>
      <div className="et-panel-inner">
        <ServiceTabs id="regions" labels={['Italy', 'Europe']} selected={region} onChange={setRegion} />
        <div role="tabpanel" id="regions-panel-0" aria-labelledby="regions-tab-0" hidden={region !== 0} tabIndex={0}>
          <EuropeRouteTable routes={italyRoutes} region="Italy" onRequest={onRequest} />
        </div>
        <div role="tabpanel" id="regions-panel-1" aria-labelledby="regions-tab-1" hidden={region !== 1} tabIndex={0}>
          <EuropeRouteTable routes={crossBorderRoutes} region="Europe" onRequest={onRequest} />
        </div>
      </div>
    </div>
  </section>
}

export { default as MountainsSection } from './MountainsTransfer'

export { default as SeasideSection } from './SeasideTransfer'

export { default as CruiseSection } from './CruiseTransfer'
