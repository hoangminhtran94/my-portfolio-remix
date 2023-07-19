import { useActionData, useLoaderData, useMatches } from "@remix-run/react";
import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import Projects from "~/components/ProjectPage/Projects";

import SkillShowCase from "~/components/UI/SkillsShowCase/SkillsShowCase";
import { getTechnologyGroups } from "~/utils/database/skills.server";
import ContactSection from "../../components/ContactMe/ContactSection";
import About from "~/components/About/About";

const MyProject = () => {
  const loaderData = useLoaderData();
  const data = useActionData();
  console.log(data);
  const matches = useMatches();
  const rootData = matches[0].data;
  const projects = rootData.projects;

  return (
    <div className="w-full flex-1 2xl:min-h-[1000px] flex flex-col gap-6">
      <About />

      <Projects projects={projects} />

      <SkillShowCase skillsData={loaderData} />

      <ContactSection />
    </div>
  );
};
export default MyProject;

export const meta: MetaFunction = () => {
  return { title: "My Projects" };
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    return json({
      frontends: await getTechnologyGroups("frontend"),
      backends: await getTechnologyGroups("backend"),
    });
  } catch (error) {
    return json({
      frontends: [],
      backends: [],
    });
  }
};
