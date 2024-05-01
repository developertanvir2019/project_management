import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Select, Table } from "antd";
import { useState } from "react";

const Task = ({ tasks, setTasks }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);
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
    setEditedTaskIndex(null);
  };

  const handleAddTask = () => {
    setIsModalVisible(false);
    if (editedTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editedTaskIndex] = newTask;
      setTasks(updatedTasks);
      setEditedTaskIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setNewTask({ title: "", dueDate: null, status: "" });
  };

  const handleEdit = (record, index) => {
    setNewTask(record);
    setEditedTaskIndex(index);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    const updatedTasks = tasks.filter((task) => task !== record);
    setTasks(updatedTasks);
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
      render: (_, record, index) => (
        <div className="flex justify-center gap-3">
          <Button
            type="primary"
            className="bg-primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record, index)}
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
            onClick={showModal}
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
        title={editedTaskIndex !== null ? "Edit Task" : "Add Task"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="add" type="primary" onClick={handleAddTask}>
            {editedTaskIndex !== null ? "Save" : "Add"}
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
              <Select.Option value="To Do">To Do</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Done">Done</Select.Option>
            </Select>
          </Form.Item>
          {/* <Form.Item label="Due Date">
            <DatePicker
              value={newTask.dueDate ? new Date(newTask.dueDate) : null}
              onChange={(date) => setNewTask({ ...newTask, dueDate: date })}
            />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default Task;
