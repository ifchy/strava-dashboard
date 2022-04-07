import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../App";
import store from "../app/store";
import React from "react";
import { Router, Route, Routes, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Me from "../pages/me/Me";
import Single from "../pages/single/Single";
import New from "../pages/new/New";
import Home from "../pages/home/Home";

test("navigate to me page and render following count", async () => {
  render(
    <Provider store={store}>
      <App>
        <Router>
          <Routes>
            <Route path="/athlete" element={<Me />} />
          </Routes>
        </Router>
      </App>
    </Provider>
  );
  const user = userEvent.setup();
  expect(screen.getByText("Me")).toBeInTheDocument();
  await user.click(screen.getByText("Me"));
  expect(screen.getByText(/following/i)).toBeInTheDocument();
});

test("navigate to add workout page and render the form", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Provider store={store}>
        <New />
        <Home />
      </Provider>
    </MemoryRouter>
  );
  const user = userEvent.setup();
  await user.click(screen.getByTestId("test"));
  expect(screen.getByText(/add activity/i)).toBeInTheDocument();
});
