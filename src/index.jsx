// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Optional: You can add your CSS here
import App from './App'; // Main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Makes sure React renders the app into the root div in index.html
);
