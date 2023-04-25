import { Form } from "@remix-run/react";
import Button from "~/components/UI/Button/Button";
import TechnologyForm from "~/components/ProjectPage/Technology/TechnologyForm";
import { ActionFunction, redirect } from "@remix-run/node";
import {
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { createATechnology } from "~/utils/database/technology.server";
import { getUserFromSession } from "~/utils/database/auth.server";
import serverError from "~/utils/models/ServerError";

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
  const uploadHandler = unstable_createFileUploadHandler({
    directory: "public/icons",
  });
  const formdata = await request.formData();
  const data = Object.fromEntries(formdata);
  const iconData = await unstable_parseMultipartFormData(
    requestClone,
    uploadHandler
  );
  const icon = iconData.get("icon");
  let iconPath = "";
  if (icon) {
    iconPath = "/icons/" + (icon as File).name;
  }

  const databaseData = { ...data, icon: iconPath };

  try {
    await createATechnology(user.id, databaseData);
  } catch (error) {
    throw error;
  }

  return redirect("/my-project/technology");
};
