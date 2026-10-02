import { useEffect, useRef, useState, type ReactNode } from 'react'
import { CookieSettingsButton, addressSuggestionsConfigured } from '../components/CookieConsent'
import { company } from '../config/company'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './privacy-policy.css'

const chapters = [
  ['controller', 'Who is responsible'],
  ['information', 'Information we collect'],
  ['purposes', 'How and why we use it'],
  ['recipients', 'Who receives your data'],
  ['transfers', 'International processing'],
  ['retention', 'How long we keep it'],
  ['cookies', 'Cookies & your choices'],
  ['rights', 'Your privacy rights'],
  ['passengers', 'Children & other passengers'],
  ['security', 'Security & automated decisions'],
  ['updates', 'Changes & contact'],
] as const

function Chapter({ index, children }: { index: number; children: ReactNode }) {
  const [id, title] = chapters[index]
  return <section id={`privacy-${id}`} aria-labelledby={`privacy-${id}-title`} className="privacy-chapter">
    <h2 id={`privacy-${id}-title`}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{title}</h2>
    {children}
  </section>
}

export default function Cookies() {
  const pageRef = useRef<HTMLElement>(null)
  const [activeChapter, setActiveChapter] = useState<string>(chapters[0][0])
  useEffect(() => {
    const sections = Array.from(pageRef.current?.querySelectorAll<HTMLElement>('.privacy-chapter') ?? [])
    if (!sections.length) return
    let observer: IntersectionObserver | undefined
    const observeChapters = () => {
      observer?.disconnect()
      const marker = Math.min(window.innerHeight - 1, (parseFloat(getComputedStyle(sections[0]).scrollMarginTop) || 125) + 1)
      const updateActive = () => {
        let index = 0
        for (let i = 0; i < sections.length; i++) {
          if (sections[i].getBoundingClientRect().top > marker) break
          index = i
        }
        setActiveChapter(chapters[index][0])
      }
      updateActive()
      // A thin reading line below the header also works for chapters taller than the viewport.
      observer = new IntersectionObserver(updateActive, {
        rootMargin: `-${marker}px 0px -${Math.max(0, window.innerHeight - marker - 1)}px 0px`,
        threshold: 0,
      })
      sections.forEach(section => observer!.observe(section))
    }
    observeChapters()
    window.addEventListener('resize', observeChapters)
    return () => { observer?.disconnect(); window.removeEventListener('resize', observeChapters) }
  }, [])
  useScrollReveal(pageRef, '.privacy-chapter')
  return <article ref={pageRef} className="privacy-page">
    <header className="privacy-heading">
      <p className="privacy-eyebrow">EASY LUX · YOUR PRIVACY</p>
      <h1>Privacy Policy</h1>
      <p className="privacy-intro">Your journey is personal. Here is how we use your information when you browse, request a quote or travel with Easy Lux.</p>
      <p className="privacy-updated">Last updated <time dateTime="2026-10-02">2 October 2026</time> <span aria-hidden="true">·</span> Italy &amp; European Union</p>
      <ul className="privacy-highlights" aria-label="Privacy at a glance"><li>Information for your journey</li><li>No advertising trackers on this website</li><li>Optional address suggestions are your choice</li></ul>
    </header>
    <div className="privacy-layout">
      <aside className="privacy-contents">
        <nav aria-label="Privacy Policy contents"><p className="privacy-eyebrow">IN THIS POLICY</p><ol>{chapters.map(([id, title], index) => <li key={id}><a href={`#privacy-${id}`} aria-current={activeChapter === id ? 'location' : undefined}><span className="privacy-nav-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span className="privacy-nav-label">{title}</span></a></li>)}</ol></nav>
        <div className="privacy-contact"><span>Privacy enquiries</span><a href={`mailto:${company.email}`}>{company.email}</a></div>
      </aside>
      <div className="privacy-body">
        <Chapter index={0}>
          <p>The data controller is <strong>{company.legalName}</strong>, operating under the service name <strong>Easy Lux Transfer</strong>. The controller decides why and how personal data is used for this website and its transfer, chauffeur and private day-trip services.</p>
          <dl className="privacy-company"><div><dt>Registered office</dt><dd>{company.registeredOffice}</dd></div><div><dt>Partita IVA / VAT number</dt><dd>IT{company.vatNumber}</dd></div><div><dt>Email for privacy requests</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div><div><dt>Telephone</dt><dd>{company.phones.map((phone, index) => <span key={phone.tel}>{index > 0 && ' / '}<a href={phone.tel}>{phone.display}</a></span>)}</dd></div></dl>
          <p>This notice covers easyluxtransfer.com, enquiries through our forms, and the related email, telephone or WhatsApp correspondence. It explains processing under the <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679">General Data Protection Regulation (EU) 2016/679 (GDPR)</a> and the <a href="https://www.garanteprivacy.it/codice">Italian Personal Data Protection Code, Legislative Decree 196/2003, as amended</a>.</p>
        </Chapter>
        <Chapter index={1}>
          <ul><li><strong>Contact information:</strong> your name, email, telephone number and preferred contact method.</li><li><strong>Journey details:</strong> pick-up and destination addresses, dates and times, stops, return arrangements, duration, itinerary, passenger and luggage counts, and the extras you request.</li><li><strong>Travel connections:</strong> flight number and arrival time, ship or cruise-terminal details, and any requested Venice water taxi connection.</li><li><strong>Child seats:</strong> the number of seats and children’s ages, only when you request them. We do not ask for children’s names or identity documents in the website form.</li><li><strong>Correspondence:</strong> the messages you send, quotes, request references and arrangements made with our team. If a booking proceeds, necessary invoicing and payment records may be collected separately.</li><li><strong>Technical information:</strong> IP address, browser and device information, request time and technical connection or delivery logs handled by the website and communication providers.</li></ul>
          <p>Unsent form entries stay in the page’s memory during your visit; our forms do not save your contact or itinerary details in browser local storage. Submitting a request sends its contents to our team and sends you an acknowledgement email. When optional Google address suggestions are enabled, your typed address query is sent to Google before submission, as explained below.</p>
          <p>Please provide only information needed for your journey. Do not include card details, passport copies, medical records or other sensitive personal information in free-text fields. Contact us first if an essential travel requirement needs a separate privacy arrangement.</p>
        </Chapter>
        <Chapter index={2}>
          <dl className="privacy-purpose-list"><div><dt>Quotes, booking requests &amp; journeys</dt><dd>We use your contact and travel details to answer your request, check availability, agree your quote, organise pick-up, communicate changes and deliver the agreed service. The basis is steps at your request before a contract, or performance of the contract — GDPR Article 6(1)(b).</dd></div><div><dt>Invoicing &amp; legal obligations</dt><dd>Where required, we process business and payment records to meet accounting, tax and other legal obligations — Article 6(1)(c).</dd></div><div><dt>Security, general enquiries &amp; disputes</dt><dd>We use necessary information to keep the website and communications secure, prevent misuse, answer general enquiries and establish or defend legal claims. These are legitimate interests — Article 6(1)(f), subject to your rights.</dd></div><div><dt>Optional address suggestions</dt><dd>Google address suggestions require your consent — Article 6(1)(a). You can withdraw it in Cookie settings.</dd></div></dl>
          <p>The form’s contact acknowledgement concerns your request; it does not subscribe you to advertising or a newsletter. We do not use the request form for marketing subscriptions.</p>
          <p>Fields marked optional can be left blank. Without the essential contact, route and timing information, we may be unable to answer or arrange the requested service. A telephone number is needed if you choose WhatsApp as your contact method. Optional address suggestions are never required to book.</p>
        </Chapter>
        <Chapter index={3}>
          <p>Your information is used by our team and, where necessary for the service, the following recipients:</p>
          <ul><li><strong>Assigned drivers and transport partners:</strong> the contact and journey details needed for pick-up, luggage and requested child seats. For a coordinated water taxi, the boat operator may receive your contact number, boarding point and timing.</li><li><strong>Cloudflare:</strong> website hosting, delivery and technical processing of submitted requests. See <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare’s privacy information</a>.</li><li><strong>Resend:</strong> delivery of your request to our business inbox and of the acknowledgement to your email address. This includes the contact details and request contents shown in those messages. See <a href="https://resend.com/legal/privacy-policy">Resend’s privacy information</a>.</li><li><strong>Email and communication providers:</strong> our email inbox and your chosen communication channel handle our correspondence. Google provides the Gmail inbox listed above; <a href="https://policies.google.com/privacy">Google’s privacy policy</a> applies to its services. If you choose WhatsApp, its processing is explained in the <a href="https://www.whatsapp.com/legal/privacy-policy-eea">WhatsApp EEA privacy policy</a>.</li><li><strong>Google Places, if you enable it:</strong> address queries and technical connection information for suggestions.</li><li><strong>Professional advisers and public authorities:</strong> only where necessary for accounting, legal obligations or claims.</li></ul>
          <p>Providers processing data on our behalf act under the applicable data-processing arrangements. Transport operators and communication providers may also have their own legal obligations or act as independent controllers for their own services. We do not sell personal data or publish your booking details.</p>
        </Chapter>
        <Chapter index={4}>
          <p>Our providers operate internationally, so information may be processed outside the European Economic Area, including in the United States. Resend identifies the United States as its primary processing location. Cloudflare operates a global network; Google and WhatsApp also describe international processing in their policies.</p>
          <p>Transfers must have a lawful basis under GDPR Chapter V, such as a relevant adequacy decision or appropriate safeguards including the European Commission’s Standard Contractual Clauses. <a href="https://resend.com/legal/dpa">Resend’s data-processing addendum</a> describes its clauses; <a href="https://www.cloudflare.com/cloudflare-customer-dpa/">Cloudflare’s data-processing addendum</a> describes its transfer arrangements. These published documents do not mean that all data stays in Italy or the EU.</p>
          <p>You can ask us for information about the safeguards applicable to your data, relevant recipients and a copy or explanation of the applicable contractual safeguards, with confidential details protected where necessary.</p>
        </Chapter>
        <Chapter index={5}>
          <p>Retention depends on the record and why it is needed. A cookie choice and a completed booking do not have the same retention period.</p>
          <dl className="privacy-purpose-list"><div><dt>Unconfirmed enquiries &amp; quotes</dt><dd>We keep correspondence while answering your request, while the quote or arrangements remain relevant, and while necessary to resolve related follow-up. The criteria are closure of the enquiry, expiry of the quote, outstanding correspondence and any applicable legal duty or claim.</dd></div><div><dt>Completed journeys</dt><dd>Operational details are kept while the service and any related support, payment or dispute remain open. Records necessary for legal obligations or claims may need to be retained afterwards; unrelated optional details should not be kept merely because a business record is retained.</dd></div><div><dt>Accounting records</dt><dd>Where Italian accounting obligations apply, records and invoices are generally retained for 10 years from the last entry under Article 2220 of the Italian Civil Code. Tax assessments or an ongoing dispute may require longer retention.</dd></div><div><dt>Browser preference</dt><dd>The privacy choice is valid for 180 days. It becomes invalid after that period or if you delete it in your browser.</dd></div><div><dt>Technical and delivery records</dt><dd>Retention follows the relevant hosting, security, email or communication service’s lifecycle and account settings, limited by the operational purpose and any legal requirements. Provider copies and backups have their own deletion cycles.</dd></div></dl>
          <p>Ask us about the retention criteria applicable to a particular request or record. Deletion of data that is no longer needed must also account for copies in email and communication systems; clearing your browser does not delete a request already sent to us.</p>
        </Chapter>
        <Chapter index={6}>
          <h3>Essential preference storage</h3>
          <p>We use a browser local-storage entry called <code>easylux-consent-v1</code> to remember whether you allow address suggestions and when you made that choice. It is a preference record, not an advertising profile, and remains valid for 180 days. You can remove it using your browser settings. Essential preference storage does not require consent for optional tracking.</p>
          <h3>Optional Google address suggestions</h3>
          <p>{addressSuggestionsConfigured ? 'Address suggestions are available only after you enable them.' : 'Google address suggestions are not currently configured. If made available, they will load only after you enable them.'} When enabled, Google Places loads as you type at least three characters in an address field. Google receives the typed address query and connection information, including your IP address, and may use cookies or identifiers under its own policies. Choosing a suggestion can retrieve address, place type and location details.</p>
          <p>You can always enter an address manually. This feature does not ask for your device’s live location. Read <a href="https://policies.google.com/privacy">Google’s privacy policy</a> and <a href="https://policies.google.com/technologies/cookies">Google’s cookie information</a> for its processing.</p>
          <h3>Change your choice</h3>
          <p>Optional services are disabled by default. The privacy notice lets you keep essential storage only, accept the available optional service, or manage preferences. If none is configured, accepting does not enable additional services. Cookie settings remain available in the footer and below.</p>
          <p>Withdrawing permission after Google has loaded refreshes the page to prevent further use; unsent form entries will be cleared. This does not undo processing already carried out lawfully. Existing third-party cookies can also be removed in your browser.</p>
          <div className="privacy-cookie-action"><CookieSettingsButton /></div>
          <p>The website’s own code uses no advertising pixels or visitor-analytics trackers. Photographs and fonts are served locally. Hosting and security services can still process technical connection data. External social, WhatsApp and email services are opened when you choose their links and follow their own privacy practices.</p>
        </Chapter>
        <Chapter index={7}>
          <p>Depending on the circumstances, you can request access and a copy of your data, correction, erasure, restriction, or portability of information provided for consent- or contract-based automated processing. You can object to processing based on legitimate interests. These rights are subject to the conditions and exceptions in the GDPR; required legal records cannot always be deleted immediately.</p>
          <p>You can withdraw consent at any time where processing relies on it, without affecting earlier lawful processing. Changing optional cookie preferences does not cancel a journey; cancellation is handled separately.</p>
          <p>Email <a href={`mailto:${company.email}`}>{company.email}</a> with your request and, if useful, your booking reference. We may ask for proportionate information to verify identity. Requests are normally free, and the response deadline is one month; where law permits an extension for complexity or volume, we must tell you within that first month.</p>
          <p>You may complain to the <a href="https://www.garanteprivacy.it/diritti/come-agire-per-tutelare-i-tuoi-dati-personali/reclamo">Garante per la protezione dei dati personali</a>, the Italian supervisory authority, or the competent authority where you live, work or consider a violation occurred. You do not have to contact us first. The Garante also provides <a href="https://www.garanteprivacy.it/i-miei-diritti">guidance on exercising your rights</a>.</p>
        </Chapter>
        <Chapter index={8}>
          <p>The forms are intended for adults arranging travel. Child-seat information is provided by an adult responsible for the booking and is used to arrange an appropriate seat, not to advertise to or profile children.</p>
          <p>If you book for someone else, share this notice with them and provide only information needed to arrange the service. We may need to contact the passenger directly about pick-up. Please avoid including personal details of other passengers unless they are necessary.</p>
        </Chapter>
        <Chapter index={9}>
          <p>The website submits requests over HTTPS in production and uses input validation and measures against accidental duplicate submissions. Requests are processed through the website’s hosting service and email delivery provider; the website does not create a customer account or collect card credentials through the enquiry form.</p>
          <p>Access and handling must be limited to people and providers who need the information for the stated purposes. No communication method can be guaranteed completely secure. If you suspect a privacy issue, contact us promptly.</p>
          <p>We do not use these forms for profiling or solely automated decisions with legal or similarly significant effects. Automatic acknowledgement emails confirm receipt only; availability, the final quote and booking arrangements are handled by our team.</p>
        </Chapter>
        <Chapter index={10}>
          <p>We may update this notice when services, providers or legal requirements change. The date at the top identifies this version. If a change requires a new consent choice, the relevant optional processing must wait for that choice.</p>
          <p>For questions about this notice, your request or your privacy rights, contact <a href={`mailto:${company.email}`}>{company.email}</a> or write to {company.legalName}, {company.registeredOffice}.</p>
        </Chapter>
      </div>
    </div>
  </article>
}
