import { useEffect, useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import type { BookingPrefill } from '../BookingForm'

const destinations = [
  {
    id: 'prosecco', label: 'Prosecco Hills',
    image: '/images/home/private-journeys/prosecco-hills.jpg',
    alt: 'Terraced vineyards and houses in the Prosecco Hills at golden hour',
    stops: ['Venice', 'Conegliano', 'Valdobbiadene'],
    destination: 'Valdobbiadene, Prosecco Hills',
    details: 'Choose your address in the Prosecco Hills and any stops you would like to make. We arrange the private transfer, with waiting or a return journey by agreement. Winery visits and tastings are arranged separately by you.',
  },
  {
    id: 'dolomites', label: 'Dolomites',
    image: '/images/shared/destinations/dolomites-peaks.jpg',
    alt: 'Mountain landscape in the Dolomites',
    stops: ['Venice', 'Cortina d’Ampezzo'],
    destination: 'Cortina d’Ampezzo',
    details: 'Travel to your mountain hotel or a meeting point you choose in the Dolomites. Tell us about luggage, equipment and any requested stops. Waiting and return pick-up can be agreed in advance; this is private transport, not a guided excursion.',
  },
  {
    id: 'coast', label: 'Coast & seaside',
    image: '/images/home/hero/sicily-coast.jpg',
    alt: 'Italian coastal landscape overlooking the sea',
    stops: ['Venice', 'Your seaside destination'],
    destination: 'Seaside destination — to be confirmed',
    details: 'A private transfer to the seaside address, hotel or beach destination you choose. Share your destination and preferred timing so we can confirm the route. Choose one-way travel or request a return pick-up.',
  },
  {
    id: 'cruise', label: 'Cruise terminals',
    image: '/images/home/hero/venice-grand-canal.jpg',
    alt: 'Venice waterfront, the starting point for a private terminal transfer',
    stops: ['Venice', 'Your cruise terminal'],
    destination: 'Cruise terminal — to be confirmed',
    details: 'Reach the terminal specified in your cruise documents by private chauffeur. Share your ship name, exact port, terminal and boarding time so we can review the transfer. The service is road transport to or from the port, not a cruise package.',
  },
]

interface PrivateJourneysProps {
  onBookRoute: (route: Omit<BookingPrefill, 'requestId'>) => void
}

export default function PrivateJourneys({ onBookRoute }: PrivateJourneysProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedJourneyIndex, setSelectedJourneyIndex] = useState(0)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const selected = destinations[selectedJourneyIndex]

  useEffect(() => {
    const timer = window.setInterval(() => setActiveImageIndex(index => (index + 1) % destinations.length), 2800)
    return () => window.clearInterval(timer)
  }, [])

  const selectDestination = (index: number) => {
    setSelectedJourneyIndex(index)
    setActiveImageIndex(index)
    setDetailsOpen(false)
  }

  return (
    <section data-home-prosecco className="private-journeys home-flow-section" aria-labelledby="private-journeys-title">
      <div className="private-journeys-layout">
        <div className="private-journeys-copy">
          <p className="private-journeys-kicker">Private journeys</p>
          <h2 id="private-journeys-title">Beyond Venice,<br /><em>on your terms.</em></h2>
          <p className="private-journeys-intro">Choose the Prosecco Hills, the Dolomites, a seaside stay or your cruise terminal. We arrange the private transport; you choose what to visit and how long to stay.</p>
          <div className="private-journeys-benefits">
            <span>Private chauffeur</span><span>Waiting on request</span><span>One-way or return</span>
          </div>
          <p className="private-journeys-hint">Select a destination to view its route.</p>
          <button className="private-journeys-plan" type="button" onClick={() => onBookRoute({ pickup: 'Venice', destination: selected.destination, airportMode: 'none' })}>
            Plan your journey <ArrowRight size={19} aria-hidden="true" />
          </button>
        </div>

        <div className="private-journeys-visual">
          <div className="private-journeys-photo">
            {destinations.map((destination, index) => (
              <img key={destination.id} src={destination.image}
                alt={index === activeImageIndex ? destination.alt : ''}
                aria-hidden={index !== activeImageIndex}
                className={index === activeImageIndex ? 'is-active' : ''}
                loading="lazy" decoding="async" />
            ))}
          </div>
          <div className="private-journeys-tabs" role="tablist" aria-label="Private journey destinations">
            {destinations.map((destination, index) => (
              <button
                key={destination.id} id={`journey-tab-${destination.id}`} type="button" role="tab"
                aria-selected={index === selectedJourneyIndex} aria-controls="private-journey-panel"
                className={index === activeImageIndex ? 'is-image-active' : undefined}
                tabIndex={index === selectedJourneyIndex ? 0 : -1}
                onClick={() => selectDestination(index)}
                onKeyDown={(event) => {
                  let next = index
                  if (event.key === 'ArrowRight') next = (index + 1) % destinations.length
                  else if (event.key === 'ArrowLeft') next = (index + destinations.length - 1) % destinations.length
                  else if (event.key === 'Home') next = 0
                  else if (event.key === 'End') next = destinations.length - 1
                  else return
                  event.preventDefault()
                  selectDestination(next)
                  document.getElementById(`journey-tab-${destinations[next].id}`)?.focus()
                }}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{destination.label}
              </button>
            ))}
          </div>
          <div id="private-journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${selected.id}`} tabIndex={0}>
            <div className="private-journeys-route" aria-live="polite">
              <p className="private-journeys-stops">
                {selected.stops.map((stop, index) => <span key={stop}>{index > 0 && <ArrowRight size={13} aria-hidden="true" />}{stop}</span>)}
              </p>
              <p className="private-journeys-terms">Private chauffeur <span>·</span> Waiting by agreement <span>·</span> Return on request</p>
              <button type="button" aria-expanded={detailsOpen} aria-controls="private-journey-details" onClick={() => setDetailsOpen(open => !open)}>
                {detailsOpen ? 'Hide details' : 'Transfer details'} <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
            <div id="private-journey-details" className="private-journeys-details" hidden={!detailsOpen}>
              <h3>{selected.label}</h3>
              <p>{selected.details}</p>
              <p className="private-journeys-pricing">Route, availability and price confirmed before booking.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
