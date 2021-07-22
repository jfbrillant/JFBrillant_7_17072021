import {
  GET_POSTS,
  GET_POSTS_SUCCES,
  GET_POSTS_ERROR,
} from "../constants/postsViewer";
import axios from "axios";

const userData = JSON.parse(localStorage.getItem('userData'));

const getPostsAction = () => {
  return {
    type: GET_POSTS,
  };
};

const getPostsSuccesAction = (data) => {
  return {
    type: GET_POSTS_SUCCES,
    payload: data,
  };
};

const getPostsErrorAction = (err) => {
  return {
    type: GET_POSTS_ERROR,
    payload: err,
  };
};

export const apiGET = () => {
  return (dispatch) => {
    dispatch(getPostsAction());
    axios
      .get("http://localhost:3000/api/post", {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        dispatch(getPostsSuccesAction(res.data));
      })
      .catch((err) => {
        dispatch(getPostsErrorAction(err.message));
      });
  };
};
