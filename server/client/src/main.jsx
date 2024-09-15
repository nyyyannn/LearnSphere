import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' //expecting default export, hence no curly braces.
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/*App.jsx file*/}
  </StrictMode>,
)
