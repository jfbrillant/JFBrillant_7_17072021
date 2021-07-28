import {
  SUBMIT_LOGIN,
  SUBMIT_LOGIN_SUCCES,
  SUBMIT_LOGIN_ERROR,
} from "../constants/login";

const stateSubmitLogin = {
  isLogin: false,
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
        isLogin: false,
        loginData: action.payload,
        error: "",
      };
    case SUBMIT_LOGIN_SUCCES:
      return {
        ...state,
        isLogin: true,
        loginData: {
          email: "",
          password: "",
        },
        error: "",
      };
    case SUBMIT_LOGIN_ERROR:
      return {
        ...state,
        isLogin: false,
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
