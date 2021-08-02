import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { apiGET } from "../actions/onePost";

function OnePostViewer({ onePostsData, getOnePostData, editPostState,  deletePostState, id }) {

  useEffect(() => {
    getOnePostData(id);
  }, [getOnePostData, editPostState, deletePostState, id]);


  const displayPost = !onePostsData.post ? (
    <p>Il n'y a aucun post... !</p>
  ) : onePostsData.isLoading ? (
    <p>Chargement en cours...</p>
  ) : onePostsData.error ? (
    <p>{onePostsData.error}</p>
  ) : (
    <div className="container">
      <Post post={onePostsData.post} />
    </div>
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
