import { useEffect, useState } from 'react'
import { ArrowRight, Briefcase, Buildings, CarProfile, ForkKnife, ShoppingBag } from '@phosphor-icons/react'
import { italyRoutes, priceLabel } from './serviceData'
import { ServiceTabs, type RequestJourney } from './ServiceRoutes'
import './water-taxi-map.css'
import './europe-transfer.css'
import { publicAsset } from '../../lib/publicAsset'

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
        <div className="hourly-mockup-frame"><img src={publicAsset('images/services/hourly/several-stops-chauffeur.jpg')} alt="Chauffeur welcoming a passenger into a private vehicle" loading="lazy" /></div>
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
    image: publicAsset('images/services/water-taxi/arriving-wide-map.png'),
    mobileImage: publicAsset('images/services/water-taxi/arriving-mobile-map-v2.jpg'),
    alt: 'Venice transfer map showing Marco Polo Airport, Piazzale Roma and the hotel or nearest landing, connected by private car and water taxi.',
    title: <>From the airport to your<br /><span>hotel in Venice.</span></>,
    description: 'We meet you at Marco Polo Airport and drive you to Piazzale Roma. From there, a private water taxi takes you to your hotel or the nearest accessible landing.',
    note: <>Hotel access depends on the canal<br />and available landing point.</>,
  },
  {
    route: 'Route from Venice',
    image: publicAsset('images/services/water-taxi/leaving-wide-map.png'),
    mobileImage: publicAsset('images/services/water-taxi/leaving-mobile-map-v2.jpg'),
    alt: 'Departure map from a Venice hotel or nearest landing by private water taxi to Piazzale Roma, then by private car to Marco Polo Airport.',
    title: <>From your hotel in Venice<br className="wt-mobile-title-break" /><br className="wt-desktop-title-break" /><span>to the airport.</span></>,
    description: 'A private water taxi collects you at your hotel or the nearest accessible landing and takes you to Piazzale Roma. From there, your chauffeur drives you to Marco Polo Airport.',
    note: 'Your exact pick-up point depends on the canal and available landing. We confirm it before departure.',
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
            <p className="wt-eyebrow">VENICE AIRPORT TRANSFER</p>
          <h2 id="water-title" className={direction === 1 ? 'wt-leaving-title' : undefined}>{journey.title}</h2>
            <div className="wt-description-slot">
              {waterTaxiJourneys.map((item, index) => <p key={item.route} className={`wt-description${direction === index ? ' is-active' : ''}`} aria-hidden={direction !== index}>{item.description}</p>)}
            </div>
          </header>

          <ServiceTabs id="water" labels={['Arriving in Venice', 'Leaving Venice']} mobileLabels={['Arriving', 'Leaving']} selected={direction} onChange={changeDirection} />
        </div>
          <footer className="wt-booking">
            <div className="wt-access-notes">
              {waterTaxiJourneys.map((item, index) => <p key={item.route} className={`wt-access-note${direction === index ? ' is-active' : ''}`} aria-hidden={direction !== index}>{item.note}</p>)}
            </div>
            <div className="wt-price-block">
              <div className="wt-fare"><span>Private car</span><strong><span className="wt-price-prefix">From </span>€80</strong></div>
              <div className="wt-fare"><span>Water taxi</span><strong>€100–140</strong></div>
            </div>
            <button type="button" className="wt-cta" onClick={() => onRequest({ service: 'water-taxi', airportPickup: direction === 0 })}>REQUEST THIS TRANSFER<ArrowRight size={18} weight="light" aria-hidden="true" /></button>
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
    <div className="et-footer">
      <div className="et-footer-copy">
        <p className="et-fare-note">{region === 'Italy' ? 'One-way fares from Venice. Final prices depend on route, vehicle and availability.' : 'Indicative fares from Italy. Final prices depend on the route, vehicle, availability and extras.'}<button type="button" className="et-button et-destination-button" onClick={() => onRequest({ service: 'europe' })}><span className="et-desktop-copy">Request a different destination</span><span className="et-mobile-copy">Different destination?</span><span className="et-destination-arrow" aria-hidden="true">→</span></button></p>
      </div>
      {routes.length > 3 && <button type="button" className="et-button et-view-all" aria-expanded={showAll} aria-controls={`et-${region}-routes`} onClick={() => setShowAll(current => !current)}>{showAll ? 'Show fewer routes' : `View all ${region} routes`} <span aria-hidden="true">{showAll ? '↑' : '↓'}</span></button>}
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
      <div className="et-photo"><img src={publicAsset('images/services/europe/italy-europe-chauffeur.jpg')} alt="Chauffeur welcoming a passenger into a private vehicle" loading="lazy" /></div>
      <div className="et-copy">
        <p className="et-eyebrow">ITALY &amp; EUROPE</p>
        <h2 id="europe-title"><span className="et-desktop-copy">Private transfers across<br />Italy and Europe.</span><span className="et-mobile-copy"><span className="et-mobile-title-line">Your destination doesn’t</span><br />stop at the border.</span></h2>
        <p className="et-description"><span className="et-desktop-copy">Travel between cities, hotels and destinations with a private chauffeur. Tell us where you’re going and when. We’ll arrange the route and any stops along the way.</span><span className="et-mobile-copy">Going beyond Venice? Tell us where you’d like to go and when. We’ll plan the drive and make room for any stops along the way.</span></p>
        <p className="et-countries"><span>ITALY <i className="et-country-separator" aria-hidden="true">·</i> AUSTRIA <i className="et-country-separator" aria-hidden="true">·</i> SLOVENIA</span>{' '}<span>CROATIA <i className="et-country-separator" aria-hidden="true">·</i> FRANCE</span></p>
        <div className="et-line" aria-hidden="true" />
        <p className="et-statement">One chauffeur. One private vehicle. Your itinerary.</p>
        <button type="button" className="et-button et-disclosure" aria-expanded={routesOpen} aria-controls="italy-route-prices" onClick={() => setRoutesOpen(current => !current)}>{routesOpen ? 'HIDE ROUTES & PRICES' : 'SEE ROUTES & PRICES'} <span aria-hidden="true">{routesOpen ? '↑' : '↓'}</span></button>
      </div>
    </div>
    <div id="italy-route-prices" className="et-panel" data-open={routesOpen}>
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
