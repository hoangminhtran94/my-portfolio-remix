import type { Project } from "~/utils/models/models";
import type { FC } from "react";
import ProjectTechnology from "../UI/ProjectTechnology/ProjectTechnology";
import Button from "../UI/Button/Button";
import { Link } from "@remix-run/react";
const ProjectDetail: FC<{
  project: Project;
  enableEdit: boolean;
  className?: string;
}> = ({ project, enableEdit, className = "" }) => {
  return (
    <div
      className={`p-[24px] md:p-[48px] overflow-visible border-r-[1px] border-indigo-200  flex flex-col items-center gap-6 flex-1 justify-center ${className}`}
    >
      <div className="flex gap-8 w-full flex-col flex-1">
        <h2 className="h-fit text-center font-bold">{project.name}</h2>
        {project.description && (
          <div className="flex flex-col gap-3">
            <h3 className="font-bold">About this project</h3>
            <p className="text-sm md:text-lg line-clamp-[5]">
              {project.description}
            </p>
            <Link
              className=" flex gap-2 items-center text-base md:text-lg hover:scale-110 transition-all w-fit ml-auto  font-extrabold "
              to={project.id}
            >
              View details
              <svg
                className="h-[18px] fill-slate-500 "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
              </svg>
            </Link>
          </div>
        )}
        {project.technologies.length > 0 && (
          <div className="flex flex-col gap-3">
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
          <div className="flex flex-col gap-3">
            <h3 className="font-bold">Link</h3>
            <div className="text-lg hover:scale-110 transition-all w-fit hover:translate-x-2">
              <a
                className=" text-sm md:text-base"
                href={project.demoLink}
                rel="noreferrer"
                target="_blank"
              >
                Visit the demo website
              </a>
            </div>
          </div>
        )}
        {project.githubLink || project.secondGitHubLink ? (
          <div className="flex flex-col gap-3">
            <h3 className="font-bold">Project respository</h3>
            <div className="text-lg grid grid-cols-1  md:grid-cols-2  w-fit ">
              {project.githubLink && (
                <a
                  className=" text-sm md:text-base hover:scale-110 transition-all hover:translate-x-2"
                  href={project.githubLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  Visit the project source code
                </a>
              )}
              {project.secondGitHubLink && (
                <a
                  className=" text-sm md:text-base hover:scale-110 transition-all hover:translate-x-2"
                  href={project.secondGitHubLink}
                  rel="noreferrer"
                  target="_blank"
                >
                  Visit the project source code (backend)
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <h3 className="font-bold">Project respository</h3>
            <div className="text-lg cursor-not-allowed transition-all w-fit ">
              <p className=" text-sm md:text-base">This code is private</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full gap-4">
        {enableEdit && (
          <Button className="flex-1" to={project.id + "/edit"}>
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
