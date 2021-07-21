import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import 'moment/locale/fr'
import { apiGET } from "../actions/postsViewer";

function PostsViewer({ postsData, getPostsData }) {
  useEffect(() => {
    getPostsData();
  }, [getPostsData]);

  const displayPosts = !postsData.posts ? (
    <p>Il n'y a aucun post... !</p>
  ) : postsData.isLoading ? (
    <p>Chargement en cours...</p>
  ) : postsData.error ? (
    <p>{postsData.error}</p>
  ) : (
    postsData.posts.map((post) => {
      return (
        <div key={post.id} className="mb-5">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p className="card-text">
                Posté par{" "}
                <span className="h5">
                  {post.User.firstname} {post.User.lastname}
                </span>{" "}
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
            <img src={post.attachment} className="card-img-top" alt="Img" />
          </div>
        </div>
      );
    })
  );

  return <div className="container">{displayPosts}</div>;
}

const mapStateToProps = (state) => {
  return {
    postsData: state.getPosts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostsData: () => dispatch(apiGET()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsViewer);
