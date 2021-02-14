import React from "react";

// Ant Design
import { Layout } from "antd";

// Components
import Breadcrumb from "./Breadcrumb";

const MainContent = ({ children }) => {
  return (
    <Layout.Content style={{ margin: "0 16px" }}>
      <Breadcrumb />
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        {children}
      </div>
    </Layout.Content>
  );
};

export default MainContent;
