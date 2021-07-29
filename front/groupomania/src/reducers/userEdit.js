import {
    EDIT_USER,
    EDIT_USER_SUCCES,
    EDIT_USER_ERROR,
  } from "../constants/userEdit";
  
  const editUserData = {
    isLoading: false,
    editUserData: {
        firstname: "",
        lastname: "",
    },
    error: "",
  };
  
  export const userEditReducer = (state = editUserData, action) => {
    switch (action.type) {
      case EDIT_USER:
        return {
          ...state,
          isLoading: true,
          editUserData: action.payload,
          error: "",
        };
      case EDIT_USER_SUCCES:
        return {
          ...state,
          isLoading: false,
          editUserData: {
            firstname: "",
            lastname: "",
        },
          error: "",
        };
      case EDIT_USER_ERROR:
        return {
          ...state,
          isLoading: false,
          editUserData: {
            firstname: "",
            lastname: "",
        },
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  