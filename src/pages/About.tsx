import { ArrowRight, Check } from '../components/PikaIcons'
import type { Page } from '../types/navigation'
import './about.css'

interface AboutProps { navigate: (page: Page) => void }

const services = [
  ['Airport & city transfers', 'Private pick-ups for airport arrivals, hotel stays and travel between cities. Your meeting point and destination arranged before you set off.'],
  ['A chauffeur by the hour', 'Keep a private driver for a schedule with several stops, meetings or time to explore. Share your itinerary so we can plan around it.'],
  ['Longer journeys & special destinations', 'Travel across Italy and Europe, to mountain resorts, the coast or a cruise departure. Routes and stops arranged to suit your plans.'],
]
const steps = [
  ['Tell us about your trip', 'Send your pick-up point, destination, date, passenger numbers and luggage details. Include any stops or special requests.'],
  ['Review your arrangements', 'We help organise the route and suitable transport. You receive the journey details and price before you confirm.'],
  ['Meet your driver', 'Follow the agreed pick-up instructions and begin your private transfer, with the arrangements already in place.'],
]

export default function About({ navigate }: AboutProps) {
  return <div className="about-page">
    <section className="ab-intro ab-shell" aria-labelledby="about-title">
      <div className="ab-intro-copy"><p className="ab-kicker">About Easy Lux</p><h1 id="about-title">Your private driver.<br /><em>Our personal<br className="ab-wide-break" /> commitment.</em></h1><p>Easy Lux provides private transfers and chauffeur services from Venice and Veneto to destinations across Italy and Europe.</p><p>Behind the company is a young couple with a shared passion for hospitality, careful planning and making every guest feel welcome.</p><button className="ab-primary" onClick={()=>navigate('contact')}>Talk to us about your trip <ArrowRight size={18} aria-hidden="true" /></button></div>
      <figure className="ab-intro-photo"><img src="https://images.unsplash.com/photo-1605437241278-c1806d14a4d9?auto=format&fit=crop&w=1400&q=85" alt="Leather seating and carefully finished details inside a Mercedes" fetchPriority="high" /><figcaption>Private transport. Personal attention.</figcaption></figure>
    </section>
    <div className="ab-overview ab-shell"><div><span>Our service</span><strong>Private transfers &amp; chauffeurs</strong></div><div><span>Our starting point</span><strong>Venice &amp; Veneto</strong></div><div><span>Your destinations</span><strong>Italy &amp; Europe</strong></div></div>

    <section className="ab-story ab-shell" aria-labelledby="ab-story-title">
      <div><p className="ab-kicker">Who we are</p><h2 id="ab-story-title">A young couple.<br />A shared ambition.<br /><em>A personal service.</em></h2></div>
      <div className="ab-story-copy"><p>We created Easy Lux from our passion for premium chauffeur services. We wanted to build a company where professionalism and a warm welcome belong together, and where every transfer is organised with care.</p><p>For us, that means listening to your needs, respecting your time and paying attention to the details that make travel more comfortable. From a simple airport pick-up to a longer journey, our commitment is the same: a safe, reliable and personalised experience.</p><p>Your trust is our greatest reward. We work to earn it through the way we communicate, prepare and look after you.</p><blockquote>“We believe every guest should feel looked after from the first message to the final arrival.”<cite>The founders of Easy Lux</cite></blockquote></div>
    </section>

    <section className="ab-travel" aria-labelledby="ab-travel-title"><div className="ab-shell">
      <div className="ab-section-heading"><div><p className="ab-kicker">What we do</p><h2 id="ab-travel-title">Private travel,<br /><em>for the plans you have.</em></h2></div><p>Arriving for a holiday, travelling for work or heading somewhere special. We help arrange the transport that connects each part of your trip.</p></div>
      <div className="ab-travel-layout"><div className="ab-service-list">{services.map(([title,text],index)=><article key={title}><span className="ab-number">0{index+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}<button className="ab-text-link" onClick={()=>navigate('services')}>View all services &amp; prices <ArrowRight size={18} aria-hidden="true" /></button></div>
        <figure className="ab-destination"><img src="https://images.unsplash.com/photo-1658426118253-300e741685f2?auto=format&fit=crop&w=1100&q=85" alt="A canal and historic architecture in Venice" loading="lazy" /><figcaption><span>From Venice, further afield</span><p>Veneto · Italy · Europe</p></figcaption></figure>
      </div>
      <p className="ab-water-note">Arriving in Venice’s historic centre? We can also help arrange a private water taxi. <button onClick={()=>navigate('services')}>Explore transfer options <ArrowRight size={15} aria-hidden="true" /></button></p>
    </div></section>

    <section className="ab-standards ab-shell" aria-labelledby="ab-standards-title"><div><p className="ab-kicker">What matters to us</p><h2 id="ab-standards-title">The care behind<br /><em>every transfer.</em></h2><p>A premium service should feel straightforward. These are the things we focus on when arranging your journey.</p></div><div className="ab-values">{[
      ['Clear communication', 'Your pick-up, destination and travel requirements discussed in advance.'],
      ['Punctuality', 'Careful planning around your agreed departure time and schedule.'],
      ['Comfort & privacy', 'Private transportation with attention to your passengers and luggage.'],
      ['Personal arrangements', 'Space to discuss extra stops, special requests and the details of your trip.'],
    ].map(([title,text])=><article key={title}><Check size={19} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

    <section className="ab-process" aria-labelledby="ab-process-title"><div className="ab-shell"><p className="ab-kicker">How it works</p><h2 id="ab-process-title">From your first message<br /><em>to your destination.</em></h2><div className="ab-steps">{steps.map(([title,text],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="ab-contact ab-shell" aria-labelledby="ab-contact-title"><div><p className="ab-kicker">Let’s arrange your transfer</p><h2 id="ab-contact-title">Where can we take you?</h2><p>Share your plans with us. We’ll help you work out the details.</p></div><button className="ab-primary" onClick={()=>navigate('contact')}>Get in touch <ArrowRight size={20} aria-hidden="true" /></button></section>
  </div>
}
