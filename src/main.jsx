// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthContext.jsx";
import PlayerContextProvider from "./Context/PlayerContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <PlayerContextProvider>
        <App />
      </PlayerContextProvider>
    </AuthProvider>
  </BrowserRouter>
  // </StrictMode>,
);
