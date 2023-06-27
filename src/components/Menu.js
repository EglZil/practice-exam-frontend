import { NavLink } from "react-router-dom";
import "./Menu.css";

export function Menu() {
  return (
    <nav className="Navigation">
      <ul>
        <li>
          <NavLink to="/services" className="Link">
            CarServices
          </NavLink>
        </li>
        <li>
          <NavLink to="/employees" className="Link">
            Employees
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}