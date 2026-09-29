import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'

const stories = [
  ['Airport transfer', 'Marco Polo Airport', 'Our flight was delayed, but Mihai was there when we arrived. The V-Class was spotless, and the drive was really comfortable.'],
  ['Dolomites', 'Private day journey', 'We booked a driver for our day in the Dolomites. The timing worked well, and we could just enjoy the stops instead of worrying about the drive.'],
  ['Prosecco Hills', 'Private day journey', 'The Prosecco Hills were one of our favourite days in Italy. We had time to enjoy the places we visited without feeling rushed.'],
  ['Group transfer', 'Private transfer', 'The driver arrived on time, and there was plenty of room for all of us and our bags. Everything was straightforward.'],
]

export default function ClientStories() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [name, place, quote] = stories[activeIndex]
  const move = (direction: number) => setActiveIndex(index => (index + direction + stories.length) % stories.length)
  const indicator = <>{String(activeIndex + 1).padStart(2, '0')} <span>/ {String(stories.length).padStart(2, '0')}</span></>

  useEffect(() => {
    const timer = window.setTimeout(() => setActiveIndex(index => (index + 1) % stories.length), 8000)
    return () => window.clearTimeout(timer)
  }, [activeIndex])

  return (
    <section className="h2-testimonials client-stories" aria-labelledby="client-stories-title">
      <div className="home-flow-section client-stories-content">
        <header className="client-stories-heading">
          <div>
            <p className="client-stories-kicker">In their words</p>
            <h2 id="client-stories-title">What our clients say.</h2>
          </div>
          <div className="client-stories-controls client-stories-controls--desktop" aria-label="Review navigation">
            <button type="button" onClick={() => move(-1)} aria-label="Previous review"><ArrowLeft size={24} weight="light" aria-hidden="true" /></button>
            <span className="client-stories-indicator">{indicator}</span>
            <button type="button" onClick={() => move(1)} aria-label="Next review"><ArrowRight size={24} weight="light" aria-hidden="true" /></button>
          </div>
        </header>

        <div className="client-stories-stage" aria-live="polite" aria-atomic="true">
          <figure key={activeIndex}>
            <span className="client-stories-stars" aria-label="Five stars">★★★★★</span>
            <div className="client-stories-quote-line">
              <span className="client-stories-quote-icon" aria-hidden="true">“</span>
              <blockquote>{quote}</blockquote>
            </div>
            <figcaption><strong>{name}</strong><span>{place}</span></figcaption>
          </figure>
        </div>

        <div className="client-stories-footer">
          <div className="client-stories-progress" aria-hidden="true">
            {stories.map(([author], index) => <span key={author} className={index === activeIndex ? 'is-active' : undefined} />)}
          </div>
          <div className="client-stories-controls client-stories-controls--mobile" aria-label="Review navigation">
            <button type="button" onClick={() => move(-1)} aria-label="Previous review"><ArrowLeft size={24} weight="light" aria-hidden="true" /></button>
            <span className="client-stories-indicator">{indicator}</span>
            <button type="button" onClick={() => move(1)} aria-label="Next review"><ArrowRight size={24} weight="light" aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
