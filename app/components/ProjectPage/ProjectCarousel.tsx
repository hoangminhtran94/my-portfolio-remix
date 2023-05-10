import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import type { FC } from "react";
import * as animation from "~/utils/FramerMotionVariants/animationVariants";
import ImageCarousel from "../UI/ImageCarousel/ImageCarousel";
import NavigtionDot from "../UI/NavigationDot/NavigationDot";
import type { Project } from "~/utils/models/models";

import { useMatches, useSearchParams } from "@remix-run/react";

import ProjectDetail from "./ProjectDetail";

interface ProjectCarouselProps {
  projects: Project[];
}
const ProjectCarousel: FC<ProjectCarouselProps> = ({ projects }) => {
  const [searhParams, setSearchParams] = useSearchParams();
  const [toggleMode, setToggleMode] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(
    searhParams.get("project") ? +searhParams.get("project")! : 0
  );
  const [disableButtons, setDisabledButtons] = useState(false);
  const [nextProject, setNextProject] = useState(true);
  const [usingNavigationDot, setUsingNavigationDot] = useState(false);
  const matches = useMatches();
  const rootData = matches[0].data;

  if (!projects || projects.length === 0) {
    return <div></div>;
  }

  const currentProject = projects[currentProjectIndex];

  const nextHandler = () => {
    setCurrentProjectIndex((prev) => {
      return prev + 1;
    });
    setSearchParams(
      (prev) => {
        prev.set("project", (+prev.get("project")! + 1).toString());
        return prev;
      },
      { preventScrollReset: true }
    );

    if (currentProjectIndex === projects.length - 1) {
      setCurrentProjectIndex(0);
      setSearchParams({ project: "0" }, { preventScrollReset: true });
    }
    setNextProject(true);
  };
  const previousHandler = () => {
    setCurrentProjectIndex((prev) => prev - 1);
    setSearchParams(
      (prev) => {
        prev.set("project", (+prev.get("project")! - 1).toString());
        return prev;
      },
      { preventScrollReset: true }
    );
    if (currentProjectIndex === 0) {
      setCurrentProjectIndex(projects.length - 1);
      setSearchParams(
        (prev) => {
          prev.set("project", (projects.length - 1).toString());
          return prev;
        },
        { preventScrollReset: true }
      );
    }
    setNextProject(false);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <label className="md:hidden relative inline-flex mx-auto justify-center items-center cursor-pointer mb-6">
        <input
          onChange={() => {
            setToggleMode((prev) => !prev);
          }}
          type="checkbox"
          value=""
          className="sr-only peer"
        />
        <div
          className="w-11 h-6 bg-gray-200 peer-focus:outline-none 
        peer-focus:ring-4 peer-focus:ring-blue-300 
         rounded-full peer 
        peer-checked:after:translate-x-full peer-checked:after:border-white
         after:content-[''] after:absolute after:top-[2px] 
         after:left-[2px] after:bg-white after:border-gray-300 after:border 
         after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        ></div>
        <span className="ml-3 text-md  text-slate-700 ">
          Show project images
        </span>
      </label>
      <div className="w-full  rounded-lg border border-indigo-200 h-full relative overflow-hidden shadow-md">
        <AnimatePresence
          custom={{ next: nextProject, usingDot: usingNavigationDot }}
          initial={false}
        >
          <motion.div
            onAnimationStart={() => {
              setDisabledButtons(true);
            }}
            variants={animation.carousel}
            custom={{ next: nextProject, usingDot: usingNavigationDot }}
            initial="initial"
            animate="animate"
            onAnimationComplete={() => {
              setDisabledButtons(false);
              if (usingNavigationDot) {
                setUsingNavigationDot(false);
              }
            }}
            exit="exit"
            key={currentProject.id}
            className=" overflow-auto md:overflow-visible absolute left-0 top-0  flex flex-col-reverse flex-1 lg:flex-row h-full min-w-full"
          >
            <ProjectDetail
              className={`${toggleMode ? "!hidden" : ""} md:!flex`}
              project={currentProject}
              enableEdit={!!rootData.userData}
            />

            <div
              className={`${
                toggleMode ? "block" : "hidden"
              } md:block flex-1 border-l  border-slate-50`}
            >
              <ImageCarousel images={currentProject.projectImages} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between w-[95%] md:w-3/4 mx-auto items-center mt-6">
        <span
          className={`${
            disableButtons && "pointer-events-none"
          } cursor-pointer flex items-center font-bold gap-2 opacity-70 hover:opacity-100 hover:scale-110 `}
          onClick={previousHandler}
        >
          <svg
            className="w-5"
            fill="#494949"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 512"
          >
            <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
          </svg>
          <span className="hidden md:inline"> Previous</span>
        </span>
        <div className="flex gap-4">
          {projects.map((_, index) => (
            <NavigtionDot
              onClick={() => {
                setUsingNavigationDot(true);
                setCurrentProjectIndex(index);
                setSearchParams(
                  { project: index.toString() },
                  { preventScrollReset: true }
                );
              }}
              key={index}
              selected={currentProjectIndex === index}
            />
          ))}
        </div>

        <span
          className={`${
            disableButtons && "pointer-events-none"
          } cursor-pointer font-bold  flex items-center gap-2 opacity-70 hover:opacity-100 hover:scale-110 `}
          onClick={nextHandler}
        >
          <span className="hidden md:inline"> Next</span>

          <svg
            className="w-5"
            fill="#494949"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 512"
          >
            <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
          </svg>
        </span>
      </div>
    </div>
  );
};
export default ProjectCarousel;
