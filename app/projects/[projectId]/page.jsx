"use client";
import { useParams } from "next/navigation";
import projectData from "@/db.json";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Task from "@/components/Task";
import TeamMember from "@/components/Team";
export default function ProjectDetails() {
  const { projectId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"], // Key for the query
    queryFn: () => Promise.resolve(projectData.projects), // Function that fetches the data
  });
  const [tasks, setTasks] = useState();
  const [team, setTeam] = useState();
  useEffect(() => {
    if (data) {
      const specificProject = data.find((project) => project.id == projectId);
      if (specificProject) {
        setTasks(specificProject.tasks);
        const allTeams = specificProject.tasks.flatMap((task) => task.team);
        setTeam(allTeams);
      }
    }
  }, [data, projectId]);
  return (
    <div className="mb-12">
      <h1 className="text-center text-3xl font-bold py-4 lg:py-8">
        {" "}
        Project Details
      </h1>
      <div>
        <div className="block lg:flex justify-between gap-5 ">
          <Task setTasks={setTasks} tasks={tasks} />
          <TeamMember setTeam={setTeam} tasks={team} />
        </div>
      </div>
    </div>
  );
}
