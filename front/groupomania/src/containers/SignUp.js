import React, { useState, useRef, Fragment } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { apiPOST } from "../actions/signup";
import SimpleReactValidator from "simple-react-validator";

function SignUp(props) {
  let history = useHistory();

  const [signUpData, setSignUpData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "Le champ :attribute est requis",
        email: "L':attribute doit être un email valide",
        alpha: "Le :attribute doit contenir uniquement des lettres",
        min: "Le :attribute doit contenir au moins 8 carractères",
        between: "Le :attribute doit contenir entre :min et :max carractères",
      },
    })
  );

  const submitForm = () => {
    if (validator.current.allValid()) {
      props.SubmitSignUpData(signUpData, history);
    } else {
      validator.current.showMessages(true);
      forceUpdate(1);
    }
  };

  return (
    <main>
      <div className="container">
        <h1 className="mt-5 mb-5">
          Inscrivez-vous et rejoignez la communauté !
        </h1>
        <form id="checkout-form" name="checkout-form">
          <div className="form-row">
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="inputFirstName">Prénom</label>
              <input
                type="text"
                className="form-control"
                id="inputFirstName"
                value={signUpData.firstname}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, firstname: e.target.value })
                }
                placeholder="Prénom"
                required
              />
              {validator.current.message(
                "prénom",
                signUpData.firstname,
                "required|alpha|between:2,40"
              )}
            </div>
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="inputLastName">Nom</label>
              <input
                type="text"
                className="form-control"
                id="inputLastName"
                value={signUpData.lastname}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, lastname: e.target.value })
                }
                placeholder="Nom"
                required
              />
              {validator.current.message(
                "nom",
                signUpData.lastname,
                "required|alpha|between:2,40"
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="inputMail">E-mail</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                value={signUpData.email}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
                placeholder="exemple@mail.com"
                required
              />
              {validator.current.message(
                "email",
                signUpData.email,
                "required|email"
              )}
            </div>
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="inputPassword">Mot de passe</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                value={signUpData.password}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
                placeholder="password123"
                autoComplete="on"
                required
              />
              {validator.current.message(
                "mot de passe",
                signUpData.password,
                "required|min:8"
              )}
            </div>
          </div>
          <div id="unvalid-form-message" className="col"></div>
          <button
            type="submit"
            id="checkout-button"
            className=" col btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            Valider
          </button>
        </form>{" "}
        {props.signUpState.error ? (
          <div className="text-danger mt-2">
            {props.signUpState.error}
          </div>
        ) : (
          <Fragment></Fragment>
        )}
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    signUpState: state.signUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SubmitSignUpData: (signUpData, history) => dispatch(apiPOST(signUpData, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
