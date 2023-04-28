import { useMatches, useParams } from "@remix-run/react";
import type { Project } from "~/utils/models/models";
const ProjectHeader = () => {
  const matches = useMatches();
  const { projectId } = useParams();
  const projects = matches[0].data.projects;
  const project = projects.find((project: Project) => project.id === projectId);

  const setHeader = () => {
    if (matches[2].id.includes("new-project")) {
      return "New Project";
    }
    if (matches[2].id.includes("edit")) {
      return "Edit Project";
    }
    if (matches[2].id.includes("$projectId")) {
      return project.name;
    }
    return "My Project";
  };

  return (
    <div className="relative w-full flex items-center ">
      <h1 className="  text-center w-full">{setHeader()}</h1>
    </div>
  );
};
export default ProjectHeader;
