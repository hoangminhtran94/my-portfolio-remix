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
    <header className="relative flex justify-between text-slate-500  items-center  py-[36px] px-4 md:px-12 z-30  ">
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
          }  drop-shadow-lg lg:drop-shadow-none items-center justify-center 
          w-full md:w-1/2 flex-col    lg:px-0 bg-white fixed right-0 top-0  lg:w-auto h-full lg:h-auto lg:static  lg:block`}
        >
          <span
            onClick={() => {
              setShowNavBar(false);
            }}
            className=" lg:hidden  absolute top-[5%] left-[5%] cursor-pointer hover:scale-110 transition-all"
          >
            <svg
              className="w-8 h-8"
              fill="#b6b6b6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3V304h96c17.7 0 32-14.3 32-32V240c0-17.7-14.3-32-32-32H256V150.3c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z" />
            </svg>
          </span>
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
