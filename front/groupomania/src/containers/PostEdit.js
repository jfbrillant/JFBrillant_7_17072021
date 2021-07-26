import React from "react";
import { Fragment } from "react";

function PostEdit({ userId, isUpdated, setIsUpdated }) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const displayEditButton =
    userData.isAdmin || userData.userId === userId ? (
      <button
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          setIsUpdated(!isUpdated);
        }}
      >
        M
      </button>
    ) : (
      <Fragment></Fragment>
    );

  return <Fragment>{displayEditButton}</Fragment>;
}

export default PostEdit;
