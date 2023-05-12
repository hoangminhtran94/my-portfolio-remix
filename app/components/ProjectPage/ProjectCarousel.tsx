import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { FC } from "react";
import * as animation from "~/utils/FramerMotionVariants/animationVariants";
import ImageCarousel from "../UI/ImageCarousel/ImageCarousel";
import NavigtionDot from "../UI/NavigationDot/NavigationDot";
import type { Project } from "~/utils/models/models";

import { useMatches, useSearchParams } from "@remix-run/react";

import ProjectDetail from "./ProjectDetail";

interface ProjectCarouselProps {
  projects: Project[];
  toggleViewImage: boolean;
}
const ProjectCarousel: FC<ProjectCarouselProps> = ({
  projects,
  toggleViewImage = false,
}) => {
  const [searhParams, setSearchParams] = useSearchParams();

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
    <div className="w-full min-h-[600px] md:min-h-[900px] flex-1 flex flex-col">
      <div className="w-full  rounded-lg border border-indigo-200 flex-1 min-h-max relative overflow-hidden shadow-md">
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
              className={`${toggleViewImage ? "!hidden" : ""}   lg:!flex`}
              project={currentProject}
              enableEdit={!!rootData.userData}
            />

            <div
              className={`${
                toggleViewImage ? "block" : "hidden"
              } lg:block flex-1 border-l  border-slate-50`}
            >
              <ImageCarousel images={currentProject.projectImages} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex h-max justify-between w-[95%] md:w-3/4 mx-auto items-center mt-6">
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
                  (prev) => {
                    prev.set("project", index.toString());
                    return prev;
                  },
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
