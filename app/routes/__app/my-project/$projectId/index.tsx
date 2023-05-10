import type { Project, Technology } from "~/utils/models/models";
import ProjectTechnology from "~/components/UI/ProjectTechnology/ProjectTechnology";
import { useMatches, useParams } from "@remix-run/react";
import ImageCarousel from "~/components/UI/ImageCarousel/ImageCarousel";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

const ProjectView = () => {
  const matches = useMatches();
  const { projectId } = useParams();
  const projects = matches[0].data.projects;
  const project = projects.find((project: Project) => project.id === projectId);

  return (
    <div className=" flex flex-col items-center gap-10 flex-1 justify-center">
      <h1>{project.name}</h1>
      <div className="flex gap-8 w-full flex-col flex-1 ">
        {project.detailedDescription && (
          <div>
            <h3 className="font-bold mb-3">About the project</h3>
            <p
              style={{ lineHeight: 2 }}
              dangerouslySetInnerHTML={{
                __html: project.detailedDescription.replace(/\n/g, "<br>"),
              }}
              className="  text-sm md:text-lg"
            ></p>
          </div>
        )}
        {project.technologies.length > 0 && (
          <div>
            <h3 className="font-bold mb-3">Technologies</h3>
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
      <div className="w-[100%]">
        <ImageCarousel
          containerClassName="!pt-[50%]  rounded shadow drop-shadow-md"
          images={project.projectImages}
        />
      </div>
    </div>
  );
};

export default ProjectView;

export const meta: MetaFunction = ({ parentsData, params }) => {
  const { root } = parentsData;
  const { rootUser } = root;
  const { projects } = rootUser;
  const project = projects.find(
    (project: Project) => project.id === params.projectId
  );

  return {
    title: project ? `${project.name} - Project details` : "Project details",
  };
};
