import { useMatches } from "@remix-run/react";

const ProjectHeader = () => {
  const matches = useMatches();

  const setHeader = () => {
    if (matches[2].id.includes("technology")) {
      return "Technology";
    }
    if (matches[2].id.includes("new-project")) {
      return "New Project";
    }
    if (matches[2].id.includes("edit")) {
      return "Edit Project";
    }

    return "My Projects";
  };

  return (
    <div className="relative w-full flex items-center ">
      <h1 className="text-center w-full frost-text">{setHeader()}</h1>
    </div>
  );
};
export default ProjectHeader;
