import ProjectCarousel from "~/components/ProjectPage/ProjectCarousel";
import {
  Link,
  useLocation,
  useMatches,
  useSearchParams,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import Switch from "~/components/UI/Switch/Switch";
import { useState, useEffect } from "react";
import ProjectListByFrontEnd from "~/components/ProjectPage/ProjectListByFrontEnd";
import ProjectListByBackend from "~/components/ProjectPage/ProjectByBackend";

const MyProject = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultMode =
    !searchParams.get("mode") || searchParams.get("mode") === "list"
      ? false
      : true;
  const defaultFilterMode =
    !searchParams.get("filterBy") || searchParams.get("filterBy") === "frontend"
      ? false
      : true;
  const [toggleMode, setToggleMode] = useState(defaultMode);
  const [toggleFilterMode, setToggleFilterMode] = useState(defaultFilterMode);

  const matches = useMatches();
  const rootData = matches[0].data;
  const projects = rootData.projects;

  useEffect(() => {
    if (toggleMode) {
      setSearchParams(
        (prev) => {
          prev.set("mode", "carousel");

          return prev;
        },
        { preventScrollReset: true }
      );
    } else {
      setSearchParams(
        (prev) => {
          prev.set("mode", "list");
          return prev;
        },
        { preventScrollReset: true }
      );
    }
    if (toggleFilterMode) {
      setSearchParams(
        (prev) => {
          prev.set("filterBy", "backend");
          return prev;
        },
        { preventScrollReset: true }
      );
    } else {
      setSearchParams(
        (prev) => {
          prev.set("filterBy", "frontend");
          return prev;
        },
        { preventScrollReset: true }
      );
    }
  }, [setSearchParams, toggleFilterMode, toggleMode]);
  console.log(projects);
  return (
    <div className="h-full w-full flex-1 flex flex-col gap-6 justify-center">
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
      <div className="w-full flex gap-5 justify-end">
        <Switch
          className={toggleMode ? "!hidden" : ""}
          label={
            toggleFilterMode
              ? "Filtered by back-end technologies"
              : "Filtered by front-end technologies"
          }
          onChange={() => {
            setToggleFilterMode((prev) => {
              return !prev;
            });
          }}
          defaultChecked={toggleFilterMode}
        />
        <Switch
          label={toggleMode ? "View by carousel" : "View by list"}
          onChange={() => {
            setToggleMode((prev) => {
              return !prev;
            });
          }}
          defaultChecked={toggleMode}
        />
      </div>

      <div
        className={`${
          !toggleMode && "hidden"
        } h-[500px]   md:h-[1200px] lg:h-[900px]    text-slate-600 w-full rounded-md`}
      >
        <ProjectCarousel projects={projects} />
      </div>

      <div className={`${toggleMode && "hidden"} min-h-[700px] `}>
        {!toggleFilterMode ? (
          <ProjectListByFrontEnd projects={projects} />
        ) : (
          <ProjectListByBackend projects={projects} />
        )}
      </div>
    </div>
  );
};
export default MyProject;

export const meta: MetaFunction = () => {
  return { title: "My Projects" };
};
