const TableHeader = () => {
  return (
    <li
      className=" sticky bg-slate-50 top-0  py-4  grid grid-cols-4 md:grid-cols-6 items-center font-bold text-sm  lg:text-md  "
      key="header"
    >
      <span className="text-center">Icon</span>
      <span className="text-center">Technology</span>
      <span className=" md:inline hidden text-center">Background color</span>
      <span className="md:inline hidden text-center">Font color</span>
    </li>
  );
};
export default TableHeader;
