import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from "@react-oauth/google"
import reportWebVitals from './reportWebVitals';
import { UserIdProvider } from './contextApi/userIdProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
const googleClientId = '351106628573-1qeql63rb36u1836g4qlbo9ifao607ur.apps.googleusercontent.com';
root.render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <React.StrictMode>
      < UserIdProvider>
        <App />
      </UserIdProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
reportWebVitals();
