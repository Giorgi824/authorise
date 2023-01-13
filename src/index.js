import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserContext } from "./context/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContext.Provider value="hello from context">
      <App />
    </UserContext.Provider>
  </React.StrictMode>
);
