import React from "react";
import { useEffect } from "react";
import type { MutableRefObject } from "react";
import {} from "lodash";
const useClickOutside = (
  ref: MutableRefObject<any>,
  excutingFunction: () => void
) => {
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      console.log((e.target as HTMLElement).contains(ref.current));
      if ((e.target as HTMLElement).contains(ref.current)) {
        excutingFunction();
      }
    };
    document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);
};

export default useClickOutside;
