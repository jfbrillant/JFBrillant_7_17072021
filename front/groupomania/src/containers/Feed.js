import "../styles/Feed.scss";
import React, { Fragment } from "react";
import PostSubmit from "./PostSubmit";
import PostsViewer from "./PostsViewer";
import { connect } from "react-redux";

function Feed({ submitPostState, deletePostState, editPostState }) {
  return (
    <main className="container">
      {submitPostState.isLoading ||
      deletePostState.isLoading ||
      editPostState.isLoading ? (
        <p> Chargement en cours...</p>
      ) : (
        <Fragment>
          <PostSubmit />
          <PostsViewer />
        </Fragment>
      )}
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    submitPostState: state.submitPost,
    deletePostState: state.deletePost,
    editPostState: state.editPost,
  };
};

export default connect(mapStateToProps)(Feed);
