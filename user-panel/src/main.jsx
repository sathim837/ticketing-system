import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Provider } from "react-redux";
import { store } from "./app/Store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    {/* <App /> */}
    {/* <Dashboard /> */}
  </StrictMode>,
);
