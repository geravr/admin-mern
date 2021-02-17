import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Component
import EditGroupModal from "./EditGroupModal";

const isModalVisible = true;
const setIsModalVisible = jest.fn();
const fetchGroups = jest.fn();
const groupToEdit = {
  id: "6029d50dd6b2b9002bf08c28",
  name: "testGroup",
};

beforeEach(() =>
  render(
    <EditGroupModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      fetchGroups={fetchGroups}
      groupToEdit={groupToEdit}
    />
  )
);

describe("Cuando EditGroupModal está montado", () => {
  test("Deben existir los campos: nombre, permisos", async () => {
    // Comprueba que se muestra una animación skeleton mientras se consume la API del usuario a editar
    expect(screen.queryByTestId("skeleton-group-form")).toBeInTheDocument();
    // Espera que la animación skeleton deje de mostrarse
    await waitFor(() => {
      expect(
        screen.queryByTestId("skeleton-group-form")
      ).not.toBeInTheDocument();
    });

    const nameField = screen.getByLabelText(/Nombre/i);
    const permissionsField = screen.getByLabelText(/Permisos/i);


    expect(nameField).toBeInTheDocument();
    expect(permissionsField).toBeInTheDocument();

    // Espera a que se consuma la api que contiene los permisos
    fireEvent.mouseDown(
      screen.getByTestId("permissions-select").firstElementChild
    );
    await waitFor(() => {
      expect(screen.queryByTestId("permission-value")).toBeInTheDocument();
    });
  });

  test("Debe existir botón cancelar y actualizar", async () => {
    // Espera a que la animación skeleton deje de mostrarse
    expect(screen.queryByTestId("skeleton-group-form")).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.queryByTestId("skeleton-group-form")
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
    expect(screen.queryByTestId("skeleton-group-form")).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.queryByTestId("skeleton-group-form")
      ).not.toBeInTheDocument();
    });

    const nameField = screen.getByLabelText(/Nombre/i);
    const permissionsField = screen.getByLabelText(/Permisos/i);

    expect(nameField).toBeInTheDocument();
    expect(permissionsField).toBeInTheDocument();

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
  test("Success - Debe mostrarse una nueva pantalla con el mensaje 'El grupo {name} se actualizó correctamente!'", async () => {
    // Comprueba que se muestra una animación skeleton mientras se consume la API del usuario a editar
    expect(screen.queryByTestId("skeleton-group-form")).toBeInTheDocument();
    // Espera a que la animación skeleton deje de mostrarse
    await waitFor(() => {
      expect(
        screen.queryByTestId("skeleton-group-form")
      ).not.toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: "Actualizar" });

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText(
          `El grupo ${groupToEdit.name} se actualizó correctamente!`
        )
      ).toBeInTheDocument();
    });
  });
});
