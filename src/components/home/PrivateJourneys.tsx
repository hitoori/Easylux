import { useEffect, useState } from 'react'
import type { BookingPrefill } from '../BookingForm'
import { publicAsset } from '../../lib/publicAsset'

const destinations = [
  {
    id: 'prosecco', label: 'Prosecco Hills',
    image: publicAsset('images/home/private-journeys/prosecco-hills.jpg'),
    alt: 'Terraced vineyards and houses in the Prosecco Hills at golden hour',
    stops: ['Venice', 'Conegliano', 'Valdobbiadene'],
    destination: 'Valdobbiadene, Prosecco Hills',
    journey: 'Private chauffeur · Waiting by agreement · Return on request',
  },
  {
    id: 'dolomites', label: 'Dolomites',
    image: publicAsset('images/shared/destinations/dolomites-peaks.jpg'),
    alt: 'Mountain landscape in the Dolomites',
    stops: ['Venice', 'Cortina d’Ampezzo'],
    destination: 'Cortina d’Ampezzo',
    journey: 'Private transfer to your hotel or meeting point. Stops, waiting and return pick-up can be arranged in advance.',
  },
  {
    id: 'coast', label: 'Coast & seaside',
    image: publicAsset('images/home/hero/sicily-coast.jpg'),
    alt: 'Italian coastal landscape overlooking the sea',
    stops: ['Venice', 'Your seaside destination'],
    destination: 'Seaside destination — to be confirmed',
    journey: 'Private transfer to your chosen seaside address or hotel, one-way or with a return pick-up.',
  },
  {
    id: 'cruise', label: 'Cruise terminals',
    image: publicAsset('images/home/hero/venice-grand-canal.jpg'),
    alt: 'Venice waterfront, the starting point for a private terminal transfer',
    stops: ['Venice', 'Your cruise terminal'],
    destination: 'Cruise terminal — to be confirmed',
    journey: 'Private chauffeur to or from your confirmed cruise terminal, planned around your ship and boarding time.',
  },
]

interface PrivateJourneysProps {
  onBookRoute: (route: Omit<BookingPrefill, 'requestId'>) => void
}

export default function PrivateJourneys({ onBookRoute }: PrivateJourneysProps) {
  const [selectedJourneyIndex, setSelectedJourneyIndex] = useState(0)
  const selected = destinations[selectedJourneyIndex]

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSelectedJourneyIndex(index => (index + 1) % destinations.length)
    }, 5000)
    return () => window.clearTimeout(timer)
  }, [selectedJourneyIndex])

  return (
    <section data-home-prosecco className="private-journeys home-flow-section" aria-labelledby="private-journeys-title">
      <div className="private-journeys-layout">
        <div className="private-journeys-copy">
          <p className="private-journeys-kicker">Private journeys</p>
          <h2 id="private-journeys-title">Journeys from Venice.</h2>
          <p className="private-journeys-intro">Travel to the Prosecco Hills, Dolomites, coast or cruise terminals. Stops and return pick-up can be arranged in advance.</p>
        </div>

        <div className="private-journeys-tabs" role="tablist" aria-label="Private journey destinations">
          {destinations.map((destination, index) => (
            <button
              key={destination.id} id={`journey-tab-${destination.id}`} type="button" role="tab"
              aria-selected={index === selectedJourneyIndex} aria-controls="private-journey-panel"
              className={index === selectedJourneyIndex ? 'is-selected' : undefined}
              tabIndex={index === selectedJourneyIndex ? 0 : -1}
              onClick={() => setSelectedJourneyIndex(index)}
              onKeyDown={(event) => {
                let next = index
                if (event.key === 'ArrowRight') next = (index + 1) % destinations.length
                else if (event.key === 'ArrowLeft') next = (index + destinations.length - 1) % destinations.length
                else if (event.key === 'Home') next = 0
                else if (event.key === 'End') next = destinations.length - 1
                else return
                event.preventDefault()
                setSelectedJourneyIndex(next)
                document.getElementById(`journey-tab-${destinations[next].id}`)?.focus()
              }}
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{destination.label}
            </button>
          ))}
        </div>

        <div id="private-journey-panel" className="private-journeys-visual" role="tabpanel" aria-labelledby={`journey-tab-${selected.id}`} tabIndex={0}>
          <div className="private-journeys-photo">
            <img key={selected.id} src={selected.image} alt={selected.alt} loading="lazy" decoding="async" />
          </div>
          <div className="private-journeys-route" aria-live="polite">
            <div className="private-journeys-stops">
              <small>Route</small>
              <p className="private-journeys-desktop-route">{selected.stops.map((stop, index) => <span key={stop}>{index > 0 && <span className="private-journeys-route-arrow" aria-hidden="true">→</span>}{stop}</span>)}</p>
              <p className="private-journeys-mobile-route">Venice <span aria-hidden="true">→</span> {selected.label}</p>
            </div>
            <div className="private-journeys-terms">
              <small>Journey</small>
              <p className="private-journeys-desktop-terms">{selected.journey}</p>
              <p className="private-journeys-mobile-terms">Private car <span>·</span> Waiting time <span>·</span> Return journey</p>
            </div>
            <button className="private-journeys-plan" type="button" onClick={() => onBookRoute({ pickup: 'Venice', destination: selected.destination, airportMode: 'none' })}>
              Plan this journey <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
