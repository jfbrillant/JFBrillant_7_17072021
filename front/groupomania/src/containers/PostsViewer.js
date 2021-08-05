import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { apiGET } from "../actions/postsViewer";

function PostsViewer({
  postsData,
  getPostsData,
  submitPostState,
  editPostState,
  deletePostState,
}) {
  useEffect(() => {
    getPostsData();
  }, [getPostsData, submitPostState, editPostState, deletePostState]);

  const displayPosts = postsData.isLoading ? (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : postsData.error ? (
    <p>{postsData.error}</p>
  ) : !postsData.posts ? (
    <p>Il n'y a aucun post... !</p>)
    : (
    postsData.posts.map((post) => {
      return (
        <div key={post.id}>
          <Post post={post} />
        </div>
      );
    })
  );

  return <Fragment>{displayPosts}</Fragment>;
}

const mapStateToProps = (state) => {
  return {
    postsData: state.getPosts,
    submitPostState: state.submitPost,
    editPostState: state.editPost,
    deletePostState: state.deletePost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostsData: () => dispatch(apiGET()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsViewer);
