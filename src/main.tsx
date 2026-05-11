import React from 'react'
import ReactDOM from 'react-dom/client'
// @ts-ignore
import App from './App' // Ensure this matches your file name (App.tsx or App)

ReactDOM.createRoot(document.getElementById('root')!).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(App, null),
  ),
)