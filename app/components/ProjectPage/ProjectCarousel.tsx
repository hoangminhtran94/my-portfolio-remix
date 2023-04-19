import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import * as animation from "~/utils/FramerMotionVariants/animationVariants";
import ImageCarousel from "../UI/ImageCarousel/ImageCarousel";
import NavigtionDot from "../UI/NavigationDot/NavigationDot";

const ProjectCarousel = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [disableButtons, setDisabledButtons] = useState(false);
  const [nextProject, setNextProject] = useState(true);
  const [usingNavigationDot, setUsingNavigationDot] = useState(false);

  const Projects = [
    {
      id: "project1",
      name: "Smartliving Property",
      description: "This is project for property management company",
      projectImages: [
        "https://images.unsplash.com/photo-1652449823136-b279fbe5dfd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
        "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
        "https://images.unsplash.com/photo-1636629198288-8fe85b92110a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=878&q=80",
      ],
    },
    {
      id: "project2",
      name: "Zillow clone",
      description: "This is a clone of zillow, a real estate website",
      projectImages: [
        "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
        "https://images.unsplash.com/photo-1652449823136-b279fbe5dfd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
      ],
    },
    {
      id: "project3",
      name: "Vidly",
      description:
        "This is my first project, initially using React 11. Upgraded to latest React 18 and using PostgreSQL, ExpressJs, SocketIo, MongoDB",
      projectImages: [
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
      ],
    },
  ];

  const currentProject = Projects[currentProjectIndex];

  const nextHandler = () => {
    setCurrentProjectIndex((prev) => prev + 1);
    if (currentProjectIndex === Projects.length - 1) {
      setCurrentProjectIndex(0);
    }
    setNextProject(true);
  };
  const previousHandler = () => {
    setCurrentProjectIndex((prev) => prev - 1);
    if (currentProjectIndex === 0) {
      setCurrentProjectIndex(Projects.length - 1);
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
            <div className="p-[48px] gap-8 w-1/2 flex flex-col items-center justify-center">
              <h2 className="h-fit">{currentProject.name}</h2>
              <p className="text-xl flex-1 w-full">
                {currentProject.description}
              </p>
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
          {Projects.map((_, index) => (
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
