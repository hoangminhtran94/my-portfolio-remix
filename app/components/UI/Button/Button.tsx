import type { FC, ComponentPropsWithoutRef } from "react";

const Button: FC<ComponentPropsWithoutRef<"button">> = (props) => {
  return (
    <button
      className={`${props.className} hover:bg-slate-100 border-[2px] border-slate-200  px-4 py-2  rounded-md `}
    >
      {props.children}
    </button>
  );
};

export default Button;
