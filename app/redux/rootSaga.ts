import { all } from "redux-saga/effects";
import { productSaga } from "./product";
import { authSaga } from "./auth";

export function* rootSaga() {
  yield all([...authSaga, ...productSaga]);
}
