import type { Technology } from "~/utils/models/models";
import TechnologyIcon from "../TechnologyIcon/TechnologyIcon";
import type { FC } from "react";
interface ProjectIconProps {
  tech: Technology;
}
const ProjectIcon: FC<ProjectIconProps> = ({ tech }) => {
  return (
    <li
      className="flex flex-col gap-3 items-center justify-center z-[201]"
      key={tech.id}
    >
      <TechnologyIcon
        className="xl:w-[60px] xl:h-[60px] hover:animate-bouncing cursor-pointer"
        icon={tech.icon}
      />
      {/* <p className={`tracking-widest`}>{tech.name}</p> */}
    </li>
  );
};

export default ProjectIcon;
