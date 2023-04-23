import ProjectCarousel from "~/components/ProjectPage/ProjectCarousel";
import { useMatches } from "@remix-run/react";

const MyProject = () => {
  const matches = useMatches();
  const projects = matches[0].data.projects;

  return (
    <div className="page-in bg-white h-[900px] w-full shadow-lg rounded-md">
      <ProjectCarousel projects={projects} />
    </div>
  );
};
export default MyProject;
