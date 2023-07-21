import { Outlet } from "@remix-run/react";

const AppLayout = () => {
  return (
    <main className=" container mx-auto flex flex-col flex-1 relative 2xl:h-auto  px-4  ">
      <Outlet />
    </main>
  );
};

export default AppLayout;
