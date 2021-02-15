import React from "react";
import PropTypes from "prop-types";

// Ant Design
import { Button, Table, Tag, Space } from "antd";
import { EditOutlined, UserDeleteOutlined } from "@ant-design/icons";
// Utils
import { getUserLS } from "@utils/userLocalStorage";

const ListGroups = (props) => {
  /*************** Destructuring ***************/
  const {
    groups,
    totalItems,
    pageSize,
    onChangePagination,
    showModalEditGroup,
    showModalDeleteGroup,
  } = props;

  const currentUser = getUserLS();

  return (
    <Table
      dataSource={groups}
      rowKey="id"
      pagination={{
        total: totalItems,
        pageSize: pageSize,
        onChange: onChangePagination,
      }}
      scroll={{ x: true }}
      data-testid="list-groups"
    >
      <Table.Column
        title="Nombre"
        dataIndex="name"
        render={(text) => <Button type="link">{text}</Button>}
      />

      <Table.Column
        title="Permisos"
        dataIndex="permissions"
        render={(permissions) => (
          <>
            {permissions.map((permission, index) => {
              if (index === 5) {
                return (
                  <Tag color="geekblue" key={permission.id}>
                    ...
                  </Tag>
                );
              }
              if (index > 5) {
                return null;
              }
              return (
                <Tag color="geekblue" key={permission.id}>
                  {permission.name}
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
              onClick={() => showModalEditGroup(id, row.name)}
              disabled={(row.name === 'readOnly' || row.name === 'editor') && !currentUser.isAdmin}
            >
              <EditOutlined style={{ fontSize: "18px", color: "#ffc53d" }} />{" "}
              Editar
            </Button>
            <Button
              type="link"
              style={{ color: "#000" }}
              onClick={() => showModalDeleteGroup(id, row.name)}
              disabled={(row.name === 'readOnly' || row.name === 'editor') && !currentUser.isAdmin}
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

ListGroups.propTypes = {
  groups: PropTypes.oneOfType([
    PropTypes.oneOf([null]).isRequired,
    PropTypes.array.isRequired,
  ]),
  totalItems: PropTypes.number,
  pageSize: PropTypes.number,
  onChangePagination: PropTypes.func,
  showModalEditGroup: PropTypes.func,
  showModalDeleteGroup: PropTypes.func,
};

export default ListGroups;
