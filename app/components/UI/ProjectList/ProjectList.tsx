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
      <label className="text-base md:text-lg font-bold flex gap-5 flex-wrap items-center">
        {children}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-x-6  gap-y-6 ">
        {projects.map((project: Project) => (
          <ProjectListItem
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
