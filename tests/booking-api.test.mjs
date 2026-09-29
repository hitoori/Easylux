import test from 'node:test'
import assert from 'node:assert/strict'
import { handleBookingRequest } from '../worker/index.js'

const payload = {
  kind: 'transfer', source: 'home-booking', name: 'Test Client', email: 'client@example.com', phone: '+39 123456789',
  details: 'Pick-up: Venice\nDestination: Milan', consent: true,
  requestId: '124fe6c0-2f57-4faf-b4c6-72c431e63f25',
}
const request = (body = payload) => new Request('https://easylux.example/api/booking', {
  method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://easylux.example' },
  body: JSON.stringify(body),
})

test('booking endpoint requires mail configuration', async () => {
  const response = await handleBookingRequest(request(), {})
  assert.equal(response.status, 503)
})

test('booking endpoint rejects invalid input before email delivery', async () => {
  const response = await handleBookingRequest(request({ ...payload, email: 'bad' }), {})
  assert.equal(response.status, 400)
})

test('booking endpoint sends company and customer emails with one idempotency key', async () => {
  const originalFetch = globalThis.fetch
  let sent
  globalThis.fetch = async (_url, options) => {
    sent = options
    return new Response(JSON.stringify({ data: [{ id: '1' }, { id: '2' }] }), { status: 200 })
  }
  try {
    const response = await handleBookingRequest(request(), {
      RESEND_API_KEY: 'test-key', BOOKING_FROM_EMAIL: 'Easy Lux <booking@example.com>',
      BOOKING_TO_EMAIL: 'office@example.com',
    })
    assert.equal(response.status, 200)
    assert.equal((await response.json()).requestCode, 'ELX-124FE6C0')
    assert.equal(sent.headers['Idempotency-Key'], `booking/${payload.requestId}`)
    const messages = JSON.parse(sent.body)
    assert.deepEqual(messages.map(message => message.to[0]), ['office@example.com', payload.email])
    assert.match(messages[1].text, /deposit payment/)
  } finally { globalThis.fetch = originalFetch }
})
