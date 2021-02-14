import React, { useState } from "react";

// Ant Design
import { Row, Col, Button, Spin } from "antd";
import { TeamOutlined } from "@ant-design/icons";

// Hooks
import useFetch from "@hooks/useFetch";

// Components
import ListGroups from "@components/groups/ListGroups/ListGroups";
import AddGroupModal from "@components/groups/AddGroupModal/AddGroupModal";
import EditGroupModal from "@components/groups/EditGroupModal/EditGroupModal";
import DeleteGroupModal from "@components/groups/DeleteGroupModal/DeleteGroupModal";

const GroupsPage = () => {
  /*************** States ***************/
  const [modalAddGroup, setModalAddGroup] = useState(false);
  const [modalEditGroup, setModalEditGroup] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState(null);
  const [modalDeleteGroup, setModalDeleteGroup] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState({});

  /*************** Functions ***************/
  const showModalAddGroup = () => {
    setModalAddGroup(true);
  };

  const showModalEditGroup = (id, name) => {
    setModalEditGroup(true);
    setGroupToEdit({
      id,
      name,
    });
  };

  const showModalDeleteGroup = (id, name) => {
    setModalDeleteGroup(true);
    setGroupToDelete({
      id,
      name,
    });
  };

  /*************** Hooks ***************/
  const {
    fetchData: fetchGroups,
    data: groups,
    count,
    pageSize,
    onChangePagination,
    isFetching,
  } = useFetch({ url: "groups/" });

  return (
    <>
      {modalAddGroup && (
        <AddGroupModal
          isModalVisible={modalAddGroup}
          setIsModalVisible={setModalAddGroup}
          fetchGroups={fetchGroups}
        />
      )}
      {modalEditGroup && (
        <EditGroupModal
          isModalVisible={modalEditGroup}
          setIsModalVisible={setModalEditGroup}
          groupToEdit={groupToEdit}
          fetchGroups={fetchGroups}
        />
      )}
      {modalDeleteGroup && (
        <DeleteGroupModal
          isModalVisible={modalDeleteGroup}
          setIsModalVisible={setModalDeleteGroup}
          groupToDelete={groupToDelete}
          fetchGroups={fetchGroups}
        />
      )}
      <Row>
        <Col span={24}>
          <Row justify="space-between" style={{ padding: "0 0.5rem" }}>
            <Col>
              <h2>Listado de grupos</h2>
            </Col>
            <Col>
              <Button
                type="primary"
                shape="round"
                icon={<TeamOutlined />}
                onClick={showModalAddGroup}
              >
                Nuevo grupo
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
            <Spin spinning={isFetching} data-testid="list-spinner">
              <ListGroups
                groups={groups}
                totalItems={count}
                onChangePagination={onChangePagination}
                pageSize={pageSize}
                showModalEditGroup={showModalEditGroup}
                showModalDeleteGroup={showModalDeleteGroup}
              />
              </Spin>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default GroupsPage;
