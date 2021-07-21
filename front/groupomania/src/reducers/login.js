import {
  SUBMIT_LOGIN,
  SUBMIT_LOGIN_SUCCES,
  SUBMIT_LOGIN_ERROR,
} from "../constants/login";

const stateSubmitLogin = {
  isLoading: false,
  signUpData: {
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
        isLoading: true,
        signUpData: action.payload,
        error: "",
      };
    case SUBMIT_LOGIN_SUCCES:
      return {
        ...state,
        isLoading: false,
        signUpData: {
          email: "",
          password: "",
        },
        error: "",
      };
    case SUBMIT_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        signUpData: {
          email: "",
          password: "",
        },
        error: action.payload,
      };

    default:
      return state;
  }
};
