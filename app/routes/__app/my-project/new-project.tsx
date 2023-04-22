import ProjectForm from "~/components/ProjectPage/ProjectForm";
import { createProject } from "~/utils/database/project.server";
import { NodeOnDiskFile, redirect } from "@remix-run/node";

import {
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

import type { ActionFunction } from "@remix-run/node";
import { getUserFromSession } from "~/utils/database/auth.server";
const NewProject = () => {
  return (
    <div className="flex flex-col h-full w-full bg-white p-8">
      <h2>New Project</h2>
      <ProjectForm className="flex-1" />
    </div>
  );
};

export default NewProject;

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
  const uploadHandler = unstable_createFileUploadHandler({
    directory: "public/uploadImages",
    maxPartSize: 5000000,
  });
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const imageData = await unstable_parseMultipartFormData(
    requestClone,
    uploadHandler
  );
  const images = (
    imageData.getAll("projectImages") as unknown as NodeOnDiskFile[]
  ).map((file) => "uploadImages/" + file.name);
  const technologyIds = formData.getAll("technologyIds");
  const databaseData = { ...data, projectImages: images, technologyIds };

  try {
    await createProject(databaseData, user.id!);
    return redirect("/my-project");
  } catch (error) {
    return error;
  }
};
