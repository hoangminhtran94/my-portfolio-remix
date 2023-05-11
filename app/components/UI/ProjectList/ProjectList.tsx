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
      <label className="text-lg font-bold flex gap-5 items-center">
        {children}
      </label>
      <div className="grid grid-cols-3 gap-x-6  gap-y-3 ">
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
