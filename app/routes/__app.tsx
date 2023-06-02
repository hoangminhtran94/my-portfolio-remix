import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useMatches } from "@remix-run/react";
import { useOutlet } from "@remix-run/react";
import ProjectHeader from "~/components/ProjectPage/ProjectHeader";
import SkillsHeader from "~/components/SkillsPage/SkillsHeader";
import ContactMeHeader from "~/components/ContactMe/ContactMeHeader";
import AboutHeader from "./../components/About/AboutHeader";

const AppLayout = () => {
  const outlet = useOutlet();
  const matches = useMatches();
  const firstContainerPathPattern = matches[2];

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

  const setContainer2BackGroundHanlder = () => {
    if (firstContainerPathPattern.id.includes("skills")) {
      return "skill-2-bg";
    }
    if (firstContainerPathPattern.id.includes("about")) {
      return "about-2-bg";
    }
    if (firstContainerPathPattern.id.includes("my-project")) {
      return "project-2-bg";
    }
    if (firstContainerPathPattern.id.includes("contact")) {
      return "contact-2-bg";
    }
    if (firstContainerPathPattern.id.includes("auth")) {
      return "auth-2-bg";
    }
    if (firstContainerPathPattern.id === "routes/__app/index") {
      return "home-2-bg";
    }
    if (firstContainerPathPattern.id.includes("profile")) {
      return "profile-2-bg";
    }
  };

  // const setBackGroundKey = () => {
  //   if (firstContainerPathPattern.id.includes("home")) {
  //     return "main-screen-background";
  //   }
  //   if (firstContainerPathPattern.id.includes("my-project")) {
  //     return "secondary-screen-background";
  //   }
  //   if (firstContainerPathPattern.id.includes("skills")) {
  //     return "fifth-screen-background";
  //   }
  //   if (firstContainerPathPattern.id.includes("about")) {
  //     return "third-screen-background";
  //   }
  //   if (firstContainerPathPattern.id.includes("contact")) {
  //     return "fourth-screen-background";
  //   }
  //   if (firstContainerPathPattern.id.includes("auth")) {
  //     return "login-screen-background";
  //   }
  // };

  const changeFirstContainerHandler = () => {
    if (firstContainerPathPattern.id.includes("my-project")) {
      return <ProjectHeader />;
    }
    if (firstContainerPathPattern.id.includes("skills")) {
      return <SkillsHeader />;
    }
    if (firstContainerPathPattern.id.includes("about")) {
      return <AboutHeader />;
    }
    if (firstContainerPathPattern.id.includes("contact")) {
      return <ContactMeHeader />;
    }
  };
  const changeFirstContainerBgHandler = () => {
    if (firstContainerPathPattern.id.includes("my-project")) {
      return "my-project-bg";
    }
    if (firstContainerPathPattern.id.includes("skills")) {
      return "my-skill-bg";
    }
    if (firstContainerPathPattern.id.includes("about")) {
      return "about-bg";
    }
    if (firstContainerPathPattern.id.includes("contact")) {
      return "contact-bg";
    }
  };

  const firstContainerKey = () => {
    if (firstContainerPathPattern.id.includes("technology")) {
      return "technology-first-container";
    }
    if (firstContainerPathPattern.id.includes("my-project")) {
      return "project-first-container";
    }
    if (firstContainerPathPattern.id.includes("skills")) {
      return "skills-first-container";
    }
    if (firstContainerPathPattern.id.includes("about")) {
      return "about-first-container";
    }
    if (firstContainerPathPattern.id.includes("contact")) {
      return "contact-first-container";
    } else {
      return location.pathname + "first-container";
    }
  };

  const secondContainerKey = () => {
    if (
      firstContainerPathPattern.id.includes("skills") ||
      firstContainerPathPattern.id.includes("skills.edit")
    ) {
      return "skills-second-container";
    }
    if (firstContainerPathPattern.id.includes("technology")) {
      return "technology-second-container";
    }
    if (firstContainerPathPattern.id.includes("profile")) {
      return "profile-second-container";
    }

    return location.pathname;
  };
  // ${setBackGroundImageHanlder()}

  return (
    <>
      <AnimatePresence mode="wait">
        {firstContainerPathPattern.id ===
          "routes/__app/my-project/$projectId/index" && (
          <motion.main
            variants={detailPageContainer}
            initial="hidden"
            animate="show"
            exit="exit"
            key={"profile-detail"}
            className="flex flex-col flex-1 relative overflow-x-hidden overflow-y-visible pb-[50px]  "
          >
            {outlet}
          </motion.main>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {firstContainerPathPattern.id !==
          "routes/__app/my-project/$projectId/index" && (
          <motion.main
            variants={container1}
            initial="hidden"
            animate="show"
            exit="exit"
            key={"main-container"}
            className=" flex flex-col flex-1 relative overflow-x-hidden overflow-y-visible 2xl:h-auto     px-4 md:px-12  "
          >
            <div className="flex 2xl:flex-row flex-1 flex-col container  gap-6 md:gap-14 mx-auto ">
              {/* First Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  className={`${
                    (firstContainerPathPattern.id === "routes/__app/index" ||
                      firstContainerPathPattern.id === "routes/__app/profile" ||
                      firstContainerPathPattern.id.includes("auth") ||
                      firstContainerPathPattern.id ===
                        "routes/__app/my-project/$projectId/index") &&
                    "hidden"
                  } relative flex 2xl:flex-1  2xl:h-auto 2xl:max-w-[33%] py-[24px]   lg:min-h-[250px]  px-[36px] items-center    z-20 text-slate-500 `}
                  key={firstContainerKey()}
                  variants={container1}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <div
                    className={`w-full h-full 2xl:h-full min-h-[200px]   absolute  left-0 -z-10  my-project-bg ${changeFirstContainerBgHandler()}`}
                  />
                  {changeFirstContainerHandler()}
                </motion.div>
              </AnimatePresence>
              {/* Second Container */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  className=" flex relative  py-[24px]   flex-1 z-20"
                  key={secondContainerKey()}
                  variants={container2}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <div
                    className={`h-full w-full absolute top-0 left-0 flex -z-10 items-center justify-end ${setContainer2BackGroundHanlder()}`}
                  ></div>
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
