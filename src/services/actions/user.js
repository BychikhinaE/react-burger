import {
  createUser,
  loginRequest,
  logoutRequest,
  updateUserData,
  refreshTokenRequest,
  getUserData,
} from "../../utils/api";
import { setCookie, getCookie, deleteCookie } from "../../utils/utils";

export const SUBMIT_PROFILE_REQUEST = "SUBMIT_PROFILE_REQUEST";
export const SUBMIT_PROFILE_SUCCESS = "SUBMIT_PROFILE_SUCCESS";
export const SUBMIT_PROFILE_ERROR = " SUBMIT_PROFILE_ERROR";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_ERROR = "USER_LOGOUT_ERROR";

export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_ERROR = "USER_UPDATE_ERROR";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_ERROR = "GET_USER_ERROR";

//Отправляем данные нового пользователя на сервер
export function addNewUser(data) {
  return function (dispatch) {
    dispatch({
      type: SUBMIT_PROFILE_REQUEST,
    });
    createUser(data)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, { "max-age": 1200 });
          setCookie("refreshToken", refreshToken);
        }
        dispatch({
          type: SUBMIT_PROFILE_SUCCESS,
          data: res.user,
        });
      })
      .catch((res) => {
        dispatch({
          type: SUBMIT_PROFILE_ERROR,
        });
        console.log("createUser" + res.message);
      });
  };
}

export function signIn(data) {
  return function (dispatch) {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    loginRequest(data)
      .then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, { "max-age": 1200 });
          setCookie("refreshToken", refreshToken);
        }

        dispatch({
          type: USER_LOGIN_SUCCESS,
          data: res.user,
        });
      })
      .catch((res) => {
        dispatch({
          type: USER_LOGIN_ERROR,
        });
        console.log("loginRequest" + res.message);
      });
  };
}

export function signOut() {
  return function (dispatch) {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    });
    const refreshToken = getCookie("refreshToken");
    logoutRequest(refreshToken)
      .then((res) => {
        dispatch({
          type: USER_LOGOUT_SUCCESS,
        });
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
      })
      .catch((res) => {
        dispatch({
          type: USER_LOGOUT_ERROR,
        });
        console.log("logoutRequest" + res.message);
      });
  };
}

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    if (
      getCookie("accessToken") === undefined &&
      getCookie("refreshToken") === undefined
    ) {
      return null;
    }
    if (getCookie("accessToken") !== undefined) {
      getUserData()
        .then((res) => {
          dispatch({
            type: GET_USER_SUCCESS,
            data: res.user,
          });
        })
        .catch((res) => {
          dispatch({
            type: GET_USER_ERROR,
          });
          console.log("getUserData" + res.message);
        });
    } else {
      refreshTokenRequest().then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        if (accessToken) {
          setCookie("accessToken", accessToken, { "max-age": 1200 });
        }
        getUserData()
          .then((res) => {
            dispatch({
              type: GET_USER_SUCCESS,
              data: res.user,
            });
          })
          .catch((res) => {
            dispatch({
              type: GET_USER_ERROR,
            });
            console.log("getUserData" + res.message);
          });
      });
    }
  };
}

export function updateUser(data) {
  return function (dispatch) {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    if (getCookie("accessToken") !== undefined) {
      updateUserData(data)
        .then((res) => {
          dispatch({
            type: USER_UPDATE_SUCCESS,
            data: res.user,
          });
        })
        .catch((res) => {
          dispatch({
            type: USER_UPDATE_ERROR,
          });
          console.log("updateUserData" + res.message);
        });
    } else {
      refreshTokenRequest().then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        if (accessToken) {
          setCookie("accessToken", accessToken, { "max-age": 1200 });
        }
        updateUserData(data)
          .then((res) => {
            dispatch({
              type: USER_UPDATE_SUCCESS,
              data: res.user,
            });
          })
          .catch((res) => {
            dispatch({
              type: USER_UPDATE_ERROR,
            });
            console.log("updateUserData" + res.message);
          });
      });
    }
  };
}
