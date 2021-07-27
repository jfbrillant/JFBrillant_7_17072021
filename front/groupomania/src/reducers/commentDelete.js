import {
    DELETE_COMMENT,
    DELETE_COMMENT_SUCCES,
    DELETE_COMMENT_ERROR,
  } from "../constants/commentDelete";
  
  const stateCommentDelete = {
    isLoading: false,
    error: "",
  };
  
  export const commentDeleteReducer = (state = stateCommentDelete, action) => {
    switch (action.type) {
      case DELETE_COMMENT:
        return {
          ...state,
          isLoading: true,
          error: "",
        };
      case DELETE_COMMENT_SUCCES:
        return {
          ...state,
          isLoading: false,
          error: "",
        };
      case DELETE_COMMENT_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  