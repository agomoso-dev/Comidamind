import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

createRoot(document.getElementById('root')).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <App />
          </BrowserRouter>              
  </LocalizationProvider>
  ,
)

