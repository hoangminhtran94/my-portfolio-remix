import { Outlet } from "@remix-run/react";

const AppLayout = () => {
  return (
    <main className=" overflow-x-hidden w-full flex flex-col flex-1 relative 2xl:h-auto  px-4  ">
      <Outlet />
    </main>
  );
};

export default AppLayout;
