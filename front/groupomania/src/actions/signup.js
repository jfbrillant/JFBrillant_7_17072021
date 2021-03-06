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
    payload: err.response.data.error,
  };
};

export const apiPOST = (signUpData, history) => {
  return (dispatch) => {
    dispatch(submitSignUpAction(signUpData));
    axios
      .post("http://localhost:3000/api/auth/signup", signUpData)
      .then((res) => {
        dispatch(submitSignUpSuccesAction(res));
        history.push("/login");
      })
      .catch((err) => {
        dispatch(submitSignUpErrorAction(err));
      });
  };
};
