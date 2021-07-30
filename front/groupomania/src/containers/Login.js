import "../styles/Login.scss";
import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { apiPOST } from "../actions/login"
import { useHistory } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';

function Login(props) {

  let history = useHistory();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [, forceUpdate] = useState()
  const validator = useRef(new SimpleReactValidator({
    messages: {
      required: 'Le champ :attribute est requis',
      email: "L':attribute doit être un email valide",
      min: "Le :attribute doit contenir au moins 8 carractères"
    },
  }))

  const submitForm = () => {
    if (validator.current.allValid()) {
      props.SubmitLoginData(loginData, history);
    } else {
      validator.current.showMessages(true);
      forceUpdate(1)
    }
  }

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
            {validator.current.message('email', loginData.email, 'required|email')}
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
            {validator.current.message('mot de passe', loginData.password, 'required|min:8')}
          </div>
          <button
            className="btn btn-dark"
            onClick={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            Valider
          </button>
        </form>
        <div className="text-danger mt-2">{props.loginData.error}</div>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    loginData: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SubmitLoginData: (loginData, history) => dispatch(apiPOST(loginData, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
