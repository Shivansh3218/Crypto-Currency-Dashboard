import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ContextPrimary } from "./Components/Convertor/ContextPrimary";
import { ContextSecondary } from "./Components/Convertor/ContextSecondary";
import { SearchProvider } from "./Components/Contexts/searchContext";
import { BrowserRouter } from "react-router-dom";

import "antd/dist/antd.css";
import "./index.css";
import Routers from "./Routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextSecondary>
        <ContextPrimary>
          <SearchProvider>
            <App />
          </SearchProvider>
        </ContextPrimary>
      </ContextSecondary>
    </BrowserRouter>
  </React.StrictMode>
);
