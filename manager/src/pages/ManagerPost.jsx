import { useEffect, useState } from "react";
import { Table, Button, Input, Select } from "antd";
import { getAllPost, updatePostStatus } from "../service/postService"; // Ensure you have updatePostStatus in your service
import { BsEyeSlash, BsFillEyeSlashFill } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";

const ManagerPost = () => {
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState(""); // State for search input

  const fetchPosts = async () => {
    const res = await getAllPost();
    if (res.data.err === 0) {
      setPosts(res.data.response);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleStatusChange = async (id, status) => {
    const res = await updatePostStatus({ isActive: status }, id);
    if (res.data.err === 0) {
      fetchPosts();
    }
  };

  const handleTitleSearch = (value) => {
    setSearchTitle(value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="max-w-60 line-clamp-2">{text}</span>,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Star",
      dataIndex: "star",
      key: "star",
      sorter: (a, b) => a.star - b.star,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => <span className="max-w-60 line-clamp-2">{text}</span>,
    },
    {
      title: "Price",
      dataIndex: "attributes.price",
      key: "price",
      render: (text, render) => (
        <span className="max-w-60 line-clamp-2">{render.attributes.price}</span>
      ),
      sorter: (a, b) => a.attributes.price - b.attributes.price,
    },
    {
      title: "Acreage",
      dataIndex: "attributes.acreage",
      key: "acreage",
      render: (text, render) => (
        <span className="max-w-60 line-clamp-2">
          {render.attributes.acreage}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (text) => <span
        className={`${text === 1 ? "text-green-500" : "text-red-500"
          } font-semibold`}
      >
        {text === 1 ? "Hoạt động" : "Đã ẩn"}
      </span>,
      filters: [
        { text: "Hoạt động", value: 1 },
        { text: "Đã ẩn", value: 0 },
      ],
      onFilter: (value, record) => record.isActive === value,
    },
    {
      title: "Contact",
      key: "contact",
      render: (text, record) => (
        <div>
          <p>Name: {record.user.name}</p>
          <p>Zalo: {record.user.zalo}</p>
          <p>Phone: {record.user.phone}</p>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() =>
            handleStatusChange(record.id, record.isActive === 1 ? 0 : 1)
          }
          type={record.isActive === 1 ? "default" : "primary"} // Use 'default' for Hide and 'primary' for Approve
          className={`transition-colors duration-300 ${record.isActive === 1
            ? "bg-blue-500 text-white"
            : "bg-red-500 text-white"
            }`}
        >
          {record.isActive === 1 ? "Ẩn bài viết" : "Duyệt"}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Input
        placeholder="Search by Title"
        value={searchTitle}
        onChange={(e) => handleTitleSearch(e.target.value)}
        className="border border-gray-300 my-4 p-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        prefix={<SearchOutlined className="text-gray-500" />}
        allowClear
      />

      <Table
        columns={columns}
        dataSource={filteredPosts}
        rowKey="id"
        pagination={{
          pageSize: 10,
          total: filteredPosts.length,
          showTotal: (total) => `Total ${total} items`,
        }}
        className="bg-white rounded shadow-lg p-4"
      />
    </div>
  );
};

export default ManagerPost;
