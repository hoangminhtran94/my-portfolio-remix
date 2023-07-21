import { useContext, type FC, type ReactNode } from "react";
import { PageContext } from "~/store/page-context";
import { useLocation, useNavigate } from "@remix-run/react";
// import { useSelector } from "react-redux/es/hooks/useSelector";
interface ScrollLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const ScrollLink: FC<ScrollLinkProps> = ({ to, className, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentPage, onChangePage, onForceScrollTo } =
    useContext(PageContext);
  let targetElement: any;

  // const isInView = useInView(targetElement);
  // console.log(isInView);

  if (typeof document !== "undefined") {
    targetElement = document?.getElementById(to);
  }
  return (
    <span
      onClick={() => {
        if (location.pathname !== "/") {
          navigate("/");
          onChangePage(to);
          onForceScrollTo(to);
        } else {
          targetElement?.scrollIntoView({ behavior: "smooth" });
          onChangePage(to);
        }
      }}
      className={` cursor-pointer opacity-50 ${className} ${
        currentPage === to && "!opacity-100 text-xl"
      }`}
    >
      {children}
    </span>
  );
};

export default ScrollLink;
