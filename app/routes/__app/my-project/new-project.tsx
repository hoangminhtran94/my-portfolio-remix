import ProjectForm from "~/components/ProjectPage/ProjectForm";
import { createProject } from "~/utils/database/project.server";
import {
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

import { unstable_parseMultipartFormData } from "@remix-run/node";

import type { ActionFunction } from "@remix-run/node";
import { getUserFromSession } from "~/utils/database/auth.server";
import { uploadImageToCloudinary } from "~/utils/fileUpload/fileUpload";
const NewProject = () => {
  return (
    <div className="flex flex-col h-full w-full drop-shadow-md bg-white p-8">
      <h2>New Project</h2>
      <ProjectForm className="flex-1" />
    </div>
  );
};

export default NewProject;

export const loader: LoaderFunction = async ({ request }) => {
  let user;
  try {
    user = await getUserFromSession(request);
  } catch (error) {
    throw error;
  }
  if (!user) {
    throw redirect("/auth");
  }
  return null;
};

export const action: ActionFunction = async ({ request }) => {
  let user;
  try {
    user = await getUserFromSession(request);
  } catch (error) {
    throw error;
  }
  if (!user) {
    throw redirect("/login");
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
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const imageData = await unstable_parseMultipartFormData(
    requestClone,
    uploadHandler
  );
  const images = imageData.getAll("projectImages");

  const featureImages: {
    image: FormDataEntryValue;
    priority: FormDataEntryValue;
    description: FormDataEntryValue;
    showIn: FormDataEntryValue;
  }[] = [];

  images.forEach((image, index) => {
    featureImages.push({
      image,
      priority: data[`priority${index}`],
      description: data[`description${index}`],
      showIn: data[`showIn${index}`],
    });
  });
  const carouselImages = featureImages
    .filter((img) => img.showIn === "carousel" || img.showIn === "both")
    .map((img) => img.image);

  const technologyIds = formData.getAll("technologyIds");
  const databaseData = {
    ...data,
    projectImages: carouselImages,
    projectFeatureImages: featureImages,
    technologyIds,
  };

  try {
    await createProject(databaseData, user.id!);
    return redirect("/my-project");
  } catch (error) {
    return error;
  }
};
