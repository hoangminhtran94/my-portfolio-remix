import ProjectCarousel from "~/components/ProjectPage/ProjectCarousel";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { Project } from "~/utils/models/models";
import { useMatches } from "@remix-run/react";
import { getProjects } from "~/utils/database/project.server";
const MyProject = () => {
  const matches = useMatches();

  const data = useLoaderData<{ projects: Project[] }>();
  console.log(data);
  return (
    <div className="page-in bg-white h-[900px] w-full shadow-lg rounded-md">
      <ProjectCarousel projects={data?.projects} />
    </div>
  );
};
export default MyProject;

export const loader: LoaderFunction = async () => {
  try {
    const projects = await getProjects();

    return { projects };
  } catch (error) {
    return { projects: [] };
  }
};
