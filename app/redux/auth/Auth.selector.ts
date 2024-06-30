import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

const selectSelf = (state: RootState) => state;

// signIn status
export const singInSelector = createSelector(
  selectSelf,
  (state) => state.auth.auth
);
export const authTokenSelector = createSelector(
  selectSelf,
  (state) => state.auth.token
);

export const accountCreationStartedSelector = createSelector(
  selectSelf,
  (state) => state.auth.accountCreationStarted
);
