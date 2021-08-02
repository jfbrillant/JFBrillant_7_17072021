import React from 'react'
import { connect } from "react-redux";
import { apiDELETE } from '../actions/postDelete';
import { Fragment } from 'react';
import { useHistory } from "react-router-dom";

function PostDelete({ userId, postId, deletePost }) {
  
  let history = useHistory();

    const userData = JSON.parse(localStorage.getItem('userData'));

    const displayDeleteButton =
      userData.isAdmin || userData.userId === userId ? (
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={(e) => {
            e.preventDefault();
            deletePost(postId, history);
          }}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      ) : (
        <Fragment></Fragment>
      );

    return <Fragment>{displayDeleteButton}</Fragment>

}

const mapStateToProps = (state) => {
    return {
      postDeleteData: state.deletePost,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      deletePost: (id, history) => dispatch(apiDELETE(id, history)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(PostDelete)