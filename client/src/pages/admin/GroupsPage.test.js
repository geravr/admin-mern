import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Component
import GroupsPage from "./GroupsPage";

beforeEach(() => render(<GroupsPage />));

describe("Cuando GroupsPage está montado", () => {
  test("Debe mostrarse un spinner durante la petición, y posteriormente un listado de grupos", async () => {
    expect(screen.getByRole("button", { name: /Nuevo grupo/i }));

    expect(screen.queryAllByTestId("list-spinner")[1]).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("list-groups")).toBeInTheDocument();
    });
  });
});

describe("Cuando el usuario da clic en el botón 'Nuevo grupo'", () => {
  test("Se muestra un modal con formulario para agregar un nuevo grupo", async () => {
    const newGroupButton = screen.getByRole("button", {
      name: /Nuevo grupo/i,
    });

    await waitFor(() => {
      expect(screen.getByTestId("list-groups")).toBeInTheDocument();
    });

    userEvent.click(newGroupButton);

    expect(screen.getByTestId("add-group-modal")).toBeInTheDocument();

    // Espera a que los permisos se encuentren disponibles
    userEvent.click(screen.getByLabelText(/Permisos/i));
    await waitFor(() => {
      expect(screen.queryByTestId("permission-value")).toBeInTheDocument();
    });
  });
});

describe("Cuando el usuario da clic en el botón 'Editar'", () => {
  test("Se muestra un modal con formulario para editar un grupo", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("list-groups")).toBeInTheDocument();
    });

    const editGroupButton = screen.getByRole("button", { name: /Editar/i });

    userEvent.click(editGroupButton);

    expect(screen.getByTestId("edit-group-modal")).toBeInTheDocument();

    // Espera que el skeleton deje de mostrarse
    await waitFor(() => {
      expect(
        screen.queryByTestId("skeleton-group-form")
      ).not.toBeInTheDocument();
    });

    // Espera a que los permisos se encuentren disponibles
    userEvent.click(screen.getByLabelText(/Permisos/i));
    await waitFor(() => {
      expect(screen.queryByTestId("permission-value")).toBeInTheDocument();
    });
  });
});

describe("Cuando el usuario da clic en el botón 'Eliminar'", () => {
  test("Se muestra un modal de confirmación para eliminar usuario", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("list-groups")).toBeInTheDocument();
    });

    const deleteGroupButton = screen.getByRole("button", { name: /Eliminar/i });

    await waitFor(() => {
      expect(screen.getByTestId("list-groups")).toBeInTheDocument();
    });

    userEvent.click(deleteGroupButton);

    expect(screen.getByTestId("delete-group-modal")).toBeInTheDocument();
  });
});
