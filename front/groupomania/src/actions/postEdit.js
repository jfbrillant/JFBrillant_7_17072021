import {
  EDIT_POST,
  EDIT_POST_SUCCES,
  EDIT_POST_ERROR,
} from "../constants/postEdit";
import axios from "axios";

const postEditAction = (postUpdate) => {
  return {
    type: EDIT_POST,
    payload: postUpdate,
  };
};

const postEditSuccesAction = (res) => {
  return {
    type: EDIT_POST_SUCCES,
    payload: res,
  };
};

const postEditErrorAction = (err) => {
  return {
    type: EDIT_POST_ERROR,
    payload: err.response.data.error,
  };
};

export const apiPUT = (id, postUpdate) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (dispatch) => {
    dispatch(postEditAction(postUpdate));
    const data = new FormData();
    data.append("title", postUpdate.title);
    data.append("attachment", postUpdate.attachment);
    axios
      .put(`http://localhost:3000/api/post/${id}`, data, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        dispatch(postEditSuccesAction(res));
      })
      .catch((err) => {
        dispatch(postEditErrorAction(err));
      });
  };
};
