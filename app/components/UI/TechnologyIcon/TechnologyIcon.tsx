import type { FC } from "react";

const TechnologyIcon: FC<{ icon: string; className?: string }> = ({
  icon,
  className = "",
}) => {
  return (
    <img
      src={icon}
      className={`w-[40px] h-[40px] rounded-md object-scale-down ${className}`}
      alt="icon"
    />
  );
};

export default TechnologyIcon;
