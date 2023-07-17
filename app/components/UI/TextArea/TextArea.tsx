import React from "react";
import type { ComponentPropsWithoutRef } from "react";

interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  label?: string;
  textAreaClassName?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  className,
  textAreaClassName,
  ...otherProps
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label htmlFor={label}>{label}</label>}
      <textarea
        {...otherProps}
        className={`rounded border-solid border p-2 border-slate-200 focus:outline-slate-400 ${textAreaClassName}`}
        rows={10}
      />
    </div>
  );
};

export default TextArea;
