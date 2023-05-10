import TechnologyIcon from "../TechnologyIcon/TechnologyIcon";

const ProjectTechnology = ({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) => {
  return (
    <span className="flex items-center text-sm md:text-base  gap-2">
      <TechnologyIcon icon={icon} className="!w-5 !h-5 md:!w-8 md:!h-8" />
      {label}
    </span>
  );
};
export default ProjectTechnology;
