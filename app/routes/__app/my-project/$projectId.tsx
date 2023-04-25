import {
  ActionFunction,
  LoaderFunction,
  NodeOnDiskFile,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
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
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "~/utils/fileUpload/fileUpload";

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
  const uploadHandler = unstable_composeUploadHandlers(
    // our custom upload handler
    async ({ name, contentType, data, filename }) => {
      if (name !== "projectImages") {
        return undefined;
      }
      const uploadedImage = await uploadImageToCloudinary(
        data,
        "projectImages"
      );
      return uploadedImage.secure_url;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );
  const imageData = await unstable_parseMultipartFormData(
    requestClone,
    uploadHandler
  );

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { projectImageArray, ...mainFormData } = data;

  const remainedImageData = formData.getAll("projectImageArray");

  const oldImages = project.projectImages.filter((image) =>
    remainedImageData.includes(image)
  );
  const deletedImages = project.projectImages.filter(
    (image) => !remainedImageData.includes(image)
  );

  deletedImages.forEach((deletedImage) =>
    deleteImageFromCloudinary(deletedImage)
  );
  const images = imageData.getAll("projectImages");
  const technologyIds = formData.getAll("technologyIds");

  const databaseData = {
    ...mainFormData,
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
