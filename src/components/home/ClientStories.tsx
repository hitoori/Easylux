import { useState } from 'react'
import { ArrowLeft, ArrowRight, Quotes } from '@phosphor-icons/react'

// Existing demonstration copy: replace with approved customer reviews before publishing.
const stories = [
  ['Alexandra M.', 'London, UK', 'Mihai was waiting for us at Marco Polo with a sign and a smile despite our flight being late. The V-Class was immaculate. Exceptional service.'],
  ['Thomas & Claire B.', 'Paris, France', 'We booked a full-day chauffeur for our Dolomites journey. Every stop felt effortless and perfectly timed.'],
  ['Pieter van D.', 'Amsterdam, NL', 'The Prosecco Hills experience was the highlight of our Italy trip. The entire day felt curated just for us.'],
  ['Sarah K.', 'New York, USA', 'Punctual, professional, and the car was beautiful. Our group had plenty of room.'],
]

export default function ClientStories() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [name, place, quote] = stories[activeIndex]
  const move = (direction: number) => setActiveIndex((index) => (index + direction + stories.length) % stories.length)

  return (
    <section className="h2-testimonials client-stories" aria-labelledby="client-stories-title">
      <div className="home-flow-section client-stories-content">
        <header className="client-stories-heading">
          <div>
            <p className="client-stories-kicker">In their words</p>
            <h2 id="client-stories-title">What our clients say.</h2>
          </div>
          <div className="client-stories-controls" aria-label="Review navigation">
            <button type="button" onClick={() => move(-1)} aria-label="Previous review"><ArrowLeft size={22} weight="light" aria-hidden="true" /></button>
            <span aria-hidden="true">{String(activeIndex + 1).padStart(2, '0')} <span>/ {String(stories.length).padStart(2, '0')}</span></span>
            <button type="button" onClick={() => move(1)} aria-label="Next review"><ArrowRight size={22} weight="light" aria-hidden="true" /></button>
          </div>
        </header>

        <p className="client-stories-preview">Design preview · sample reviews, awaiting verification</p>
        <div className="client-stories-stage" aria-live="polite" aria-atomic="true">
          <figure key={activeIndex}>
            <Quotes className="client-stories-quote-icon" size={38} weight="light" aria-hidden="true" />
            <blockquote>{quote}</blockquote>
            <figcaption><strong>{name}</strong><span>{place}</span></figcaption>
          </figure>
        </div>

        <div className="client-stories-selectors" role="group" aria-label="Choose a review">
          {stories.map(([author, location], index) => (
            <button type="button" key={author} aria-pressed={index === activeIndex} onClick={() => setActiveIndex(index)}>
              <span>{author}</span><small>{location}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
