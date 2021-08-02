import {
    GET_LIKES,
    GET_LIKES_SUCCES,
    GET_LIKES_ERROR,
  } from "../constants/likesViewer";
  
  const stateGetLikes = {
    isLoading: false,
    likes: [],
    error: "",
  };
  
  export const getLikesReducer = (state = stateGetLikes, action) => {
    switch (action.type) {
      case GET_LIKES:
        return {
          ...state,
          isLoading: true,
          error: "",
        };
      case GET_LIKES_SUCCES:
        return {
          ...state,
          isLoading: false,
          likes: [action.payload],
          error: "",
        };
      case GET_LIKES_ERROR:
        return {
          ...state,
          isLoading: false,
          likes: [],
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  