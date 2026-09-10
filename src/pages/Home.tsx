import { useState } from 'react'
import type { Page } from '../types/navigation'
import BookingForm, { type BookingPrefill } from '../components/BookingForm'
import HomeSections from '../components/home/HomeSections'
import './home-editorial.css'
import './home-refinements.css'

interface HomeProps {
  navigate: (page: Page) => void
}

const heroSlides = [
  {
    url: './images/home/hero/venice-grand-canal.jpg',
    label: 'Venice Grand Canal',
    caption: 'Venice · Grand Canal',
    position: 'center 58%',
    composition: 'hero-slide--right-focus',
  },
  {
    url: './images/home/hero/milan-duomo.jpg',
    label: 'Milan Duomo at sunset',
    caption: 'Milan · Duomo at sunset',
    position: 'center 68%',
  },
  {
    url: './images/home/hero/sicily-coast.jpg',
    label: 'Sicilian coast beneath dramatic clouds',
    caption: 'Sicily · Mediterranean coast',
    position: 'center 58%',
  },
  {
    url: './images/home/hero/dolomites-night-road.jpg',
    label: 'Night road through the Dolomites',
    caption: 'Dolomites · Alpine roads',
    position: 'center 52%',
  },
  {
    url: './images/home/hero/lake-como-boat.jpg',
    label: 'Private boat on Lake Como',
    caption: 'Lake Como · By the water',
    position: 'center 58%',
  },
]

export default function Home({ navigate }: HomeProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [routePrefill, setRoutePrefill] = useState<BookingPrefill | null>(null)

  const scrollToBooking = () => {
    document.getElementById('home-booking')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const bookRoute = (route: Omit<BookingPrefill, 'requestId'>) => {
    setRoutePrefill((current) => ({
      ...route,
      requestId: (current?.requestId ?? 0) + 1,
    }))
    window.setTimeout(scrollToBooking, 0)
  }

  return (
    <div className="home-page overflow-hidden bg-[var(--background)]">
      <section
        data-home-hero
        className="h2-hero relative overflow-hidden bg-[var(--background)]"
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.url}
            role="img"
            aria-label={slide.label}
            aria-hidden={index !== activeSlide}
            className={`hero-slide ${slide.composition ?? ''} ${index === activeSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${slide.url})`,
              backgroundPosition: slide.position,
              opacity: index === activeSlide ? 1 : 0,
            }}
          />
        ))}
        <div className="h2-hero-shade" />

        <div className="h2-hero-copy">
          <h1>Private transfers,<br /><em>Venice &amp; beyond.</em></h1>
          <p className="h2-lead">Travel with Easy Lux across Veneto, Italy and Europe. Airport transfers, a chauffeur by the hour and private journeys arranged around your plans.</p>
        </div>

        <div
          id="home-booking"
          className="h2-booking-wrap"
        >
          <div className="mx-auto w-full">
            <BookingForm prefill={routePrefill} />
          </div>
          <nav className="hero-photo-nav" aria-label="Hero photographs">
            <p className="hero-photo-caption" aria-live="polite" aria-atomic="true">
              {heroSlides[activeSlide].caption}
            </p>
            <div className="hero-photo-controls">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  aria-label={`Show ${slide.label} background`}
                  aria-current={index === activeSlide ? 'true' : undefined}
                  onClick={() => setActiveSlide(index)}
                >
                  <span />
                </button>
              ))}
            </div>
          </nav>
        </div>
        <p className="sr-only" aria-live="polite">
          {routePrefill
            ? `${routePrefill.pickup} to ${routePrefill.destination} added to the booking form.`
            : ''}
        </p>
      </section>

      <HomeSections navigate={navigate} onBookRoute={bookRoute} onPlanJourney={scrollToBooking} />
    </div>
  )
}
