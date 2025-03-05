
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Obtenir l'élément racine de manière robuste
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL || '/'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
