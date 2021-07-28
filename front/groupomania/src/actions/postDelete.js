import {
  DELETE_POST,
  DELETE_POST_SUCCES,
  DELETE_POST_ERROR,
} from "../constants/postDelete";
import axios from "axios";

const userData = JSON.parse(localStorage.getItem("userData"));

const postDeleteAction = () => {
  return {
    type: DELETE_POST,
  };
};

const postDeleteSuccesAction = (res) => {
  return {
    type: DELETE_POST_SUCCES,
    payload: res,
  };
};

const postDeleteErrorAction = (err) => {
  return {
    type: DELETE_POST_ERROR,
    payload: err,
  };
};

export const apiDELETE = (id, history) => {
  return (dispatch) => {
    dispatch(postDeleteAction());
    axios
      .delete(`http://localhost:3000/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        dispatch(postDeleteSuccesAction(res));
        history.push("/feed")
      })
      .catch((err) => {
        dispatch(postDeleteErrorAction(err));
      });
  };
};
