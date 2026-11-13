import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import ToastNotification from "./components/ToastNotification/ToastNotification";
import "./reset.css";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastNotification>
          <App />
        </ToastNotification>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
