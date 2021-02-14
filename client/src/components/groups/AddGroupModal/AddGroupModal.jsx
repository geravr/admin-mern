import React, { useState } from "react";
import PropTypes from "prop-types";

// Services
import { createGroup } from "@services/api";

// Ant Design
import { Modal, Button } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

// Components
import GroupForm from "@components/groups/GroupForm/GroupForm";

const AddGroupModal = (props) => {
  /*************** Destructuring ***************/
  const { isModalVisible, setIsModalVisible, fetchGroups } = props;

  /*************** States ***************/
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /*************** Functions ***************/
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (group) => {
    try {
      setIsSubmitting(true);
      const response = await createGroup(group);
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
    await fetchGroups();
  };

  return (
    <div data-testid="add-group-modal">
      <Modal
        title={
          isSuccess ? (
            <div style={{ display: "flex", alignContent: "center" }}>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: "1.3rem", marginRight: "5px" }}
              />
              Grupo Agregado correctamente!
            </div>
          ) : (
            "Agregar nuevo grupo"
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
          <GroupForm
            handleCancel={hideModal}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </Modal>
    </div>
  );
};

AddGroupModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  fetchGroups: PropTypes.func.isRequired,
};

export default AddGroupModal;
