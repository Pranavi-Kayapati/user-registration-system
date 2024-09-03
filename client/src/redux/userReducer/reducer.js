import {
  DELETE_USERS_SUCCESS,
  GET_USERS_SUCCESS,
  PATCH_USERS_SUCCESS,
  POST_USERS_SUCCESS,
  USERS_FAILURE,
  USERS_REQUEST,
  USERS_SUCCESS,
} from "../actionTypes";

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USERS_REQUEST: {
      return { ...state, isLoading: true };
    }
    case USERS_FAILURE: {
      return { ...state, isLoading: false, isError: true, error: payload };
    }
    case POST_USERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: "",
        users: [...state.users, payload],
      };
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        users: payload,
      };
    }
    case PATCH_USERS_SUCCESS: {
      const updatedUsers = state.users.map((user) =>
        user._id === payload._id ? payload : user
      );
      return {
        ...state,
        isLoading: false,
        users: updatedUsers,
      };
    }
    case DELETE_USERS_SUCCESS: {
      const filteredUsers = state.users.filter((user) => user._id !== payload);
      return {
        ...state,
        isLoading: false,
        users: filteredUsers,
      };
    }
    default: {
      return state;
    }
  }
};
