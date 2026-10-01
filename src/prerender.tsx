import { renderToString } from 'react-dom/server'
import App from './App'
import { CookieConsentProvider } from './components/CookieConsent'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Cookies from './pages/Cookies'
import { metadataTags, pageMetadata, siteOrigin } from './config/pageMetadata'
import { pagePath, type Page } from './types/navigation'

export const pages = Object.keys(pageMetadata) as Page[]
const noop = () => {}
const components = { home: Home, services: Services, about: About, faq: FAQ, contact: Contact, cookies: Cookies }
const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!)
export function renderPage(page: Page) {
  const Component = components[page]
  const content = renderToString(<CookieConsentProvider><App initialPage={page} prerenderedContent={<Component navigate={noop} />} /></CookieConsentProvider>)
  const head = `<title>${escape(pageMetadata[page].title)}</title>\n<link rel="canonical" href="${siteOrigin}${pagePath(page)}" />\n` + Object.entries(metadataTags(page)).map(([name, value]) => `<meta ${name.startsWith('og:') ? 'property' : 'name'}="${name}" content="${escape(value)}" />`).join('\n')
  return { content, head }
}
