import type { FC } from "react";
import type { Project } from "~/utils/models/models";
import ProjectList from "../UI/ProjectList/ProjectList";
import * as frontendIcons from "~/utils/icons/Frontend";

const ProjectListByFrontEnd: FC<{ projects: Project[] }> = ({ projects }) => {
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
        React based:
        {frontendIcons.React} React
        {frontendIcons.NextJs} NextJs
        {frontendIcons.Remix}
      </ProjectList>
      <ProjectList
        projects={projects.filter((project: Project) =>
          project.technologyIds.includes("6444d6833b0778f1880bf36d")
        )}
      >
        Angular: {frontendIcons.Angular}
      </ProjectList>
      <ProjectList
        projects={projects.filter(
          (project: Project) =>
            project.technologyIds.includes("6446de64f4aa5cfc14d34f73") ||
            project.technologyIds.includes("6446df4cf4aa5cfc14d34f74")
        )}
      >
        Laravel with Vue: {frontendIcons.Laravel} {frontendIcons.VueJs}
      </ProjectList>
      <ProjectList
        projects={projects.filter((project: Project) =>
          project.technologyIds.includes("6446e2daf4aa5cfc14d34f77")
        )}
      >
        Svelte kit {frontendIcons.Svelte}
      </ProjectList>
    </div>
  );
};
export default ProjectListByFrontEnd;
