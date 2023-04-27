import { NavLink, Link, useLocation } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { AnimatePresence, motion } from "framer-motion";
const NavBar = () => {
  const data = useLoaderData();
  const [showNavBar, setShowNavBar] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname) {
      setShowNavBar(false);
    }
  }, [location.pathname]);

  return (
    <header className="relative flex justify-between text-slate-500  items-center  py-[36px] px-8 md:px-4 z-30  ">
      <Link to="/">Home</Link>
      <Button
        className="lg:hidden hover:scale-110 transition-all"
        onClick={() => {
          setShowNavBar(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 448 512"
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </Button>

      <div
        onClick={() => {
          setShowNavBar(false);
        }}
        className={`${
          showNavBar ? "block" : "hidden"
        } lg:hidden fixed top-0 left-0 bg-modal w-screen h-screen`}
      />
      <AnimatePresence initial={false}>
        <motion.nav
          initial={{ transform: "translateX(100%)", opacity: 0 }}
          animate={{ transform: "translateX(0)", opacity: 1 }}
          exit={{ transform: "translateX(100%)", opacity: 0 }}
          key={"navbar" + String(showNavBar)}
          className={`${
            !showNavBar ? "hidden" : "flex"
          }  drop-shadow-lg lg:drop-shadow-none items-center justify-center w-full md:w-1/2   lg:px-0 bg-white fixed right-0 top-0  lg:w-auto h-full lg:h-auto lg:static  lg:block`}
        >
          <ul className="flex flex-col lg:flex-row gap-[80px] items-center">
            <li className="hover:scale-110 transition-all">
              <NavLink to="/my-project">My Projects</NavLink>
            </li>
            <li className="hover:scale-110 transition-all">
              <NavLink to="/skills">My Skills</NavLink>
            </li>
            <li className="hover:scale-110 transition-all">
              <NavLink to="/about">About me</NavLink>
            </li>
            <li className="hover:scale-110 transition-all">
              <NavLink to="/contact">Contact</NavLink>
            </li>
            {!data || !data.userData ? (
              <li className="hover:scale-110 transition-all">
                <NavLink to="/auth">Login</NavLink>
              </li>
            ) : (
              <>
                <li className="hover:scale-110 transition-all">
                  <NavLink to="/profile">{data.userData.name}</NavLink>
                </li>
                <li className="hover:scale-110 transition-all">
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            )}
          </ul>
        </motion.nav>
      </AnimatePresence>
    </header>
  );
};
export default NavBar;
