import {
  SUBMIT_PROFILE_REQUEST,
  SUBMIT_PROFILE_SUCCESS,
  SUBMIT_PROFILE_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_ERROR,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from "../actions/user";

const initialState = {
  isAuth: false,
  userData: {},
  userDataRequest: false,
  userDataFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  updateRequest: false,
  updateFailed: false,
  getUserRequest: false,
  getUserFailed: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_PROFILE_REQUEST: {
      return { ...state, userDataRequest: true };
    }

    case SUBMIT_PROFILE_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        userData: action.data,
        userDataFailed: false,
        userDataRequest: false,
      };
    }

    case SUBMIT_PROFILE_ERROR: {
      return { ...state, userDataFailed: true, userDataRequest: false };
    }

    case USER_LOGIN_REQUEST: {
      return { ...state, userDataRequest: true };
    }

    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        userData: action.data,
        userDataFailed: false,
        userDataRequest: false,
      };
    }

    case USER_LOGIN_ERROR: {
      return { ...state, userDataFailed: true, userDataRequest: false };
    }

    case USER_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }

    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuth: false,
        userData: {},
        logoutRequest: false,
      };
    }

    case USER_LOGOUT_ERROR: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
        isAuth: true,
      };
    }

    case USER_UPDATE_REQUEST: {
      return {
        ...state,
        updateRequest: true,
        updateFailed: false,
      };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        userData: action.data,
        updateRequest: false,
      };
    }
    case USER_UPDATE_ERROR: {
      return {
        ...state,
        updateFailed: true,
        updateRequest: false,
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userData: action.data,
        getUserRequest: false,
        isAuth: true,
      };
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        getUserFailed: true,
        getUserRequest: false,
      };
    }

    default: {
      return state;
    }
  }
};
