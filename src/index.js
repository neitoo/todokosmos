import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './test/reportWebVitals';
import AuthProvider from './context/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
