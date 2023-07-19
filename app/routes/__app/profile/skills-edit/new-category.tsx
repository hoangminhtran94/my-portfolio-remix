import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Button from "~/components/UI/Button/Button";
import Input from "~/components/UI/Input/Input";
import { getUserFromSession } from "~/utils/database/auth.server";
import {
  createTechnologyCategory,
  getTechnologyTypes,
} from "~/utils/database/skills.server";

const NewCategoryForm = () => {
  const data = useLoaderData();
  return (
    <Form
      method="post"
      action="/api/create-category"
      className="flex flex-col gap-4 p-5 rounded border border-indigo-300 "
    >
      <h2 className="text-center">New Category</h2>
      <div className="flex flex-col  gap-2">
        <label>Type</label>
        <select
          name="typeId"
          className="rounded border-solid border p-2 border-slate-200 focus:outline-slate-400"
          onChange={(e) => {}}
        >
          {data?.technologyTypes?.map((type: any) => (
            <option key={type.id} value={type.id}>
              {type.name.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <Input
        label="Category name"
        name="name"
        className="flex-1"
        containerClassName="h-full"
      />
      <Button>Save</Button>
    </Form>
  );
};

export default NewCategoryForm;

export const loader: LoaderFunction = async ({ request }) => {
  return {
    technologyTypes: await getTechnologyTypes(),
  };
};

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
    return redirect("/skills/edit");
  } catch (error) {
    throw error;
  }
};
