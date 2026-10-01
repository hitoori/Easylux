import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

const source = readFileSync(new URL('../src/lib/phoneNumber.ts', import.meta.url), 'utf8').replace("'libphonenumber-js/min'", JSON.stringify(import.meta.resolve('libphonenumber-js/min')))
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
const { phoneInput, phoneCountries } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)

test('empty optional phone stays empty, country choices include calling codes', () => {
  assert.deepEqual(phoneInput('', 'GB'), { country: 'GB', national: '', international: '' })
  assert.equal(phoneCountries.find(item => item.country === 'IT').prefix, '+39')
})

test('national number gets the chosen prefix without losing Italian landline zero', () => {
  assert.equal(phoneInput('07700 900123', 'GB').international, '+447700900123')
  assert.equal(phoneInput('02 1234 5678', 'IT').international, '+390212345678')
  assert.equal(phoneInput('07700 900123', 'GB').national, '07700 900123')
})

test('pasted international phone detects its country without duplicating a prefix', () => {
  const number = phoneInput('+44 7700 900123', 'IT')
  assert.deepEqual(number, { country: 'GB', national: '7700900123', international: '+447700900123' })
  assert.deepEqual(phoneInput('0044 7700 900123', 'IT'), number)
  assert.equal(phoneInput(number.national, 'FR').international, '+337700900123')
})
