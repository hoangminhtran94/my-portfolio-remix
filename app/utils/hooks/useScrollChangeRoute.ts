import { useInView } from "framer-motion";
import type { MutableRefObject } from "react";
import { useContext, useEffect, useRef } from "react";
import { PageContext } from "~/store/page-context";

interface useScrollChangeRouteProps {
  ref: MutableRefObject<any>;
  componentId?: string;
}
const useScrollChangeRoute = ({
  ref,
  componentId,
}: useScrollChangeRouteProps) => {
  const timeoutRef = useRef<any>(null);
  const isInView = useInView(ref);
  const { onChangePage } = useContext(PageContext);
  useEffect(() => {
    if (componentId) {
      if (isInView) {
        timeoutRef.current = setTimeout(() => {
          onChangePage(componentId);
        }, 700);
      } else {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [componentId, isInView]);
};

export default useScrollChangeRoute;
