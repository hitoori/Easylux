import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import { pagePath, type Page } from './types/navigation'

const pageIds = new Set<Page>(['home', 'services', 'about', 'faq', 'contact'])

const getPageFromLocation = (): Page => {
  const pathPage = window.location.pathname.replace(/^\/+|\/+$/g, '') as Page
  if (pageIds.has(pathPage)) return pathPage
  const hashPage = window.location.hash.slice(1) as Page
  return pageIds.has(hashPage) ? hashPage : 'home'
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromLocation)

  useEffect(() => {
    // Home copy is page-specific; retain the existing metadata on other views.
    document.title = currentPage === 'home'
      ? 'Venice Private Transfers & Chauffeur Service | Easy Lux'
      : currentPage === 'services'
        ? 'Private Transfer Prices in Venice & Italy | Easy Lux'
        : currentPage === 'about'
          ? 'About Easy Lux | A Personal Approach to Private Travel'
          : currentPage === 'faq'
            ? 'Easy Lux FAQ | Booking, Pick-ups & Water Taxi'
            : 'Easy Lux Transfer | Private Chauffeur Italy'
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute(
      'content',
      currentPage === 'home'
        ? 'Private transfers in Venice, airport pick-ups and coordinated Water Taxi connections. Plan your journey in Italy and Europe with Easy Lux.'
        : currentPage === 'services'
          ? 'Compare private transfer prices from Venice and request chauffeur travel across Italy and Europe, including airports, Dolomites, seaside and cruise ports.'
          : currentPage === 'about'
            ? 'Meet the young couple behind Easy Lux. A personal approach to private chauffeur travel, guided by professionalism, punctuality and care.'
            : currentPage === 'faq'
              ? 'Answers about booking, prices, pick-ups, luggage and Venice Water Taxi connections.'
              : 'Private chauffeur services and airport transfers across Italy and Europe.',
    )
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = `https://easyluxtransfer.com${pagePath(currentPage)}`
  }, [currentPage])

  useEffect(() => {
    const syncPageFromLocation = () => setCurrentPage(getPageFromLocation())
    window.addEventListener('hashchange', syncPageFromLocation)
    window.addEventListener('popstate', syncPageFromLocation)
    return () => {
      window.removeEventListener('hashchange', syncPageFromLocation)
      window.removeEventListener('popstate', syncPageFromLocation)
    }
  }, [])

  const navigate = (page: Page) => {
    setCurrentPage(page)
    window.history.pushState({ page }, '', pagePath(page))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} />
      case 'services':
        return <Services navigate={navigate} />
      case 'about':
        return <About navigate={navigate} />
      case 'faq':
        return <FAQ navigate={navigate} />
      case 'contact':
        return <Contact navigate={navigate} />
      default:
        return <Home navigate={navigate} />
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-cream">
      <Header currentPage={currentPage} navigate={navigate} />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />
    </div>
  )
}
