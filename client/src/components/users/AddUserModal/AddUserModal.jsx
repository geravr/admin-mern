import React, { useState } from "react";
import PropTypes from "prop-types";

// Services
import { createUser } from "@services/api";

// Ant Design
import { Modal, Button } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

// Components
import UserForm from "@components/users/UserForm/UserForm";

const AddUserModal = (props) => {
  /*************** Destructuring ***************/
  const { isModalVisible, setIsModalVisible, fetchUsers } = props;

  /*************** States ***************/
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /*************** Functions ***************/
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (user) => {
    try {
      setIsSubmitting(true);
      const response = await createUser(user);
      if (response.status === 201) {
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
    <div data-testid="add-user-modal">
      <Modal
        title={
          isSuccess ? (
            <div style={{ display: "flex", alignContent: "center" }}>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: "1.3rem", marginRight: "5px" }}
              />
              Usuario Agregado correctamente!
            </div>
          ) : (
            "Agregar nuevo usuario"
          )
        }
        visible={isModalVisible}
        onCancel={isSuccess ? onFinish : !isSubmitting && hideModal}
        footer={null}
        bodyStyle={
          isSuccess ? { display: "flex", justifyContent: "center" } : null
        }
      >
        {isSuccess ? (
          <Button type="primary" size="large" onClick={onFinish}>
            Ok
          </Button>
        ) : (
          <UserForm
            handleCancel={hideModal}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isSuccess={isSuccess}
          />
        )}
      </Modal>
    </div>
  );
};

AddUserModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

export default AddUserModal;
