import { useOutlet } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "~/components/UI/Button/Button";
import { useLocation } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";
import { getUserFromSession } from "~/utils/database/auth.server";
import { redirect } from "@remix-run/node";

const NewTechnology = () => {
  const location = useLocation();
  const outlet = useOutlet();
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
        <h2 className="text-center">Technology management</h2>
        <div className=" flex flex-col gap-2">
          <Button className="flex-1" to={"new-technology"}>
            New technology
          </Button>
          <Button className="flex-1">Search</Button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          className="w-full h-[700px] p-4  bg-white rounded-md drop-shadow-md "
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

export default NewTechnology;

export const loader: LoaderFunction = async ({ request }) => {
  try {
    await getUserFromSession(request);
  } catch (error) {
    throw redirect("/auth");
  }
  return null;
};
