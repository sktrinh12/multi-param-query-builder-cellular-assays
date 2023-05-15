import React from 'react'
import ReactDOM from 'react-dom/client'
import AppVersion from './AppVersionTag'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <AppVersion />
  </React.StrictMode>
)
