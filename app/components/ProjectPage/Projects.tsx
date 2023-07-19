import { useEffect, type FC, useRef, useContext } from "react";
import type { Project } from "~/utils/models/models";
import ProjectList from "../UI/ProjectList/ProjectList";
import Header from "../UI/Header/Header";
import { useInView } from "framer-motion";
import { PageContext } from "~/store/page-context";

const Projects: FC<{ projects: Project[] }> = ({ projects }) => {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref);
  const { onChangePage } = useContext(PageContext);
  // useEffect(() => {
  //   if (isInView) {
  //     onChangePage("my-project");
  //   }
  // }, [isInView]);

  return (
    <div
      ref={ref}
      id="my-project"
      className="text-white flex flex-col justify-center gap-10 min-h-screen"
    >
      <Header className="text-center">My Projects</Header>
      <div className="flex flex-col items-center gap-10 tracking-widest w-full rounded-md">
        <ProjectList projects={projects}></ProjectList>
      </div>
    </div>
  );
};
export default Projects;
