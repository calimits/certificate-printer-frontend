import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './components/AuthContext/index.jsx'

createRoot(document.getElementById('root')).render(
  //<StrictMode> {/*poner el strict mode despues*/}
    <AuthProvider>
      <App />
    </AuthProvider>
  //</StrictMode>
)
