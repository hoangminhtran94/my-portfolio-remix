import { useMatches } from "@remix-run/react";

import TechnologyTable from "~/components/ProjectPage/Technology/TechnologyTable/TechnologyTable";

const TechnologyView = () => {
  const matches = useMatches();
  const technologies = matches[0].data.technologies;

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-center font-bold py-3">All technologies</h2>
      <div className="overflow-y-scroll overflow-x-hidden  ">
        <TechnologyTable technologies={technologies} />
      </div>
    </div>
  );
};

export default TechnologyView;
