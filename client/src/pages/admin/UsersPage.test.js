import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Component
import UsersPage from "./UsersPage";

beforeEach(() => render(<UsersPage />));

describe("Cuando UsersPage está montado", () => {
  test("Debe mostrarse un spinner durante la petición, y posteriormente un listado de usuarios", async () => {
    expect(screen.getByRole("button", { name: /Nuevo usuario/i }));

    expect(screen.queryAllByTestId("list-spinner")[1]).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("list-users")).toBeInTheDocument();
    });
  });
});

describe("Cuando el usuario da clic en el botón 'Nuevo usuario'", () => {
  test("Se muestra un modal con formulario para agregar un nuevo usuario", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("list-users")).toBeInTheDocument();
    });

    const newUserButton = screen.getByRole("button", {
      name: /Nuevo usuario/i,
    });

    userEvent.click(newUserButton);

    expect(screen.getByTestId("add-user-modal")).toBeInTheDocument();

    // Espera a que se consuma la api que contiene los permisos
    fireEvent.mouseDown(
      screen.getByTestId("permissions-select").firstElementChild
    );
    await waitFor(() => {
      expect(screen.queryByTestId("permission-value")).toBeInTheDocument();
    });
  });
});

describe("Cuando el usuario da clic en el botón 'Editar'", () => {
  test("Se muestra un modal con formulario para editar un usuario", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("list-users")).toBeInTheDocument();
    });

    const editUserButton = await waitFor(() => screen.getByRole("button", { name: /Editar/i }));

    userEvent.click(editUserButton);

    expect(screen.getByTestId("edit-user-modal")).toBeInTheDocument();

    // Espera que el skeleton deje de mostrarse
    await waitFor(() => {
      expect(
        screen.queryByTestId("skeleton-user-form")
      ).not.toBeInTheDocument();
    });

    // Espera a que se consuma la api que contiene los permisos
    fireEvent.mouseDown(
      screen.getByTestId("permissions-select").firstElementChild
    );
    await waitFor(() => {
      expect(screen.queryByTestId("permission-value")).toBeInTheDocument();
    });
  });
});

describe("Cuando el usuario da clic en el botón 'Eliminar'", () => {
  test("Se muestra un modal de confirmación para eliminar usuario", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("list-users")).toBeInTheDocument();
    });

    const deleteUserButton = await waitFor(() => screen.getByRole("button", { name: /Eliminar/i }));

    await waitFor(() => {
      expect(screen.getByTestId("list-users")).toBeInTheDocument();
    });

    userEvent.click(deleteUserButton);

    expect(screen.getByTestId("delete-user-modal")).toBeInTheDocument();
  });
});
