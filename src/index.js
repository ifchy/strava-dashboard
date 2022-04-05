import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import { DarkModeContextProvider } from "./features/context/darkReducer";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
