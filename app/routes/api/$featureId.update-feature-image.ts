import type { ActionFunction } from "@remix-run/node";
import {
  json,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUserFromSession } from "~/utils/database/auth.server";
import {
  createMultiscreenImage,
  deleteMultiScreenImage,
  getAFeatureGroupImage,
  updateFeatureImage,
  updateMutiscreenImage,
} from "~/utils/database/project.server";
import { uploadImageToCloudinary } from "~/utils/fileUpload/fileUpload";
import serverError from "~/utils/models/ServerError";
import type { FeatureImage } from "~/utils/models/models";

export const action: ActionFunction = async ({ request, params }) => {
  try {
    await getUserFromSession(request);
  } catch (error) {
    throw redirect("auth");
  }
  const requestClone = request.clone();

  const { featureId } = params;
  if (!featureId) {
    throw serverError(403, "Not found");
  }
  let featureImage;
  try {
    featureImage = await getAFeatureGroupImage(featureId);
  } catch (error) {
    throw error;
  }
  if (!featureImage) {
    throw serverError(403, "Not found");
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const featureImageData: FeatureImage & { name: string } = JSON.parse(
    (data as any).featureImage
  );

  const defaultImages = featureImage.multiScreenImages;
  const deletedImages = defaultImages.filter(
    (img) =>
      !featureImageData.multiScreenImages
        ?.map((data) => data.id)
        .includes(img.id)
  );
  const updatedImages = featureImageData.multiScreenImages!.filter((img) =>
    defaultImages.map((data) => data.id).includes(img.id!)
  );

  const newImages = featureImageData.multiScreenImages!.filter(
    (image) => image.id === undefined
  );
  if (deletedImages.length > 0) {
    let deleteImagePromises: Promise<any>[] = [];
    deletedImages.forEach((deletedImage) =>
      deleteImagePromises.push(deleteMultiScreenImage(deletedImage))
    );

    try {
      await Promise.all(deletedImages);
    } catch (error) {
      throw error;
    }
  }

  if (updatedImages.length > 0) {
    const updateImagePromises: Promise<any>[] = [];
    updatedImages.forEach((updatedImage) => {
      updateImagePromises.push(updateMutiscreenImage(updatedImage));
    });
    await Promise.all(updateImagePromises);
  }

  if (newImages?.length > 0) {
    const uploadHandler = unstable_composeUploadHandlers(
      // our custom upload handler
      async ({ name, contentType, data, filename }) => {
        if (name !== "multiscreenImages") {
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
    const images = imageData.getAll("multiscreenImages");
    console.log(images);

    const newImageData = newImages.map((img, index) => ({
      ...img,
      image: images[index],
    }));

    const createPromises: Promise<any>[] = [];
    newImageData.forEach((data) =>
      createPromises.push(
        createMultiscreenImage({ ...data, featureImageId: featureId })
      )
    );
    try {
      await Promise.all(createPromises);
    } catch (error) {
      throw error;
    }
  }

  try {
    await updateFeatureImage({
      id: featureId,
      label: featureImageData.label,
      priority: featureImageData.priority,
      showIn: featureImageData.showIn,
      description: featureImageData.description,
    });
    return json({ message: "Success" });
  } catch (error) {
    throw error;
  }
};
