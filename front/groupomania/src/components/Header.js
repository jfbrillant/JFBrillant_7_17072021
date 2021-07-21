import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/icon-left-font-monochrome-white.svg";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink to="/feed">
            <img
              src={logo}
              width="150"
              height="50"
              className="navbar-brand d-inline-block align-top"
              alt="Groupomania logo"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  exact
                  activeClassName="active"
                  aria-current="page"
                  className="nav-link"
                  to="/login"
                >
                  Se connecter
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  activeClassName="active"
                  aria-current="page"
                  className="nav-link"
                  to="/signup"
                >
                  Créer un compte
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
