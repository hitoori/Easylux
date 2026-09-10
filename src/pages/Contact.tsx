import { useState } from 'react'
import { EnvelopeSimple, Phone, WhatsappLogo } from '@phosphor-icons/react'
import { ArrowRight, Plus, Minus, Send } from '../components/PikaIcons'
import type { Page } from '../types/navigation'
import './contact.css'

const services = [
  'Airport & city transfer',
  'Chauffeur by the hour',
  'Venice water taxi',
  'Italy & Europe',
  'Mountains & seaside',
  'Cruise port transfer',
  'Other enquiry',
]

const contactChannels = [
  { label: 'WhatsApp', value: '+39 390 123 4567', href: 'https://wa.me/393901234567', Icon: WhatsappLogo },
  { label: 'Call us', value: '+39 390 123 4567', href: 'tel:+393901234567', Icon: Phone },
  { label: 'Email', value: 'info@easylux.it', href: 'mailto:info@easylux.it', Icon: EnvelopeSimple },
]

export default function Contact({ navigate }: { navigate: (page: Page) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [prepared, setPrepared] = useState(false)
  const emailDraft = `mailto:info@easylux.it?subject=${encodeURIComponent(`Easy Lux enquiry${service ? ` — ${service}` : ''}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nService: ${service || 'General enquiry'}\n\n${message}`)}`

  return (
    <div className="contact-page">
      <header className="ct-hero ct-shell" aria-labelledby="contact-title">
        <div>
          <p className="ct-kicker">Contact Easy Lux</p>
          <h1 id="contact-title">Contact us</h1>
          <p className="ct-intro">Planning a transfer or have a question? Tell us what you need.</p>
        </div>
      </header>

      <section className="ct-concierge ct-shell" aria-label="Plan your journey with Easy Lux">
        <div className="ct-form-panel">
          <div className="ct-form-heading">
            <div>
              <h2>Write to us</h2>
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
              <button type="submit" className="ct-primary">Prepare enquiry <Send size={18} aria-hidden="true" /></button>
              <p>Review and send from your email app.</p>
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
            {contactChannels.map(({ label, value, href, Icon }) => <a key={label} href={href}>
              <Icon size={20} weight="light" aria-hidden="true" />
              <div><span>{label}</span><strong>{value}</strong></div>
              <ArrowRight size={17} aria-hidden="true" />
            </a>)}
          </div>

          <div className="ct-area">
            <h3>Where we travel</h3>
            <p>Venice &amp; Veneto, with private journeys across Italy and Europe.</p>
            <button className="ct-inline-link" onClick={() => navigate('services')}>View services &amp; prices <ArrowRight size={17} aria-hidden="true" /></button>
          </div>
        </aside>
      </section>

      <section className="ct-help ct-shell" aria-labelledby="ct-help-title">
        <div className="ct-help-heading"><h2 id="ct-help-title">Useful to know.</h2><button className="ct-inline-link" onClick={() => navigate('faq')}>Explore all FAQs <ArrowRight size={17} aria-hidden="true" /></button></div>
        <div className="ct-help-questions">
          <details><summary>What should I include in my request?<DisclosureIcon /></summary><p>Share your pick-up address, destination, date and preferred time, along with passenger and luggage numbers. For airport arrivals, include your flight number if you have it.</p></details>
          <details><summary>Does an enquiry confirm my booking?<DisclosureIcon /></summary><p>No. Your enquiry starts the conversation. Your transfer is confirmed once availability, the price and journey details have been agreed with Easy Lux.</p></details>
          <details><summary>Can I request stops or a return transfer?<DisclosureIcon /></summary><p>Yes. Include the stops, waiting time or return date you have in mind. We’ll review your itinerary and confirm the arrangements and price with you.</p></details>
        </div>
      </section>
    </div>
  )
}

function DisclosureIcon() {
  return <span className="ct-disclosure" aria-hidden="true"><Plus className="ct-plus" size={16} /><Minus className="ct-minus" size={16} /></span>
}
