import { useState } from 'react'
import type { Page } from '../types/navigation'

interface FAQProps {
  navigate: (page: Page) => void
}

const categories = [
  {
    title: 'Booking & Payment',
    icon: '◇',
    questions: [
      {
        q: 'How do I confirm my booking?',
        a: 'Complete the booking form on our website or contact us directly by WhatsApp or email. We respond within 30 minutes with a confirmation and payment link for the 15% advance deposit.',
      },
      {
        q: 'What is the advance payment policy?',
        a: 'A 15% advance payment is required to secure your reservation. This is processed securely online. The remaining 85% of the balance is paid in cash directly to the driver at the end of your journey.',
      },
      {
        q: 'Is the price fixed or based on a meter?',
        a: 'All our transfers are fixed-price. The quoted price is the final price — there are no meter charges, no surprises. Night supplements (22:00–06:00) are disclosed at booking.',
      },
      {
        q: 'Can I cancel or modify my booking?',
        a: 'Cancellations more than 48 hours before the transfer receive a full refund of the advance payment. Cancellations within 24–48 hours receive a 50% refund. Cancellations within 24 hours are non-refundable. Modifications to date or time are free when requested more than 24 hours in advance.',
      },
      {
        q: 'Do you accept credit cards?',
        a: 'The advance payment can be made by credit or debit card via our secure payment link (Stripe). The balance is paid in cash to the driver. We do not accept card payments in the vehicle.',
      },
      {
        q: 'Are child seats available?',
        a: 'Yes. Please request the appropriate seat type (infant, toddler, booster) when booking. Child seats are provided free of charge. Italian law requires child seats for all children under 36 kg.',
      },
    ],
  },
  {
    title: 'Airport Pickup',
    icon: '✈',
    questions: [
      {
        q: 'How does the airport pickup work?',
        a: 'Your driver tracks your flight in real time. They arrive at the arrivals hall before your flight lands, holding a name board with your name. If your flight is delayed, the driver adjusts their arrival accordingly at no extra charge.',
      },
      {
        q: 'How long will the driver wait if I am delayed?',
        a: 'For airport pickups, 60 minutes of complimentary waiting time is included from the moment the flight lands. Additional waiting time is charged at €10 per 30 minutes. For port and train station pickups, 30 minutes is included.',
      },
      {
        q: 'What if my flight is cancelled?',
        a: 'Please notify us as soon as possible. If you contact us before the driver departs for the airport, there is no charge. We will rebook for your rescheduled flight at no extra cost.',
      },
      {
        q: 'Which airports do you serve?',
        a: 'We serve all airports accessible from the Veneto region: Venice Marco Polo (VCE), Venice Treviso (TSF), Verona (VRN), Trieste (TRS), and by prior arrangement, Milan Malpensa (MXP), Milan Linate (LIN) and Rome Fiumicino (FCO).',
      },
      {
        q: 'Do you also do port transfers?',
        a: 'Yes. We operate transfers to and from Venice Cruise Terminal, Trieste Cruise Terminal and other Adriatic ports. We coordinate with cruise line schedules to ensure timely arrivals.',
      },
    ],
  },
  {
    title: 'During Your Journey',
    icon: '⟶',
    questions: [
      {
        q: 'Can we make stops along the way?',
        a: 'For fixed-price transfers, short comfort stops (fuel stations, coffee) are included at the driver\'s discretion. For planned tourist stops or shopping detours, we recommend booking our "Chauffeur by the Hour" service.',
      },
      {
        q: 'Is Wi-Fi available in the vehicles?',
        a: 'Wi-Fi and phone charging cables (USB-A and USB-C) are available in the Mercedes V-Class and Standard Sedan. Complimentary water is provided on all transfers.',
      },
      {
        q: 'Can I bring large or unusual luggage?',
        a: 'Standard suitcases, ski bags, golf bags and prams are accommodated in most vehicles. Please mention any oversized items at booking so we can assign the right vehicle. The Minibus has the most cargo capacity.',
      },
      {
        q: 'What happens if the vehicle breaks down?',
        a: 'In the unlikely event of a breakdown, we arrange a replacement vehicle as quickly as possible. Clients are not charged for delays caused by a mechanical issue and will be refunded for any additional expenses directly caused by the breakdown.',
      },
      {
        q: 'Do you allow pets?',
        a: 'Small pets in a carrier are permitted on request. Please inform us at booking. Guide dogs are always welcome without restriction.',
      },
    ],
  },
  {
    title: 'Venice & Water Taxi',
    icon: '◉',
    questions: [
      {
        q: 'Can you organise a water taxi in Venice?',
        a: 'Yes. We coordinate private water taxi transfers between Venice Marco Polo Airport, the Grand Canal, Giudecca, the Lido and other lagoon destinations. The estimated fare for a private motoscafo is €100–140 per trip, depending on destination and time of day.',
      },
      {
        q: 'Can I combine a road transfer and a water taxi?',
        a: 'Absolutely. A common booking is: arrive at Marco Polo → road transfer to Piazzale Roma → private water taxi to your hotel on the Grand Canal. We coordinate both legs and handle your luggage throughout.',
      },
      {
        q: 'How much luggage can I bring on the water taxi?',
        a: 'Standard private water taxis can accommodate 4–6 standard suitcases in addition to hand luggage. For larger groups with more luggage, we arrange a separate luggage boat.',
      },
      {
        q: 'How far in advance should I book the water taxi?',
        a: 'We recommend booking at least 48 hours in advance, especially during Carnevale, summer peak season and holiday periods. Last-minute bookings are sometimes possible but cannot be guaranteed.',
      },
    ],
  },
]

function AccordionItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string
  a: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-[rgba(194,154,69,0.08)] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span
          className={`text-[15px] leading-snug transition-colors ${
            isOpen ? 'text-cream' : 'text-[rgba(200,192,181,0.75)] group-hover:text-cream'
          }`}
        >
          {q}
        </span>
        <span
          className={`flex-shrink-0 text-gold text-[20px] leading-none mt-0.5 transition-transform duration-300 ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-350 ease-out"
        style={{
          maxHeight: isOpen ? '500px' : '0',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.35s ease, opacity 0.3s ease',
        }}
      >
        <p className="pb-5 text-[14px] text-[rgba(200,192,181,0.55)] leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function FAQ({ navigate }: FAQProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="pt-[88px] lg:pt-[96px]">
      {/* Page header */}
      <div className="py-24 px-6 lg:px-16 bg-[var(--background-secondary)] border-b border-[rgba(194,154,69,0.1)]">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">Help Centre</p>
          <h1
            className="font-display text-[46px] font-normal leading-[0.96] text-cream sm:text-[62px]"
          >
            Frequently Asked
            <br />
            <em>Questions</em>
          </h1>
          <p className="mt-5 text-[15px] text-[rgba(200,192,181,0.5)] max-w-[480px]">
            Can't find your answer? Contact us directly and we'll respond within the hour.
          </p>
          <button
            onClick={() => navigate('contact')}
            className="mt-6 flex items-center gap-2 text-gold text-[13px] tracking-[0.1em] uppercase hover:gap-3 transition-all duration-200"
          >
            Contact us <span>→</span>
          </button>
        </div>
      </div>

      {/* FAQ categories */}
      <section className="py-24 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          {/* Category nav (desktop) */}
          <nav className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              {categories.map((cat) => (
                <a
                  key={cat.title}
                  href={`#${cat.title.replace(/\s+/g, '-')}`}
                  className="flex items-center gap-2 py-2.5 text-[13px] text-[rgba(200,192,181,0.5)] hover:text-cream transition-colors group"
                >
                  <span className="text-[14px] text-gold">{cat.icon}</span>
                  {cat.title}
                </a>
              ))}
            </div>
          </nav>

          {/* Questions */}
          <div className="space-y-16">
            {categories.map((cat) => (
              <div
                key={cat.title}
                id={cat.title.replace(/\s+/g, '-')}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-[18px] text-gold">{cat.icon}</span>
                  <h2
                    className="font-display text-[26px] font-normal leading-[1.08] text-cream"
                  >
                    {cat.title}
                  </h2>
                </div>
                <div className="border-t border-[rgba(194,154,69,0.1)]">
                  {cat.questions.map((item, i) => (
                    <AccordionItem
                      key={i}
                      q={item.q}
                      a={item.a}
                      isOpen={!!openItems[`${cat.title}-${i}`]}
                      onToggle={() => toggle(`${cat.title}-${i}`)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-24 px-6 lg:px-16 bg-[var(--background-secondary)]">
        <div className="max-w-[600px] mx-auto text-center">
          <h2
            className="mb-4 font-display text-[32px] font-normal leading-[1] text-cream sm:text-[38px]"
          >
            Still have questions?
          </h2>
          <p className="text-[14px] text-[rgba(200,192,181,0.55)] mb-8">
            We answer every message personally. WhatsApp is the fastest way to reach us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/393901234567"
              className="px-8 py-4 bg-gold text-[var(--background)] text-[13px] tracking-[0.12em] uppercase font-semibold hover:bg-gold-light transition-colors text-center"
            >
              WhatsApp Us
            </a>
            <button
              onClick={() => navigate('contact')}
              className="px-8 py-4 border border-[rgba(194,154,69,0.4)] text-[rgba(200,192,181,0.7)] text-[13px] tracking-[0.12em] uppercase hover:border-gold hover:text-cream transition-all"
            >
              Send a Message
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
