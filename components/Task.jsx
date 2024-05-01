import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Select, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const Task = ({ tasks, setTasks }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);
  const [viewTaskDetails, setViewTaskDetails] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: null,
    status: "",
    description: "",
  });
  const [filters, setFilters] = useState({
    status: null,
    dueDate: null,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditedTaskIndex(null);
    setViewTaskDetails(null);
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
    setNewTask({ title: "", dueDate: null, status: "", description: "" });
  };
  const handleEdit = (record) => {
    const index = tasks.findIndex((task) => task === record);
    if (index !== -1) {
      setNewTask({ ...record });
      setEditedTaskIndex(index);
      setIsModalVisible(true);
    }
  };

  const handleDelete = (record) => {
    const updatedTasks = tasks.filter((task) => task !== record);
    setTasks(updatedTasks);
  };

  const handleViewDetails = (record) => {
    setViewTaskDetails(record);
    setIsModalVisible(true);
  };

  const filteredTasks = tasks?.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.dueDate && task.dueDate !== filters.dueDate) return false;
    if (
      searchTerm &&
      !task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

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
        <span>
          {dueDate ? new Date(dueDate).toLocaleDateString() : "4/08/2024"}
        </span>
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
      width: 250,
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
          <Button onClick={() => handleViewDetails(record)}>View</Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <h1 className="text-3xl  text-center pt-5 lg:pt-12 pb-6">All Task</h1>
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search Task"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
            />
            <Select
              defaultValue="Status"
              style={{ width: 120 }}
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Select.Option value="To Do">To Do</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Done">Done</Select.Option>
            </Select>
            <DatePicker
              placeholder="Due Date"
              onChange={(date) => setFilters({ ...filters, dueDate: date })}
            />
          </div>
          <Button
            type="primary"
            className="bg-green-600 ms-8 text-white font-semibold"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Add Task
          </Button>
        </div>
        <div className="overflow-x-auto !w-[100vw] md:!w-full flex justify-center">
          <Table
            pagination={false}
            className="w-[100vw] md:!w-[580px] lg:!w-[580px] overflow-x-auto"
            columns={columns}
            dataSource={filteredTasks}
            bordered
          />
        </div>
      </div>

      <Modal
        title={
          editedTaskIndex !== null
            ? "Edit Task"
            : viewTaskDetails
            ? "Task Details"
            : "Add Task"
        }
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
        {viewTaskDetails ? (
          <div>
            <p>Title: {viewTaskDetails.title}</p>
            <p>Description: {viewTaskDetails.description}</p>
            <p>Due Date: {viewTaskDetails.dueDate}</p>
            <p>Status: {viewTaskDetails.status}</p>
          </div>
        ) : (
          <Form layout="vertical">
            <Form.Item label="Task Name">
              <Input
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
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
          </Form>
        )}
      </Modal>
    </>
  );
};

export default Task;
