import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' //expecting default export, hence no curly braces.
import './index.css'
import { AuthProvider } from './store/Auth.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <AuthProvider> 
    <StrictMode>
      <App /> {/*App.jsx file*/}
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          bodyClassName="toastBody"
      />
    </StrictMode>
  </AuthProvider>,
)
