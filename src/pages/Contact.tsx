import { useState } from 'react'
import { EnvelopeSimple, Phone, WhatsappLogo, LockSimple, MapPin, AirplaneTilt, Boat, Mountains, GlobeHemisphereWest, Anchor, Waves } from '@phosphor-icons/react'
import { ArrowRight, Clock, Message, Check, Plus } from '../components/PikaIcons'
import { flushSync } from 'react-dom'
import { serviceOptions } from '../components/services/serviceData'
import type { Page } from '../types/navigation'
import { company } from '../config/company'
import './contact.css'

const services = serviceOptions.map(([, label]) => label)
const popularServices = [
  { label: 'Airport & City', id: 'airport', Icon: AirplaneTilt },
  { label: 'By the Hour', id: 'hourly', Icon: Clock },
  { label: 'Water Taxi', id: 'water-taxi', Icon: Boat },
  { label: 'Italy & Europe', id: 'europe', Icon: GlobeHemisphereWest },
  { label: 'Mountains', id: 'mountains', Icon: Mountains },
  { label: 'Seaside', id: 'coast', Icon: Waves },
  { label: 'Cruise Ports', id: 'cruise', Icon: Anchor },
]
const quickAnswers = [
  ['What should I include in my request?', 'Share your pick-up and destination, travel date and time, passenger count and luggage. Include any child seats, planned stops or other requests so we can check the arrangements.'],
  ['Does an enquiry confirm my booking?', 'No. An enquiry lets us check availability and prepare your quote. Review the price and arrangements with us before confirming your booking.'],
  ['Can I request stops or a return transfer?', 'Yes. Include planned stops and both dates and pick-up times in your request. Each direction is quoted separately; stops are included in your individual quote.'],
]

const contactChannels = [
  { label: 'WhatsApp', links: company.phones.map(phone => ({ value: phone.display, href: phone.whatsapp })), Icon: WhatsappLogo, note: 'Message us about your journey' },
  { label: 'Call us', links: company.phones.map(phone => ({ value: phone.display, href: phone.tel })), Icon: Phone, note: 'Discuss your plans with us' },
  { label: 'Email', links: [{ value: company.email, href: `mailto:${company.email}` }], Icon: EnvelopeSimple, note: "We'll reply as soon as possible" },
]

export default function Contact({ navigate }: { navigate: (page: Page) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [openAnswer, setOpenAnswer] = useState<number | null>(null)
  const viewService = (id: string) => {
    flushSync(() => navigate('services'))
    const section = document.getElementById(`service-${id}`)
    if (section) window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - 148, behavior: 'instant' })
  }
  const [prepared, setPrepared] = useState(false)
  const emailDraft = `mailto:${company.email}?subject=${encodeURIComponent(`Easy Lux enquiry${service ? ` — ${service}` : ''}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nService: ${service || 'General enquiry'}\n\n${message}`)}`

  return (
    <div className="contact-page">
      <header className="ct-hero" aria-labelledby="contact-title">
        <img className="ct-hero-image" src="./images/home/hero/venice-grand-canal.jpg" alt="" fetchPriority="high" />
        <div className="ct-shell ct-hero-content">
          <div>
            <p className="ct-kicker">Contact Easy Lux</p>
            <h1 id="contact-title">Let's plan<br /><em>your journey.</em></h1>
            <p className="ct-intro">Planning a transfer or have a question? Tell us what you need.<br />We'll get back to you as soon as possible.</p>
            {/* TODO: Confirm response-time and opening-hours claims before publishing them. */}
            <div className="ct-trust" aria-label="Ways to connect">
              <div><Clock size={17} aria-hidden="true" /><span>Personal attention<br /><strong>From the first message</strong></span></div>
              <div><MapPin size={18} weight="light" aria-hidden="true" /><span>Based in Venice<br /><strong>Italy &amp; Europe</strong></span></div>
              <div><Message size={17} aria-hidden="true" /><span>WhatsApp<br /><strong>Send us your plans</strong></span></div>
            </div>
          </div>
          <div className="ct-editorial">More than a transfer.<br />A smoother way<br />to travel.<span /></div>
        </div>
      </header>

      <section className="ct-concierge ct-shell" aria-label="Plan your journey with Easy Lux">


        <div className="ct-form-panel">
          <div className="ct-form-heading">
            <div>
              <h2>Send us a message</h2><p>Fill in the details and we’ll get back to you soon.</p>
            </div>
          </div>

          <form onSubmit={event => { event.preventDefault(); setPrepared(true) }} onChange={() => setPrepared(false)}>
            <div className="ct-fields">
              <label htmlFor="ct-name">Full name
                <input id="ct-name" name="name" autoComplete="name" value={name} onChange={event => setName(event.target.value)} placeholder="Your name" required />
              </label>
              <label htmlFor="ct-email">Email address
                <input id="ct-email" name="email" type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" required />
              </label>
              <label htmlFor="ct-phone">Phone <span>(optional)</span>
                <input id="ct-phone" name="phone" type="tel" autoComplete="tel" value={phone} onChange={event => setPhone(event.target.value)} placeholder="Include country code" />
              </label>
              <label htmlFor="ct-service">Service <span>(optional)</span>
                <select id="ct-service" name="service" value={service} onChange={event => setService(event.target.value)}>
                  <option value="">Select a service</option>
                  {services.map(item => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>

            <label className="ct-message-field" htmlFor="ct-message">Your message
              <textarea id="ct-message" name="message" rows={4} value={message} onChange={event => setMessage(event.target.value)} placeholder="Your route, travel date, passengers and luggage…" required />
            </label>

            <div className="ct-submit">
              <button type="submit" className="ct-primary">Send enquiry <ArrowRight size={18} aria-hidden="true" /></button>
              <p className="ct-privacy"><LockSimple size={16} weight="light" aria-hidden="true" /><span>Your details stay in this draft until you send it.<br />Review and send from your email app.</span></p>
            </div>

            {prepared && <div className="ct-draft" role="status">
              <div><span>Ready</span><h3>Your enquiry has been prepared.</h3></div>
              <p>Nothing has been sent yet. Open the draft, check your details and send it when you are ready.</p>
              <a className="ct-inline-link" href={emailDraft}>Open email draft <ArrowRight size={18} aria-hidden="true" /></a>
            </div>}
          </form>
        </div>

        <aside className="ct-contact-panel" aria-labelledby="ct-direct-title">
          <div>
            <h2 id="ct-direct-title">Speak with us directly</h2>
          </div>

          <div className="ct-channels">
            {contactChannels.map(({ label, links, Icon, note }) => <div className="ct-channel" key={label}>
              <Icon size={20} weight="light" aria-hidden="true" />
              <div><span>{label}</span><div className="ct-channel-links">{links.map(({ value, href }, index) => <span className="ct-channel-number" key={href}>{index > 0 && <span className="ct-phone-divider" aria-hidden="true">/</span>}<a href={href} aria-label={`${label}: ${value}`}><strong>{value}</strong></a></span>)}<ArrowRight size={15} aria-hidden="true" /></div><small>{note}</small></div>
            </div>)}
          </div>

          <div className="ct-area">
            <img src="./images/home/water-taxi/venice-water-taxi.jpg" alt="" loading="lazy" />
            <div><span><MapPin size={17} weight="light" aria-hidden="true" />Our operational base</span>
              <h3>Venice, Italy</h3>
              <p>{company.serviceArea}</p>
              <a href="#services" className="ct-inline-link" onClick={event => { event.preventDefault(); viewService('europe') }}>View service area <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </aside>
      </section>

      <section className="ct-information ct-shell" aria-label="Planning your transfer">
        <article>
          <p className="ct-info-label">Your enquiry</p><h2>Before you write</h2>
          <ul className="ct-info-list">{[
            ['Your route & timing', 'Pickup, destination, travel date and approximate time.'],
            ['Your travel party', 'Number of passengers and the amount of luggage.'],
            ['The extra details', 'Child seats, planned stops or any special requests.'],
          ].map(([title, text]) => <li key={title}><Check size={16} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul>
        </article>
        <article className="ct-info-featured">
          <p className="ct-info-label">The next steps</p><h2>From request to pickup</h2>
          <ol className="ct-info-list ct-info-timeline">{[
            ['Tell us your plans', 'Fill in the form or contact us directly.'],
            ['Review your quote', 'We check availability and agree the details with you.'],
            ['Meet your driver', 'Your meeting instructions are confirmed before travel.'],
          ].map(([title, text], i) => <li key={title}><span className="ct-info-number">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        </article>
        <article>
          <p className="ct-info-label">Travel details</p><h2>Good to know</h2>
          <ul className="ct-info-list">{[
            ['Arriving by air', 'Share your flight number so we can follow your arrival.'],
            ['A pickup that suits you', 'Airports, hotels, stations and cruise ports.'],
            ['Room for your plans', 'Request stops or a return trip; mention child seats and extra bags.'],
          ].map(([title, text]) => <li key={title}><Check size={16} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul>
          {/* TODO: Confirm invoices, payment methods, languages and driver-contact delivery before adding these company claims. */}
        </article>
      </section>

      <nav className="ct-services ct-shell" aria-labelledby="ct-services-title">
        <div className="ct-services-heading"><div><p className="ct-info-label">Ways to travel</p><h2 id="ct-services-title">Explore our services</h2></div><p>Seven services, tailored around your plans.</p></div>
        <div className="ct-services-marquee"><div className="ct-services-track">{[0, 1].map(copy => <div className="ct-services-set" key={copy} aria-hidden={copy === 1 || undefined}>{popularServices.map(({ label, id, Icon }) => <a key={`${copy}-${label}`} href="#services" tabIndex={copy === 1 ? -1 : undefined} onClick={event => { event.preventDefault(); viewService(id) }}><span className="ct-service-icon"><Icon size={20} aria-hidden="true" /></span><strong>{label}</strong><ArrowRight size={16} aria-hidden="true" /></a>)}</div>)}</div></div>
      </nav>

      <section className="ct-faq ct-shell" aria-labelledby="ct-faq-title">
        <div className="ct-faq-heading"><div><p className="ct-kicker">Useful to know</p><h2 id="ct-faq-title">Quick answers</h2></div><a href="#faq" className="ct-inline-link" onClick={event => { event.preventDefault(); navigate('faq') }}>Explore all FAQs <ArrowRight size={17} aria-hidden="true" /></a></div>
        {quickAnswers.map(([question, answer], index) => <article key={question} className="ct-answer"><h3><button id={`ct-question-${index}`} aria-expanded={openAnswer === index} aria-controls={`ct-answer-${index}`} onClick={() => setOpenAnswer(openAnswer === index ? null : index)}>{question}<Plus size={18} aria-hidden="true" /></button></h3><div id={`ct-answer-${index}`} role="region" aria-labelledby={`ct-question-${index}`} className={`ct-answer-body${openAnswer === index ? ' is-open' : ''}`} aria-hidden={openAnswer !== index}><div><p>{answer}</p></div></div></article>)}
      </section>
    </div>
  )
}
