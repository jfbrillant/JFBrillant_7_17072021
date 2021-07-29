import React from "react";
import { Fragment } from "react";

function UserEdit({ userId, isUpdated, setIsUpdated }) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const displayEditButton =
    userData.isAdmin || userData.userId === userId ? (
      <button
        className="btn btn-outline-dark btn-sm"
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

export default UserEdit;
