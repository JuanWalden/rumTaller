
import React from 'react';
import ReactDOM from 'react-dom/client';
import RumTallerApp from './App'; // Default export from App.tsx

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to. Make sure an element with id='root' exists in your index.html.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RumTallerApp />
  </React.StrictMode>
);
