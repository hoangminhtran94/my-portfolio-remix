import { useInView } from "framer-motion";
import type { ComponentPropsWithoutRef, FC } from "react";
import { useRef, useMemo } from "react";
import useScrollChangeRoute from "~/utils/hooks/useScrollChangeRoute";

interface InviewWrapperProps {
  style?: { [key: string]: any };
  loadedState?: boolean;
  mode?: "left-right" | "right-left" | "top-bottom" | "bottom-top" | "fade";
  tag?: "h1" | "div" | "p" | "h2" | "h3";
}
const MODES = {
  "left-right": "translateX(-200px)",
  "right-left": "translateX(200px)",
  "top-bottom": "translateY(-200px)",
  "bottom-top": "translateY(200px)",
  fade: "none",
};

const InviewWrapper: FC<
  InviewWrapperProps & ComponentPropsWithoutRef<"div">
> = ({
  style,
  loadedState = true,
  children,
  tag = "div",
  mode = "top-bottom",
  ...otherProps
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  useScrollChangeRoute({ ref, componentId: otherProps.id });
  const Tag = tag ?? "div";
  return (
    <Tag
      ref={ref}
      style={
        loadedState
          ? {
              transform: isInView ? "none" : MODES[mode],
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }
          : {}
      }
      {...otherProps}
    >
      {children}
    </Tag>
  );
};

export default InviewWrapper;
