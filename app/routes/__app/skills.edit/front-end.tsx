import { Form, useLoaderData, useMatches, Outlet } from "@remix-run/react";
import Button from "~/components/UI/Button/Button";
import InputDropdown from "~/components/UI/InputDropdown/InputDropdown";
import type { Technology } from "~/utils/models/models";
import type { FormEvent } from "react";
import { useState } from "react";
import { useFetcher } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUserFromSession } from "~/utils/database/auth.server";
import { redirect } from "@remix-run/node";

import {
  getTechnologyGroups,
  updateSkillGroup,
} from "~/utils/database/skills.server";

const FrontEndEditForm = () => {
  const matches = useMatches();
  const loaderdata = useLoaderData();
  const fetcher = useFetcher();
  const technologies: Technology[] = matches[0].data.technologies;
  const categoriesdata = matches[2].data;
  const currentCategories = categoriesdata?.technologyCategories.filter(
    (tech: any) =>
      tech.type.name === "frontend" &&
      (!loaderdata || loaderdata?.length === 0
        ? true
        : !loaderdata
            .map((group: any) => group.technologyCategoryId)
            .includes(tech.id))
  );

  const [selectedList, setSelectedList] = useState<
    {
      groupId: string;
      categoryId: string;
      technologyids: string[];
      priority: number;
    }[]
  >(
    loaderdata?.map((data: any) => ({
      groupId: data.id ?? "",
      categoryId: data.technologyCategoryId ?? "",
      technologyids: data.technologiesIds ?? [],
      priority: data.priority ?? 1,
    }))
  );

  const submitHandler = (e: FormEvent) => {
    const formData = new FormData();
    formData.append("frontendList", JSON.stringify(selectedList));
    fetcher.submit(formData, { method: "post" });
  };

  return (
    <div className="flex flex-col gap-3 border border-indigo-300 p-5">
      <div className="flex flex-col gap-3">
        <Button
          to="new-group"
          className={
            !currentCategories || currentCategories.length === 0
              ? "cursor-not-allowed opacity-50 pointer-events-none"
              : ""
          }
        >
          {!currentCategories || currentCategories.length === 0
            ? "No new group available"
            : "New group"}
        </Button>
        <Outlet />
      </div>
      <Form className={`rounded  flex flex-col gap-3`} onSubmit={submitHandler}>
        <div className="flex flex-col gap-3  border-b border-b-indigo-300">
          <h2>Backend skills</h2>

          {loaderdata?.map((group: any, firstIndex: number) => (
            <div key={group.id} className="flex flex-col gap-3">
              <InputDropdown
                defaultList={group.technologies}
                getSelectedList={(list) => {
                  setSelectedList((prev) => {
                    const copied = [...prev];
                    const index = copied.findIndex(
                      (prev) => prev.categoryId === group.technologyCategoryId
                    );
                    const currentCategory = copied[index];
                    const updatedList = {
                      ...currentCategory,
                      technologyids: list.map((item) => item.id),
                    };
                    copied[index] = updatedList;
                    return copied;
                  });
                }}
                label={group.category.name}
                dropdownList={technologies}
              />
              <select
                name={"priority"}
                defaultValue={group.priority}
                className="rounded border-solid border p-2 border-slate-200 focus:outline-slate-400"
                onChange={(e) => {
                  setSelectedList((prev) => {
                    const copied = [...prev];
                    const index = copied.findIndex(
                      (prev) => prev.categoryId === group.technologyCategoryId
                    );
                    const currentCategory = copied[index];
                    const updatedCategory = {
                      ...currentCategory,
                      priority: +e.target.value,
                    };
                    copied[index] = updatedCategory;
                    return copied;
                  });
                }}
              >
                {loaderdata?.map((_: any, index: number) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex gap-5">
          <Button to={".."} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FrontEndEditForm;

export const action: ActionFunction = async ({ request }) => {
  try {
    await getUserFromSession(request);
  } catch (error) {
    throw redirect("/auth");
  }
  const formData = await request.formData();
  const jsonData = formData.get("frontendList");
  const data = JSON.parse(jsonData as string);

  let promises: Promise<any>[] = [];

  try {
    data.forEach((data: any) => {
      promises.push(
        updateSkillGroup(
          data.groupId,
          data.categoryId,
          data.priority,
          data.technologyids
        )
      );
    });
    await Promise.all(promises);
    return redirect("/skills/edit");
  } catch (error) {
    throw error;
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    return json(await getTechnologyGroups("645f20b4cc9091850c9182d7"));
  } catch (error) {
    return [];
  }
};
