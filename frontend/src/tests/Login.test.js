import { render, screen } from "@testing-library/react";
import Login from "../components/Login";
import { BrowserRouter as Router } from "react-router-dom";

it("Testing if there are E-mail placeholders in Login Page", () => {
  const { component } = render(
    <Router>
      <Login></Login>
    </Router>
  );
  expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
});
