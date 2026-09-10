import { useState } from 'react'
import { CreditCard, MapPin, AirplaneTilt, Car, Info, WhatsappLogo } from '@phosphor-icons/react'
import { ArrowRight, Close, Minus, Plus, Search } from '../components/PikaIcons'
import type { Page } from '../types/navigation'
import { company } from '../config/company'
import { faqTopics } from './faqData'
import './faq.css'

const questions = faqTopics.flatMap(group => [...group.questions])
const categories = [
  { id: 'booking', title: 'Booking & Payment', subtitle: 'Reservations, payments, changes', description: 'Information about reservations, payments, changes and cancellations.', Icon: CreditCard, ids: ['book', 'price', 'payment', 'modify', 'cancel'] },
  { id: 'journey', title: 'Pick-up & Journey', subtitle: 'Meeting points, waiting, luggage', description: 'The practical details for a smooth pickup and a comfortable journey.', Icon: MapPin, ids: ['port', 'waiting', 'bags', 'child'] },
  { id: 'airport', title: 'Airport & Water Taxi', subtitle: 'Flights, boat transfers, Venice', description: 'Airport arrivals and the connections between Venice’s waterways and the road.', Icon: AirplaneTilt, ids: ['meeting', 'delay', 'cancelled-flight', 'hotel', 'combine', 'boat-price', 'boat-luggage'] },
  { id: 'distance', title: 'Long-distance & Hourly', subtitle: 'Italy, Europe, by the hour', description: 'Plan a return trip, several stops or more time with your chauffeur.', Icon: Car, ids: ['return', 'stops'] },
  { id: 'general', title: 'General', subtitle: 'Assistance and special requests', description: 'Tell us what you need so we can check suitable arrangements before you book.', Icon: Info, ids: ['access', 'pets'] },
]

export default function FAQ({ navigate }: { navigate: (page: Page) => void }) {
  const [topic, setTopic] = useState('booking')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<string | null>(null)
  const active = categories.find(category => category.id === topic)!
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const searching = words.length > 0
  const visible = searching ? questions.filter(item => words.every(word => `${item.q} ${item.a}`.toLowerCase().includes(word))) : active.ids.map(id => questions.find(item => item.id === id)!)
  const chooseTopic = (id: string) => { setTopic(id); setQuery(''); setOpen(null) }

  return <div className="faq-page">
    <header className="fq-hero" aria-labelledby="faq-title">
      <img src="./images/home/vehicle/exterior.png" alt="" className="fq-hero-photo" fetchPriority="high" />
      <div className="fq-shell fq-hero-content"><div><p className="fq-eyebrow">FAQ</p><h1 id="faq-title">Your questions,<br /><em>our answers.</em></h1><p className="fq-intro-copy">Find quick answers about bookings, payments, pick-ups and more.<br />Still need help? We're just a message away.</p></div><div className="fq-editorial">More than a transfer.<br />A smoother way<br />to travel.<span /></div></div>
    </header>

    <section className="fq-directory fq-shell" aria-label="Frequently asked questions">
      <aside className="fq-sidebar">
        <nav aria-label="FAQ categories"><p className="fq-eyebrow">Browse by topic</p><div className="fq-topic-buttons">{categories.map(({ id, title, subtitle, Icon }) => <button type="button" key={id} aria-pressed={!searching && topic === id} onClick={event => { chooseTopic(id); event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'auto' }) }}><Icon size={21} weight="light" aria-hidden="true" /><span><strong>{title}</strong><small>{subtitle}</small></span><ArrowRight size={16} aria-hidden="true" /></button>)}</div></nav>
        <div className="fq-sidebar-help"><h2>Still have a question?</h2><p>We're here to help. Tell us what you need.</p><button className="fq-button" onClick={() => navigate('contact')}>Contact us <ArrowRight size={17} aria-hidden="true" /></button></div>
      </aside>

      <div className="fq-results">
        <div className="fq-results-toolbar"><span className="fq-index">{searching ? 'Search' : `0${categories.indexOf(active) + 1}`}</span><div className="fq-search" role="search"><Search size={18} aria-hidden="true" /><input type="search" aria-label="Search questions or keywords" placeholder="Search all questions" value={query} onChange={event => { setQuery(event.target.value); setOpen(null) }} />{query && <button aria-label="Clear search" onClick={() => { setQuery(''); setOpen(null) }}><Close size={17} aria-hidden="true" /></button>}</div></div>
        <div className="fq-results-content" key={searching ? 'search' : topic}>
          <div className="fq-results-heading"><h2>{searching ? 'Search results' : active.title}</h2><p>{searching ? 'Matching answers from every topic.' : active.description}</p><span className="fq-count" role="status">{visible.length} {visible.length === 1 ? 'question' : 'questions'}</span></div>
          <div className="fq-questions">{visible.map(item => <article className={`fq-question${open === item.id ? ' is-open' : ''}`} key={item.id}><h3><button type="button" id={`fq-question-${item.id}`} aria-expanded={open === item.id} aria-controls={`fq-answer-${item.id}`} onClick={() => setOpen(open === item.id ? null : item.id)}>{item.q}{open === item.id ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}</button></h3><div id={`fq-answer-${item.id}`} role="region" aria-labelledby={`fq-question-${item.id}`} aria-hidden={open !== item.id} className="fq-answer"><div><p>{item.a}</p></div></div></article>)}</div>
          {!visible.length && <div className="fq-empty"><h3>No matching questions.</h3><p>Try “luggage”, “flight” or “payment”, or contact us about your journey.</p><button className="fq-text-link" onClick={() => setQuery('')}>Back to {active.title} <ArrowRight size={17} aria-hidden="true" /></button></div>}
        </div>
      </div>
    </section>

    <section className="fq-help fq-shell" aria-labelledby="fq-help-title">
      <img src="./images/home/hero/venice-grand-canal.jpg" alt="Venice’s Grand Canal and waterfront architecture" loading="lazy" />
      <div className="fq-help-copy"><p className="fq-eyebrow">Still have a question?</p><h2 id="fq-help-title">We're here to help.</h2><p>Tell us what you need and we'll be happy to assist you.</p><div className="fq-actions"><button className="fq-button" onClick={() => navigate('contact')}>Contact us <ArrowRight size={17} aria-hidden="true" /></button><a className="fq-button fq-button-secondary" href={company.phones[0].whatsapp}><WhatsappLogo size={18} aria-hidden="true" />WhatsApp us <ArrowRight size={17} aria-hidden="true" /></a></div></div>
    </section>
  </div>
}
