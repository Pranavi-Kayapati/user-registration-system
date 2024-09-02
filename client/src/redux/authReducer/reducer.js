import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actionTypes";

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  error: "",
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST: {
      return { ...state, isLoading: true };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: payload.token,
        error: "",
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        isError: true,
        error: payload,
      };
    }
    default: {
      return state;
    }
  }
};
