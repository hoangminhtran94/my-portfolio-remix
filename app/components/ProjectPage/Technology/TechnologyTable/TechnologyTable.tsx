import type { FC } from "react";
import type { Technology } from "~/utils/models/models";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
const TechnologyTable: FC<{ technologies: Technology[] }> = ({
  technologies,
}) => {
  return (
    <ul className="flex text-xs  lg:text-[14px]  flex-col">
      <TableHeader />
      {technologies.map((tech: Technology) => (
        <TableRow key={tech.id} tech={tech} />
      ))}
    </ul>
  );
};

export default TechnologyTable;
