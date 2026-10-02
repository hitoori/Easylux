import { pagePath } from '../../types/navigation'
import { useEffect, useRef, useState, type FormEvent, type InputHTMLAttributes } from 'react'
import { ArrowLeft, ArrowRight, Check, Plus } from '@phosphor-icons/react'
import { serviceOptions, type QuoteSelection } from './serviceData'
import { initialQuote, localDate, validateQuote, type QuoteDraft, type QuoteErrors } from './quoteModel'
import { sendBooking } from '../../lib/sendBooking'

export default function ServiceQuoteForm({ selection }: { selection: QuoteSelection | null }) {
  const [draft, setDraft] = useState<QuoteDraft>(initialQuote)
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<QuoteErrors>({})
  const [notesOpen, setNotesOpen] = useState(false)
  const [prepared, setPrepared] = useState(false)
  const [sending, setSending] = useState(false)
  const [requestCode, setRequestCode] = useState('')
  const [status, setStatus] = useState('')
  const [consent, setConsent] = useState(false)
  const requestId = useRef(crypto.randomUUID())
  const headingRef = useRef<HTMLHeadingElement>(null)
  const needsFocus = useRef(false)

  useEffect(() => {
    if (!selection) return
    setDraft(previous => ({ ...previous, service: selection.service, pickup: selection.pickup ?? '', destination: selection.destination ?? '', airportPickup: selection.airportPickup ?? false, addReturn: selection.addReturn ?? false }))
    setStep(0); setErrors({}); setPrepared(false); setSending(false); setRequestCode(''); setStatus(''); setConsent(false); requestId.current = crypto.randomUUID()
    headingRef.current?.focus({ preventScroll: true })
    const section = document.getElementById('service-custom')
    const anchor = section?.querySelector<HTMLElement>('.sv-quote-layout') ?? section
    if (anchor) {
      const headerHeight = window.matchMedia('(min-width: 1024px)').matches ? 76 : 72
      const directoryHeight = document.querySelector('.services-masthead-nav')?.getBoundingClientRect().height ?? 64
      const top = anchor.getBoundingClientRect().top + window.scrollY - headerHeight - directoryHeight - 24
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
  const submit = async (event: FormEvent) => {
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
    else {
      if (sending) return
      if (!consent) { setStatus('Please agree to be contacted about this request.'); return }
      setSending(true); setStatus('')
      const details = [
        `Pick-up: ${draft.pickup}`, `Destination: ${draft.destination}`, `Departure: ${draft.date} · ${draft.time}`,
        `Passengers: ${draft.passengers}`, `Luggage: ${draft.luggage} bags`, draft.vehicle && `Vehicle: ${draft.vehicle}`,
        draft.airportPickup && `Airport pick-up · Flight: ${draft.flight}`,
        draft.addReturn && `Return: ${draft.returnDate} · ${draft.returnTime}`,
        draft.service === 'hourly' && `Duration: ${draft.duration}\nSchedule: ${draft.stops}`,
        draft.service === 'cruise' && `Cruise: ${draft.ship} · ${draft.terminal} · ${draft.shipTime}`,
        draft.equipment && `Equipment: ${draft.equipment}`, draft.notes && `Special requests: ${draft.notes}`,
      ].filter(Boolean).join('\n')
      try {
        const code = await sendBooking({ kind: 'custom', source: 'services-quote', service: serviceOptions.find(([value]) => value === draft.service)?.[1] || 'Transfer quote', name: draft.name, email: draft.email, phone: draft.phone, details, consent }, requestId.current)
        setRequestCode(code); setPrepared(true); needsFocus.current = true
      } catch (error) { setStatus(error instanceof Error ? error.message : 'The request could not be sent.') }
      finally { setSending(false) }
    }
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
    <div className="sv-copy sv-quote-copy"><p className="svc-eyebrow">Request a private transfer quote</p><h2 id="quote-intro-title">Request a quote for your transfer.</h2><p className="sv-lead">Tell us where and when you need to travel. We’ll confirm the vehicle and price before you decide.</p></div>
    <div className="sv-quote-panel">
      <h3 ref={headingRef} tabIndex={-1} className="sv-form-title">{prepared ? 'Check your journey details.' : 'Your journey details'}</h3>
      {prepared ? <div className="sv-prepared"><Check size={32} aria-hidden="true" /><p role="status">Your request has been sent. Reference {requestCode}.</p><p>We’ve emailed a confirmation to {draft.email}. Our team will contact you to discuss the journey and quote.</p>{review}<button type="button" className="sv-button" onClick={() => { setPrepared(false); setStep(0); setDraft(initialQuote); setRequestCode(''); requestId.current = crypto.randomUUID(); needsFocus.current = true }}>Send another request <ArrowLeft size={20} /></button></div> : <>
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
          {step === 1 && <fieldset><legend className="sv-step-heading">Passengers, luggage &amp; vehicle</legend><div className="sv-fields-grid">
            {input('passengers', 'Passengers', { type: 'number', min: 1, max: 12, required: true, inputMode: 'numeric' })}
            {input('luggage', 'Bags & suitcases', { type: 'number', min: 0, required: true, inputMode: 'numeric' })}
            <label className="sv-field sv-span-two" htmlFor="quote-vehicle"><span>Vehicle preference · optional</span><select id="quote-vehicle" value={draft.vehicle} onChange={event => update('vehicle', event.target.value)}><option value="">Recommend a suitable vehicle</option><option>Sedan</option><option>Van</option><option>Minibus 12</option></select></label>
            <label className="sv-field sv-span-two" htmlFor="quote-equipment"><span>Child seats or equipment · optional</span><textarea id="quote-equipment" rows={3} value={draft.equipment} onChange={event => update('equipment', event.target.value)} placeholder="Child ages, skis, pushchairs or other equipment" /></label>
          </div><p className="sv-fine-print">Vehicle suitability and any extras are confirmed after reviewing your passengers and luggage.</p></fieldset>}
          {step === 2 && <fieldset><legend className="sv-step-heading">Your contact details</legend><div className="sv-fields-grid">{input('name', 'Full name', { autoComplete: 'name', required: true, placeholder: 'Your full name' })}{input('email', 'Email', { type: 'email', autoComplete: 'email', required: true, placeholder: 'your@email.com' })}{input('phone', 'Phone / WhatsApp · optional', { type: 'tel', autoComplete: 'tel', placeholder: '+39…' })}</div><h4 className="sv-review-heading">Review your journey</h4>{review}<button type="button" className="sv-text-link" onClick={() => goTo(0)}>Edit journey details</button><label className="sv-fine-print"><input type="checkbox" checked={consent} onChange={event => { setConsent(event.target.checked); setStatus('') }} /> <span>I agree to be contacted about this quote request. <a href={pagePath('cookies')} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4">Privacy Policy</a>.</span></label></fieldset>}
          {status && <p role="alert" className="sv-error-summary">{status}</p>}
          <div className="sv-form-actions">{step > 0 && <button type="button" className="sv-back" onClick={() => goTo(step - 1)} aria-label="Previous step"><ArrowLeft size={21} />Back</button>}<button type="submit" className="sv-button sv-button-gold" disabled={sending}>{sending ? 'Sending…' : step === 0 ? 'Continue to passengers' : step === 1 ? 'Continue to contact' : 'Send your request'}<ArrowRight size={25} aria-hidden="true" /></button></div>
          <p className="sv-form-helper">{step === 0 ? 'Your next step: passengers, luggage and vehicle preference.' : step === 1 ? 'Next: contact details and journey review.' : 'No booking is made until the journey and price are confirmed.'}</p>
        </form>
      </>}
    </div>
  </div></section>
}
