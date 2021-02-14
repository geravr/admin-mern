import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

// Component
import LoginPage from "./LoginPage";

beforeEach(() =>
  render(
    <Router>
      <LoginPage />
    </Router>
  )
);

describe("Cuando LoginPage está montado", () => {
  test("Debe existir el título, campos: usuario y contraseña, botón login", async () => {
    const title = screen.getByText(/Iniciar sesión/i);
    const userField = screen.getByLabelText(/Usuario/i);
    const passwordField = screen.getByLabelText(/Contraseña/i);
    const loginButton = screen.getByRole("button", { name: "Ingresar" });

    expect(title).toBeInTheDocument();
    expect(userField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});

describe("Cuando el usuario envía el formulario sin valores", () => {
  test("Deben mostrarse los mensajes de validación de campos", async () => {
    const submitButton = screen.getByRole("button", { name: "Ingresar" });

    expect(
      screen.queryByText(/Ingresa un nombre de usuario!/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Ingresa una contraseña!/i)
    ).not.toBeInTheDocument();

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/Ingresa un nombre de usuario!/i)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/Ingresa una contraseña!/i)
      ).toBeInTheDocument();
    });
  });
});
