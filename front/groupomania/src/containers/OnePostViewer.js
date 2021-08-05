import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { apiGET } from "../actions/onePost";

function OnePostViewer({
  onePostsData,
  getOnePostData,
  editPostState,
  deletePostState,
  id,
}) {
  useEffect(() => {
    getOnePostData(id);
  }, [getOnePostData, editPostState, deletePostState, id]);

  const displayPost = onePostsData.isLoading ? (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : onePostsData.error ? (
    <p>{onePostsData.error}</p>
  ) : !onePostsData.post ? (
    <p>Il n'y a aucun post... !</p>
  ) : (
    <Post post={onePostsData.post} />
  );

  return <Fragment>{displayPost}</Fragment>;
}

const mapStateToProps = (state) => {
  return {
    onePostsData: state.getOnePost,
    deletePostState: state.deletePost,
    editPostState: state.editPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOnePostData: (id) => dispatch(apiGET(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnePostViewer);
