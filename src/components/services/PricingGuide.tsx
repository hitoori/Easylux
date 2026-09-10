const questions = [
  ['Are the displayed fares the final price?', 'The route tables show indicative fares. Your quote confirms the vehicle, availability, route and requested extras before you book.'],
  ['Can I add a return journey or waiting?', 'Yes. Include the return date, stops or waiting in your request. A return or later collection is quoted separately, and waiting arrangements are agreed in advance.'],
  ['Can my driver collect me at any address in Venice?', 'Road vehicles cannot reach every address in Venice’s historic centre. A Water Taxi can connect you with your chauffeur at Piazzale Roma; the closest accessible landing is confirmed before travel.'],
  ['What do you need to prepare my quote?', 'Your pick-up, destination, date, passengers and luggage. For airport pick-ups, add your flight number. For a cruise, include the ship, terminal and boarding or disembarkation time.'],
]

export default function PricingGuide() {
  return <section className="services-pricing-guide" aria-labelledby="services-pricing-title">
    <div className="svc-shell services-pricing-layout">
      <div className="services-pricing-copy">
        <p className="svc-eyebrow">Before you book</p>
        <h2 id="services-pricing-title">A clear quote.<br />An agreed journey.</h2>
        <p>Compare the indicative fares, then tell us what your trip needs. Your quote brings the route, vehicle and any extras together.</p>
        <p className="services-pricing-reassurance">Nothing is booked until you approve the journey and price.</p>
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
