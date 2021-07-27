import {
  EDIT_POST,
  EDIT_POST_SUCCES,
  EDIT_POST_ERROR,
} from "../constants/postEdit";

const editPostData = {
  isLoading: false,
  editPostData: {
    title: "",
    attachment: "",
  },
  error: "",
};

export const postEditReducer = (state = editPostData, action) => {
  switch (action.type) {
    case EDIT_POST:
      return {
        ...state,
        isLoading: true,
        editPostData: action.payload,
        error: "",
      };
    case EDIT_POST_SUCCES:
      return {
        ...state,
        isLoading: false,
        editPostData: {
          title: "",
          attachment: "",
        },
        error: "",
      };
    case EDIT_POST_ERROR:
      return {
        ...state,
        isLoading: false,
        editPostData: {
          title: "",
          attachment: "",
        },
        error: action.payload,
      };

    default:
      return state;
  }
};
