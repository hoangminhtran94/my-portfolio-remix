import type { FeatureImage, Project, Technology } from "~/utils/models/models";
import ProjectTechnology from "~/components/UI/ProjectTechnology/ProjectTechnology";
import { useMatches, useParams } from "@remix-run/react";
import ImageWithDescription from "~/components/UI/ImageWithDescription/ImageWithDescription";
import type { MetaFunction } from "@remix-run/node";
import Button from "~/components/UI/Button/Button";

const ProjectView = () => {
  const matches = useMatches();
  const { projectId } = useParams();
  const projects = matches[0].data.projects;
  const user = matches[0].data.userData;
  const project = projects.find((project: Project) => project.id === projectId);

  return (
    <div className=" flex flex-col items-center gap-10 flex-1 justify-center">
      <div className="flex flex-col w-full ">
        <h1 className="text-center">{project.name}</h1>
        {user && (
          <Button className=" w-2/3 md:w-1/3 mx-auto" to="edit">
            Edit
          </Button>
        )}
      </div>
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

      <ImageWithDescription
        images={[...project.projectFeatureImages]
          .sort((a, b) => +a.priority - +b.priority)
          .filter(
            (image: FeatureImage) =>
              image.showIn === "detail" || image.showIn === "both"
          )}
      />
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
