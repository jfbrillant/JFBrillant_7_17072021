import {
    CREATE_LIKE,
    CREATE_LIKE_SUCCES,
    CREATE_LIKE_ERROR,
  } from "../constants/likeCreate";
  
  const stateLikeCreate = {
    isLoading: false,
    likeCreateData: {
      postId: "",
    },
    error: "",
  };
  
  export const likeCreateReducer = (state = stateLikeCreate, action) => {
    switch (action.type) {
      case CREATE_LIKE:
        return {
          ...state,
          isLoading: true,
          likeCreateData: action.payload,
          error: "",
        };
      case CREATE_LIKE_SUCCES:
        return {
          ...state,
          isLoading: false,
          likeCreateData: {
            postId: "",
          },
          error: "",
        };
      case CREATE_LIKE_ERROR:
        return {
          ...state,
          isLoading: false,
          likeCreateData: {
            postId: "",
          },
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  