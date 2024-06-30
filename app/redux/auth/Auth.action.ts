import { createAction } from "@reduxjs/toolkit";
import { AuthData, AuthPayload } from "./Auth.types";
import { ErrorResponse } from "@/app/api";

export const authActionTypes = {
  SIGN_IN_REQUEST: "auth/signInRequest",
  SIGN_IN_SUCCESS: "auth/signInSuccess",
  SIGN_IN_FAILED: "auth/signInFailed",
  SIGN_UP_REQUEST: "auth/signUpRequest",
  SIGN_UP_SUCCESS: "auth/signUpSuccess",
  SIGN_UP_FAILED: "auth/signUpFailed",

  LOGOUT_SUCCESS: "auth/logoutSuccess",
};

export const authActions = {
  signInRequest: createAction<AuthPayload>(authActionTypes.SIGN_IN_REQUEST),
  signInSuccess: createAction<AuthData>(authActionTypes.SIGN_IN_SUCCESS),
  signInFailed: createAction<Error | ErrorResponse>(
    authActionTypes.SIGN_IN_FAILED
  ),

  signUpRequest: createAction<AuthPayload>(authActionTypes.SIGN_UP_REQUEST),
  signUpSuccess: createAction(authActionTypes.SIGN_UP_SUCCESS),
  signUpFailed: createAction<Error | ErrorResponse>(
    authActionTypes.SIGN_UP_FAILED
  ),

  logoutSuccess: createAction(authActionTypes.LOGOUT_SUCCESS),
};
