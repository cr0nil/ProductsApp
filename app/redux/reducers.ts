import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { productReducer } from "./product";

const reducers = combineReducers({
  auth: authReducer,
  product: productReducer,
});

export type RootState = ReturnType<typeof reducers>;
export default reducers;
