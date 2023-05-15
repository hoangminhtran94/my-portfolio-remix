import type { FeatureImage, Project, Technology } from "~/utils/models/models";
import ProjectTechnology from "~/components/UI/ProjectTechnology/ProjectTechnology";
import { Link, useMatches, useParams } from "@remix-run/react";
import ImageWithDescription from "~/components/UI/ImageWithDescription/ImageWithDescription";
import type { MetaFunction } from "@remix-run/node";
import Button from "~/components/UI/Button/Button";

import { motion } from "framer-motion";

const ProjectView = () => {
  const matches = useMatches();
  const { projectId } = useParams();
  const projects = matches[0].data.projects;
  const user = matches[0].data.userData;
  const project = projects.find((project: Project) => project.id === projectId);
  const images = [...project.projectFeatureImages]
    .sort((a, b) => +a.priority - +b.priority)
    .filter(
      (image: FeatureImage) =>
        image.showIn === "detail" || image.showIn === "both"
    );
  return (
    <div className=" flex flex-col items-center gap-10 flex-1 justify-center ">
      <div className="flex gap-8 w-full flex-col py-10 px-4  lg:p-10 bg-indigo-700 text-white">
        <motion.h1
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
          className="text-center flex gap-3 self-center"
        >
          {project.name}
          {user && (
            <Link to="edit" className=" hover:scale-110 transition-all ">
              <svg
                className="w-7 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
              </svg>
            </Link>
          )}
        </motion.h1>
        {project.detailedDescription && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.7 } }}
          >
            <h3 className="font-bold mb-3">About the project</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: project.detailedDescription?.replace(/\n/g, "<br>"),
              }}
              className=" !leading-[40px] md:!leading-[50px]  text-sm md:text-lg"
            ></div>
          </motion.div>
        )}
        {project.technologies.length > 0 && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
          >
            <h3 className="font-bold mb-3">Technologies</h3>
            <div className="flex gap-4 max-w-full flex-wrap text-lg">
              {project.technologies.map((tech: Technology) => (
                <ProjectTechnology
                  key={tech.id}
                  icon={tech.icon}
                  label={tech.name}
                />
              ))}
            </div>
          </motion.div>
        )}
        {project.demoLink && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 1.1 } }}
          >
            <h3 className="font-bold">Link</h3>
            <a
              className="text-lg"
              href={project.demoLink}
              rel="noreferrer"
              target="_blank"
            >
              Visit the demo website
            </a>
          </motion.div>
        )}
        {project.githubLink && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 1.2 } }}
          >
            <h3 className="font-bold">Project respository</h3>
            <a
              className="text-lg"
              href={project.githubLink}
              rel="noreferrer"
              target="_blank"
            >
              Visit the project source code
            </a>
          </motion.div>
        )}
      </div>

      <ImageWithDescription images={images} />
    </div>
  );
};

export default ProjectView;

export const meta: MetaFunction = ({ parentsData, params }) => {
  const { root } = parentsData;
  const { rootUser } = root;
  const { projects } = rootUser;
  const project = projects.find(
    (project: Project) => project.id === params.projectId
  );

  return {
    title: project ? `${project.name} - Project details` : "Project details",
  };
};
