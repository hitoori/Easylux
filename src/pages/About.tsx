import type { Page } from '../types/navigation'

interface AboutProps {
  navigate: (page: Page) => void
}

const values = [
  {
    title: 'Professionalism',
    desc: 'Licensed, uniformed drivers with commercial chauffeur certification and comprehensive insurance. Every vehicle is inspected before each journey.',
    icon: '◈',
  },
  {
    title: 'Punctuality',
    desc: 'We track flights, ferries and traffic in real time. Your driver is always at the pickup point before you arrive — never the other way around.',
    icon: '◷',
  },
  {
    title: 'Comfort & Safety',
    desc: 'Premium vehicles maintained to manufacturer service schedules. Child seats, adapted routes and accessibility needs are accommodated on request.',
    icon: '◎',
  },
  {
    title: 'Personal Attention',
    desc: 'We handle every booking personally. There are no call centres, no automated systems. Catalina or Mihai responds directly to every enquiry.',
    icon: '◇',
  },
]

export default function About({ navigate }: AboutProps) {
  return (
    <div>
      {/* Page header */}
      <div
        className="relative px-6 pb-32 pt-[216px] lg:px-16 lg:pt-[224px] overflow-hidden"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1649792880509-3897bbe2ba83?w=1920&h=700&fit=crop&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(13,14,15,0.36)] via-[rgba(13,14,15,0.26)] to-[rgba(13,14,15,0.82)]" />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">Our Story</p>
          <h1
            className="max-w-[600px] font-display text-[46px] font-normal leading-[0.96] text-cream sm:text-[62px]"
          >
            Two people,
            <br />
            <em>one vision.</em>
          </h1>
        </div>
      </div>

      {/* Story */}
      <section className="py-24 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">The Beginning</p>
            <h2
              className="mb-6 font-display text-[32px] font-normal leading-[1] text-cream sm:text-[40px]"
            >
              Built on a decade of
              <br />
              <em>Italian roads.</em>
            </h2>
            <div className="space-y-5 text-[14px] text-[rgba(200,192,181,0.65)] leading-relaxed">
              <p>
                Easy Lux Transfer was founded by Catalina Gordila and Mihai Pisarenco, partners in
                life and in the belief that private travel in Italy should feel effortless. What
                began as airport transfers for friends grew, over years, into a full-service
                chauffeur company trusted by hotel concierges, wedding planners and repeat clients
                across Europe.
              </p>
              <p>
                Catalina brings meticulous attention to logistics and guest experience, ensuring
                that every itinerary is precise and every special request is remembered. Mihai, with
                over twelve years behind the wheel of luxury vehicles on Italian roads, offers the
                kind of local knowledge that no GPS can replicate.
              </p>
              <p>
                Based in the Veneto region, we know the back roads to Cortina, the best time to
                cross the lagoon, and which winery deserves an extra hour. Easy Lux Transfer is
                small by design — every booking matters to us personally.
              </p>
            </div>
          </div>

          {/* Founders */}
          <div className="space-y-px">
            <div className="grid grid-cols-2 gap-px bg-[rgba(194,154,69,0.1)]">
              <div
                className="h-[340px] bg-cover bg-center bg-[var(--surface)]"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1566984991763-91b985a3f9c2?w=400&h=500&fit=crop&auto=format&crop=faces)',
                }}
              >
                <div className="h-full bg-gradient-to-t from-[rgba(13,14,15,0.75)] to-transparent flex items-end p-5">
                  <div>
                    <p className="font-display text-[18px] text-cream">
                      Catalina Gordila
                    </p>
                    <p className="text-[11px] tracking-[0.15em] uppercase text-[rgba(194,154,69,0.7)]">
                      Co-founder · Operations
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="h-[340px] bg-cover bg-center bg-[var(--surface)]"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1584211022290-ee43ea4955ac?w=400&h=500&fit=crop&auto=format)',
                }}
              >
                <div className="h-full bg-gradient-to-t from-[rgba(13,14,15,0.75)] to-transparent flex items-end p-5">
                  <div>
                    <p className="font-display text-[18px] text-cream">
                      Mihai Pisarenco
                    </p>
                    <p className="text-[11px] tracking-[0.15em] uppercase text-[rgba(194,154,69,0.7)]">
                      Co-founder · Lead Driver
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--background-secondary)] p-7 border border-[rgba(194,154,69,0.12)] border-t-0">
              <p className="text-[13px] text-[rgba(200,192,181,0.5)] leading-relaxed italic">
                "We started Easy Lux because we believed every traveller deserved the kind of care
                you'd give a close friend. That hasn't changed as we've grown."
              </p>
              <p className="text-[12px] text-[rgba(194,154,69,0.6)] mt-3">
                — Catalina & Mihai
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 lg:px-16 bg-[var(--background-secondary)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">Our Values</p>
            <h2
              className="font-display text-[36px] font-normal leading-[1] text-cream sm:text-[44px]"
            >
              What guides every journey.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[rgba(194,154,69,0.1)]">
            {values.map((v) => (
              <div key={v.title} className="bg-[var(--background-secondary)] p-10">
                <span className="block text-[22px] text-gold mb-5">{v.icon}</span>
                <h3
                  className="mb-4 font-display text-[24px] font-normal leading-[1.08] text-cream"
                >
                  {v.title}
                </h3>
                <p className="text-[14px] text-[rgba(200,192,181,0.55)] leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-24 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(194,154,69,0.1)]">
          {[
            { num: '12+', label: 'Years on Italian roads' },
            { num: '4,800+', label: 'Transfers completed' },
            { num: '97%', label: 'On-time arrival rate' },
            { num: '5 ★', label: 'Average client rating' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[var(--background)] p-10 text-center">
              <p
                className="mb-2 font-display text-[44px] font-normal leading-none text-cream"
              >
                {stat.num}
              </p>
              <p className="text-[12px] tracking-wide text-[rgba(194,154,69,0.6)] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-16 bg-[var(--background-secondary)]">
        <div className="max-w-[600px] mx-auto text-center">
          <h2
            className="mb-5 font-display text-[34px] font-normal leading-[1] text-cream sm:text-[42px]"
          >
            Ready to travel with us?
          </h2>
          <p className="text-[14px] text-[rgba(200,192,181,0.55)] mb-8">
            Every booking is handled personally by Catalina or Mihai. Reach us any time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('contact')}
              className="px-8 py-4 bg-gold text-[var(--background)] text-[13px] tracking-[0.12em] uppercase font-semibold hover:bg-gold-light transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate('services')}
              className="px-8 py-4 border border-[rgba(194,154,69,0.4)] text-[rgba(200,192,181,0.7)] text-[13px] tracking-[0.12em] uppercase hover:border-gold hover:text-cream transition-all"
            >
              View Services
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
