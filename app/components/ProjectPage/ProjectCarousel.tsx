import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import * as animation from "~/utils/FramerMotionVariants/animationVariants";
import ImageCarousel from "../UI/ImageCarousel/ImageCarousel";
const ProjectCarousel = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [nextProject, setNextProject] = useState(true);

  const Projects = [
    {
      id: "project1",
      name: "Smartliving Property",
      description: "This is project for property management company",
      projectImages: [
        "https://images.unsplash.com/photo-1652449823136-b279fbe5dfd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
        "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
      ],
    },
    {
      id: "project2",
      name: "Zillow clone",
      description: "This is project for property management company",
      projectImages: [
        "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
        "https://images.unsplash.com/photo-1652449823136-b279fbe5dfd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
      ],
    },
    {
      id: "project3",
      name: "Vidly",
      description: "This is project for property management company",
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
      <div className="w-full h-full relative overflow-hidden ">
        <AnimatePresence custom={nextProject} initial={false}>
          <motion.div
            variants={animation.carouselNext}
            custom={nextProject}
            initial="initial"
            animate="animate"
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

      <div className="flex justify-between mt-6">
        <span className="" onClick={nextHandler}>
          Next
        </span>
        <span className="" onClick={previousHandler}>
          Previous
        </span>
      </div>
    </div>
  );
};
export default ProjectCarousel;
