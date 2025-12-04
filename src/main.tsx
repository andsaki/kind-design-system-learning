import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './design-system/theme'
import { ToastProvider } from './design-system/components'

// Axe accessibility testing (development only)
if (import.meta.env.DEV) {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider defaultTheme="light">
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
