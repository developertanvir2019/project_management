import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";

const Task = ({ tasks, setTasks }) => {
  console.log(7777, tasks);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: null,
    status: "",
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddTask = () => {
    // After adding the task, close the modal and clear the form
    setIsModalVisible(false);
    setNewTask({ title: "", dueDate: null });
    setTasks([...tasks, newTask]);
  };

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
      render: (dueDate) => (
        <span>{dueDate ? new Date(dueDate).toLocaleDateString() : "-"}</span>
      ),
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
    <>
      <div>
        <h1 className="text-3xl font-bold text-center pt-12 pb-6">All Task</h1>
        <div className="flex justify-end">
          <Button
            type="primary"
            className="bg-green-600 mb-3 text-white font-semibold"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
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

      <Modal
        title="Add Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="add" type="primary" onClick={handleAddTask}>
            Add
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Task Name">
            <Input
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Status">
            <Select
              value={newTask.status}
              onChange={(value) => setNewTask({ ...newTask, status: value })}
            >
              <Option value="To Do">To Do</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Done">Done</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Due Date">
            <DatePicker
              value={newTask.dueDate}
              onChange={(date) => setNewTask({ ...newTask, dueDate: date })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Task;
