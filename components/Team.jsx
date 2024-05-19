import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Form, Input } from "antd";
import { useState } from "react";

const TeamMember = ({ tasks, setTeam }) => {
  const handleDelete = (record) => {
    const updatedMember = tasks.filter((member) => member !== record);
    setTeam(updatedMember);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      width: 180,
      render: (_, record) => (
        <div className="flex justify-center gap-3">
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
    <div>
      <h1 className="text-3xl  text-center pt-12 pb-6">Team Members</h1>
      <div className="overflow-x-auto !w-[100vw] md:!w-full flex justify-center">
        <Table
          pagination={false}
          className="w-[100vw] md:!w-[580px] lg:!w-[580px] overflow-x-auto"
          columns={columns}
          dataSource={tasks}
          bordered
        />
      </div>
    </div>
  );
};

export default TeamMember;
