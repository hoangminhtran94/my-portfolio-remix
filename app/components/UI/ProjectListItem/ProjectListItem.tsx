import type { FC } from "react";
import { Link } from "react-router-dom";
interface ProjectListItemProps {
  label: string;
  to: string;
}

const ProjectListItem: FC<ProjectListItemProps> = ({ label, to }) => {
  return (
    <Link
      className=" text-center p-4 border rounded border-indigo-300 hover:scale-105 transition-all hover:frost hover:text-white cursor-pointer"
      to={to}
    >
      {label}
    </Link>
  );
};
export default ProjectListItem;
