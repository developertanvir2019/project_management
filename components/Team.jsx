import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";

const TeamMember = ({ tasks }) => {
  console.log("object", tasks);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "name",
      render: (text) => <a>{text}</a>,
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
    <div>
      <h1 className="text-3xl font-bold text-center pt-12 pb-6">
        Team Members
      </h1>
      <div className="flex justify-end">
        <Button
          type="primary"
          className="bg-green-600 mb-3 text-white font-semibold"
          icon={<PlusOutlined />}
          onClick={() => handleDelete(record)}
        >
          Add Member
        </Button>
      </div>
      <Table
        pagination={false}
        className="w-[580px]"
        columns={columns}
        dataSource={tasks}
        bordered
      />
    </div>
  );
};

export default TeamMember;
