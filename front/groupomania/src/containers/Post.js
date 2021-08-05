import "../styles/Post.scss";
import React, { useState, useRef } from "react";
import { decodeHTMLEntities }  from "../utils/decodeHTMLEntities"
import moment from "moment";
import "moment/locale/fr";
import PostDelete from "./PostDelete";
import PostEdit from "./PostEdit";
import { HashLink as Link } from 'react-router-hash-link';
import { apiPUT } from "../actions/postEdit";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import LikeButton from "./LikeButton";

function Post({ post, editPost, editPostState }) {

  const [, forceUpdate] = useState();

  const [isUpdated, setIsUpdated] = useState(false);
  const [postUpdate, setPostUpdate] = useState({
    title: decodeHTMLEntities(post.title),
    attachment: post.attachment,
  });

  const validator = useRef(new SimpleReactValidator({
    messages: {
      required: 'Le champ :attribute est requis',
      between: 'Le titre doit contenir entre :min et :max carractères'
    },
  }))

  const submitForm = () => {
    if (validator.current.allValid()) {
      editPost(post.id, postUpdate);
      setIsUpdated(false);
    } else {
      validator.current.showMessages(true);
      forceUpdate(1);
    }
  };


  return (
    <div className="card mb-5 bg-dark">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          {!isUpdated ? (
            <Link
              to={`/post/${post.id}`}
              className="text-reset text-decoration-none"
            >
              <h2 className="card-title">{decodeHTMLEntities(post.title)}</h2>
            </Link>
          ) : (
            <div>
              <input
                type="text"
                className="form-control my-3"
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
                "required|between:2,100"
              )}
              <input
                type="file"
                name="attachment"
                className="form-control my-3"
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
                className="btn btn-primary"
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
        <div className="card-text d-flex align-items-center flex-wrap">
          <Link
            to={`/profil/${post.userId}`}
            className="text-reset text-decoration-none"
          >
            <p className="m-0 pe-3 h5">{post.User.firstname} {post.User.lastname}</p>
          </Link>
          <p className="m-0 pe-3">
          <i className="pe-1 far fa-clock"></i>
          {moment(post.createdAt).fromNow()}
          </p>
          <div>
          <PostEdit
            userId={post.userId}
            postId={post.id}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
          />
          <PostDelete userId={post.userId} postId={post.id} />
          </div>
        </div>
      </div>
      <Link to={`/post/${post.id}`}>
        <img src={post.attachment} className="card-img-top" alt="Img" />
      </Link>
      <div className="d-flex justify-content-between">
        <LikeButton post={post}/>
        <Link to={`/post/${post.id}#comment`} className="btn btn-dark">
          <i className="fas fa-comments"></i> {post.Comments.length !== 0 ? (post.Comments[0].num_comments) : "0"}
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    editPostState: state.editPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPost: (id, postUpdate) => dispatch(apiPUT(id, postUpdate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
