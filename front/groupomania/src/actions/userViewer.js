import {
    GET_USER,
    GET_USER_SUCCES,
    GET_USER_ERROR,
  } from "../constants/userViewer";
  import axios from "axios";
  
  const getUserAction = () => {
    return {
      type: GET_USER,
    };
  };
  
  const getUserSuccesAction = (data) => {
    return {
      type: GET_USER_SUCCES,
      payload: data,
    };
  };
  
  const getUserErrorAction = (err) => {
    return {
      type: GET_USER_ERROR,
      payload: err,
    };
  };
  
  export const apiGET = (id) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return (dispatch) => {
      dispatch(getUserAction());
      axios
        .get(`http://localhost:3000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        })
        .then((res) => {
          dispatch(getUserSuccesAction(res.data));
        })
        .catch((err) => {
          dispatch(getUserErrorAction(err.message));
        });
    };
  };
  