import {
    GET_ONEPOST,
    GET_ONEPOST_SUCCES,
    GET_ONEPOST_ERROR,
  } from "../constants/onePost";
  
  const stateOnePost = {
    isLoading: false,
    post: "",
    error: "",
  };
  
  export const onePostReducer = (state = stateOnePost, action) => {
    switch (action.type) {
      case GET_ONEPOST:
        return {
          ...state,
          isLoading: true,
          error: "",
        };
      case GET_ONEPOST_SUCCES:
        return {
          ...state,
          isLoading: false,
          post: action.payload,
          error: "",
        };
      case GET_ONEPOST_ERROR:
        return {
          ...state,
          isLoading: false,
          post: {},
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  