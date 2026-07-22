import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { GlobalStateProvider } from './context/GlobalStateContext.jsx';
import { TourProvider } from './context/TourContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GlobalStateProvider>
          <TourProvider>
            <App />
          </TourProvider>
        </GlobalStateProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
