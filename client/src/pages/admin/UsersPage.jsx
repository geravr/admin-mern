import React, { useState } from "react";

// Ant Design
import { Row, Col, Button, Spin } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

// Hooks
import useFetch from "@hooks/useFetch";

// Components
import ListUsers from "@components/users/ListUsers/ListUsers";
import AddUserModal from "@components/users/AddUserModal/AddUserModal";
import EditUserModal from "@components/users/EditUserModal/EditUserModal";
import DeleteUserModal from "@components/users/DeleteUserModal/DeleteUserModal";

const UsersPage = () => {
  /*************** States ***************/
  const [modalAddUser, setModalAddUser] = useState(false);
  const [modalEditUser, setModalEditUser] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  const [modalDeleteUser, setModalDeleteUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});

  /*************** Functions ***************/
  const showModalAddUser = () => {
    setModalAddUser(true);
  };
  const showModalEditUser = (id, username) => {
    setModalEditUser(true);
    setUserToEdit({
      id,
      username,
    });
  };

  const showModalDeleteUser = (id, username) => {
    setModalDeleteUser(true);
    setUserToDelete({
      id,
      username,
    });
  };

  /*************** Hooks ***************/
  const {
    fetchData: fetchUsers,
    data: users,
    count,
    pageSize,
    onChangePagination,
    isFetching,
  } = useFetch({ url: "users/" });

  return (
    <>
      {modalAddUser && (
        <AddUserModal
          isModalVisible={modalAddUser}
          setIsModalVisible={setModalAddUser}
          fetchUsers={fetchUsers}
        />
      )}
      {modalEditUser && (
        <EditUserModal
          isModalVisible={modalEditUser}
          setIsModalVisible={setModalEditUser}
          userToEdit={userToEdit}
          fetchUsers={fetchUsers}
        />
      )}
      {modalDeleteUser && (
        <DeleteUserModal
          isModalVisible={modalDeleteUser}
          setIsModalVisible={setModalDeleteUser}
          userToDelete={userToDelete}
          fetchUsers={fetchUsers}
        />
      )}
      <Row>
        <Col span={24}>
          <Row justify="space-between" style={{ padding: "0 0.5rem" }}>
            <Col>
              <h2>Listado de usuarios</h2>
            </Col>
            <Col>
              <Button
                type="primary"
                shape="round"
                icon={<UserAddOutlined />}
                onClick={showModalAddUser}
              >
                Nuevo usuario
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Spin spinning={isFetching} data-testid="list-spinner">
              <ListUsers
                users={users}
                totalItems={count}
                onChangePagination={onChangePagination}
                pageSize={pageSize}
                fetchUsers={fetchUsers}
                showModalEditUser={showModalEditUser}
                showModalDeleteUser={showModalDeleteUser}
              />
              </Spin>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default UsersPage;
