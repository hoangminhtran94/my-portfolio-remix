import { useInView } from "framer-motion";
import type { ComponentPropsWithoutRef, FC } from "react";
import { useRef, useMemo, useEffect, useState } from "react";
import useScrollChangeRoute from "~/utils/hooks/useScrollChangeRoute";

interface InviewWrapperProps {
  style?: { [key: string]: any };
  loadedState?: boolean;
  mode?: "left-right" | "right-left" | "top-bottom" | "bottom-top" | "fade";
  tag?: "h1" | "div" | "p" | "h2" | "h3";
  once?: boolean;
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
  once = false,
  mode = "top-bottom",
  ...otherProps
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  useScrollChangeRoute({ ref, componentId: otherProps.id });
  const Tag = tag ?? "div";
  const styles = loadedState
    ? loaded
      ? {
          transform: isInView ? "none" : MODES[mode],
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }
      : {}
    : {
        transform: isInView ? "none" : MODES[mode],
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      };

  return (
    <Tag ref={ref} style={styles} {...otherProps}>
      {children}
    </Tag>
  );
};

export default InviewWrapper;
