import "../styles/Login.scss";
import React, { useState } from "react";
import { connect } from "react-redux";
import { apiPOST } from "../actions/login";

function Login(props) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  return (
    <main>
      <div className="container">
        <h1 className="mt-5 mb-5">
          Connectez-vous et partagez vos gifs les plus drôles !
        </h1>
        <form>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="exemple@mail.com"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Mot de passe
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="password123"
              autoComplete="on"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              props.SubmitSignUpData(loginData);
            }}
          >
            Valider
          </button>
        </form>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    loginData: state.loginData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SubmitSignUpData: (loginData) => dispatch(apiPOST(loginData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
