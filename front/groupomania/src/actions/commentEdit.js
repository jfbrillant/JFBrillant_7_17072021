import {
    EDIT_COMMENT,
    EDIT_COMMENT_SUCCES,
    EDIT_COMMENT_ERROR,
  } from "../constants/commentEdit";
  import axios from "axios";
  
  const userData = JSON.parse(localStorage.getItem("userData"));
  
  const commentEditAction = (commentUpdate) => {
    return {
      type: EDIT_COMMENT,
      payload: commentUpdate,
    };
  };
  
  const commentEditSuccesAction = (res) => {
    return {
      type: EDIT_COMMENT_SUCCES,
      payload: res,
    };
  };
  
  const commentEditErrorAction = (err) => {
    return {
      type: EDIT_COMMENT_ERROR,
      payload: err,
    };
  };
  
  export const apiPUT = (postId, commentId, commentUpdate) => {
    return (dispatch) => {
      dispatch(commentEditAction(commentUpdate));
      axios
        .put(`http://localhost:3000/api/post/${postId}/comment/${commentId}`, commentUpdate, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        })
        .then((res) => {
          dispatch(commentEditSuccesAction(res));
        })
        .catch((err) => {
          dispatch(commentEditErrorAction(err));
        });
    };
  };
  