import TechnologyIcon from "~/components/UI/TechnologyIcon/TechnologyIcon";
import type { FC } from "react";
import type { Technology } from "~/utils/models/models";
import { Link } from "@remix-run/react";

const TableRow: FC<{ tech: Technology }> = ({ tech }) => {
  return (
    <li className=" grid odd:bg-slate-50 py-4  grid-cols-4 md:grid-cols-6 items-center">
      <span className=" h-full  text-center">
        <TechnologyIcon
          className="mx-auto md:!w-[40px] md:!h-[40px] !w-[30px] !h-[30px] "
          icon={tech.icon}
        />
      </span>
      <span className="   text-center">{tech.name}</span>
      <span
        className=" md:inline hidden h-full w-1/2 mx-auto shadow-md rounded-lg"
        style={{ backgroundColor: tech.backgroundColor }}
      />
      <span
        className="md:inline hidden h-full w-1/2 mx-auto shadow-md rounded-lg"
        style={{ backgroundColor: tech.textColor }}
      />
      <Link
        className="text-center cursor-pointer hover:scale-110 transition-all"
        to={tech.id}
      >
        Edit
      </Link>
      <span className="text-center cursor-pointer hover:scale-110 transition-all">
        Delete
      </span>
    </li>
  );
};

export default TableRow;
