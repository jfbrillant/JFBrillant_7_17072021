import {
    SUBMIT_COMMENT,
    SUBMIT_COMMENT_SUCCES,
    SUBMIT_COMMENT_ERROR,
  } from "../constants/commentSubmit";
  
  const stateCommentSubmit = {
    isLoading: false,
    commentSubmitData: {
      comment: "",
    },
    error: "",
  };
  
  export const postSubmitReducer = (state = stateCommentSubmit, action) => {
    switch (action.type) {
      case SUBMIT_COMMENT:
        return {
          ...state,
          isLoading: true,
          commentSubmitData: action.payload,
          error: "",
        };
      case SUBMIT_COMMENT_SUCCES:
        return {
          ...state,
          isLoading: false,
          commentSubmitData: {
            title: "",
            attachment: "",
          },
          error: "",
        };
      case SUBMIT_COMMENT_ERROR:
        return {
          ...state,
          isLoading: false,
          commentSubmitData: {
            title: "",
            attachment: "",
          },
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  