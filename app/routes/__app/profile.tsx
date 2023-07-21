import { Link, useMatches, useOutlet } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { getUserFromSession } from "~/utils/database/auth.server";
import { redirect } from "@remix-run/node";
const Profile = () => {
  const location = useLocation();
  const matches = useMatches();
  const rootData = matches[0].data;
  const container1 = {
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

  const setKey = () => {
    if (location.pathname.includes("edit-profile")) {
      return "profile-edit-profile-container";
    }
    if (location.pathname.includes("skills-edit")) {
      return "skills-edit-profile-container";
    }
    return location.pathname;
  };
  const outlet = useOutlet();
  return (
    <div className="flex justify-center  gap-10  flex-1 w-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={setKey()}
          variants={container1}
          initial="hidden"
          animate="show"
          exit="exit"
          className=" flex w-full xl:w-1/2  items-start  justify-center"
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Profile;

export const loader: LoaderFunction = async ({ request }) => {
  try {
    await getUserFromSession(request);
  } catch (error) {
    throw redirect("/auth");
  }

  return null;
};
