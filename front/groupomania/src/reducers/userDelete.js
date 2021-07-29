import {
    DELETE_USER,
    DELETE_USER_SUCCES,
    DELETE_USER_ERROR,
  } from "../constants/userDelete";
  
  const stateUserDelete = {
    isLoading: false,
    error: "",
  };
  
  export const userDeleteReducer = (state = stateUserDelete, action) => {
    switch (action.type) {
      case DELETE_USER:
        return {
          ...state,
          isLoading: true,
          error: "",
        };
      case DELETE_USER_SUCCES:
        return {
          ...state,
          isLoading: false,
          error: "",
        };
      case DELETE_USER_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  