import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Component
import DeleteUserModal from "./DeleteUserModal";

const isModalVisible = true;
const setIsModalVisible = jest.fn();
const fetchUsers = jest.fn();
const userToDelete = {
  id: "6029d587d6b2b9002bf08c2b",
  username: "paco",
};

beforeEach(() =>
  render(
    <DeleteUserModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      fetchUsers={fetchUsers}
      userToDelete={userToDelete}
    />
  )
);

describe("Cuando DeleteUserModal está montado", () => {
  test("Debe existir el título '¿Estás seguro que deseas eliminar el usuario {username} ?'", async () => {
    expect(
      screen.getByText(
        `¿Estás seguro que deseas eliminar el usuario ${userToDelete.username}?`
      )
    );
    expect(screen.getByText("Un usuario eliminado no se puede recuperar!"));
  });

  test("Debe existir botón 'Cancelar' y 'Si, Eliminar'", async () => {
    const cancelButton = screen.getByRole("button", { name: "Cancelar" });
    const deleteButton = screen.getByRole("button", { name: "Si, eliminar" });

    expect(cancelButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});

describe("Cuando el usuario da clic en el botón eliminar", () => {
  test("Debe mostrarse un spinner mientras se está realizando la petición", async () => {
    const deleteButton = screen.getByRole("button", { name: "Si, eliminar" });

    userEvent.click(deleteButton);

    expect(screen.queryAllByTestId("delete-spinner")[1]).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("delete-spinner")).not.toBeInTheDocument();
    });
  });

  test("Success - Debe mostrarse una nueva pantalla con el mensaje 'El usuario {username} fue eliminado correctamente'", async () => {
    const deleteButton = screen.getByRole("button", { name: "Si, eliminar" });

    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          `El usuario ${userToDelete.username} fue eliminado correctamente`
        )
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Ok" })).toBeInTheDocument();
    });

    userEvent.click(screen.getByRole("button", { name: "Ok" }));
    expect(setIsModalVisible).toHaveBeenCalledTimes(1);
    expect(fetchUsers).toHaveBeenCalledTimes(1);
  });
});
