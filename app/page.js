"use client";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "antd";
import projectData from "../db.json";

export default function Home() {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: "projects", // Key for the query
    queryFn: () => Promise.resolve(projectData), // Function that fetches the data
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleView = (record) => {
    console.log("View project:", record);
  };

  // Handler for edit button
  const handleEdit = (record) => {
    console.log("Edit project:", record);
  };

  // Handler for delete button
  const handleDelete = (record) => {
    console.log("Delete project:", record);
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      width: 80,
    },
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      width: 180,
    },
    {
      title: "Budget",
      dataIndex: "Budget",
      key: "Budget",
      width: 120,
    },
    {
      title: "Team member",
      dataIndex: "member",
      key: "member",
      width: 140,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 180,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      width: 250,
      render: (_, record) => (
        <div className="flex justify-center gap-3">
          <Button
            type="primary"
            className="bg-primary"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{ marginRight: 8 }}
          >
            View
          </Button>
          <Button
            type="primary"
            className="bg-primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            type="danger"
            className="bg-red-500 text-white font-semibold"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <main className="flex justify-center">
      <div>
        <h1 className="text-3xl font-bold text-center pt-12 pb-6">
          All Projects
        </h1>
        <Table
          pagination={false}
          className="w-[950px]"
          columns={columns}
          dataSource={projects}
          bordered
        />
      </div>
    </main>
  );
}
