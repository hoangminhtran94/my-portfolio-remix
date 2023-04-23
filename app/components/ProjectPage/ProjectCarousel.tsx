import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { FC } from "react";
import * as animation from "~/utils/FramerMotionVariants/animationVariants";
import ImageCarousel from "../UI/ImageCarousel/ImageCarousel";
import NavigtionDot from "../UI/NavigationDot/NavigationDot";
import type { Project } from "~/utils/models/models";
import Button from "../UI/Button/Button";
import { useMatches } from "@remix-run/react";

interface ProjectCarouselProps {
  projects: Project[];
}
const ProjectCarousel: FC<ProjectCarouselProps> = ({ projects }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
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
    setCurrentProjectIndex((prev) => prev + 1);
    if (currentProjectIndex === projects.length - 1) {
      setCurrentProjectIndex(0);
    }
    setNextProject(true);
  };
  const previousHandler = () => {
    setCurrentProjectIndex((prev) => prev - 1);
    if (currentProjectIndex === 0) {
      setCurrentProjectIndex(projects.length - 1);
    }
    setNextProject(false);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full rounded-lg h-full relative overflow-hidden">
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
            className=" absolute left-0 top-0 flex h-full min-w-full"
          >
            <div className="p-[48px] w-1/2 flex flex-col items-center justify-center">
              <div className="flex gap-8 w-full flex-col flex-1">
                <h2 className="h-fit">{currentProject.name}</h2>
                {currentProject.description && (
                  <div>
                    <h3>Description</h3>
                    <p className="text-lg">{currentProject.description}</p>
                  </div>
                )}
                {currentProject.technologies.length > 0 && (
                  <div>
                    <h3>Technologies</h3>
                    <div className="flex gap-2 text-lg">
                      {currentProject.technologies.map((tech) => (
                        <span key={tech.id}>{tech.name}</span>
                      ))}
                    </div>
                  </div>
                )}
                {currentProject.demoLink && (
                  <div>
                    <h3>Link</h3>
                    <a
                      className="text-lg"
                      href={currentProject.demoLink}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Visit the demo website
                    </a>
                  </div>
                )}
                {currentProject.githubLink && (
                  <div>
                    <h3>Project respository</h3>
                    <a
                      className="text-lg"
                      href={currentProject.githubLink}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Visit the project source code
                    </a>
                  </div>
                )}
              </div>
              {rootData.userData && (
                <Button className="w-full" to={currentProject.id}>
                  Edit
                </Button>
              )}
            </div>
            <div className="flex-1">
              <ImageCarousel images={currentProject.projectImages} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between w-1/2 mx-auto items-center mt-6">
        <span
          className={`${
            disableButtons && "pointer-events-none"
          } cursor-pointer flex items-center gap-2 opacity-70 hover:opacity-100 hover:scale-110 `}
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
          Previous
        </span>
        <div className="flex gap-4">
          {projects.map((_, index) => (
            <NavigtionDot
              onClick={() => {
                setUsingNavigationDot(true);
                setCurrentProjectIndex(index);
              }}
              key={index}
              selected={currentProjectIndex === index}
            />
          ))}
        </div>

        <span
          className={`${
            disableButtons && "pointer-events-none"
          } cursor-pointer flex items-center gap-2 opacity-70 hover:opacity-100 hover:scale-110 `}
          onClick={nextHandler}
        >
          Next
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
