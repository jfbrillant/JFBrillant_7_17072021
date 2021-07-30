import {
  SUBMIT_LOGIN,
  SUBMIT_LOGIN_SUCCES,
  SUBMIT_LOGIN_ERROR,
} from "../constants/login";
import axios from "axios";

const submitLoginAction = (loginData) => {
  return {
    type: SUBMIT_LOGIN,
    payload: loginData,
  };
};

const submitLoginSuccesAction = (res) => {
  return {
    type: SUBMIT_LOGIN_SUCCES,
    payload: res,
  };
};

const submitLoginErrorAction = (err) => {
  return {
    type: SUBMIT_LOGIN_ERROR,
    payload: err.response.data.error,
  };
};

export const apiPOST = (loginData, history) => {
  return (dispatch) => {
    dispatch(submitLoginAction(loginData));
    axios
      .post("http://localhost:3000/api/auth/login", loginData)
      .then((res) => {
        dispatch(submitLoginSuccesAction(res));
        localStorage.setItem("userData", JSON.stringify(res.data));
        localStorage.setItem("isLogin", "true");
        history.push("/feed")
      })
      .catch((err) => {
        dispatch(submitLoginErrorAction(err));
      });
  };
};
