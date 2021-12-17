import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { store } from "@store";
import { GlobalStyle } from "@theme";

import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Router>
        <GlobalStyle />
        <App />
      </Router>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
