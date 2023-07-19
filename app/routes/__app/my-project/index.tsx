import { useMatches } from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";

import ProjectList from "~/components/ProjectPage/Projects";

const MyProject = () => {
  const matches = useMatches();
  const rootData = matches[0].data;
  const projects = rootData.projects;

  // useEffect(() => {
  //   if (toggleMode) {
  //     setSearchParams(
  //       (prev) => {
  //         prev.set("mode", "carousel");

  //         return prev;
  //       },
  //       { preventScrollReset: true }
  //     );
  //   } else {
  //     setSearchParams(
  //       (prev) => {
  //         prev.set("mode", "list");
  //         return prev;
  //       },
  //       { preventScrollReset: true }
  //     );
  //   }
  //   if (toggleFilterMode) {
  //     setSearchParams(
  //       (prev) => {
  //         prev.set("filterBy", "backend");
  //         return prev;
  //       },
  //       { preventScrollReset: true }
  //     );
  //   } else {
  //     setSearchParams(
  //       (prev) => {
  //         prev.set("filterBy", "frontend");
  //         return prev;
  //       },
  //       { preventScrollReset: true }
  //     );
  //   }
  // }, [setSearchParams, toggleFilterMode, toggleMode]);

  return (
    <div className="w-full flex-1 2xl:min-h-[1000px] flex flex-col gap-6">
      <ProjectList projects={projects} />
    </div>
  );
};
export default MyProject;

export const meta: MetaFunction = () => {
  return { title: "My Projects" };
};
