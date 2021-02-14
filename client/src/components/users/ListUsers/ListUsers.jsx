import React from "react";
import PropTypes from "prop-types";

// Ant Design
import { Button, Table, Tag, Space } from "antd";
import {
  EditOutlined,
  UserDeleteOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";

const ListUsers = (props) => {
  /*************** Destructuring ***************/
  const {
    users,
    totalItems,
    pageSize,
    onChangePagination,
    showModalEditUser,
    showModalDeleteUser,
  } = props;

  return (
    <Table
      dataSource={users}
      rowKey="id"
      pagination={{
        total: totalItems,
        pageSize: pageSize,
        onChange: onChangePagination,
      }}
      scroll={{ x: true }}
      data-testid="list-users"
    >
      <Table.Column
        title="Username"
        dataIndex="username"
        render={(text) => <Button type="link">{text}</Button>}
      />

      <Table.Column
        title="Nombre"
        dataIndex="firstName"
        render={(firstName, row) => <>{`${firstName} ${row.lastName}`}</>}
      />

      <Table.Column
        title="Activo"
        dataIndex="isActive"
        align="center"
        render={(isActive) => (
          <>
            {isActive ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#fa541c" />
            )}
          </>
        )}
      />

      <Table.Column
        title="Admin"
        dataIndex="isAdmin"
        align="center"
        render={(isAdmin) => (
          <>
            {isAdmin ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#fa541c" />
            )}
          </>
        )}
      />

      <Table.Column
        title="Grupos"
        dataIndex="groups"
        render={(groups) => (
          <>
            {groups.map((group) => {
              let color = "geekblue";
              if (group === "test") {
                color = "purple";
              }
              return (
                <Tag color={color} key={group.id}>
                  {group.name}
                </Tag>
              );
            })}
          </>
        )}
      />

      <Table.Column
        title="Acción"
        dataIndex="id"
        render={(id, row) => (
          <Space size="middle">
            <Button
              type="link"
              style={{ color: "#000" }}
              onClick={() => showModalEditUser(id, row.username)}
            >
              <EditOutlined style={{ fontSize: "18px", color: "#ffc53d" }} />{" "}
              Editar
            </Button>
            <Button
              type="link"
              style={{ color: "#000" }}
              onClick={() => showModalDeleteUser(id, row.username)}
            >
              <UserDeleteOutlined
                style={{ fontSize: "18px", color: "#ff7a45" }}
              />{" "}
              Eliminar
            </Button>
          </Space>
        )}
      />
    </Table>
  );
};

ListUsers.propTypes = {
  users: PropTypes.oneOfType([
    PropTypes.oneOf([null]).isRequired,
    PropTypes.array.isRequired,
  ]),
  totalItems: PropTypes.number,
  pageSize: PropTypes.number,
  onChangePagination: PropTypes.func,
  showModalEditUser: PropTypes.func,
  showModalDeleteUser: PropTypes.func,
};

export default ListUsers;
