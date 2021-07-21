import {
  GET_POSTS,
  GET_POSTS_SUCCES,
  GET_POSTS_ERROR,
} from "../constants/postsViewer";

const statePosts = {
  isLoading: false,
  posts: [],
  error: "",
};

export const postReducer = (state = statePosts, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case GET_POSTS_SUCCES:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
        error: "",
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
        posts: [],
        error: action.payload,
      };

    default:
      return state;
  }
};
