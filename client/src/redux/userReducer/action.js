// actions.js
import axios from "axios";
import {
  DELETE_USERS_SUCCESS,
  GET_USERS_SUCCESS,
  PATCH_USERS_SUCCESS,
  POST_USERS_SUCCESS,
  USERS_FAILURE,
  USERS_REQUEST,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actionTypes";
import { toast } from "react-toastify";
let baseUrl = "http://localhost:8000/api/users";

export const postUser = (newUser) => (dispatch) => {
  dispatch({ type: USERS_REQUEST });
  axios
    .post(`${baseUrl}/register`, newUser)
    .then((res) => {
      dispatch({ type: POST_USERS_SUCCESS, payload: res.data });
      console.log(res.data);
      toast.success("👤New user added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: USERS_FAILURE, payload: err.message });
      toast.error(`🚨${err.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post(`${baseUrl}/login`, user);
    const { token } = response.data;
    localStorage.setItem("authToken", token);

    dispatch({ type: LOGIN_SUCCESS, payload: { token } });

    toast.success("Login successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data.error || "Login failed",
    });

    toast.error(`🚨${error.response.data.error || "Login failed"}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const getUser = (paramsObj) => (dispatch) => {
  dispatch({ type: USERS_REQUEST });
  axios
    .get(baseUrl, { params: paramsObj })
    .then((res) => {
      dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: USERS_FAILURE, payload: err.message });
      toast.error(`🚨${err.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};

export const updateUser = (newData, id) => (dispatch) => {
  dispatch({ type: USERS_REQUEST });
  return axios
    .put(`${baseUrl}/update/${id}`, newData)
    .then((res) => {
      dispatch({ type: PATCH_USERS_SUCCESS, payload: res.user });
      console.log(res);
      console.log("Updated user :", res.data);
      toast.success("📝 User details updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((err) => {
      dispatch({ type: USERS_FAILURE, payload: err.message });
      console.log(err.message);
      toast.error(`🚨${err.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};

export const deleteUser = (id) => (dispatch) => {
  dispatch({ type: USERS_REQUEST });
  axios
    .delete(`${baseUrl}/delete/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_USERS_SUCCESS, payload: id });
      console.log("Deleted user :", res.data);
      toast.success("🗑️ User deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((err) => {
      dispatch({ type: USERS_FAILURE, payload: err.message });
      toast.error(`🚨${err.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};
