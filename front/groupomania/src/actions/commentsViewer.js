import {
  GET_COMMENTS,
  GET_COMMENTS_SUCCES,
  GET_COMMENTS_ERROR,
} from "../constants/commentsViewer";
import axios from "axios";

const getCommentsAction = () => {
  return {
    type: GET_COMMENTS,
  };
};

const getCommentsSuccesAction = (data) => {
  return {
    type: GET_COMMENTS_SUCCES,
    payload: data,
  };
};

const getCommentsErrorAction = (err) => {
  return {
    type: GET_COMMENTS_ERROR,
    payload: err,
  };
};

export const apiGET = (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (dispatch) => {
    dispatch(getCommentsAction());
    axios
      .get(`http://localhost:3000/api/post/${id}/comment`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        dispatch(getCommentsSuccesAction(res.data));
      })
      .catch((err) => {
        dispatch(getCommentsErrorAction(err.message));
      });
  };
};
