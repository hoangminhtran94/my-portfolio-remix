import { useMatches, useLoaderData } from "@remix-run/react";
import type { Technology } from "./../../../../utils/models/models";
import TechnologyIcon from "~/components/UI/TechnologyIcon/TechnologyIcon";
const TechnologyTable = () => {
  const matches = useMatches();
  const technologies = matches[0].data.technologies;

  return (
    <div>
      <h2 className="text-center font-bold">All technologies</h2>
      <div className="p-5">
        <ul className="flex flex-col gap-10">
          <li
            className=" grid h-7 grid-cols-6 items-center font-bold text-lg  "
            key="header"
          >
            <span className="text-center">Icon</span>
            <span className="text-center">Technology</span>
            <span className="text-center">Background color</span>
            <span className="text-center">Font color</span>
          </li>
          {technologies.map((tech: Technology) => (
            <li className=" grid  grid-cols-6 items-center" key={tech.id}>
              <span className=" h-full  text-center">
                <TechnologyIcon className="mx-auto" icon={tech.icon} />
              </span>
              <span className="   text-center">{tech.name}</span>
              <span
                className=" h-full w-1/2 mx-auto shadow-md rounded-lg"
                style={{ backgroundColor: tech.backgroundColor }}
              />
              <span
                className=" h-full w-1/2 mx-auto shadow-md rounded-lg"
                style={{ backgroundColor: tech.textColor }}
              />
              <span className="text-center cursor-pointer hover:scale-110 transition-all">
                Edit
              </span>
              <span className="text-center cursor-pointer hover:scale-110 transition-all">
                Delete
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TechnologyTable;
