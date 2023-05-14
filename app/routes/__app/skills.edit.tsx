import Button from "~/components/UI/Button/Button";
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { getUserFromSession } from "~/utils/database/auth.server";
import { Outlet } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import {
  getTechnologyCategories,
  getTechnologyTypes,
} from "~/utils/database/skills.server";

const SkillEdit = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <h2 className="text-center">Skill Edit</h2>
      <div className="flex gap-2 ">
        <Button className="flex-1" to="new-category">
          Add new technology category
        </Button>
        <Button className="flex-1" to="edit-category">
          Edit category
        </Button>
      </div>

      <Button to="front-end">Edit Frontend skills</Button>
      <Button to="back-end">Edit Backend skills</Button>
      <Outlet />
    </div>
  );
};

export default SkillEdit;

export const loader: LoaderFunction = async ({ request }) => {
  try {
    await getUserFromSession(request);
  } catch (error) {
    throw redirect("/auth");
  }

  return json({
    technologyTypes: await getTechnologyTypes(),
    technologyCategories: await getTechnologyCategories(),
  });
};
