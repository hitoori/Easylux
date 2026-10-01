import { useEffect, type RefObject } from 'react'

/** Enhance offscreen content only; server-rendered and unsupported views stay visible. */
export function useScrollReveal(rootRef: RefObject<HTMLElement | null>, selector: string) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches || !('IntersectionObserver' in window)) return

    const items = Array.from(root.querySelectorAll<HTMLElement>(selector))
    const reveal = (item: HTMLElement) => {
      item.dataset.motionState = 'visible'
      observer.unobserve(item)
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target as HTMLElement) })
    }, { threshold: 0, rootMargin: '0px 0px 80px 0px' })

    // Batch layout reads before writes to avoid reflow for each section.
    const measurements = items.map(item => ({ item, rect: item.getBoundingClientRect() }))
    measurements.forEach(({ item, rect }) => {
      item.style.setProperty('--reveal-delay', `${Math.min(140, Math.max(0, Number(item.dataset.revealDelay) || 0))}ms`)
      const visible = rect.top < window.innerHeight + 80 && rect.bottom > 0
      item.dataset.motionState = visible ? 'visible' : 'pending'
      if (!visible) observer.observe(item)
    })

    const showAll = () => { if (motion.matches) items.forEach(reveal) }
    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return
      // Keyboard users must never land on a transparent control or ancestor.
      items.forEach(item => {
        if (item.dataset.motionState === 'pending' && item.contains(event.target as Node)) {
          item.dataset.motionImmediate = 'true'
          item.style.setProperty('--reveal-delay', '0ms')
          reveal(item)
        }
      })
    }
    motion.addEventListener('change', showAll)
    root.addEventListener('focusin', revealFocused)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', showAll)
      root.removeEventListener('focusin', revealFocused)
      items.forEach(item => {
        delete item.dataset.motionState
        delete item.dataset.motionImmediate
        item.style.removeProperty('--reveal-delay')
      })
    }
  }, [rootRef, selector])
}
