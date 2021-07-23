import {
    GET_COMMENTS,
    GET_COMMENTS_SUCCES,
    GET_COMMENTS_ERROR,
  } from "../constants/commentsViewer";
  
  const stateComments = {
    isLoading: false,
    comments: [],
    error: "",
  };
  
  export const commentReducer = (state = stateComments, action) => {
    switch (action.type) {
      case GET_COMMENTS:
        return {
          ...state,
          isLoading: true,
          error: "",
        };
      case GET_COMMENTS_SUCCES:
        return {
          ...state,
          isLoading: false,
          comments: action.payload,
          error: "",
        };
      case GET_COMMENTS_ERROR:
        return {
          ...state,
          isLoading: false,
          comments: [],
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  