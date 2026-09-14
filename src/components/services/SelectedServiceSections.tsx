import { useEffect, useState } from 'react'
import { ArrowRight, Boat, CarProfile, Clock, DoorOpen, MapPinLine, Mountains, Snowflake, User } from '@phosphor-icons/react'
import { coastalRoutes, cruiseRoutes, italyRoutes, mountainRoutes } from './serviceData'
import { RouteList, RouteSection, ServiceTabs, type RequestJourney } from './ServiceRoutes'

const crossBorderRoutes = [
  { id: 'italy-austria', from: 'Italy', to: 'Austria', pickup: 'Italy', destination: 'Austria', sedan: 850, van: 980, minibus: 1700 },
  { id: 'italy-slovenia', from: 'Italy', to: 'Slovenia', pickup: 'Italy', destination: 'Slovenia', sedan: 720, van: 840, minibus: 1450 },
  { id: 'italy-croatia', from: 'Italy', to: 'Croatia', pickup: 'Italy', destination: 'Croatia', sedan: 980, van: 1150, minibus: 1950 },
  { id: 'italy-france', from: 'Italy', to: 'France', pickup: 'Italy', destination: 'France', sedan: 1250, van: 1450, minibus: 2400 },
]

const europeDestinations = [
  { name: 'Italy', image: './images/services/unsplash/italy-milan.jpg' },
  { name: 'Austria', image: './images/services/unsplash/austria-vienna.jpg' },
  { name: 'Slovenia', image: './images/services/unsplash/slovenia-bled.jpg' },
  { name: 'Croatia', image: './images/services/unsplash/croatia-dubrovnik.jpg' },
  { name: 'France', image: './images/services/unsplash/france-paris.jpg' },
] as const

export function HourlySection({ onRequest }: { onRequest: RequestJourney }) {
  return <section id="service-hourly" className="sv-section sv-hourly sv-hourly-editorial" aria-labelledby="hourly-title">
    <div className="svc-shell sv-hourly-main">
      <div className="sv-copy sv-hourly-intro">
        <p className="svc-eyebrow">Chauffeur by the hour</p>
        <h2 id="hourly-title">Several stops. One chauffeur.</h2>
        <p className="sv-lead">Meetings, lunch, shopping or time to explore. Keep one chauffeur and vehicle with you throughout the day, with planned stops, waiting time and flexible pick-ups arranged around your schedule.</p>
        <div className="sv-hourly-ideal">
          <span>Best for</span>
          <p>Days with several addresses and time between appointments.</p>
        </div>
      </div>
      <div className="sv-hourly-visual sv-hourly-image-placeholder" role="img" aria-label="Reserved space for the Chauffeur by the Hour image" />
      <div className="sv-hourly-info">
        <div className="sv-hourly-includes" aria-label="What this service includes">
          <p className="svc-eyebrow">Included in your booking</p>
          <article><span className="sv-hourly-icon"><User size={25} weight="thin" aria-hidden="true" /></span><div><h3>The same driver throughout</h3><p>One trusted chauffeur, all day.</p></div></article>
          <article><span className="sv-hourly-icon"><MapPinLine size={25} weight="thin" aria-hidden="true" /></span><div><h3>Your stops, in your order</h3><p>Share your addresses and schedule.</p></div></article>
          <article><span className="sv-hourly-icon"><Clock size={25} weight="thin" aria-hidden="true" /></span><div><h3>Time between appointments</h3><p>Your chauffeur remains available.</p></div></article>
        </div>
      </div>
    </div>
    <div className="sv-hourly-pricing-band">
      <div className="svc-shell sv-hourly-quote">
        <h3>How pricing works</h3>
        <div className="sv-hourly-price-copy"><p>Your quote depends on booking length, route and requested stops.</p></div>
        <p className="sv-hourly-minimum"><Clock size={17} weight="regular" aria-hidden="true" />Minimum booking: 2 hours</p>
        <button type="button" className="sv-hourly-link" onClick={() => onRequest({ service: 'hourly' })}>Request an hourly quote <ArrowRight size={20} weight="light" aria-hidden="true" /></button>
      </div>
    </div>
  </section>
}

const waterTaxiJourneys = [
  {
    note: 'Flight monitoring, airport welcome, private vehicle and Water Taxi are coordinated as one transfer.',
    steps: [
      { title: 'Flight & airport welcome', copy: 'We monitor your flight and meet you in Arrivals holding a tablet with your name. Your chauffeur assists with your luggage.' },
      { title: 'Drive to Piazzale Roma', copy: 'You travel privately from the airport to Piazzale Roma, where we coordinate your connection with the Water Taxi.' },
      { title: 'Water Taxi to your stay', copy: 'Your private Water Taxi takes you directly to the hotel when canal access is available, or to the nearest accessible landing.' },
    ],
  },
  {
    note: 'Meeting details are sent the evening before. The exact boat number is shared shortly before pick-up.',
    steps: [
      { title: 'Details the evening before', copy: 'We send your meeting point and instructions: directly at the hotel when boat access is permitted, or at the nearest accessible landing.' },
      { title: 'Water Taxi collection', copy: 'A few minutes before pick-up, we send the exact boat number. The Water Taxi collects you and takes you to Piazzale Roma.' },
      { title: 'Meet your chauffeur', copy: 'We meet you at Piazzale Roma, assist with your luggage and drive you privately to the airport or your final destination.' },
    ],
  },
] as const

export function WaterTaxiSection({ onRequest }: { onRequest: RequestJourney }) {
  const [direction, setDirection] = useState(0)
  const journey = waterTaxiJourneys[direction]

  return <section id="service-water-taxi" className="sv-section sv-water sv-water-editorial" aria-labelledby="water-title">
    <div className="svc-shell sv-water-top">
      <div className="sv-water-copy">
        <p className="svc-eyebrow">Venice Water Taxi &amp; private chauffeur</p>
        <h2 id="water-title">Venice by water.<br />The rest by road.</h2>
        <p className="sv-lead">Travel between the airport and Venice with one coordinated chauffeur and private Water Taxi connection through Piazzale Roma.</p>
        <div className="sv-water-benefits" aria-label="Water Taxi service benefits">
          <article><Boat size={32} weight="thin" aria-hidden="true" /><div><h3>Coordinated service</h3><p>Boat and driver<br />coordinated for you.</p></div></article>
          <article><Clock size={32} weight="thin" aria-hidden="true" /><div><h3>Stress-free transfer</h3><p>Every connection<br />arranged in advance.</p></div></article>
          <article><MapPinLine size={32} weight="thin" aria-hidden="true" /><div><h3>A seamless journey</h3><p>A smooth connection<br />to your destination.</p></div></article>
        </div>
      </div>
      <div className="sv-water-visual-column">
        <ServiceTabs id="water" labels={['Arriving in Venice', 'Leaving Venice']} selected={direction} onChange={setDirection} />
        <div className="sv-water-visual sv-water-image-placeholder" role="img" aria-label="Reserved space for the main Water Taxi image" />
      </div>
    </div>

    <div className="svc-shell sv-water-steps" role="tabpanel" id={`water-panel-${direction}`} aria-labelledby={`water-tab-${direction}`} tabIndex={0}>
      {journey.steps.map(({ title, copy }, index) => <article key={title}>
        <span className="sv-water-step-number">0{index + 1}</span>
        <h3>{title}</h3>
        <p>{copy}</p>
        <div className="sv-water-step-image-placeholder" role="img" aria-label={`Reserved space for ${title}`} />
      </article>)}
    </div>

    <div className="sv-water-bottom">
      <div className="svc-shell sv-water-action">
        <div className="sv-water-note"><MapPinLine size={25} weight="thin" aria-hidden="true" /><div><span>Good to know</span><p>{journey.note}</p></div></div>
        <button type="button" className="sv-water-cta" onClick={() => onRequest({ service: 'water-taxi' })}>Request a Water Taxi connection <ArrowRight size={19} weight="light" aria-hidden="true" /></button>
      </div>
    </div>
  </section>
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

  return <section id="service-europe" className="sv-section sv-europe sv-europe-editorial" aria-labelledby="europe-title">
    <div className="svc-shell sv-europe-editorial-shell">
      <div className="sv-europe-editorial-top">
        <div className="sv-europe-editorial-copy">
          <p className="svc-eyebrow">Private transfers across Italy &amp; Europe</p>
          <h2 id="europe-title">A longer journey.<br />Made personal.</h2>
          <p className="sv-lead">Travel between cities with your own driver, from your chosen pick-up to your next address.</p>
          <p className="sv-lead sv-europe-extra">Add an agreed stop for lunch, a break or another place along the way.</p>
          <button type="button" className="sv-europe-primary" onClick={() => onRequest({ service: 'europe' })}>Plan a long-distance journey <ArrowRight size={20} weight="light" aria-hidden="true" /></button>
        </div>

        <figure className="sv-europe-map">
          <div className="sv-europe-map-image" role="img" aria-label="Map showing a private transfer route from Venice through Milan and Florence to Rome" />
          <figcaption>More destinations.<br />Same comfort.<span aria-hidden="true" /></figcaption>
        </figure>

        <div className="sv-europe-editorial-benefits" aria-label="What this service includes">
          <article><span className="sv-europe-benefit-icon"><DoorOpen size={32} weight="thin" aria-hidden="true" /></span><div><h3>From address to address</h3><p>Meet at your agreed pick-up and continue in a private vehicle.</p></div></article>
          <article><span className="sv-europe-benefit-icon"><CarProfile size={32} weight="thin" aria-hidden="true" /></span><div><h3>Room for your plans</h3><p>Share your passengers and luggage so a suitable vehicle can be confirmed.</p></div></article>
          <article><span className="sv-europe-benefit-icon"><MapPinLine size={32} weight="thin" aria-hidden="true" /></span><div><h3>A stop along the way</h3><p>Include a meal break or another address in your request.</p></div></article>
        </div>
      </div>

      <div className="sv-europe-destinations">
        <div className="sv-europe-destinations-copy">
          <p className="svc-eyebrow">Routes &amp; fares</p>
          <h3>Popular destinations</h3>
        </div>
        <div className="sv-europe-destination-rail" aria-label="Available journey regions">
          {europeDestinations.map(destination => <article key={destination.name} className="sv-europe-destination">
            <img src={destination.image} alt="" width="320" height="220" loading="lazy" />
            <span>{destination.name}</span>
          </article>)}
        </div>
        <button type="button" className="sv-europe-show-routes" aria-expanded={routesOpen} aria-controls="italy-route-prices" onClick={() => setRoutesOpen(current => !current)}>{routesOpen ? 'Hide routes' : 'Show routes'} <ArrowRight size={20} weight="light" aria-hidden="true" /></button>
      </div>

      <div id="italy-route-prices" className="sv-europe-route-panel" hidden={!routesOpen}>
        <div className="sv-europe-routes-head">
          <ServiceTabs id="regions" labels={['Italy', 'Europe']} selected={region} onChange={setRegion} />
        </div>
        <div role="tabpanel" id="regions-panel-0" aria-labelledby="regions-tab-0" hidden={region !== 0} tabIndex={0}>
          <RouteList routes={italyRoutes} title="Popular Italian routes" service="europe" onRequest={onRequest} initial={3} moreLabel="View all Italy routes" editorial compact note="Indicative one-way fares from Venice. Your final quote confirms the route, vehicle, availability and any extras." />
        </div>
        <div role="tabpanel" id="regions-panel-1" aria-labelledby="regions-tab-1" hidden={region !== 1} tabIndex={0}>
          <RouteList routes={crossBorderRoutes} title="Cross-border journeys" service="europe" onRequest={onRequest} initial={3} moreLabel="View all Europe routes" editorial compact note="Indicative fares from Italy. Your final quote confirms the route, vehicle, availability and any extras." />
        </div>
      </div>
    </div>
  </section>
}

export function MountainsSection({ onRequest }: { onRequest: RequestJourney }) {
  const [routesOpen, setRoutesOpen] = useState(false)

  return <section id="service-mountains" className="sv-section sv-mountains sv-mountains-new sv-mountains-editorial" aria-labelledby="mountains-title">
    <div className="svc-shell sv-mountains-editorial-shell">
      <div className="sv-mountains-panorama">
        <img src="./images/services/unsplash/dolomites-pass.jpg" alt="Winding road through the Dolomites at golden hour" width="2400" height="1601" loading="lazy" />
        <div className="sv-mountains-overlay" aria-hidden="true" />
        <div className="sv-mountains-editorial-copy">
          <p className="svc-eyebrow">Private transfers to the Dolomites</p>
          <h2 id="mountains-title">Your mountain stay<br />starts here.</h2>
          <p className="sv-mountains-editorial-lead">From your airport, station or address in Italy to your hotel in the Dolomites.<br />Travel in comfort with a private driver and enjoy a scenic, stress-free journey.</p>
          <div className="sv-mountains-benefits" aria-label="Dolomites transfer benefits">
            <article><Mountains size={36} weight="thin" aria-hidden="true" /><div><h3>Scenic routes</h3><p>Breathtaking views,<br />all year round.</p></div></article>
            <article><CarProfile size={36} weight="thin" aria-hidden="true" /><div><h3>Comfort &amp; flexibility</h3><p>Direct transfer to your<br />hotel or accommodation.</p></div></article>
            <article><Snowflake size={36} weight="thin" aria-hidden="true" /><div><h3>All-season travel</h3><p>We adjust to weather<br />and road conditions.</p></div></article>
          </div>
        </div>
        <p className="sv-mountains-caption">Different<br />landscapes.<br />The same comfort.<span aria-hidden="true" /></p>
      </div>

      <div className="sv-mountains-route-bar">
        <div className="sv-mountains-route-heading"><span>Routes &amp; fares</span><h3>Dolomites routes &amp; fares</h3></div>
        <p className="sv-mountains-destinations" aria-label="Popular Dolomites destinations"><span>Cortina d’Ampezzo</span><i /><span>Corvara</span><i /><span>Canazei</span><i /><span>Ortisei</span><i /><span>and more</span></p>
        <button type="button" className="sv-mountains-show-routes" aria-expanded={routesOpen} aria-controls="dolomites-route-prices" onClick={() => setRoutesOpen(current => !current)}>{routesOpen ? 'Hide routes' : 'Show routes & prices'} <ArrowRight size={20} weight="light" aria-hidden="true" /></button>
      </div>

      <div id="dolomites-route-prices" className="sv-mountains-route-panel" hidden={!routesOpen}>
        <RouteList routes={mountainRoutes} title="Dolomites routes and fares" service="mountains" onRequest={onRequest} initial={3} moreLabel="View all Dolomites routes" editorial compact note="Indicative one-way fares apply to the listed route. Other pick-up points in Italy are quoted individually." />
      </div>
    </div>
  </section>
}

export function SeasideSection({ onRequest }: { onRequest: RequestJourney }) {
  return <section id="service-coast" className="sv-section sv-coast sv-coast-new" aria-labelledby="coast-title">
    <div className="svc-shell sv-coast-shell">
      <div className="sv-coast-intro">
        <figure className="sv-coast-hero">
          <img loading="lazy" width="2200" height="1236" src="./images/services/unsplash/jesolo-coast.jpg" alt="Aerial view of the sandy Adriatic shoreline in Jesolo, Italy" />
          <figcaption>Adriatic coast · Veneto, Italy</figcaption>
        </figure>

        <div className="sv-coast-copy">
          <p className="svc-eyebrow">Private transfers to Italy’s Adriatic coast</p>
          <h2 id="coast-title">Straight to<br />your seaside stay.</h2>
          <p className="sv-coast-lead">Bring your bags and holiday plans. Your driver takes you from your chosen pick-up in Italy to your hotel, villa or accessible coastal address.</p>
          <article className="sv-coast-planning"><span aria-hidden="true" /><div><h3>Arrive on your schedule</h3><p>Choose a one-way transfer, a same-day return or collection at the end of your stay.</p></div></article>
        </div>
      </div>

      <p className="sv-coast-caveat">Transport only. Accommodation and activities are not included.</p>

    </div>
    <RouteSection title="Adriatic coast routes & fares"><RouteList routes={coastalRoutes} title="Adriatic coast routes and fares" service="coast" onRequest={onRequest} initial={3} moreLabel="View all coastal routes" editorial compact /></RouteSection>
  </section>
}

export function CruiseSection({ onRequest }: { onRequest: RequestJourney }) {
  return <section id="service-cruise" className="sv-section sv-cruise" aria-labelledby="cruise-title">
    <div className="svc-shell sv-cruise-showcase">
      <div className="sv-cruise-overview">
        <div className="sv-cruise-intro">
        <p className="svc-eyebrow">Cruise port transfers</p>
          <h2 id="cruise-title">Before you sail.<br />After you dock.</h2>
          <p className="sv-cruise-lead">Connect your cruise with the rest of your trip. Travel to Ravenna, Trieste or Fusina, or meet your driver there after disembarking.</p>
        </div>

        <figure className="sv-cruise-photo">
          <img loading="lazy" width="2200" height="1467" src="./images/services/unsplash/venice-cruise-port.jpg" alt="Cruise ship docked at the passenger terminal in Venice" />
        </figure>
      </div>

      <div className="sv-cruise-journeys" aria-label="Cruise transfer directions">
        <article>
          <p className="svc-eyebrow">Going to your cruise</p>
          <div className="sv-cruise-route">
            <h3>Your address</h3>
            <ArrowRight size={43} weight="thin" aria-hidden="true" />
            <strong>Cruise terminal</strong>
          </div>
          <p>Travel directly from your chosen address to Ravenna, Trieste or Fusina cruise terminal.</p>
        </article>

        <article>
          <p className="svc-eyebrow">Leaving your cruise</p>
          <div className="sv-cruise-route">
            <h3>Cruise terminal</h3>
            <ArrowRight size={43} weight="thin" aria-hidden="true" />
            <strong>Your next stop</strong>
          </div>
          <p>Meet your driver at the terminal and continue to your hotel, airport or another address.</p>
        </article>
      </div>

      <p className="sv-cruise-flexibility">Reserve either direction, or arrange both together.</p>
    </div>
    <RouteSection title="Cruise port routes & fares"><RouteList routes={cruiseRoutes} title="Cruise port transfer prices" service="cruise" onRequest={onRequest} initial={3} editorial compact footer={<p className="sv-fine-print">Displayed fares cover road transfer only. Water Taxi connections and return journeys are quoted separately.</p>} /></RouteSection>
  </section>
}
