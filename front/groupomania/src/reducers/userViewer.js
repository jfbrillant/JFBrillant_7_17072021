import {
    GET_USER,
    GET_USER_SUCCES,
    GET_USER_ERROR,
  } from "../constants/userViewer";
  
  const stateUser = {
    isLoading: false,
    userData: {
        firstname: "",
        lastname: ""
    },
    error: "",
  };
  
  export const userReducer = (state = stateUser, action) => {
    switch (action.type) {
      case GET_USER:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case GET_USER_SUCCES:
        return {
          ...state,
          isLoading: false,
          userData: action.payload,
          error: null,
        };
      case GET_USER_ERROR:
        return {
          ...state,
          isLoading: false,
          userData: "",
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  