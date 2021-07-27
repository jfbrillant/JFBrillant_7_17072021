import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
import { apiGET } from "../actions/commentsViewer";
import { apiPUT } from "../actions/commentEdit";
import CommentEdit from "./CommentEdit";
import CommentDelete from "./CommentDelete";

function CommentsViewer({ commentsData, getCommentsData, id, editComment }) {

  useEffect(() => {
    getCommentsData(id);
  }, [getCommentsData, id]);

  const [isUpdated, setIsUpdated] = useState(false);
  const [commentUpdate, setCommentUpdate] = useState({
    content: "",
  });

  const displayComments = !commentsData.comments ? (
    <p>Il n'y a aucun commentaire... !</p>
  ) : commentsData.isLoading ? (
    <p>Chargement en cours...</p>
  ) : commentsData.error ? (
    <p>{commentsData.error}</p>
  ) : (
    commentsData.comments.map((comment) => {
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
              <CommentDelete userId={comment.userId} postId={comment.postId} commentId={comment.id} />
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
    })
  );

  return <Fragment>{displayComments}</Fragment>;
}

const mapStateToProps = (state) => {
  return {
    commentsData: state.getComments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCommentsData: (id) => dispatch(apiGET(id)),
    editComment: (postId, commentId, commentUpdate) => dispatch(apiPUT(postId, commentId, commentUpdate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsViewer);
