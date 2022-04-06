import { render, screen } from "@testing-library/react";
import App from "./App";
import Widget from "./components/widgets/Widget";
import Home from "./pages/home/Home";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/work/i);
  expect(linkElement).toBeInTheDocument();
});
