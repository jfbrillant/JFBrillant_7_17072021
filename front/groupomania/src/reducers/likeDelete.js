import {
    DELETE_LIKE,
    DELETE_LIKE_SUCCES,
    DELETE_LIKE_ERROR,
} from "../constants/likeDelete";
  
  const stateLikeDelete = {
    isLoading: false,
    error: "",
  };
  
  export const likeDeleteReducer = (state = stateLikeDelete, action) => {
    switch (action.type) {
      case DELETE_LIKE:
        return {
          ...state,
          isLoading: true,
          error: "",
        };
      case DELETE_LIKE_SUCCES:
        return {
          ...state,
          isLoading: false,
          error: "",
        };
      case DELETE_LIKE_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  