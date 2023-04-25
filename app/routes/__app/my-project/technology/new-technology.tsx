import { Form } from "@remix-run/react";
import Button from "~/components/UI/Button/Button";
import TechnologyForm from "~/components/ProjectPage/Technology/TechnologyForm";
import {
  ActionFunction,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import {
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { createATechnology } from "~/utils/database/technology.server";
import { getUserFromSession } from "~/utils/database/auth.server";
import serverError from "~/utils/models/ServerError";
import { uploadImageToCloudinary } from "~/utils/fileUpload/fileUpload";

const NewTechnology = () => {
  return (
    <div className="h-full flex flex-col">
      <h2>New technologies</h2>
      <TechnologyForm />
    </div>
  );
};

export default NewTechnology;

export const action: ActionFunction = async ({ request }) => {
  let user;
  try {
    user = await getUserFromSession(request);
  } catch (error) {
    throw error;
  }

  if (!user) {
    throw serverError(403, "unauthoried!, please login");
  }

  const requestClone = request.clone();
  const uploadHandler = unstable_composeUploadHandlers(
    // our custom upload handler
    async ({ name, contentType, data, filename }) => {
      if (name !== "icon") {
        return undefined;
      }
      const uploadedImage = await uploadImageToCloudinary(data, "icons");
      return uploadedImage.secure_url;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  const iconData = await unstable_parseMultipartFormData(
    requestClone,
    uploadHandler
  );
  const iconPath = iconData.get("icon") ?? "";

  const databaseData = { ...data, icon: iconPath };

  try {
    await createATechnology(user.id, databaseData);
  } catch (error) {
    throw error;
  }

  return redirect("/my-project/technology");
};
