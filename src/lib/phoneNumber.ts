import { getCountries, getCountryCallingCode, parseIncompletePhoneNumber, parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js/min'

export { getCountryCallingCode, type CountryCode }
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
export const phoneCountries = getCountries().map(country => ({ country, name: regionNames.of(country) || country, prefix: `+${getCountryCallingCode(country)}` })).sort((a, b) => a.name.localeCompare(b.name, 'en'))

// Keep what the customer typed visible, while submitting one international number.
export function phoneInput(value: string, country: CountryCode) {
  const clean = parseIncompletePhoneNumber(value.trim().replace(/^00/, '+'))
  if (!clean) return { country, national: '', international: '' }
  if (clean.startsWith('+')) {
    const parsed = parsePhoneNumberFromString(clean, { extract: false })
    const matchingCountries = parsed ? phoneCountries.filter(item => item.prefix === `+${parsed.countryCallingCode}`).map(item => item.country) : []
    const preferredCountries: CountryCode[] = [country, 'GB', 'US', 'CA', 'RU', 'IT']
    const nextCountry = parsed?.country ?? preferredCountries.find(item => matchingCountries.includes(item)) ?? matchingCountries[0] ?? country
    const prefix = `+${getCountryCallingCode(nextCountry)}`
    return { country: nextCountry, national: parsed?.nationalNumber ? String(parsed.nationalNumber) : clean.startsWith(prefix) ? clean.slice(prefix.length) : clean, international: parsed?.number ? String(parsed.number) : clean }
  }
  const parsed = parsePhoneNumberFromString(clean, { defaultCountry: country, extract: false })
  return { country, national: value, international: parsed?.number ? String(parsed.number) : `+${getCountryCallingCode(country)}${clean}` }
}
