import OptimizedImage from './OptimizedImage'
import { useEffect, useRef, useState } from 'react'
import { useCookieConsent } from './CookieConsent'

const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim()
let placesLibrary: Promise<google.maps.PlacesLibrary> | undefined
function loadPlaces() {
  return placesLibrary ??= import('@googlemaps/js-api-loader').then(({ setOptions, importLibrary }) => {
    setOptions({ key: mapsKey!, v: 'weekly' })
    return importLibrary('places')
  }).catch(error => { placesLibrary = undefined; throw error })
}

type Prediction = google.maps.places.PlacePrediction

export interface PlaceMetadata {
  placeId: string
  types: string[]
  latitude?: number
  longitude?: number
}

interface PlaceInputProps {
  value: string
  onChange: (value: string) => void
  className: string
  placeholder: string
  label: string
  invalid?: boolean
  onMetadataChange?: (metadata: PlaceMetadata | null) => void
  inputId?: string
  describedBy?: string
}

export default function PlaceInput({ value, onChange, className, placeholder, label, invalid, onMetadataChange, inputId, describedBy }: PlaceInputProps) {
  const { maps: mapsAllowed } = useCookieConsent()
  const [suggestions, setSuggestions] = useState<Prediction[]>([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const [available, setAvailable] = useState(Boolean(mapsKey))
  const session = useRef<google.maps.places.AutocompleteSessionToken | null>(null)
  const requestId = useRef(0)
  const selectedValue = useRef('')
  const selectionId = useRef(0)

  useEffect(() => () => { selectionId.current++ }, [])

  useEffect(() => {
    if (!mapsAllowed || !mapsKey || !open || value.trim().length < 3 || value === selectedValue.current) {
      setSuggestions([])
      session.current = null
      return
    }
    const id = ++requestId.current
    const timer = window.setTimeout(async () => {
      try {
        const { AutocompleteSessionToken, AutocompleteSuggestion } = await loadPlaces()
        session.current ??= new AutocompleteSessionToken()
        const result = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: value,
          sessionToken: session.current,
        })
        if (id === requestId.current) { setAvailable(true); setSuggestions(result.suggestions.flatMap(item => item.placePrediction ? [item.placePrediction] : [])) }
      } catch {
        if (id === requestId.current) {
          setSuggestions([])
          setAvailable(false)
        }
      }
    }, 300)
    return () => { window.clearTimeout(timer); requestId.current++ }
  }, [value, open, mapsAllowed])

  const choose = async (prediction: Prediction) => {
    const selection = ++selectionId.current
    const text = prediction.text.toString()
    selectedValue.current = text
    onChange(text)
    onMetadataChange?.(null)
    setOpen(false)
    setSuggestions([])
    setActive(-1)
    try {
      const place = prediction.toPlace()
      await place.fetchFields({ fields: onMetadataChange ? ['formattedAddress', 'types', 'location'] : ['formattedAddress'] })
      if (selection !== selectionId.current) return
      if (place.formattedAddress) {
        selectedValue.current = place.formattedAddress
        onChange(place.formattedAddress)
      }
      onMetadataChange?.({ placeId: prediction.placeId, types: place.types ?? [], latitude: place.location?.lat(), longitude: place.location?.lng() })
    } catch { /* Keep the selected prediction as a usable address. */ }
    session.current = null
  }

  return <span className="relative block">
    <input
      type="text"
      id={inputId}
      value={value}
      onChange={event => { selectionId.current++; selectedValue.current = ''; onMetadataChange?.(null); onChange(event.target.value); setOpen(true); setActive(-1) }}
      onFocus={() => setOpen(true)}
      onBlur={() => window.setTimeout(() => setOpen(false), 150)}
      onKeyDown={event => {
        if (event.key === 'Escape') { setOpen(false); setActive(-1) }
        if (event.key === 'ArrowDown' && suggestions.length) { event.preventDefault(); setActive((active + 1) % suggestions.length) }
        if (event.key === 'ArrowUp' && suggestions.length) { event.preventDefault(); setActive((active + suggestions.length - 1) % suggestions.length) }
        if (event.key === 'Enter' && open && active >= 0 && suggestions[active]) { event.preventDefault(); void choose(suggestions[active]) }
      }}
      placeholder={placeholder}
      className={className}
      autoComplete="off"
      aria-label={label}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      aria-expanded={open && suggestions.length > 0}
      aria-autocomplete={mapsAllowed && available ? 'list' : 'none'}
      role="combobox"
    />
    {open && suggestions.length > 0 && <span role="listbox" className="absolute left-0 top-full z-[100] mt-3 block w-[min(80vw,390px)] overflow-hidden rounded-lg border border-[rgba(194,154,69,0.45)] bg-[#17191a] shadow-[0_18px_42px_rgba(0,0,0,.65)]">
      {suggestions.map((item, index) => <button key={item.placeId} type="button" role="option" aria-selected={index === active} onMouseDown={event => event.preventDefault()} onClick={() => void choose(item)} className={`block w-full px-4 py-2.5 text-left text-[13px] text-cream hover:bg-[rgba(194,154,69,.14)] ${index === active ? 'bg-[rgba(194,154,69,.14)]' : ''}`}>{item.text.toString()}</button>)}
      <span className="flex justify-end border-t border-white/10 bg-white px-3 py-1.5"><OptimizedImage src={`${import.meta.env.BASE_URL}images/powered_by_google_on_white.png`} alt="Powered by Google" width={59} height={18} className="h-[18px] w-auto" /></span>
    </span>}
  </span>
}
