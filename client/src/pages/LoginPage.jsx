import React, { useState, useEffect } from "react";

// Services
import { loginUser } from "@services/api";

// Utils
import { isLogin } from "@utils/auth";

// Router
import { useHistory } from "react-router-dom";

// Ant Design
import { Row, Col } from "antd";

// Components
import Logo from "@layout/Logo";
import LoginForm from "@components/auth/LoginForm";

const LoginPage = () => {
  /*************** States ***************/
  const [errorMessage, setErrorMessage] = useState("");

  /*************** Functions ***************/
  const history = useHistory();

  const handleSubmit = async (credentials) => {
    try {
      await loginUser(credentials);
      history.push("/");
    } catch (error) {
      error && setErrorMessage(error.response.data.msg);
    }
  };

  /*************** Lifecycle ***************/
  useEffect(() => {
    if (isLogin()) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row justify="center" align="middle">
      <Col>
        <Row justify="center">
          <Col>
            <Logo height="40" fontSize="40px" fontColor="#434343" />
          </Col>
        </Row>
        <Row>
          <Col>
            <LoginForm
              handleSubmit={handleSubmit}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LoginPage;
