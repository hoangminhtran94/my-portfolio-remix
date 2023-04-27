import ProjectCarousel from "~/components/ProjectPage/ProjectCarousel";
import { Link, useLocation, useMatches } from "@remix-run/react";

const MyProject = () => {
  const { pathname } = useLocation();
  const matches = useMatches();
  const rootData = matches[0].data;
  const projects = matches[0].data.projects;

  return (
    <div className="h-full w-full flex flex-col gap-6 justify-center">
      {pathname === "/my-project" && rootData.userData && (
        <div className="flex gap-3 top-full">
          <Link
            className="  flex justify-center bg-white flex-1 gap-2 items-center border border-slate-400 p-2 rounded-md hover:bg-slate-50"
            to="new-project"
          >
            New Project <span className=" text-3xl">+</span>
          </Link>
          <Link
            className=" flex-1 justify-center bg-white  flex gap-2 items-center border border-slate-400 p-2 rounded-md hover:bg-slate-50"
            to="technology"
          >
            Technology <span className=" text-3xl">+</span>
          </Link>
        </div>
      )}
      <div className=" h-[900px]  md:h-[900px] text-slate-600 w-full rounded-md">
        <ProjectCarousel projects={projects} />
      </div>
    </div>
  );
};
export default MyProject;
