import { useEffect, useRef, useState } from 'react'
import type { JourneyService } from './serviceData'
import './floating-service-nav.css'

const items = [
  ['airport', 'Airport & City'],
  ['hourly', 'By the Hour'],
  ['water-taxi', 'Water Taxi'],
  ['europe', 'Italy & Europe'],
  ['mountains', 'Mountains'],
  ['coast', 'Seaside'],
  ['cruise', 'Cruise Ports'],
] as const
const number = (index: number) => String(index + 1).padStart(2, '0')

export default function FloatingServiceNav({ activeSection, onSelect }: {
  activeSection: JourneyService | null
  onSelect: (id: string) => void
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const desktopClose = useRef<HTMLButtonElement>(null)
  const desktopReopen = useRef<HTMLButtonElement>(null)
  const mobileOpen = useRef<HTMLButtonElement>(null)
  const mobileReopen = useRef<HTMLButtonElement>(null)
  const activeIndex = Math.max(0, items.findIndex(([id]) => id === activeSection))

  useEffect(() => {
    const element = dialog.current
    if (open && element && !element.open) element.showModal()
    if (!open && element?.open) element.close()
  }, [open])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1101px)')
    const closeOnDesktop = () => { if (media.matches) setOpen(false) }
    media.addEventListener('change', closeOnDesktop)
    return () => media.removeEventListener('change', closeOnDesktop)
  }, [])

  const hide = () => {
    setOpen(false)
    setCollapsed(true)
    requestAnimationFrame(() => {
      (window.matchMedia('(min-width: 1101px)').matches ? desktopReopen : mobileReopen).current?.focus()
    })
  }
  const restore = () => {
    setCollapsed(false)
    requestAnimationFrame(() => {
      (window.matchMedia('(min-width: 1101px)').matches ? desktopClose : mobileOpen).current?.focus()
    })
  }
  const choose = (id: string) => {
    setOpen(false)
    onSelect(id)
  }
  const links = () => items.map(([id, label], index) =>
    <button key={id} type="button" className="fsn-link"
      aria-current={index === activeIndex ? 'location' : undefined}
      aria-label={`Go to ${label}`} onClick={() => choose(id)}>
      <span className="fsn-number" aria-hidden="true">{number(index)}</span>
      <span>{label}</span>
    </button>)

  return <>
    <nav className="fsn fsn-desktop" aria-label="Services navigation">
      {collapsed
        ? <button ref={desktopReopen} type="button" className="fsn-reopen" onClick={restore} aria-label="Show services navigation">SERVICES <span aria-hidden="true">←</span></button>
        : <><button ref={desktopClose} className="fsn-close" type="button" onClick={hide} aria-label="Hide services navigation">×</button>
          <div className="fsn-list">{links()}</div></>}
    </nav>
    <nav className="fsn fsn-mobile" aria-label="Services navigation" hidden={open}>
      {collapsed
        ? <button ref={mobileReopen} className="fsn-reopen" type="button" onClick={() => { setCollapsed(false); setOpen(true) }} aria-label="Open services navigation" aria-haspopup="dialog">SERVICES <span aria-hidden="true">←</span></button>
        : <><button ref={mobileOpen} className="fsn-current" type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open} aria-controls="floating-services-dialog" aria-label={`Open services navigation. Current section: ${items[activeIndex][1]}`}>
          <span className="fsn-number">{number(activeIndex)}</span><span>{items[activeIndex][1]}</span><span aria-hidden="true">↑</span>
        </button><button className="fsn-close" type="button" onClick={hide} aria-label="Hide services navigation">×</button></>}
    </nav>
    <dialog ref={dialog} id="floating-services-dialog" className="fsn fsn-dialog" aria-labelledby="floating-services-title"
      onCancel={() => setOpen(false)} onClose={() => setOpen(false)}
      onClick={event => { if (event.target === event.currentTarget) setOpen(false) }}>
      <div className="fsn-dialog-content">
        <div className="fsn-dialog-heading"><h2 id="floating-services-title">SERVICES</h2><button type="button" className="fsn-close" onClick={hide} aria-label="Close and hide services navigation">×</button></div>
        <nav className="fsn-list" aria-label="Choose a service">{links()}</nav>
      </div>
    </dialog>
  </>
}
