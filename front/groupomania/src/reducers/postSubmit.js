import {
    SUBMIT_POSTS,
    SUBMIT_POSTS_SUCCES,
    SUBMIT_POSTS_ERROR,
  } from "../constants/postSubmit";
  
  const statePostSubmit = {
    isLoading: false,
    postSubmitData: {
      title: "",
      attachment: "",
    },
    error: "",
  };
  
  export const postSubmitReducer = (state = statePostSubmit, action) => {
    switch (action.type) {
      case SUBMIT_POSTS:
        return {
          ...state,
          isLoading: true,
          signUpData: action.payload,
          error: "",
        };
      case SUBMIT_POSTS_SUCCES:
        return {
          ...state,
          isLoading: false,
          signUpData: {
            email: "",
            password: "",
          },
          error: "",
        };
      case SUBMIT_POSTS_ERROR:
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
  