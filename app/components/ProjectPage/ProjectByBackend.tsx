import type { FC } from "react";
import type { Project } from "~/utils/models/models";
import ProjectList from "../UI/ProjectList/ProjectList";
import * as backendIcons from "~/utils/icons/Backend";
import * as frontendIcons from "~/utils/icons/Frontend";

const ProjectListByBackend: FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="flex flex-col gap-5   overflow-scroll    text-slate-600 w-full rounded-md">
      <ProjectList
        projects={projects.filter(
          (project: Project) =>
            project.technologyIds.includes("6444cd513b0778f1880bf32a") ||
            project.technologyIds.includes("644783a9d93ddcdeaaa42632") ||
            project.technologyIds.includes("645c0cda5ad7b31a88969c08")
        )}
      >
        Nodejs, Deno, Express:
        {backendIcons.NodeJs}
        {backendIcons.ExpressJs}
        {backendIcons.Deno}
      </ProjectList>
      <ProjectList
        projects={projects.filter((project: Project) =>
          project.technologyIds.includes("645ab11258f6742ddabfe97c")
        )}
      >
        Django: {backendIcons.AWS}
      </ProjectList>
      <ProjectList
        projects={projects.filter(
          (project: Project) =>
            project.technologyIds.includes("6446de64f4aa5cfc14d34f73") ||
            project.technologyIds.includes("6446df4cf4aa5cfc14d34f74")
        )}
      >
        Laravel and PHP: {backendIcons.PHP}
        {frontendIcons.Laravel}
      </ProjectList>
      <ProjectList
        projects={projects.filter(
          (project: Project) =>
            project.technologyIds.includes("6445e845dad0a0b15a823639") ||
            project.technologyIds.includes("64478417d93ddcdeaaa42633")
        )}
      >
        Severless services: {backendIcons.AWS} {backendIcons.FireBase}
      </ProjectList>
    </div>
  );
};
export default ProjectListByBackend;
