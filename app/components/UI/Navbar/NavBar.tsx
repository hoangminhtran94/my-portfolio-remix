import { NavLink, Link, useLocation } from "@remix-run/react";

import { useMatches } from "@remix-run/react";
import ScrollLink from "../ScrollLink/ScrollLink";
import type { User } from "@prisma/client";
import NavbarWrapper from "../NavbarWrapper/NavbarWrapper";
const NavBar = ({ user }: { user?: User }) => {
  const matches = useMatches();
  const currentRoute = matches[2]?.id;

  return (
    <NavbarWrapper>
      <ul
        className={`flex lg:text-slate-100  flex-col lg:flex-row gap-[60px] md:gap-[80px] text-xl lg:text-[16px] items-center ${
          currentRoute === "routes/__app/my-project/$projectId/index"
            ? "!text-white"
            : ""
        }`}
      >
        <li className="hover:scale-110 transition-all">
          <ScrollLink to="about">About me</ScrollLink>
        </li>
        <li className="hover:scale-110 transition-all">
          <ScrollLink to="my-project">My Projects</ScrollLink>
        </li>

        <li className="hover:scale-110 transition-all">
          <ScrollLink to="my-skills">My Skills</ScrollLink>
        </li>
        <li className="hover:scale-110 transition-all">
          <ScrollLink to="my-contact">My Contacts</ScrollLink>
        </li>
        {!user ? (
          <li className="hover:scale-110 transition-all ">
            <NavLink className="opacity-50 " to="/auth">
              Login
            </NavLink>
          </li>
        ) : (
          <>
            <li className="hover:scale-110 transition-all ">
              <NavLink className="opacity-50" to="/profile/">
                {user.name}
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
    </NavbarWrapper>
  );
};
export default NavBar;
