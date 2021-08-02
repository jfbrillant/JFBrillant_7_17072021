import {
    CREATE_LIKE,
    CREATE_LIKE_SUCCES,
    CREATE_LIKE_ERROR,
  } from "../constants/likeCreate";
  import axios from "axios";
  
  const likeCreateAction = (postId) => {
    return {
      type: CREATE_LIKE,
      payload: postId,
    };
  };
  
  const likeCreateSuccesAction = (res) => {
    return {
      type: CREATE_LIKE_SUCCES,
      payload: res,
    };
  };
  
  const likeCreateErrorAction = (err) => {
    return {
      type: CREATE_LIKE_ERROR,
      payload: err,
    };
  };
  
  export const apiPOST = (postId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return async (dispatch) => {
      dispatch(likeCreateAction(postId));
      await axios
        .post(`http://localhost:3000/api/post/${postId}/like`, postId, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        })
        .then((res) => {
          dispatch(likeCreateSuccesAction(res));
        })
        .catch((err) => {
          dispatch(likeCreateErrorAction(err));
        });
    };
  };
  