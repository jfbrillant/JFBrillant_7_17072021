import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../assets/icon-left-font-monochrome-white.svg";

function Header({ loginData }) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const userIsLogin = () => {
    if (localStorage.getItem("isLogin") === "true") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  const handleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    userIsLogin(loginData);
  }, [isLogin, loginData]);

  return (
    <header className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid d-flex">
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
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`${
              isNavCollapsed ? "collapse" : ""
            } navbar-collapse ms-auto`}
            id="navbarSupportedContent"
          >
            {isLogin ? (
              <React.Fragment>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item text-light nav-link">
                    Bonjour{" "}
                    {JSON.parse(localStorage.getItem("userData")).firstname}
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/login"
                      className="nav-link"
                      onClick={() => {
                        localStorage.setItem("isLogin", "false");
                        localStorage.removeItem("userData");
                        handleIsLogin();
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i> Se déconnecter
                    </NavLink>
                  </li>
                </ul>
              </React.Fragment>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
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
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    loginData: state.login,
  };
};

export default connect(mapStateToProps)(Header);
