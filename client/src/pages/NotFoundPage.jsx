import React from "react";

// Router
import { Link } from "react-router-dom";

// Ant Design
import { Result, Button } from "antd";

const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos, la página que visitaste no existe."
      extra={<Link to="/"><Button type="primary">Regresar al inicio</Button></Link>}
    />
  );
};

export default NotFoundPage;
