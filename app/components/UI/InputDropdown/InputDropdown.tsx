import type { ComponentPropsWithoutRef, FC } from "react";
import { useState, useRef } from "react";
import type { Technology } from "~/utils/models/models";
import { includes } from "lodash";

interface InputDropdownProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  dropdownList: Technology[];
}

const InputDropdown: FC<InputDropdownProps> = ({
  label,
  dropdownList,
  ...otherProps
}) => {
  const [input, setInput] = useState("");
  const [selectedItems, setSelectedItems] = useState<Technology[]>([]);

  const displayList = dropdownList.filter((item) => {
    return (
      item.name.toLowerCase().includes(input.toLowerCase().trim()) &&
      input.length > 0 &&
      !includes(selectedItems, item)
    );
  });
  return (
    <div className="relative flex flex-col gap-2">
      <label htmlFor={label}>{label}</label>
      <input
        className="rounded border-solid border p-2 h-[35px] border-slate-200 focus:outline-slate-400"
        id={label}
        value={input}
        placeholder="Search for a technology"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        {...otherProps}
      />
      {selectedItems.length > 0 && (
        <ul className="flex gap-1">
          {selectedItems.map((item, index) => (
            <li
              className="flex items-center gap-1 py-1 px-2 border rounded-md border-slate-200"
              key={item.id}
            >
              {item.name}{" "}
              <span
                className=" cursor-pointer"
                onClick={() => {
                  setSelectedItems((prev) => {
                    const selected = [...prev];
                    prev.splice(index, 1);
                    return selected;
                  });
                }}
              >
                | x
              </span>
            </li>
          ))}
        </ul>
      )}
      {displayList.length > 0 && (
        <ul className="absolute top-[105%] w-full bg-white border-2 border-slate-200">
          {displayList.map((item) => (
            <li
              onClick={() => {
                setSelectedItems((prev) => [...prev, item]);
                setInput("");
              }}
              className="p-3 hover:bg-slate-100"
              key={item.id}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default InputDropdown;
