import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Component
import EditUserModal from "./EditUserModal";

const isModalVisible = true;
const setIsModalVisible = jest.fn();
const fetchUsers = jest.fn();
const userToEdit = {
  id: 7,
  username: "paco",
};

beforeEach(() =>
  render(
    <EditUserModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      fetchUsers={fetchUsers}
      userToEdit={userToEdit}
    />
  )
);

describe("Cuando EditUserModal está montado", () => {
  test("Deben existir los campos: nombre, apellido, usuario, email, contraseña, activo, administrador, permisos", async () => {
    // Comprueba que se muestra una animación skeleton mientras se consume la API del usuario a editar
    expect(screen.queryByTestId("skeleton-user-form")).toBeInTheDocument();
    // Espera que la animación skeleton deje de mostrarse
    await waitFor(() => {
      expect(
        screen.queryByTestId("skeleton-user-form")
      ).not.toBeInTheDocument();
    });

    const firstNameField = screen.getByLabelText(/Nombre/i);
    const lastNameField = screen.getByLabelText("Apellido(s)");
    const userField = screen.getByLabelText("Usuario");
    const emailField = screen.getByLabelText(/Email/i);
    const passwordField = screen.getByLabelText(/Contraseña/i);
    const isActiveField = screen.getByLabelText(/Usuario activo/i);
    const isAdminField = screen.getByLabelText(/Es administrador/i);

    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(userField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(isActiveField).toBeInTheDocument();
    expect(isAdminField).toBeInTheDocument();
    fireEvent.mouseDown(
      screen.getByTestId("permissions-select").firstElementChild
    );
    // Espera a que se consuma la api que contiene los permisos
    await waitFor(() => {
      expect(screen.queryByTestId("permission-value")).toBeInTheDocument();
    });
  });

  test("Debe existir botón cancelar y actualizar", async () => {
    // Espera a que la animación skeleton deje de mostrarse
    expect(screen.queryByTestId("skeleton-user-form")).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.queryByTestId("skeleton-user-form")
      ).not.toBeInTheDocument();
    });

    const cancelButton = screen.getByRole("button", { name: "Cancelar" });
    const submitButton = screen.getByRole("button", { name: "Actualizar" });

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

  test("Deben existir los datos del usuario a editar, en los input", async () => {
    // Espera a que la animación skeleton deje de mostrarse
    expect(screen.queryByTestId("skeleton-user-form")).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.queryByTestId("skeleton-user-form")
      ).not.toBeInTheDocument();
    });

    const firstNameValue = screen.getByDisplayValue("Francisco");
    const lastNameValue = screen.getByDisplayValue("Sepulveda");
    const userValue = screen.getByDisplayValue("paco");
    const emailValue = screen.getByDisplayValue("pacos@mail.com");
    const isActiveUserValue = screen.getByTestId("switch-active-user-button");
    const isAdminValue = screen.getByTestId("switch-admin-button");
    const groupsValue = screen.getByText("test");

    expect(firstNameValue).toBeInTheDocument();
    expect(lastNameValue).toBeInTheDocument();
    expect(userValue).toBeInTheDocument();
    expect(isActiveUserValue).toHaveAttribute("aria-checked", "true");
    expect(isAdminValue).toHaveAttribute("aria-checked", "true");
    expect(emailValue).toBeInTheDocument();
    expect(groupsValue).toBeInTheDocument();

    // Espera a que se consuma la api que contiene los permisos
    fireEvent.mouseDown(
      screen.getByTestId("permissions-select").firstElementChild
    );
    await waitFor(() => {
      expect(screen.queryByTestId("permission-value")).toBeInTheDocument();
    });
  });
});

describe("Cuando el usuario envía el formulario", () => {
  test("Success - Debe mostrarse una nueva pantalla con el mensaje 'El usuario {username} se actualizó correctamente!'", async () => {
    // Comprueba que se muestra una animación skeleton mientras se consume la API del usuario a editar
    expect(screen.queryByTestId("skeleton-user-form")).toBeInTheDocument();
    // Espera a que la animación skeleton deje de mostrarse
    await waitFor(() => {
      expect(
        screen.queryByTestId("skeleton-user-form")
      ).not.toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: "Actualizar" });

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText(
          `El usuario ${userToEdit.username} se actualizó correctamente!`
        )
      ).toBeInTheDocument();
    });
  });
});
