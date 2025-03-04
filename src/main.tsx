
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { mockOnlyDbService } from './services/database/MockOnlyDatabaseService';

// Initialize the mock database with sample data
mockOnlyDbService.initializeWithSampleData();

// Utiliser une méthode plus robuste pour obtenir l'élément racine
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
