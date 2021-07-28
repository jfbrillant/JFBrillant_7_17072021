import {
  SUBMIT_COMMENT,
  SUBMIT_COMMENT_SUCCES,
  SUBMIT_COMMENT_ERROR,
} from "../constants/commentSubmit";
import axios from "axios";

const commentSubmitAction = (commentSubmitData) => {
  return {
    type: SUBMIT_COMMENT,
    payload: commentSubmitData,
  };
};

const commentSubmitSuccesAction = (res) => {
  return {
    type: SUBMIT_COMMENT_SUCCES,
    payload: res,
  };
};

const commentSubmitErrorAction = (err) => {
  return {
    type: SUBMIT_COMMENT_ERROR,
    payload: err,
  };
};

export const apiPOST = (commentSubmitData, id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (dispatch) => {
    dispatch(commentSubmitAction(commentSubmitData));
    axios
      .post(`http://localhost:3000/api/post/${id}/comment`, commentSubmitData, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        dispatch(commentSubmitSuccesAction(res));
      })
      .catch((err) => {
        dispatch(commentSubmitErrorAction(err));
      });
  };
};
