import React, { useState } from "react";
import moment from "moment";
import "moment/locale/fr";
import PostDelete from "./PostDelete";
import PostEdit from "./PostEdit";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import { apiPUT } from "../actions/postEdit";
import { connect } from "react-redux";

function Post({ post, editPost }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [postUpdate, setPostUpdate] = useState({
    title: post.title,
    attachment: post.attachment,
  });

  return (
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
                placeholder="titre"
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
          <Link
            to={`/profil/${post.userId}`}
            className="h5 text-reset text-decoration-none"
          >
            {post.User.firstname} {post.User.lastname}
          </Link>{" "}
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
      <Link to={`/post/${post.id}`}>
        <img src={post.attachment} className="card-img-top" alt="Img" />
      </Link>
      <div className="d-flex justify-content-between">
        <button className="btn btn-dark">
          <i className="fas fa-heart"></i> {post.likes}
        </button>
        <LinkButton to={`/post/${post.id}`} className="btn btn-dark">
          <i className="fas fa-comments"></i> {post.comments}
        </LinkButton>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    postsData: state.getPosts,
    onePostData: state.getOnePost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPost: (id, postUpdate) => dispatch(apiPUT(id, postUpdate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
