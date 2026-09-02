import { useState } from 'react'
import type { Page } from '../types/navigation'

interface ContactProps {
  navigate: (page: Page) => void
}

export default function Contact({ navigate: _navigate }: ContactProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="pt-[88px] lg:pt-[96px]">
      {/* Page header */}
      <div className="py-24 px-6 lg:px-16 bg-[var(--background-secondary)] border-b border-[rgba(194,154,69,0.1)]">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">Get in Touch</p>
          <h1
            className="font-display text-[46px] font-normal leading-[0.96] text-cream sm:text-[62px]"
          >
            Contact
            <br />
            <em>Easy Lux Transfer</em>
          </h1>
        </div>
      </div>

      {/* Contact content */}
      <section className="py-24 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-24">
          {/* Form */}
          <div>
            <h2
              className="mb-8 font-display text-[30px] font-normal leading-[1.05] text-cream"
            >
              Send us a message.
            </h2>
            {sent ? (
              <div className="py-16 text-center border border-[rgba(194,154,69,0.2)]">
                <p className="text-gold text-[11px] tracking-widest uppercase mb-4">
                  Message Received
                </p>
                <p
                  className="mb-3 font-display text-[26px] font-normal text-cream"
                >
                  We'll be in touch within 30 minutes.
                </p>
                <p className="text-[13px] text-[rgba(200,192,181,0.45)]">
                  For urgent enquiries, please WhatsApp us directly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-[12px] text-[rgba(200,192,181,0.4)] hover:text-cream underline underline-offset-2 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-[rgba(194,154,69,0.15)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[rgba(194,154,69,0.1)]">
                  <div className="bg-[var(--background)] p-5">
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[rgba(194,154,69,0.6)] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full text-[14px] text-cream bg-transparent border-b border-[rgba(194,154,69,0.15)] pb-2 focus:outline-none focus:border-gold transition-colors"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="bg-[var(--background)] p-5">
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[rgba(194,154,69,0.6)] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full text-[14px] text-cream bg-transparent border-b border-[rgba(194,154,69,0.15)] pb-2 focus:outline-none focus:border-gold transition-colors"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[rgba(194,154,69,0.1)] border-t border-[rgba(194,154,69,0.1)]">
                  <div className="bg-[var(--background)] p-5">
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[rgba(194,154,69,0.6)] mb-2">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      className="w-full text-[14px] text-cream bg-transparent border-b border-[rgba(194,154,69,0.15)] pb-2 focus:outline-none focus:border-gold transition-colors"
                      placeholder="+39 or international"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="bg-[var(--background)] p-5">
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[rgba(194,154,69,0.6)] mb-2">
                      Service Required
                    </label>
                    <select
                      className="w-full text-[14px] text-cream bg-transparent border-b border-[rgba(194,154,69,0.15)] pb-2 focus:outline-none appearance-none cursor-pointer"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    >
                      <option value="">Select a service…</option>
                      <option value="transfer">Private Transfer</option>
                      <option value="airport">Airport Pickup</option>
                      <option value="hourly">Chauffeur by the Hour</option>
                      <option value="prosecco">Prosecco Hills Tour</option>
                      <option value="watertaxi">Venice Water Taxi</option>
                      <option value="custom">Custom / Multi-day</option>
                      <option value="other">Other enquiry</option>
                    </select>
                  </div>
                </div>
                <div className="bg-[var(--background)] p-5 border-t border-[rgba(194,154,69,0.1)]">
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[rgba(194,154,69,0.6)] mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full text-[14px] text-cream bg-transparent border-b border-[rgba(194,154,69,0.15)] pb-2 focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Dates, route, number of passengers, special requirements…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <div className="bg-[var(--background)] p-5 border-t border-[rgba(194,154,69,0.1)]">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gold text-[var(--background)] text-[13px] tracking-[0.15em] uppercase font-semibold hover:bg-gold-light transition-colors"
                  >
                    Send Message
                  </button>
                  <p className="text-center text-[11px] text-[rgba(200,192,181,0.3)] mt-3">
                    We respond to every message within 30 minutes during operating hours.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2
                className="mb-8 font-display text-[30px] font-normal leading-[1.05] text-cream"
              >
                Direct contact.
              </h2>

              <div className="space-y-0 border border-[rgba(194,154,69,0.15)]">
                {[
                  {
                    icon: '☎',
                    label: 'Phone',
                    value: '+39 390 123 4567',
                    sub: 'Available 07:00–22:00 daily',
                    href: 'tel:+393901234567',
                  },
                  {
                    icon: '◎',
                    label: 'WhatsApp',
                    value: '+39 390 123 4567',
                    sub: 'Fastest response · 24/7',
                    href: 'https://wa.me/393901234567',
                  },
                  {
                    icon: '✉',
                    label: 'Email',
                    value: 'info@easylux.it',
                    sub: 'For detailed enquiries',
                    href: 'mailto:info@easylux.it',
                  },
                ].map((c, i) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className={`flex gap-4 p-5 hover:bg-[rgba(194,154,69,0.03)] transition-colors ${
                      i < 2 ? 'border-b border-[rgba(194,154,69,0.1)]' : ''
                    }`}
                  >
                    <span className="text-gold text-[18px] flex-shrink-0 mt-0.5">{c.icon}</span>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-[rgba(194,154,69,0.5)] mb-0.5">
                        {c.label}
                      </p>
                      <p className="text-[15px] text-cream font-medium">{c.value}</p>
                      <p className="text-[12px] text-[rgba(200,192,181,0.4)] mt-0.5">{c.sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Service area */}
            <div className="border border-[rgba(194,154,69,0.15)] p-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[rgba(194,154,69,0.6)] mb-3">
                Service Area
              </p>
              <p className="text-[14px] text-cream mb-3">Venice & the Veneto Region</p>
              <ul className="space-y-1.5 text-[13px] text-[rgba(200,192,181,0.5)]">
                {[
                  'Venice — all islands and lagoon',
                  'Treviso, Padua, Vicenza, Verona',
                  'Dolomites and Alpine routes',
                  'Milan, Florence, Rome (long-distance)',
                  'Slovenia, Croatia, Austria (cross-border)',
                ].map((area) => (
                  <li key={area} className="flex items-start gap-2">
                    <span className="text-[rgba(194,154,69,0.4)] flex-shrink-0">·</span>
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company details */}
            <div className="border border-[rgba(194,154,69,0.1)] p-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[rgba(194,154,69,0.5)] mb-4">
                Company Information
              </p>
              <div className="space-y-2.5 text-[13px]">
                {[
                  { label: 'Company', value: 'Easy Lux Transfer S.r.l.' },
                  { label: 'P.IVA', value: '04567890267' },
                  { label: 'Reg. office', value: 'Via della Libertà 14, 30173 Venezia VE' },
                  { label: 'Licence', value: 'NCC — Noleggio con Conducente' },
                  { label: 'Insurance', value: 'Fully licensed & insured' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between gap-4">
                    <span className="text-[rgba(200,192,181,0.4)]">{item.label}</span>
                    <span className="text-cream text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
