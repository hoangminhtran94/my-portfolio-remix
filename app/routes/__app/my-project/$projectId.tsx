import {
  ActionFunction,
  LoaderFunction,
  NodeOnDiskFile,
  redirect,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import fs from "fs";
import path from "path";
import { useLoaderData } from "@remix-run/react";
import ProjectForm from "~/components/ProjectPage/ProjectForm";
import { getUserFromSession } from "~/utils/database/auth.server";
import { editProject, getAProject } from "~/utils/database/project.server";
import serverError from "~/utils/models/ServerError";
import type { Project } from "~/utils/models/models";

const EditProject = () => {
  const data = useLoaderData<{ project: Project }>();

  return (
    <div className="flex flex-col h-full w-full bg-white p-8">
      <h2>Edit Project</h2>
      <ProjectForm project={data?.project} className="flex-1" />
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
  const { projectId } = params;
  let project;
  try {
    project = await getAProject(projectId!);
  } catch (error) {
    throw serverError(500, "Something wrong happened");
  }

  if (!project) {
    throw serverError(401, "Not found");
  }
  return { project };
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
  console.log(__dirname);
  deletedImages.forEach((deletedImage) =>
    fs.unlink(path.join("public", deletedImage), (e) => {
      console.log(e);
    })
  );
  const images = (
    imageData.getAll("projectImages") as unknown as NodeOnDiskFile[]
  ).map((file) => "uploadImages/" + file.name);
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
