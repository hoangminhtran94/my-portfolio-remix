import { NavLink, Link } from "@remix-run/react";

const NavBar = () => {
  return (
    <header className="relative flex justify-between  py-[30px] px-[80px] z-50">
      <Link to="/">Home</Link>
      <nav>
        <ul className="flex gap-[80px]">
          <li>
            <NavLink to="/my-project">My Projects</NavLink>
          </li>
          <li>
            <NavLink to="/skills">My Skills</NavLink>
          </li>
          <li>
            <NavLink to="/about">About me</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default NavBar;
