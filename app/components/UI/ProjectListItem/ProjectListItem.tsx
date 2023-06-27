import type { FC } from "react";
import { Link } from "@remix-run/react";
interface ProjectListItemProps {
  label: string;
  to: string;
  img?: string;
}

const ProjectListItem: FC<ProjectListItemProps> = ({ label, to, img }) => {
  return (
    <Link className="article-wrapper" to={to}>
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
              stroke-linejoin="round"
              stroke-linecap="round"
              viewBox="0 0 24 24"
              stroke-width="2"
              fill="none"
              stroke="currentColor"
            >
              <line y2="12" x2="19" y1="12" x1="5"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
        <div className="types">
          <span
            style={{
              backgroundColor: "rgba(165, 96, 247, 0.43)",
              color: "rgb(85, 27, 177)",
            }}
            className="project-type"
          >
            • Analytics
          </span>
          <span className="project-type">• Dashboards</span>
        </div>
      </div>
    </Link>
  );
};
export default ProjectListItem;
