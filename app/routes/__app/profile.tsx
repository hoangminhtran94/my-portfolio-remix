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
    return location.pathname;
  };
  const outlet = useOutlet();
  return (
    <div className="flex self-center gap-10  w-full h-full">
      <div className="w-[400px] p-4 rounded-lg text-indigo-800 bg-white">
        {rootData.userData && (
          <div className="flex flex-col gap-3">
            <Link
              className="  flex justify-center  flex-1 gap-2 items-center border border-indigo-400 p-2 rounded-md hover:bg-indigo-500 hover:text-white"
              to="/profile"
            >
              Edit Profile
            </Link>
            <Link
              className="  flex justify-center  flex-1 gap-2 items-center border border-indigo-400 p-2 rounded-md hover:bg-indigo-500 hover:text-white"
              to="new-project"
            >
              New Project
            </Link>
            <Link
              className=" flex-1 justify-center  flex gap-2 items-center border border-indigo-400 p-2 rounded-md  hover:bg-indigo-500 hover:text-white"
              to="technology"
            >
              Technology
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={setKey()}
          variants={container1}
          initial="hidden"
          animate="show"
          exit="exit"
          className=" flex w-full   items-start  justify-center"
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
