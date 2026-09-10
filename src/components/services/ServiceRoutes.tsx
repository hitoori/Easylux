import { useEffect, useId, useRef, useState, type ReactNode, type KeyboardEvent } from 'react'
import { ArrowRight, CaretDown } from '@phosphor-icons/react'
import type { TransferRoute } from '../../data/transferRoutes'
import { priceLabel, type JourneyRequest, type JourneyService } from './serviceData'

export type RequestJourney = (request: JourneyRequest) => void

export function ServiceTabs({ id, labels, selected, onChange, ariaLabel }: { id: string; labels: string[]; selected: number; onChange: (index: number) => void; ariaLabel?: string }) {
  const handleKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % labels.length
    else if (event.key === 'ArrowLeft') next = (index + labels.length - 1) % labels.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = labels.length - 1
    else return
    event.preventDefault()
    onChange(next)
    document.getElementById(`${id}-tab-${next}`)?.focus()
  }
  return <div className="sv-tabs" role="tablist" aria-label={ariaLabel ?? (id === 'water' ? 'Direction of your Water Taxi connection' : 'Route region')}>
    {labels.map((label, index) => <button key={label} type="button" role="tab" id={`${id}-tab-${index}`} aria-selected={selected === index} aria-controls={`${id}-panel-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => onChange(index)} onKeyDown={event => handleKey(event, index)}>{label}</button>)}
  </div>
}

export function RouteList({ routes, title, service, onRequest, initial = 4, moreLabel = 'View more routes', footer, editorial = false, compact = false, note }: {
  routes: TransferRoute[]; title: string; service: JourneyService; onRequest: RequestJourney; initial?: number; moreLabel?: string; footer?: ReactNode; editorial?: boolean; compact?: boolean; note?: string
}) {
  const [expanded, setExpanded] = useState(false)
  const tableId = useId()
  return <>
    <div id={tableId} className={`sv-table-wrap${compact ? ' sv-table-wrap-compact' : ''}`}>
      <table className="sv-route-table" aria-label={title}>
        <thead><tr><th scope="col">Route</th><th scope="col">Sedan</th><th scope="col">Van</th><th scope="col">Minibus</th><th scope="col"><span className={compact ? undefined : 'sv-sr-only'}>{compact ? 'Action' : 'Request'}</span></th></tr></thead>
        <tbody>{(expanded ? routes : routes.slice(0, initial)).map(route => <tr key={route.id} data-route-id={route.id}>
          <th scope="row"><span className={editorial ? 'sv-editorial-route' : undefined}><span className="sv-route-origin">{route.from} <ArrowRight size={17} aria-hidden="true" /></span> <span>{route.to}</span>{editorial && !compact && <span className="sv-editorial-description">Address-to-address private transfer</span>}</span></th>
          <td data-label="Sedan">{priceLabel(route.sedan)}</td><td data-label="Van">{priceLabel(route.van)}</td><td data-label="Minibus">{priceLabel(route.minibus)}</td>
          <td className="sv-route-action"><button type="button" aria-label={`Request this route: ${route.from} to ${route.to}`} onClick={() => onRequest({ service, pickup: route.pickup, destination: route.destination, airportPickup: route.airportMode === 'pickup' })}><span className={compact ? 'sv-compact-action' : editorial ? 'sv-editorial-action' : 'sv-mobile-label'}>Request this route</span><ArrowRight size={compact ? 19 : 23} aria-hidden="true" /></button></td>
        </tr>)}</tbody>
      </table>
    </div>
    <p className="sv-fine-print">{note ?? 'Indicative one-way fares from Venice. Your final quote confirms the route, vehicle, availability and any extras.'}</p>
    <div className="sv-route-footer">
      <div>{footer || <button type="button" className="sv-text-link" onClick={() => onRequest({ service })}>Request a different destination</button>}</div>
      {routes.length > initial ? <button type="button" className="sv-button" aria-expanded={expanded} aria-controls={tableId} onClick={() => setExpanded(!expanded)}>{expanded ? 'Show fewer routes' : moreLabel}<CaretDown size={20} className={expanded ? 'sv-rotate' : ''} aria-hidden="true" /></button> : footer && <button type="button" className="sv-button" onClick={() => onRequest({ service })}>Request a different route <ArrowRight size={23} aria-hidden="true" /></button>}
    </div>
  </>
}

export function RouteSection({ title, children, id, openRequest = 0 }: { title: string; children: ReactNode; id?: string; openRequest?: number }) {
  const [expanded, setExpanded] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const pendingReveal = useRef(false)
  useEffect(() => {
    if (!openRequest) return
    pendingReveal.current = true
    setExpanded(true)
  }, [openRequest])
  useEffect(() => {
    if (!expanded || !pendingReveal.current) return
    const frame = window.requestAnimationFrame(() => {
      pendingReveal.current = false
      triggerRef.current?.focus({ preventScroll: true })
      triggerRef.current?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [expanded, openRequest])
  const generatedId = useId()
  const panelId = `${id ?? generatedId}-panel`

  return <div id={id} className="sv-route-disclosure" data-expanded={expanded ? 'true' : 'false'}>
    <div className="svc-shell">
      <button
        type="button"
        ref={triggerRef}
        className="sv-route-disclosure-trigger"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded(current => !current)}
      >
        <span className="sv-route-disclosure-heading">
          <span>Routes &amp; fares</span>
          <strong>{title}</strong>
        </span>
        <span className="sv-route-disclosure-action">
          {expanded ? 'Hide routes' : 'Show routes'}
          <CaretDown size={20} className={expanded ? 'sv-rotate' : ''} aria-hidden="true" />
        </span>
      </button>

      <div id={panelId} hidden={!expanded} className="sv-route-disclosure-panel">
        {expanded && children}
      </div>
    </div>
  </div>
}
