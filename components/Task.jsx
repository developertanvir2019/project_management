import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";

const Task = ({ tasks }) => {
  console.log("object", tasks);
  const columns = [
    {
      title: "Task Name",
      dataIndex: "title",
      key: "name",
      render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "startDate",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "startDate",
      width: 100,
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
      <h1 className="text-3xl font-bold text-center pt-12 pb-6">All Task</h1>
      <div className="flex justify-end">
        <Button
          type="primary"
          className="bg-green-600 mb-3 text-white font-semibold"
          icon={<PlusOutlined />}
          onClick={() => handleDelete(record)}
        >
          Add Task
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

export default Task;
