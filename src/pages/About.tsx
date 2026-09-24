import type { CSSProperties } from 'react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { ArrowRight } from '../components/PikaIcons'
import { company } from '../config/company'
import type { Page } from '../types/navigation'
import './about.css'

interface AboutProps { navigate: (page: Page) => void }

type PhotoSlotProps = {
  className?: string
  subject: string
  ratio: string
  focus?: string
  position?: string
  crop?: 'cover' | 'contain'
}

/** Replace this frame with an img when a real photograph is supplied. Keep the
 * same wrapper, aspect ratio and object-position; write descriptive alt text
 * for that photograph instead of reusing this placeholder label. */
function PhotoSlot({ className = '', subject, ratio, focus, position = 'center', crop = 'cover' }: PhotoSlotProps) {
  const style = { '--ab-ratio': ratio.replace(':', ' / '), '--ab-position': position, '--ab-fit': crop } as CSSProperties

  return (
    <div className={`ab-photo-slot ${className}`} style={style} aria-hidden="true">
      <div className="ab-photo-label">
        <span>Image placeholder</span>
        <strong>{subject}</strong>
        <small>Recommended: {ratio}</small>
        {focus && <small>Focus: {focus}</small>}
        <small>Crop: {crop} · Position: {position}</small>
      </div>
    </div>
  )
}

const facts = ['Two founders', 'Venice & Treviso', 'Private transport experience', 'Italy & Europe']

const standards = [
  {
    number: '01',
    title: 'Prepared around you',
    description: 'Your route, timing, passengers and luggage are considered before the journey begins.',
    photo: 'Journey preparation / Venice arrival',
  },
  {
    number: '02',
    title: 'Professional from start to finish',
    description: 'Clear communication, punctual service and personal assistance throughout your transfer.',
    photo: 'Driver and vehicle detail',
  },
  {
    number: '03',
    title: 'Genuine Italian hospitality',
    description: 'A welcoming, attentive approach designed to help you enjoy the journey as much as the destination.',
    photo: 'Italian road or destination',
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
        <PhotoSlot className="ab-hero-photo" subject="Two founders with vehicle in Venice" ratio="16:10" focus="founders and vehicle" position="center" />
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
        <PhotoSlot subject="Founders preparing the vehicle" ratio="4:3" focus="people, luggage and vehicle" position="center" />
      </section>

      <section className="ab-luxury ab-section" aria-labelledby="ab-luxury-title">
        <div className="ab-shell ab-split ab-luxury-layout">
          <div className="ab-section-copy">
            <h2 id="ab-luxury-title">Luxury is how<br />the journey feels.</h2>
            <p>For us, luxury is not defined only by the vehicle. It is knowing that your journey has been prepared, your time is respected and someone is there when you need them.</p>
          </div>
          <PhotoSlot subject="Chauffeur opening the vehicle door" ratio="16:7" focus="hand, vehicle door and Venice background" position="center right" />
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
              <PhotoSlot subject={standard.photo} ratio="16:5" position="center" />
            </article>
          ))}
        </div>
      </section>

      <section className="ab-collage ab-shell ab-section" aria-label="The Easy Lux experience">
        <div className="ab-collage-grid">
          <figure className="ab-collage-main">
            <PhotoSlot subject="Vehicle in Venice or Treviso" ratio="4:3" focus="vehicle in its surroundings" position="center" />
            <figcaption>Comfortable vehicles</figcaption>
          </figure>
          <div className="ab-collage-side">
            <figure>
              <PhotoSlot subject="Vehicle interior" ratio="16:7" focus="interior detail" position="center" />
              <figcaption>Comfort on board</figcaption>
            </figure>
            <figure>
              <PhotoSlot subject="Luggage assistance" ratio="16:7" focus="assistance with luggage" position="center" />
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
        <PhotoSlot subject="Venice & Treviso route map" ratio="4:3" focus="markers: Venice and Treviso; transparent PNG" position="center" crop="contain" />
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
          <PhotoSlot subject="Venice waterfront at sunset" ratio="16:6" focus="architecture and negative space for text" position="center" />
        </div>
      </section>
    </div>
  )
}
