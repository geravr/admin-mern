import React, { useState } from "react";
import PropTypes from "prop-types";

// Services
import { updateGroup } from "@services/api";

// Ant Design
import { Modal, Skeleton, Button } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

// Hooks
import useFetch from "@hooks/useFetch";

// Components
import GroupForm from "@components/groups/GroupForm/GroupForm";

const EditGroupModal = (props) => {
  /*************** Destructuring ***************/
  const { isModalVisible, setIsModalVisible, fetchGroups, groupToEdit } = props;

  /*************** States ***************/
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /*************** Functions ***************/
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (newGroupData) => {
    try {
      setIsSubmitting(true);
      const response = await updateGroup(groupToEdit.id, newGroupData);
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
    await fetchGroups();
  };

  /*************** Hooks ***************/
  const { data: group, isFetching: isGroupFetching } = useFetch({
    url: `groups/${groupToEdit.id}/`,
  });

  return (
    <div data-testid="edit-group-modal">
      <Modal
        title={
          isSuccess ? (
            <div style={{ display: "flex", alignContent: "center" }}>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: "1.3rem", marginRight: "5px" }}
              />
              El grupo {groupToEdit.name} se actualizó correctamente!
            </div>
          ) : (
            `Editar grupo ${groupToEdit.name}`
          )
        }
        visible={isModalVisible}
        onCancel={isSuccess ? onFinish : !isSubmitting && hideModal}
        footer={null}
        bodyStyle={
          isSuccess ? { display: "flex", justifyContent: "center" } : null
        }
      >
        {isGroupFetching ? (
          <div data-testid="skeleton-group-form">
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
        ) : isSuccess ? (
          <Button type="primary" size="large" onClick={onFinish}>
            Ok
          </Button>
        ) : (
          <GroupForm
            handleCancel={hideModal}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            initialValues={group[0]}
            isUpdateGroup
          />
        )}
      </Modal>
    </div>
  );
};

EditGroupModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
  fetchGroups: PropTypes.func.isRequired,
  groupToEdit: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditGroupModal;
