import type { User } from "@prisma/client";
import { Link, NavLink } from "@remix-run/react";

import NavbarWrapper from "../NavbarWrapper/NavbarWrapper";
const AdminNavBar = ({ user }: { user?: User }) => {
  return user ? (
    <NavbarWrapper>
      <ul
        className={`flex lg:text-slate-100  flex-col lg:flex-row gap-[60px] md:gap-[80px] text-xl lg:text-[16px] items-center
            }`}
      >
        <li className="hover:scale-110 transition-all">
          <NavLink className="opacity-50" to="/profile/">
            Edit Profile
          </NavLink>
        </li>
        <li className="hover:scale-110 transition-all">
          <NavLink className="opacity-50" to="/profile/edit-about">
            Edit About
          </NavLink>
        </li>
        <li className="hover:scale-110 transition-all">
          <NavLink className="opacity-50" to="/profile/projects">
            Manage Projects
          </NavLink>
        </li>
        <li className="hover:scale-110 transition-all">
          <NavLink className="opacity-50" to="/profile/technology">
            Technology
          </NavLink>
        </li>
        <li className="hover:scale-110 transition-all">
          <NavLink className="opacity-50" to="/profile/skills-edit">
            Edit skills
          </NavLink>
        </li>
        <li className="hover:scale-110 transition-all">
          <Link className="opacity-50" to="/logout">
            Logout
          </Link>
        </li>
      </ul>
    </NavbarWrapper>
  ) : (
    <div>Not available</div>
  );
};

export default AdminNavBar;
