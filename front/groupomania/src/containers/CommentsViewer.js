import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import 'moment/locale/fr'
import { apiGET } from "../actions/commentsViewer";

function CommentsViewer({ commentsData, getCommentsData, id}) {
  useEffect(() => {
    getCommentsData(id);
  }, [getCommentsData, id]);

  const displayComments = !commentsData.comments ? (
    <p>Il n'y a aucun commentaire... !</p>
  ) : commentsData.isLoading ? (
    <p>Chargement en cours...</p>
  ) : commentsData.error ? (
    <p>{commentsData.error}</p>
  ) : (
    commentsData.comments.map((comment) => {
      return (
        <div key={comment.id} className="mb-5">
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                Posté par{" "}
                <span className="h5">
                  {comment.User.firstname} {comment.User.lastname}
                </span>{" "}
                {moment(comment.createdAt).fromNow()}
              </p>
              <p className="card-text">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      );
    })
  );

  return <div className="container">{displayComments}</div>;
}

const mapStateToProps = (state) => {
  return {
    commentsData: state.getComments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCommentsData: (id) => dispatch(apiGET(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsViewer);
