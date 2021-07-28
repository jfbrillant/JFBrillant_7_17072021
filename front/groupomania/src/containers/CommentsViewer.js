import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { apiGET } from "../actions/commentsViewer";
import { apiPUT } from "../actions/commentEdit";
import Comment from "./Comment";

function CommentsViewer({ commentsData, getCommentsData, id }) {
  useEffect(() => {
    getCommentsData(id);
  }, [getCommentsData, id]);

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCommentsData: (id) => dispatch(apiGET(id)),
    editComment: (postId, commentId, commentUpdate) =>
      dispatch(apiPUT(postId, commentId, commentUpdate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsViewer);
