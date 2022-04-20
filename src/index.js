import React from 'react';
import './index.css';
import App from './App';
import { StrictMode } from 'react';
// ✅ now importing from react-dom/client
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);

