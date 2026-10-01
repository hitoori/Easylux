import { CookieSettingsButton } from './CookieConsent'
import OptimizedImage from './OptimizedImage'
import { FacebookLogo, InstagramLogo, TiktokLogo } from '@phosphor-icons/react'
import type { MouseEvent } from 'react'
import { pagePath, type Page } from '../types/navigation'
import { company } from '../config/company'
import './footer.css'

const socialChannels = [
  { label: 'Facebook', href: company.social.facebook, Icon: FacebookLogo },
  { label: 'Instagram', href: company.social.instagram, Icon: InstagramLogo },
  { label: 'TikTok', href: company.social.tiktok, Icon: TiktokLogo },
]

const services = ['Airport Transfer', 'Venice Water Taxi', 'Chauffeur by the Hour', 'Mountains & Seaside', 'Italy & Europe']
const navigation: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Services & Prices', page: 'services' },
  { label: 'About Us', page: 'about' },
  { label: 'FAQ', page: 'faq' },
  { label: 'Contact', page: 'contact' },
]

export default function Footer({ navigate }: { navigate: (page: Page) => void }) {
  const followPageLink = (event: MouseEvent<HTMLAnchorElement>, page: Page) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(page)
  }

  return (
    <footer className="home-footer">
      <div className="home-footer-main">
        <div className="home-footer-brand">
          <a href={pagePath('home')} className="home-footer-logo" onClick={event => followPageLink(event, 'home')} aria-label="Easy Lux — Home">
            <OptimizedImage src={publicAsset('images/brand/easy-lux-logo-wordmark.png')} alt="Easy Lux" width={80} height={88} loading="lazy" />
            <span className="home-footer-tagline">Your driver<br />Around Italy</span>
          </a>
          <h2>Private Chauffeur</h2>
          <p>Private transfers from Venice across Italy and Europe.<br />Airport pick-ups, hourly chauffeurs and journeys on request.</p>
          <div className="home-footer-social" aria-label="Easy Lux social media">
            {socialChannels.map(({ label, href, Icon }) => href
              ? <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} — Easy Lux`}><Icon size={21} weight="regular" aria-hidden="true" /></a>
              : <button key={label} type="button" disabled aria-label={`${label} — link coming soon`} title={`${label} — link coming soon`}><Icon size={21} weight="regular" aria-hidden="true" /></button>
            )}
          </div>
        </div>
        <nav aria-labelledby="home-footer-services">
          <h3 id="home-footer-services">Services</h3>
          <ul>{services.map((service) => <li key={service}><a href={pagePath('services')} onClick={event => followPageLink(event, 'services')}>{service}</a></li>)}</ul>
        </nav>
        <nav aria-labelledby="home-footer-navigation">
          <h3 id="home-footer-navigation">Navigation</h3>
          <ul>{navigation.map(({ label, page }) => <li key={page}><a href={pagePath(page)} onClick={event => followPageLink(event, page)}>{label}</a></li>)}</ul>
        </nav>
        <div className="home-footer-contact">
          <h3>Contact</h3>
          <dl>
            <div><dt>Phone & WhatsApp</dt><dd className="home-footer-phones">{company.phones.map((phone, index) => <span key={phone.tel}>{index > 0 && <span className="home-footer-phone-divider" aria-hidden="true">/</span>}<a href={phone.tel}>{phone.display}</a></span>)}</dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
            <div><dt>Operational base</dt><dd>{company.serviceArea}</dd></div>
            <div><dt>Registered office</dt><dd>{company.registeredOffice}</dd></div>
          </dl>
        </div>
      </div>
      <div className="home-footer-bottom">
        <p>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> Easy Lux Transfer. All rights reserved.</p>
        <div className="home-footer-legal" aria-label="Legal and privacy information">
          <a href={pagePath('cookies')} onClick={event => followPageLink(event, 'cookies')}>Privacy & Cookies</a>
          <button type="button" disabled title="Document not yet published">Terms</button>
          <CookieSettingsButton />
        </div>
      </div>
    </footer>
  )
}
import { publicAsset } from '../lib/publicAsset'
