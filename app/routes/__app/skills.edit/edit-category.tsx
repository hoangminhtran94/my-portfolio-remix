import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData, useMatches } from "@remix-run/react";
import Button from "~/components/UI/Button/Button";
import { useState } from "react";
import Input from "~/components/UI/Input/Input";
import { getUserFromSession } from "~/utils/database/auth.server";
import {
  createTechnologyCategory,
  getTechnologyCategories,
  getTechnologyTypes,
  updateTechnologyCategory,
} from "~/utils/database/skills.server";

const EditCategory = () => {
  const matches = useMatches();
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const data = matches[2].data;

  return (
    <Form
      method="post"
      className="flex flex-col gap-4 p-5 rounded border border-indigo-300 "
    >
      <h2 className="text-center">Edit Category</h2>
      <div className="flex flex-col gap-3">
        <label className="ml-2">Choose type of technology</label>
        <select
          name="typeId"
          value={selectedType}
          className="rounded border-solid border p-2 border-slate-200 focus:outline-slate-400"
          onChange={(e) => {
            setSelectedType(e.target.value);
            setSelectedCategory("");
          }}
        >
          <option value="">Please choose an option</option>
          {data?.technologyTypes?.map((type: any) => (
            <option key={type.id} value={type.id}>
              {type.name.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {selectedType && (
        <div className="flex flex-col gap-3">
          <label className="ml-2">Choose category</label>
          <select
            name="categoryId"
            value={selectedCategory}
            className="rounded border-solid border p-2 border-slate-200 focus:outline-slate-400"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            <option value="">Please choose an option</option>
            {data?.technologyCategories
              ?.filter((cat: any) => cat.technologyTypeId === selectedType)
              .map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
      )}
      {selectedCategory && (
        <Input
          defaultValue={
            data?.technologyCategories.find(
              (cat: any) => cat.id === selectedCategory
            ).name
          }
          label="Category name"
          name="name"
          className="flex-1"
          containerClassName="h-full"
        />
      )}
      <div className="flex gap-3">
        <Button to=".." className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default EditCategory;

export const action: ActionFunction = async ({ request }) => {
  try {
    await getUserFromSession(request);
  } catch (error) {
    throw redirect("/auth");
  }

  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  try {
    await updateTechnologyCategory(data.categoryId, data.name);
    return redirect("/skills/edit");
  } catch (error) {
    throw error;
  }

  //   try {
  //     await createTechnologyCategory(data);
  //     return redirect("/skills/edit");
  //   } catch (error) {
  //     throw error;
  //   }
};
