import TechnologyForm from "~/components/ProjectPage/Technology/TechnologyForm";
import {
  isRouteErrorResponse,
  useMatches,
  useParams,
  useRouteError,
} from "@remix-run/react";
import type { Technology } from "~/utils/models/models";
import type { ActionFunction } from "@remix-run/node";
import {
  redirect,
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
} from "@remix-run/node";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "~/utils/fileUpload/fileUpload";
import {
  getATechnology,
  updateTechnology,
} from "~/utils/database/technology.server";
import serverError from "~/utils/models/ServerError";
import { getUserFromSession } from "~/utils/database/auth.server";

const TechnologyEdit = () => {
  const matches = useMatches();
  const { techId } = useParams();

  const technologies = matches[0].data.technologies;
  const currentTechnology = technologies.find(
    (tech: Technology) => tech.id === techId
  );
  if (!currentTechnology) {
    throw new Error("This tech is not found");
  }
  return (
    <div className="h-full flex flex-col">
      <h2>New technologies</h2>
      <TechnologyForm tech={currentTechnology} />
    </div>
  );
};

export default TechnologyEdit;

export function ErrorBoundary() {
  let error = useRouteError();

  let errorBody;
  if (isRouteErrorResponse(error)) {
    errorBody = error.data;
  } else if (error instanceof Error) {
    errorBody = error.message;
  } else {
    errorBody = "Unknow error";
  }

  return (
    <div className="h-full items-center justify-center flex flex-col">
      <h2>{errorBody}</h2>
    </div>
  );
}

export const action: ActionFunction = async ({ request, params }) => {
  try {
    await getUserFromSession(request);
  } catch (error) {
    throw redirect("/auth");
  }

  const requestClone = request.clone();
  const { techId } = params;
  const uploadHandler = unstable_composeUploadHandlers(
    async ({ name, filename, data, contentType }) => {
      if (name !== "icon") {
        return undefined;
      }
      if (!filename) {
        return undefined;
      }
      try {
        const res = await uploadImageToCloudinary(data, "icons");
        return res?.secure_url;
      } catch (error) {
        return undefined;
      }
    }
  );
  let technology;
  try {
    technology = await getATechnology(techId!);
  } catch (error) {
    throw serverError(500, "Something wrong happened");
  }
  if (!technology) {
    throw serverError(404, "Not found");
  }

  const formData = await requestClone.formData();
  const imageData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const image = imageData.get("icon");
  const data = Object.fromEntries(formData);
  let databaseData;

  if (!image) {
    const { icon, ...excludedIcon } = data;
    databaseData = excludedIcon;
  } else {
    try {
      await deleteImageFromCloudinary(technology.icon);
    } catch (error) {}
    databaseData = { ...data, icon: image };
  }
  try {
    await updateTechnology(techId!, databaseData);
  } catch (error) {
    throw serverError(404, "Something wrong happened");
  }
  return redirect("..");
};
