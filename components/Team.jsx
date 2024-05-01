import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Form, Input } from "antd";
import { useState } from "react";

const TeamMember = ({ tasks, setTeam }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedMember, setEditedMember] = useState(null);
  const [newMember, setNewMember] = useState({
    id: tasks?.length + 1,
    name: "",
    email: "",
  });

  const showModal = (member) => {
    setIsModalVisible(true);
    if (member) {
      setEditedMember(member);
      setNewMember({ ...member });
    } else {
      setEditedMember(null);
      setNewMember({ id: tasks.length + 1, name: "", email: "" });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditedMember(null);
    setNewMember({ id: tasks.length + 1, name: "", email: "" });
  };

  const handleSave = () => {
    setIsModalVisible(false);
    if (editedMember) {
      const updatedTasks = tasks.map((task) =>
        task.id === editedMember.id ? newMember : task
      );
      setTeam(updatedTasks);
    } else {
      setTeam([...tasks, newMember]);
    }
    setEditedMember(null);
    setNewMember({ id: tasks.length + 1, name: "", email: "" });
  };

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
            type="primary"
            className="bg-primary"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
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
      <h1 className="text-3xl  text-center pt-12 pb-6">Team Members</h1>
      <div className="flex justify-end">
        <Button
          type="primary"
          className="bg-green-600 mb-3 text-white font-semibold"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Add Member
        </Button>
      </div>
      <div className="overflow-x-auto !w-[100vw] md:!w-full flex justify-center">
        <Table
          pagination={false}
          className="w-[100vw] md:!w-[580px] lg:!w-[580px] overflow-x-auto"
          columns={columns}
          dataSource={tasks}
          bordered
        />
      </div>

      <Modal
        title={editedMember ? "Edit Member" : "Add Member"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={newMember.email}
              onChange={(e) =>
                setNewMember({ ...newMember, email: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamMember;
