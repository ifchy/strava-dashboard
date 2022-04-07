import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../App";
import store from "../app/store";
import React from "react";

test("renders table", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  screen.getByText("Workout Name");
});
test("renders widget", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // screen.getByText("Past Workouts");
  screen.getByText("This Month vs. Last Month");
});
