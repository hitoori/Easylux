import type { ComponentType, SVGProps } from 'react'
import {
  Add,
  ArrowLeft as PikaArrowLeft,
  ArrowRight as PikaArrowRight,
  BagCarryBag,
  CalendarCalendar,
  CheckTick,
  ClockClock,
  CrossCross,
  Map as PikaMap,
  MessageDefault,
  MinusMinus,
  SearchRegular,
  Send02,
} from 'pikaicons'

export type PikaIconProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  size?: number | string
}

const wrap = (Icon: ComponentType<SVGProps<SVGSVGElement>>) => {
  return function PikaIcon({ size = 24, className = '', ...props }: PikaIconProps) {
    return <Icon width={size} height={size} className={`pika-icon ${className}`.trim()} {...props} />
  }
}

export const ArrowLeft = wrap(PikaArrowLeft)
export const ArrowRight = wrap(PikaArrowRight)
export const Bag = wrap(BagCarryBag)
export const Calendar = wrap(CalendarCalendar)
export const Check = wrap(CheckTick)
export const Clock = wrap(ClockClock)
export const Close = wrap(CrossCross)
export const Map = wrap(PikaMap)
export const Message = wrap(MessageDefault)
export const Minus = wrap(MinusMinus)
export const Plus = wrap(Add)
export const Search = wrap(SearchRegular)
export const Send = wrap(Send02)
