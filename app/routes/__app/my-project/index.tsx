import ProjectCarousel from "~/components/ProjectPage/ProjectCarousel";
import {
  Link,
  useLocation,
  useMatches,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import Switch from "~/components/UI/Switch/Switch";
import { useState, useEffect } from "react";
import ProjectListByFrontEnd from "~/components/ProjectPage/ProjectListByFrontEnd";
import ProjectListByBackend from "~/components/ProjectPage/ProjectByBackend";

const MyProject = () => {
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
    <div className="w-full flex-1 2xl:min-h-[1000px] flex flex-col gap-6  ">
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
      <div className="w-full flex gap-5  justify-end flex-wrap">
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
      <div className="flex min-h-[1000px] flex-col  md:flex-row  md:items-center flex-1    gap-14  2xl:gap-[100px]">
        <div className="card flex-1 h-[500px]">
          <div className="imgbox">
            <div className="img"></div>
          </div>
          <div className="details">
            <h2 className="title">John Doe</h2>
            <span className="caption">Developer</span>
          </div>
        </div>
        <div
          className="relative flex-1 md:min-h-[500px]   border border-indigo-100 rounded-lg overflow-hidden shadow-lg  flex justify-center items-center cursor-pointer gap-[16px] transition-all hover:scale-105 lg:hover:scale-[1.1] hover:z-10"
          onClick={() => {
            navigate("back-end");
          }}
        >
          <div className=" absolute top-0 right-0 w-full h-full backend-bg  shadow-lg rounded-lg " />
          <span className="z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={64}
              height={64}
              viewBox="0 0 48 48"
            >
              <g data-name="Layer 2">
                <path
                  fill="#1e40af"
                  d="M42,42H8a1,1,0,0,1-1-1V7A1,1,0,0,1,8,6H42a1,1,0,0,1,1,1V41A1,1,0,0,1,42,42ZM9,40H41V8H9Z"
                />
                <circle cx="12" cy="11" r="1" fill="#1e40af" />
                <circle cx="16" cy="11" r="1" fill="#1e40af" />
                <circle cx="20" cy="11" r="1" fill="#1e40af" />
                <path
                  fill="#1e40af"
                  d="M22 16H8a1 1 0 0 1 0-2H21.59l3.7-3.71A1 1 0 0 1 26 10H42a1 1 0 0 1 0 2H26.41l-3.7 3.71A1 1 0 0 1 22 16zM19.27 25h-.54A2.74 2.74 0 0 1 16 22.27V19a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3.27A2.74 2.74 0 0 1 19.27 25zM18 20v2.27a.73.73 0 0 0 .73.73h.54a.73.73 0 0 0 .73-.73V20zM22 34H16a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z"
                />
                <path
                  fill="#1e40af"
                  d="M23,42H15a1,1,0,0,1-1-1V37a1,1,0,0,1,1-1,1,1,0,0,0,1-1V33a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2a.93.93,0,0,0,.29.69A1,1,0,0,0,23,36a1,1,0,0,1,1,1v4A1,1,0,0,1,23,42Zm-7-2h6V37.83A3,3,0,0,1,20,35V34H18v1a3,3,0,0,1-2,2.83Z"
                />
                <path
                  fill="#1e40af"
                  d="M19 34a1 1 0 0 1-1-1V24a1 1 0 0 1 2 0v9A1 1 0 0 1 19 34zM33 18.8a6.54 6.54 0 0 0-.59-.3 1 1 0 0 0-1.41.91v4l-1 .5-1-.5v-4a1 1 0 0 0-1.41-.91A6 6 0 0 0 27 29.19V41a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V29.19A6 6 0 0 0 33 18.8zm0 7.84a4 4 0 0 1-1.4 1 1 1 0 0 0-.6.92V40H29V28.58a1 1 0 0 0-.6-.92 4 4 0 0 1-1.4-6.3V24a1 1 0 0 0 .55.89l2 1a1 1 0 0 0 .9 0l2-1A1 1 0 0 0 33 24V21.36a4 4 0 0 1 0 5.28z"
                />
                <rect
                  width="3"
                  height="28"
                  x="38"
                  y="12"
                  fill="#1e40af"
                  opacity=".5"
                />
                <path
                  fill="#1e40af"
                  d="M38 37h0a0 0 0 0 1 0 0v3a0 0 0 0 1 0 0H35a0 0 0 0 1 0 0v0A3 3 0 0 1 38 37zM31 38h0a0 0 0 0 1 0 0v2a0 0 0 0 1 0 0H29a0 0 0 0 1 0 0v0A2 2 0 0 1 31 38zM20 38h0a0 0 0 0 1 0 0v2a0 0 0 0 1 0 0H18a0 0 0 0 1 0 0v0A2 2 0 0 1 20 38zM20 21h0a0 0 0 0 1 0 0v2a0 0 0 0 1 0 0H18a0 0 0 0 1 0 0v0A2 2 0 0 1 20 21zM41 10H34a2 2 0 0 0 2-2h5z"
                  opacity=".5"
                />
                <rect
                  width="2"
                  height="5"
                  x="20"
                  y="35"
                  fill="#1e40af"
                  opacity=".5"
                />
              </g>
            </svg>
          </span>
          <h2 className="frost-text z-10 text-[40px] ">Back-end</h2>
        </div>
      </div>
    </div>
  );
};
export default MyProject;

export const meta: MetaFunction = () => {
  return { title: "My Projects" };
};
