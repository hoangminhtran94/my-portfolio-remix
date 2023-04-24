import { Link, useOutlet } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "@remix-run/react";
const Profile = () => {
  const location = useLocation();
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
  const outlet = useOutlet();
  return (
    <div className="flex flex-col gap-20 text-slate-600 w-full h-full">
      <div>
        <h2 className="text-center">My Profile</h2>
        <div className="flex gap-4 justify-center">
          <Link to={"edit-profile"}>Edit profile</Link>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={container1}
          initial="hidden"
          animate="show"
          exit="exit"
          className=" flex w-full h-full  items-start  justify-center"
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Profile;
