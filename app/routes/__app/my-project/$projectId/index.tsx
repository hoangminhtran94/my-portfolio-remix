import type { Project, Technology } from "~/utils/models/models";
import ProjectTechnology from "~/components/UI/ProjectTechnology/ProjectTechnology";
import { useMatches, useParams } from "@remix-run/react";

const ProjectView = () => {
  const matches = useMatches();
  const { projectId } = useParams();
  const projects = matches[0].data.projects;
  const project = projects.find((project: Project) => project.id === projectId);

  return (
    <div className="p-[24px] md:p-[48px] flex flex-col items-center flex-1 justify-center">
      <div className="flex gap-8 w-full flex-col flex-1">
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
              {project.technologies.map((tech: Technology) => (
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
    </div>
  );
};

export default ProjectView;
