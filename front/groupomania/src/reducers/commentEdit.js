import {
    EDIT_COMMENT,
    EDIT_COMMENT_SUCCES,
    EDIT_COMMENT_ERROR,
  } from "../constants/commentEdit";
  
  const editCommentData = {
    isLoading: false,
    editCommentData: {
      content: "",
    },
    error: "",
  };
  
  export const commentEditReducer = (state = editCommentData, action) => {
    switch (action.type) {
      case EDIT_COMMENT:
        return {
          ...state,
          isLoading: true,
          editCommentData: action.payload,
          error: "",
        };
      case EDIT_COMMENT_SUCCES:
        return {
          ...state,
          isLoading: false,
          editCommentData: {
            content: "",
          },
          error: "",
        };
      case EDIT_COMMENT_ERROR:
        return {
          ...state,
          isLoading: false,
          editCommentData: {
            content: "",
          },
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  