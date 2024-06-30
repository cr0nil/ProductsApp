import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData } from "./Auth.types";
import { initialStateProducts } from "../product/Product.reducer";

export interface AuthState {
  pending: boolean;
  token: string | null;
  auth: boolean;
  accountCreated: boolean | null;
}

const initialState: AuthState = {
  pending: false, // to do - add loader to screen
  token: "",
  auth: false,
  accountCreated: null,
};

const reducer = {
  signInRequest: (state: AuthState) => {
    state.pending = true;
    state.accountCreated = null;
  },
  signInSuccess: (state: AuthState, { payload }: PayloadAction<AuthData>) => {
    state.token = payload.token;
    state.pending = false;

    state.auth = true;
  },
  signInFailed: (state: AuthState) => {
    state.pending = false;
    state.auth = false;
  },

  signUpRequest: (state: AuthState) => {
    state.pending = true;
  },
  signUpSuccess: (state: AuthState) => {
    state.accountCreated = true;
  },
  signUpFailed: (state: AuthState) => {
    state.accountCreated = false;
  },

  logoutSuccess: (state: AuthState) => {
    state.token = "";
    state.auth = false;
    state = { ...initialState, ...initialStateProducts };
  },
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: reducer,
});

export default slice.reducer;
