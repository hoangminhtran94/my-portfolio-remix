import { Link } from "@remix-run/react";

import type { FC, ComponentPropsWithoutRef } from "react";

const Button: FC<ComponentPropsWithoutRef<"button"> & { to?: string }> = ({
  to,
  className,
  children,
  ...otherProps
}) => {
  return (
    <>
      {!to ? (
        <button
          className={`${className} hover:bg-slate-100 border-[2.5px] border-indigo-200  px-4 py-2  rounded-md `}
          {...otherProps}
        >
          {children}
        </button>
      ) : (
        <Link
          className={`${className} hover:bg-slate-100 border-[2.5px] border-indigo-200  text-center  px-4 py-2  rounded-md `}
          to={to}
          {...(otherProps as ComponentPropsWithoutRef<"a">)}
        >
          {children}
        </Link>
      )}
    </>
  );
};

export default Button;
