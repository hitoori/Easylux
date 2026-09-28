import type { CSSProperties } from 'react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { ArrowRight } from '../components/PikaIcons'
import { company } from '../config/company'
import type { Page } from '../types/navigation'
import './about.css'

interface AboutProps { navigate: (page: Page) => void }

type PhotoSlotProps = {
  className?: string
  src: string
  alt: string
  ratio: string
  position?: string
  eager?: boolean
}

function PhotoSlot({ className = '', src, alt, ratio, position = 'center', eager = false }: PhotoSlotProps) {
  const style = { '--ab-ratio': ratio.replace(':', ' / '), '--ab-position': position } as CSSProperties

  return (
    <div className={`ab-photo-slot ${className}`} style={style}>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'} />
    </div>
  )
}

const facts = ['Two founders', 'Venice & Treviso', 'Private transport experience', 'Italy & Europe']

const standards = [
  {
    number: '01',
    title: 'Prepared around you',
    description: 'Your route, timing, passengers and luggage are considered before the journey begins.',
    photo: `${import.meta.env.BASE_URL}images/about/standard-prepared-around-you.png`,
    alt: 'Travel details being coordinated on a phone beside a laptop and notebook',
  },
  {
    number: '02',
    title: 'Professional from start to finish',
    description: 'Clear communication, punctual service and personal assistance throughout your transfer.',
    photo: `${import.meta.env.BASE_URL}images/about/luggage-assistance.jpg`,
    alt: 'Chauffeur assisting a traveler with luggage beside a car',
  },
  {
    number: '03',
    title: 'Genuine Italian hospitality',
    description: 'A welcoming, attentive approach designed to help you enjoy the journey as much as the destination.',
    photo: `${import.meta.env.BASE_URL}images/about/standard-italian-hospitality.jpg`,
    alt: 'Hotel professional welcoming a guest and handing over a room key',
  },
]

export default function About({ navigate }: AboutProps) {
  return (
    <div className="about-page">
      <header className="ab-hero ab-shell" aria-labelledby="about-title">
        <div className="ab-hero-copy">
          <p className="ab-eyebrow">About Easy Lux</p>
          <h1 id="about-title">Driven by passion.<br />Committed to every journey.</h1>
          <p className="ab-hero-intro">Private journeys from Venice and Treviso, arranged with care.</p>
          <button className="ab-outline-button" type="button" onClick={() => navigate('services')}>
            Discover our services <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        <PhotoSlot className="ab-hero-photo" src={`${import.meta.env.BASE_URL}images/about/airport-transfer-van.png`} alt="Black Mercedes van outside an airport at sunset" ratio="16:10" position="center 52%" eager />
      </header>

      <section className="ab-facts" aria-label="Easy Lux at a glance">
        <div className="ab-shell ab-facts-grid">
          {facts.map(fact => <span key={fact}>{fact}</span>)}
        </div>
      </section>

      <section className="ab-story ab-shell ab-section ab-split" aria-labelledby="ab-story-title">
        <div className="ab-section-copy">
          <p className="ab-eyebrow">Our story</p>
          <h2 id="ab-story-title">A shared vision,<br />brought to life.</h2>
          <p>We are <span className="ab-gold-text">two young entrepreneurs</span> united by a passion for travel, hospitality and exceptional service. After years of experience in <span className="ab-gold-text">private transportation</span>, we created Easy Lux to offer a more personal way to travel.</p>
          <p>Operating in <span className="ab-gold-text">Venice and Treviso</span>, we arrange reliable, comfortable and tailored journeys across Italy and Europe.</p>
        </div>
        <PhotoSlot src={`${import.meta.env.BASE_URL}images/about/story-private-journey.png`} alt="Chauffeur loading luggage into a private transfer van at the airport" ratio="4:3" position="center 48%" />
      </section>

      <section className="ab-luxury ab-section" aria-labelledby="ab-luxury-title">
        <div className="ab-shell ab-split ab-luxury-layout">
          <div className="ab-section-copy">
            <h2 id="ab-luxury-title">Luxury is how<br />the journey feels.</h2>
            <p>For us, luxury is not defined only by the vehicle. It is knowing that your journey has been prepared, your time is respected and someone is there when you need them.</p>
          </div>
          <PhotoSlot src={`${import.meta.env.BASE_URL}images/about/car-door.jpg`} alt="Hand opening the door of a black car" ratio="16:7" position="center 34%" />
        </div>
      </section>

      <section className="ab-standards ab-shell ab-section" aria-labelledby="ab-standards-title">
        <p className="ab-eyebrow">What guides us</p>
        <h2 id="ab-standards-title">The Easy Lux standard.</h2>
        <div className="ab-standard-list">
          {standards.map(standard => (
            <article className="ab-standard" key={standard.number}>
              <span className="ab-standard-number">{standard.number}</span>
              <div className="ab-standard-copy">
                <h3>{standard.title}</h3>
                <p>{standard.description}</p>
              </div>
              <PhotoSlot className={standard.number === '03' ? 'ab-standard-hospitality' : ''} src={standard.photo} alt={standard.alt} ratio="16:5" position="center" />
            </article>
          ))}
        </div>
      </section>

      <section className="ab-collage ab-shell ab-section" aria-label="The Easy Lux experience">
        <div className="ab-collage-grid">
          <figure className="ab-collage-main">
            <PhotoSlot src={`${import.meta.env.BASE_URL}images/about/comfortable-vehicle.png`} alt="Black Mercedes private transfer van outside a hotel" ratio="4:3" position="center" />
            <figcaption>Comfortable vehicles</figcaption>
          </figure>
          <div className="ab-collage-side">
            <figure>
              <PhotoSlot src={`${import.meta.env.BASE_URL}images/about/comfort-on-board.png`} alt="Comfortable passenger seating inside the private transfer van" ratio="16:7" position="center" />
              <figcaption>Comfort on board</figcaption>
            </figure>
            <figure>
              <PhotoSlot src={`${import.meta.env.BASE_URL}images/about/personal-chauffeur-service.png`} alt="Chauffeur assisting a passenger with luggage beside a private van" ratio="16:7" position="center" />
              <figcaption>Personal service</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="ab-operate ab-shell ab-section ab-split" aria-labelledby="ab-operate-title">
        <div className="ab-section-copy">
          <p className="ab-eyebrow">Where we operate</p>
          <h2 id="ab-operate-title">From Venice<br />and Treviso, further.</h2>
          <p>From airport arrivals and Water Taxi connections in Venice to private transfers from Treviso and longer journeys across Italy and Europe, every route is arranged around your plans.</p>
          <button className="ab-inline-link" type="button" onClick={() => navigate('services')}>
            View all destinations <ArrowRight size={17} aria-hidden="true" />
          </button>
          <p className="ab-countries">Italy · Austria · Slovenia · Croatia · France</p>
        </div>
        <PhotoSlot src={`${import.meta.env.BASE_URL}images/about/dolomites-where-we-operate.jpg`} alt="Mountain peaks, forest and village in the Dolomites" ratio="4:3" position="center" />
      </section>

      <section className="ab-manifesto ab-shell ab-section" aria-labelledby="ab-manifesto-title">
        <span className="ab-manifesto-rule" aria-hidden="true" />
        <h2 id="ab-manifesto-title">Driven by passion.<br />Committed to excellence.</h2>
        <p>Easy Lux</p>
        <span className="ab-manifesto-rule" aria-hidden="true" />
      </section>

      <section className="ab-final-cta ab-section" aria-labelledby="ab-final-title">
        <div className="ab-shell ab-split ab-final-layout">
          <div className="ab-section-copy">
            <p className="ab-eyebrow">Ready to travel?</p>
            <h2 id="ab-final-title">Tell us where<br />you need to be.</h2>
            <p>Share your plans and we’ll arrange the details, from pick-up to final destination.</p>
            <div className="ab-final-actions">
              <button className="ab-outline-button" type="button" onClick={() => navigate('contact')}>
                Request your journey <ArrowRight size={18} aria-hidden="true" />
              </button>
              <a className="ab-whatsapp-link" href={company.phones[0].whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo size={19} aria-hidden="true" /> WhatsApp us <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <PhotoSlot src={`${import.meta.env.BASE_URL}images/about/family-airport-arrival.png`} alt="Family arriving at a hotel beside a private chauffeur van" ratio="16:6" position="center 55%" />
        </div>
      </section>
    </div>
  )
}
