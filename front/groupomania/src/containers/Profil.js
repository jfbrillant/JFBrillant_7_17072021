import "../styles/Profil.scss";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import UserEdit from "./UserEdit";
import UserDelete from "./UserDelete";
import { apiGET } from "../actions/userViewer";
import { apiPUT } from "../actions/userEdit";
import SimpleReactValidator from 'simple-react-validator';

function Profil({
  userData,
  getUser,
  editUser,
  editUserState,
  deleteUserState,
}) {
  const id = useParams().id;

  const activeUserId = JSON.parse(localStorage.getItem("userData")).userId;
  
  const [isUpdated, setIsUpdated] = useState(false);
  
  useEffect(() => {
    getUser(id);
  }, [getUser, editUserState, id]);

  const [userUpdate, setUserUpdate] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
  });

  const [, forceUpdate] = useState()
  const validator = useRef(new SimpleReactValidator({
    messages: {
      required: 'Le champ :attribute est requis',
      alpha: 'Le :attribute doit contenir uniquement des lettres',
      between: 'Le :attribute doit contenir entre :min et :max carractères'
    },
  }))

  const submitForm = () => {
    if (validator.current.allValid()) {
      editUser(userData.id, userUpdate);
      setIsUpdated(!isUpdated);
    } else {
      validator.current.showMessages(true);
      forceUpdate(1)
    }
  }
  
  return (
    <main className="container">
      {!userData ? (
        <p>L'utilisateur n'existe pas... !</p>
      ) : editUserState.isLoading || deleteUserState.isLoading ? (
        <p> Chargement en cours...</p>
      ) : (
        <Fragment>
          {
            // eslint-disable-next-line
            userData.id == activeUserId ? (
              <Fragment>
                <h1>Bienvenue {userData.firstname}</h1>
                <h2 className="mb-5">Vous pouvez ici modifier ou supprimer votre profil</h2>
              </Fragment>
            ) : (
              <h1 className="mb-5">
                Voici le profil de {userData.firstname} {userData.lastname}
              </h1>
            )
          }
          <div className="card mb-2 bg-dark">
            <div className="card-body">
              <div className="d-grid gap-2 mb-2 d-flex justify-content-start">
                <UserEdit
                  userId={userData.id}
                  isUpdated={isUpdated}
                  setIsUpdated={setIsUpdated}
                />
                <UserDelete userId={userData.id} />
              </div>
              {!isUpdated ? (
                <div>
                  <p className="card-text mb-0 h5">
                    Prénom : {userData.firstname}
                  </p>
                  <p className="card-text mb-0 h5">Nom : {userData.lastname}</p>
                  <p className="card-text mb-0 h5">E-mail : {userData.email}</p>
                  {userData.isAdmin ? (
                    <p className="card-text mb-0 h5">Admin : oui</p>
                  ) : (
                    <p className="card-text mb-0 h5">Admin : non</p>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    className="form-control my-3"
                    placeholder="Prénom"
                    value={userUpdate.firstname}
                    onChange={(e) =>
                      setUserUpdate({
                        ...userUpdate,
                        firstname: e.target.value,
                      })
                    }
                    aria-describedby="user-firstname"
                  />
                  {validator.current.message('prénom', userUpdate.firstname, 'required|alpha|between:2,40')}
                  <input
                    className="form-control my-3"
                    placeholder="Nom"
                    value={userUpdate.lastname}
                    onChange={(e) =>
                      setUserUpdate({
                        ...userUpdate,
                        lastname: e.target.value,
                      })
                    }
                    aria-describedby="user-lastname"
                  />
                  {validator.current.message('nom', userUpdate.lastname, 'required|alpha|between:2,40')}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      submitForm();
                    }}
                  >
                    Valider les modifications
                  </button>
                  <div className="text-danger mt-2">{editUserState.error}</div>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.getUser.userData,
    editUserState: state.editUser,
    deleteUserState: state.deleteUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(apiGET(id)),
    editUser: (id, userUpdate) => dispatch(apiPUT(id, userUpdate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
