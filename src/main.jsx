import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './assets/stylesheets/index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)
