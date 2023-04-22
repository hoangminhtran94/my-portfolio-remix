import { Link } from "@remix-run/react";
import { useLocation, useMatches } from "@remix-run/react";
const ProjectHeader = () => {
  const { pathname } = useLocation();
  const matches = useMatches();
  const rootData = matches[0].data;
  return (
    <div className="relative  flex items-center">
      <h1>
        {matches[2].id.includes("new-project")
          ? "New Project"
          : matches[2].id.includes("$projectId")
          ? "Edit Project"
          : "My Project"}
      </h1>
      {pathname === "/my-project" && rootData && (
        <Link
          className=" absolute top-full flex gap-2 items-center border border-slate-400 p-2 rounded-md hover:bg-slate-50"
          to="my-project/new-project"
        >
          New Project <span className=" text-3xl">+</span>
        </Link>
      )}
    </div>
  );
};
export default ProjectHeader;
