import TechnologyIcon from "../TechnologyIcon/TechnologyIcon";

const ProjectTechnology = ({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) => {
  return (
    <span className="flex items-center gap-2">
      <TechnologyIcon icon={icon} className="!w-8 !h-8" />
      {label}
    </span>
  );
};
export default ProjectTechnology;
