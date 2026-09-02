import { useEffect, useState } from 'react'
import { navigationItems } from '../config/navigation'
import type { Page } from '../types/navigation'

const logoImage = '/images/brand/easy-lux-logo-wordmark-transparent-v3.png'

interface HeaderProps {
  currentPage: Page
  navigate: (page: Page) => void
}

export default function Header({ currentPage, navigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateHeaderState = () => setScrolled(window.scrollY > 64)

    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })

    return () => window.removeEventListener('scroll', updateHeaderState)
  }, [])

  const headerElevated = scrolled || menuOpen

  const navigateAndClose = (page: Page) => {
    setMenuOpen(false)
    navigate(page)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[filter] duration-500 ${
        headerElevated ? 'drop-shadow-[0_10px_28px_rgba(0,0,0,0.2)]' : ''
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-[108px] transition-opacity duration-500 lg:h-[120px] ${
          headerElevated ? 'opacity-0' : 'opacity-100'
        } bg-[linear-gradient(180deg,rgba(7,10,11,0.91)_0%,rgba(7,10,11,0.86)_34%,rgba(7,10,11,0.73)_50%,rgba(7,10,11,0.52)_62%,rgba(7,10,11,0.3)_71%,rgba(7,10,11,0.13)_78%,rgba(7,10,11,0.04)_83%,rgba(7,10,11,0)_87%,rgba(7,10,11,0)_100%)]`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-[96px] transition-opacity duration-500 lg:h-[104px] ${
          headerElevated ? 'opacity-100' : 'opacity-0'
        } bg-[linear-gradient(180deg,rgba(13,14,15,0.96)_0%,rgba(13,14,15,0.92)_58%,rgba(13,14,15,0.72)_76%,rgba(13,14,15,0.3)_90%,rgba(13,14,15,0)_100%)] backdrop-blur-[9px]`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute inset-x-0 top-[71px] h-px bg-[rgba(194,154,69,0.16)] transition-opacity duration-500 lg:top-[75px] ${
          headerElevated ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
      <div
        className={`relative z-10 mx-auto flex w-full max-w-[1340px] items-center justify-between gap-5 px-4 transition-[height] duration-500 sm:px-7 lg:w-[92%] lg:px-0 ${
          headerElevated ? 'h-[72px] lg:h-[76px]' : 'h-[78px] lg:h-[86px]'
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => navigateAndClose('home')}
          className="group flex h-full shrink-0 items-center text-left"
          aria-label="Easy Lux — Home"
        >
          <img
            src={logoImage}
            alt="Easy Lux"
            className={`translate-y-0.5 object-contain drop-shadow-[0_3px_8px_rgba(0,0,0,0.72)] transition-[width,height,transform] duration-500 group-hover:scale-[1.03] ${
              headerElevated
                ? 'h-[56px] w-[56px] sm:h-[60px] sm:w-[60px] lg:h-[62px] lg:w-[62px]'
                : 'h-[62px] w-[62px] sm:h-[66px] sm:w-[66px] lg:h-[72px] lg:w-[72px]'
            }`}
          />
          <span className="ml-3 hidden border-l border-[var(--border-gold)] pl-3 text-[8px] font-medium uppercase leading-[1.65] tracking-[0.19em] text-[rgba(236,230,219,0.72)] sm:block lg:ml-3.5 lg:pl-3.5">
            <span className="block whitespace-nowrap">Your driver</span>
            <span className="block whitespace-nowrap">Around Italy</span>
          </span>
        </button>

        {/* Right-aligned desktop navigation */}
        <div className="ml-auto hidden items-center justify-end gap-5 xl:flex xl:gap-7">
          <nav className="flex items-center gap-5 2xl:gap-6" aria-label="Main navigation">
            {navigationItems.map((link) => (
              <button
                key={link.page}
                onClick={() => navigateAndClose(link.page)}
                aria-current={currentPage === link.page ? 'page' : undefined}
                className={`relative whitespace-nowrap py-2.5 text-[12px] tracking-[0.02em] [text-shadow:0_2px_7px_rgba(0,0,0,0.92)] transition-colors duration-200 2xl:text-[13px] ${
                  currentPage === link.page
                    ? 'text-cream after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold'
                    : 'text-[rgba(236,230,219,0.68)] hover:text-cream'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => navigateAndClose('contact')}
            className="flex shrink-0 items-center gap-2 rounded-sm border border-[rgba(194,154,69,0.72)] bg-[rgba(13,14,15,0.16)] px-5 py-3 text-[12px] font-medium tracking-[0.02em] text-gold-light shadow-[0_4px_18px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-gold hover:text-[var(--background)] 2xl:px-6"
          >
            Book Your Ride
          </button>
        </div>

        {/* Tablet/mobile actions */}
        <div className="ml-auto flex items-center justify-end gap-4 xl:hidden">
          <button
            onClick={() => navigateAndClose('contact')}
            className="hidden items-center rounded-sm border border-[rgba(194,154,69,0.72)] bg-[rgba(13,14,15,0.16)] px-5 py-3 text-[12px] font-medium tracking-[0.02em] text-gold-light backdrop-blur-[2px] transition-all duration-300 hover:bg-gold hover:text-[var(--background)] sm:flex"
          >
            Book Your Ride
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex w-7 flex-col gap-1.5 py-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span
              className={`block h-px bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
            />
            <span
              className={`block h-px bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-px bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        inert={!menuOpen}
        className={`relative z-10 overflow-hidden transition-all duration-300 xl:hidden ${
          menuOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-[rgba(194,154,69,0.1)] bg-[var(--background-secondary)] px-6 py-4">
          {navigationItems.map((link) => (
            <button
              key={link.page}
              onClick={() => {
                navigateAndClose(link.page)
              }}
              aria-current={currentPage === link.page ? 'page' : undefined}
              className={`border-b border-[rgba(194,154,69,0.08)] py-3 text-left text-[15px] transition-colors last:border-0 ${
                currentPage === link.page
                  ? 'text-gold'
                  : 'text-[rgba(200,192,181,0.7)] hover:text-cream'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              navigateAndClose('contact')
            }}
            className="mt-3 border border-gold py-3 text-[13px] font-medium tracking-[0.02em] text-gold transition-all duration-300 hover:bg-gold hover:text-[var(--background)]"
          >
            Book Your Ride
          </button>
        </nav>
      </div>
    </header>
  )
}
