import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { apiGET } from "../actions/commentsViewer";
import Comment from "./Comment";

function CommentsViewer({ commentsData, getCommentsData, deleteCommentState, editCommentState, submitCommentState, id }) {
  useEffect(() => {
    getCommentsData(id);
  }, [getCommentsData, deleteCommentState, editCommentState, submitCommentState, id]);

  const displayComments = !commentsData.comments ? (
    <p>Il n'y a aucun commentaire... !</p>
  ) : commentsData.isLoading ? (
    <p>Chargement en cours...</p>
  ) : commentsData.error ? (
    <p>{commentsData.error}</p>
  ) : (
    commentsData.comments.map((comment) => {
      return (
        <div key={comment.id} className="container">
          <Comment comment={comment} />
        </div>
      );
    })
  );

  return <Fragment>{displayComments}</Fragment>;
}

const mapStateToProps = (state) => {
  return {
    commentsData: state.getComments,
    deleteCommentState: state.deleteComment,
    editCommentState: state.editComment,
    submitCommentState: state.submitComment
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCommentsData: (id) => dispatch(apiGET(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsViewer);
