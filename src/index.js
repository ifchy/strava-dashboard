import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import { DarkModeContextProvider } from "./features/context/darkReducer";
import { createRoot } from "react-dom/client";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  // <StrictMode>
  <DarkModeContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </DarkModeContextProvider>
  // </StrictMode>
);
