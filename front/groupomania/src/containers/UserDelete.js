import React from "react";
import { connect } from "react-redux";
import { apiDELETE } from "../actions/userDelete";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";

function UserDelete({ userId, deleteUser }) {
  let history = useHistory();

  const userData = JSON.parse(localStorage.getItem("userData"));

  const displayDeleteButton =
    userData.isAdmin || userData.userId === userId ? (
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={(e) => {
          e.preventDefault();
          if (
            window.confirm(
              "Êtes-vous sûr de vouloir supprimer votre compte ? Celà entrainera également la suppression de tous vos posts, commentaires et likes."
            )
          ) {
            deleteUser(userId, history);
          }
        }}
      >
        <i className="far fa-trash-alt"></i>
      </button>
    ) : (
      <Fragment></Fragment>
    );

  return <Fragment>{displayDeleteButton}</Fragment>;
}

const mapStateToProps = (state) => {
  return {
    userDeleteData: state.deleteComment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (userId, history) => dispatch(apiDELETE(userId, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDelete);
