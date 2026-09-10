import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  CaretDown,
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
    page: 'services' as const,
  },
  {
    title: 'Mountains & Seaside',
    description: 'Reach the Dolomites, the Adriatic coast or your chosen trailhead. Private transport, with return pick-up on request.',
    page: 'services' as const,
  },
]

const initialRouteCount = 5

const formatPrice = (price: number) => `€${new Intl.NumberFormat('en-GB').format(price)}`
const displayRoutePlace = (place: string) => place.replace(/ (TV|VE|PD|VR|BZ|BL)$/, '')

export default function HomeSections({ navigate, onBookRoute, onPlanJourney }: HomeSectionsProps) {
  const flowRef = useRef<HTMLDivElement>(null)
  const [visibleRouteCount, setVisibleRouteCount] = useState(initialRouteCount)
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null)
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
                  src="./images/home/services/northern-italy-road.jpg"
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

          <div className="home-service-grid mt-9 grid border-t border-[rgba(36,41,44,0.84)] sm:mt-11 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <button
                key={service.title}
                type="button"
                onClick={() => selectService(index, service.page)}
                className={`home-service-item group flex min-h-[204px] flex-col border-b border-[rgba(36,41,44,0.72)] py-7 text-left transition-[background-color,box-shadow,transform] duration-200 hover:bg-[rgba(13,14,15,0.38)] active:scale-[0.995] sm:min-h-[224px] sm:border-b-0 sm:px-7 xl:min-h-[238px] xl:border-t-0 xl:px-7 ${
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
                <span className="home-service-title max-w-[270px] font-display text-[27px] leading-[1.02] text-cream xl:text-[28px]">
                  {service.title}
                </span>
                <span className="home-service-description mt-4 max-w-[290px] text-[14px] leading-[1.68] text-[var(--text-muted)]">
                  {service.description}
                </span>
                <ArrowRight
                  size={14}
                  className="home-service-arrow mt-auto text-[rgba(200,192,181,0.56)] transition-transform group-hover:translate-x-1 group-hover:text-gold-light"
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
        <div className="h2-fleet-editorial">
          <img className="h2-fleet-exterior" src="./images/home/vehicle/exterior.png" alt="Black private transfer van beside the Venice waterfront" />
          <div className="h2-fleet-content">
            <div className="h2-fleet-heading">
              <p className="h2-kicker">Private vehicle</p>
              <h2 id="home-vehicle-title">More than the vehicle.</h2>
              <p>Travelling as a couple, a family or a group? Tell us about passengers and luggage so we can confirm a suitable vehicle for your journey.</p>
            </div>
            <div className="h2-fleet-gallery">
              <img src="./images/home/vehicle/cabin.png" alt="Passenger seating inside the private transfer van" />
              <img src="./images/home/vehicle/luggage.png" alt="Chauffeur assisting with luggage" />
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
                      {displayRoutePlace(route.from)} → {displayRoutePlace(route.to)}
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
                  aria-label={`Request transfer from ${displayRoutePlace(route.from)} to ${displayRoutePlace(route.to)}`}
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

      <HomeClosingSections onPlanJourney={onPlanJourney} />
    </div>
  )
}
