import { useEffect, useState } from "react";
import {
  deleteCategory,
  getAllCategory,
  updateCategory,
  createCategory,
} from "../service/catergoryService";
import { Button, Popconfirm, Table, Modal, Form, Input, message } from "antd";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";

const ManagerCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [form] = Form.useForm();

  const fetchCategories = async () => {
    const res = await getAllCategory();
    if (res.data.err === 0) {
      setCategories(res.data.response);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deleteCategory(id);
      if (res.data.err === 0) {
        toast.success("Category deleted successfully");
        fetchCategories();
      } else {
        message.error("Failed to delete category");
      }
    } catch (error) {
      message.error("An error occurred while deleting the category");
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
    form.setFieldsValue(category);
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleModalSubmit = async (values) => {
    try {
      let res;
      if (selectedCategory) {
        res = await updateCategory(selectedCategory.id, values);
        if (res.data.err === 0) {
          toast.success("Category updated successfully");
        }
      } else {
        res = await createCategory(values);
        if (res.data.err === 0) {
          toast.success("Category created successfully");
        }
      }
      if (res.data.err === 0) {
        fetchCategories();
        setIsModalVisible(false);
      } else {
        message.error("Failed to save category");
      }
      form.resetFields();
    } catch (error) {
      message.error("An error occurred while saving the category");
    }
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Header",
      dataIndex: "header",
      key: "header",
    },
    {
      title: "Subheader",
      dataIndex: "subheader",
      key: "subheader",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex justify-center space-x-2">
          <Button
            type="primary"
            className="bg-blue-500"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger className="bg-red-500">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
      className: "text-center",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Category Management</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreate}
        className="mb-4"
      >
        Create New Category
      </Button>

      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="shadow-lg border rounded-lg"
      />

      <Modal
        title={selectedCategory ? "Edit Category" : "Create Category"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          initialValues={selectedCategory || {}}
          onFinish={handleModalSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Code"
            name="code"
            rules={[{ required: false, message: "Please enter the code" }]}
          >
            <Input disabled={selectedCategory} />
          </Form.Item>
          <Form.Item
            label="Value"
            name="value"
            rules={[{ required: true, message: "Please enter the value" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Header"
            name="header"
            rules={[{ required: true, message: "Please enter the header" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Subheader"
            name="subheader"
            rules={[{ required: true, message: "Please enter the subheader" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="text-right">
            <Button
              onClick={() => {
                form.resetFields();
                setIsModalVisible(false);
              }}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerCategory;
