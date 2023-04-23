import { NavLink, Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
const NavBar = () => {
  const { userData } = useLoaderData();

  return (
    <header className="relative flex justify-between  py-[30px] px-[80px] z-50">
      <Link to="/">Home</Link>
      <nav>
        <ul className="flex gap-[80px]">
          <li className="hover:scale-110">
            <NavLink to="/my-project">My Projects</NavLink>
          </li>
          <li className="hover:scale-110">
            <NavLink to="/skills">My Skills</NavLink>
          </li>
          <li className="hover:scale-110">
            <NavLink to="/about">About me</NavLink>
          </li>
          <li className="hover:scale-110">
            <NavLink to="/contact">Contact</NavLink>
          </li>
          {!userData ? (
            <li className="hover:scale-110">
              <NavLink to="/auth">Login</NavLink>
            </li>
          ) : (
            <>
              <li className="hover:scale-110">
                <NavLink to="/profile">{userData.name}</NavLink>
              </li>
              <li className="hover:scale-110">
                <Link to="/logout">Logout</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default NavBar;
