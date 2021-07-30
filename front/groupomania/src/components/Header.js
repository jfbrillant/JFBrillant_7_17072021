import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../assets/icon-left-font-monochrome-white.svg";

function Header({ loginData, deleteUserState }) {

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
    userIsLogin();
  }, [isLogin, loginData, deleteUserState]);

  return (
    <header className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid d-flex">
          <Link to="/feed">
            <img
              src={logo}
              width="150"
              height="50"
              className="navbar-brand d-inline-block align-top"
              alt="Groupomania logo"
            />
          </Link>
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
                  <li className="nav-item text-light me-2">
                    <NavLink
                        exact
                        to={`/profil/${JSON.parse(localStorage.getItem("userData")).userId}`}
                        className="nav-link"
                        onClick={() => {
                          handleNavCollapse()
                        }}
                      >
                      <i className="fas fa-user me-1"></i>
                      Bonjour{" "}
                      {JSON.parse(localStorage.getItem("userData")).firstname}
                    </NavLink>
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
                        handleNavCollapse();
                      }}
                    >
                      <i className="fas fa-sign-out-alt me-1"></i>Se déconnecter
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
                    onClick={() => {
                      handleNavCollapse()
                    }}
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
                    onClick={() => {
                      handleNavCollapse()
                    }}
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
    deleteUserState: state.deleteUser,
  };
};

export default connect(mapStateToProps)(Header);
