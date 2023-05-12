import type { FC } from "react";
import type { Project } from "~/utils/models/models";
import ProjectList from "../UI/ProjectList/ProjectList";
import TechnologyIcon from "../UI/TechnologyIcon/TechnologyIcon";

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
        React ecosystem:
        <TechnologyIcon
          className="md:!w-[50px] md:!h-[50px]"
          icon="/icons/upload_706028798.svg"
        />
        <TechnologyIcon
          className="md:!w-20 md:!h-20"
          icon="https://res.cloudinary.com/dso1cyy53/image/upload/v1683775882/icons/bhojlcmqwanv3v9vgihv.svg"
        />
        <TechnologyIcon
          className="md:!w-20 md:!h-20"
          icon="https://res.cloudinary.com/dso1cyy53/image/upload/v1683754201/icons/riosn3pfvkdjzvfve5j6.svg"
        />
      </ProjectList>
      <ProjectList
        projects={projects.filter((project: Project) =>
          project.technologyIds.includes("6444d6833b0778f1880bf36d")
        )}
      >
        Angular:
        <TechnologyIcon
          className="md:!w-[50px] md:!h-[50px]"
          icon="/icons/upload_636134588.svg"
        />
      </ProjectList>
      <ProjectList
        projects={projects.filter(
          (project: Project) =>
            project.technologyIds.includes("6446de64f4aa5cfc14d34f73") ||
            project.technologyIds.includes("6446df4cf4aa5cfc14d34f74")
        )}
      >
        Vuejs ecosystem:
        <TechnologyIcon
          className="md:!w-[50px] md:!h-[50px]"
          icon="/icons/upload_3008793943.svg"
        />
      </ProjectList>
      <ProjectList
        projects={projects.filter((project: Project) =>
          project.technologyIds.includes("6446e2daf4aa5cfc14d34f77")
        )}
      >
        Svelte kit{" "}
        <TechnologyIcon
          className="md:!w-[50px] md:!h-[50px]"
          icon="/icons/upload_3869561621.svg"
        />
      </ProjectList>
    </div>
  );
};
export default ProjectListByFrontEnd;
