import {
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCES,
  DELETE_COMMENT_ERROR,
} from "../constants/commentDelete";
import axios from "axios";

const commentDeleteAction = () => {
  return {
    type: DELETE_COMMENT,
  };
};

const commentDeleteSuccesAction = (res) => {
  return {
    type: DELETE_COMMENT_SUCCES,
    payload: res,
  };
};

const commentDeleteErrorAction = (err) => {
  return {
    type: DELETE_COMMENT_ERROR,
    payload: err,
  };
};

export const apiDELETE = (postId, commentId) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (dispatch) => {
    dispatch(commentDeleteAction());
    axios
      .delete(`http://localhost:3000/api/post/${postId}/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        dispatch(commentDeleteSuccesAction(res));
      })
      .catch((err) => {
        dispatch(commentDeleteErrorAction(err));
      });
  };
};
