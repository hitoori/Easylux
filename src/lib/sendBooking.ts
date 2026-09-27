export interface BookingPayload {
  kind: 'transfer' | 'hourly' | 'tours' | 'custom'
  source: 'home-booking' | 'home-quote' | 'services-quote' | 'contact'
  service?: string
  name: string
  email: string
  phone?: string
  details: string
  consent: boolean
  website?: string
}

export async function sendBooking(payload: BookingPayload, requestId: string): Promise<string> {
  let response: Response
  try {
    response = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...payload, requestId }),
    })
  } catch {
    throw new Error('Connection failed. Please try again or contact us directly.')
  }
  const result = await response.json().catch(() => ({})) as { error?: string; requestCode?: string }
  if (!response.ok || !result.requestCode) {
    throw new Error(result.error || 'The request could not be sent. Please try again.')
  }
  return result.requestCode
}
