import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);

window.onerror = function (message, source, lineno, colno, error) {
  console.error("Erro global capturado:", message, source, lineno, colno, error);
};

window.addEventListener("error", function (e) {
  if (e.message && e.message.includes("Script error")) {
    console.warn("Ignorado erro de script externo:", e.message);
    e.preventDefault();  // Isso impede o erro de quebrar a tela
  }
});
