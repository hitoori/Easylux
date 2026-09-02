import test from 'node:test'
import assert from 'node:assert/strict'
import { initialQuote, localDate, validateQuote } from '../src/components/services/quoteModel.ts'

const now = new Date('2026-08-31T10:00:00')
const journey = { ...initialQuote, pickup: 'Venice', destination: 'Milan', date: '2026-09-04', time: '09:00' }
test('journey requires the essential fields and rejects whitespace', () => {
  assert.equal(Object.keys(validateQuote(initialQuote, 0, now)).length, 4)
  assert.ok(validateQuote({ ...journey, pickup: '   ' }, 0, now).pickup)
  assert.deepEqual(validateQuote(journey, 0, now), {})
})
test('past travel dates and same-day past times are rejected', () => {
  assert.ok(validateQuote({ ...journey, date: '2026-08-30' }, 0, now).date)
  assert.ok(validateQuote({ ...journey, date: '2026-08-31', time: '09:00' }, 0, now).date)
})
test('return must be scheduled after departure, and is optional', () => {
  assert.deepEqual(validateQuote({ ...journey, returnDate: '2020-01-01' }, 0, now), {})
  assert.ok(validateQuote({ ...journey, addReturn: true }, 0, now).returnDate)
  assert.ok(validateQuote({ ...journey, addReturn: true, returnDate: journey.date, returnTime: '08:00' }, 0, now).returnDate)
  assert.deepEqual(validateQuote({ ...journey, addReturn: true, returnDate: journey.date, returnTime: '18:00' }, 0, now), {})
})
test('airport, hourly and cruise details are validated only when relevant', () => {
  assert.ok(validateQuote({ ...journey, airportPickup: true }, 0, now).flight)
  assert.deepEqual(validateQuote({ ...journey, airportPickup: true, flight: 'BA598' }, 0, now), {})
  assert.deepEqual(Object.keys(validateQuote({ ...journey, service: 'hourly' }, 0, now)), ['duration', 'stops'])
  assert.deepEqual(Object.keys(validateQuote({ ...journey, service: 'cruise' }, 0, now)), ['ship', 'terminal', 'shipTime'])
  assert.deepEqual(validateQuote({ ...journey, service: 'mountains' }, 0, now), {})
})
test('passengers and bags must be whole nonnegative counts', () => {
  for (const passengers of ['', '0', '13', '1.5']) assert.ok(validateQuote({ ...journey, passengers }, 1).passengers)
  for (const luggage of ['', '-1', '1.5']) assert.ok(validateQuote({ ...journey, luggage }, 1).luggage)
  assert.deepEqual(validateQuote({ ...journey, luggage: '0', passengers: '12' }, 1), {})
})
test('contact requires name and valid email; phone remains optional', () => {
  assert.ok(validateQuote({ ...journey, name: '  ', email: 'invalid' }, 2).name)
  assert.ok(validateQuote({ ...journey, name: 'Test User', email: 'invalid' }, 2).email)
  assert.deepEqual(validateQuote({ ...journey, name: 'Test User', email: 'test@example.com' }, 2), {})
})
test('date minimum uses local calendar components', () => {
  assert.equal(localDate(new Date(2026, 0, 2, 0, 10)), '2026-01-02')
})
