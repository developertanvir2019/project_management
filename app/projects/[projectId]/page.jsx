"use client";
// import { useRouter } from "next/router";

import { useParams } from "next/navigation";

export default function ProjectDetails() {
  //   const router = useRouter();
  const { projectId } = useParams();
  console.log(projectId);
  //   const { projectId } = router.query;

  // Fetch specific project data based on projectId and display it

  return (
    <div>
      <h1>Project Details</h1>
      {/* <p>Project ID: {projectId}</p> */}
      {/* Display other project details */}
    </div>
  );
}
