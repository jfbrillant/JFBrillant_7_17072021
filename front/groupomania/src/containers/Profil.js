import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import UserEdit from "./UserEdit";
import UserDelete from "./UserDelete";
import { apiGET } from "../actions/userViewer";
import { apiPUT } from "../actions/userEdit";

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
  const [userUpdate, setUserUpdate] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
  });
  
  useEffect(() => {
    getUser(id);
  }, [getUser, editUserState, id]);
  
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
                <h2>Vous pouvez ici modifier ou supprimer votre profil</h2>
              </Fragment>
            ) : (
              <h1>
                Voici le profil de {userData.firstname} {userData.lastname}
              </h1>
            )
          }
          <div className="card mb-2 rounded-3 bg-light bg-gradient">
            <div className="card-body">
              <div className="d-grid gap-2 mb-2 mt-2 d-flex justify-content-start">
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
                    className="form-control mt-1 mb-1"
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
                  <input
                    className="form-control mt-1 mb-1"
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
                  <button
                    type="submit"
                    className="btn btn-dark"
                    onClick={(e) => {
                      e.preventDefault();
                      editUser(userData.id, userUpdate);
                      setIsUpdated(!isUpdated);
                    }}
                  >
                    Valider les modifications
                  </button>
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
