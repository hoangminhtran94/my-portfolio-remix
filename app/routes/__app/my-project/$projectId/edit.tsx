import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import LoadingSpinner from "~/components/UI/LoadingSpinner/LoadingSpinner";
import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";

import ProjectForm from "~/components/ProjectPage/ProjectForm";
import { getUserFromSession } from "~/utils/database/auth.server";
import {
  deleteFeatureImage,
  editProject,
  getAProject,
} from "~/utils/database/project.server";
import serverError from "~/utils/models/ServerError";
import type { Project } from "~/utils/models/models";
import { useParams, useMatches, useTransition } from "@remix-run/react";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "~/utils/fileUpload/fileUpload";

const EditProject = () => {
  const matches = useMatches();
  const transition = useTransition();
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
    <div className="flex flex-col h-full w-full drop-shadow-md bg-white p-8 relative">
      {transition.state !== "idle" && <LoadingSpinner />}
      <h2>Edit Project</h2>
      <ProjectForm project={project} className="flex-1" />
    </div>
  );
};

export default EditProject;

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    await getUserFromSession(request);
  } catch (error) {
    throw error;
  }
  return null;
};

export const action: ActionFunction = async ({ request, params }) => {
  try {
    await getUserFromSession(request);
  } catch (error) {
    throw error;
  }
  const { projectId } = params;
  if (!projectId) {
    throw redirect("/auth");
  }
  let project;
  try {
    project = await getAProject(projectId);
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
      return uploadedImage?.secure_url;
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
  //Get main formdata
  const { projectImageArray, ...mainFormData } = data;
  //
  const remainedImageDataJSON = formData.getAll("projectImageArray");
  const remainedImageData = remainedImageDataJSON.map((json) =>
    JSON.parse(json as string)
  );

  const deletedImages = project.projectFeatureImages
    .map((image) => image.image)
    .filter(
      (image) => !remainedImageData.map((data) => data.image).includes(image)
    );
  //Delete Images from cloudinary
  let deletePromises: Promise<any>[] = [];

  deletedImages.forEach((deletedImage) =>
    deletePromises.push(deleteImageFromCloudinary(deletedImage))
  );
  try {
    await Promise.all(deletePromises);
  } catch (error) {
    //This error will now stop the process
    console.log(error);
  }

  //Delete Images from database
  let deletImageFromDatabasePromises: Promise<any>[] = [];
  deletedImages.forEach((deletedImage) => {
    deletImageFromDatabasePromises.push(deleteFeatureImage(deletedImage));
  });
  try {
    await Promise.all(deletImageFromDatabasePromises);
  } catch (error) {
    //Fail to delete image from database will stop this request
    throw error;
  }

  //Get images data
  const images = imageData.getAll("projectImages");
  const technologyIds = formData.getAll("technologyIds");

  const featureImages: {
    image: FormDataEntryValue;
    priority: FormDataEntryValue;
    description: FormDataEntryValue;
    showIn: FormDataEntryValue;
  }[] = [];
  //Format the image data
  images.forEach((image, index) => {
    featureImages.push({
      image,
      priority: data[`priority${index}`],
      description: data[`description${index}`],
      showIn: data[`showIn${index}`],
    });
  });

  //Format remainded images

  const databaseData = {
    ...mainFormData,
    technologyIds,
  };

  try {
    await editProject(
      projectId,
      databaseData,
      featureImages,
      remainedImageData
    );
    return redirect("/my-project/" + projectId);
  } catch (error) {
    throw error;
  }
};
