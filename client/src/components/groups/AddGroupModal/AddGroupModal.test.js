import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Component
import AddGroupModal from "./AddGroupModal";

const isModalVisible = true;
const setIsModalVisible = jest.fn();
const fetchGroups = jest.fn();

beforeEach(() =>
  render(
    <AddGroupModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      fetchGroups={fetchGroups}
    />
  )
);

describe("Cuando AddGroupModal está montado", () => {
  test("Deben existir los campos: nombre, permisos", async () => {
    const nameField = screen.getByLabelText(/Nombre/i);
    const permissionsField = screen.getByLabelText(/Permisos/i);

    expect(nameField).toBeInTheDocument();
    expect(permissionsField).toBeInTheDocument();

    // Espera a que los permisos se encuentren disponibles
    userEvent.click(permissionsField);
    await waitFor(() => {
      expect(screen.queryByTestId("permission-value")).toBeInTheDocument();
    });
  });

  test("Debe existir botón cancelar y agregar", async () => {
    const cancelButton = screen.getByRole("button", { name: "Cancelar" });
    const submitButton = screen.getByRole("button", { name: "Agregar" });

    expect(cancelButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Espera a que los permisos se encuentren disponibles
    userEvent.click(screen.getByLabelText(/Permisos/i));
    await waitFor(() => {
      expect(screen.queryByTestId("permission-value")).toBeInTheDocument();
    });
  });
});

describe("Cuando el usuario hace blur a un campo vacío", () => {
  test("Debe mostrarse el mensaje de validación del campo", async () => {
    const nameField = screen.getByLabelText(/Nombre/i);
    const permissionsField = screen.getByLabelText(/Permisos/i);

    // Comprueba que los permisos se encuentran disponibles
    userEvent.click(permissionsField);
    await waitFor(() => {
      expect(screen.queryByTestId("permission-value")).toBeInTheDocument();
    });

    // Se confirma que las validaciones no se muestren antes del blur
    expect(
      screen.queryByText(/El Nombre es requerido!/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Por favor selecciona al menos un permiso/i)
    ).not.toBeInTheDocument();

    fireEvent.blur(nameField, {
      target: { name: "first_name", value: "" },
    });
    fireEvent.blur(permissionsField, {
      target: { name: "username", value: "" },
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/El Nombre es requerido!/i)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/Por favor selecciona al menos un permiso/i)
      ).toBeInTheDocument();
    });
  });
});

describe("Cuando el usuario envía el formulario sin valores", () => {
  test("Deben mostrarse los mensajes de validación de campos", async () => {
    const submitButton = screen.getByRole("button", { name: "Agregar" });

    expect(
      screen.queryByText(/El Nombre es requerido!/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Por favor selecciona al menos un permiso/i)
    ).not.toBeInTheDocument();
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/El Nombre es requerido!/i)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/Por favor selecciona al menos un permiso/i)
      ).toBeInTheDocument();
    });
  });
});

describe("Cuando el usuario envía el formulario con valores", () => {
  test("Success - Debe mostrarse una nueva pantalla con el mensaje 'Grupo Agregado correctamente!'", async () => {
    const nameField = screen.getByLabelText(/Nombre/i);
    const submitButton = screen.getByRole("button", { name: "Agregar" });

    // Se llenan los inputs requeridos
    userEvent.type(nameField, "test_group");
    fireEvent.mouseDown(
      screen.getByTestId("permissions-select").firstElementChild
    );
    await waitFor(() => {
      expect(screen.queryByTestId("permission-value")).toBeInTheDocument();
    });
    userEvent.click(screen.queryByTestId("permission-value"));

    // Se hace clic en el botón agregar
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Grupo Agregado correctamente!")
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "Ok" })).toBeInTheDocument();
    });
  });
});
