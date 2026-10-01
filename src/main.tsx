import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './fonts.css'
import './index.css'
import { CookieConsentProvider } from './components/CookieConsent'

const root = document.getElementById('root')!
const app = <React.StrictMode><CookieConsentProvider><App /></CookieConsentProvider></React.StrictMode>
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app)
else ReactDOM.createRoot(root).render(app)
