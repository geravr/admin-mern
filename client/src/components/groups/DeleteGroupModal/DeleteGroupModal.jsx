import React, { useState } from "react";
import PropTypes from "prop-types";

// Services
import { deleteGroup } from "@services/api";

// Ant Design
import { Button, Modal, Spin, Space } from "antd";
import {
  ExclamationCircleTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";

const DeleteGroupModal = (props) => {
  /*************** Destructuring ***************/
  const { isModalVisible, setIsModalVisible, fetchGroups, groupToDelete } = props;

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
      const response = await deleteGroup(groupToDelete.id);
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
    await fetchGroups();
  };

  return (
    <div data-testid="delete-group-modal">
      <Modal
        title={
          isSuccess ? (
            <title style={{ display: "flex", alignContent: "center" }}>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: "1.3rem", marginRight: "5px" }}
              />{" "}
              El grupo {groupToDelete.name} fue eliminado correctamente
            </title>
          ) : (
            <title style={{ display: "flex", alignContent: "center" }}>
              <ExclamationCircleTwoTone
                twoToneColor="#ff4d4f"
                style={{ fontSize: "1.3rem", marginRight: "5px" }}
              />{" "}
              ¿Estás seguro que deseas eliminar el grupo{" "}
              {groupToDelete.name}?
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
            Al eliminar un grupo, este se removerá de los usuarios que lo estén usando y se perderán los permisos heredados!
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

DeleteGroupModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  groupToDelete: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  fetchGroups: PropTypes.func,
};

export default DeleteGroupModal;
