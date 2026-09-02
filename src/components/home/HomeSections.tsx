import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  CalendarBlank,
  CarProfile,
  CaretDown,
  EnvelopeSimple,
  MapPin,
  ShieldCheck,
  Star,
} from '@phosphor-icons/react'
import type { BookingPrefill } from '../BookingForm'
import type { Page } from '../../types/navigation'
import { popularTransferRoutes } from '../../data/transferRoutes'
import VeniceArrivalFeature from '../VeniceArrivalFeature'
import HomeClosingSections from './HomeClosingSections'
import PrivateJourneys from './PrivateJourneys'

interface HomeSectionsProps {
  navigate: (page: Page) => void
  onBookRoute: (route: Omit<BookingPrefill, 'requestId'>) => void
  onPlanJourney: () => void
}

const services = [
  {
    title: 'Airport & City Transfers',
    description: 'Private transfers to and from Marco Polo Airport (VCE), Treviso Airport (TSF), hotels and cruise terminals.',
    page: 'services' as const,
  },
  {
    title: 'Chauffeur by the Hour',
    description: 'Keep your driver for meetings, shopping or a museum visit, with waiting and onward travel agreed in advance.',
    page: 'services' as const,
  },
  {
    title: 'Italy & Europe Transfers',
    description: 'Travel between cities or from Italy to France, Croatia and beyond. Your route, stops and timing, planned together.',
    page: 'tours' as const,
  },
  {
    title: 'Mountains & Seaside',
    description: 'Reach the Dolomites, the Adriatic coast or your chosen trailhead. Private transport, with return pick-up on request.',
    page: 'tours' as const,
  },
]

const initialRouteCount = 3

const vehicleBenefits = [
  {
    title: 'Prepared in advance',
    description: 'Details reviewed before confirmation.',
  },
  {
    title: 'Comfort on board',
    description: 'Climate control, water and charging.',
  },
  {
    title: 'Assistance at every step',
    description: 'Help with luggage at pick-up and arrival.',
  },
]

const bookingSteps = [
  {
    number: '01',
    title: 'Plan your journey',
    description: 'Share your route, preferred date and time, and any passenger details.',
    icon: MapPin,
  },
  {
    number: '02',
    title: 'Send your request',
    description: 'We receive your request and confirm all the details you have provided.',
    icon: EnvelopeSimple,
  },
  {
    number: '03',
    title: 'We check availability',
    description: 'We review availability and propose the best option for your journey.',
    icon: CalendarBlank,
  },
  {
    number: '04',
    title: 'Confirm your booking',
    description: 'We confirm your booking and your chauffeur will be ready as planned.',
    icon: CarProfile,
  },
]

// Demonstration copy for the visual preview. Replace these entries with verified
// client reviews before publishing the section on the production website.
const sampleTestimonials = [
  {
    quote:
      'From the airport arrival to our final hotel transfer, every detail felt calm, discreet and perfectly timed.',
    client: 'Sofia M.',
    journey: 'Venice Airport to Lake Como',
  },
  {
    quote:
      'Our driver made a long travel day feel effortless. The vehicle was immaculate and the entire journey was beautifully organised.',
    client: 'Daniel R.',
    journey: 'Private transfer across Northern Italy',
  },
  {
    quote:
      'A thoughtful, unhurried day in the Prosecco Hills, planned around exactly what we wanted to see.',
    client: 'Elena & Marco',
    journey: 'Private Prosecco Hills day trip',
  },
]

const formatPrice = (price: number) => `€${new Intl.NumberFormat('en-GB').format(price)}`

export default function HomeSections({ navigate, onBookRoute, onPlanJourney }: HomeSectionsProps) {
  const flowRef = useRef<HTMLDivElement>(null)
  const [visibleRouteCount, setVisibleRouteCount] = useState(initialRouteCount)
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null)
  const [journeyDraft, setJourneyDraft] = useState({ pickup: '', destination: '' })
  const allPopularRoutesVisible = visibleRouteCount >= popularTransferRoutes.length

  const handleRoutesButton = () => {
    if (allPopularRoutesVisible) {
      navigate('services')
      return
    }

    setVisibleRouteCount(popularTransferRoutes.length)
  }

  const selectService = (index: number, page: Page) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate(page)
      return
    }

    setSelectedServiceIndex(index)
    window.setTimeout(() => navigate(page), 180)
  }

  useEffect(() => {
    const flow = flowRef.current
    if (!flow) return

    const sections = Array.from(flow.querySelectorAll<HTMLElement>('.home-flow-section'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'))
      return
    }

    flow.classList.add('home-motion-ready')
    sections[0]?.classList.add('is-visible')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -4% 0px',
      },
    )

    sections.slice(1).forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={flowRef} className="home-sections-flow">
      <section
        id="ways-to-travel"
        data-home-services
        className="home-flow-section bg-[var(--background-secondary)] px-6 pb-8 pt-16 sm:px-8 sm:pb-10 lg:px-10 lg:pb-12 lg:pt-20"
      >
        <div className="mx-auto max-w-[1340px]">
          <div className="grid gap-9 lg:grid-cols-[0.72fr_1.55fr] lg:items-start lg:gap-14">
            <div className="max-w-[340px]">
              <h2 className="font-display text-[42px] font-normal leading-[0.96] text-cream sm:text-[50px]">
                Our{' '}
                <br aria-hidden="true" />
                services
              </h2>
              <p className="mt-5 text-[14px] leading-[1.75] text-[var(--text-muted)]">
                An airport arrival, a day with several stops or a longer journey: choose the private transport that fits your plans.
              </p>
              <button
                type="button"
                onClick={() => navigate('services')}
                className="group mt-6 flex items-center gap-2 text-[12px] font-medium text-[var(--text-secondary)] transition-colors hover:text-gold-light"
              >
                Explore transfer services
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>

            <figure className="min-w-0">
              <div className="h-[190px] overflow-hidden bg-[var(--surface)] sm:h-[230px] lg:h-[250px]">
                <img
                  src="/images/home/northern-italy-lakeside-road-pexels-19115672.jpg"
                  alt="A quiet lakeside road framed by Italian architecture and mountains"
                  className="home-documentary-photo h-full w-full object-cover"
                  style={{ objectPosition: 'center 62%' }}
                />
              </div>
              <figcaption className="mt-2 flex items-center justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-metadata)]">
                <span>Venice and Northern Italy</span>
                <span className="text-right">Private chauffeur service</span>
              </figcaption>
            </figure>
          </div>

          <div className="mt-9 grid border-t border-[rgba(36,41,44,0.84)] sm:mt-11 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <button
                key={service.title}
                type="button"
                onClick={() => selectService(index, service.page)}
                aria-pressed={selectedServiceIndex === index}
                className={`group flex min-h-[204px] flex-col border-b border-[rgba(36,41,44,0.72)] py-7 text-left transition-[background-color,box-shadow,transform] duration-200 hover:bg-[rgba(13,14,15,0.38)] active:scale-[0.995] sm:min-h-[224px] sm:border-b-0 sm:px-7 xl:min-h-[238px] xl:border-t-0 xl:px-7 ${
                  selectedServiceIndex === index
                    ? 'bg-[rgba(5,6,7,0.58)] shadow-[inset_0_0_0_1px_rgba(194,154,69,0.34)]'
                    : ''
                } ${
                  index > 1 ? 'sm:border-t sm:border-[rgba(36,41,44,0.72)]' : ''
                } ${
                  index % 2 === 0 ? 'sm:pl-0' : 'sm:border-l'
                } ${
                  index === 0 ? 'xl:pl-0' : 'xl:border-l'
                }`}
              >
                <span className="max-w-[270px] font-display text-[27px] leading-[1.02] text-cream xl:text-[28px]">
                  {service.title}
                </span>
                <span className="mt-4 max-w-[290px] text-[14px] leading-[1.68] text-[var(--text-muted)]">
                  {service.description}
                </span>
                <ArrowRight
                  size={14}
                  className="mt-auto text-[rgba(200,192,181,0.56)] transition-transform group-hover:translate-x-1 group-hover:text-gold-light"
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col">
      <section
        data-home-vehicle
        aria-labelledby="home-vehicle-title"
        className="home-flow-section order-2 h2-fleet"
      >
        <div className="hidden vehicle-editorial w-full gap-3 lg:h-[clamp(600px,70svh,680px)] lg:grid-cols-[34%_1fr] lg:px-8 xl:px-10">
          <figure className="min-h-[420px] overflow-hidden bg-[var(--background-secondary)] sm:min-h-[500px] lg:min-h-0">
            <img
              src="/images/vehicle-authentic/vehicle-venice-editorial.png"
              alt="Black private transfer vehicle waiting on an Italian city street"
              loading="lazy"
              decoding="async"
              className="vehicle-editorial-photo vehicle-editorial-exterior h-full w-full object-cover"
            />
          </figure>

          <div className="grid min-h-0 gap-3 lg:grid-rows-[34%_40%_1fr]">
            <div className="flex items-center bg-[var(--background)] px-7 py-11 sm:px-12 lg:px-14 lg:py-7 xl:px-16">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                  Private vehicle
                </p>
                <h2
                  id="home-vehicle-title"
                  className="mt-5 font-display text-[43px] font-normal leading-[0.96] text-cream sm:text-[53px] lg:text-[clamp(44px,3.7vw,58px)]"
                >
                  More than the vehicle.
                </h2>
                <p className="mt-6 max-w-[610px] text-[14px] leading-[1.75] text-[var(--text-secondary)] sm:text-[15px] lg:mt-5">
                  A private journey shaped around your timing, your luggage and the people travelling with you.
                </p>
              </div>
            </div>

            <div className="grid min-h-0 gap-3 sm:grid-cols-2">
              <figure className="min-h-[270px] overflow-hidden bg-[var(--background-secondary)] sm:min-h-[300px] lg:min-h-0">
                <img
                  src="/images/vehicle-authentic/vehicle-cabin-editorial.png"
                  alt="The real passenger cabin of the private transfer vehicle"
                  loading="lazy"
                  decoding="async"
                  className="vehicle-editorial-photo vehicle-editorial-interior h-full w-full object-cover"
                />
              </figure>
              <figure className="min-h-[270px] overflow-hidden bg-[var(--background-secondary)] sm:min-h-[300px] lg:min-h-0">
                <img
                  src="/images/vehicle-authentic/vehicle-luggage-editorial.png"
                  alt="Professional chauffeur placing a suitcase into a vehicle"
                  loading="lazy"
                  decoding="async"
                  className="vehicle-editorial-photo vehicle-editorial-luggage h-full w-full object-cover"
                />
              </figure>
            </div>

            <ul className="grid gap-8 bg-[var(--background)] px-7 py-9 sm:grid-cols-3 sm:gap-6 sm:px-9 lg:min-h-0 lg:items-center lg:px-10 lg:py-5 xl:px-14">
              {vehicleBenefits.map((item) => (
                <li key={item.title} className="min-w-0 border-t border-[rgba(36,41,44,0.9)] pt-5">
                  <h3 className="font-display text-[22px] font-normal leading-[1.08] text-cream lg:text-[clamp(18px,1.4vw,21px)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[235px] text-[14px] leading-[1.65] text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h2-fleet-editorial">
          <img className="h2-fleet-exterior" src="/images/vehicle-authentic/vehicle-venice-editorial.png" alt="Black private transfer van beside the Venice waterfront" />
          <div className="h2-fleet-content">
            <div className="h2-fleet-heading">
              <p className="h2-kicker">Private vehicle</p>
              <h2>More than the vehicle.</h2>
              <p>Travelling as a couple, a family or a group? Tell us about passengers and luggage so we can confirm a suitable vehicle for your journey.</p>
            </div>
            <div className="h2-fleet-gallery">
              <img src="/images/vehicle-authentic/vehicle-cabin-editorial.png" alt="Passenger seating inside the private transfer van" />
              <img src="/images/vehicle-authentic/vehicle-luggage-editorial.png" alt="Chauffeur assisting with luggage" />
            </div>
            <div className="h2-fleet-benefits">
              <article><h3>Prepared for you</h3><p>Passenger and luggage details checked before confirmation.</p></article>
              <article><h3>Comfort on board</h3><p>Climate control, water and charging.</p></article>
              <article><h3>A helping hand</h3><p>Your driver assists with luggage at pick-up and arrival.</p></article>
            </div>
          </div>
        </div>
      </section>

      <section
        data-home-routes
        className="home-flow-section order-1 bg-[var(--background)] px-6 pb-16 pt-12 sm:px-8 lg:px-10 lg:pb-20 lg:pt-12"
      >
        <div className="mx-auto max-w-[1340px]">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-[44px] font-normal leading-[0.98] text-cream sm:text-[54px]">
                Popular Routes &amp; Prices
              </h2>
              <p className="mt-4 max-w-[650px] text-[14px] leading-[1.7] text-[var(--text-muted)]">
                Compare indicative one-way prices for popular transfers from Venice. We confirm your route, vehicle, availability and final price before you book.
              </p>
            </div>
            <button
              type="button"
              onClick={onPlanJourney}
              className="group flex min-h-[48px] w-fit shrink-0 items-center gap-3 border border-[rgba(194,154,69,0.55)] px-5 text-[12px] font-semibold uppercase tracking-[0.1em] text-gold-light transition-colors hover:bg-gold hover:text-[var(--background)]"
            >
              Request a different route
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-11 hidden grid-cols-[minmax(0,2fr)_0.54fr_0.54fr_0.68fr_176px] items-end border-b border-[rgba(36,41,44,0.9)] pb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-metadata)] lg:grid">
            <span>Route</span>
            <span className="text-center">Sedan</span>
            <span className="text-center">Van</span>
            <span className="text-center">Minibus 12</span>
            <span className="text-right">Action</span>
          </div>

          <div id="additional-popular-routes" className="mt-7 lg:mt-0">
            {popularTransferRoutes.slice(0, visibleRouteCount).map((route) => (
              <article
                key={route.id}
                className="grid gap-5 border-b border-[rgba(36,41,44,0.82)] py-7 lg:grid-cols-[minmax(0,2fr)_0.54fr_0.54fr_0.68fr_176px] lg:items-center lg:gap-0"
              >
                <div className="flex min-w-0 items-stretch gap-5">
                  <span className="w-0.5 shrink-0 bg-[var(--gold)]" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-[24px] leading-[1.1] text-cream sm:text-[27px]">
                      {route.from} → {route.to}
                    </h3>
                    <p className="mt-2 text-[14px] text-[var(--text-muted)]">Point-to-point private transfer</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-[rgba(36,41,44,0.9)] lg:contents">
                  {[
                    ['Sedan', route.sedan],
                    ['Van', route.van],
                    ['Minibus 12', route.minibus],
                  ].map(([label, price]) => (
                    <div key={label} className="text-center lg:border-l lg:border-[rgba(36,41,44,0.9)] lg:px-3">
                      <span className="block text-[11px] uppercase tracking-[0.1em] text-[var(--text-metadata)] lg:hidden">
                        {label}
                      </span>
                      <span className="mt-1 block text-[18px] tabular-nums text-[var(--text-secondary)] lg:mt-0 lg:text-[20px]">
                        {formatPrice(price as number)}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onBookRoute({
                      pickup: route.pickup,
                      destination: route.destination,
                      airportMode: route.airportMode,
                    })
                  }
                  className="min-h-[44px] whitespace-nowrap border border-[rgba(194,154,69,0.5)] px-4 !text-[11px] !font-semibold !leading-none uppercase tracking-[0.09em] text-gold-light transition-colors hover:bg-gold hover:text-[var(--background)]"
                  aria-label={`Request transfer from ${route.from} to ${route.to}`}
                >
                  Request this route
                </button>
              </article>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-center gap-5">
            <span className="h-px flex-1 bg-[rgba(36,41,44,0.82)]" aria-hidden="true" />
            <button
              type="button"
              onClick={handleRoutesButton}
              aria-expanded={visibleRouteCount > initialRouteCount}
              aria-controls="additional-popular-routes"
              className="group flex items-center gap-3 px-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--gold)] transition-colors hover:text-gold-light"
            >
              {allPopularRoutesVisible ? 'View all routes & prices' : 'Show more routes'}
              {allPopularRoutesVisible ? (
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              ) : (
                <CaretDown size={15} className="transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              )}
            </button>
            <span className="h-px flex-1 bg-[rgba(36,41,44,0.82)]" aria-hidden="true" />
          </div>
        </div>
      </section>
      </div>

      <VeniceArrivalFeature onPlanJourney={onPlanJourney} />

      <PrivateJourneys onBookRoute={onBookRoute} />

      <section
        data-home-booking-steps
        className="hidden home-flow-section bg-[var(--background)] px-6 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-[1280px] py-16 sm:py-20 lg:py-24">
          <header className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              The Easy Lux experience
            </p>
            <h2 className="mt-4 font-display text-[42px] font-normal leading-[0.98] text-cream sm:text-[52px]">
              How booking works
            </h2>
            <p className="mx-auto mt-5 max-w-[590px] text-[14px] leading-[1.7] text-[var(--text-secondary)]">
              A seamless, discreet process designed around your time and your journey.
            </p>
          </header>

          <ol className="home-booking-timeline mt-12 grid gap-10 sm:mt-14 md:grid-cols-4 md:gap-0">
            {bookingSteps.map((step) => {
              const StepIcon = step.icon

              return (
                <li key={step.number} className="relative px-3 text-center sm:px-5">
                  <div className="home-booking-node mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--background)] text-[var(--gold)]">
                    <StepIcon size={24} weight="light" aria-hidden="true" />
                  </div>
                  <span className="mt-8 block font-display text-[32px] leading-none text-gold-light">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-display text-[21px] font-normal leading-[1.12] text-cream sm:text-[22px]">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-4 max-w-[230px] text-[13px] leading-[1.72] text-[var(--text-muted)]">
                    {step.description}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section
        data-home-testimonials
        aria-labelledby="home-testimonials-title"
        className="hidden home-flow-section bg-[var(--background)] px-6 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-[1280px] py-16 sm:py-20 lg:py-24">
          <header className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              Journeys shared with us
            </p>
            <h2 id="home-testimonials-title" className="mt-4 font-display text-[42px] font-normal leading-[0.98] text-cream sm:text-[52px]">
              What our clients say
            </h2>
            <p className="mt-5 text-[14px] leading-[1.7] text-[var(--text-secondary)]">
              Discreet, reliable and always on time.
            </p>
          </header>

          <div className="mt-12 grid gap-0 md:grid-cols-3 md:divide-x md:divide-[rgba(36,41,44,0.9)]">
            {sampleTestimonials.map((testimonial) => (
              <figure
                key={`${testimonial.client}-${testimonial.journey}`}
                className="flex min-h-[290px] flex-col border-b border-[rgba(36,41,44,0.9)] px-1 py-8 last:border-b-0 sm:px-7 md:border-b-0 md:px-8 lg:px-10"
              >
                <div className="flex gap-1 text-[var(--gold)]" aria-label="Five star sample rating">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} weight="fill" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-8 text-[14px] leading-[1.9] text-[var(--text-secondary)]">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-auto pt-8">
                  <span className="block h-px w-12 bg-[var(--gold)]" aria-hidden="true" />
                  <span className="mt-6 block text-[12px] font-semibold uppercase tracking-[0.08em] text-gold-light">
                    {testimonial.client}
                  </span>
                  <span className="mt-3 block text-[12px] leading-[1.55] text-[var(--text-muted)]">
                    {testimonial.journey}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section
        data-home-final-cta
        className="hidden home-flow-section bg-[var(--background)] px-6 sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-[1280px] gap-12 py-16 sm:py-20 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16 lg:gap-24 lg:py-24">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
              Your journey, our priority
            </p>
            <h2 className="mt-5 max-w-[430px] font-display text-[42px] font-normal leading-[1.04] text-cream sm:text-[52px]">
              Tell us where<br className="hidden sm:block" /> you need to go
            </h2>
            <span className="mt-8 block h-px w-12 bg-[var(--gold)]" aria-hidden="true" />
            <p className="mt-7 max-w-[390px] text-[14px] leading-[1.85] text-[var(--text-secondary)]">
              Share your trip details and we’ll prepare a tailored chauffeur service for you. Italian excellence, from door to door.
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={(event) => {
              event.preventDefault()
              onBookRoute({
                pickup: journeyDraft.pickup.trim(),
                destination: journeyDraft.destination.trim(),
              })
            }}
          >
            <label className="block">
              <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                Pick-up location
              </span>
              <span className="flex min-h-[58px] items-center gap-4 border border-[rgba(36,41,44,0.96)] px-5 transition-colors focus-within:border-[var(--gold)]">
                <MapPin size={20} weight="light" className="shrink-0 text-cream" aria-hidden="true" />
                <input
                  required
                  value={journeyDraft.pickup}
                  onChange={(event) => setJourneyDraft((current) => ({ ...current, pickup: event.target.value }))}
                  placeholder="Enter pick-up location"
                  className="min-w-0 flex-1 bg-transparent text-[14px] text-cream outline-none placeholder:text-[var(--text-metadata)]"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                Destination
              </span>
              <span className="flex min-h-[58px] items-center gap-4 border border-[rgba(36,41,44,0.96)] px-5 transition-colors focus-within:border-[var(--gold)]">
                <MapPin size={20} weight="light" className="shrink-0 text-cream" aria-hidden="true" />
                <input
                  required
                  value={journeyDraft.destination}
                  onChange={(event) => setJourneyDraft((current) => ({ ...current, destination: event.target.value }))}
                  placeholder="Enter destination"
                  className="min-w-0 flex-1 bg-transparent text-[14px] text-cream outline-none placeholder:text-[var(--text-metadata)]"
                />
              </span>
            </label>

            <button
              type="submit"
              className="group flex min-h-[60px] w-full items-center justify-between bg-gold px-7 text-[12px] font-semibold uppercase tracking-[0.09em] text-[var(--background)] transition-colors hover:bg-gold-light"
            >
              Start your request
              <ArrowRight size={17} weight="bold" className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>

            <p className="flex items-center gap-3 text-[13px] text-[var(--text-secondary)]">
              <ShieldCheck size={19} weight="light" className="shrink-0 text-cream" aria-hidden="true" />
              Discreet. Reliable. Always on time.
            </p>
          </form>
        </div>
      </section>
      <HomeClosingSections onPlanJourney={onPlanJourney} />
    </div>
  )
}
