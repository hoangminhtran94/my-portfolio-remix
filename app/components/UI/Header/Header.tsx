import { useInView } from "framer-motion";
import {
  type FC,
  type ReactNode,
  type ComponentPropsWithoutRef,
  useRef,
} from "react";

interface HeaderProps {
  children: ReactNode;
}

const Header: FC<HeaderProps & ComponentPropsWithoutRef<"h1">> = ({
  children,
  ...otherProps
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <h1
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
      ref={ref}
      {...otherProps}
    >
      {children}
    </h1>
  );
};

export default Header;