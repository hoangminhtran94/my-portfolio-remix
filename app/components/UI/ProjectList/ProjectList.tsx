import { useRef, type FC, type ReactNode } from "react";
import type { Project } from "~/utils/models/models";
import ProjectListItem from "../ProjectListItem/ProjectListItem";
import { useInView } from "framer-motion";
interface ProjectListProps {
  projects: Project[];
  children?: ReactNode;
}

const ProjectList: FC<ProjectListProps> = ({ projects, children }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
      className="flex flex-col gap-3"
    >
      <label className=" justify-center text-base md:text-lg font-bold flex gap-5 flex-wrap items-center">
        {children}
      </label>
      <div className="flex flex-wrap gap-10  justify-center">
        {projects.map((project: Project) => (
          <ProjectListItem
            img={project.projectImages[0]}
            label={project.name}
            technologies={project.technologies}
            to={`/my-project/${project.id}`}
            key={project.id}
          />
        ))}
      </div>
    </div>
  );
};
export default ProjectList;
