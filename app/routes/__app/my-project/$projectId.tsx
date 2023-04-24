import type {
  ActionFunction,
  LoaderFunction,
  NodeOnDiskFile,
} from "@remix-run/node";
import {
  redirect,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import fs from "fs";
import path from "path";

import ProjectForm from "~/components/ProjectPage/ProjectForm";
import { getUserFromSession } from "~/utils/database/auth.server";
import { editProject, getAProject } from "~/utils/database/project.server";
import serverError from "~/utils/models/ServerError";
import type { Project } from "~/utils/models/models";
import { useParams, useMatches } from "@remix-run/react";

const EditProject = () => {
  const matches = useMatches();
  const { projectId } = useParams();
  const projects = matches[0].data.projects;
  if (!projects || projects.length === 0) {
    throw new Error("There's no project to edit");
  }
  const project = projects.find((project: Project) => project.id === projectId);
  if (!project) {
    throw new Error("This project do not exist");
  }

  return (
    <div className="flex flex-col h-full w-full drop-shadow-md bg-white p-8">
      <h2>Edit Project</h2>
      <ProjectForm project={project} className="flex-1" />
    </div>
  );
};

export default EditProject;

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    const user = await getUserFromSession(request);
    if (!user) {
      throw redirect("/auth");
    }
  } catch (error) {
    throw error;
  }
  return null;
};

export const action: ActionFunction = async ({ request, params }) => {
  try {
    const user = await getUserFromSession(request);
    if (!user) {
      throw redirect("/auth");
    }
  } catch (error) {
    throw error;
  }
  const { projectId } = params;
  let project;
  try {
    project = await getAProject(projectId!);
  } catch (error) {
    throw error;
  }

  if (!project) {
    throw serverError(404, "Project not found");
  }

  const requestClone = request.clone();
  const uploadHandler = unstable_createFileUploadHandler({
    directory: "public/uploadImages",
    maxPartSize: 5000000,
  });
  const imageData = await unstable_parseMultipartFormData(
    requestClone,
    uploadHandler
  );
  console.log(imageData.getAll("projectImages"));
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const imageFormData = formData.getAll("projectImages");
  const oldImages = project.projectImages.filter((image) =>
    imageFormData.includes(image)
  );
  const deletedImages = project.projectImages.filter(
    (image) => !imageFormData.includes(image)
  );

  deletedImages.forEach((deletedImage) =>
    fs.unlink(path.join("public", deletedImage), (e) => {
      console.log(e);
    })
  );
  const images = (
    imageData.getAll("projectImages") as unknown as NodeOnDiskFile[]
  ).map((file) => "/uploadImages/" + file.name);
  const technologyIds = formData.getAll("technologyIds");

  const databaseData = {
    ...data,
    projectImages: [...oldImages, ...images],
    technologyIds,
  };

  try {
    await editProject(projectId!, databaseData);
    return redirect("/my-project");
  } catch (error) {
    throw error;
  }
};
