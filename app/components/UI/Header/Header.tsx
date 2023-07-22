import { useInView } from "framer-motion";
import {
  type FC,
  type ReactNode,
  type ComponentPropsWithoutRef,
  useRef,
} from "react";
import InviewWrapper from "../InviewWrapper/InviewWrapper";
interface HeaderProps {
  children: ReactNode;
  once?: boolean;
}

const Header: FC<HeaderProps & ComponentPropsWithoutRef<"h1">> = ({
  children,
  className,
  once = false,
  ...otherProps
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once });
  return (
    <InviewWrapper
      tag="h1"
      mode="right-left"
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s  cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
      className={`tracking-widest mt-[80px] drop-shadow-blue-around  xl:mt-[40px] ${className}`}
      {...otherProps}
    >
      {children}
    </InviewWrapper>
  );
};

export default Header;
