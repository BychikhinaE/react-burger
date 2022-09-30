import {
  SUBMIT_PROFILE_REQUEST,
  SUBMIT_PROFILE_SUCCESS,
  SUBMIT_PROFILE_ERROR,

} from "../actions/user";

const initialState = {
  userData: NaN,
  userDataRequest: false,
  userDataFailed: false,
  email: '',
  password: '',
  userName: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_PROFILE_REQUEST: {
      return { ...state, userDataRequest: true };
    }

    // получить
    case SUBMIT_PROFILE_SUCCESS: {
      return {
        ...state,
        userData: action.data,
        userDataFailed: false,
        userDataRequest: false,
      };
    }

    case SUBMIT_PROFILE_ERROR: {
      return { ...state, userDataFailed: true, userDataRequest: false };
    }



    default: {
      return state;
    }
  }
};
