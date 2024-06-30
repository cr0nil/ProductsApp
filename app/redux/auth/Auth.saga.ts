import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import { loginApi, registerApi } from "./Auth.api";
import { AuthData, AuthPayload } from "./Auth.types";
import { authActions, authActionTypes } from "./Auth.action";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";
import { ErrorResponse } from "@/app/api";

function* signInSaga({ payload }: PayloadAction<AuthPayload>) {
  const [response, error]: [AuthData, ErrorResponse] = yield call(
    loginApi,
    payload
  );

  if (error) {
    // todo check error connceted with server
    yield put(authActions.signInFailed(error));
    error.data?.message &&
      Toast.show(error.data.message, {
        duration: Toast.durations.LONG,
      });
  } else {
    yield put(authActions.signInSuccess(response));
    yield SecureStore.setItemAsync("token", response.token);
  }
}

function* signUpSaga({ payload }: PayloadAction<AuthPayload>) {
  const [, error]: [any, ErrorResponse] = yield call(registerApi, payload);

  if (error) {
    //todo check error connceted with server
    yield put(authActions.signUpFailed(error));
    error.data?.message &&
      Toast.show(error.data.message, {
        duration: Toast.durations.LONG,
      });
  } else {
    yield put(authActions.signUpSuccess());
    yield put(authActions.signInRequest(payload));
  }
}

export default [
  takeLatest(authActionTypes.SIGN_IN_REQUEST, signInSaga),
  takeLatest(authActionTypes.SIGN_UP_REQUEST, signUpSaga),
];
