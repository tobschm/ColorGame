import React from "react";
import ReactDOM from 'react-dom/client'
import { HashRouter, BrowserRouter } from 'react-router-dom';
import App from "./App";

const Router = window?.process?.versions?.electron ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);