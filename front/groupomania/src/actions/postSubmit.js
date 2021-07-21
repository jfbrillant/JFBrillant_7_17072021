import {
  SUBMIT_POSTS,
  SUBMIT_POSTS_SUCCES,
  SUBMIT_POSTS_ERROR,
} from "../constants/postSubmit";
import axios from "axios";

const token = localStorage.getItem("userToken");

const postSubmitAction = (postSubmitData) => {
  return {
    type: SUBMIT_POSTS,
    payload: postSubmitData,
  };
};

const postSubmitSuccesAction = (res) => {
  return {
    type: SUBMIT_POSTS_SUCCES,
    payload: res,
  };
};

const postSubmitErrorAction = (err) => {
  return {
    type: SUBMIT_POSTS_ERROR,
    payload: err,
  };
};

export const apiPOST = (postSubmitData) => {
  return (dispatch) => {
    dispatch(postSubmitAction(postSubmitData));
    const data = new FormData();
    data.append("title", postSubmitData.title);
    data.append("attachment", postSubmitData.attachment);
    axios
      .post("http://localhost:3000/api/post", data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(postSubmitSuccesAction(res));
      })
      .catch((err) => {
        dispatch(postSubmitErrorAction(err));
      });
  };
};
