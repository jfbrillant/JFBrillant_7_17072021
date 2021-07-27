import React from 'react'
import { connect } from "react-redux";
import { apiDELETE } from '../actions/postDelete';
import { Fragment } from 'react';
import LinkButton from '../components/LinkButton';

function postDelete({ userId, postId, deletePost }) {

    const userData = JSON.parse(localStorage.getItem('userData'));

    const displayDeleteButton =
      userData.isAdmin || userData.userId === userId ? (
        <LinkButton
          to="/feed"
          className="btn btn-outline-danger"
          onClick={(e) => {
            e.preventDefault();
            deletePost(postId);
          }}
        >
          <i className="fas fa-trash-alt"></i>
        </LinkButton>
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
      deletePost: (id) => dispatch(apiDELETE(id)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(postDelete)