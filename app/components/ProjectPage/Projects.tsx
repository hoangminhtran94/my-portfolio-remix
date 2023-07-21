import { type FC } from "react";
import type { Project } from "~/utils/models/models";
import ProjectList from "../UI/ProjectList/ProjectList";
import Header from "../UI/Header/Header";
import InviewWrapper from "../UI/InviewWrapper/InviewWrapper";

const Projects: FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <InviewWrapper
      id="my-project"
      mode="fade"
      className="text-white flex flex-col justify-center gap-5 xl:gap-10 min-h-screen"
    >
      <Header className="text-center">My Projects</Header>
      <div className="flex flex-col items-center gap-10 tracking-widest w-full rounded-md">
        <ProjectList projects={projects}></ProjectList>
      </div>
    </InviewWrapper>
  );
};
export default Projects;
