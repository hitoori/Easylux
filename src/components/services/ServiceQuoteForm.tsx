import { useEffect, useRef, useState, type FormEvent, type InputHTMLAttributes } from 'react'
import { ArrowLeft, ArrowRight, Check, Plus } from '@phosphor-icons/react'
import { serviceOptions, type QuoteSelection } from './serviceData'
import { initialQuote, localDate, validateQuote, type QuoteDraft, type QuoteErrors } from './quoteModel'

export default function ServiceQuoteForm({ selection }: { selection: QuoteSelection | null }) {
  const [draft, setDraft] = useState<QuoteDraft>(initialQuote)
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<QuoteErrors>({})
  const [notesOpen, setNotesOpen] = useState(false)
  const [prepared, setPrepared] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const needsFocus = useRef(false)

  useEffect(() => {
    if (!selection) return
    setDraft(previous => ({ ...previous, service: selection.service, pickup: selection.pickup ?? '', destination: selection.destination ?? '', airportPickup: selection.airportPickup ?? false }))
    setStep(0); setErrors({}); setPrepared(false)
    headingRef.current?.focus({ preventScroll: true })
    const section = document.getElementById('service-custom')
    const anchor = section?.querySelector<HTMLElement>('.svc-eyebrow') ?? section
    if (anchor) {
      const top = anchor.getBoundingClientRect().top + window.scrollY - 112
      window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    }
  }, [selection])

  useEffect(() => {
    if (needsFocus.current) { headingRef.current?.focus({ preventScroll: true }); headingRef.current?.scrollIntoView({ block: 'center', behavior: 'auto' }); needsFocus.current = false }
  }, [step, prepared])

  const update = <K extends keyof QuoteDraft>(key: K, value: QuoteDraft[K]) => {
    setDraft(previous => ({ ...previous, [key]: value }))
    setErrors(previous => ({ ...previous, [key]: undefined }))
  }
  const goTo = (next: number) => { needsFocus.current = true; setErrors({}); setStep(next) }
  const input = (key: keyof QuoteDraft, label: string, options: InputHTMLAttributes<HTMLInputElement> = {}) => <label className="sv-field" htmlFor={`quote-${key}`}>
    <span id={`quote-label-${key}`}>{label}</span><input id={`quote-${key}`} name={key} value={String(draft[key])} onInput={event => update(key, event.currentTarget.value as never)} onChange={event => update(key, event.target.value as never)} aria-labelledby={`quote-label-${key}`} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `quote-error-${key}` : undefined} {...options} />
    {errors[key] && <small id={`quote-error-${key}`} className="sv-field-error">{errors[key]}</small>}
  </label>
  const submit = (event: FormEvent) => {
    event.preventDefault()
    // Re-check previous steps before preparing a request; hidden fields never bypass validation.
    for (let index = 0; index <= step; index++) {
      const nextErrors = validateQuote(draft, index)
      const first = Object.keys(nextErrors)[0]
      if (first) {
        setErrors(nextErrors); setStep(index)
        window.requestAnimationFrame(() => document.getElementById(`quote-${first}`)?.focus())
        return
      }
    }
    if (step < 2) goTo(step + 1)
    else { needsFocus.current = true; setPrepared(true) }
  }
  const review = <dl className="sv-review">
    <div><dt>Service</dt><dd>{serviceOptions.find(([value]) => value === draft.service)?.[1]}</dd></div>
    <div><dt>Journey</dt><dd>{draft.pickup} → {draft.destination}</dd></div>
    <div><dt>Pick-up</dt><dd>{draft.date} · {draft.time}</dd></div>
    <div><dt>Travellers</dt><dd>{draft.passengers} passengers · {draft.luggage} bags{draft.vehicle ? ` · ${draft.vehicle}` : ''}</dd></div>
    {draft.airportPickup && <div><dt>Flight</dt><dd>{draft.flight}</dd></div>}
    {draft.addReturn && <div><dt>Return</dt><dd>{draft.returnDate} · {draft.returnTime} — quoted separately</dd></div>}
    {draft.service === 'hourly' && <><div><dt>Duration</dt><dd>{draft.duration}</dd></div><div><dt>Schedule</dt><dd>{draft.stops}</dd></div></>}
    {draft.service === 'cruise' && <div><dt>Cruise</dt><dd>{draft.ship} · {draft.terminal} · {draft.shipTime}</dd></div>}
    {draft.notes && <div><dt>Requests</dt><dd>{draft.notes}</dd></div>}
    {draft.equipment && <div><dt>Equipment</dt><dd>{draft.equipment}</dd></div>}
  </dl>

  return <section id="service-custom" className="sv-section sv-quote-section" aria-labelledby="quote-intro-title"><div className="svc-shell sv-quote-layout">
    <div className="sv-copy sv-quote-copy"><p className="svc-eyebrow">Your private transfer</p><h2 id="quote-intro-title">A journey <br />shaped <br />around you.</h2><p className="sv-lead">Share the route, date and travellers. We’ll reply with availability, a suitable vehicle and your personalised price.</p><div className="sv-short-rule" /><p className="sv-muted">Your quote states the route, vehicle, waiting terms and any extras.<br />No payment or booking is made until you approve it.</p></div>
    <div className="sv-quote-panel">
      <h3 ref={headingRef} tabIndex={-1} className="sv-form-title">{prepared ? 'Your journey, ready to review.' : 'Request a personalised quote'}</h3>
      {prepared ? <div className="sv-prepared"><Check size={32} aria-hidden="true" /><p role="status">Preview complete — your request has not been sent.</p><p>This is a local preview. No email was sent and no booking was made. Delivery to the Easy Lux team still needs to be connected.</p>{review}<p>{draft.name} · {draft.email}{draft.phone ? ` · ${draft.phone}` : ''}</p><button type="button" className="sv-button" onClick={() => { setPrepared(false); needsFocus.current = true }}>Edit your request <ArrowLeft size={20} /></button></div> : <>
        <ol className="sv-form-steps" aria-label="Request progress">{['Journey', 'Passengers', 'Contact'].map((label, index) => <li key={label} aria-current={step === index ? 'step' : undefined}><button type="button" disabled={index > step} onClick={() => goTo(index)}><span>{String(index + 1).padStart(2, '0')}</span> {label}</button></li>)}</ol>
        <form className="sv-quote-form" onSubmit={submit} noValidate>
          {Object.values(errors).some(Boolean) && <p role="alert" className="sv-error-summary">Please check the highlighted details before continuing.</p>}
          {step === 0 && <fieldset><legend className="sv-sr-only">Journey details</legend>
            <label className="sv-field sv-service-field" htmlFor="quote-service"><span>Service</span><select id="quote-service" name="service" value={draft.service} onChange={event => { update('service', event.target.value as QuoteDraft['service']); setErrors({}) }}>{serviceOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <div className="sv-fields-grid">
              {input('pickup', 'Pick-up', { placeholder: 'Airport, hotel or address', required: true, autoComplete: 'off' })}
              {input('destination', 'Destination', { placeholder: 'Where would you like to go?', required: true, autoComplete: 'off' })}
              {input('date', 'Date', { type: 'date', required: true, min: localDate() })}
              {input('time', 'Time', { type: 'time', required: true })}
            </div>
            <div className="sv-checkboxes"><label><input type="checkbox" checked={draft.airportPickup} onChange={event => update('airportPickup', event.target.checked)} />Airport pick-up</label><label><input type="checkbox" checked={draft.addReturn} onChange={event => update('addReturn', event.target.checked)} />Add a return</label></div>
            {draft.airportPickup && <div className="sv-conditional">{input('flight', 'Flight number', { placeholder: 'e.g. BA598', required: true })}<p className="sv-fine-print">Your flight details help us coordinate the airport meeting.</p></div>}
            {draft.addReturn && <div className="sv-conditional"><div className="sv-fields-grid">{input('returnDate', 'Return date', { type: 'date', min: draft.date || localDate(), required: true })}{input('returnTime', 'Return time', { type: 'time', required: true })}</div><p className="sv-fine-print">A return or later collection is quoted separately. Add any waiting requirements below.</p></div>}
            {draft.service === 'hourly' && <div className="sv-conditional sv-fields-grid">{input('duration', 'Approximate duration', { placeholder: 'e.g. 4 hours', required: true })}{input('stops', 'Planned stops & waiting', { placeholder: 'Addresses and schedule', required: true })}</div>}
            {draft.service === 'cruise' && <div className="sv-conditional sv-fields-grid">{input('ship', 'Ship name', { placeholder: 'Your cruise ship', required: true })}{input('terminal', 'Cruise terminal', { placeholder: 'Port and terminal', required: true })}{input('shipTime', 'Boarding / disembarkation time', { type: 'time', required: true })}</div>}
            <button type="button" className="sv-notes-toggle" aria-expanded={notesOpen} aria-controls="quote-notes-panel" onClick={() => setNotesOpen(!notesOpen)}>Add stops or special requests <Plus size={23} className={notesOpen ? 'sv-plus-open' : ''} aria-hidden="true" /></button>
            <div id="quote-notes-panel" hidden={!notesOpen}><label className="sv-field" htmlFor="quote-notes"><span className="sv-sr-only">Stops or special requests</span><textarea id="quote-notes" rows={3} value={draft.notes} onChange={event => update('notes', event.target.value)} placeholder="Stops, waiting, accessibility or anything else we should know" /></label></div>
          </fieldset>}
          {step === 1 && <fieldset><legend className="sv-step-heading">Passengers, luggage & preferences</legend><div className="sv-fields-grid">
            {input('passengers', 'Passengers', { type: 'number', min: 1, max: 12, required: true, inputMode: 'numeric' })}
            {input('luggage', 'Bags & suitcases', { type: 'number', min: 0, required: true, inputMode: 'numeric' })}
            <label className="sv-field sv-span-two" htmlFor="quote-vehicle"><span>Vehicle preference · optional</span><select id="quote-vehicle" value={draft.vehicle} onChange={event => update('vehicle', event.target.value)}><option value="">Recommend a suitable vehicle</option><option>Sedan</option><option>Van</option><option>Minibus 12</option></select></label>
            <label className="sv-field sv-span-two" htmlFor="quote-equipment"><span>Child seats or equipment · optional</span><textarea id="quote-equipment" rows={3} value={draft.equipment} onChange={event => update('equipment', event.target.value)} placeholder="Child ages, skis, pushchairs or other equipment" /></label>
          </div><p className="sv-fine-print">Vehicle suitability and any extras are confirmed after reviewing your passengers and luggage.</p></fieldset>}
          {step === 2 && <fieldset><legend className="sv-step-heading">Your contact details</legend><div className="sv-fields-grid">{input('name', 'Full name', { autoComplete: 'name', required: true, placeholder: 'Your full name' })}{input('email', 'Email', { type: 'email', autoComplete: 'email', required: true, placeholder: 'your@email.com' })}{input('phone', 'Phone / WhatsApp · optional', { type: 'tel', autoComplete: 'tel', placeholder: '+39…' })}</div><h4 className="sv-review-heading">Review your journey</h4>{review}<button type="button" className="sv-text-link" onClick={() => goTo(0)}>Edit journey details</button><p className="sv-preview-notice">Local preview only: this form does not send a request or confirm a booking yet.</p></fieldset>}
          <div className="sv-form-actions">{step > 0 && <button type="button" className="sv-back" onClick={() => goTo(step - 1)} aria-label="Previous step"><ArrowLeft size={21} />Back</button>}<button type="submit" className="sv-button sv-button-gold">{step === 2 ? 'Preview your request' : 'Continue'}<ArrowRight size={25} aria-hidden="true" /></button></div>
          <p className="sv-form-helper">{step === 0 ? 'Next: passengers, luggage and vehicle preferences.' : step === 1 ? 'Next: contact details and final review.' : 'Your request is not a booking until the journey and price are confirmed.'}</p>
        </form>
      </>}
    </div>
  </div></section>
}
