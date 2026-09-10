export const faqTopics = [
  { id: 'booking', title: 'Booking & payment', questions: [
    { id: 'book', q: 'How do I book a private transfer?', a: 'Share your pick-up, destination, date, passengers and luggage. We will confirm availability and send your journey details and quote before you book.' },
    { id: 'price', q: 'Are the prices on the website final?', a: 'The route tables show indicative fares. Your personal quote confirms the vehicle, route, availability and any requested extras. Review the full arrangements and price before confirming.' },
    { id: 'payment', q: 'How can I pay for my transfer?', a: 'Please ask us to confirm the available payment methods and any advance payment when requesting your quote. Check when the balance is due before you confirm your booking.' },
    { id: 'return', q: 'Can I book a return trip or a driver by the hour?', a: 'Yes. For a return trip, include both dates and pick-up times; each direction is quoted separately. For a chauffeur by the hour, share the approximate duration, stops and waiting you need.' },
  ] },
  { id: 'airport', title: 'Airport & pick-up', questions: [
    { id: 'meeting', q: 'Where will I meet my driver at the airport?', a: 'Your driver meets you in Arrivals after baggage claim, with your name displayed. Follow the airport-specific meeting instructions sent before travel. If you cannot find your driver, contact us before leaving the meeting area.' },
    { id: 'delay', q: 'What if my flight is delayed?', a: 'Include your flight number so we can follow the actual arrival time. Let us know if your flight number or travel plans change. Your quote confirms the included waiting time and any additional charge.' },
    { id: 'waiting', q: 'How much waiting time is included?', a: 'Waiting arrangements depend on the pick-up and service. Check your quote for the included period, when it starts and the charge for additional waiting. Tell us as soon as you expect a delay.' },
    { id: 'port', q: 'Can you collect me from a hotel, station or cruise port?', a: 'Yes. Send the full address or station details. For a cruise, include the ship, terminal and boarding or disembarkation time. We arrange transfers to destinations including Ravenna, Trieste and Fusina, with the meeting point agreed before travel.' },
  ] },
  { id: 'luggage', title: 'Luggage & requests', questions: [
    { id: 'bags', q: 'How much luggage can I bring?', a: 'Tell us the number and size of your bags, as well as the passenger count. Mention ski equipment, golf bags, pushchairs or other oversized items so we can check suitable transport before confirming.' },
    { id: 'child', q: 'Can I request a child seat?', a: 'Include each child’s age and size in your request, along with the type of seat needed. Ask us to confirm the suitable seat, availability and any charge before you book.' },
    { id: 'access', q: 'Can you accommodate accessibility requirements?', a: 'Tell us about the assistance you need and any mobility equipment, including its dimensions and whether it folds. We will check suitable arrangements with you before you book.' },
    { id: 'pets', q: 'Can I travel with a pet?', a: 'Please mention your pet when requesting a quote, including its size and carrier requirements. Let us know if you travel with an assistance dog so we can discuss the appropriate arrangements.' },
  ] },
  { id: 'changes', title: 'Changes & cancellations', questions: [
    { id: 'modify', q: 'Can I change my pick-up time or destination?', a: 'Contact us with your booking details and the change you need. Changes depend on availability and may affect the price. Ask for confirmation of the revised arrangements before travelling.' },
    { id: 'cancel', q: 'How do I cancel a booking?', a: 'Contact us with your booking reference as soon as your plans change. Ask us to confirm the cancellation and whether a fee or refund applies under the terms agreed for your booking.' },
    { id: 'cancelled-flight', q: 'What if my flight is cancelled?', a: 'Contact us as soon as possible with your booking details and any replacement flight. We can check options for a different pick-up. Changes, cancellation charges and refunds depend on your booking terms.' },
    { id: 'stops', q: 'Can I add a stop during my journey?', a: 'Include planned stops in your initial request so they can be allowed for in the route and quote. If you need to add one later, contact us to check the schedule and any price change.' },
  ] },
  { id: 'venice', title: 'Venice & water taxi', questions: [
    { id: 'hotel', q: 'Can a car take me directly to my hotel in Venice?', a: 'Road vehicles cannot reach every address in Venice’s historic centre. Send your hotel’s name and address so we can advise on a road transfer, a water taxi or a combination, with the closest accessible landing confirmed before travel.' },
    { id: 'combine', q: 'Can you arrange a car transfer and a water taxi together?', a: 'Yes. A private water taxi can connect your Venice address with your chauffeur at Piazzale Roma. Share your starting point and destination so we can arrange the connection in either direction.' },
    { id: 'boat-price', q: 'How much does a private water taxi cost?', a: 'Request a quote with your route, date, time, passengers and luggage. The price depends on these details and the landing arrangements. Confirm the complete journey price before booking.' },
    { id: 'boat-luggage', q: 'What details do you need for a water taxi booking?', a: 'Send your hotel or address, preferred time, passenger count and luggage details. Mention mobility requirements or unusually large bags so we can check the boat and landing arrangements.' },
  ] },
] as const
