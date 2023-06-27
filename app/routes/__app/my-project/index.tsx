import ProjectCarousel from "~/components/ProjectPage/ProjectCarousel";
import {
  Link,
  useLoaderData,
  useLocation,
  useMatches,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import Switch from "~/components/UI/Switch/Switch";
import { useState, useEffect } from "react";
import ProjectListByFrontEnd from "~/components/ProjectPage/ProjectListByFrontEnd";
import ProjectListByBackend from "~/components/ProjectPage/ProjectByBackend";
import SkillShowCase from "~/components/UI/SkillsShowCase/SkillsShowCase";
import { getTechnologyGroups } from "~/utils/database/skills.server";

const MyProject = () => {
  const loaderData = useLoaderData();
  const { pathname } = useLocation();
  const navigate = useNavigate();
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
  const [toogleViewImage, setToggleViewImage] = useState(false);
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

  return (
    <div className="w-full flex-1 2xl:min-h-[1000px] flex flex-col gap-6">
      {pathname === "/my-project" && rootData.userData && (
        <div className="flex gap-3 top-full">
          <Link
            className="  flex justify-center  flex-1 gap-2 items-center border border-indigo-400 p-2 rounded-md hover:bg-indigo-500 hover:text-white"
            to="new-project"
          >
            New Project <span className=" text-3xl">+</span>
          </Link>
          <Link
            className=" flex-1 justify-center  flex gap-2 items-center border border-indigo-400 p-2 rounded-md  hover:bg-indigo-500 hover:text-white"
            to="technology"
          >
            Technology <span className=" text-3xl">+</span>
          </Link>
        </div>
      )}
      <div className="w-full flex gap-5 py-4 justify-end flex-wrap">
        <Switch
          label="View Image"
          className={`${!toggleMode && "hidden"} lg:hidden `}
          onChange={() => {
            setToggleViewImage((prev) => !prev);
          }}
          defaultChecked={false}
        />
        <Switch
          className={toggleMode ? "!hidden" : ""}
          label={
            toggleFilterMode
              ? "View by back-end technologies"
              : "View by front-end technologies"
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
        } flex-1  flex  text-slate-600 w-full rounded-md`}
      >
        <ProjectCarousel
          toggleViewImage={toogleViewImage}
          projects={projects}
        />
      </div>

      <div className={`${toggleMode && "hidden"}  `}>
        {!toggleFilterMode ? (
          <ProjectListByFrontEnd projects={projects} />
        ) : (
          <ProjectListByBackend projects={projects} />
        )}
      </div>
      {/*Skills*/}
      <SkillShowCase skillsData={loaderData} />
    </div>
  );
};
export default MyProject;

export const meta: MetaFunction = () => {
  return { title: "My Projects" };
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    return json({
      frontends: await getTechnologyGroups("frontend"),
      backends: await getTechnologyGroups("backend"),
    });
  } catch (error) {
    return json({
      frontends: [],
      backends: [],
    });
  }
};
