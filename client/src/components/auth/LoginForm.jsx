import React from "react";

// Ant Design
import { Card, Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm = ({ handleSubmit, errorMessage, setErrorMessage }) => {
  return (
    <Card
      title={<div style={{ textAlign: "center" }}>Iniciar sesión</div>}
      style={{ width: 400 }}
      bodyStyle={{ paddingBottom: 0 }}
    >
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        labelCol={{ span: 24 }}
      >
        <Form.Item
          label="Usuario"
          name={"username"}
          rules={[{ required: true, message: "Ingresa un nombre de usuario!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="juan"
          />
        </Form.Item>
        <Form.Item
          label="Contraseña"
          name={"password"}
          rules={[{ required: true, message: "Ingresa una contraseña!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="******"
          />
        </Form.Item>

        <Form.Item style={{ marginTop: "10px" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
          >
            Ingresar
          </Button>
        </Form.Item>
      </Form>
      {errorMessage && (
        <Alert
          type="error"
          message={errorMessage}
          banner
          closable
          afterClose={() => setErrorMessage("")}
        />
      )}
    </Card>
  );
};

export default LoginForm;
