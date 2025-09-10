import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <img src="/lunagurt-bg.png" alt="Logo" className="logo-image" />
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => "nav-links" + (isActive ? " active" : "")}>
              Clientes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/users" className={({ isActive }) => "nav-links" + (isActive ? " active" : "")}>
              Usuarios
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
