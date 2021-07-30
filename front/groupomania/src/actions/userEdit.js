import {
    EDIT_USER,
    EDIT_USER_SUCCES,
    EDIT_USER_ERROR,
  } from "../constants/userEdit";
  import axios from "axios";
  
  const userEditAction = (userUpdate) => {
    return {
      type: EDIT_USER,
      payload: userUpdate,
    };
  };
  
  const userEditSuccesAction = (res) => {
    return {
      type: EDIT_USER_SUCCES,
      payload: res,
    };
  };
  
  const userEditErrorAction = (err) => {
    return {
      type: EDIT_USER_ERROR,
      payload: err.response.data.error,
    };
  };
  
  export const apiPUT = (id, userUpdate) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(id)
    return (dispatch) => {
      dispatch(userEditAction(userUpdate));
      axios
        .put(`http://localhost:3000/api/user/${id}`, userUpdate, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        })
        .then((res) => {
          dispatch(userEditSuccesAction(res));
        })
        .catch((err) => {
          dispatch(userEditErrorAction(err));
        });
    };
  };