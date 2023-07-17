import { Form, useMatches, useFetcher } from "@remix-run/react";
import Button from "~/components/UI/Button/Button";

import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUserFromSession } from "~/utils/database/auth.server";
import { createSkillGroup } from "~/utils/database/skills.server";
import type { FormEvent } from "react";
import { useState } from "react";
const NewGroup = () => {
  const matches = useMatches();
  const categoriesdata = matches[2].data;
  const availablegroupdata = matches[3].data;
  const fetcher = useFetcher();

  const currentCategories = categoriesdata?.technologyCategories.filter(
    (tech: any) =>
      tech.type.name === "backend" &&
      (availablegroupdata.length === 0
        ? true
        : !availablegroupdata
            .map((group: any) => group.technologyCategoryId)
            .includes(tech.id))
  );
  const [selectedList, setSelectedList] = useState<
    { id: string; priority: number }[]
  >(currentCategories.map((ct: any) => ({ id: ct.id, priority: 1 })));

  const submitHandler = async (e: FormEvent) => {
    const formdata = new FormData();
    formdata.append("backendgroups", JSON.stringify(selectedList));
    fetcher.submit(formdata, { method: "post" });
  };

  return (
    <Form
      className="flex flex-col gap-2 border border-indigo-500 p-5 rounded"
      onSubmit={submitHandler}
    >
      {currentCategories?.map((category: any) => (
        <div key={category.id} className="grid grid-cols-4  gap-3">
          <p className=" col-span-3 p-2">{category.name}</p>

          <select
            name={"priority"}
            defaultValue={1}
            className="rounded border-solid border p-2 border-slate-200 focus:outline-slate-400"
            onChange={(e) => {
              setSelectedList((prev) => {
                const copied = [...prev];
                const index = copied.findIndex(
                  (prev) => prev.id === category.id
                );
                const currentCategory = copied[index];
                const updatedList = {
                  ...currentCategory,
                  priority: +e.target.value,
                };
                copied[index] = updatedList;
                return copied;
              });
            }}
          >
            {currentCategories?.map((_: any, index: number) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className="flex gap-5">
        <Button to={".."} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Save
        </Button>
      </div>
    </Form>
  );
};
export default NewGroup;

export const action: ActionFunction = async ({ request }) => {
  try {
    await getUserFromSession(request);
  } catch (error) {
    throw redirect("/auth");
  }
  const formData = await request.formData();
  const jsonData = formData.get("backendgroups");
  const data = JSON.parse(jsonData as string);

  let promises: Promise<any>[] = [];

  try {
    data.forEach((data: any) => {
      promises.push(createSkillGroup(data.id, data.priority, []));
    });
    await Promise.all(promises);
    return redirect("/skills/edit/back-end");
  } catch (error) {
    throw error;
  }
};
