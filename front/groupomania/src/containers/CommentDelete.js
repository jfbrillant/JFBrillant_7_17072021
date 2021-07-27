import React from "react";
import { connect } from "react-redux";
import { apiDELETE } from "../actions/commentDelete";
import { Fragment } from "react";

function CommentsDelete({ userId, postId, commentId, deleteComment }) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const displayDeleteButton =
    userData.isAdmin || userData.userId === userId ? (
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={(e) => {
          e.preventDefault();
          deleteComment(postId, commentId);
        }}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    ) : (
      <Fragment></Fragment>
    );

  return <Fragment>{displayDeleteButton}</Fragment>;
}

const mapStateToProps = (state) => {
  return {
    commentDeleteData: state.deleteComment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (postId, commentId) =>
      dispatch(apiDELETE(postId, commentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsDelete);
