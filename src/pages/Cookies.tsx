import { CookieSettingsButton, addressSuggestionsConfigured } from '../components/CookieConsent'
import { company } from '../config/company'
import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Cookies() {
  const pageRef = useRef<HTMLElement>(null)
  useScrollReveal(pageRef, ':scope > h2, :scope > p, :scope > div')
  return <article ref={pageRef} className="cookie-policy mx-auto max-w-[850px] px-6 pb-24 pt-36 text-[15px] leading-[1.85]">
    <p className="text-gold">WEBSITE PRIVACY</p>
    <h1 className="font-display mt-4 text-[42px] leading-tight">Privacy & Cookies</h1>
    <p className="mt-6">Last updated: 1 October 2026. This notice covers browser storage and optional external address suggestions on the Easy Lux Transfer website. For questions, contact <a className="text-gold underline" href={`mailto:${company.email}`}>{company.email}</a>.</p>
    <h2 className="mt-10 text-[24px]">Essential preference storage</h2>
    <p>We use local storage named <code>easylux-consent-v1</code> to remember whether you allow optional address suggestions, together with the time you made your choice. The choice expires after 180 days. This essential preference is stored in your browser; it is not used for advertising or visitor analytics. It can be removed through your browser settings.</p>
    <h2 className="mt-10 text-[24px]">Optional Google address suggestions</h2>
    <p>{addressSuggestionsConfigured ? 'Address suggestions are available only if you enable them.' : 'Google address suggestions are currently not configured. If enabled by the website operator in future, they will require your choice before loading.'} If allowed, the Google Places service loads when you type at least three characters into an address field. It sends your address query and connection information, including your IP address, to Google. Google may use its own cookies or identifiers under its policies. You can always enter addresses manually without loading Google Places.</p>
    <p>For information about Google’s processing, retention and international transfers, read <a className="text-gold underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google’s privacy policy</a> and <a className="text-gold underline" href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">Google’s cookie information</a>.</p>
    <h2 className="mt-10 text-[24px]">Change or withdraw your choice</h2>
    <p>On your first visit, the privacy notice lets you accept all available services, keep essential storage only, or manage your preferences. If no optional services are configured, both choices save your preference without enabling additional services. The notice appears again when your stored choice expires or is removed.</p>
    <p>Use Cookie settings in the footer at any time. Optional services are disabled by default. Rejecting them does not prevent browsing or manual address entry. Withdrawing permission after Google has loaded refreshes the page, clearing unsent form entries. It prevents further use on this site; you may also clear any existing third-party cookies using your browser settings.</p>
    <div className="mt-5 inline-block border border-gold px-5 py-3 text-gold"><CookieSettingsButton /></div>
    <h2 className="mt-10 text-[24px]">Other website resources</h2>
    <p>Photographs and fonts are served locally. This website currently uses no advertising pixels or analytics trackers. External social media, WhatsApp and email links open only when you follow them; their destinations have their own privacy practices.</p>
  </article>
}
