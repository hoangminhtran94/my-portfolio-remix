import type { FC, ReactNode } from "react";
import type { Project } from "~/utils/models/models";
import ProjectListItem from "../ProjectListItem/ProjectListItem";
interface ProjectListProps {
  projects: Project[];
  children: ReactNode;
}

const ProjectList: FC<ProjectListProps> = ({ projects, children }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className=" justify-center text-base md:text-lg font-bold flex gap-5 flex-wrap items-center">
        {children}
      </label>
      <div className="flex flex-wrap gap-10  justify-center">
        {projects.map((project: Project) => (
          <ProjectListItem
            img={project.projectImages[0]}
            label={project.name}
            to={project.id}
            key={project.id}
          />
        ))}
      </div>
    </div>
  );
};
export default ProjectList;
