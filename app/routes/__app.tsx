import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useMatches } from "@remix-run/react";
import { useOutlet } from "@remix-run/react";

const AppLayout = () => {
  const outlet = useOutlet();
  const matches = useMatches();
  const firstContainerPathPattern = matches[2];
  console.log(firstContainerPathPattern);

  const location = useLocation();

  const detailPageContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      x: -300,
      transition: { duration: 0.5 },
    },
  };

  const container1 = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    },
    exit: {
      opacity: 0,
      x: -300,
      transition: { duration: 0.5 },
    },
  };

  const container2 = {
    hidden: { opacity: 0, x: 300 },
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

  const secondContainerKey = () => {
    if (firstContainerPathPattern.id.includes("profile")) {
      return "profile-second-container";
    }
    if (firstContainerPathPattern.id.includes("skills")) {
      return "skills-second-container";
    }
    if (firstContainerPathPattern.id.includes("technology")) {
      return "technology-second-container";
    }

    return location.pathname;
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {firstContainerPathPattern.id ===
          "routes/__app/my-project/$projectId/index" && (
          <motion.main
            variants={detailPageContainer}
            initial="hidden"
            animate="show"
            key={"profile-detail"}
            className="flex flex-col flex-1 relative overflow-x-hidden overflow-y-visible pb-[50px]"
          >
            {outlet}
          </motion.main>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        {firstContainerPathPattern.id !==
          "routes/__app/my-project/$projectId/index" && (
          <motion.main
            variants={container1}
            initial="hidden"
            animate="show"
            exit="exit"
            key={"main-container"}
            className=" flex flex-col flex-1 relative overflow-x-hidden overflow-y-visible 2xl:h-auto  px-4 md:px-12  "
          >
            <div className="flex 2xl:flex-row flex-1 flex-col container  mx-auto ">
              <AnimatePresence
                mode="wait"
                initial={matches[3]?.pathname.includes("-end") ? false : true}
              >
                <motion.div
                  className=" flex relative flex-1 z-20  "
                  key={secondContainerKey()}
                  variants={container2}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {outlet}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppLayout;
