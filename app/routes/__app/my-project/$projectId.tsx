import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProjectForm from "~/components/ProjectPage/ProjectForm";
import type { Project } from "~/utils/models/models";

const EditProject = () => {
  const data = useLoaderData<{ project: Project }>();
  return (
    <div className="flex flex-col h-full w-full bg-white p-8">
      <h2>Edit Project</h2>
      <ProjectForm project={data?.project} className="flex-1" />
    </div>
  );
};

export default EditProject;

export const loader: LoaderFunction = async () => {
  return json({
    project: {
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
  });
};
