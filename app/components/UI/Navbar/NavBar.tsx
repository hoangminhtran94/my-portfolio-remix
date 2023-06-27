import { NavLink, Link, useLocation } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useMatches } from "@remix-run/react";
const NavBar = () => {
  const data = useLoaderData();
  const matches = useMatches();
  const currentRoute = matches[2].id;
  const [showNavBar, setShowNavBar] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname) {
      setShowNavBar(false);
    }
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 flex justify-between text-slate-100  items-center  py-[18px] md:py-[36px] px-4 md:px-12 z-30 ${
        currentRoute === "routes/__app/my-project/$projectId/index"
          ? "endless-river !text-white"
          : "shore"
      } `}
    >
      <Link className="hover:scale-110 transition-all" to="/">
        <img
          className="h-[40px] w-auto object-contain"
          src="/images/logo.svg"
          alt="logo"
        />
      </Link>
      <Button
        className="lg:hidden hover:scale-110 transition-all hover:!bg-transparent"
        onClick={() => {
          setShowNavBar(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 448 512"
          fill="#ffff"
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
          w-full md:w-1/2 flex-col lg:px-0 bg-indigo-700 lg:bg-transparent  fixed right-0 top-0  lg:w-auto h-full lg:h-auto lg:static  lg:block`}
        >
          <span
            onClick={() => {
              setShowNavBar(false);
            }}
            className=" text-white lg:hidden  absolute top-[5%] right-[5%] cursor-pointer hover:scale-110 transition-all"
          >
            X
          </span>
          <ul
            className={`flex lg:text-slate-100  flex-col lg:flex-row gap-[60px] md:gap-[80px] text-xl lg:text-[16px] items-center ${
              currentRoute === "routes/__app/my-project/$projectId/index"
                ? "!text-white"
                : ""
            }`}
          >
            <li className="hover:scale-110 transition-all">
              <NavLink className="opacity-50" to="/my-project">
                My Projects
              </NavLink>
            </li>
            <li className="hover:scale-110 transition-all">
              <NavLink className="opacity-50" to="/skills">
                My Skills
              </NavLink>
            </li>
            <li className="hover:scale-110 transition-all">
              <NavLink className="opacity-50" to="/about">
                About me
              </NavLink>
            </li>
            <li className="hover:scale-110 transition-all">
              <NavLink className="opacity-50" to="/contact">
                Contact
              </NavLink>
            </li>
            {!data || !data.userData ? (
              <li className="hover:scale-110 transition-all">
                <NavLink className="opacity-50" to="/auth">
                  Login
                </NavLink>
              </li>
            ) : (
              <>
                <li className="hover:scale-110 transition-all">
                  <NavLink className="opacity-50" to="/profile">
                    {data.userData.name}
                  </NavLink>
                </li>
                <li className="hover:scale-110 transition-all">
                  <Link className="opacity-50" to="/logout">
                    Logout
                  </Link>
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
