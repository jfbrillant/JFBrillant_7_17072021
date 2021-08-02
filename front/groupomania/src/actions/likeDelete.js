import {
    DELETE_LIKE,
    DELETE_LIKE_SUCCES,
    DELETE_LIKE_ERROR,
  } from "../constants/likeDelete";
  import axios from "axios";
  
  const likeDeleteAction = () => {
    return {
      type: DELETE_LIKE,
    };
  };
  
  const likeDeleteSuccesAction = (res) => {
    return {
      type: DELETE_LIKE_SUCCES,
      payload: res,
    };
  };
  
  const likeDeleteErrorAction = (err) => {
    return {
      type: DELETE_LIKE_ERROR,
      payload: err,
    };
  };
  
  export const apiDELETE = (postId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return (dispatch) => {
      dispatch(likeDeleteAction());
      axios
        .delete(`http://localhost:3000/api/post/${postId}/like`, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        })
        .then((res) => {
          dispatch(likeDeleteSuccesAction(res));
        })
        .catch((err) => {
          dispatch(likeDeleteErrorAction(err));
        });
    };
  };
  