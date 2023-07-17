import type { FC } from "react";
import type { Project } from "~/utils/models/models";
import ProjectList from "../UI/ProjectList/ProjectList";
import Header from "../UI/Header/Header";

const Projects: FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="text-white flex flex-col gap-10">
      <Header className="text-center">My Projects</Header>
      <div className="flex flex-col items-center gap-10 tracking-widest w-full rounded-md">
        <ProjectList projects={projects}></ProjectList>
      </div>
    </div>
  );
};
export default Projects;
