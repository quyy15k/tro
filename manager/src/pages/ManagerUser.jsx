import { EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Select, Table, Modal, Form, Input } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllUser, updateUserInfo, createUser } from "../service/userService";

const ManagerUser = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [form] = Form.useForm();

  const fetchAllUser = async () => {
    const res = await getAllUser();
    if (res.data.err === 0) {
      setUsers(res.data.response);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleRoleChange = async (id, role) => {
    const res = await updateUserInfo({ role }, id);
    if (res.data?.err === 0) toast.success("User role updated successfully!");
    setUsers(
      users.map((user) => (user.id === id ? { ...user, role } : user))
    );
  };

  const handleActiveChange = async (id, isActive) => {
    const res = await updateUserInfo({ isActive }, id);
    if (res.data?.err === 0)
      toast.success("User isActive updated successfully!");
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, isActive } : user
      )
    );
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      name: user.name,
      phone: user.phone,
      zalo: user.zalo,
      fbUrl: user.fbUrl,
    });
    setIsCreating(false);
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setEditingUser(null);
    form.resetFields(); // Reset toàn bộ form khi tạo mới
    setIsCreating(true);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      let res;

      if (isCreating) {
        res = await createUser(values);
      } else {
        res = await updateUserInfo(values, editingUser.id);
      }

      if (res.data?.err === 0) {
        toast.success(
          isCreating
            ? "User created successfully!"
            : "User updated successfully!"
        );
        fetchAllUser();
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = (e) => {
    setSearchTitle(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTitle.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTitle.toLowerCase()) ||
      user.zalo?.toLowerCase().includes(searchTitle.toLowerCase()) ||
      user.fbUrl?.toLowerCase().includes(searchTitle.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Zalo",
      dataIndex: "zalo",
      key: "zalo",
      render: (text) => <span>{text ? text : "Chưa cập nhật"}</span>,
    },
    {
      title: "Facebook",
      dataIndex: "fbUrl",
      key: "fbUrl",
      render: (text) => (
        <span className="max-w-48 line-clamp-1">
          {text ? text : "Chưa cập nhật"}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (text, record) => (
        <Select
          defaultValue={text === 1 ? "Hoạt động" : "Khóa"}
          onChange={(value) => handleActiveChange(record.id, value)}
          style={{ width: 120 }}
        >
          <Select.Option value={1}>Hoạt động</Select.Option>
          <Select.Option value={0}>Khóa</Select.Option>
        </Select>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => (
        <Select
          defaultValue={text}
          onChange={(value) => handleRoleChange(record.id, value)}
          style={{ width: 120 }}
        >
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="user">User</Select.Option>
        </Select>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <span className="max-w-48 line-clamp-1">
          {text ? moment(text).format("DD/MM/YYYY HH:mm:ss") : "Chưa cập nhật"}
        </span>
      ),
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
        </div>
      ),
    },
  ];

  const paginatedUsers = filteredUsers.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <Input
          placeholder="Search by Name, Phone, Zalo, or Facebook"
          value={searchTitle}
          onChange={handleSearch}
          className="border flex-1 border-gray-300 mr-4 pl-4 h-12 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          prefix={<SearchOutlined className="text-gray-500" />}
          allowClear
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
          className="h-12 py-0"
        >
          Create New User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={paginatedUsers}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: filteredUsers.length,
          onChange: (page, pageSize) => {
            setPagination({
              current: page,
              pageSize: pageSize,
            });
          },
        }}
        className="bg-white rounded shadow-lg p-4"
      />

      <Modal
        title={isCreating ? "Create New User" : "Update User"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={isCreating ? "Create" : "Update"}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={isCreating ? {} : {
            name: editingUser?.name || "",
            phone: editingUser?.phone || "",
            zalo: editingUser?.zalo || "",
            fbUrl: editingUser?.fbUrl || "",
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please input the phone!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="zalo" label="Zalo">
            <Input />
          </Form.Item>
          <Form.Item name="fbUrl" label="Facebook URL">
            <Input />
          </Form.Item>

          {isCreating && (
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input the password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerUser;
