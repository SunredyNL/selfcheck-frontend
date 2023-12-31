import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import UserContextProvider from "./contexts/UserContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
