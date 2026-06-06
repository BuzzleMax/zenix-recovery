import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import ErrorBoundary from '@components/ui/ErrorBoundary'
import { AuthProvider } from '@context/AuthContext'
import './styles/globals.css'
import './styles/index.css'
import { router } from './lib/router'
import Toaster from '@components/ui/Toaster'

// Add startup error logging
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('ServiceWorker registration successful')
      },
      (err) => {
        console.log('ServiceWorker registration failed: ', err)
      }
    )
  })
}

console.log('Starting Zenix Recovery application...')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
)
