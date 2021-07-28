import {
  SUBMIT_SIGNUP,
  SUBMIT_SIGNUP_SUCCES,
  SUBMIT_SIGNUP_ERROR,
} from "../constants/signup";
import axios from "axios";

const submitSignUpAction = (signUpData) => {
  return {
    type: SUBMIT_SIGNUP,
    payload: signUpData,
  };
};

const submitSignUpSuccesAction = (res) => {
  return {
    type: SUBMIT_SIGNUP_SUCCES,
    payload: res.message,
  };
};

const submitSignUpErrorAction = (err) => {
  return {
    type: SUBMIT_SIGNUP_ERROR,
    payload: err.message,
  };
};

export const apiPOST = (signUpData) => {
  return (dispatch) => {
    dispatch(submitSignUpAction(signUpData));
    axios
      .post("http://localhost:3000/api/auth/signup", signUpData)
      .then((res) => {
        dispatch(submitSignUpSuccesAction(res));
        window.location.pathname = "/login";
      })
      .catch((err) => {
        dispatch(submitSignUpErrorAction(err));
      });
  };
};
