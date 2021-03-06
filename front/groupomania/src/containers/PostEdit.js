import React from "react";
import { Fragment } from "react";

function PostEdit({ userId, isUpdated, setIsUpdated }) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const displayEditButton =
    userData.isAdmin || userData.userId === userId ? (
      <button
        className="btn btn-outline-light btn-sm me-1"
        onClick={(e) => {
          e.preventDefault();
          setIsUpdated(!isUpdated);
        }}
      >
        <i className="fas fa-edit"></i>
      </button>
    ) : (
      <Fragment></Fragment>
    );

  return <Fragment>{displayEditButton}</Fragment>;
}

export default PostEdit;
