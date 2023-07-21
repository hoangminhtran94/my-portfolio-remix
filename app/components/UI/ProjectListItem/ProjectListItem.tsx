import { type FC } from "react";
import { Link } from "@remix-run/react";
import TechnologyIcon from "../TechnologyIcon/TechnologyIcon";
import type { Technology } from "~/utils/models/models";
interface ProjectListItemProps {
  label: string;
  to: string;
  img?: string;
  technologies: Technology[];
}

const ProjectListItem: FC<ProjectListItemProps> = ({
  label,
  to,
  img,
  technologies,
}) => {
  return (
    <Link className="article-wrapper max-w-[90vw] bg-white" to={to}>
      <img
        className="rounded-lg container-project object-cover"
        alt={label}
        src={img}
      />
      <div className="project-info">
        <div className="flex-pr">
          <div className="project-title text-nowrap"> {label}</div>
          <div className="project-hover">
            <svg
              style={{ color: "black" }}
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              color="black"
              strokeLinejoin="round"
              strokeLinecap="round"
              viewBox="0 0 24 24"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <line y2="12" x2="19" y1="12" x1="5"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
        <div className="types flex-wrap ">
          {technologies.map((tech, index) => {
            if (index <= 6) {
              return <TechnologyIcon key={tech.id} icon={tech.icon} />;
            }
          })}
          <span className=" text-black flex items-center">
            {technologies.length > 6 && "•••"}
          </span>
        </div>
      </div>
    </Link>
  );
};
export default ProjectListItem;
