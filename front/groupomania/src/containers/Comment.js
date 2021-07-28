import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
import CommentEdit from "./CommentEdit";
import CommentDelete from "./CommentDelete";
import { apiPUT } from "../actions/commentEdit";

function Comment({ comment, editComment }) {

  const [isUpdated, setIsUpdated] = useState(false);
  const [commentUpdate, setCommentUpdate] = useState({
    content: "",
  });

  return (
    <div className="card mb-2 rounded-3 bg-light bg-gradient" key={comment.id}>
      <div className="card-body">
        <p className="card-text mb-0">
          <span className="h5">
            {comment.User.firstname} {comment.User.lastname}
          </span>{" "}
          {moment(comment.createdAt).fromNow()}
        </p>
        <div className="d-grid gap-2 mb-2 mt-2 d-flex justify-content-start">
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
        {!isUpdated ? (
          <p className="card-text">{comment.content}</p>
        ) : (
          <div>
            <textarea
              className="form-control mt-1 mb-1"
              placeholder={comment.content}
              value={commentUpdate.content}
              onChange={(e) =>
                setCommentUpdate({
                  ...commentUpdate,
                  content: e.target.value,
                })
              }
              aria-describedby="post-title"
            />
            <button
              type="submit"
              className="btn btn-dark"
              onClick={(e) => {
                e.preventDefault();
                editComment(comment.postId, comment.id, commentUpdate);
              }}
            >
              Valider les modifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    commentData: state.getComments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editComment: (postId, commentId, commentUpdate) => dispatch(apiPUT(postId, commentId, commentUpdate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
