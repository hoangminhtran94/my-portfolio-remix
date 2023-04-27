import type { Project } from "~/utils/models/models";
import type { FC } from "react";
import ProjectTechnology from "../UI/ProjectTechnology/ProjectTechnology";
import Button from "../UI/Button/Button";

const ProjectDetail: FC<{ project: Project; enableEdit: boolean }> = ({
  project,
  enableEdit,
}) => {
  return (
    <div className="p-[24px] md:p-[48px] flex flex-col items-center flex-1 justify-center">
      <div className="flex gap-8 w-full flex-col flex-1">
        <h2 className="h-fit text-center font-bold">{project.name}</h2>
        {project.description && (
          <div>
            <h3 className="font-bold">Description</h3>
            <p className="text-sm md:text-lg">{project.description}</p>
          </div>
        )}
        {project.technologies.length > 0 && (
          <div>
            <h3 className="font-bold">Technologies</h3>
            <div className="flex gap-4 max-w-full flex-wrap text-lg">
              {project.technologies.map((tech) => (
                <ProjectTechnology
                  key={tech.id}
                  icon={tech.icon}
                  label={tech.name}
                />
              ))}
            </div>
          </div>
        )}
        {project.demoLink && (
          <div>
            <h3 className="font-bold">Link</h3>
            <a
              className="text-lg"
              href={project.demoLink}
              rel="noreferrer"
              target="_blank"
            >
              Visit the demo website
            </a>
          </div>
        )}
        {project.githubLink && (
          <div>
            <h3 className="font-bold">Project respository</h3>
            <a
              className="text-lg"
              href={project.githubLink}
              rel="noreferrer"
              target="_blank"
            >
              Visit the project source code
            </a>
          </div>
        )}
      </div>
      {enableEdit && (
        <Button className="w-full" to={project.id}>
          Edit
        </Button>
      )}
    </div>
  );
};

export default ProjectDetail;
