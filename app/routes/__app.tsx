import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "@remix-run/react";
import { useOutlet } from "@remix-run/react";
import MainPageHeader from "~/components/MainPage/MainPageHeader";
import ProjectHeader from "~/components/ProjectPage/ProjectHeader";
import SkillsHeader from "~/components/SkillsPage/SkillsHeader";
import ContactMeHeader from "~/components/ContactMe/ContactMeHeader";
import AboutHeader from "./../components/About/AboutHeader";

const AppLayout = () => {
  const outlet = useOutlet();
  const pages = ["/home", "/my-project", "/skills", "/about", "/contact"];

  const location = useLocation();
  const navigate = useNavigate();
  const nextPageHandler = () => {
    if (location.pathname === "/") {
      return navigate("/home");
    }
    const currentPageIndex = pages.findIndex(
      (path) => path === location.pathname
    );
    if (currentPageIndex < pages.length - 1) {
      return navigate(pages[currentPageIndex + 1]);
    }

    return navigate(pages[0]);
  };
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
  const changeNextPageLabelHandler = () => {
    switch (location.pathname) {
      case "/":
        return "Get Started";
      case "/contact":
        return "Back to home";
      default:
        return "Next Page";
    }
  };
  const changeFirstContainerHandler = () => {
    switch (location.pathname) {
      case "/home":
        return <MainPageHeader />;
      case "/my-project":
        return <ProjectHeader />;
      case "/skills":
        return <SkillsHeader />;
      case "/skills/front-end":
        return <SkillsHeader />;
      case "/skills/back-end":
        return <SkillsHeader />;
      case "/about":
        return <AboutHeader />;
      default:
        return <ContactMeHeader />;
    }
  };

  const setBackGroundImageHanlder = () => {
    switch (location.pathname) {
      case "/home":
        return "main-screen-background";
      case "/about":
        return "third-screen-background";
      case "/contact":
        return "fourth-screen-background";
      case "/contact/contact-now":
        return "fourth-screen-background";
      case "/skills":
        return "fifth-screen-background";
      case "/skills/front-end":
        return "fifth-screen-background";
      case "/skills/back-end":
        return "fifth-screen-background";
      default:
        return "secondary-screen-background";
    }
  };

  const setBackGroundKey = () => {
    switch (location.pathname) {
      case "/contact":
        return "contact-background-container";
      case "/contact/contact-now":
        return "contact-background-container";
      case "/skills":
        return "skill-background-container";
      case "/skills/front-end":
        return "skill-background-container";
      case "/skills/back-end":
        return "skill-background-container";
      default:
        return location.pathname + "background-container";
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
  const firstContainerKey = () => {
    switch (location.pathname) {
      case "/contact":
        return "contact-first-container";
      case "/contact/contact-now":
        return "contact-first-container";
      case "/skills":
        return "skill-first-container";
      case "/skills/front-end":
        return "skill-first-container";
      case "/skills/back-end":
        return "skill-first-container";
      default:
        return location.pathname + "first-container";
    }
  };

  return (
    <main className="relative">
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
      <div className="flex max-w-[1920px] min-h-[1080px] mx-auto  items-center ">
        <AnimatePresence mode="wait">
          <motion.div
            className=" w-[600px] h-full px-[60px] z-20"
            key={firstContainerKey()}
            variants={container1}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {changeFirstContainerHandler()}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            className="h-auto max-w-[70%] flex-1 z-20"
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
