import "../styles/Comment.scss";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
import CommentEdit from "./CommentEdit";
import CommentDelete from "./CommentDelete";
import { apiPUT } from "../actions/commentEdit";
import SimpleReactValidator from "simple-react-validator";

function Comment({ comment, editComment, editCommentState }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [commentUpdate, setCommentUpdate] = useState({
    content: comment.content,
  });

  const [, forceUpdate] = useState();
  const validator = useRef(new SimpleReactValidator({
    messages: {
      required: 'Le champ :attribute est requis',
      alpha_num_dash_space: 'Le :attribute doit contenir uniquement des lettres, des chiffres et des espaces',
      between: 'Le :attribute doit contenir entre :min et :max carractères'
    },
  }))

  const submitForm = () => {
    if (validator.current.allValid()) {
      editComment(comment.postId, comment.id, commentUpdate);
    } else {
      validator.current.showMessages(true);
      forceUpdate(1);
    }
  };

  return (
    <div className="card mb-2 bg-dark" key={comment.id}>
      <div className="card-body">
        <div className="card-text d-flex align-items-center flex-wrap">
          <Link
            to={`/profil/${comment.userId}`}
            className="text-reset text-decoration-none"
          >
            <p className="m-0 pe-3 h5">{comment.User.firstname} {comment.User.lastname}</p>
          </Link>
          <p className="m-0 pe-3">
          <i className="pe-1 far fa-clock"></i>
          {moment(comment.createdAt).fromNow()}
          </p>
          <div>
          <CommentEdit
            userId={comment.userId}
            commentId={comment.id}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
          />
          <CommentDelete
            userId={comment.userId}
            postId={comment.postId}
            commentId={comment.id}
          />
          </div>
        </div>
        {!isUpdated ? (
          <p className="card-text">{comment.content}</p>
        ) : (
          <div>
            <textarea
              className="form-control my-3"
              placeholder="commentaire"
              value={commentUpdate.content}
              onChange={(e) =>
                setCommentUpdate({
                  ...commentUpdate,
                  content: e.target.value,
                })
              }
              aria-describedby="post-title"
            />
            {validator.current.message(
              "commentaire",
              commentUpdate.content,
              "required|alpha_num_dash_space|between:2,500"
            )}
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
            <div className="text-danger mt-2">{editCommentState.error}</div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    commentData: state.getComments,
    editCommentState: state.editComment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editComment: (postId, commentId, commentUpdate) =>
      dispatch(apiPUT(postId, commentId, commentUpdate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
