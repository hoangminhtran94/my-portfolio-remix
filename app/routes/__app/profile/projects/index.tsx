import type { Project } from "@prisma/client";
import { Form, Link, useOutletContext } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { changeProjectVisibility } from "~/utils/database/project.server";
const AllProjectsPage = () => {
  const projects = useOutletContext<Project[]>();
  if (!projects || projects.length === 0) {
    return <div className=" h-[300px]"> There are no projects</div>;
  }
  return (
    <div className="flex flex-col gap-5 p-4">
      <h2 className="text-center">All Projects</h2>
      {projects.map((project) => (
        <div
          className=" flex justify-between items-center border border-indigo-200  rounded p-4 shadow-md"
          key={project.id}
        >
          <div>{project.name}</div>
          <div className="flex gap-3">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <Link
                to={`/my-project/${project.id}`}
                className={`px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700  ${
                  !project.showProject && "opacity-30 pointer-events-none "
                }`}
              >
                View
              </Link>
              <Link
                to={project.id}
                type="button"
                className="px-4 py-2 text-sm border-r font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                Edit
              </Link>
              <Form method="patch">
                <input type="hidden" name="id" value={project.id} />
                <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                  {project.showProject ? "Hide Project" : "Show Project"}
                </button>
              </Form>
              <Form method="delete">
                <input type="hidden" name="id" value={project.id} />
                <button className="px-4 py-2 text-sm font-medium text-red-500 bg-transparent border border-red-500 rounded-r-md hover:border-red-500 hover:bg-red-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-red-400 focus:bg-red-500 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-red-500 dark:focus:bg-red-500">
                  Delete
                </button>
              </Form>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProjectsPage;

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const id = data.get("id");
  if (request.method === "PATCH") {
    try {
      await changeProjectVisibility(id as string);
    } catch (error) {
      throw json(error);
    }
  }
  return json({ message: "Success" });
};
