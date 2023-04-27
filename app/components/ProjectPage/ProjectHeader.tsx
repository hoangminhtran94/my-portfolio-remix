import { useMatches } from "@remix-run/react";
const ProjectHeader = () => {
  const matches = useMatches();

  const setHeader = () => {
    if (matches[2].id.includes("new-project")) {
      return "New Project";
    }
    if (matches[2].id.includes("$projectId")) {
      return "Edit Project";
    }
    if (matches[2].id.includes("technology")) {
      return "Technology";
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
