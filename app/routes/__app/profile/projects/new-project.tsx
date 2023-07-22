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
import type { FeatureImage } from "~/utils/models/models";
const NewProject = () => {
  return (
    <ProjectForm className="flex flex-col w-full p-4  bg-white rounded-lg  h-[800px] overflow-scroll relative flex-1" />
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
    throw redirect("/auth");
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
    const uploadedMultiscreenImages = featureImage.multiScreenImages?.map(
      (image, index) => ({ ...image, image: images[index] })
    );
    const displayImage =
      featureImage.multiScreenImages!.length > 1
        ? [...featureImage.multiScreenImages!].sort((a, b) => +a - +b)[0].image
        : featureImage.multiScreenImages![0].image;
    return {
      ...featureImage,
      image: displayImage,
      multiScreenImages: uploadedMultiscreenImages,
    };
  });

  const carouselImages = featureImages
    .filter((img) => img.showIn === "carousel" || img.showIn === "both")
    .map((img) => img.image);

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
