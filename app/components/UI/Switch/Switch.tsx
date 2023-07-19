import type { FC, ChangeEventHandler } from "react";

interface SwitchProps {
  label: string;
  className?: string;
  onChange: ChangeEventHandler;
  defaultChecked: boolean;
}

const Switch: FC<SwitchProps> = ({
  label,
  className,
  onChange,
  defaultChecked = false,
}) => {
  return (
    <label
      className={`relative inline-flex items-center cursor-pointer hover:scale-105 transition-all ${className}`}
    >
      <input
        onChange={onChange}
        type="checkbox"
        defaultChecked={defaultChecked}
        value=""
        className="sr-only peer"
      />
      <div
        className="w-11 h-6 bg-gray-200 peer-focus:outline-none 
  peer-focus:ring-4 peer-focus:ring-blue-300 
   rounded-full peer 
  peer-checked:after:translate-x-full peer-checked:after:border-white
   after:content-[''] after:absolute after:top-[2px] 
   after:left-[2px] after:bg-white after:border-gray-300 after:border 
   after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
      ></div>
      <span className="ml-3 text-md light-blue-gradient-text font-bold  ">
        {label}
      </span>
    </label>
  );
};
export default Switch;
