import TechnologyIcon from "../TechnologyIcon/TechnologyIcon";

const ProjectTechnology = ({
  icon,
  label,
  className,
  containerClassName,
}: {
  icon: string;
  label: string;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <span
      className={`flex items-center text-sm md:text-base gap-2 ${containerClassName} `}
    >
      <TechnologyIcon icon={icon} className={className} />
      {label}
    </span>
  );
};
export default ProjectTechnology;
