import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import ToastNotification from "./components/ToastNotification/ToastNotification";
import './reset.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <ToastNotification>
      <App />
    </ToastNotification>
  </BrowserRouter>
</StrictMode>,
)
