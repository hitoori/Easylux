import { useEffect, useRef, useState } from 'react'
import {
  AirplaneTilt,
  ArrowLeft,
  ArrowRight,
  Baby,
  Bag,
  CalendarBlank,
  CarProfile,
  Champagne,
  Check,
  CheckCircle,
  Clock,
  Compass,
  Cookie,
  EnvelopeSimple,
  Hourglass,
  Info,
  MapPin,
  Minus,
  Phone,
  Plus,
  SuitcaseRolling,
  Toolbox,
  User,
  UsersThree,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react'

type Tab = 'transfer' | 'hourly' | 'tours'
type JourneyType = 'one-way' | 'return'
type AirportMode = 'none' | 'pickup' | 'dropoff'
type ContactMethod = 'whatsapp' | 'email'
type TransferStep = 1 | 2 | 3

interface BookingValues {
  pickup: string
  secondary: string
  dateTime: string
}

interface TransferJourney {
  pickup: string
  destination: string
  dateTime: string
  journeyType: JourneyType
  returnDateTime: string
  airportMode: AirportMode
  flightNumber: string
  stops: string[]
}

export interface BookingPrefill {
  requestId: number
  pickup: string
  destination: string
  airportMode?: AirportMode
}

interface BookingFormProps {
  prefill?: BookingPrefill | null
}

interface PassengerDetails {
  passengers: number
  largeLuggage: number
  handLuggage: number
  childSeat: boolean
  childSeats: number
  childAge: string
  childWeight: string
  extras: string[]
  specialEquipment: string
  specialRequests: string
}

interface ContactDetails {
  fullName: string
  email: string
  phone: string
  preferredContact: ContactMethod
  consent: boolean
}

type FormErrors = Record<string, string>

const tabs = [
  {
    id: 'transfer' as const,
    label: 'Private Transfer',
    icon: CarProfile,
    width: 'sm:w-[220px] lg:w-[250px]',
  },
  {
    id: 'hourly' as const,
    label: 'Chauffeur by the Hour',
    icon: Clock,
    width: 'sm:w-[245px] lg:w-[275px]',
  },
  {
    id: 'tours' as const,
    label: 'Private Journey',
    icon: Compass,
    width: 'sm:w-[220px] lg:w-[250px]',
  },
]

const initialValues: Record<Tab, BookingValues> = {
  transfer: { pickup: '', secondary: '', dateTime: '' },
  hourly: { pickup: '', secondary: '3 hours', dateTime: '' },
  tours: { pickup: '', secondary: 'Prosecco Hills', dateTime: '' },
}

const initialJourney: TransferJourney = {
  pickup: '',
  destination: '',
  dateTime: '',
  journeyType: 'one-way',
  returnDateTime: '',
  airportMode: 'none',
  flightNumber: '',
  stops: [],
}

const initialPassengers: PassengerDetails = {
  passengers: 1,
  largeLuggage: 0,
  handLuggage: 0,
  childSeat: false,
  childSeats: 1,
  childAge: '',
  childWeight: '',
  extras: [],
  specialEquipment: '',
  specialRequests: '',
}

const initialContact: ContactDetails = {
  fullName: '',
  email: '',
  phone: '',
  preferredContact: 'whatsapp',
  consent: false,
}

const tabCopy = {
  hourly: {
    secondaryLabel: 'Duration',
    submitLabel: 'Request Driver',
    successTitle: 'Request preview',
    successText: 'Your details are ready. This is a local preview — no request has been sent.',
  },
  tours: {
    secondaryLabel: 'Destination',
    submitLabel: 'Request Journey',
    successTitle: 'Journey preview',
    successText: 'Your details are ready. This is a local preview — no request has been sent.',
  },
}

const extras = [
  { id: 'prosecco', label: 'Prosecco', icon: Champagne },
  { id: 'refreshments', label: 'Drinks & snacks', icon: Cookie },
  { id: 'waiting', label: 'Additional waiting', icon: Hourglass },
  { id: 'equipment', label: 'Special equipment', icon: Toolbox },
] as const

const controlClass =
  'w-full border-0 bg-transparent p-0 text-[14px] text-cream placeholder:text-[rgba(170,163,154,0.72)] focus:outline-none sm:text-[15px]'

const modalControlClass =
  'mt-2 h-11 w-full rounded-lg border border-[rgba(116,111,105,0.5)] bg-[rgba(13,14,15,0.65)] px-3.5 text-[14px] text-cream placeholder:text-[rgba(143,136,128,0.65)] transition-colors focus:border-gold focus:outline-none'

function createRequestCode() {
  const date = new Date()
  const stamp = `${String(date.getFullYear()).slice(-2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `ELX-${stamp}-${suffix}`
}

function readableDateTime(value: string) {
  if (!value) return 'Not provided'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

interface FieldShellProps {
  children: React.ReactNode
  icon: React.ReactNode
  label: string
  error?: string
}

function FieldShell({ children, icon, label, error }: FieldShellProps) {
  return (
    <label
      className={`group flex min-h-[58px] min-w-0 items-center gap-3 rounded-lg border bg-[rgba(13,14,15,0.62)] px-3.5 py-2 transition-colors sm:min-h-[68px] sm:px-4 sm:py-2.5 lg:min-h-[72px] ${
        error
          ? 'border-[var(--error)]'
          : 'border-[rgba(36,41,44,0.96)] hover:border-[rgba(143,136,128,0.48)] focus-within:border-gold'
      }`}
    >
      <span className="shrink-0 text-[rgba(200,192,181,0.68)] transition-colors group-focus-within:text-gold-light">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="mb-1 block text-[11px] font-medium uppercase tracking-[0.13em] text-[rgba(200,192,181,0.78)]">
          {label}
        </span>
        {children}
        {error ? (
          <span className="mt-1 block text-[10px] text-[var(--error)]" role="alert">
            {error}
          </span>
        ) : null}
      </span>
    </label>
  )
}

interface CounterProps {
  label: string
  hint: string
  value: number
  icon: React.ReactNode
  min?: number
  max?: number
  onChange: (value: number) => void
}

function Counter({ label, hint, value, icon, min = 0, max = 12, onChange }: CounterProps) {
  return (
    <div className="flex min-h-[72px] items-center justify-between gap-3 rounded-lg border border-[rgba(116,111,105,0.42)] bg-[rgba(13,14,15,0.42)] px-3.5 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 text-gold-light">{icon}</span>
        <span className="min-w-0">
          <span className="block text-[13px] font-medium text-cream">{label}</span>
          <span className="mt-0.5 block text-[10px] text-[rgba(200,192,181,0.48)]">{hint}</span>
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2" aria-label={label}>
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="grid h-8 w-8 place-items-center rounded-full border border-[rgba(116,111,105,0.5)] text-[rgba(236,230,219,0.72)] transition-colors hover:border-gold hover:text-gold-light disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Minus size={14} weight="bold" aria-hidden="true" />
        </button>
        <output className="w-5 text-center text-[14px] font-semibold text-cream" aria-live="polite">
          {value}
        </output>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="grid h-8 w-8 place-items-center rounded-full border border-[rgba(116,111,105,0.5)] text-[rgba(236,230,219,0.72)] transition-colors hover:border-gold hover:text-gold-light disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Plus size={14} weight="bold" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

interface ReviewRowProps {
  label: string
  value: string
}

function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[rgba(116,111,105,0.2)] py-2.5 last:border-0">
      <dt className="text-[11px] uppercase tracking-[0.1em] text-[rgba(200,192,181,0.44)]">{label}</dt>
      <dd className="max-w-[65%] text-right text-[13px] leading-relaxed text-[rgba(236,230,219,0.84)]">
        {value}
      </dd>
    </div>
  )
}

export default function BookingForm({ prefill }: BookingFormProps) {
  const [activeTab, setActiveTab] = useState<Tab>('transfer')
  const [values, setValues] = useState(initialValues)
  const [submittedTab, setSubmittedTab] = useState<Tab | null>(null)
  const [journey, setJourney] = useState<TransferJourney>(initialJourney)
  const [passengers, setPassengers] = useState<PassengerDetails>(initialPassengers)
  const [contact, setContact] = useState<ContactDetails>(initialContact)
  const [journeyErrors, setJourneyErrors] = useState<FormErrors>({})
  const [passengerErrors, setPassengerErrors] = useState<FormErrors>({})
  const [contactErrors, setContactErrors] = useState<FormErrors>({})
  const [transferStep, setTransferStep] = useState<TransferStep>(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [specialRequestOpen, setSpecialRequestOpen] = useState(false)
  const [requestCode, setRequestCode] = useState('')
  const [transferSubmitted, setTransferSubmitted] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const dialogScrollRef = useRef<HTMLDivElement>(null)

  const activeValues = values[activeTab]

  useEffect(() => {
    if (!prefill) return

    const airportMode = prefill.airportMode ?? 'none'
    setActiveTab('transfer')
    setSubmittedTab(null)
    setDialogOpen(false)
    setJourney((current) => ({
      ...current,
      pickup: prefill.pickup,
      destination: prefill.destination,
      journeyType: 'one-way',
      returnDateTime: '',
      airportMode,
      flightNumber: airportMode === 'pickup' ? current.flightNumber : '',
      stops: [],
    }))
    setJourneyErrors({})
  }, [prefill])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (dialogOpen && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else if (!dialogOpen && dialog.open) {
      dialog.close()
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [dialogOpen])

  useEffect(() => {
    if (!dialogOpen) return
    dialogScrollRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [dialogOpen, transferStep, transferSubmitted])

  const updateValue = (field: keyof BookingValues, value: string) => {
    setValues((current) => ({
      ...current,
      [activeTab]: { ...current[activeTab], [field]: value },
    }))
  }

  const updateJourney = <K extends keyof TransferJourney>(field: K, value: TransferJourney[K]) => {
    setJourney((current) => ({ ...current, [field]: value }))
    setJourneyErrors((current) => ({ ...current, [field]: '' }))
  }

  const updatePassengers = <K extends keyof PassengerDetails>(
    field: K,
    value: PassengerDetails[K]
  ) => {
    setPassengers((current) => ({ ...current, [field]: value }))
    setPassengerErrors((current) => ({ ...current, [field]: '' }))
  }

  const updateContact = <K extends keyof ContactDetails>(field: K, value: ContactDetails[K]) => {
    setContact((current) => ({ ...current, [field]: value }))
    setContactErrors((current) => ({ ...current, [field]: '' }))
  }

  const selectTab = (tab: Tab) => {
    setActiveTab(tab)
    setSubmittedTab(null)
  }

  const addStop = () => {
    setJourney((current) =>
      current.stops.length >= 2 ? current : { ...current, stops: [...current.stops, ''] }
    )
  }

  const updateStop = (index: number, value: string) => {
    setJourney((current) => ({
      ...current,
      stops: current.stops.map((stop, stopIndex) => (stopIndex === index ? value : stop)),
    }))
  }

  const removeStop = (index: number) => {
    setJourney((current) => ({
      ...current,
      stops: current.stops.filter((_, stopIndex) => stopIndex !== index),
    }))
  }

  const validateJourneyRoute = () => {
    const errors: FormErrors = {}
    const departure = new Date(journey.dateTime)

    if (!journey.pickup.trim()) errors.pickup = 'Enter a pick-up location.'
    if (!journey.destination.trim()) errors.destination = 'Enter a destination.'
    if (
      journey.pickup.trim() &&
      journey.destination.trim() &&
      journey.pickup.trim().toLowerCase() === journey.destination.trim().toLowerCase()
    ) {
      errors.destination = 'Destination must be different.'
    }
    if (!journey.dateTime) {
      errors.dateTime = 'Select a date and time.'
    } else if (Number.isNaN(departure.getTime()) || departure.getTime() <= Date.now()) {
      errors.dateTime = 'Choose a future date and time.'
    }
    setJourneyErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateJourneyDetails = () => {
    const errors: FormErrors = {}
    const departure = new Date(journey.dateTime)

    if (journey.journeyType === 'return') {
      const returnDate = new Date(journey.returnDateTime)
      if (!journey.returnDateTime) {
        errors.returnDateTime = 'Select the return date and time.'
      } else if (returnDate.getTime() <= departure.getTime()) {
        errors.returnDateTime = 'Return must be after departure.'
      }
    }
    if (journey.airportMode === 'pickup' && !journey.flightNumber.trim()) {
      errors.flightNumber = 'Flight number is required for airport pick-up.'
    }
    journey.stops.forEach((stop, index) => {
      if (!stop.trim()) errors[`stop-${index}`] = 'Enter the stop address or remove it.'
    })

    setJourneyErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validatePassengers = () => {
    const errors: FormErrors = {}
    if (passengers.childSeat && !passengers.childAge) {
      errors.childAge = 'Select the child’s age.'
    }
    if (passengers.extras.includes('equipment') && !passengers.specialEquipment.trim()) {
      errors.specialEquipment = 'Tell us what equipment you need.'
    }
    setPassengerErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateContact = () => {
    const errors: FormErrors = {}
    if (!contact.fullName.trim()) errors.fullName = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(contact.email)) errors.email = 'Enter a valid email address.'
    if (!/^[+\d][\d\s().-]{7,}$/.test(contact.phone.trim())) {
      errors.phone = 'Enter a valid phone or WhatsApp number.'
    }
    if (!contact.consent) errors.consent = 'Please accept before sending your request.'
    setContactErrors(errors)
    return Object.keys(errors).length === 0
  }

  const submitJourney = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (activeTab !== 'transfer') {
      setSubmittedTab(activeTab)
      return
    }

    if (!validateJourneyRoute()) return
    setTransferStep(1)
    setTransferSubmitted(false)
    setDialogOpen(true)
  }

  const continueToPassengers = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateJourneyDetails()) return
    setTransferStep(2)
  }

  const continueToReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validatePassengers()) return
    setTransferStep(3)
  }

  const sendBookingRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateContact()) return
    setRequestCode(createRequestCode())
    setTransferSubmitted(true)
  }

  const resetTransferFlow = () => {
    setJourney(initialJourney)
    setPassengers(initialPassengers)
    setContact(initialContact)
    setJourneyErrors({})
    setPassengerErrors({})
    setContactErrors({})
    setSpecialRequestOpen(false)
    setTransferSubmitted(false)
    setRequestCode('')
    setTransferStep(1)
    setDialogOpen(false)
  }

  const toggleExtra = (extra: string) => {
    updatePassengers(
      'extras',
      passengers.extras.includes(extra)
        ? passengers.extras.filter((item) => item !== extra)
        : [...passengers.extras, extra]
    )
  }

  const selectedExtras = extras
    .filter((extra) => passengers.extras.includes(extra.id))
    .map((extra) => extra.label)
    .join(', ')

  const childSeatSummary = passengers.childSeat
    ? `${passengers.childSeats} seat${passengers.childSeats > 1 ? 's' : ''}, age ${passengers.childAge}${
        passengers.childWeight ? `, approx. ${passengers.childWeight} kg` : ''
      }`
    : 'Not requested'

  const tabCopyForActive = activeTab === 'transfer' ? null : tabCopy[activeTab]

  return (
    <>
      <div
        data-booking-dock
        className="w-full rounded-xl border border-[rgba(194,154,69,0.34)] bg-[rgba(21,25,27,0.94)] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-4 lg:min-h-[188px] lg:p-5"
      >
        <div
          className="flex overflow-x-auto border-b border-[rgba(116,111,105,0.46)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Booking type"
        >
          {tabs.map((tab) => {
            const TabIcon = tab.icon
            const selected = activeTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`booking-panel-${tab.id}`}
                onClick={() => selectTab(tab.id)}
                className={`relative flex min-w-[138px] shrink-0 items-center justify-center gap-2 px-3 pb-2.5 pt-0.5 text-[12px] font-medium transition-colors sm:min-w-0 sm:flex-none sm:gap-2.5 sm:px-4 sm:pb-3 sm:text-[14px] lg:justify-start lg:px-5 lg:text-[15px] ${tab.width} ${
                  selected
                    ? 'text-gold-light'
                    : 'text-[rgba(200,192,181,0.72)] hover:text-cream'
                }`}
              >
                <TabIcon size={20} weight="light" aria-hidden="true" />
                <span className="whitespace-nowrap">{tab.label}</span>
                <span
                  className={`absolute inset-x-3 bottom-0 h-px origin-left bg-gold transition-transform duration-300 lg:inset-x-5 ${
                    selected ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  aria-hidden="true"
                />
                {tab.id !== 'tours' ? (
                  <span
                    className="absolute right-0 top-0.5 h-6 w-px bg-[rgba(116,111,105,0.46)]"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            )
          })}
        </div>

        <div id={`booking-panel-${activeTab}`} role="tabpanel" className="pt-3 lg:pt-4">
          {submittedTab === activeTab && activeTab !== 'transfer' ? (
            <div className="flex min-h-[96px] flex-col items-start justify-center gap-4 rounded-lg border border-[rgba(114,138,106,0.42)] bg-[rgba(114,138,106,0.08)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
              <div className="flex items-start gap-3">
                <CheckCircle
                  className="mt-0.5 shrink-0 text-[var(--success)]"
                  size={26}
                  weight="light"
                />
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--success)]">
                    {tabCopyForActive?.successTitle}
                  </p>
                  <p className="mt-1 text-[14px] text-[rgba(236,230,219,0.82)] sm:text-[15px]">
                    {tabCopyForActive?.successText}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSubmittedTab(null)}
                className="shrink-0 text-[12px] uppercase tracking-[0.12em] text-gold hover:text-gold-light"
              >
                New request
              </button>
            </div>
          ) : (
            <form onSubmit={submitJourney} noValidate>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 sm:gap-2.5 lg:grid-cols-[1.1fr_1.1fr_1fr_150px] lg:gap-3">
                <FieldShell
                  label="Pick-up"
                  icon={<MapPin size={23} weight="light" aria-hidden="true" />}
                  error={activeTab === 'transfer' ? journeyErrors.pickup : undefined}
                >
                  <input
                    type="text"
                    value={activeTab === 'transfer' ? journey.pickup : activeValues.pickup}
                    onChange={(event) =>
                      activeTab === 'transfer'
                        ? updateJourney('pickup', event.target.value)
                        : updateValue('pickup', event.target.value)
                    }
                    placeholder="City, airport, address, hotel..."
                    className={controlClass}
                    autoComplete="street-address"
                    aria-invalid={activeTab === 'transfer' && Boolean(journeyErrors.pickup)}
                  />
                </FieldShell>

                <FieldShell
                  label={
                    activeTab === 'transfer'
                      ? 'Destination'
                      : tabCopyForActive?.secondaryLabel ?? 'Destination'
                  }
                  icon={
                    activeTab === 'tours' ? (
                      <Compass size={23} weight="light" aria-hidden="true" />
                    ) : activeTab === 'hourly' ? (
                      <Clock size={23} weight="light" aria-hidden="true" />
                    ) : (
                      <MapPin size={23} weight="light" aria-hidden="true" />
                    )
                  }
                  error={activeTab === 'transfer' ? journeyErrors.destination : undefined}
                >
                  {activeTab === 'hourly' ? (
                    <select
                      value={activeValues.secondary}
                      onChange={(event) => updateValue('secondary', event.target.value)}
                      className={controlClass}
                      aria-label="Duration"
                    >
                      {[3, 4, 5, 6, 8, 10, 12].map((hours) => (
                        <option key={hours} value={`${hours} hours`}>
                          {hours} hours
                        </option>
                      ))}
                    </select>
                  ) : activeTab === 'tours' ? (
                    <select
                      value={activeValues.secondary}
                      onChange={(event) => updateValue('secondary', event.target.value)}
                      className={controlClass}
                      aria-label="Destination"
                    >
                      <option value="Prosecco Hills">Prosecco Hills</option>
                      <option value="Dolomites">Dolomites</option>
                      <option value="Lake Como">Lake Como</option>
                      <option value="Custom Tour">Custom destination</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={journey.destination}
                      onChange={(event) => updateJourney('destination', event.target.value)}
                      placeholder="City, airport, address, hotel..."
                      className={controlClass}
                      autoComplete="off"
                      aria-invalid={Boolean(journeyErrors.destination)}
                    />
                  )}
                </FieldShell>

                <FieldShell
                  label="Date & Time"
                  icon={<CalendarBlank size={23} weight="light" aria-hidden="true" />}
                  error={activeTab === 'transfer' ? journeyErrors.dateTime : undefined}
                >
                  <input
                    type="datetime-local"
                    value={activeTab === 'transfer' ? journey.dateTime : activeValues.dateTime}
                    onChange={(event) =>
                      activeTab === 'transfer'
                        ? updateJourney('dateTime', event.target.value)
                        : updateValue('dateTime', event.target.value)
                    }
                    className={controlClass}
                    aria-label="Date and time"
                    aria-invalid={activeTab === 'transfer' && Boolean(journeyErrors.dateTime)}
                  />
                </FieldShell>

                <button
                  type="submit"
                  className="flex min-h-[52px] items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-gold px-4 text-[13px] font-semibold tracking-[0.02em] text-[var(--background)] shadow-[0_12px_34px_rgba(194,154,69,0.14)] transition-colors hover:bg-gold-light focus-visible:outline-gold-light sm:min-h-[62px] lg:min-h-[72px]"
                >
                  {activeTab === 'transfer' ? 'Next' : tabCopyForActive?.submitLabel}
                  <ArrowRight size={18} weight="bold" aria-hidden="true" />
                </button>
              </div>

            </form>
          )}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="transfer-dialog-title"
        onCancel={(event) => {
          event.preventDefault()
          setDialogOpen(false)
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) setDialogOpen(false)
        }}
        className="booking-dialog m-auto max-h-[92svh] w-[calc(100%-24px)] max-w-[820px] overflow-hidden rounded-xl border border-[rgba(111,88,48,0.72)] bg-[rgba(16,17,18,0.98)] p-0 text-cream shadow-[0_32px_100px_rgba(0,0,0,0.72)] backdrop-blur-xl"
      >
        <div className="flex max-h-[92svh] flex-col">
          <header className="shrink-0 border-b border-[rgba(116,111,105,0.28)] px-5 py-4 sm:px-7 sm:py-5">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Private Transfer
                </p>
                <h2
                  id="transfer-dialog-title"
                  className="mt-1 font-display text-[28px] font-medium leading-tight text-cream sm:text-[32px]"
                >
                  {transferSubmitted
                    ? 'Request received'
                    : transferStep === 1
                      ? 'Trip details'
                      : transferStep === 2
                        ? 'Passengers & Extras'
                        : 'Contact & Review'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                aria-label="Close booking form"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[rgba(116,111,105,0.42)] text-[rgba(236,230,219,0.7)] transition-colors hover:border-gold hover:text-gold-light"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {!transferSubmitted ? (
              <ol className="mt-4 grid grid-cols-3 gap-2" aria-label="Booking progress">
                {[
                  { number: 1, label: 'Trip details' },
                  { number: 2, label: 'Passengers' },
                  { number: 3, label: 'Review' },
                ].map((item) => {
                  const active = transferStep === item.number
                  const complete = item.number < transferStep
                  return (
                    <li key={item.number} className="min-w-0">
                      <div
                        className={`h-px w-full ${active || complete ? 'bg-gold' : 'bg-[rgba(116,111,105,0.35)]'}`}
                      />
                      <div className="mt-2 flex items-center gap-1.5">
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[9px] ${
                            active
                              ? 'border-gold bg-[rgba(194,154,69,0.16)] text-gold-light'
                              : complete
                                ? 'border-[rgba(194,154,69,0.65)] text-gold'
                                : 'border-[rgba(116,111,105,0.4)] text-[rgba(200,192,181,0.4)]'
                          }`}
                        >
                          {complete && !active ? <Check size={11} weight="bold" /> : item.number}
                        </span>
                        <span
                          className={`truncate text-[9px] uppercase tracking-[0.08em] sm:text-[10px] ${
                            active ? 'text-cream' : 'text-[rgba(200,192,181,0.42)]'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ol>
            ) : null}
          </header>

          <div ref={dialogScrollRef} className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
            {transferSubmitted ? (
              <div className="mx-auto flex max-w-[590px] flex-col items-center py-5 text-center sm:py-8">
                <span className="grid h-16 w-16 place-items-center rounded-full border border-[rgba(114,138,106,0.55)] bg-[rgba(114,138,106,0.1)] text-[var(--success)]">
                  <CheckCircle size={34} weight="light" aria-hidden="true" />
                </span>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--success)]">
                  Transfer request preview
                </p>
                <p className="mt-2 font-mono text-[22px] font-semibold tracking-[0.08em] text-gold-light sm:text-[26px]">
                  {requestCode}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-[rgba(236,230,219,0.8)] sm:text-[15px]">
                  Your details are ready for review. This local preview has not sent a request or
                  confirmed a booking.
                </p>
                <p className="mt-3 text-[12px] leading-relaxed text-[rgba(200,192,181,0.5)]">
                  This reference belongs to the preview only. Request delivery is not connected yet;
                  your details have not been sent or stored.
                </p>
                <button
                  type="button"
                  onClick={resetTransferFlow}
                  className="mt-7 min-h-11 rounded-lg bg-gold px-7 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--background)] transition-colors hover:bg-gold-light"
                >
                  Close & start fresh
                </button>
              </div>
            ) : transferStep === 1 ? (
              <form onSubmit={continueToPassengers} noValidate>
                <div className="rounded-lg border border-[rgba(116,111,105,0.32)] bg-[rgba(13,14,15,0.38)] px-4 py-3.5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                    <div className="flex min-w-0 items-center gap-2 text-[13px] text-[rgba(236,230,219,0.86)] sm:text-[14px]">
                      <span className="truncate">{journey.pickup}</span>
                      <ArrowRight className="shrink-0 text-gold" size={15} aria-hidden="true" />
                      <span className="truncate">{journey.destination}</span>
                    </div>
                    <span className="shrink-0 text-[11px] text-[rgba(200,192,181,0.5)]">
                      {readableDateTime(journey.dateTime)}
                    </span>
                  </div>
                </div>

                <fieldset className="mt-5">
                  <legend className="text-[12px] font-semibold text-cream">Trip type</legend>
                  <p className="mt-1 text-[11px] text-[rgba(200,192,181,0.48)]">
                    Choose a one-way journey or add a return date.
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {(['one-way', 'return'] as JourneyType[]).map((type) => {
                      const selected = journey.journeyType === type
                      return (
                        <button
                          key={type}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => {
                            updateJourney('journeyType', type)
                            if (type === 'one-way') updateJourney('returnDateTime', '')
                          }}
                          className={`min-h-12 rounded-lg border px-4 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                            selected
                              ? 'border-[rgba(194,154,69,0.7)] bg-[rgba(194,154,69,0.12)] text-gold-light'
                              : 'border-[rgba(116,111,105,0.42)] text-[rgba(200,192,181,0.62)] hover:border-[rgba(194,154,69,0.42)] hover:text-cream'
                          }`}
                        >
                          {type === 'one-way' ? 'One way' : 'Return'}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                {journey.journeyType === 'return' ? (
                  <label className="mt-3 block text-[11px] font-medium text-[rgba(200,192,181,0.72)]">
                    Return Date & Time
                    <input
                      type="datetime-local"
                      value={journey.returnDateTime}
                      onChange={(event) => updateJourney('returnDateTime', event.target.value)}
                      className={`${modalControlClass} ${
                        journeyErrors.returnDateTime ? 'border-[var(--error)]' : ''
                      }`}
                      aria-invalid={Boolean(journeyErrors.returnDateTime)}
                    />
                    {journeyErrors.returnDateTime ? (
                      <span className="mt-1 block text-[10px] text-[var(--error)]" role="alert">
                        {journeyErrors.returnDateTime}
                      </span>
                    ) : null}
                  </label>
                ) : null}

                <section className="mt-5 border-t border-[rgba(116,111,105,0.22)] pt-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-[12px] font-semibold text-cream">Journey options</h3>
                      <p className="mt-1 text-[11px] text-[rgba(200,192,181,0.48)]">
                        Add only the details that apply to this trip.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        aria-pressed={journey.airportMode !== 'none'}
                        onClick={() => {
                          const nextMode = journey.airportMode === 'none' ? 'pickup' : 'none'
                          updateJourney('airportMode', nextMode)
                          if (nextMode === 'none') updateJourney('flightNumber', '')
                        }}
                        className={`flex min-h-10 items-center gap-2 rounded-lg border px-3 text-[10px] font-semibold uppercase tracking-[0.06em] transition-colors ${
                          journey.airportMode !== 'none'
                            ? 'border-[rgba(194,154,69,0.62)] bg-[rgba(194,154,69,0.1)] text-gold-light'
                            : 'border-[rgba(116,111,105,0.42)] text-[rgba(200,192,181,0.58)] hover:border-[rgba(194,154,69,0.42)] hover:text-cream'
                        }`}
                      >
                        <AirplaneTilt size={16} aria-hidden="true" />
                        Airport transfer
                      </button>
                      <button
                        type="button"
                        onClick={addStop}
                        disabled={journey.stops.length >= 2}
                        className="flex min-h-10 items-center gap-2 rounded-lg border border-[rgba(116,111,105,0.42)] px-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[rgba(200,192,181,0.58)] transition-colors hover:border-[rgba(194,154,69,0.42)] hover:text-cream disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        <Plus size={14} weight="bold" aria-hidden="true" />
                        Add stop
                      </button>
                    </div>
                  </div>

                  {journey.airportMode !== 'none' || journey.stops.length > 0 ? (
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {journey.airportMode !== 'none' ? (
                        <label className="text-[11px] font-medium text-[rgba(200,192,181,0.72)]">
                          Airport service
                          <select
                            value={journey.airportMode}
                            onChange={(event) =>
                              updateJourney('airportMode', event.target.value as AirportMode)
                            }
                            className={modalControlClass}
                          >
                            <option value="pickup">Airport pick-up</option>
                            <option value="dropoff">Airport drop-off</option>
                          </select>
                        </label>
                      ) : null}

                      {journey.airportMode !== 'none' ? (
                        <label className="text-[11px] font-medium text-[rgba(200,192,181,0.72)]">
                          Flight Number{journey.airportMode === 'dropoff' ? ' · Optional' : ''}
                          <input
                            type="text"
                            value={journey.flightNumber}
                            onChange={(event) =>
                              updateJourney('flightNumber', event.target.value.toUpperCase())
                            }
                            placeholder="Example: BA578"
                            className={`${modalControlClass} ${
                              journeyErrors.flightNumber ? 'border-[var(--error)]' : ''
                            }`}
                            autoComplete="off"
                            aria-invalid={Boolean(journeyErrors.flightNumber)}
                          />
                          {journeyErrors.flightNumber ? (
                            <span className="mt-1 block text-[10px] text-[var(--error)]" role="alert">
                              {journeyErrors.flightNumber}
                            </span>
                          ) : null}
                        </label>
                      ) : null}

                      {journey.stops.map((stop, index) => (
                        <label
                          key={index}
                          className="relative text-[11px] font-medium text-[rgba(200,192,181,0.72)]"
                        >
                          Stop {index + 1}
                          <span className="relative block">
                            <input
                              type="text"
                              value={stop}
                              onChange={(event) => updateStop(index, event.target.value)}
                              placeholder="Address or hotel..."
                              className={`${modalControlClass} pr-11 ${
                                journeyErrors[`stop-${index}`] ? 'border-[var(--error)]' : ''
                              }`}
                              aria-invalid={Boolean(journeyErrors[`stop-${index}`])}
                            />
                            <button
                              type="button"
                              onClick={() => removeStop(index)}
                              aria-label={`Remove stop ${index + 1}`}
                              className="absolute right-2 top-[calc(50%+4px)] grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-[rgba(200,192,181,0.45)] hover:bg-[rgba(184,92,86,0.12)] hover:text-[var(--error)]"
                            >
                              <X size={14} aria-hidden="true" />
                            </button>
                          </span>
                          {journeyErrors[`stop-${index}`] ? (
                            <span className="mt-1 block text-[10px] text-[var(--error)]" role="alert">
                              {journeyErrors[`stop-${index}`]}
                            </span>
                          ) : null}
                        </label>
                      ))}
                    </div>
                  ) : null}
                </section>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-[rgba(116,111,105,0.24)] pt-4">
                  <button
                    type="button"
                    onClick={() => setDialogOpen(false)}
                    className="flex min-h-11 items-center gap-2 px-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[rgba(200,192,181,0.58)] transition-colors hover:text-cream"
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Edit route
                  </button>
                  <button
                    type="submit"
                    className="flex min-h-11 items-center gap-2 rounded-lg bg-gold px-5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--background)] transition-colors hover:bg-gold-light sm:px-7"
                  >
                    Continue
                    <ArrowRight size={16} weight="bold" aria-hidden="true" />
                  </button>
                </div>
              </form>
            ) : transferStep === 2 ? (
              <form onSubmit={continueToReview} noValidate>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  <Counter
                    label="Passengers"
                    hint="Including children"
                    value={passengers.passengers}
                    min={1}
                    max={12}
                    onChange={(value) => updatePassengers('passengers', value)}
                    icon={<UsersThree size={21} weight="light" aria-hidden="true" />}
                  />
                  <Counter
                    label="Large luggage"
                    hint="Suitcases"
                    value={passengers.largeLuggage}
                    onChange={(value) => updatePassengers('largeLuggage', value)}
                    icon={<SuitcaseRolling size={21} weight="light" aria-hidden="true" />}
                  />
                  <Counter
                    label="Hand luggage"
                    hint="Cabin bags"
                    value={passengers.handLuggage}
                    onChange={(value) => updatePassengers('handLuggage', value)}
                    icon={<Bag size={21} weight="light" aria-hidden="true" />}
                  />
                </div>

                <section className="mt-5 border-t border-[rgba(116,111,105,0.22)] pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-[13px] font-semibold text-cream">Travelling with a child?</h3>
                      <p className="mt-1 text-[11px] text-[rgba(200,192,181,0.48)]">
                        We will confirm the suitable seat with you.
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={passengers.childSeat}
                      onClick={() => updatePassengers('childSeat', !passengers.childSeat)}
                      className={`flex min-h-10 items-center gap-2 rounded-full border px-3.5 text-[11px] font-medium transition-colors ${
                        passengers.childSeat
                          ? 'border-[rgba(194,154,69,0.62)] bg-[rgba(194,154,69,0.13)] text-gold-light'
                          : 'border-[rgba(116,111,105,0.46)] text-[rgba(200,192,181,0.58)] hover:text-cream'
                      }`}
                    >
                      <Baby size={18} aria-hidden="true" />
                      {passengers.childSeat ? 'Child seat added' : 'Add child seat'}
                    </button>
                  </div>

                  {passengers.childSeat ? (
                    <div className="mt-3 grid grid-cols-1 gap-3 rounded-lg border border-[rgba(194,154,69,0.22)] bg-[rgba(194,154,69,0.04)] p-3.5 sm:grid-cols-[160px_1fr_1fr]">
                      <Counter
                        label="Child seats"
                        hint="Required seats"
                        value={passengers.childSeats}
                        min={1}
                        max={3}
                        onChange={(value) => updatePassengers('childSeats', value)}
                        icon={<Baby size={20} weight="light" aria-hidden="true" />}
                      />
                      <label className="text-[11px] font-medium text-[rgba(200,192,181,0.72)]">
                        Child’s age
                        <select
                          value={passengers.childAge}
                          onChange={(event) => updatePassengers('childAge', event.target.value)}
                          className={`${modalControlClass} ${
                            passengerErrors.childAge ? 'border-[var(--error)]' : ''
                          }`}
                          aria-invalid={Boolean(passengerErrors.childAge)}
                        >
                          <option value="">Select age</option>
                          {Array.from({ length: 13 }, (_, age) => (
                            <option key={age} value={`${age} year${age === 1 ? '' : 's'}`}>
                              {age === 0 ? 'Under 1 year' : `${age} year${age === 1 ? '' : 's'}`}
                            </option>
                          ))}
                        </select>
                        {passengerErrors.childAge ? (
                          <span className="mt-1 block text-[10px] text-[var(--error)]" role="alert">
                            {passengerErrors.childAge}
                          </span>
                        ) : null}
                      </label>
                      <label className="text-[11px] font-medium text-[rgba(200,192,181,0.72)]">
                        Approx. weight · Optional
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={passengers.childWeight}
                          onChange={(event) => updatePassengers('childWeight', event.target.value)}
                          placeholder="kg"
                          className={modalControlClass}
                        />
                      </label>
                    </div>
                  ) : null}
                </section>

                <section className="mt-5 border-t border-[rgba(116,111,105,0.22)] pt-5">
                  <h3 className="text-[13px] font-semibold text-cream">Optional extras</h3>
                  <p className="mt-1 text-[11px] text-[rgba(200,192,181,0.48)]">
                    Requested extras are confirmed by our team before your journey.
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {extras.map((extra) => {
                      const ExtraIcon = extra.icon
                      const selected = passengers.extras.includes(extra.id)
                      return (
                        <button
                          key={extra.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => toggleExtra(extra.id)}
                          className={`relative flex min-h-[74px] flex-col items-start justify-between rounded-lg border p-3 text-left transition-colors ${
                            selected
                              ? 'border-[rgba(194,154,69,0.65)] bg-[rgba(194,154,69,0.1)] text-gold-light'
                              : 'border-[rgba(116,111,105,0.42)] bg-[rgba(13,14,15,0.38)] text-[rgba(200,192,181,0.68)] hover:border-[rgba(194,154,69,0.42)] hover:text-cream'
                          }`}
                        >
                          <ExtraIcon size={19} weight="light" aria-hidden="true" />
                          <span className="mt-2 text-[10px] font-medium leading-tight sm:text-[11px]">
                            {extra.label}
                          </span>
                          {selected ? (
                            <span className="absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-full bg-gold text-[var(--background)]">
                              <Check size={10} weight="bold" aria-hidden="true" />
                            </span>
                          ) : null}
                        </button>
                      )
                    })}
                  </div>

                  {passengers.extras.includes('equipment') ? (
                    <label className="mt-3 block text-[11px] font-medium text-[rgba(200,192,181,0.72)]">
                      What special equipment do you need?
                      <input
                        type="text"
                        value={passengers.specialEquipment}
                        onChange={(event) => updatePassengers('specialEquipment', event.target.value)}
                        placeholder="Example: wheelchair, ski bags, golf clubs..."
                        className={`${modalControlClass} ${
                          passengerErrors.specialEquipment ? 'border-[var(--error)]' : ''
                        }`}
                        aria-invalid={Boolean(passengerErrors.specialEquipment)}
                      />
                      {passengerErrors.specialEquipment ? (
                        <span className="mt-1 block text-[10px] text-[var(--error)]" role="alert">
                          {passengerErrors.specialEquipment}
                        </span>
                      ) : null}
                    </label>
                  ) : null}

                  {specialRequestOpen ? (
                    <label className="mt-3 block text-[11px] font-medium text-[rgba(200,192,181,0.72)]">
                      Special requests · Optional
                      <textarea
                        value={passengers.specialRequests}
                        onChange={(event) => updatePassengers('specialRequests', event.target.value)}
                        placeholder="Tell us anything that would make your journey more comfortable..."
                        rows={3}
                        maxLength={500}
                        className="mt-2 w-full resize-none rounded-lg border border-[rgba(116,111,105,0.5)] bg-[rgba(13,14,15,0.65)] px-3.5 py-3 text-[14px] text-cream transition-colors focus:border-gold focus:outline-none"
                      />
                    </label>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSpecialRequestOpen(true)}
                      className="mt-3 flex min-h-10 items-center gap-2 text-[11px] font-medium text-gold transition-colors hover:text-gold-light"
                    >
                      <Plus size={14} weight="bold" aria-hidden="true" />
                      Add a special request
                    </button>
                  )}
                </section>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-[rgba(116,111,105,0.24)] pt-4">
                  <button
                    type="button"
                    onClick={() => setTransferStep(1)}
                    className="flex min-h-11 items-center gap-2 px-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[rgba(200,192,181,0.58)] transition-colors hover:text-cream"
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Trip details
                  </button>
                  <button
                    type="submit"
                    className="flex min-h-11 items-center gap-2 rounded-lg bg-gold px-5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--background)] transition-colors hover:bg-gold-light sm:px-7"
                  >
                    Continue to review
                    <ArrowRight size={16} weight="bold" aria-hidden="true" />
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={sendBookingRequest} noValidate>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.92fr]">
                  <section>
                    <h3 className="text-[13px] font-semibold text-cream">Contact details</h3>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      <label className="text-[11px] font-medium text-[rgba(200,192,181,0.72)]">
                        Full Name
                        <span className="relative block">
                          <User
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gold"
                            size={18}
                            aria-hidden="true"
                          />
                          <input
                            type="text"
                            value={contact.fullName}
                            onChange={(event) => updateContact('fullName', event.target.value)}
                            placeholder="Your full name"
                            autoComplete="name"
                            className={`${modalControlClass} pl-10 ${
                              contactErrors.fullName ? 'border-[var(--error)]' : ''
                            }`}
                            aria-invalid={Boolean(contactErrors.fullName)}
                          />
                        </span>
                        {contactErrors.fullName ? (
                          <span className="mt-1 block text-[10px] text-[var(--error)]" role="alert">
                            {contactErrors.fullName}
                          </span>
                        ) : null}
                      </label>

                      <label className="text-[11px] font-medium text-[rgba(200,192,181,0.72)]">
                        Email
                        <span className="relative block">
                          <EnvelopeSimple
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gold"
                            size={18}
                            aria-hidden="true"
                          />
                          <input
                            type="email"
                            value={contact.email}
                            onChange={(event) => updateContact('email', event.target.value)}
                            placeholder="name@example.com"
                            autoComplete="email"
                            className={`${modalControlClass} pl-10 ${
                              contactErrors.email ? 'border-[var(--error)]' : ''
                            }`}
                            aria-invalid={Boolean(contactErrors.email)}
                          />
                        </span>
                        {contactErrors.email ? (
                          <span className="mt-1 block text-[10px] text-[var(--error)]" role="alert">
                            {contactErrors.email}
                          </span>
                        ) : null}
                      </label>

                      <label className="text-[11px] font-medium text-[rgba(200,192,181,0.72)] sm:col-span-2 lg:col-span-1">
                        Phone / WhatsApp
                        <span className="relative block">
                          <Phone
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gold"
                            size={18}
                            aria-hidden="true"
                          />
                          <input
                            type="tel"
                            value={contact.phone}
                            onChange={(event) => updateContact('phone', event.target.value)}
                            placeholder="+39 ..."
                            autoComplete="tel"
                            className={`${modalControlClass} pl-10 ${
                              contactErrors.phone ? 'border-[var(--error)]' : ''
                            }`}
                            aria-invalid={Boolean(contactErrors.phone)}
                          />
                        </span>
                        {contactErrors.phone ? (
                          <span className="mt-1 block text-[10px] text-[var(--error)]" role="alert">
                            {contactErrors.phone}
                          </span>
                        ) : null}
                      </label>
                    </div>

                    <fieldset className="mt-4">
                      <legend className="text-[11px] font-medium text-[rgba(200,192,181,0.72)]">
                        Preferred contact method
                      </legend>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {([
                          { id: 'whatsapp' as const, label: 'WhatsApp', icon: WhatsappLogo },
                          { id: 'email' as const, label: 'Email', icon: EnvelopeSimple },
                        ]).map((method) => {
                          const MethodIcon = method.icon
                          const selected = contact.preferredContact === method.id
                          return (
                            <button
                              key={method.id}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => updateContact('preferredContact', method.id)}
                              className={`flex min-h-11 items-center justify-center gap-2 rounded-lg border text-[11px] font-medium transition-colors ${
                                selected
                                  ? 'border-[rgba(194,154,69,0.62)] bg-[rgba(194,154,69,0.1)] text-gold-light'
                                  : 'border-[rgba(116,111,105,0.42)] text-[rgba(200,192,181,0.58)] hover:text-cream'
                              }`}
                            >
                              <MethodIcon size={17} aria-hidden="true" />
                              {method.label}
                            </button>
                          )
                        })}
                      </div>
                    </fieldset>
                  </section>

                  <section>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[13px] font-semibold text-cream">Booking summary</h3>
                      <button
                        type="button"
                        onClick={() => setDialogOpen(false)}
                        className="text-[10px] font-semibold uppercase tracking-[0.1em] text-gold hover:text-gold-light"
                      >
                        Edit journey
                      </button>
                    </div>
                    <dl className="mt-3 rounded-lg border border-[rgba(116,111,105,0.38)] bg-[rgba(13,14,15,0.42)] px-3.5 py-1">
                      <ReviewRow label="Pick-up" value={journey.pickup} />
                      <ReviewRow label="Destination" value={journey.destination} />
                      <ReviewRow label="Departure" value={readableDateTime(journey.dateTime)} />
                      <ReviewRow
                        label="Journey"
                        value={journey.journeyType === 'return' ? 'Return' : 'One way'}
                      />
                      {journey.returnDateTime ? (
                        <ReviewRow label="Return" value={readableDateTime(journey.returnDateTime)} />
                      ) : null}
                      {journey.stops.length > 0 ? (
                        <ReviewRow label="Stops" value={journey.stops.join(' · ')} />
                      ) : null}
                      {journey.airportMode !== 'none' ? (
                        <ReviewRow
                          label="Airport"
                          value={`${journey.airportMode === 'pickup' ? 'Pick-up' : 'Drop-off'}${
                            journey.flightNumber ? ` · ${journey.flightNumber}` : ''
                          }`}
                        />
                      ) : null}
                      <ReviewRow label="Passengers" value={String(passengers.passengers)} />
                      <ReviewRow
                        label="Luggage"
                        value={`${passengers.largeLuggage} large · ${passengers.handLuggage} hand`}
                      />
                      <ReviewRow label="Child seat" value={childSeatSummary} />
                      {selectedExtras ? <ReviewRow label="Extras" value={selectedExtras} /> : null}
                      {passengers.specialEquipment ? (
                        <ReviewRow label="Equipment" value={passengers.specialEquipment} />
                      ) : null}
                      {passengers.specialRequests ? (
                        <ReviewRow label="Requests" value={passengers.specialRequests} />
                      ) : null}
                    </dl>

                    <div className="mt-3 flex items-center justify-between rounded-lg border border-[rgba(194,154,69,0.32)] bg-[rgba(194,154,69,0.07)] px-4 py-3">
                      <span className="text-[10px] uppercase tracking-[0.12em] text-[rgba(218,171,45,0.7)]">
                        Price
                      </span>
                      <span className="text-[13px] font-semibold text-gold-light">To be confirmed</span>
                    </div>
                  </section>
                </div>

                {journey.airportMode === 'pickup' ? (
                  <div className="mt-5 flex gap-3 rounded-lg border border-[rgba(194,154,69,0.24)] bg-[rgba(194,154,69,0.05)] p-3.5">
                    <Info className="mt-0.5 shrink-0 text-gold" size={18} aria-hidden="true" />
                    <p className="text-[11px] leading-relaxed text-[rgba(200,192,181,0.62)]">
                      We monitor your flight using the flight number provided. Complimentary waiting
                      time begins after the flight’s actual arrival. Additional waiting beyond the
                      included period may be charged according to our waiting policy.
                    </p>
                  </div>
                ) : null}

                <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-[rgba(116,111,105,0.28)] p-3.5">
                  <input
                    type="checkbox"
                    checked={contact.consent}
                    onChange={(event) => updateContact('consent', event.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--gold)]"
                    aria-invalid={Boolean(contactErrors.consent)}
                  />
                  <span>
                    <span className="block text-[11px] leading-relaxed text-[rgba(236,230,219,0.72)]">
                      I agree to be contacted about this request and accept the Terms and Privacy
                      Policy.
                    </span>
                    {contactErrors.consent ? (
                      <span className="mt-1 block text-[10px] text-[var(--error)]" role="alert">
                        {contactErrors.consent}
                      </span>
                    ) : null}
                  </span>
                </label>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-[rgba(116,111,105,0.24)] pt-4">
                  <button
                    type="button"
                    onClick={() => setTransferStep(2)}
                    className="flex min-h-11 items-center gap-2 px-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[rgba(200,192,181,0.58)] transition-colors hover:text-cream"
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex min-h-11 items-center gap-2 rounded-lg bg-gold px-5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--background)] transition-colors hover:bg-gold-light sm:px-7"
                  >
                    Send Booking Request
                    <ArrowRight size={16} weight="bold" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </dialog>
    </>
  )
}
