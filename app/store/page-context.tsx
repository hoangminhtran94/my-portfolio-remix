import type { ReactNode } from "react";
import { createContext, useState } from "react";

export const PageContext = createContext({
  currentPage: "about",
  forceScrollTo: "",
  onChangePage: (page: string) => {},
  onForceScrollTo: (page: string) => {},
});

export const PageContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState("about");
  const [forceScrollTo, setForceScrollTo] = useState("");
  const changePageHandler = (page: string) => {
    setCurrentPage(page);
  };
  const forceScrollToHandler = (page: string) => {
    setForceScrollTo(page);
  };
  return (
    <PageContext.Provider
      value={{
        currentPage,
        onChangePage: changePageHandler,
        forceScrollTo,
        onForceScrollTo: forceScrollToHandler,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
export default PageContextProvider;
