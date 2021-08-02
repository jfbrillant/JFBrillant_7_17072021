import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { apiGET } from "../actions/postsViewer";

function PostsViewer({ postsData, getPostsData, editPostState, deletePostState }) {
  useEffect(() => {
    getPostsData();
  }, [getPostsData, editPostState, deletePostState]);

  const displayPosts = !postsData.posts ? (
    <p>Il n'y a aucun post... !</p>
  ) : postsData.isLoading ? (
    <p>Chargement en cours...</p>
  ) : postsData.error ? (
    <p>{postsData.error}</p>
  ) : (
    postsData.posts.map((post) => {
      return (
        <div key={post.id} className="container">
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
