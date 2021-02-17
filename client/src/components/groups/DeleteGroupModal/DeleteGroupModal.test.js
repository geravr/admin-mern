import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Component
import DeleteGroupModal from "./DeleteGroupModal";

const isModalVisible = true;
const setIsModalVisible = jest.fn();
const fetchGroups = jest.fn();
const groupToDelete = {
  id: "6029d50dd6b2b9002bf08c28",
  name: "testGroup",
};

beforeEach(() =>
  render(
    <DeleteGroupModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      fetchGroups={fetchGroups}
      groupToDelete={groupToDelete}
    />
  )
);

describe("Cuando DeleteGroupModal está montado", () => {
  test("Debe existir el título '¿Estás seguro que deseas eliminar el grupo {name} ?'", async () => {
    expect(
      screen.getByText(
        `¿Estás seguro que deseas eliminar el grupo ${groupToDelete.name}?`
      )
    );
    expect(
      screen.getByText(
        "Al eliminar un grupo, este se removerá de los usuarios que lo estén usando y se perderán los permisos heredados!"
      )
    );
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

  test("Success - Debe mostrarse una nueva pantalla con el mensaje 'El grupo {name} fue eliminado correctamente'", async () => {
    const deleteButton = screen.getByRole("button", { name: "Si, eliminar" });

    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          `El grupo ${groupToDelete.name} fue eliminado correctamente`
        )
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Ok" })).toBeInTheDocument();
    });

    userEvent.click(screen.getByRole("button", { name: "Ok" }));
    expect(setIsModalVisible).toHaveBeenCalledTimes(1);
    expect(fetchGroups).toHaveBeenCalledTimes(1);
  });
});
