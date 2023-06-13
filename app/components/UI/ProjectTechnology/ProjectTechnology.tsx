import TechnologyIcon from "../TechnologyIcon/TechnologyIcon";

const ProjectTechnology = ({
  icon,
  label,
  className,
}: {
  icon: string;
  label: string;
  className?: string;
}) => {
  return (
    <span className="flex items-center text-sm md:text-base  gap-2">
      <TechnologyIcon icon={icon} className={className} />
      {label}
    </span>
  );
};
export default ProjectTechnology;
