import {
  POST_FORGOT_PASSWORD_REQUEST,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_ERROR,
  POST_RESET_PASSWORD_REQUEST,
  POST_RESET_PASSWORD_SUCCESS,
  POST_RESET_PASSWORD_ERROR,
} from "../actions/password";

const passwordInitialState = {
  forgotPasswordData: {},
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  resetPasswordData: {},
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

export const passwordReducer = (state = passwordInitialState, action) => {
  switch (action.type) {
    case POST_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
      };
    }

    case POST_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordFailed: false,
        forgotPasswordData: action.data,
        forgotPasswordRequest: false,
      };
    }

    case POST_FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
        forgotPasswordData: action.data,
      };
    }

    case POST_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      };
    }

    case POST_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordFailed: false,
        resetPasswordData: action.data,
        resetPasswordRequest: false,
      };
    }

    case POST_RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false,
        resetPasswordData: action.data,
      };
    }

    default: {
      return state;
    }
  }
};




