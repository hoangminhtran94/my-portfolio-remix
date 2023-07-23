import type { Technology } from "~/utils/models/models";
import TechnologyIcon from "../TechnologyIcon/TechnologyIcon";
import { type FC } from "react";
import { useState } from "react";
interface ProjectIconProps {
  tech: Technology;
}
const ProjectIcon: FC<ProjectIconProps> = ({ tech }) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <a
      style={isHovering ? { backgroundColor: tech.backgroundColor } : {}}
      className={`flex flex-col p-2 gap-3 items-center justify-center z-[201] hover:animate-bouncing rounded-full`}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      key={tech.id}
      href={tech.homePage}
      target="_blank"
      rel="noreferrer"
    >
      <TechnologyIcon
        className="xl:w-[60px] xl:h-[60px]  cursor-pointer"
        icon={tech.icon}
      />
      {/* <p className={`tracking-widest`}>{tech.name}</p> */}
    </a>
  );
};

export default ProjectIcon;
