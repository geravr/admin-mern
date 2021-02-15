import React, { useState } from "react";
import PropTypes from "prop-types";

// Ant Design
import { Col, Row, Space, Form, Button, Input, Switch, Select } from "antd";

// Hooks
import useFetch from "@hooks/useFetch";

// Utils
import { getUserLS } from "@utils/userLocalStorage";

const UserForm = (props) => {
  /*************** Destructuring ***************/
  const {
    handleCancel,
    handleSubmit,
    isSubmitting,
    isUpdateUser,
    initialValues,
  } = props;

  const currentUser = getUserLS();

  /*************** States ***************/
  const [isAdminUser, setIsAdminUser] = useState(
    isUpdateUser ? initialValues?.isAdmin : false
  );

  /*************** Functions ***************/
  const handleSwitchAdminChange = (isChecked) => {
    setIsAdminUser(isChecked);
  };

  /*************** Hooks ***************/
  const {
    data: groupsPermissions,
    isFetching: isPermissionsFetching,
  } = useFetch({ url: "groups/", initialPageSize: 100 });

  /*************** Validations ***************/
  const validateMessages = {
    // eslint-disable-next-line
    required: "El ${label} es requerido!",
    types: {
      email: "No es un email válido!",
    },
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      name="user"
      onFinish={handleSubmit}
      validateMessages={validateMessages}
      validateTrigger={"onBlur"}
      initialValues={isUpdateUser ? initialValues : undefined}
    >
      <Form.Item
        name={"firstName"}
        label="Nombre"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"lastName"}
        label="Apellido(s)"
        initialValue={isUpdateUser ? undefined : ""}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"username"}
        label="Usuario"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"email"}
        label="Email"
        rules={[
          {
            type: "email",
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"password"}
        label="Contraseña"
        rules={[
          {
            required: !isUpdateUser,
            message: "La contraseña es requerida!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Row>
        <Col span={10}>
          <Form.Item
            name={"isActive"}
            initialValue={isUpdateUser ? undefined : true}
            label="Usuario activo"
            labelCol={{ span: 16 }}
            wrapperCol={{ span: 4 }}
            valuePropName="checked"
          >
            <Switch defaultChecked data-testid="switch-active-user-button" />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            name={"isAdmin"}
            initialValue={isUpdateUser ? undefined : false}
            label="Es administrador"
            labelCol={{ span: 16 }}
            wrapperCol={{ span: 4 }}
            valuePropName="checked"
          >
            <Switch
              data-testid="switch-admin-button"
              onChange={handleSwitchAdminChange}
              disabled={!currentUser.isAdmin}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name={"groups"}
        label="Grupo de permisos"
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
        initialValue={isUpdateUser ? undefined : []}
        rules={[
          {
            required: !isAdminUser,
            message: "Por favor selecciona al menos un grupo",
            type: "array",
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Selecciona un grupo"
          loading={isPermissionsFetching}
          data-testid="permissions-select"
        >
          {groupsPermissions &&
            groupsPermissions.map((group) => (
              <Select.Option
                key={group.id}
                value={group.id}
                data-testid="permission-value"
              >
                {group.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Row justify="end">
        <Col>
          <Space>
            <Button key="back" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              key="submit"
              htmlType="submit"
              type="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isUpdateUser ? "Actualizar" : "Agregar"}
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

UserForm.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isUpdateUser: PropTypes.bool,
  initialValues: PropTypes.object,
};

export default UserForm;
