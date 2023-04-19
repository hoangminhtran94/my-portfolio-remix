import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useMatches } from "@remix-run/react";
import { useOutlet } from "@remix-run/react";
import MainPageHeader from "~/components/MainPage/MainPageHeader";
import ProjectHeader from "~/components/ProjectPage/ProjectHeader";
import SkillsHeader from "~/components/SkillsPage/SkillsHeader";
import ContactMeHeader from "~/components/ContactMe/ContactMeHeader";
import AboutHeader from "./../components/About/AboutHeader";

const AppLayout = () => {
  const outlet = useOutlet();
  const matches = useMatches();
  const firstContainerPathPattern = matches[2];
  const location = useLocation();

  const background = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.7 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.7 },
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
      y: 300,
      transition: { duration: 0.5 },
    },
  };

  const container2 = {
    hidden: { opacity: 0, y: location.pathname.includes("skills") ? 0 : -50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
    },
    exit: {
      opacity: 0,
      x: 300,
      transition: { duration: 0.5 },
    },
  };

  const setBackGroundImageHanlder = () => {
    if (firstContainerPathPattern.id.includes("home")) {
      return "main-screen-background";
    }
    if (firstContainerPathPattern.id.includes("my-project")) {
      return "secondary-screen-background";
    }
    if (firstContainerPathPattern.id.includes("skills")) {
      return "fifth-screen-background";
    }
    if (firstContainerPathPattern.id.includes("about")) {
      return "third-screen-background";
    }
    if (firstContainerPathPattern.id.includes("contact")) {
      return "fourth-screen-background";
    }
  };

  const setBackGroundKey = () => {
    if (firstContainerPathPattern.id.includes("home")) {
      return "main-screen-background";
    }
    if (firstContainerPathPattern.id.includes("my-project")) {
      return "secondary-screen-background";
    }
    if (firstContainerPathPattern.id.includes("skills")) {
      return "fifth-screen-background";
    }
    if (firstContainerPathPattern.id.includes("about")) {
      return "third-screen-background";
    }
    if (firstContainerPathPattern.id.includes("contact")) {
      return "fourth-screen-background";
    }
  };

  const changeFirstContainerHandler = () => {
    if (firstContainerPathPattern.id.includes("home")) {
      return <MainPageHeader />;
    }
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

  const firstContainerKey = () => {
    if (firstContainerPathPattern.id.includes("my-project")) {
      return "project-first-container";
    }
    if (firstContainerPathPattern.id.includes("skills")) {
      return "skills-first-container";
    }
    if (firstContainerPathPattern.id.includes("contact")) {
      return "contact-first-container";
    } else {
      return location.pathname + "first-container";
    }
  };

  const secondContainerKey = () => {
    switch (location.pathname) {
      case "/skills":
        return "skill-second-container";
      case "/skills/front-end":
        return "skill-second-container";
      case "/skills/back-end":
        return "skill-second-container";
      default:
        return location.pathname;
    }
  };

  return (
    <main className="relative">
      {/* BackGround */}
      <AnimatePresence mode="wait">
        <motion.div
          key={setBackGroundKey()}
          variants={background}
          initial="hidden"
          animate="show"
          exit="exit"
          className={`absolute top-0 right-0 ${setBackGroundImageHanlder()} w-full h-full`}
        />
      </AnimatePresence>
      <div className="flex max-w-[1920px] h-[1080px] mx-auto  items-center ">
        {/* First Container */}
        <AnimatePresence mode="wait">
          <motion.div
            className=" w-[600px]  px-[60px] z-20"
            key={firstContainerKey()}
            variants={container1}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {changeFirstContainerHandler()}
          </motion.div>
        </AnimatePresence>
        {/* Second Container */}
        <AnimatePresence mode="wait">
          <motion.div
            className=" flex items-center  h-full max-w-[70%] flex-1 z-20"
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
    </main>
  );
};

export default AppLayout;
