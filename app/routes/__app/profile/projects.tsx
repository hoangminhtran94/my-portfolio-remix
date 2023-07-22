import {
  ShouldRevalidateFunction,
  useLoaderData,
  useLocation,
  useOutlet,
} from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "~/components/UI/Button/Button";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  changeProjectVisibility,
  getProjects,
} from "~/utils/database/project.server";
const ProjectsLayout = () => {
  const location = useLocation();
  const projects = useLoaderData();
  const outlet = useOutlet(projects);
  const container = {
    hidden: { opacity: 0, x: 100 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    },
    exit: {
      opacity: 0,
      x: 300,
      transition: { duration: 0.5 },
    },
  };
  return (
    <div className="flex flex-col w-full  gap-6">
      <div className=" bg-white drop-shadow-md p-4 rounded flex flex-col gap-4">
        <h2 className="text-center">Projects management</h2>
        <div className=" flex  gap-2">
          <Button
            className="flex-1 btn-primary-outline"
            to={"/profile/projects"}
          >
            All projects
          </Button>
          <Button className="flex-1 btn-primary-outline" to={"new-project"}>
            New project
          </Button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          className="w-full p-4  shadow shadow-white bg-white rounded-md drop-shadow-md "
          key={location.pathname}
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProjectsLayout;

export const loader: LoaderFunction = async () => {
  try {
    const projects = await getProjects();
    return json(projects);
  } catch (error) {
    return json([]);
  }
};
