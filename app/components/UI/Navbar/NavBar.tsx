import { NavLink, Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
const NavBar = () => {
  const data = useLoaderData();

  return (
    <header className="relative flex justify-between text-slate-500  items-center py-[36px] px-[80px] z-50">
      <Link to="/">Home</Link>
      <nav>
        <ul className="flex gap-[80px] items-center">
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
      </nav>
    </header>
  );
};
export default NavBar;
