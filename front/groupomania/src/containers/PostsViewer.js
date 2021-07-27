import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import PostDelete from "./PostDelete";
import PostEdit from "./PostEdit";
import moment from "moment";
import "moment/locale/fr";
import { apiGET } from "../actions/postsViewer";
import { apiPUT } from "../actions/postEdit";

function PostsViewer({ postsData, getPostsData, editPost }) {
  useEffect(() => {
    getPostsData();
  }, [getPostsData]);

  const [isUpdated, setIsUpdated] = useState(false);
  const [postUpdate, setPostUpdate] = useState({
    title: "",
    attachment: "",
  });

  const displayPosts = !postsData.posts ? (
    <p>Il n'y a aucun post... !</p>
  ) : postsData.isLoading ? (
    <p>Chargement en cours...</p>
  ) : postsData.error ? (
    <p>{postsData.error}</p>
  ) : (
    postsData.posts.map((post) => {
      return (
        <div className="container" key={post.id}>
          <div className="card mb-5 bg-light bg-gradient">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                {!isUpdated ? (
                  <Link
                    to={`/post/${post.id}`}
                    className="text-reset text-decoration-none"
                  >
                    <h2 className="card-title">{post.title}</h2>
                  </Link>
                ) : (
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={post.title}
                      value={postUpdate.title}
                      onChange={(e) =>
                        setPostUpdate({
                          ...postUpdate,
                          title: e.target.value,
                        })
                      }
                      aria-describedby="post-title"
                    />
                    <input
                      type="file"
                      name="attachment"
                      className="form-control"
                      accept=".jpg,.gif"
                      onChange={(e) =>
                        setPostUpdate({
                          ...postUpdate,
                          attachment: e.target.files[0],
                        })
                      }
                      aria-describedby="post-title"
                    />
                    <button
                      type="submit"
                      className="btn btn-dark"
                      onClick={(e) => {
                        e.preventDefault();
                        editPost(post.id, postUpdate);
                      }}
                    >
                      Valider les modifications
                    </button>
                  </div>
                )}
              </div>
              <p className="card-text">
                <span className="h5">
                  {post.User.firstname} {post.User.lastname}
                </span>{" "}
                {moment(post.createdAt).fromNow()}
              </p>
              <div className="d-grid gap-2 d-flex justify-content-start">
                <PostEdit
                  userId={post.userId}
                  postId={post.id}
                  isUpdated={isUpdated}
                  setIsUpdated={setIsUpdated}
                />
                <PostDelete userId={post.userId} postId={post.id} />
              </div>
            </div>
            <img src={post.attachment} className="card-img-top" alt="Img" />
            <div className="d-flex justify-content-between">
              <button className="btn btn-dark">
                <i className="fas fa-heart"></i> {post.likes}
              </button>
              <LinkButton to={`/post/${post.id}`} className="btn btn-dark">
                <i className="fas fa-comments"></i> {post.comments}
              </LinkButton>
            </div>
          </div>
        </div>
      );
    })
  );

  return <Fragment>{displayPosts}</Fragment>;
}

const mapStateToProps = (state) => {
  return {
    postsData: state.getPosts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostsData: () => dispatch(apiGET()),
    editPost: (id, postUpdate) => dispatch(apiPUT(id, postUpdate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsViewer);
