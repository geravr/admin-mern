import React, { useState } from "react";
import PropTypes from "prop-types";

// Services
import { updateUser } from "@services/api";

// Ant Design
import { Modal, Skeleton, Button } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

// Hooks
import useFetch from "@hooks/useFetch";

// Components
import UserForm from "@components/users/UserForm/UserForm";

const EditUserModal = (props) => {
  /*************** Destructuring ***************/
  const { isModalVisible, setIsModalVisible, fetchUsers, userToEdit } = props;

  /*************** States ***************/
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /*************** Functions ***************/
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (newUserData) => {
    try {
      setIsSubmitting(true);
      const response = await updateUser(userToEdit.id, newUserData);
      if (response.status === 200) {
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

  /*************** Hooks ***************/
  const { data: user, isFetching: isUserFetching } = useFetch({
    url: `users/${userToEdit.id}/`,
  });



  return (
    <div data-testid="edit-user-modal">
      <Modal
        title={
          isSuccess ? (
            <div style={{ display: "flex", alignContent: "center" }}>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: "1.3rem", marginRight: "5px" }}
              />
              El usuario {userToEdit.username} se actualizó correctamente!
            </div>
          ) : (
            `Editar usuario ${userToEdit.username}`
          )
        }
        visible={isModalVisible}
        onCancel={isSuccess ? onFinish : !isSubmitting && hideModal}
        footer={null}
        bodyStyle={
          isSuccess ? { display: "flex", justifyContent: "center" } : null
        }
      >
        {isUserFetching ? (
          <div data-testid="skeleton-user-form">
            <Skeleton active paragraph={{ rows: 8 }} />
          </div>
        ) : isSuccess ? (
          <Button type="primary" size="large" onClick={onFinish}>
            Ok
          </Button>
        ) : (
          <UserForm
            handleCancel={hideModal}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            initialValues={user[0]}
            isUpdateUser
          />
        )}
      </Modal>
    </div>
  );
};

EditUserModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  userToEdit: PropTypes.exact({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditUserModal;
