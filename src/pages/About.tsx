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

const facts = ['Two founders', 'Years in private transport', 'Venice & Treviso', 'Italy & Europe']

const standards = [
  {
    number: '01',
    title: 'Planned before you travel',
    description: 'We confirm your route, pick-up time, passengers and luggage in advance.',
  },
  {
    number: '02',
    title: 'A clear pick-up',
    description: 'Your driver meets you at the agreed point and helps with your luggage.',
  },
  {
    number: '03',
    title: 'Genuine Italian hospitality',
    description: 'We want you to feel welcome from the moment you meet your driver.',
  },
]

export default function About({ navigate }: AboutProps) {
  return (
    <div className="about-page">
      <header className="ab-hero ab-shell" aria-labelledby="about-title">
        <div className="ab-hero-copy">
          <p className="ab-eyebrow">About Easy Lux</p>
          <h1 id="about-title">Why we started<br />Easy Lux.</h1>
          <p className="ab-hero-intro">Private transfers from Venice and Treviso, across Italy and Europe.</p>
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
          <h2 id="ab-story-title">A company we believe in.</h2>
          <p>We are two young entrepreneurs, united by a passion for travel, hospitality and excellence. After years of experience in the private transportation industry, we decided to turn our vision into reality and create a service built around one fundamental principle: every journey deserves to be exceptional.</p>
          <p>Our company was born from dedication, sacrifice and the courage to believe in our dream. We have invested our energy, experience and determination into creating a service where professionalism meets genuine Italian hospitality.</p>
        </div>
        <PhotoSlot src={`${import.meta.env.BASE_URL}images/about/story-private-journey.png`} alt="Chauffeur loading luggage into a private transfer van at the airport" ratio="4:3" position="center 48%" />
      </section>

      <section className="ab-luxury ab-section" aria-labelledby="ab-luxury-title">
        <div className="ab-shell ab-split ab-luxury-layout">
          <div className="ab-section-copy">
            <h2 id="ab-luxury-title">Luxury is how<br />the journey feels.</h2>
            <p>For us, luxury is not simply about travelling in comfort. It is about how you feel throughout the entire experience.</p>
          </div>
          <PhotoSlot src={`${import.meta.env.BASE_URL}images/about/car-door.jpg`} alt="Hand opening the door of a black car" ratio="16:7" position="center 34%" />
        </div>
      </section>

      <section className="ab-standards ab-shell ab-section" aria-labelledby="ab-standards-title">
        <p className="ab-eyebrow">What guides us</p>
        <h2 id="ab-standards-title">The Easy Lux standard.</h2>
        <p className="ab-standards-intro">Our company is the result of our hard work, our ambitions and our belief that passion can become excellence when combined with dedication.</p>
        <div className="ab-standard-list">
          {standards.map(standard => (
            <article className={`ab-standard${standard.number === '02' ? ' ab-standard-featured' : ''}`} key={standard.number}>
              <span className="ab-standard-number">{standard.number}</span>
              <div className="ab-standard-copy">
                <h3>{standard.title}</h3>
                <p>{standard.description}</p>
              </div>
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
              <PhotoSlot src={`${import.meta.env.BASE_URL}images/shared/private-van-passenger-cabin.png`} alt="Comfortable passenger seating inside the private transfer van" ratio="16:7" position="center" />
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
          <h2 id="ab-operate-title">From Venice and Treviso, across Italy and Europe.</h2>
          <p>We are proud to share the beauty of Italy with our guests, turning every transfer into an opportunity to discover its cities, landscapes and hidden treasures.</p>
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
            <p>Tell us your pick-up, destination and date. We’ll check availability and send you a quote.</p>
            <div className="ab-final-actions">
              <button className="ab-outline-button" type="button" onClick={() => navigate('contact')}>
                Book your ride <ArrowRight size={18} aria-hidden="true" />
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
