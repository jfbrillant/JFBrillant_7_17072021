import {
  SUBMIT_LOGIN,
  SUBMIT_LOGIN_SUCCES,
  SUBMIT_LOGIN_ERROR,
} from "../constants/login";

const stateSubmitLogin = {
    loginData: {
    email: "",
    password: "",
  },
  error: "",
};

export const loginReducer = (state = stateSubmitLogin, action) => {
  switch (action.type) {
    case SUBMIT_LOGIN:
      return {
        ...state,
        loginData: action.payload,
        error: "",
      };
    case SUBMIT_LOGIN_SUCCES:
      return {
        ...state,
        loginData: {
          email: "",
          password: "",
        },
        error: "",
      };
    case SUBMIT_LOGIN_ERROR:
      return {
        ...state,
        loginData: {
          email: "",
          password: "",
        },
        error: action.payload,
      };

    default:
      return state;
  }
};
