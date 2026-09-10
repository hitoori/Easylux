import { useState } from 'react'
import { ArrowRight, Close, Minus, Plus, Search } from '../components/PikaIcons'
import type { Page } from '../types/navigation'
import { faqTopics } from './faqData'
import './faq.css'

export default function FAQ({ navigate }: { navigate: (page: Page) => void }) {
  const [topic, setTopic] = useState('booking')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<string | null>('book')
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const groups = faqTopics.filter(group => topic === 'all' || group.id === topic).map(group => ({
    ...group,
    questions: group.questions.filter(item => words.every(word => `${item.q} ${item.a} ${group.title}`.toLowerCase().includes(word))),
  })).filter(group => group.questions.length)
  const count = groups.reduce((total, group) => total + group.questions.length, 0)
  const title = words.length ? 'Search results' : topic === 'all' ? 'All questions' : faqTopics.find(group => group.id === topic)!.title
  const chooseTopic = (id: string) => { setTopic(id); setQuery(''); setOpen(id === 'booking' ? 'book' : null) }
  const search = (value: string) => { setQuery(value); setTopic('all'); setOpen(null) }

  return <div className="faq-page">
    <section className="fq-intro fq-shell" aria-labelledby="faq-title">
      <h1 id="faq-title">Questions before<br />you travel.</h1>
      <div className="fq-search-area"><p>Find practical answers about booking, airport pick-ups and travelling with Easy Lux.</p>
        <div className="fq-search" role="search"><Search size={23} aria-hidden="true" /><input type="search" aria-label="Search questions or keywords" placeholder="Search questions or keywords" value={query} onChange={event=>search(event.target.value)} />{query && <button type="button" aria-label="Clear search" onClick={()=>search('')}><Close size={19} aria-hidden="true" /></button>}</div>
      </div>
    </section>

    <section className="fq-directory fq-shell" aria-label="Frequently asked questions">
      <nav className="fq-topics" aria-label="FAQ topics"><h2>Browse by topic</h2><div className="fq-topic-buttons">{[{id:'all',title:'All questions'}, ...faqTopics].map(item=><button type="button" key={item.id} aria-pressed={topic === item.id} onClick={()=>chooseTopic(item.id)}>{item.title}</button>)}</div></nav>
      <div className="fq-results"><div className="fq-results-heading"><h2>{title}</h2><span role="status" aria-live="polite">{count} {count === 1 ? 'question' : 'questions'}</span></div>
        {groups.map(group=><div key={group.id} className="fq-group">{topic === 'all' && <h3 className="fq-group-title">{group.title}</h3>}{group.questions.map(item=><article className="fq-question" key={item.id}><h3><button type="button" id={`fq-question-${item.id}`} aria-expanded={open === item.id} aria-controls={`fq-answer-${item.id}`} onClick={()=>setOpen(open === item.id ? null : item.id)}>{item.q}{open === item.id ? <Minus size={22} aria-hidden="true" /> : <Plus size={22} aria-hidden="true" />}</button></h3><div id={`fq-answer-${item.id}`} role="region" aria-labelledby={`fq-question-${item.id}`} hidden={open !== item.id}><p>{item.a}</p></div></article>)}</div>)}
        {!count && <div className="fq-empty"><h3>No matching questions.</h3><p>Try a shorter keyword, such as “luggage”, “flight” or “payment”. You can also contact us about your trip.</p><button type="button" onClick={()=>search('')}>Show all questions <ArrowRight size={17} aria-hidden="true" /></button></div>}
      </div>
    </section>

    <section className="fq-contact" aria-labelledby="fq-contact-title"><div className="fq-shell"><div><h2 id="fq-contact-title">Need help with your journey?</h2><p>Tell us about your plans. We will help with the details.</p></div><button type="button" onClick={()=>navigate('contact')}>Contact Easy Lux <ArrowRight size={22} aria-hidden="true" /></button></div></section>
  </div>
}
