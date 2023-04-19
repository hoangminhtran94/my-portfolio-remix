import { Link } from "@remix-run/react";
const ProjectHeader = () => {
  return (
    <div>
      <h1>My Projects</h1>
      <Link to="my-project/new-project">New Project</Link>
    </div>
  );
};
export default ProjectHeader;
