import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import CommentSubmit from "./CommentSubmit";
import CommentsViewer from "./CommentsViewer";
import OnePostViewer from "./OnePostViewer";

function OnePost({
  deletePostState,
  editPostState,
  deleteCommentState,
  editCommentState,
  submitCommentState,
}) {
  const id = useParams().id;

  return (
    <main className="container">
      {editPostState.isLoading ||
      deletePostState.isLoading ||
      deleteCommentState.isLoading ||
      editCommentState.isLoading ||
      submitCommentState.isLoading ? (
        <p> Chargement en cours...</p>
      ) : (
        <div className="container">
          <OnePostViewer id={id} />
          <CommentSubmit id={id} />
          <CommentsViewer id={id} />
        </div>
      )}
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    deletePostState: state.deletePost,
    editPostState: state.editPost,
    deleteCommentState: state.deleteComment,
    editCommentState: state.editComment,
    submitCommentState: state.submitComment,
  };
};

export default connect(mapStateToProps)(OnePost);
