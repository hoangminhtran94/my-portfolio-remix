import type { FC } from "react";
import type { Project } from "~/utils/models/models";
import ProjectList from "../UI/ProjectList/ProjectList";
import TechnologyIcon from "../UI/TechnologyIcon/TechnologyIcon";

const ProjectListByBackend: FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="flex flex-col gap-10   text-white w-full rounded-md">
      <ProjectList
        projects={projects.filter(
          (project: Project) =>
            project.technologyIds.includes("6448053a3f41bdf39534d6fc") ||
            project.technologyIds.includes("645c5002e8deac096dfd0d77") ||
            project.technologyIds.includes("645c5254e8deac096dfd0d78")
        )}
      >
        Nodejs based:
        <TechnologyIcon
          className="md:!w-20 md:!h-20"
          icon="https://res.cloudinary.com/dso1cyy53/image/upload/v1683771394/icons/zhas9uodxanwh7e3scor.svg"
        />
        <TechnologyIcon
          className="md:!w-20 md:!h-20"
          icon="https://res.cloudinary.com/dso1cyy53/image/upload/v1682441528/icons/tqavwlexgldnnvmiejoj.svg"
        />
        <TechnologyIcon
          className="md:!w-20 md:!h-20"
          icon="https://res.cloudinary.com/dso1cyy53/image/upload/v1683771987/icons/u1vcdcd7ctyphi3wosc0.svg"
        />
      </ProjectList>
      <ProjectList
        projects={projects.filter((project: Project) =>
          project.technologyIds.includes("645ab11258f6742ddabfe97c")
        )}
      >
        Python based:
        <TechnologyIcon
          className="md:!w-20 md:!h-20"
          icon="https://res.cloudinary.com/dso1cyy53/image/upload/v1683665164/icons/kl0pfdxjjfwcu2q57rn9.svg"
        />
      </ProjectList>
      <ProjectList
        projects={projects.filter(
          (project: Project) =>
            project.technologyIds.includes("6446de64f4aa5cfc14d34f73") ||
            project.technologyIds.includes("6446df4cf4aa5cfc14d34f74")
        )}
      >
        PHP based:
        <TechnologyIcon
          className="md:!w-15 md:!h-15"
          icon="/icons/upload_852387372.svg"
        />
        <TechnologyIcon
          className="md:!w-20 md:!h-20"
          icon="https://res.cloudinary.com/dso1cyy53/image/upload/v1683772182/icons/v0huiphzujmkthcqgmo9.svg"
        />
      </ProjectList>
      <ProjectList
        projects={projects.filter(
          (project: Project) =>
            project.technologyIds.includes("6445e845dad0a0b15a823639") ||
            project.technologyIds.includes("64478417d93ddcdeaaa42633")
        )}
      >
        Severless services:
        <TechnologyIcon
          className="md:!w-[50px]  md:!h-[50px]"
          icon="/icons/upload_1013692726.svg"
        />
        <TechnologyIcon
          className="md:!w-[50px]  md:!h-[50px]"
          icon="https://res.cloudinary.com/dso1cyy53/image/upload/v1682408469/icons/gejtpvp7kdore3rsf4br.svg"
        />
      </ProjectList>
    </div>
  );
};
export default ProjectListByBackend;
