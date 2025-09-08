import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";   // ✅ keep if file is in src/styles/

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
