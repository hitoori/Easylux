import { Diamond, ShieldCheck, UsersThree } from '@phosphor-icons/react'
import { ArrowRight } from '../components/PikaIcons'
import type { Page } from '../types/navigation'
import './about.css'

interface AboutProps { navigate: (page: Page) => void }

const values = [
  { number: '01', title: 'People first', text: 'We put your needs at the centre of every journey.', Icon: UsersThree },
  { number: '02', title: 'Reliability', text: 'Punctual, well-maintained vehicles and professional drivers.', Icon: ShieldCheck },
  { number: '03', title: 'A higher standard', text: 'Discretion, professionalism and attention to detail.', Icon: Diamond },
]

const principles = [['Private', 'by default'], ['Tailored', 'to you'], ['Beyond', 'expectations']]

function EuropeRouteGraphic() {
  return (
    <div className="ab-map-visual">
      <svg viewBox="0 0 720 470" role="img" aria-labelledby="ab-map-title ab-map-desc">
        <title id="ab-map-title">Easy Lux journeys from Venice across Europe</title>
        <desc id="ab-map-desc">A minimal outline of Europe with Venice highlighted and routes extending towards nearby countries and western Europe.</desc>
        <path className="ab-map-outline" d="M71 102 112 72l53 11 38-35 45 10 39-29 51 35 47-11 34 27 61 1 24 33 57 16 17 42 50 24-5 49 31 38-17 44-49 5-33 39-47-7-29 40-44-23-55 8-37-30-43 6-28-39-42 2-12-43-53-18-8-46-41-28 18-45-23-34 28-36Z" />
        <path className="ab-map-coast" d="m339 231 25 21-4 31 24 30-8 30 31 28-8 27M431 170l-23 30 10 29-17 24M220 133l25 22-17 31-38 14" />
        <g className="ab-map-routes">
          <path d="M365 306Q277 207 181 150" /><path d="M365 306Q342 205 395 125" />
          <path d="M365 306Q430 243 520 233" /><path d="M365 306Q502 201 623 149" />
          <path d="M365 306Q269 330 183 371" />
        </g>
        <g className="ab-map-stops"><circle cx="181" cy="150" r="3" /><circle cx="395" cy="125" r="3" /><circle cx="520" cy="233" r="3" /><circle cx="623" cy="149" r="3" /><circle cx="183" cy="371" r="3" /></g>
        <circle className="ab-map-venice-ring" cx="365" cy="306" r="10" /><circle className="ab-map-venice" cx="365" cy="306" r="4" />
        <text x="382" y="311">VENICE</text>
      </svg>
      <p>Different destinations.<br /><em>The same care.</em><span /></p>
    </div>
  )
}

export default function About({ navigate }: AboutProps) {
  return <div className="about-page">
    <header className="ab-hero ab-shell" aria-labelledby="about-title">
      <div className="ab-hero-copy"><p className="ab-kicker">About Easy Lux</p><h1 id="about-title">Driven<br /><em>with purpose.</em></h1><p>Easy Lux is a private chauffeur service based in Venice, created for travellers who value comfort, reliability and a more personal way to explore Italy and beyond.</p><div className="ab-actions"><button className="ab-primary" onClick={() => navigate('services')}>Our Services <ArrowRight size={17} aria-hidden="true" /></button><button className="ab-text-link" onClick={() => navigate('contact')}>Contact us <ArrowRight size={16} aria-hidden="true" /></button></div></div>
      <div className="ab-hero-editorial" aria-label="What defines Easy Lux"><ul>{['Discretion', 'Comfort', 'Reliability', 'Freedom'].map(item => <li key={item}>{item}</li>)}</ul><blockquote>It’s not just<br />a transfer.<br />It’s how you<br /><em>experience the journey.</em><span /></blockquote></div>
    </header>

    <section className="ab-mission ab-shell" aria-labelledby="ab-mission-title"><div><p className="ab-kicker">Our mission</p><h2 id="ab-mission-title">A simpler,<br />more personal way<br /><em>to travel.</em></h2></div><div className="ab-mission-copy"><p>We believe that every journey should feel effortless. Our mission is to provide reliable, comfortable and tailored transport for travellers who want to experience Italy in a smooth and enjoyable way — from airport transfers and water taxi coordination in Venice to long-distance journeys across Europe.</p><p>We focus on what matters most: your time, your comfort and a service you can count on.</p></div></section>

    <section className="ab-values-section ab-shell" aria-labelledby="ab-values-title"><p className="ab-kicker" id="ab-values-title">What guides us</p><div className="ab-values">{values.map(({ number, title, text, Icon }) => <article key={title}><span className="ab-value-number">{number}</span><Icon size={29} weight="light" aria-hidden="true" /><h2>{title}</h2><p>{text}</p></article>)}</div></section>

    <section className="ab-coverage" aria-labelledby="ab-coverage-title"><div className="ab-shell ab-coverage-layout"><div className="ab-coverage-copy"><p className="ab-kicker">Based in Venice</p><h2 id="ab-coverage-title">From Italy<br />to new horizons.</h2><p>From Venice to the Dolomites, the Adriatic coast and major cities across Europe, we offer tailor-made transfers and journeys for leisure, business and special occasions.</p><div className="ab-places">Venice · Italy · Austria · Slovenia · Croatia · France</div></div><EuropeRouteGraphic /></div></section>

    <section className="ab-statement ab-shell" aria-label="The Easy Lux approach"><div className="ab-statement-copy"><blockquote>“We don’t just take you to a place —<br /><em>we help you experience it.”</em></blockquote><p>Easy Lux</p></div><div className="ab-principles">{principles.map(([title, subtitle]) => <div key={title}><strong>{title}</strong><span>{subtitle}</span></div>)}</div></section>

    <section className="ab-cta ab-shell" aria-labelledby="ab-cta-title"><div><p className="ab-kicker">Ready to travel?</p><h2 id="ab-cta-title">Let’s plan your journey.</h2></div><div className="ab-actions"><button className="ab-primary" onClick={() => navigate('contact')}>Book Your Ride <ArrowRight size={17} aria-hidden="true" /></button><button className="ab-secondary" onClick={() => navigate('contact')}>Contact Us <ArrowRight size={17} aria-hidden="true" /></button></div></section>
  </div>
}
