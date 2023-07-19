import type { ReactNode } from "react";
import { createContext, useState } from "react";

export const PageContext = createContext({
  currentPage: "about",
  onChangePage: (page: string) => {},
});

export const PageContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState("about");
  const changePageHandler = (page: string) => {
    setCurrentPage(page);
  };
  return (
    <PageContext.Provider
      value={{ currentPage, onChangePage: changePageHandler }}
    >
      {children}
    </PageContext.Provider>
  );
};
export default PageContextProvider;
