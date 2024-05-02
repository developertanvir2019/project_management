"use client";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Input, InputNumber, Modal, Table } from "antd";
import projectData from "../../db.json";
import { useEffect, useState } from "react";
import Link from "next/link";

const ProjectPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"], // Key for the query
    queryFn: () => Promise.resolve(projectData.projects), // Function that fetches the data
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProject, setEditedProject] = useState(null);
  const [projects, setProjects] = useState(data);
  useEffect(() => {
    setProjects(data);
  }, [data]);
  // Handler for edit button
  const handleEdit = (record) => {
    setEditedProject(record);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // Find the index of the edited project in the projects array
    const index = projects.findIndex(
      (project) => project.id === editedProject.id
    );
    if (index !== -1) {
      // Update the project in the projects array
      const updatedProjects = [...projects];
      updatedProjects[index] = editedProject;
      setProjects(updatedProjects);
    }
    setIsModalOpen(false);
  };

  // Handler for delete button
  const handleDelete = (record) => {
    const remainingProject = projects?.filter((pro) => pro?.id !== record?.id);
    setProjects(remainingProject);
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "id",
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
      dataIndex: "budget",
      key: "Budget",
      width: 120,
    },
    {
      title: "Team member",
      dataIndex: "teamMember",
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
          <Link href={`/projects/${record.id}`}>
            <Button
              type="primary"
              className="bg-primary"
              icon={<EyeOutlined />}
              style={{ marginRight: 8 }}
            >
              View
            </Button>
          </Link>
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
  if (isLoading) {
    return (
      <div className="text-center font-semibold text-lg mt-12">Loading...</div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="flex justify-center">
      <>
        <Modal
          title="Edit Project"
          visible={isModalOpen}
          onOk={handleSave}
          onCancel={() => setIsModalOpen(false)}
        >
          <Input
            value={editedProject?.name}
            onChange={(e) =>
              setEditedProject({ ...editedProject, name: e.target.value })
            }
            placeholder="Project Name"
          />
          <InputNumber
            value={editedProject?.budget}
            onChange={(value) =>
              setEditedProject({ ...editedProject, budget: value })
            }
            placeholder="Budget"
            style={{ marginTop: "1rem", width: "100%" }}
          />
          <InputNumber
            value={editedProject?.teamMember}
            onChange={(value) =>
              setEditedProject({ ...editedProject, teamMember: value })
            }
            placeholder="Team member"
            style={{ marginTop: "1rem", width: "100%" }}
          />
          <Input
            value={editedProject?.startDate}
            onChange={(e) =>
              setEditedProject({ ...editedProject, startDate: e.target.value })
            }
            placeholder="Start Date"
            style={{ marginTop: "1rem", width: "100%" }}
          />
        </Modal>
      </>
      <div>
        <h1 className="text-3xl font-bold text-center pt-12 pb-6">
          All Projects
        </h1>
        <div className="overflow-x-auto sm:!w-[100vw] md:w-full flex justify-center">
          <Table
            pagination={false}
            className="w-[100vw] md:!w-[950px] lg:!w-[950px] overflow-x-auto"
            columns={columns}
            dataSource={projects}
            bordered
          />
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
