import { Link } from "@remix-run/react";
import type { RemixLinkProps } from "@remix-run/react/dist/components";
import type { FC, ComponentPropsWithoutRef } from "react";

const Button: FC<ComponentPropsWithoutRef<"button"> | RemixLinkProps> = (
  props
) => {
  return (
    <>
      {!(props as RemixLinkProps).to ? (
        <button
          className={`${props.className} hover:bg-slate-100 border-[2px] border-slate-200  px-4 py-2  rounded-md `}
        >
          {props.children}
        </button>
      ) : (
        <Link
          className={`${props.className} hover:bg-slate-100 border-[2px] border-slate-200 text-center  px-4 py-2  rounded-md `}
          to={(props as RemixLinkProps).to}
        >
          {props.children}
        </Link>
      )}
    </>
  );
};

export default Button;
