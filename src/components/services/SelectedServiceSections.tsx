import { useState } from 'react'
import { ArrowRight, CarProfile, Circle, Clock, DoorOpen, MapPinLine, User } from '@phosphor-icons/react'
import { coastalRoutes, cruiseRoutes, italyRoutes, mountainRoutes } from './serviceData'
import { RouteList, RouteSection, ServiceTabs, type RequestJourney } from './ServiceRoutes'

const crossBorderRoutes = [
  { id: 'italy-austria', from: 'Italy', to: 'Austria', pickup: 'Italy', destination: 'Austria', sedan: 850, van: 980, minibus: 1700 },
  { id: 'italy-slovenia', from: 'Italy', to: 'Slovenia', pickup: 'Italy', destination: 'Slovenia', sedan: 720, van: 840, minibus: 1450 },
  { id: 'italy-croatia', from: 'Italy', to: 'Croatia', pickup: 'Italy', destination: 'Croatia', sedan: 980, van: 1150, minibus: 1950 },
  { id: 'italy-france', from: 'Italy', to: 'France', pickup: 'Italy', destination: 'France', sedan: 1250, van: 1450, minibus: 2400 },
]

export function HourlySection({ onRequest }: { onRequest: RequestJourney }) {
  return <section id="service-hourly" className="sv-section sv-hourly" aria-labelledby="hourly-title">
    <div className="svc-shell sv-editorial sv-hourly-grid">
      <div className="sv-copy">
        <p className="svc-eyebrow">Chauffeur by the hour</p>
        <h2 id="hourly-title">A private chauffeur,<br />available between every stop.</h2>
        <p className="sv-lead">Book by the hour when your day includes several addresses, waiting time or a changing schedule. Your chauffeur and vehicle remain available for the agreed booking period.</p>
        <div className="sv-hourly-ideal">
          <span>Best for</span>
          <p>Business appointments, shopping, restaurants or any day with several stops.</p>
        </div>
      </div>
      <div className="sv-hourly-includes" aria-label="What this service includes">
        <p className="svc-eyebrow">Included in your booking</p>
        <article><User size={28} weight="thin" aria-hidden="true" /><div><h3>Dedicated chauffeur</h3><p>One driver and vehicle remain assigned to your booking.</p></div></article>
        <article><MapPinLine size={28} weight="thin" aria-hidden="true" /><div><h3>Flexible route</h3><p>Choose the addresses, order of stops and timing.</p></div></article>
        <article><Clock size={28} weight="thin" aria-hidden="true" /><div><h3>Waiting between stops</h3><p>Your chauffeur stays available for the agreed booking period.</p></div></article>
      </div>
    </div>
    <div className="svc-shell sv-hourly-quote">
      <h3>How pricing works</h3>
      <div className="sv-hourly-price-copy">
        <p>Your quote is based on booking length, route, vehicle, waiting time and requested stops.</p>
        <p className="sv-hourly-minimum"><Clock size={14} weight="regular" aria-hidden="true" />Minimum booking: 2 hours</p>
      </div>
      <button type="button" className="sv-hourly-link" onClick={() => onRequest({ service: 'hourly' })}>Request an hourly quote <ArrowRight size={20} weight="light" aria-hidden="true" /></button>
    </div>
  </section>
}

const waterTaxiJourneys = [
  {
    steps: [
      { title: 'Meet your chauffeur', copy: 'Start from your chosen address and travel to Piazzale Roma.' },
      { title: 'Change at Piazzale Roma', copy: 'Your chauffeur connects you with the confirmed private Water Taxi.' },
      { title: 'Continue by Water Taxi', copy: 'Travel to the closest accessible landing in Venice.' },
    ],
  },
  {
    steps: [
      { title: 'Meet your Water Taxi', copy: 'Board at the confirmed landing and time in Venice.' },
      { title: 'Change at Piazzale Roma', copy: 'Your chauffeur waits at the agreed meeting point.' },
      { title: 'Continue by chauffeur', copy: 'Travel privately to the airport, hotel or next address.' },
    ],
  },
] as const

export function WaterTaxiSection({ onRequest }: { onRequest: RequestJourney }) {
  const [direction, setDirection] = useState(1)
  const journey = waterTaxiJourneys[direction]

  return <section id="service-water-taxi" className="sv-section sv-water" aria-labelledby="water-title">
    <div className="svc-shell sv-water-illustrated-intro">
      <div>
        <p className="svc-eyebrow">Venice Water Taxi &amp; private chauffeur</p>
        <h2 id="water-title">One journey, coordinated<br />across water and road.</h2>
      </div>
      <div className="sv-water-intro-copy">
        <p className="sv-lead">Combine a private Water Taxi in Venice with a chauffeur transfer at Piazzale Roma. Both meeting points and timings are confirmed before travel.</p>
        <ServiceTabs id="water" labels={['Arriving in Venice', 'Leaving Venice']} selected={direction} onChange={setDirection} />
      </div>
    </div>

    <div className="sv-water-story" role="tabpanel" id={`water-panel-${direction}`} aria-labelledby={`water-tab-${direction}`} tabIndex={0}>
      <img src="./images/services/water-taxi/connection.png" alt="Illustrated route from Venice by private Water Taxi to Piazzale Roma, continuing by chauffeur." width="1772" height="887" loading="lazy" />
      {journey.steps.map(({ title, copy }, index) => <article className={`sv-water-story-point sv-water-story-point-${index + 1}`} key={title}>
        <span>0{index + 1}</span>
        <div><h3>{title}</h3><p>{copy}</p></div>
      </article>)}
    </div>

    <div className="svc-shell sv-water-action"><button type="button" className="sv-water-cta" onClick={() => onRequest({ service: 'water-taxi' })}>Request a Water Taxi connection <ArrowRight size={19} weight="light" aria-hidden="true" /></button></div>
  </section>
}

export function EuropeSection({ onRequest }: { onRequest: RequestJourney }) {
  const [region, setRegion] = useState(0)

  return <section id="service-europe" className="sv-section sv-europe" aria-labelledby="europe-title">
    <div className="svc-shell sv-europe-shell">
      <div className="sv-europe-intro">
        <div className="sv-europe-copy">
          <p className="svc-eyebrow">Private transfers across Italy &amp; Europe</p>
          <h2 id="europe-title">From one address to the next, across Italy and Europe.</h2>
          <p className="sv-lead">Choose your pick-up, destination and travel date. We plan the route around your schedule and confirm one private vehicle for the journey.</p>
        </div>
        <div className="sv-europe-benefits" aria-label="What this service includes">
          <article><DoorOpen size={34} weight="thin" aria-hidden="true" /><div><h3>Direct travel</h3><p>No shared rides or fixed stops between your chosen addresses.</p></div></article>
          <article><CarProfile size={34} weight="thin" aria-hidden="true" /><div><h3>Vehicle for your group</h3><p>Passenger count and luggage determine the right vehicle.</p></div></article>
          <article><MapPinLine size={34} weight="thin" aria-hidden="true" /><div><h3>Stops by request</h3><p>Add a meal break, scenic stop or another agreed stop.</p></div></article>
        </div>
      </div>

      <div className="sv-europe-journey" aria-label="Private transfers within Italy and to European destinations">
        <div className="sv-europe-journey-labels" aria-hidden="true"><span>Pick-up</span><span>Destination</span></div>
        <div className="sv-europe-route" aria-hidden="true">
          <Circle size={32} weight="duotone" />
          <span className="sv-europe-route-line" />
          <span className="sv-europe-route-crossing"><ArrowRight size={23} weight="light" /></span>
          <span className="sv-europe-route-line" />
          <Circle size={32} weight="duotone" />
        </div>
        <div className="sv-europe-areas" aria-hidden="true"><span>Italy</span><span>Italy &amp; Europe</span></div>
      </div>
      <p className="sv-europe-note">Available for journeys within Italy and to destinations in Austria, Slovenia, Croatia, France and beyond.</p>
    </div>

    <RouteSection id="italy-route-prices" title="Italy & Europe routes & fares">
      <div className="sv-europe-routes">
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
    </RouteSection>
  </section>
}

export function MountainsSection({ onRequest }: { onRequest: RequestJourney }) {
  const [activePhoto, setActivePhoto] = useState<0 | 1>(0)

  return <section id="service-mountains" className="sv-section sv-mountains sv-mountains-new" aria-labelledby="mountains-title">
    <div className="svc-shell sv-mountains-shell">
      <div className="sv-mountains-intro">
        <figure className="sv-mountains-photos">
          <div className="sv-mountains-photo-stage" data-active-photo={activePhoto}>
            <button className={activePhoto === 0 ? 'is-active' : ''} type="button" aria-pressed={activePhoto === 0} aria-label="Expand the Dolomites alpine road photograph" onMouseEnter={() => setActivePhoto(0)} onFocus={() => setActivePhoto(0)} onClick={() => setActivePhoto(0)}>
              <img loading="lazy" width="1600" height="1067" src="./images/shared/destinations/dolomites-road.jpg" alt="A winding road through rocky Alpine mountain scenery" />
              <span className="sv-mountains-photo-location"><strong>Dolomites, Italy</strong><small>Alpine road</small></span>
            </button>
            <button className={activePhoto === 1 ? 'is-active' : ''} type="button" aria-pressed={activePhoto === 1} aria-label="Expand the Dolomites mountain panorama photograph" onMouseEnter={() => setActivePhoto(1)} onFocus={() => setActivePhoto(1)} onClick={() => setActivePhoto(1)}>
              <img loading="lazy" width="1600" height="1067" src="./images/shared/destinations/dolomites-peaks.jpg" alt="Layered Dolomite peaks in warm evening light" />
              <span className="sv-mountains-photo-location"><strong>Dolomites, Italy</strong><small>Mountain panorama</small></span>
            </button>
          </div>
          <figcaption>Hover, focus or tap a view to expand it</figcaption>
        </figure>

        <div className="sv-mountains-copy">
          <p className="svc-eyebrow">Private transfers to the Dolomites</p>
          <h2 id="mountains-title">Travel directly to the Dolomites.</h2>
          <p className="sv-mountains-lead">Start from your chosen address, airport, hotel or station anywhere in Italy. Continue privately to Cortina d’Ampezzo, Corvara, Canazei, Ortisei or another Dolomites destination.</p>
          <dl className="sv-mountains-details">
            <div><dt>Pick-up</dt><dd>Any accessible address, airport, hotel or station in Italy</dd></div>
            <div><dt>Popular destinations</dt><dd>Cortina d’Ampezzo · Corvara · Canazei · Ortisei</dd></div>
            <div><dt>Booking options</dt><dd>One-way · Return · Waiting time · Later collection</dd></div>
          </dl>
          <p className="sv-mountains-note">Mountain access depends on weather and road conditions. Accommodation and activities are not included.</p>
        </div>
      </div>
    </div>
    <RouteSection title="Dolomites routes & fares"><RouteList routes={mountainRoutes} title="Dolomites routes and fares" service="mountains" onRequest={onRequest} initial={3} moreLabel="View all Dolomites routes" editorial compact note="Indicative one-way fares apply to the listed route. Other pick-up points in Italy are quoted individually." /></RouteSection>
  </section>
}

export function SeasideSection({ onRequest }: { onRequest: RequestJourney }) {
  return <section id="service-coast" className="sv-section sv-coast sv-coast-new" aria-labelledby="coast-title">
    <div className="svc-shell sv-coast-shell">
      <div className="sv-coast-intro">
        <figure className="sv-coast-hero">
          <img loading="lazy" width="1536" height="864" src="./images/services/seaside/coastal-road.png" alt="A quiet coastal road beside a sandy Adriatic beach in Veneto, Italy" />
          <figcaption>Adriatic coast · Veneto, Italy</figcaption>
        </figure>

        <div className="sv-coast-copy">
          <p className="svc-eyebrow">Private transfers to Italy’s Adriatic coast</p>
          <h2 id="coast-title">Travel directly to your seaside address.</h2>
          <p className="sv-coast-lead">Start from any accessible address, airport, hotel or station in Italy. Continue privately to your hotel, villa or holiday address on the coast.</p>
          <article className="sv-coast-planning"><span aria-hidden="true" /><div><h3>One private vehicle</h3><p>No shared rides or fixed stops. Book one way, return the same day or arrange collection on another date.</p></div></article>
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
          <h2 id="cruise-title">Private transfers to and from cruise terminals.</h2>
          <p className="sv-cruise-lead">Book only the direction you need: your address to a cruise terminal, or the terminal to your next address.</p>
        </div>

        <figure className="sv-cruise-photo">
          <img loading="lazy" width="2061" height="763" src="./images/services/cruise/terminal.png" alt="Cruise ship beside an elegant Adriatic port terminal" />
        </figure>
      </div>

      <div className="sv-cruise-journeys" aria-label="Cruise transfer directions">
        <article>
          <p className="svc-eyebrow">Going to your cruise</p>
          <div className="sv-cruise-route">
            <h3>Your chosen<br />pick-up</h3>
            <ArrowRight size={43} weight="thin" aria-hidden="true" />
            <strong>Cruise<br />terminal</strong>
          </div>
          <p>Travel directly from your chosen address to Ravenna, Trieste or Fusina cruise terminal.</p>
        </article>

        <article>
          <p className="svc-eyebrow">Leaving your cruise</p>
          <div className="sv-cruise-route">
            <h3>Cruise<br />terminal</h3>
            <ArrowRight size={43} weight="thin" aria-hidden="true" />
            <strong>Your next<br />address</strong>
          </div>
          <p>Meet your driver at the terminal and continue to your hotel, airport or another address.</p>
        </article>
      </div>

      <p className="sv-cruise-flexibility">Book one journey or both.</p>
    </div>
    <RouteSection title="Cruise port routes & fares"><RouteList routes={cruiseRoutes} title="Cruise port transfer prices" service="cruise" onRequest={onRequest} initial={3} editorial compact footer={<p className="sv-fine-print">Displayed fares cover road transfer only. Water Taxi connections and return journeys are quoted separately.</p>} /></RouteSection>
  </section>
}
