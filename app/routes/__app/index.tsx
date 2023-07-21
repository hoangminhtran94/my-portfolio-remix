import { useMatches } from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";
import Projects from "~/components/ProjectPage/Projects";

import SkillShowCase from "~/components/UI/SkillsShowCase/SkillsShowCase";

import ContactSection from "../../components/ContactMe/ContactSection";
import About from "~/components/About/About";
import { PageContext } from "~/store/page-context";
import { useContext, useEffect } from "react";

const MyProject = () => {
  const { onForceScrollTo, forceScrollTo } = useContext(PageContext);

  const matches = useMatches();
  const rootData = matches[0].data;
  const projects = rootData.projects;
  useEffect(() => {
    if (typeof document !== "undefined") {
      const targetElement = document?.getElementById(forceScrollTo);
      setTimeout(() => {
        targetElement?.scrollIntoView({ behavior: "instant" });
        onForceScrollTo("");
      }, 100);
    }
  }, [forceScrollTo]);

  return (
    <div className="w-full flex-1 2xl:min-h-[1000px] flex flex-col gap-6">
      <About />

      <Projects projects={projects} />

      <SkillShowCase
        skillsData={{
          frontends: rootData.frontends,
          backends: rootData.backends,
        }}
      />

      <ContactSection />
    </div>
  );
};
export default MyProject;

export const meta: MetaFunction = () => {
  return { title: "Minh Hoang Tran's Porfolio" };
};
