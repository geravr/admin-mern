import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Component
import AddUserModal from "./AddUserModal";

const isModalVisible = true;
const setIsModalVisible = jest.fn();
const fetchUsers = jest.fn();

beforeEach(() =>
  render(
    <AddUserModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      fetchUsers={fetchUsers}
    />
  )
);

describe("Cuando AddUserModal está montado", () => {
  test("Deben existir los campos: nombre, apellido, usuario, email, contraseña, activo, administrador, permisos", async () => {
    const firstNameField = screen.getByLabelText(/Nombre/i);
    const lastNameField = screen.getByLabelText("Apellido(s)");
    const userField = screen.getByLabelText("Usuario");
    const emailField = screen.getByLabelText(/Email/i);
    const passwordField = screen.getByLabelText(/Contraseña/i);
    const isActiveField = screen.getByLabelText(/Usuario activo/i);
    const isAdminField = screen.getByLabelText(/Es administrador/i);
    const permissionsField = screen.getByLabelText(/Grupo de permisos/i);

    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(userField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(isActiveField).toBeInTheDocument();
    expect(isAdminField).toBeInTheDocument();
    expect(permissionsField).toBeInTheDocument();

    // Espera a que se consuma la api que contiene los permisos
    fireEvent.mouseDown(
      screen.getByTestId("permissions-select").firstElementChild
    );
    await waitFor(() => {
      expect(screen.queryByTestId("permission-value")).toBeInTheDocument();
    });
  });

  test("Debe existir botón cancelar y agregar", async () => {
    const cancelButton = screen.getByRole("button", { name: "Cancelar" });
    const submitButton = screen.getByRole("button", { name: "Agregar" });

    expect(cancelButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Espera a que se consuma la api que contiene los permisos
    fireEvent.mouseDown(
      screen.getByTestId("permissions-select").firstElementChild
    );
    await waitFor(() => {
      expect(screen.queryByTestId("permission-value")).toBeInTheDocument();
    });
  });
});

describe("Cuando el usuario hace blur a un campo vacío", () => {
  test("Debe mostrarse el mensaje de validación del campo", async () => {
    const firstNameField = screen.getByLabelText(/Nombre/i);
    const userField = screen.getByLabelText("Usuario");
    const emailField = screen.getByLabelText(/Email/i);
    const passwordField = screen.getByLabelText(/Contraseña/i);
    const permissionsField = screen.getByLabelText(/Grupo de permisos/i);

    // Espera a que se consuma la api que contiene los permisos
    fireEvent.mouseDown(
      screen.getByTestId("permissions-select").firstElementChild
    );
    await waitFor(() => {
      expect(screen.queryByTestId("permission-value")).toBeInTheDocument();
    });

    // Se confirma que las validaciones no se muestren antes del blur
    expect(
      screen.queryByText(/El Nombre es requerido!/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/El Usuario es requerido!/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/El Email es requerido!/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/La contraseña es requerida!/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Por favor selecciona al menos un grupo/i)
    ).not.toBeInTheDocument();

    fireEvent.blur(firstNameField, {
      target: { name: "first_name", value: "" },
    });
    fireEvent.blur(userField, {
      target: { name: "username", value: "" },
    });
    fireEvent.blur(emailField, {
      target: { name: "email", value: "" },
    });
    fireEvent.blur(passwordField, {
      target: { name: "password", value: "" },
    });
    fireEvent.blur(permissionsField, {
      target: { name: "grups", value: "" },
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/El Nombre es requerido!/i)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/El Usuario es requerido!/i)
      ).toBeInTheDocument();
      expect(screen.queryByText(/El Email es requerido!/i)).toBeInTheDocument();
      expect(
        screen.queryByText(/La contraseña es requerida!/i)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/Por favor selecciona al menos un grupo/i)
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
      screen.queryByText(/El Usuario es requerido!/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/El Email es requerido!/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/La contraseña es requerida!/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Por favor selecciona al menos un grupo/i)
    ).not.toBeInTheDocument();
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/El Nombre es requerido!/i)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/El Usuario es requerido!/i)
      ).toBeInTheDocument();
      expect(screen.queryByText(/El Email es requerido!/i)).toBeInTheDocument();
      expect(
        screen.queryByText(/La contraseña es requerida!/i)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/Por favor selecciona al menos un grupo/i)
      ).toBeInTheDocument();
    });
  });
});

describe("Cuando el usuario envía el formulario con valores", () => {
  test("Success - Debe mostrarse una nueva pantalla con el mensaje 'Usuario Agregado correctamente!'", async () => {
    const firstNameField = screen.getByLabelText(/Nombre/i);
    const userField = screen.getByLabelText("Usuario");
    const emailField = screen.getByLabelText(/Email/i);
    const passwordField = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole("button", { name: "Agregar" });

    // Se llenan los inputs requeridos
    userEvent.type(firstNameField, "Juan");
    userEvent.type(userField, "juan");
    userEvent.type(emailField, "juan@mail.com");
    userEvent.type(passwordField, "qwe123");
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
        screen.queryByText("Usuario Agregado correctamente!")
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "Ok" })).toBeInTheDocument();
    });
  });
});
