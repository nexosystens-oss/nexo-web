import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; 
import App from "./App";
import './main.css'

if (window.location.pathname === "/nexo-web/") {
  window.location.href = "/nexo-web/#/";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);