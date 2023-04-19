import React from "react";
import type { ComponentPropsWithoutRef } from "react";

interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, ...otherProps }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label}>{label}</label>
      <textarea
        {...otherProps}
        className="rounded border-solid border p-2 border-slate-200 focus:outline-slate-400      "
        rows={10}
      />
    </div>
  );
};

export default TextArea;
