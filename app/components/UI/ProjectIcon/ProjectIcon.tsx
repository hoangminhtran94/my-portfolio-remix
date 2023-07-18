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
      <TechnologyIcon className="!w-[60px] !h-[60px]" icon={tech.icon} />
      <p className={`tracking-widest`}>{tech.name}</p>
    </li>
  );
};

export default ProjectIcon;
