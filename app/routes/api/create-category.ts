import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUserFromSession } from "~/utils/database/auth.server";
import { createTechnologyCategory } from "~/utils/database/skills.server";

export const action: ActionFunction = async ({ request }) => {
  try {
    await getUserFromSession(request);
  } catch (error) {
    throw redirect("auth");
  }

  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  try {
    await createTechnologyCategory(data);
    return redirect("/profile/skills/edit");
  } catch (error) {
    throw error;
  }
};
