import {
  DELETE_POST,
  DELETE_POST_SUCCES,
  DELETE_POST_ERROR,
} from "../constants/postDelete";

const statePostDelete = {
  isLoading: false,
  error: "",
};

export const postDeleteReducer = (state = statePostDelete, action) => {
  switch (action.type) {
    case DELETE_POST:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case DELETE_POST_SUCCES:
      return {
        ...state,
        isLoading: false,
        error: "",
      };
    case DELETE_POST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
