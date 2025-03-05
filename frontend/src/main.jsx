import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.jsx'
import './i18n.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback="Loading...">
    <App />
    </Suspense>
    
  </StrictMode>,
)
