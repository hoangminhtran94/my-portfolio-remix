import ProjectCarousel from "~/components/ProjectPage/ProjectCarousel";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { Project } from "~/utils/models/models";

const MyProject = () => {
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
  return json({
    projects: [
      {
        id: "project1",
        name: "Smartliving Property",
        description: "This is project for property management company",
        projectImages: [
          "https://images.unsplash.com/photo-1652449823136-b279fbe5dfd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
          "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
          "https://images.unsplash.com/photo-1636629198288-8fe85b92110a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=878&q=80",
        ],
        link: "http://google.com",
        technologies: [
          { id: "react", name: "React" },
          { id: "firebase", name: "Firebase" },
        ],
      },
      {
        id: "project2",
        name: "Zillow clone",
        description: "This is a clone of zillow, a real estate website",
        projectImages: [
          "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
          "https://images.unsplash.com/photo-1652449823136-b279fbe5dfd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80",
        ],
        link: "",
        technologies: [],
      },
      {
        id: "project3",
        name: "Vidly",
        description:
          "This is my first project, initially using React 11. Upgraded to latest React 18 and using PostgreSQL, ExpressJs, SocketIo, MongoDB",
        projectImages: [
          "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
        ],
        link: "",
        technologies: [],
      },
    ],
  });
};
