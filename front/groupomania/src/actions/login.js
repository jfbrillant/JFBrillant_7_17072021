import {
  SUBMIT_LOGIN,
  SUBMIT_LOGIN_SUCCES,
  SUBMIT_LOGIN_ERROR,
} from "../constants/login";
import axios from "axios";

const submitLoginAction = (signUpData) => {
  return {
    type: SUBMIT_LOGIN,
    payload: signUpData,
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
    payload: err,
  };
};

export const apiPOST = (loginData) => {
  return (dispatch) => {
    dispatch(submitLoginAction(loginData));
    axios
      .post("http://localhost:3000/api/auth/login", loginData)
      .then((res) => {
        dispatch(submitLoginSuccesAction(res));
        localStorage.setItem('userToken', res.data.token)
      })
      .catch((err) => {
        dispatch(submitLoginErrorAction(err));
      });
  };
};
