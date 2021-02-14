import React from "react";
import { Link, useLocation } from "react-router-dom";

// Ant Design
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const SideNav = () => {
  /*************** Hooks ***************/
  let { pathname: pathLocation } = useLocation();
  const listPathlocation = pathLocation.split("/");

  /*************** Functions ***************/
  const getCurrentPath = () => {
    if (listPathlocation.length <= 2) {
      if (listPathlocation[listPathlocation.length] === undefined) {
        return "/";
      }
      return `/${listPathlocation[listPathlocation.length]}`;
    }
    return `/${listPathlocation[1]}/${listPathlocation[2]}`;
  };

  const currentPath = getCurrentPath();

  return (
    <Layout.Sider breakpoint="lg" collapsedWidth="0">
      <Menu
        theme="dark"
        defaultSelectedKeys={["/"]}
        selectedKeys={[currentPath]}
        defaultOpenKeys={[`/${listPathlocation[1]}`]}
        mode="inline"
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.SubMenu key="/admin" icon={<AppstoreOutlined />} title="Admin">
          <Menu.Item icon={<UserOutlined />} key="/admin/users">
            <Link to="/admin/users">Usuarios</Link>
          </Menu.Item>
          <Menu.Item icon={<TeamOutlined />} key="/admin/groups">
            <Link to="/admin/groups"></Link>
            Grupos
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Layout.Sider>
  );
};

export default SideNav;
