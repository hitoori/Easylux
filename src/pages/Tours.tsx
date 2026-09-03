import { useState } from 'react'
import { ArrowRight, CheckCircle } from '@phosphor-icons/react'
import type { Page } from '../types/navigation'

interface ToursProps {
  navigate: (page: Page) => void
}

const experiences = [
  {
    title: 'Prosecco Hills',
    description: 'A private day from Venice through Conegliano and Valdobbiadene, planned around your requested stops and timing.',
    route: 'Venice — Conegliano — Valdobbiadene — Venice',
    image: './images/tours/prosecco-valley.jpg',
    alt: 'Vineyards across the Prosecco Hills near Valdobbiadene',
    position: 'center',
  },
  {
    title: 'Dolomites & Cortina',
    description: 'A private journey from Venice towards Cortina and the Dolomites, with the route and stops reviewed before confirmation.',
    route: 'Venice — Cortina d’Ampezzo — Venice',
    image: './images/shared/destinations/dolomites-peaks.jpg',
    alt: 'Mountain landscape across the Dolomites',
    position: 'center 58%',
  },
]

const planningSteps = [
  { title: 'Choose the destination', description: 'Tell us which area you would like to explore.' },
  { title: 'Share date and passengers', description: 'Add your preferred date, group size and requests.' },
  { title: 'Receive company confirmation', description: 'We review the route, availability and final price.' },
]

const createRequestCode = () => {
  const date = new Date()
  const stamp = `${String(date.getFullYear()).slice(-2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
  return `ELX-TOUR-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

export default function Tours({ navigate }: ToursProps) {
  const [destination, setDestination] = useState('')
  const [pickup, setPickup] = useState('Venice')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState('2')
  const [contact, setContact] = useState('')
  const [requests, setRequests] = useState('')
  const [requestCode, setRequestCode] = useState('')

  const scrollToForm = () => {
    document.getElementById('tour-request')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const planExperience = (experience: (typeof experiences)[number]) => {
    setDestination(experience.title)
    setRequests(`Preferred route: ${experience.route}`)
    setRequestCode('')
    window.setTimeout(scrollToForm, 0)
  }

  return (
    <div className="overflow-hidden bg-[var(--background)]">
      <section className="relative flex min-h-[690px] items-end overflow-hidden border-b border-[rgba(36,41,44,0.78)] px-6 pb-20 pt-[170px] sm:px-8 lg:px-10 lg:pb-24">
        <img
          src="./images/tours/chauffeur-door.jpg"
          alt="Chauffeur preparing a private car for a passenger"
          className="home-documentary-photo absolute inset-0 h-full w-full object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,14,15,0.98)_0%,rgba(13,14,15,0.9)_29%,rgba(13,14,15,0.44)_54%,rgba(13,14,15,0.08)_78%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,14,15,0.1)_0%,rgba(13,14,15,0.08)_56%,rgba(13,14,15,0.66)_100%)]" />
        <div className="relative z-10 mx-auto w-full max-w-[1320px]">
          <h1 className="max-w-[620px] font-display text-[48px] font-normal leading-[0.95] text-cream sm:text-[62px] lg:text-[72px]">
            Private days<br />{' '}from Venice
          </h1>
          <span className="my-6 block h-px w-16 bg-[var(--gold)]" aria-hidden="true" />
          <p className="max-w-[480px] text-[15px] leading-[1.75] text-[rgba(236,230,219,0.86)] sm:text-[16px]">
            Tell us where you would like to go. We plan the route, timing and requested stops around your group.
          </p>
          <button
            type="button"
            onClick={scrollToForm}
            className="group mt-8 flex min-h-[48px] items-center gap-4 border border-[rgba(194,154,69,0.56)] px-6 text-[11px] font-semibold uppercase tracking-[0.09em] text-gold-light transition-colors hover:bg-gold hover:text-[var(--background)]"
          >
            Plan a private day
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="border-b border-[rgba(36,41,44,0.78)] bg-[var(--background)]">
        <div className="mx-auto max-w-[1320px]">
          {experiences.map((experience, index) => (
            <article
              key={experience.title}
              className="grid border-b border-[rgba(36,41,44,0.82)] last:border-b-0 lg:grid-cols-2"
            >
              <img
                src={experience.image}
                alt={experience.alt}
                loading="lazy"
                decoding="async"
                className={`home-documentary-photo h-[330px] w-full object-cover sm:h-[460px] lg:min-h-[560px] ${index === 1 ? 'lg:order-2' : ''}`}
                style={{ objectPosition: experience.position }}
              />
              <div className={`flex flex-col justify-center px-6 py-14 sm:px-10 lg:min-h-[560px] lg:px-14 ${index === 1 ? 'lg:order-1' : ''}`}>
                <span className="font-display text-[30px] text-[var(--gold)]">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="mt-7 font-display text-[46px] font-normal leading-[0.95] text-cream sm:text-[58px]">
                  {experience.title}
                </h2>
                <p className="mt-6 max-w-[500px] text-[14px] leading-[1.75] text-[var(--text-secondary)]">
                  {experience.description}
                </p>
                <p className="mt-7 border-y border-[rgba(36,41,44,0.82)] py-4 text-[12px] leading-[1.65] text-[var(--text-muted)]">
                  {experience.route}
                </p>
                <button
                  type="button"
                  onClick={() => planExperience(experience)}
                  className="group mt-8 flex min-h-[46px] w-fit items-center gap-4 border border-[rgba(194,154,69,0.52)] px-5 text-[11px] font-semibold uppercase tracking-[0.09em] text-gold-light transition-colors hover:bg-gold hover:text-[var(--background)]"
                >
                  Plan this day
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-[rgba(36,41,44,0.78)] bg-[var(--background-secondary)] px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
        <ol className="mx-auto grid max-w-[1320px] border-t border-[rgba(36,41,44,0.9)] md:grid-cols-3 md:border-t-0">
          {planningSteps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[44px_1fr] gap-4 border-b border-[rgba(36,41,44,0.86)] py-7 md:block md:border-b-0 md:border-l md:px-9 md:py-2 md:first:border-l-0">
              <span className="font-display text-[24px] text-[var(--gold)]">{String(index + 1).padStart(2, '0')}</span>
              <div className="md:mt-6">
                <h2 className="text-[14px] font-medium text-cream">{step.title}</h2>
                <p className="mt-2 max-w-[330px] text-[12px] leading-[1.65] text-[var(--text-muted)]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="tour-request" className="scroll-mt-[120px] bg-[var(--surface)] px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <div>
            <span className="block h-px w-16 bg-[var(--gold)]" aria-hidden="true" />
            <h2 className="mt-7 font-display text-[46px] font-normal leading-[0.96] text-cream sm:text-[58px]">Plan a private day</h2>
            <p className="mt-6 max-w-[390px] text-[14px] leading-[1.75] text-[var(--text-secondary)]">
              Share the destination and journey details. The Easy Lux team will review the itinerary, availability and final price.
            </p>
            <button
              type="button"
              onClick={() => navigate('services')}
              className="mt-8 text-[11px] font-semibold uppercase tracking-[0.09em] text-gold-light"
            >
              View transfer prices
            </button>
          </div>

          {requestCode ? (
            <div className="flex min-h-[390px] flex-col justify-center border-y border-[rgba(36,41,44,0.9)] py-10">
              <CheckCircle size={34} weight="light" className="text-[var(--success)]" aria-hidden="true" />
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Tour request received</p>
              <p className="mt-3 font-display text-[34px] text-cream sm:text-[38px]">{requestCode}</p>
              <p className="mt-5 max-w-[620px] text-[14px] leading-[1.75] text-[var(--text-secondary)]">
                This request becomes a confirmed booking only after the Easy Lux team approves the itinerary, availability and price.
              </p>
              <button type="button" onClick={() => setRequestCode('')} className="mt-8 w-fit text-[11px] font-semibold uppercase tracking-[0.09em] text-gold-light">
                Send another request
              </button>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setRequestCode(createRequestCode())
              }}
              className="border-y border-[rgba(36,41,44,0.92)]"
            >
              <div className="grid sm:grid-cols-2">
                <label className="border-b border-[rgba(36,41,44,0.82)] py-5 sm:border-r sm:px-5 sm:first:pl-0">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Destination</span>
                  <input type="text" value={destination} onChange={(event) => setDestination(event.target.value)} required placeholder="Prosecco Hills, Cortina or another place" className="mt-3 w-full bg-transparent text-[14px] text-cream outline-none placeholder:text-[var(--text-disabled)]" />
                </label>
                <label className="border-b border-[rgba(36,41,44,0.82)] py-5 sm:px-5 sm:last:pr-0">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Pick-up</span>
                  <input type="text" value={pickup} onChange={(event) => setPickup(event.target.value)} required placeholder="City, address or hotel" className="mt-3 w-full bg-transparent text-[14px] text-cream outline-none placeholder:text-[var(--text-disabled)]" />
                </label>
              </div>
              <div className="grid sm:grid-cols-3">
                <label className="border-b border-[rgba(36,41,44,0.82)] py-5 sm:border-r sm:px-5 sm:first:pl-0">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Date</span>
                  <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-3 w-full bg-transparent text-[14px] text-cream outline-none [color-scheme:dark]" />
                </label>
                <label className="border-b border-[rgba(36,41,44,0.82)] py-5 sm:border-r sm:px-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Guests</span>
                  <select value={guests} onChange={(event) => setGuests(event.target.value)} className="mt-3 w-full bg-transparent text-[14px] text-cream outline-none [color-scheme:dark]">
                    {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count}</option>)}
                  </select>
                </label>
                <label className="border-b border-[rgba(36,41,44,0.82)] py-5 sm:px-5 sm:last:pr-0">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Email or WhatsApp</span>
                  <input type="text" value={contact} onChange={(event) => setContact(event.target.value)} required placeholder="Email address or phone number" className="mt-3 w-full bg-transparent text-[14px] text-cream outline-none placeholder:text-[var(--text-disabled)]" />
                </label>
              </div>
              <label className="block border-b border-[rgba(36,41,44,0.82)] py-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Requests</span>
                <textarea value={requests} onChange={(event) => setRequests(event.target.value)} rows={4} placeholder="Preferred stops, timing, child seats or other requests" className="mt-3 w-full resize-y bg-transparent text-[14px] leading-[1.6] text-cream outline-none placeholder:text-[var(--text-disabled)]" />
              </label>
              <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center">
                <button type="submit" className="group flex min-h-[48px] items-center justify-center gap-4 bg-gold px-6 text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--background)] transition-colors hover:bg-gold-light">
                  Send tour request <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
                <p className="max-w-[430px] text-[11px] leading-[1.65] text-[var(--text-muted)]">
                  This is a request. The itinerary, availability and final price are confirmed by the Easy Lux team.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
