import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { StoreProvider } from './app/StoreProvider'

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Root element #root not found')
}

createRoot(rootEl).render(
  <StoreProvider>
    <App />
  </StoreProvider>,
)
