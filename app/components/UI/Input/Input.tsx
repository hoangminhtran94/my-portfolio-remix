import React from "react";
import type { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...otherProps }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label}>{label}</label>

      <input
        {...otherProps}
        id={label}
        className="rounded border-solid border p-2 h-[35px] border-slate-200 focus:outline-slate-400      "
      />
    </div>
  );
};
export default Input;
