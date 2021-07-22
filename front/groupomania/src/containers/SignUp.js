import React, { useState } from "react";
import { connect } from "react-redux";
import { apiPOST } from "../actions/signup";

function SignUp(props) {
  const [signUpData, setSignUpData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

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
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="inputMail">E-mail</label>
              <input
                type="email"
                className="form-control"
                id="inputMail"
                value={signUpData.email}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
                placeholder="exemple@mail.com"
                required
              />
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
            </div>
          </div>
          <div id="unvalid-form-message" className="col"></div>
          <button
            type="submit"
            id="checkout-button"
            className=" col btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              props.SubmitSignUpData(signUpData);
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
    signUpData: state.signUpData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SubmitSignUpData: (signUpData) => dispatch(apiPOST(signUpData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
