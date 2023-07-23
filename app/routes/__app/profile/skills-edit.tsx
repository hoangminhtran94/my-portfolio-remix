import Button from "~/components/UI/Button/Button";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUserFromSession } from "~/utils/database/auth.server";
import { useLoaderData, useLocation, useOutlet } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import {
  getTechnologyCategories,
  getTechnologyTypes,
} from "~/utils/database/skills.server";
import { AnimatePresence, motion } from "framer-motion";

const SkillEdit = () => {
  const loaderData = useLoaderData();
  const outlet = useOutlet(loaderData);
  const location = useLocation();
  const container = {
    hidden: { opacity: 0, x: -50 },
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
    <div className="flex flex-col w-full gap-5">
      <div className="w-full flex flex-col gap-5 bg-white p-5 rounded shadow-md shadow-white">
        <h2 className="text-center">Skill Edit</h2>
        <div className="flex gap-2 ">
          <Button className="flex-1 btn-primary-outline " to="new-category">
            Add new technology category
          </Button>
          <Button className="flex-1 btn-primary-outline " to="edit-category">
            Edit category
          </Button>
        </div>

        <Button className="btn-primary-outline " to="front-end">
          Edit Frontend skills
        </Button>
        <Button className="btn-primary-outline " to="back-end">
          Edit Backend skills
        </Button>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
          className="bg-white rounded-lg shadow shadow-white"
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SkillEdit;

export const loader: LoaderFunction = async ({ request }) => {
  try {
    await getUserFromSession(request);
  } catch (error) {
    throw redirect("/auth");
  }

  return json({
    technologyTypes: await getTechnologyTypes(),
    technologyCategories: await getTechnologyCategories(),
  });
};
