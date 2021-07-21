import {
  SUBMIT_SIGNUP,
  SUBMIT_SIGNUP_SUCCES,
  SUBMIT_SIGNUP_ERROR,
} from "../constants/signup";

const stateSubmitSignUp = {
  isLoading: false,
  signUpData: {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  },
  error: "",
};

export const signupReducer = (state = stateSubmitSignUp, action) => {
  switch (action.type) {
    case SUBMIT_SIGNUP:
      return {
        ...state,
        isLoading: true,
        signUpData: action.payload,
        error: "",
      };
    case SUBMIT_SIGNUP_SUCCES:
      return {
        ...state,
        isLoading: false,
        signUpData: {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        },
        error: "",
      };
    case SUBMIT_SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        signUpData: {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        },
        error: action.payload,
      };

    default:
      return state;
  }
};
