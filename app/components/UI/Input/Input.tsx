import React from "react";
import type { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  containerClassName?: string;
  enableError?: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  className,
  enableError = false,
  errorMessage,
  containerClassName,
  ...otherProps
}) => {
  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      <label className="pl-2" htmlFor={label}>
        {label}
      </label>

      <input
        {...otherProps}
        id={label}
        className={`rounded border-solid border p-2 h-[35px] border-slate-200 focus:outline-slate-400 ${className}     `}
      />
      {enableError && (
        <p
          className={` text-red-500 ${errorMessage ? "visible" : "invisible"}`}
        >
          {errorMessage ?? "No error"}
        </p>
      )}
    </div>
  );
};
export default Input;
