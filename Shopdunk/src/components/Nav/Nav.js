import "./Nav.css";
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/news">News</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      <button class="btn m-5">Suggesssfaskldfjl</button>
    </div>
  );
};
export default Nav;
