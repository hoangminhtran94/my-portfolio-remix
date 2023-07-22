import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUserFromSession } from "~/utils/database/auth.server";
import {
  deleteFeatureImageGroup,
  getAFeatureGroupImage,
} from "~/utils/database/project.server";

import serverError from "~/utils/models/ServerError";

export const action: ActionFunction = async ({ request, params }) => {
  try {
    await getUserFromSession(request);
  } catch (error) {
    throw redirect("auth");
  }
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

  try {
    await deleteFeatureImageGroup(featureImage);
    return redirect("/profile/projects/" + featureImage.projectId);
  } catch (error) {
    throw error;
  }
};
