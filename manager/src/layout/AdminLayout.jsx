import { LogoutOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sider from "../components/Sider/Sider";
import { useAuth } from "../context/authContext";

const { Header, Content } = Layout;

const AdminLayout = () => {
  const { logout } = useAuth();
  return (
    <Layout className="min-h-screen">
      <Sider />
      <Layout className="bg-gray-100">
        <Header className="bg-white px-6 shadow-md flex items-center justify-between">
          <h1 className="text-xl font-semibold">Admin</h1>
          <div className="flex items-center space-x-4" onClick={logout}>
            <Button icon={<LogoutOutlined />}>Logout</Button>
          </div>
        </Header>

        <Content className="p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
