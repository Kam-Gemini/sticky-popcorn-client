import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { UserProvider } from './contexts/UserContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@flaticon/flaticon-uicons/css/all/all.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
        <App />
    </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
