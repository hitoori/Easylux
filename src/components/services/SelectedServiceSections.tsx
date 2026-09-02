import { useState } from 'react'
import { ArrowRight, LinkSimple, MapPinLine } from '@phosphor-icons/react'
import { coastalRoutes, cruiseRoutes, italyRoutes, mountainRoutes } from './serviceData'
import { RouteList, RouteSection, ServiceTabs, type RequestJourney } from './ServiceRoutes'

export function HourlySection({ onRequest }: { onRequest: RequestJourney }) {
  return <section id="service-hourly" className="sv-section sv-hourly" aria-labelledby="hourly-title">
    <div className="svc-shell sv-editorial sv-hourly-grid">
      <div className="sv-copy"><p className="svc-eyebrow">Chauffeur by the hour</p><h2 id="hourly-title">One driver.<br />A schedule that stays yours.</h2>
        <p className="sv-lead">Reserve a chauffeur for business appointments, shopping or an itinerary with several stops. Your driver remains available for the agreed time.</p>
        <div className="sv-short-rule" /><p className="sv-muted">Share the starting point, date, estimated duration and stops.</p>
      </div>
      <div className="sv-use-cases">
        <article><h3>Business days</h3><p>Move between meetings without booking each transfer separately.</p></article>
        <article><h3>Personal plans</h3><p>Shop, dine or visit the places you choose while your driver waits.</p></article>
        <article><h3>Multi-stop itineraries</h3><p>Keep the same chauffeur across several addresses.</p></article>
        <p className="sv-fine-print">Extra time and route changes are subject to availability and agreed before they begin.</p>
      </div>
    </div>
    <div className="svc-shell sv-hourly-quote">
      <h3>Built around your time</h3>
      <p>The price reflects the booked duration, route and vehicle.</p>
      <button type="button" className="sv-hourly-link" onClick={() => onRequest({ service: 'hourly' })}>Request an hourly chauffeur quote <ArrowRight size={22} aria-hidden="true" /></button>
    </div>
  </section>
}

const waterTaxiJourneys = [
  {
    introduction: 'Arriving in Venice? Your chauffeur transfer to Piazzale Roma connects with a private Water Taxi to the closest accessible landing.',
    steps: [
      { title: 'Before you travel', copy: 'The day before, receive your chauffeur meeting point, boarding point and boat number.' },
      { title: 'To Piazzale Roma', copy: 'Your chauffeur brings you directly to the waiting Water Taxi.' },
      { title: 'To your Venice stay', copy: 'Continue by water to the closest accessible landing.' },
    ],
  },
  {
    introduction: 'Leaving Venice? Your private Water Taxi arrives at Piazzale Roma for the chauffeur transfer to your final destination.',
    steps: [
      { title: 'Before you travel', copy: 'Receive your confirmed boarding point and boat number.' },
      { title: 'To Piazzale Roma', copy: 'Cross Venice by private Water Taxi.' },
      { title: 'Onward by chauffeur', copy: 'Meet your driver for the final part of your journey.' },
    ],
  },
] as const

export function WaterTaxiSection({ onRequest }: { onRequest: RequestJourney }) {
  const [direction, setDirection] = useState(1)
  const journey = waterTaxiJourneys[direction]

  return <section id="service-water-taxi" className="sv-section sv-water" aria-labelledby="water-title">
    <div className="svc-shell sv-water-illustrated-intro">
      <div>
        <p className="svc-eyebrow">Venice Water Taxi &amp; chauffeur connection</p>
        <h2 id="water-title">From water to road,<br />one considered journey.</h2>
      </div>
      <div className="sv-water-intro-copy">
        <p className="sv-lead">{journey.introduction}</p>
        <ServiceTabs id="water" labels={['Arriving in Venice', 'Leaving Venice']} selected={direction} onChange={setDirection} />
      </div>
    </div>

    <div className="sv-water-story" role="tabpanel" id={`water-panel-${direction}`} aria-labelledby={`water-tab-${direction}`} tabIndex={0}>
      <img src="/images/services/water-taxi-connection-illustration-transparent.png" alt="" width="1772" height="887" loading="lazy" />
      {journey.steps.map(({ title, copy }, index) => <article className={`sv-water-story-point sv-water-story-point-${index + 1}`} key={title}>
        <span>0{index + 1}</span>
        <div><h3>{title}</h3><p>{copy}</p></div>
      </article>)}
    </div>

    <div className="svc-shell sv-water-practical">
      <article><MapPinLine size={30} weight="thin" aria-hidden="true" /><div><h3>The closest accessible landing</h3><p>Your boarding point may change with canal access, tides or navigation restrictions.</p></div></article>
      <article><LinkSimple size={30} weight="thin" aria-hidden="true" /><div><h3>One point of coordination</h3><p>Water Taxi and chauffeur times are matched before travel.</p></div></article>
    </div>
    <div className="svc-shell sv-water-action"><button type="button" className="sv-text-link" onClick={() => onRequest({ service: 'water-taxi' })}>Request a Water Taxi connection <ArrowRight size={18} aria-hidden="true" /></button></div>
  </section>
}

export function EuropeSection({ onRequest }: { onRequest: RequestJourney }) {
  const [region, setRegion] = useState(0)

  return <section id="service-europe" className="sv-section sv-europe" aria-labelledby="europe-title">
    <div className="svc-shell sv-europe-shell">
      <div className="sv-europe-intro">
        <div className="sv-europe-copy"><p className="svc-eyebrow">Long-distance private transfers</p><h2 id="europe-title">Across Italy. Beyond its borders.</h2><p className="sv-lead">Door-to-door chauffeur journeys from Venice to Milan, Florence, Rome and selected destinations across Europe.</p></div>
        <div className="sv-europe-facts">
          <article><h3>Your timing</h3><p>Choose the addresses and preferred departure time.</p></article>
          <article><h3>Your space</h3><p>Passenger numbers, luggage and equipment determine the right vehicle.</p></article>
          <article><h3>Your preferred stops</h3><p>Add a meal break, scenic stop or winery visit to the itinerary.</p></article>
        </div>
      </div>

      <div className="sv-europe-scope" aria-label="Available journey areas">
        <span>Italy</span><span>Austria</span><span>Slovenia</span><span>Croatia</span><span>France</span>
      </div>
      <p className="sv-europe-note">Prosecco Hills and Lake Garda are available as private transfers. Visits and experiences are arranged separately.</p>
    </div>

    <RouteSection id="italy-route-prices" title="Italy & Europe routes">
      <div className="sv-europe-routes">
        <div className="sv-europe-routes-head">
          <div><p className="svc-eyebrow">Routes &amp; fares</p><h3>{region === 0 ? 'One-way journeys from Venice' : 'Cross-border journeys'}</h3></div>
          <ServiceTabs id="regions" labels={['Italy', 'Europe']} selected={region} onChange={setRegion} />
        </div>
        <div role="tabpanel" id="regions-panel-0" aria-labelledby="regions-tab-0" hidden={region !== 0} tabIndex={0}>
          <RouteList routes={italyRoutes} title="Popular Italian routes" service="europe" onRequest={onRequest} initial={3} moreLabel="View all Italy routes" editorial />
        </div>
        <div role="tabpanel" id="regions-panel-1" aria-labelledby="regions-tab-1" hidden={region !== 1} tabIndex={0} className="sv-europe-international">
          {['Austria', 'Slovenia', 'Croatia', 'France'].map(country => <div key={country}><p><span>Venice</span><ArrowRight size={16} aria-hidden="true" /><strong>{country}</strong></p><span>Price to be confirmed</span><button type="button" onClick={() => onRequest({ service: 'europe', pickup: 'Venice', destination: country })}>Request <ArrowRight size={18} weight="light" aria-hidden="true" /></button></div>)}
          <p className="sv-fine-print">International journeys are quoted individually according to route, timing and vehicle.</p>
        </div>
      </div>
    </RouteSection>
  </section>
}

export function MountainsSection({ onRequest }: { onRequest: RequestJourney }) {
  return <section id="service-mountains" className="sv-section sv-mountains sv-mountains-new" aria-labelledby="mountains-title">
    <div className="svc-shell sv-mountains-shell">
      <div className="sv-mountains-intro">
        <div className="sv-mountains-copy">
          <p className="svc-eyebrow">Venice to the Dolomites</p>
          <span className="sv-mountains-accent" aria-hidden="true" />
          <h2 id="mountains-title">Your mountain stay,<br />within reach.</h2>
          <p className="sv-mountains-lead">Travel directly to Cortina d’Ampezzo, Corvara, Canazei, Ortisei and other Dolomites destinations.</p>
          <div className="sv-mountains-facts">
            <article><span aria-hidden="true" /><div><h3>Room for winter gear</h3><p>List skis, suitcases and equipment so the vehicle has enough space.</p></div></article>
            <article><span aria-hidden="true" /><div><h3>A return that suits you</h3><p>Request a later collection, waiting time or a separate return journey.</p></div></article>
          </div>
        </div>

        <figure className="sv-mountains-photos">
          <div>
            <img loading="lazy" width="1600" height="1067" src="/images/home/hero-alpine.jpg" alt="A winding road through rocky Alpine mountain scenery" />
            <img loading="lazy" width="1600" height="1067" src="/images/home/hero-dolomites.jpg" alt="Layered Dolomite peaks in warm evening light" />
          </div>
          <figcaption>The Dolomites · Private road transfers</figcaption>
        </figure>
      </div>

      <p className="sv-mountains-note"><span aria-hidden="true" />Mountain access remains subject to weather and road conditions. Activities are arranged separately.<span aria-hidden="true" /></p>

    </div>
    <RouteSection title="Dolomites routes & fares"><RouteList routes={mountainRoutes} title="Dolomites routes and fares" service="mountains" onRequest={onRequest} initial={3} moreLabel="View all Dolomites routes" editorial /></RouteSection>
  </section>
}

export function SeasideSection({ onRequest }: { onRequest: RequestJourney }) {
  return <section id="service-coast" className="sv-section sv-coast sv-coast-new" aria-labelledby="coast-title">
    <div className="svc-shell sv-coast-shell">
      <div className="sv-coast-intro">
        <figure className="sv-coast-hero">
          <img loading="lazy" width="2400" height="1601" src="/images/home/hero-sicily-unsplash-iShexNYnEfk.jpg" alt="Sicilian coastal town, hills and the sea beneath a dramatic sky" />
          <figcaption>Italian coast · Sicily</figcaption>
        </figure>

        <div className="sv-coast-copy">
          <p className="svc-eyebrow">Venice to the Adriatic coast</p>
          <span className="sv-coast-accent" aria-hidden="true" />
          <h2 id="coast-title">The coast, at your<br />own pace.</h2>
          <p className="sv-coast-lead">Travel directly to Lido di Jesolo, Cavallino-Treporti, Caorle, Chioggia and other seaside addresses.</p>
          <article className="sv-coast-planning"><span aria-hidden="true" /><div><h3>Your stay, clearly located</h3><p>Share the hotel or private address, date, passengers and luggage.</p></div></article>
          <p className="sv-coast-return">Add a return or later pick-up when you request the journey.</p>
        </div>
      </div>

      <p className="sv-coast-caveat">Private transport only; accommodation and activities are not included.<span aria-hidden="true" /></p>

    </div>
    <RouteSection title="Adriatic coast routes & fares"><RouteList routes={coastalRoutes} title="Adriatic coast routes and fares" service="coast" onRequest={onRequest} initial={3} moreLabel="View all coastal routes" editorial /></RouteSection>
  </section>
}

export function CruiseSection({ onRequest }: { onRequest: RequestJourney }) {
  return <section id="service-cruise" className="sv-section sv-cruise" aria-labelledby="cruise-title">
    <div className="svc-shell sv-editorial sv-cruise-grid"><div className="sv-copy"><p className="svc-eyebrow">Cruise port transfers from Venice</p><h2 id="cruise-title">Before you sail.<br />After you arrive.</h2><p className="sv-lead">Private transfers between Venice and Ravenna, Trieste or Fusina cruise terminals.</p><div className="sv-practical-copy"><h3>Details that matter</h3><p>Share the ship, terminal, date, boarding or disembarkation time, passengers and luggage.</p></div></div>
      <div className="sv-cruise-details"><article><p className="svc-eyebrow">Before your cruise</p><h3>Arrive ready to board</h3><p>Your collection and terminal drop-off are timed around the boarding details you provide.</p></article><article><p className="svc-eyebrow">After your cruise</p><h3>Continue from the terminal</h3><p>Meet your driver at the confirmed point and continue to your hotel, airport or next destination.</p><p className="sv-muted sv-cruise-water-note">For Venice’s historic centre, add a private Water Taxi connection.</p></article></div>
    </div>
    <RouteSection title="Cruise port routes & fares"><RouteList routes={cruiseRoutes} title="Cruise port transfer prices" service="cruise" onRequest={onRequest} initial={3} editorial footer={<p className="sv-fine-print">Road transfer fares only. Water Taxi connections and returns are quoted separately.</p>} /></RouteSection>
  </section>
}
