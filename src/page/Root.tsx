import { Outlet, NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";

function Root() {
  return (
    <div className="App">
      <aside>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div className="icon-container">
              <AiFillHome />
            </div>
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div className="icon-container">
              <MdFavorite />
            </div>
            <span>Favorites</span>
          </NavLink>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
