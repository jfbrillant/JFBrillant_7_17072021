import React, { useState, useRef } from "react";
import moment from "moment";
import "moment/locale/fr";
import PostDelete from "./PostDelete";
import PostEdit from "./PostEdit";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import { apiPUT } from "../actions/postEdit";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";

function Post({ post, editPost, editPostState }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [postUpdate, setPostUpdate] = useState({
    title: post.title,
    attachment: post.attachment,
  });

  const [, forceUpdate] = useState();
  const validator = useRef(new SimpleReactValidator({
    messages: {
      required: 'Le champ :attribute est requis',
      alpha_num_dash_space: 'Le :attribute doit contenir uniquement des lettres, des chiffres et des espaces',
      between: 'Le titre doit contenir entre :min et :max carractères'
    },
  }))

  const submitForm = () => {
    if (validator.current.allValid()) {
      editPost(post.id, postUpdate);
    } else {
      validator.current.showMessages(true);
      forceUpdate(1);
    }
  };

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
              {validator.current.message(
                "titre",
                postUpdate.title,
                "required|alpha_num_dash_space|between:2,60"
              )}
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
                  submitForm();
                }}
              >
                Valider les modifications
              </button>
              <div className="text-danger mt-2">{editPostState.error}</div>
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
          <i className="fas fa-comments"></i> {post.Comments.length !== 0 ? (post.Comments[0].num_comments) : "0"}
        </LinkButton>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    postsData: state.getPosts,
    onePostData: state.getOnePost,
    editPostState: state.editPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPost: (id, postUpdate) => dispatch(apiPUT(id, postUpdate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
