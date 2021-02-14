import React, { useState } from "react";
import PropTypes from "prop-types";

// Services
import { deleteUser } from "@services/api";

// Ant Design
import { Button, Modal, Spin, Space } from "antd";
import {
  ExclamationCircleTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";

const DeleteUserModal = (props) => {
  /*************** Destructuring ***************/
  const { isModalVisible, setIsModalVisible, fetchUsers, userToDelete } = props;

  /*************** States ***************/
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /*************** Functions ***************/
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      const response = await deleteUser(userToDelete.id);
      if (response.status === 204) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFinish = async () => {
    hideModal();
    await fetchUsers();
  };

  return (
    <div data-testid="delete-user-modal">
      <Modal
        title={
          isSuccess ? (
            <title style={{ display: "flex", alignContent: "center" }}>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: "1.3rem", marginRight: "5px" }}
              />{" "}
              El usuario {userToDelete.username} fue eliminado correctamente
            </title>
          ) : (
            <title style={{ display: "flex", alignContent: "center" }}>
              <ExclamationCircleTwoTone
                twoToneColor="#ff4d4f"
                style={{ fontSize: "1.3rem", marginRight: "5px" }}
              />{" "}
              ¿Estás seguro que deseas eliminar el usuario{" "}
              {userToDelete.username}?
            </title>
          )
        }
        visible={isModalVisible}
        onCancel={isSuccess ? onFinish : !isSubmitting && hideModal}
        footer={null}
        bodyStyle={
          isSuccess
            ? {
                display: "flex",
                justifyContent: "center",
                paddingBottom: "0.5rem",
              }
            : { paddingBottom: "0.5rem" }
        }
      >
        {isSuccess ? (
          <Button type="primary" size="large" onClick={onFinish}>
            Ok
          </Button>
        ) : (
          <Spin
            tip="Eliminando..."
            spinning={isSubmitting}
            size="large"
            data-testid="delete-spinner"
          >
            Un usuario eliminado no se puede recuperar!
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1.5rem",
              }}
            >
              <Space>
                <Button key="back" onClick={!isSubmitting && hideModal}>
                  Cancelar
                </Button>
                <Button danger onClick={handleDelete}>
                  Si, eliminar
                </Button>
              </Space>
            </div>
          </Spin>
        )}
      </Modal>
    </div>
  );
};

DeleteUserModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  userToDelete: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  fetchUsers: PropTypes.func,
};

export default DeleteUserModal;
