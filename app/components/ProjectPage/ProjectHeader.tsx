import { Link } from "@remix-run/react";
import { useLocation, useMatches } from "@remix-run/react";
const ProjectHeader = () => {
  const { pathname } = useLocation();
  const matches = useMatches();
  const rootData = matches[0].data;
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
    <div className="relative  flex items-center">
      <h1>{setHeader()}</h1>
      {pathname === "/my-project" && rootData.userData && (
        <div className="flex gap-3 absolute top-full">
          <Link
            className="  flex gap-2 items-center border border-slate-400 p-2 rounded-md hover:bg-slate-50"
            to="my-project/new-project"
          >
            New Project <span className=" text-3xl">+</span>
          </Link>
          <Link
            className=" flex gap-2 items-center border border-slate-400 p-2 rounded-md hover:bg-slate-50"
            to="my-project/technology"
          >
            Technology <span className=" text-3xl">+</span>
          </Link>
        </div>
      )}
    </div>
  );
};
export default ProjectHeader;
