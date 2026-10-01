import { getExampleNumber } from 'libphonenumber-js/min'
import phoneExamples from 'libphonenumber-js/mobile/examples'
import { getCountryCallingCode, phoneCountries, phoneInput, type CountryCode } from '../lib/phoneNumber'

interface Props {
  country: CountryCode
  national: string
  invalid: boolean
  onChange: (next: ReturnType<typeof phoneInput>) => void
}

export default function BookingPhoneInput({ country, national, invalid, onChange }: Props) {
  return <div className="br-control br-phone-control" data-invalid={invalid}>
    <label htmlFor="booking-phone-country" className="sr-only">Phone country and calling code</label>
    <select id="booking-phone-country" aria-label="Phone country and calling code" value={country} onChange={event => onChange(phoneInput(national, event.target.value as CountryCode))}>{phoneCountries.map(item => <option key={item.country} value={item.country}>{item.name}</option>)}</select>
    <span id="booking-phone-prefix" className="br-phone-prefix">+{getCountryCallingCode(country)}</span>
    <input id="booking-phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} aria-invalid={invalid} aria-describedby={invalid ? 'booking-phone-prefix booking-phone-error booking-phone-hint' : 'booking-phone-prefix booking-phone-hint'} placeholder={`e.g. ${getExampleNumber(country, phoneExamples)?.formatNational() || 'Phone number'}`} value={national} onChange={event => onChange(phoneInput(event.target.value, country))} />
  </div>
}
