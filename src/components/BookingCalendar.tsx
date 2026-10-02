import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'

interface Props {
  selected: Date
  month: Date
  min?: Date
  onSelect: (day: Date) => void
  onMonthChange: (month: Date) => void
}
export default function BookingCalendar({ selected, month, min, onSelect, onMonthChange }: Props) {
  return <DayPicker mode="single" required selected={selected} onSelect={onSelect} month={month} onMonthChange={onMonthChange} startMonth={min} disabled={min ? { before: min } : undefined} showOutsideDays fixedWeeks autoFocus navLayout="around" />
}
