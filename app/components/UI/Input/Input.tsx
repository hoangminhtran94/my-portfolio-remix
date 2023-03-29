import React from "react";

interface InputProps {
  label: string;
}

const Input: React.FC<InputProps> = ({ label }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        className="rounded border-solid border-[1px] p-2 h-[35px] border-slate-50 focus:outline-slate-200 "
      />
    </div>
  );
};
export default Input;
