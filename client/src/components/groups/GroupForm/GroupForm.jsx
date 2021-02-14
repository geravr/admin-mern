import React from "react";
import PropTypes from "prop-types";

// Hooks
import useFetch from "@hooks/useFetch";

// Ant Design
import { Col, Row, Space, Form, Button, Input, Select } from "antd";

const GroupForm = (props) => {
  /*************** Destructuring ***************/
  const {
    handleCancel,
    handleSubmit,
    isSubmitting,
    isUpdateGroup,
    initialValues,
  } = props;

  /*************** Hooks ***************/
  const { data: permissions, isFetching: isPermissionsFetching } = useFetch({
    url: "permissions/",
    initialPageSize: 100,
  });

  /*************** Validations ***************/
  const validateMessages = {
    // eslint-disable-next-line
    required: "El ${label} es requerido!",
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      name="group"
      onFinish={handleSubmit}
      validateMessages={validateMessages}
      validateTrigger={"onBlur"}
      initialValues={isUpdateGroup ? initialValues : undefined}
    >
      <Form.Item
        label="Nombre"
        name={"name"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={"permissions"}
        label="Permisos"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValue={isUpdateGroup ? undefined : []}
        rules={[
          {
            required: true,
            message: "Por favor selecciona al menos un permiso",
            type: "array",
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Selecciona un permiso"
          loading={isPermissionsFetching}
          data-testid="permissions-select"
        >
          {permissions &&
            permissions.map((permission) => (
              <Select.Option
                key={permission.id}
                value={permission.id}
                data-testid="permission-value"
              >
                {permission.name}
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
              {isUpdateGroup ? "Actualizar" : "Agregar"}
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

GroupForm.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isUpdateUser: PropTypes.bool,
  initialValues: PropTypes.object,
};

export default GroupForm;
