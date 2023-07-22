import type { User } from "@prisma/client";
import { Link, NavLink } from "@remix-run/react";

const AdminNavBar = ({ user }: { user?: User }) => {
  return user ? (
    <header
      className={`flex justify-between w-full text-slate-100  items-center  py-[18px] md:py-[36px] px-4 md:px-12 z-[5000]  `}
    >
      <Link className="hover:scale-110 transition-all" to="/">
        <img
          className="h-[40px] w-auto object-contain"
          src="/images/logo.svg"
          alt="logo"
        />
      </Link>
      <ul
        className={`flex lg:text-slate-100  flex-col lg:flex-row gap-[60px] md:gap-[80px] text-xl lg:text-[16px] items-center
            }`}
      >
        <li className="hover:scale-110 transition-all">
          <Link className="opacity-50" to="/">
            Back main page
          </Link>
        </li>
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
    </header>
  ) : (
    <header>Not available</header>
  );
};

export default AdminNavBar;
