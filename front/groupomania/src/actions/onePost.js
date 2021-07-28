import {
  GET_ONEPOST,
  GET_ONEPOST_SUCCES,
  GET_ONEPOST_ERROR,
} from "../constants/onePost";
import axios from "axios";

const getOnePostAction = () => {
  return {
    type: GET_ONEPOST,
  };
};

const getOnePostSuccesAction = (data) => {
  return {
    type: GET_ONEPOST_SUCCES,
    payload: data,
  };
};

const getOnePostErrorAction = (err) => {
  return {
    type: GET_ONEPOST_ERROR,
    payload: err,
  };
};

export const apiGET = (id) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (dispatch) => {
    dispatch(getOnePostAction());
    axios
      .get(`http://localhost:3000/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        dispatch(getOnePostSuccesAction(res.data));
      })
      .catch((err) => {
        dispatch(getOnePostErrorAction(err.message));
      });
  };
};
