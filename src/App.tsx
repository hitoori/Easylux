import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Tours from './pages/Tours'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import type { Page } from './types/navigation'

const pageIds = new Set<Page>(['home', 'services', 'tours', 'about', 'faq', 'contact'])

const getPageFromHash = (): Page => {
  const hashPage = window.location.hash.slice(1) as Page
  return pageIds.has(hashPage) ? hashPage : 'home'
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash)

  useEffect(() => {
    // Home copy is page-specific; retain the existing metadata on other views.
    document.title = currentPage === 'home'
      ? 'Venice Private Transfers & Chauffeur Service | Easy Lux'
      : currentPage === 'services'
        ? 'Private Transfer Prices in Venice & Italy | Easy Lux'
        : 'Easy Lux Transfer | Private Chauffeur Italy'
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute(
      'content',
      currentPage === 'home'
        ? 'Private transfers in Venice, airport pick-ups and coordinated Water Taxi connections. Plan your journey in Italy and Europe with Easy Lux.'
        : currentPage === 'services'
          ? 'Compare private transfer prices from Venice and request chauffeur travel across Italy and Europe, including airports, Dolomites, seaside and cruise ports.'
          : 'Private chauffeur services, airport transfers and curated tours across Italy.',
    )
  }, [currentPage])

  useEffect(() => {
    const syncPageFromLocation = () => setCurrentPage(getPageFromHash())
    window.addEventListener('hashchange', syncPageFromLocation)
    window.addEventListener('popstate', syncPageFromLocation)
    return () => {
      window.removeEventListener('hashchange', syncPageFromLocation)
      window.removeEventListener('popstate', syncPageFromLocation)
    }
  }, [])

  const navigate = (page: Page) => {
    setCurrentPage(page)
    const nextHash = page === 'home' ? '' : `#${page}`
    const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`
    window.history.pushState({ page }, '', nextUrl)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} />
      case 'services':
        return <Services navigate={navigate} />
      case 'tours':
        return <Tours navigate={navigate} />
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
