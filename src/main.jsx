import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { JournalApp } from './JournalApp.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter
} from "react-router-dom";
import './styles.css'
import { AppTheme } from './theme/AppTheme.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      {/* <StrictMode> */}
      <JournalApp />
      {/* </StrictMode> */}
  </BrowserRouter>
)
