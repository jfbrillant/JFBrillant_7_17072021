import {
    DELETE_USER,
    DELETE_USER_SUCCES,
    DELETE_USER_ERROR,
  } from "../constants/userDelete";
  import axios from "axios";
  
  const userDeleteAction = () => {
    return {
      type: DELETE_USER,
    };
  };
  
  const userDeleteSuccesAction = (res) => {
    return {
      type: DELETE_USER_SUCCES,
      payload: res,
    };
  };
  
  const userDeleteErrorAction = (err) => {
    return {
      type: DELETE_USER_ERROR,
      payload: err,
    };
  };
  
  export const apiDELETE = (id, history) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return (dispatch) => {
      dispatch(userDeleteAction());
      axios
        .delete(`http://localhost:3000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        })
        .then((res) => {
          dispatch(userDeleteSuccesAction(res));
          // eslint-disable-next-line
          if(userData.isAdmin == true) {
            history.push("/feed")
          } else {
            localStorage.setItem("isLogin", "false");
            localStorage.removeItem("userData");
            history.push("/feed")
          }
        })
        .catch((err) => {
          dispatch(userDeleteErrorAction(err));
        });
    };
  };
  