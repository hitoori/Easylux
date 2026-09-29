import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { sendBooking } from '../../lib/sendBooking'

export default function JourneyRequest() {
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const [requestId, setRequestId] = useState(() => crypto.randomUUID())

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sending) return
    const form = event.currentTarget
    const data = new FormData(form)
    setSending(true)
    setStatus('')
    try {
      const code = await sendBooking({
        kind: 'custom',
        source: 'home-quote',
        service: 'Bespoke transfer quote',
        name: String(data.get('name') || ''),
        email: String(data.get('email') || ''),
        details: String(data.get('journey') || ''),
        consent: data.get('consent') === 'on',
        website: String(data.get('website') || ''),
      }, requestId)
      setStatus(`Request sent. Reference ${code}. Check your email for confirmation.`)
      form.reset()
      setRequestId(crypto.randomUUID())
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'The request could not be sent.')
    } finally { setSending(false) }
  }

  return (
    <section className="home-final-request" aria-labelledby="home-final-request-title">
      <div className="home-final-request-copy">
        <p className="h2-kicker">Bespoke journey</p>
        <h2 id="home-final-request-title">Tell us where<br /> you want<br /> <span>to go.</span></h2>
        <p>Share your route, date, number of passengers and any stops. We’ll reply with availability and a price before you confirm.</p>
      </div>

      <form className="home-final-request-form" aria-labelledby="journey-request-form-title"
        onChange={() => setStatus('')}
        onSubmit={submit}>
        <h3 id="journey-request-form-title">Request a transfer quote</h3>
        <div className="home-final-request-fields">
          <label>Your name
            <input name="name" autoComplete="name" placeholder="Full name" required maxLength={120} />
          </label>
          <label>Email
            <input name="email" type="email" autoComplete="email" placeholder="your@email.com" required maxLength={160} />
          </label>
          <label className="home-final-request-details">Route, date &amp; travel details
            <textarea name="journey" placeholder="Pick-up, destination, date, passengers, luggage and any stops or waiting…" required minLength={10} maxLength={3000} rows={4} />
          </label>
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="consent" required /> I agree to be contacted about this request.</label>
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />
        <button type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send your request'} <ArrowRight size={20} weight="light" aria-hidden="true" /></button>
        <p className="home-final-request-status" role="status">
          {status}
        </p>
      </form>
    </section>
  )
}
