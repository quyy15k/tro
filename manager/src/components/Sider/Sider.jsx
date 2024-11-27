import {
  AppstoreOutlined,
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { BiMoney } from "react-icons/bi";
import { Link } from "react-router-dom";

const Sider = () => {
  const { Sider } = Layout;

  return (
    <Sider collapsible className="bg-gray-900">
      <div className="text-white text-center py-4 font-bold text-xl">
        TRỌ 123
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="bg-gray-900"
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/manager-user">Manage Users</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<AppstoreOutlined />}>
          <Link to="/manager-category">Manage Categories</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<FileTextOutlined />}>
          <Link to="/manager-post">Manage Posts</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sider;
