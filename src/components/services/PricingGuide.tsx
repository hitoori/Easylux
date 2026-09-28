import type { Page } from '../../types/navigation'

const questions = [
  ['Which transfer service should I choose?', 'Choose Airport & City for airport or local journeys, By the Hour for a driver who stays with you, or the section that matches your destination: Water Taxi, Italy & Europe, Prosecco Hills, Mountains, Seaside or Cruise Ports. You can request a different destination if it is not listed.'],
  ['Can I combine a road transfer with a Water Taxi in Venice?', 'Yes. For destinations that need water access, your chauffeur can take you to the agreed handover point and a private Water Taxi can continue to your hotel or the nearest available landing. We confirm access before departure.'],
  ['Can my route include stops or a return journey?', 'Yes. Add your stops, waiting time and return details to your request. For hourly journeys, your driver can remain available through your itinerary; other routes are quoted around the requested journey.'],
  ['Which cruise terminals can you serve?', 'The Cruise Port Transfers section covers Ravenna, Trieste and Fusina. Choose the terminal that matches your ship and include your embarkation or disembarkation details in the request.'],
]

export default function PricingGuide({ navigate }: { navigate: (page: Page) => void }) {
  return <section className="services-pricing-guide" aria-labelledby="services-pricing-title">
    <div className="svc-shell services-pricing-layout">
      <div className="services-pricing-heading">
        <div>
          <p className="svc-eyebrow">Useful to know</p>
          <h2 id="services-pricing-title">Quick answers</h2>
        </div>
        <button type="button" className="services-pricing-link" onClick={() => navigate('faq')}>
          Explore all FAQs <span aria-hidden="true">→</span>
        </button>
      </div>
      <div className="services-pricing-questions">
        {questions.map(([question, answer]) => <details key={question}>
          <summary>{question}<span aria-hidden="true" /></summary>
          <p>{answer}</p>
        </details>)}
      </div>
    </div>
  </section>
}
