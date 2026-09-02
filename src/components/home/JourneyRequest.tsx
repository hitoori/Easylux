import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'

export default function JourneyRequest() {
  const [previewReady, setPreviewReady] = useState(false)

  return (
    <section className="home-final-request" aria-labelledby="home-final-request-title">
      <div className="home-final-request-copy">
        <p className="h2-kicker">Bespoke journey</p>
        <h2 id="home-final-request-title">Tell us where<br /> you want<br /> <em>to go.</em></h2>
        <p>Need a different route, several stops or a return pick-up? Share your plans for a personalised transfer quote.</p>
        <div className="home-final-request-note">
          <p>Your route. Your plans.</p>
          <p>We’ll check availability and agree the price before you confirm.</p>
        </div>
      </div>

      <form className="home-final-request-form" aria-labelledby="journey-request-form-title"
        onChange={() => setPreviewReady(false)}
        onSubmit={(event) => { event.preventDefault(); setPreviewReady(true) }}>
        <h3 id="journey-request-form-title">Request a transfer quote</h3>
        <div className="home-final-request-fields">
          <label>Your name
            <input name="name" autoComplete="name" placeholder="Full name" required maxLength={120} />
          </label>
          <label>Email or WhatsApp
            <input name="contact" placeholder="your@email.com or +39…" required minLength={5} maxLength={160} />
          </label>
          <label className="home-final-request-details">Describe your journey
            <textarea name="journey" placeholder="Pick-up, destination, date, passengers, luggage and any stops or waiting…" required minLength={10} maxLength={3000} rows={4} />
          </label>
        </div>
        <button type="submit">Send your request <ArrowRight size={20} weight="light" aria-hidden="true" /></button>
        <p className="home-final-request-status" role="status">
          {previewReady ? 'Your details are ready. This is a local preview — no request has been sent.' : 'Local preview · request delivery is not connected yet.'}
        </p>
      </form>
    </section>
  )
}
