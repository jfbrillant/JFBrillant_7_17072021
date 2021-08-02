import {
    GET_LIKES,
    GET_LIKES_SUCCES,
    GET_LIKES_ERROR,
  } from "../constants/likesViewer";
  import axios from "axios";
  
  const getLikesAction = () => {
    return {
      type: GET_LIKES,
    };
  };
  
  const getLikesSuccesAction = (data) => {
    return {
      type: GET_LIKES_SUCCES,
      payload: data,
    };
  };
  
  const getLikesErrorAction = (err) => {
    return {
      type: GET_LIKES_ERROR,
      payload: err,
    };
  };
  
  export const apiGET = (postId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
  
    return (dispatch) => {
      dispatch(getLikesAction());
      axios
        .get(`http://localhost:3000/api/post/${postId}/like`, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        })
        .then((res) => {
          dispatch(getLikesSuccesAction(res.data));
        })
        .catch((err) => {
          dispatch(getLikesErrorAction(err.message));
        });
    };
  };
  