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
  createFeatureImage,
  createMultiscreenImage,
  deleteFeatureImage,
  deleteMultiScreenImage,
  editProject,
  getAProject,
} from "~/utils/database/project.server";
import serverError from "~/utils/models/ServerError";
import type {
  FeatureImage,
  MultiScreenImage,
  Project,
} from "~/utils/models/models";
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
  let user;
  try {
    user = await getUserFromSession(request);
  } catch (error) {
    throw error;
  }
  if (!user) {
    throw redirect("/auth");
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
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const technologyIds = JSON.parse((data as any).technologyIds);
  const featureImages: (FeatureImage & { name: string })[] = JSON.parse(
    (data as any).featureImages
  );

  featureImages.map(async (featureImage) => {
    const cloned = requestClone.clone();
    const uploadHandler = unstable_composeUploadHandlers(
      // our custom upload handler
      async ({ name, contentType, data, filename }) => {
        if (name !== featureImage.name) {
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
      cloned,
      uploadHandler
    );

    const images = imageData.getAll(featureImage.name);
    let newFeatureGroup: any;
    try {
      newFeatureGroup = await createFeatureImage({
        priority: featureImage.priority,
        description: featureImage.description,
        showIn: featureImage.showIn,
        projectId: projectId,
      });
    } catch (error) {
      throw error;
    }

    if (featureImage.multiScreenImages!.length > 0) {
      let newImagesPromises: Promise<any>[] = [];
      featureImage.multiScreenImages!.forEach((img, index) =>
        newImagesPromises.push(
          createMultiscreenImage({
            image: images[index],
            label: img.label,
            priority: img.priority,
            featureImageId: newFeatureGroup.id,
          })
        )
      );
      try {
        await Promise.all(newImagesPromises);
      } catch (error) {}
    }
  });

  const databaseData = {
    ...data,
    id: projectId,
    technologyIds,
  };
  console.log(databaseData);

  try {
    await editProject(databaseData);
  } catch (error) {
    throw error;
  }
  return redirect("/my-project");
};
