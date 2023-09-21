import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './assets/stylesheets/index.scss'
import { RecipeContextProvider } from './context/ContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecipeContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </RecipeContextProvider>
)
